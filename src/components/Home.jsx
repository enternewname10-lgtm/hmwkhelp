import { useState } from 'react'
import { signOut } from 'firebase/auth'
import { ref, set, get } from 'firebase/database'
import { auth, rtdb } from '../firebase'
import { shuffleQuestions } from '../data/questions'
import { findCharacter } from '../data/packs'

function generateRoomCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)]
  return code
}

export default function Home({ user, userDoc, navigate }) {
  const [joinCode, setJoinCode]   = useState('')
  const [view,     setView]       = useState('main') // 'main' | 'join'
  const [error,    setError]      = useState('')
  const [creating, setCreating]   = useState(false)

  const coins = userDoc?.coins ?? 0
  const activeChar = userDoc?.activeCharacter ? findCharacter(userDoc.activeCharacter) : null

  const myPlayerData = () => ({
    name:           user.displayName,
    photoURL:       user.photoURL,
    characterEmoji: activeChar?.emoji ?? null,
    score:          0,
    coinsEarned:    0,
    answers:        {},
  })

  const handleCreate = async () => {
    setCreating(true)
    const code = generateRoomCode()
    const gameRef = ref(rtdb, `games/${code}`)
    await set(gameRef, {
      host:              user.uid,
      hostName:          user.displayName,
      status:            'waiting',
      currentQuestion:   0,
      questionStartTime: null,
      questions:         shuffleQuestions(10),
      players: { [user.uid]: myPlayerData() },
    })
    setCreating(false)
    navigate('lobby', { roomCode: code, isHost: true })
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
    navigate('lobby', { roomCode: code, isHost: false })
  }

  const handleSignOut = () => signOut(auth)

  return (
    <div className="screen-top">
      {/* Header */}
      <div className="home-header">
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <span style={{ fontSize:28, fontWeight:900 }}>🧮</span>
          <span className="nav-title">AlgebraBlast</span>
        </div>
        <div className="home-user">
          <div className="coin-badge">🪙 {coins.toLocaleString()}</div>
          <img
            src={user?.photoURL}
            alt="avatar"
            className="avatar"
            width={40} height={40}
          />
          <button className="btn btn-ghost btn-sm" onClick={handleSignOut}>Sign out</button>
        </div>
      </div>

      {/* Welcome */}
      <div style={{ textAlign:'center', marginBottom:28 }}>
        {activeChar && (
          <div style={{ fontSize:56, marginBottom:4 }} title={activeChar.name}>
            {activeChar.emoji}
          </div>
        )}
        <h2>Welcome back, <span className="gradient-text">{user?.displayName?.split(' ')[0]}</span>!</h2>
        <p style={{ marginTop:4, color:'var(--muted)' }}>
          {activeChar
            ? <>Playing as <strong style={{ color:'var(--cyan)' }}>{activeChar.name}</strong> · <span style={{ cursor:'pointer', textDecoration:'underline' }} onClick={() => navigate('stats')}>Change</span></>
            : <>No character selected · <span style={{ cursor:'pointer', color:'var(--cyan)', textDecoration:'underline' }} onClick={() => navigate('stats')}>Pick one from Stats</span></>
          }
        </p>
      </div>

      {view === 'main' && (
        <div className="home-grid">
          <div className="home-card" onClick={handleCreate} style={{ opacity: creating ? 0.6 : 1 }}>
            <span className="home-card-emoji">🎮</span>
            <span className="home-card-title">{creating ? 'Creating...' : 'Create Game'}</span>
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

      {view === 'join' && (
        <div className="join-card card">
          <h3 style={{ textAlign:'center' }}>Join a Game</h3>
          <input
            type="text"
            placeholder="Enter room code (e.g. AB1234)"
            value={joinCode}
            onChange={e => { setJoinCode(e.target.value.toUpperCase()); setError('') }}
            maxLength={6}
            onKeyDown={e => e.key === 'Enter' && handleJoin()}
            style={{ textAlign:'center', letterSpacing:4, fontSize:22 }}
          />
          {error && <p style={{ color:'var(--red)', textAlign:'center', fontWeight:700, fontSize:14 }}>{error}</p>}
          <button className="btn btn-cyan btn-full" onClick={handleJoin}>Join Room</button>
          <button className="btn btn-ghost btn-full" onClick={() => setView('main')}>Back</button>
        </div>
      )}
    </div>
  )
}
