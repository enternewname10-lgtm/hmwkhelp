import { useState } from 'react'
import { signOut } from 'firebase/auth'
import { ref, set, get } from 'firebase/database'
import { auth, rtdb } from '../firebase'
import { shuffleQuestions } from '../data/questions'
import { findCharacter } from '../data/packs'
import { isAdmin } from '../utils/admin'

function generateRoomCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)]
  return code
}

export default function Home({ user, userDoc, navigate }) {
  const [joinCode,        setJoinCode]        = useState('')
  const [view,            setView]            = useState('main') // 'main' | 'create' | 'join' | 'customQ'
  const [error,           setError]           = useState('')
  const [creating,        setCreating]        = useState(false)
  const [modeChoice,      setModeChoice]      = useState('regular')
  const [questionMode,    setQuestionMode]    = useState('random') // 'random' | 'custom'
  const [customQuestions, setCustomQuestions] = useState([])
  const [qForm,           setQForm]           = useState({ equation: '', answer: '', hint: '' })
  const [qError,          setQError]          = useState('')

  const admin      = isAdmin(user)
  const coins      = userDoc?.coins ?? 0
  const activeChar = userDoc?.activeCharacter ? findCharacter(userDoc.activeCharacter) : null

  const myPlayerData = () => ({
    name:           user.displayName,
    photoURL:       user.photoURL,
    characterEmoji: activeChar?.emoji ?? null,
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
    const code = generateRoomCode()
    const gameRef = ref(rtdb, `games/${code}`)
    await set(gameRef, {
      host:              user.uid,
      hostName:          user.displayName,
      status:            'waiting',
      mode:              modeChoice,
      currentQuestion:   0,
      questionStartTime: null,
      questions:         questionMode === 'custom' ? customQuestions : shuffleQuestions(10),
      players: { [user.uid]: myPlayerData() },
    })
    setCreating(false)
    navigate('lobby', { roomCode: code, isHost: true, gameMode: modeChoice })
  }

  const handleJoin = async () => {
    const code = joinCode.trim().toUpperCase()
    if (code.length !== 6) { setError('Room codes are 6 characters.'); return }
    const gameRef = ref(rtdb, `games/${code}`)
    const snap = await get(gameRef)
    if (!snap.exists()) { setError('Room not found. Check the code and try again.'); return }
    const game = snap.val()
    if (game.status !== 'waiting') { setError('That game has already started.'); return }
    const playerRef = ref(rtdb, `games/${code}/players/${user.uid}`)
    await set(playerRef, myPlayerData())
    navigate('lobby', { roomCode: code, isHost: false, gameMode: game.mode ?? 'regular' })
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

  const handleSignOut = () => signOut(auth)

  return (
    <div className="screen-top">
      {/* Header */}
      <div className="home-header">
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <span style={{ fontSize:24 }}>🧮</span>
          <span className="nav-title">AlgebraBlast</span>
        </div>
        <div className="home-user">
          <div className="coin-badge" style={admin ? { borderColor:'var(--gold)', color:'#92400e' } : {}}>
            🪙 {admin ? '∞' : coins.toLocaleString()}
          </div>
          {admin && <span title="Admin" style={{ fontSize:18 }}>👑</span>}
          <img src={user?.photoURL} alt="avatar" className="avatar" width={36} height={36} />
          <button className="btn btn-ghost btn-sm" onClick={handleSignOut}>Sign out</button>
        </div>
      </div>

      {/* Welcome */}
      <div style={{ textAlign:'center', marginBottom:28 }}>
        {activeChar && (
          <div style={{ fontSize:52, marginBottom:4 }} title={activeChar.name}>{activeChar.emoji}</div>
        )}
        <h2>Welcome back, <span className="gradient-text">{user?.displayName?.split(' ')[0]}</span></h2>
        <p style={{ marginTop:4 }}>
          {activeChar
            ? <>Playing as <strong style={{ color:'var(--cyan)' }}>{activeChar.name}</strong> · <span style={{ cursor:'pointer', textDecoration:'underline' }} onClick={() => navigate('stats')}>Change</span></>
            : <>No character · <span style={{ cursor:'pointer', color:'var(--cyan)', textDecoration:'underline' }} onClick={() => navigate('stats')}>Pick one from Stats</span></>
          }
        </p>
      </div>

      {/* ── Main menu ── */}
      {view === 'main' && (
        <div className="home-grid">
          <div className="home-card" onClick={() => setView('create')}>
            <span className="home-card-emoji">🎮</span>
            <span className="home-card-title">Create Game</span>
            <span className="home-card-sub">Host a room for friends</span>
          </div>
          <div className="home-card" onClick={() => { setView('join'); setError('') }}>
            <span className="home-card-emoji">🚪</span>
            <span className="home-card-title">Join Game</span>
            <span className="home-card-sub">Enter a room code</span>
          </div>
          <div className="home-card" onClick={() => navigate('market')}>
            <span className="home-card-emoji">🛒</span>
            <span className="home-card-title">Market</span>
            <span className="home-card-sub">Spend coins on packs</span>
          </div>
          <div className="home-card" onClick={() => navigate('stats')}>
            <span className="home-card-emoji">📊</span>
            <span className="home-card-title">Stats</span>
            <span className="home-card-sub">Wins, losses &amp; collection</span>
          </div>
        </div>
      )}

      {/* ── Create game ── */}
      {view === 'create' && (
        <div className="join-card card">
          <h3 style={{ textAlign:'center' }}>Create Game</h3>

          {/* Mode picker */}
          <p style={{ fontWeight:500, color:'var(--text)', fontSize:13, marginBottom:4 }}>Game mode</p>
          {[
            { id:'regular', emoji:'🧮', label:'Regular',  sub:'Answer fast · earn kg · climb the leaderboard' },
            { id:'fishing', emoji:'🎣', label:'Fishing',  sub:'Get it right → cast your rod → catch fish' },
          ].map(m => (
            <div
              key={m.id}
              onClick={() => setModeChoice(m.id)}
              style={{
                padding:'12px 16px', borderRadius:10, cursor:'pointer',
                border:`2px solid ${modeChoice === m.id ? 'var(--cyan)' : '#e2e8f0'}`,
                background: modeChoice === m.id ? 'rgba(14,165,233,0.07)' : '#fafafa',
                display:'flex', flexDirection:'column', gap:2, transition:'all 0.12s',
              }}
            >
              <span style={{ fontWeight:600, fontSize:15 }}>{m.emoji} {m.label}</span>
              <span style={{ fontSize:12, color:'var(--muted)' }}>{m.sub}</span>
            </div>
          ))}

          {/* Question type */}
          <p style={{ fontWeight:500, color:'var(--text)', fontSize:13, marginBottom:4, marginTop:4 }}>Questions</p>
          {[
            { id:'random',  emoji:'🔀', label:'Random',       sub:'10 shuffled algebra questions' },
            { id:'custom',  emoji:'✏️', label:'My own',        sub:'Write your own equations' },
          ].map(q => (
            <div
              key={q.id}
              onClick={() => setQuestionMode(q.id)}
              style={{
                padding:'12px 16px', borderRadius:10, cursor:'pointer',
                border:`2px solid ${questionMode === q.id ? 'var(--purple)' : '#e2e8f0'}`,
                background: questionMode === q.id ? 'rgba(99,102,241,0.07)' : '#fafafa',
                display:'flex', flexDirection:'column', gap:2, transition:'all 0.12s',
              }}
            >
              <span style={{ fontWeight:600, fontSize:15 }}>{q.emoji} {q.label}</span>
              <span style={{ fontSize:12, color:'var(--muted)' }}>{q.sub}</span>
            </div>
          ))}

          {/* Custom question builder */}
          {questionMode === 'custom' && (
            <div style={{ marginTop:4, display:'flex', flexDirection:'column', gap:8 }}>
              <div style={{
                background:'#f8faff', border:'1.5px solid #e2e8f0',
                borderRadius:10, padding:14, display:'flex', flexDirection:'column', gap:8,
              }}>
                <input
                  type="text"
                  placeholder="Equation  e.g.  2x + 3 = 9"
                  value={qForm.equation}
                  onChange={e => setQForm(f => ({ ...f, equation: e.target.value }))}
                  onKeyDown={e => e.key === 'Enter' && addQuestion()}
                  style={{ fontSize:15 }}
                />
                <div style={{ display:'flex', gap:8 }}>
                  <input
                    type="number"
                    placeholder="Answer  e.g.  3"
                    value={qForm.answer}
                    onChange={e => setQForm(f => ({ ...f, answer: e.target.value }))}
                    onKeyDown={e => e.key === 'Enter' && addQuestion()}
                    style={{ flex:1, fontSize:15 }}
                  />
                  <input
                    type="text"
                    placeholder="Hint (optional)"
                    value={qForm.hint}
                    onChange={e => setQForm(f => ({ ...f, hint: e.target.value }))}
                    onKeyDown={e => e.key === 'Enter' && addQuestion()}
                    style={{ flex:2, fontSize:15 }}
                  />
                </div>
                {qError && <p style={{ color:'var(--red)', fontSize:12, margin:0 }}>{qError}</p>}
                <button className="btn btn-cyan btn-full" style={{ padding:'10px' }} onClick={addQuestion}>
                  + Add Question
                </button>
              </div>

              {/* Question list */}
              {customQuestions.length > 0 && (
                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  {customQuestions.map((q, i) => (
                    <div key={i} style={{
                      display:'flex', alignItems:'center', gap:8,
                      background:'#fff', border:'1px solid #e2e8f0',
                      borderRadius:8, padding:'8px 12px',
                    }}>
                      <span style={{ width:22, height:22, background:'var(--cyan)', color:'#fff', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:600, flexShrink:0 }}>{i+1}</span>
                      <span style={{ flex:1, fontSize:14, fontWeight:500 }}>{q.equation}</span>
                      <span style={{ fontSize:13, color:'var(--muted)' }}>= {q.answer}</span>
                      <button
                        onClick={() => removeQuestion(i)}
                        style={{ background:'none', border:'none', cursor:'pointer', color:'var(--red)', fontSize:16, padding:0, lineHeight:1 }}
                      >✕</button>
                    </div>
                  ))}
                </div>
              )}

              {customQuestions.length === 0 && (
                <p style={{ textAlign:'center', fontSize:13, color:'var(--muted)' }}>No questions yet — add one above.</p>
              )}
            </div>
          )}

          <button
            className="btn btn-primary btn-full"
            onClick={handleCreate}
            disabled={creating || (questionMode === 'custom' && customQuestions.length === 0)}
          >
            {creating ? 'Creating...' : '🚀 Create Room'}
          </button>
          <button className="btn btn-ghost btn-full" onClick={() => setView('main')}>Back</button>
        </div>
      )}

      {/* ── Join game ── */}
      {view === 'join' && (
        <div className="join-card card">
          <h3 style={{ textAlign:'center' }}>Join a Game</h3>
          <input
            type="text"
            placeholder="Enter room code  e.g. AB1234"
            value={joinCode}
            onChange={e => { setJoinCode(e.target.value.toUpperCase()); setError('') }}
            maxLength={6}
            onKeyDown={e => e.key === 'Enter' && handleJoin()}
            style={{ textAlign:'center', letterSpacing:4, fontSize:22 }}
          />
          {error && <p style={{ color:'var(--red)', textAlign:'center', fontWeight:500, fontSize:14 }}>{error}</p>}
          <button className="btn btn-cyan btn-full" onClick={handleJoin}>Join Room</button>
          <button className="btn btn-ghost btn-full" onClick={() => setView('main')}>Back</button>
        </div>
      )}
    </div>
  )
}
