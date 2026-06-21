import { useEffect, useRef, useState } from 'react'
import { ref, onValue, update } from 'firebase/database'
import { doc, updateDoc, increment } from 'firebase/firestore'
import { rtdb, db } from '../firebase'
import { wrongQuotes, correctQuotes, generateChoices } from '../data/questions'
import { isAdmin } from '../utils/admin'
import { getRarityByTime, rollRarity, getCatch, rarityColors as fishRarityColors } from '../data/fishing'

const QUESTION_TIME = 20
const REVEAL_TIME   = 5

const BOX_CLASSES = ['red', 'blue', 'green', 'yellow']

export default function GamePlay({ user, roomCode, isHost, navigate }) {
  const [game,        setGame]        = useState(null)
  const [choices,     setChoices]     = useState([])
  const [myAnswer,    setMyAnswer]    = useState(null)
  const [hasAnswered, setHasAnswered] = useState(false)
  const [timeLeft,    setTimeLeft]    = useState(QUESTION_TIME)
  const [myResult,    setMyResult]    = useState(null)
  const [quote,       setQuote]       = useState('')
  const [myCatch,     setMyCatch]     = useState(null)
  const timerRef = useRef(null)

  useEffect(() => {
    const gameRef = ref(rtdb, `games/${roomCode}`)
    const unsub = onValue(gameRef, (snap) => {
      if (!snap.exists()) { navigate('home'); return }
      setGame(snap.val())
    })
    return unsub
  }, [roomCode])

  useEffect(() => {
    if (!game) return
    setMyAnswer(null)
    setHasAnswered(false)
    setMyResult(null)
    setQuote('')
    setMyCatch(null)
    setTimeLeft(QUESTION_TIME)
    const qIdx = game.currentQuestion ?? 0
    const q = game.questions?.[qIdx]
    if (q) setChoices(generateChoices(q.answer))
  }, [game?.currentQuestion])

  useEffect(() => {
    if (!game) return
    if (game.status === 'finished') { navigate('results'); return }
    if (game.status !== 'question' && game.status !== 'reveal') return

    const maxTime  = game.status === 'question' ? QUESTION_TIME : REVEAL_TIME
    const startedAt = Date.now()

    clearInterval(timerRef.current)
    setTimeLeft(maxTime)

    timerRef.current = setInterval(async () => {
      const elapsed   = (Date.now() - startedAt) / 1000
      const remaining = Math.max(0, maxTime - elapsed)
      setTimeLeft(Math.ceil(remaining))

      if (isHost && remaining <= 0) {
        clearInterval(timerRef.current)
        if (game.status === 'question') {
          await update(ref(rtdb, `games/${roomCode}`), { status: 'reveal', questionStartTime: Date.now() })
        } else {
          const nextQ = (game.currentQuestion ?? 0) + 1
          const total = game.questions?.length ?? 10
          if (nextQ >= total) {
            await update(ref(rtdb, `games/${roomCode}`), { status: 'finished' })
          } else {
            await update(ref(rtdb, `games/${roomCode}`), {
              status: 'question', currentQuestion: nextQ, questionStartTime: Date.now(),
            })
          }
        }
      }
    }, 200)

    return () => clearInterval(timerRef.current)
  }, [game?.status, game?.currentQuestion])

  useEffect(() => {
    if (!game || !isHost || game.status !== 'question') return
    const players = Object.values(game.players ?? {})
    if (players.length === 0) return
    const qIdx = game.currentQuestion ?? 0
    if (players.every(p => p.answers?.[qIdx]?.submitted)) {
      clearInterval(timerRef.current)
      update(ref(rtdb, `games/${roomCode}`), { status: 'reveal', questionStartTime: Date.now() })
    }
  }, [game?.players, game?.currentQuestion, game?.status])

  useEffect(() => {
    if (game?.status === 'finished') {
      finalizeUserStats()
      navigate('results', { roomCode })
    }
  }, [game?.status])

  const finalizeUserStats = async () => {
    if (!game || !user || user.isAnonymous) return
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
    const qIdx    = game.currentQuestion ?? 0
    const question = game.questions?.[qIdx]
    if (!question) return

    const correct = chosen === question.answer
    setMyAnswer(chosen)
    setHasAnswered(true)
    setMyResult(correct ? 'correct' : 'incorrect')
    setQuote(
      correct
        ? correctQuotes[Math.floor(Math.random() * correctQuotes.length)]
        : wrongQuotes[Math.floor(Math.random() * wrongQuotes.length)]
    )

    let scoreGain = 0
    let catchResult = null
    if (correct) {
      const rarity = isAdmin(user) ? 'Legendary' : rollRarity(getRarityByTime(timeLeft))
      catchResult  = getCatch(rarity)
      scoreGain    = catchResult.kg
      setMyCatch(catchResult)
    }

    const updates = {
      [`players/${user.uid}/answers/${qIdx}`]: { submitted: true, correct, kg: scoreGain },
    }
    if (correct) {
      const prev = game.players?.[user.uid]?.score ?? 0
      updates[`players/${user.uid}/score`]       = parseFloat((prev + scoreGain).toFixed(2))
      updates[`players/${user.uid}/coinsEarned`] = (game.players?.[user.uid]?.coinsEarned ?? 0) + 50
    }
    await update(ref(rtdb, `games/${roomCode}`), updates)
  }

  if (!game) return <div className="loading">Loading game...</div>

  const qIdx     = game.currentQuestion ?? 0
  const question = game.questions?.[qIdx]
  const total    = game.questions?.length ?? 10
  const players  = game.players ? Object.entries(game.players) : []
  const sorted   = [...players].sort((a, b) => (b[1].score ?? 0) - (a[1].score ?? 0))
  const timerPct = game.status === 'reveal'
    ? (timeLeft / REVEAL_TIME) * 100
    : (timeLeft / QUESTION_TIME) * 100

  const getChoiceClass = (choice) => {
    if (game.status === 'reveal' && !hasAnswered) {
      if (choice === question?.answer) return 'is-correct'
      return 'is-dim'
    }
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
          <span className="q-counter">Q {qIdx + 1} / {total}</span>
          <div className="timer-bar-track">
            <div
              className={`timer-bar-fill ${timeLeft <= 5 && game.status === 'question' ? 'warning' : ''}`}
              style={{ width: `${timerPct}%` }}
            />
          </div>
          <span className="timer-num" style={{ color: timeLeft <= 5 && game.status === 'question' ? 'var(--red)' : 'var(--text)' }}>
            {timeLeft}
          </span>
        </div>

        <div style={{ display:'flex', gap:16 }}>
          <div style={{ flex:1, display:'flex', flexDirection:'column', gap:12 }}>

            {/* Question */}
            {question && (
              <div className="question-card">
                <div className="question-label">{question.label ?? 'Solve for x'}</div>
                <div className="equation">{question.equation}</div>
                {game.status === 'question' && !hasAnswered && (
                  <div className="hint-text">💡 Hint: {question.hint}</div>
                )}
              </div>
            )}

            {/* Choice boxes */}
            {question && (game.status === 'question' || game.status === 'reveal') && choices.length === 4 && (
              <div className="choice-grid">
                {choices.map((choice, i) => (
                  <button
                    key={i}
                    className={`choice-btn ${BOX_CLASSES[i]} ${getChoiceClass(choice)}`}
                    onClick={() => !hasAnswered && handleSubmit(choice)}
                    disabled={hasAnswered || game.status === 'reveal'}
                  >
                    {choice}
                    {(hasAnswered || game.status === 'reveal') && choice === question.answer && ' ✓'}
                    {hasAnswered && choice === myAnswer && choice !== question.answer && ' ✗'}
                  </button>
                ))}
              </div>
            )}

            {/* Result banner */}
            {game.status === 'question' && hasAnswered && (
              <div className={`answered-banner ${myResult}`}>
                {myResult === 'correct' ? '✅ ' : '❌ '}{quote}
                {myCatch && myCatch.kg > 0 && (
                  <div style={{ marginTop:8, fontSize:18 }}>
                    {myCatch.emoji} <strong>{myCatch.name}</strong>
                    <span style={{ color: fishRarityColors[myCatch.rarity], marginLeft:8 }}>{myCatch.rarity}</span>
                    <span style={{ marginLeft:8, color:'var(--cyan)' }}>+{myCatch.kg} pts</span>
                  </div>
                )}
                {myCatch && myCatch.kg === 0 && (
                  <div style={{ marginTop:8, fontSize:16, color:'var(--muted)' }}>
                    {myCatch.emoji} {myCatch.name} — 0 pts
                  </div>
                )}
              </div>
            )}

            {/* Reveal phase */}
            {game.status === 'reveal' && question && (
              <div className="reveal-card">
                <div style={{ color:'var(--muted)', fontSize:14, fontWeight:700, marginBottom:8 }}>CORRECT ANSWER</div>
                <div className="reveal-answer">x = {question.answer}</div>
                <div style={{ color:'var(--cyan)', fontWeight:700, marginBottom:16 }}>{question.explanation}</div>
                {myResult === 'correct' && myCatch && (
                  <div style={{ color: fishRarityColors[myCatch.rarity] ?? 'var(--gold)', fontWeight:900, fontSize:20 }}>
                    {myCatch.emoji} +{myCatch.kg} pts &nbsp;· +50 🪙
                  </div>
                )}
                {myResult === 'incorrect' && (
                  <div style={{ color:'var(--muted)', fontSize:14 }}>
                    {wrongQuotes[Math.floor(Math.random() * wrongQuotes.length)]}
                  </div>
                )}
                {!hasAnswered && (
                  <div style={{ color:'var(--muted)', fontSize:14 }}>You didn't answer in time.</div>
                )}
              </div>
            )}
          </div>

          {/* Scoreboard */}
          <div style={{ width:180 }}>
            <div className="scoreboard">
              <div style={{ fontWeight:800, fontSize:13, marginBottom:8, color:'var(--muted)' }}>SCOREBOARD</div>
              {sorted.map(([uid, p], i) => (
                <div className="score-row" key={uid} style={uid === user.uid ? { color:'var(--cyan)' } : {}}>
                  <span className="score-rank">{i + 1}</span>
                  {p.characterEmoji
                    ? <span style={{ fontSize:16 }}>{p.characterEmoji}</span>
                    : p.isAdmin && <span style={{ fontSize:14 }}>👑</span>
                  }
                  <span style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', flex:1 }}>
                    {p.name?.split(' ')[0]}
                  </span>
                  <span className="score-pts">{Math.round(p.score ?? 0)} pts</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
