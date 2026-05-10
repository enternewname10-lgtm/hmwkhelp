import { useEffect, useRef, useState } from 'react'
import { ref, onValue, update } from 'firebase/database'
import { doc, updateDoc, increment } from 'firebase/firestore'
import { rtdb, db } from '../firebase'
import { wrongQuotes, correctQuotes } from '../data/questions'

const QUESTION_TIME = 20 // seconds
const REVEAL_TIME   = 5  // seconds

export default function GamePlay({ user, roomCode, isHost, navigate }) {
  const [game,        setGame]        = useState(null)
  const [myAnswer,    setMyAnswer]    = useState('')
  const [hasAnswered, setHasAnswered] = useState(false)
  const [timeLeft,    setTimeLeft]    = useState(QUESTION_TIME)
  const [myResult,    setMyResult]    = useState(null) // 'correct' | 'incorrect'
  const [quote,       setQuote]       = useState('')
  const timerRef = useRef(null)

  useEffect(() => {
    const gameRef = ref(rtdb, `games/${roomCode}`)
    const unsub = onValue(gameRef, (snap) => {
      if (!snap.exists()) { navigate('home'); return }
      const data = snap.val()
      setGame(data)
    })
    return unsub
  }, [roomCode])

  // Reset per-question UI state when question changes
  useEffect(() => {
    if (!game) return
    setMyAnswer('')
    setHasAnswered(false)
    setMyResult(null)
    setQuote('')
    setTimeLeft(QUESTION_TIME)
  }, [game?.currentQuestion])

  // Timer tick
  useEffect(() => {
    if (!game) return
    if (game.status === 'finished') { navigate('results'); return }
    if (game.status !== 'question' && game.status !== 'reveal') return

    clearInterval(timerRef.current)
    timerRef.current = setInterval(async () => {
      if (!game.questionStartTime) return

      if (game.status === 'question') {
        const elapsed = (Date.now() - game.questionStartTime) / 1000
        const remaining = Math.max(0, QUESTION_TIME - elapsed)
        setTimeLeft(Math.ceil(remaining))

        // Host drives transitions
        if (isHost && remaining <= 0) {
          clearInterval(timerRef.current)
          await update(ref(rtdb, `games/${roomCode}`), {
            status:            'reveal',
            questionStartTime: Date.now(),
          })
        }
      } else if (game.status === 'reveal') {
        const elapsed = (Date.now() - game.questionStartTime) / 1000
        const remaining = Math.max(0, REVEAL_TIME - elapsed)
        setTimeLeft(Math.ceil(remaining))

        if (isHost && remaining <= 0) {
          clearInterval(timerRef.current)
          const nextQ = (game.currentQuestion ?? 0) + 1
          const total = game.questions?.length ?? 10
          if (nextQ >= total) {
            await update(ref(rtdb, `games/${roomCode}`), { status: 'finished' })
          } else {
            await update(ref(rtdb, `games/${roomCode}`), {
              status:            'question',
              currentQuestion:   nextQ,
              questionStartTime: Date.now(),
            })
          }
        }
      }
    }, 200)

    return () => clearInterval(timerRef.current)
  }, [game?.status, game?.questionStartTime, game?.currentQuestion])

  // Navigate to results when finished
  useEffect(() => {
    if (game?.status === 'finished') {
      finalizeUserStats()
      navigate('results', { roomCode })
    }
  }, [game?.status])

  const finalizeUserStats = async () => {
    if (!game || !user) return
    const players = game.players ?? {}
    const myData  = players[user.uid]
    if (!myData) return

    const scores = Object.values(players).map(p => p.score ?? 0)
    const myScore = myData.score ?? 0
    const won = myScore >= Math.max(...scores) && scores.filter(s => s === myScore).length === 1

    const userRef = doc(db, 'users', user.uid)
    await updateDoc(userRef, {
      coins:       increment(myData.coinsEarned ?? 0),
      gamesPlayed: increment(1),
      ...(won ? { totalWins: increment(1) } : { totalLosses: increment(1) }),
    })
  }

  const handleSubmit = async () => {
    if (hasAnswered || !game) return
    const qIdx    = game.currentQuestion ?? 0
    const question = game.questions?.[qIdx]
    if (!question) return

    const parsed  = parseInt(myAnswer, 10)
    const correct = parsed === question.answer

    setHasAnswered(true)
    setMyResult(correct ? 'correct' : 'incorrect')
    setQuote(
      correct
        ? correctQuotes[Math.floor(Math.random() * correctQuotes.length)]
        : wrongQuotes[Math.floor(Math.random() * wrongQuotes.length)]
    )

    const points = correct ? Math.max(50, timeLeft * 50) : 0

    const updates = {
      [`players/${user.uid}/answers/${qIdx}`]: { submitted: true, correct, points },
    }
    if (correct) {
      updates[`players/${user.uid}/score`]       = (game.players?.[user.uid]?.score ?? 0) + points
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
          {/* Main area */}
          <div style={{ flex:1, display:'flex', flexDirection:'column', gap:12 }}>

            {/* Question */}
            {question && (
              <div className="question-card">
                <div className="question-label">Solve for x</div>
                <div className="equation">{question.equation}</div>
                {game.status === 'question' && !hasAnswered && (
                  <div className="hint-text">💡 Hint: {question.hint}</div>
                )}
              </div>
            )}

            {/* Answer input */}
            {game.status === 'question' && !hasAnswered && (
              <div className="answer-row">
                <input
                  type="number"
                  placeholder="Your answer..."
                  value={myAnswer}
                  onChange={e => setMyAnswer(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                  autoFocus
                />
                <button
                  className="btn btn-primary"
                  onClick={handleSubmit}
                  disabled={myAnswer === ''}
                >
                  Submit
                </button>
              </div>
            )}

            {/* Waiting after answer */}
            {game.status === 'question' && hasAnswered && (
              <div className={`answered-banner ${myResult}`}>
                {myResult === 'correct' ? '✅ ' : '❌ '}{quote}
              </div>
            )}

            {/* Reveal phase */}
            {game.status === 'reveal' && question && (
              <div className="reveal-card">
                <div style={{ color:'var(--muted)', fontSize:14, fontWeight:700, marginBottom:8 }}>
                  CORRECT ANSWER
                </div>
                <div className="reveal-answer">x = {question.answer}</div>
                <div style={{ color:'var(--cyan)', fontWeight:700, marginBottom:16 }}>
                  {question.explanation}
                </div>
                {myResult === 'incorrect' && (
                  <div style={{ color:'var(--muted)', fontSize:14 }}>
                    {wrongQuotes[Math.floor(Math.random() * wrongQuotes.length)]}
                  </div>
                )}
                {myResult === 'correct' && (
                  <div style={{ color:'var(--gold)', fontWeight:900, fontSize:20 }}>
                    +{Math.max(50, timeLeft * 50)} pts &nbsp;· +50 🪙
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
              <div style={{ fontWeight:800, fontSize:13, marginBottom:8, color:'var(--muted)' }}>
                SCOREBOARD
              </div>
              {sorted.map(([uid, p], i) => (
                <div className="score-row" key={uid} style={uid === user.uid ? { color:'var(--purple2)' } : {}}>
                  <span className="score-rank">{i + 1}</span>
                  {p.characterEmoji && (
                    <span style={{ fontSize:16 }}>{p.characterEmoji}</span>
                  )}
                  <span style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', flex:1 }}>
                    {p.name?.split(' ')[0]}
                  </span>
                  <span className="score-pts">{(p.score ?? 0).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
