import { useState } from 'react'
import { ref, set, get } from 'firebase/database'
import { rtdb } from '../firebase'
import { shuffleQuestions } from '../data/questions'
import { isAdmin } from '../utils/admin'

function generateRoomCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)]
  return code
}

export default function Home({ user, userDoc, navigate }) {
  const [joinCode,        setJoinCode]        = useState('')
  const [view,            setView]            = useState('main')
  const [error,           setError]           = useState('')
  const [creating,        setCreating]        = useState(false)
  const [modeChoice,      setModeChoice]      = useState('regular')
  const [questionMode,    setQuestionMode]    = useState('random')
  const [customQuestions, setCustomQuestions] = useState([])
  const [qForm,           setQForm]           = useState({ equation: '', answer: '', hint: '' })
  const [qError,          setQError]          = useState('')

  const admin = isAdmin(user)

  const myPlayerData = () => ({
    name:           user.isAnonymous ? `Guest#${user.uid.slice(-4).toUpperCase()}` : user.displayName,
    photoURL:       user.photoURL ?? null,
    characterEmoji: userDoc?.activeCharacter ?? null,
    isAdmin:        admin,
    score:          0,
    coinsEarned:    0,
    answers:        {},
  })

  const handleCreate = async () => {
    if (questionMode === 'custom' && customQuestions.length === 0) {
      setQError('Add at least one question before creating the room.')
      return
    }
    setCreating(true)
    setError('')
    try {
      const code = generateRoomCode()
      const gameRef = ref(rtdb, `games/${code}`)
      await set(gameRef, {
        host:              user.uid,
        hostName:          user.isAnonymous ? `Guest#${user.uid.slice(-4).toUpperCase()}` : user.displayName,
        status:            'waiting',
        mode:              modeChoice,
        currentQuestion:   0,
        questionStartTime: null,
        questions:         questionMode === 'custom' ? customQuestions : shuffleQuestions(10),
        players: { [user.uid]: myPlayerData() },
      })
      navigate('lobby', { roomCode: code, isHost: true, gameMode: modeChoice })
    } catch (err) {
      console.error(err)
      if (err.code === 'PERMISSION_DENIED') {
        setError('Firebase permission denied. Go to Firebase Console → Realtime Database → Rules and allow authenticated writes.')
      } else {
        setError(`Failed to create room: ${err.message}`)
      }
    } finally {
      setCreating(false)
    }
  }

  const handleJoin = async () => {
    const code = joinCode.trim().toUpperCase()
    if (code.length !== 6) { setError('Room codes are 6 characters.'); return }
    setError('')
    try {
      const gameRef = ref(rtdb, `games/${code}`)
      const snap = await get(gameRef)
      if (!snap.exists()) { setError('Room not found. Check the code and try again.'); return }
      const game = snap.val()
      if (game.status !== 'waiting') { setError('That game has already started.'); return }
      const playerRef = ref(rtdb, `games/${code}/players/${user.uid}`)
      await set(playerRef, myPlayerData())
      navigate('lobby', { roomCode: code, isHost: false, gameMode: game.mode ?? 'regular' })
    } catch (err) {
      console.error(err)
      if (err.code === 'PERMISSION_DENIED') {
        setError('Firebase permission denied. Go to Firebase Console → Realtime Database → Rules and allow authenticated writes.')
      } else {
        setError(`Failed to join room: ${err.message}`)
      }
    }
  }

  const addQuestion = () => {
    const eq  = qForm.equation.trim()
    const ans = qForm.answer.trim()
    if (!eq) { setQError('Enter an equation.'); return }
    if (ans === '' || isNaN(parseInt(ans, 10))) { setQError('Enter a valid integer answer.'); return }
    setQError('')
    setCustomQuestions(prev => [...prev, {
      equation:    eq,
      answer:      parseInt(ans, 10),
      hint:        qForm.hint.trim() || 'Think carefully!',
      explanation: `x = ${ans}`,
    }])
    setQForm({ equation: '', answer: '', hint: '' })
  }

  const removeQuestion = (i) => setCustomQuestions(prev => prev.filter((_, idx) => idx !== i))

  const selectionStyle = (active) => ({
    padding: '11px 14px',
    borderRadius: 8,
    cursor: 'pointer',
    border: `1px solid ${active ? 'var(--primary)' : 'var(--border)'}`,
    background: active ? 'var(--primary-dim)' : 'transparent',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    marginBottom: 6,
    transition: 'all 0.12s',
  })

  return (
    <div className="screen-top" style={{ paddingTop: 32 }}>

      {/* Greeting */}
      <div style={{ width: '100%', maxWidth: 560, marginBottom: 32 }}>
        <h2>Hi, {user?.displayName?.split(' ')[0]}</h2>
        <p style={{ marginTop: 4, fontSize: 13 }}>Ready to play? Create a room or join one below.</p>
      </div>

      {/* ── Main ── */}
      {view === 'main' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, width: '100%', maxWidth: 560 }}>
          <div className="home-card" onClick={() => setView('create')}>
            <div className="home-card-icon">🎮</div>
            <div className="home-card-title">Create Game</div>
            <div className="home-card-sub">Host a room for your class</div>
          </div>
          <div className="home-card" onClick={() => { setView('join'); setError('') }}>
            <div className="home-card-icon">🚪</div>
            <div className="home-card-title">Join Game</div>
            <div className="home-card-sub">Enter a room code</div>
          </div>
        </div>
      )}

      {/* ── Create game ── */}
      {view === 'create' && (
        <div className="join-card card">
          <h3>Create a Game</h3>

          <div>
            <p style={{ fontWeight: 500, color: 'var(--text-2)', fontSize: 13, marginBottom: 8 }}>Game mode</p>
            {[
              { id: 'regular', emoji: '🧮', label: 'Regular', sub: 'Answer fast · earn points · leaderboard' },
              { id: 'fishing', emoji: '🎣', label: 'Fishing',  sub: 'Get it right → cast → catch fish' },
            ].map(m => (
              <div key={m.id} onClick={() => setModeChoice(m.id)} style={selectionStyle(modeChoice === m.id)}>
                <span style={{ fontWeight: 600, fontSize: 14 }}>{m.emoji} {m.label}</span>
                <span style={{ fontSize: 12, color: 'var(--muted)' }}>{m.sub}</span>
              </div>
            ))}
          </div>

          <div>
            <p style={{ fontWeight: 500, color: 'var(--text-2)', fontSize: 13, marginBottom: 8 }}>Questions</p>
            {[
              { id: 'random', emoji: '🔀', label: 'Random', sub: '10 shuffled algebra questions' },
              { id: 'custom', emoji: '✏️', label: 'Custom',  sub: 'Write your own equations' },
            ].map(q => (
              <div key={q.id} onClick={() => setQuestionMode(q.id)} style={selectionStyle(questionMode === q.id)}>
                <span style={{ fontWeight: 600, fontSize: 14 }}>{q.emoji} {q.label}</span>
                <span style={{ fontSize: 12, color: 'var(--muted)' }}>{q.sub}</span>
              </div>
            ))}
          </div>

          {questionMode === 'custom' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <input
                  type="text"
                  placeholder="Equation — e.g. 2x + 3 = 9"
                  value={qForm.equation}
                  onChange={e => setQForm(f => ({ ...f, equation: e.target.value }))}
                  onKeyDown={e => e.key === 'Enter' && addQuestion()}
                />
                <div style={{ display: 'flex', gap: 8 }}>
                  <input
                    type="number"
                    placeholder="Answer"
                    value={qForm.answer}
                    onChange={e => setQForm(f => ({ ...f, answer: e.target.value }))}
                    onKeyDown={e => e.key === 'Enter' && addQuestion()}
                    style={{ flex: 1 }}
                  />
                  <input
                    type="text"
                    placeholder="Hint (optional)"
                    value={qForm.hint}
                    onChange={e => setQForm(f => ({ ...f, hint: e.target.value }))}
                    onKeyDown={e => e.key === 'Enter' && addQuestion()}
                    style={{ flex: 2 }}
                  />
                </div>
                {qError && <p style={{ color: 'var(--danger)', fontSize: 12, margin: 0 }}>{qError}</p>}
                <button className="btn btn-primary btn-full" style={{ padding: 9 }} onClick={addQuestion}>
                  Add Question
                </button>
              </div>

              {customQuestions.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  {customQuestions.map((q, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 7, padding: '7px 12px' }}>
                      <span style={{ width: 20, height: 20, background: 'var(--primary)', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 600, flexShrink: 0 }}>{i + 1}</span>
                      <span style={{ flex: 1, fontSize: 13, fontWeight: 500, color: 'var(--text)' }}>{q.equation}</span>
                      <span style={{ fontSize: 12, color: 'var(--muted)' }}>= {q.answer}</span>
                      <button onClick={() => removeQuestion(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--danger)', fontSize: 15, padding: 0, lineHeight: 1 }}>✕</button>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--muted)' }}>No questions yet — add one above.</p>
              )}
            </div>
          )}

          <button
            className="btn btn-primary btn-full"
            onClick={handleCreate}
            disabled={creating || (questionMode === 'custom' && customQuestions.length === 0)}
          >
            {creating ? 'Creating...' : 'Create Room'}
          </button>
          <button className="btn btn-ghost btn-full" onClick={() => setView('main')}>Back</button>
        </div>
      )}

      {/* ── Join game ── */}
      {view === 'join' && (
        <div className="join-card card">
          <h3>Join a Game</h3>
          <input
            type="text"
            placeholder="Room code — e.g. AB1234"
            value={joinCode}
            onChange={e => { setJoinCode(e.target.value.toUpperCase()); setError('') }}
            maxLength={6}
            onKeyDown={e => e.key === 'Enter' && handleJoin()}
            style={{ textAlign: 'center', letterSpacing: 5, fontSize: 20, fontWeight: 600 }}
          />
          {error && <p style={{ color: 'var(--danger)', fontSize: 13 }}>{error}</p>}
          <button className="btn btn-primary btn-full" onClick={handleJoin}>Join Room</button>
          <button className="btn btn-ghost btn-full" onClick={() => setView('main')}>Back</button>
        </div>
      )}
    </div>
  )
}
