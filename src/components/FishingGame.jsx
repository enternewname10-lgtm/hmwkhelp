import { useEffect, useRef, useState } from 'react'
import { ref, onValue, update } from 'firebase/database'
import { doc, updateDoc, increment } from 'firebase/firestore'
import { rtdb, db } from '../firebase'
import { wrongQuotes, generateChoices } from '../data/questions'
import { fishingRarityChances, rollRarity, getCatch, rarityColors } from '../data/fishing'
import { isAdmin } from '../utils/admin'

const QUESTION_TIME = 20
const REVEAL_TIME   = 6

const BOX_CLASSES = ['red', 'blue', 'green', 'yellow']

function FishingAnimation({ onDone, characterEmoji }) {
  const [phase, setPhase] = useState(0)
  // 0=cast  1=waiting  2=bite  3=reel  4=catch

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 750)
    const t2 = setTimeout(() => setPhase(2), 2600)
    const t3 = setTimeout(() => setPhase(3), 3300)
    const t4 = setTimeout(() => setPhase(4), 4050)
    const t5 = setTimeout(() => onDone(),    4850)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5) }
  }, [])

  const lineH = phase >= 3 ? 18 : phase >= 1 ? 70 : 0

  return (
    <div style={{ textAlign:'center', padding:'16px 0', userSelect:'none' }}>
      {/* Scene */}
      <div style={{ position:'relative', display:'inline-block', width:270, height:200 }}>

        {/* Character + rod */}
        <div style={{ position:'absolute', left:8, top:8, display:'flex', alignItems:'flex-end' }}>
          <span style={{ fontSize:54, lineHeight:1 }}>{characterEmoji || '🧑'}</span>
          <span style={{
            fontSize:34, lineHeight:1, display:'block',
            transform: phase === 0
              ? 'rotate(-38deg) translate(-4px,-16px)'
              : 'rotate(16deg) translate(2px,-8px)',
            transition:'transform 0.7s ease',
          }}>🎣</span>
        </div>

        {/* Fishing line */}
        {phase >= 1 && (
          <div style={{
            position:'absolute',
            top:46, left:160,
            width:2,
            height: lineH,
            background:'rgba(255,255,255,0.5)',
            transition:'height 0.5s ease',
          }} />
        )}

        {/* Bobber */}
        {phase === 1 && (
          <span style={{
            position:'absolute',
            top:114, left:152,
            fontSize:18,
            animation:'bobberBob 0.75s ease-in-out infinite',
            display:'block',
          }}>🔴</span>
        )}

        {/* Bite indicator */}
        {phase === 2 && (
          <span style={{
            position:'absolute',
            top:88, left:118,
            fontSize:26,
            animation:'fadeIn 0.2s ease',
          }}>❗❗</span>
        )}

        {/* Water */}
        <div style={{
          position:'absolute',
          bottom:14, left:0, right:0,
          fontSize:30,
          animation:'starFloat 1.4s ease-in-out infinite',
          letterSpacing:3,
        }}>🌊🌊🌊🌊</div>

        {/* Fish pulled out of water */}
        {phase >= 3 && (
          <span style={{
            position:'absolute',
            left:148,
            top: phase >= 4 ? 34 : 130,
            fontSize:30,
            transition:'top 0.65s cubic-bezier(0.34,1.56,0.64,1)',
          }}>🐟</span>
        )}
      </div>

      <div style={{ color:'var(--cyan)', fontWeight:800, fontSize:18, marginTop:8 }}>
        {phase === 0 && '🎣 Casting...'}
        {phase === 1 && '⏳ Waiting for a bite...'}
        {phase === 2 && "❗ Something's on the line!"}
        {phase === 3 && '💪 Reeling it in!'}
        {phase === 4 && '🐟 Got one!'}
      </div>
    </div>
  )
}

export default function FishingGame({ user, roomCode, isHost, navigate }) {
  const [game,        setGame]        = useState(null)
  const [choices,     setChoices]     = useState([])
  const [myAnswer,    setMyAnswer]    = useState(null)
  const [hasAnswered, setHasAnswered] = useState(false)
  const [timeLeft,    setTimeLeft]    = useState(QUESTION_TIME)
  const [myResult,    setMyResult]    = useState(null)
  const [fishing,     setFishing]     = useState(false)
  const [myCatch,     setMyCatch]     = useState(null)
  const timerRef = useRef(null)

  useEffect(() => {
    const gameRef = ref(rtdb, `games/${roomCode}`)
    const unsub = onValue(gameRef, snap => {
      if (!snap.exists()) { navigate('home'); return }
      setGame(snap.val())
    })
    return unsub
  }, [roomCode])

  useEffect(() => {
    if (!game) return
    setMyAnswer(null); setHasAnswered(false)
    setMyResult(null); setFishing(false); setMyCatch(null)
    setTimeLeft(QUESTION_TIME)
    const qIdx = game.currentQuestion ?? 0
    const q = game.questions?.[qIdx]
    if (q) setChoices(generateChoices(q.answer))
  }, [game?.currentQuestion])

  useEffect(() => {
    if (!game) return
    if (game.status === 'finished') { finalizeStats(); navigate('results', { roomCode }); return }
    if (game.status !== 'question' && game.status !== 'reveal') return

    clearInterval(timerRef.current)
    timerRef.current = setInterval(async () => {
      if (!game.questionStartTime) return
      if (game.status === 'question') {
        const elapsed = (Date.now() - game.questionStartTime) / 1000
        const rem = Math.max(0, QUESTION_TIME - elapsed)
        setTimeLeft(Math.ceil(rem))
        if (isHost && rem <= 0) {
          clearInterval(timerRef.current)
          await update(ref(rtdb, `games/${roomCode}`), { status:'reveal', questionStartTime: Date.now() })
        }
      } else if (game.status === 'reveal') {
        const elapsed = (Date.now() - game.questionStartTime) / 1000
        const rem = Math.max(0, REVEAL_TIME - elapsed)
        setTimeLeft(Math.ceil(rem))
        if (isHost && rem <= 0) {
          clearInterval(timerRef.current)
          const nextQ = (game.currentQuestion ?? 0) + 1
          if (nextQ >= (game.questions?.length ?? 10)) {
            await update(ref(rtdb, `games/${roomCode}`), { status:'finished' })
          } else {
            await update(ref(rtdb, `games/${roomCode}`), {
              status:'question', currentQuestion: nextQ, questionStartTime: Date.now()
            })
          }
        }
      }
    }, 200)
    return () => clearInterval(timerRef.current)
  }, [game?.status, game?.questionStartTime, game?.currentQuestion])

  useEffect(() => {
    if (!game || !isHost || game.status !== 'question') return
    const players = Object.values(game.players ?? {})
    if (!players.length) return
    const qIdx = game.currentQuestion ?? 0
    if (players.every(p => p.answers?.[qIdx]?.submitted)) {
      clearInterval(timerRef.current)
      update(ref(rtdb, `games/${roomCode}`), { status:'reveal', questionStartTime: Date.now() })
    }
  }, [game?.players, game?.currentQuestion, game?.status])

  useEffect(() => {
    if (game?.status === 'finished') { finalizeStats(); navigate('results', { roomCode }) }
  }, [game?.status])

  const finalizeStats = async () => {
    if (!game || !user) return
    const players = game.players ?? {}
    const myData  = players[user.uid]
    if (!myData) return
    const scores = Object.values(players).map(p => p.score ?? 0)
    const myScore = myData.score ?? 0
    const won = myScore >= Math.max(...scores) && scores.filter(s => s === myScore).length === 1
    await updateDoc(doc(db, 'users', user.uid), {
      coins:       increment(myData.coinsEarned ?? 0),
      gamesPlayed: increment(1),
      ...(won ? { totalWins: increment(1) } : { totalLosses: increment(1) }),
    })
  }

  const handleSubmit = async (chosen) => {
    if (hasAnswered || !game) return
    const qIdx = game.currentQuestion ?? 0
    const question = game.questions?.[qIdx]
    if (!question) return

    const correct = chosen === question.answer
    setMyAnswer(chosen)
    setHasAnswered(true)
    setMyResult(correct ? 'correct' : 'incorrect')

    if (correct) setFishing(true)

    const updates = { [`players/${user.uid}/answers/${qIdx}`]: { submitted: true, correct } }
    await update(ref(rtdb, `games/${roomCode}`), updates)
  }

  const handleFishingDone = async () => {
    setFishing(false)
    const rarity = isAdmin(user) ? 'Legendary' : rollRarity(fishingRarityChances)
    const caught = getCatch(rarity)
    setMyCatch(caught)

    const qIdx = game.currentQuestion ?? 0
    const prev = game.players?.[user.uid]?.score ?? 0
    await update(ref(rtdb, `games/${roomCode}`), {
      [`players/${user.uid}/score`]:       parseFloat((prev + caught.kg).toFixed(2)),
      [`players/${user.uid}/coinsEarned`]: (game.players?.[user.uid]?.coinsEarned ?? 0) + 50,
      [`players/${user.uid}/answers/${qIdx}/kg`]: caught.kg,
    })
  }

  if (!game) return <div className="loading">Loading...</div>

  const qIdx    = game.currentQuestion ?? 0
  const question = game.questions?.[qIdx]
  const total    = game.questions?.length ?? 10
  const players  = game.players ? Object.entries(game.players) : []
  const sorted   = [...players].sort((a, b) => (b[1].score ?? 0) - (a[1].score ?? 0))
  const timerPct = game.status === 'reveal'
    ? (timeLeft / REVEAL_TIME) * 100
    : (timeLeft / QUESTION_TIME) * 100

  const characterEmoji = game.players?.[user.uid]?.characterEmoji || null

  const getChoiceClass = (choice) => {
    if (!hasAnswered) return ''
    if (choice === question?.answer) return 'is-correct'
    if (choice === myAnswer) return 'is-wrong'
    return 'is-dim'
  }

  return (
    <div className="screen-top">
      <div className="game-wrapper">
        {/* Top bar */}
        <div className="game-topbar">
          <span className="q-counter">🎣 Q {qIdx + 1} / {total}</span>
          <div className="timer-bar-track">
            <div
              className={`timer-bar-fill ${timeLeft <= 5 && game.status === 'question' ? 'warning' : ''}`}
              style={{ width:`${timerPct}%` }}
            />
          </div>
          <span className="timer-num" style={{ color: timeLeft <= 5 && game.status === 'question' ? 'var(--red)':'var(--text)' }}>
            {timeLeft}
          </span>
        </div>

        <div style={{ display:'flex', gap:16 }}>
          <div style={{ flex:1, display:'flex', flexDirection:'column', gap:12 }}>

            {/* Question */}
            {question && !fishing && (
              <div className="question-card">
                <div className="question-label">🎣 Cast your line — Solve for x</div>
                <div className="equation">{question.equation}</div>
                {game.status === 'question' && !hasAnswered && (
                  <div className="hint-text">💡 {question.hint}</div>
                )}
              </div>
            )}

            {/* Fishing animation */}
            {fishing && (
              <FishingAnimation onDone={handleFishingDone} characterEmoji={characterEmoji} />
            )}

            {/* Choice boxes */}
            {!fishing && question && game.status === 'question' && choices.length === 4 && (
              <div className="choice-grid">
                {choices.map((choice, i) => (
                  <button
                    key={i}
                    className={`choice-btn ${BOX_CLASSES[i]} ${getChoiceClass(choice)}`}
                    onClick={() => !hasAnswered && handleSubmit(choice)}
                    disabled={hasAnswered}
                  >
                    {choice}
                    {hasAnswered && choice === question.answer && ' ✓'}
                    {hasAnswered && choice === myAnswer && choice !== question.answer && ' ✗'}
                  </button>
                ))}
              </div>
            )}

            {/* Wrong answer message */}
            {game.status === 'question' && hasAnswered && myResult === 'incorrect' && !fishing && (
              <div className="answered-banner incorrect">
                ❌ {wrongQuotes[Math.floor(Math.random() * wrongQuotes.length)]}
                <div style={{ marginTop:6, fontSize:14 }}>No fish for wrong answers!</div>
              </div>
            )}

            {/* Catch result */}
            {myCatch && !fishing && (
              <div className="answered-banner correct" style={{
                borderColor: rarityColors[myCatch.rarity] + '88',
                background:  rarityColors[myCatch.rarity] + '18',
                color:       rarityColors[myCatch.rarity],
              }}>
                <div style={{ fontSize:36 }}>{myCatch.emoji}</div>
                <div style={{ fontSize:22, fontWeight:900 }}>{myCatch.name}</div>
                <div style={{ fontSize:14 }}>{myCatch.rarity}</div>
                {myCatch.kg > 0
                  ? <div style={{ fontSize:24, fontWeight:900, color:'var(--cyan)' }}>+{myCatch.kg} kg 🐟</div>
                  : <div style={{ color:'var(--muted)', fontSize:14 }}>Just trash — 0 kg!</div>
                }
              </div>
            )}

            {/* Reveal phase */}
            {game.status === 'reveal' && question && (
              <div className="reveal-card">
                <div style={{ color:'var(--muted)', fontSize:14, fontWeight:700, marginBottom:8 }}>CORRECT ANSWER</div>
                <div className="reveal-answer">x = {question.answer}</div>
                <div style={{ color:'var(--cyan)', fontWeight:700 }}>{question.explanation}</div>
              </div>
            )}
          </div>

          {/* Scoreboard */}
          <div style={{ width:180 }}>
            <div className="scoreboard">
              <div style={{ fontWeight:800, fontSize:13, marginBottom:8, color:'var(--muted)' }}>🏆 KG CAUGHT</div>
              {sorted.map(([uid, p], i) => (
                <div className="score-row" key={uid} style={uid === user.uid ? { color:'var(--cyan)' } : {}}>
                  <span className="score-rank">{i + 1}</span>
                  {p.characterEmoji
                    ? <span style={{ fontSize:14 }}>{p.characterEmoji}</span>
                    : p.isAdmin && <span style={{ fontSize:14 }}>👑</span>
                  }
                  <span style={{ flex:1, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                    {p.name?.split(' ')[0]}
                  </span>
                  <span className="score-pts">{(p.score ?? 0).toFixed(1)} kg</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
