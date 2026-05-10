import { useEffect, useState } from 'react'
import { ref, onValue, update, remove } from 'firebase/database'
import { rtdb } from '../firebase'

export default function Lobby({ user, roomCode, isHost, navigate }) {
  const [game, setGame] = useState(null)

  useEffect(() => {
    const gameRef = ref(rtdb, `games/${roomCode}`)
    const unsub = onValue(gameRef, (snap) => {
      if (!snap.exists()) { navigate('home'); return }
      const data = snap.val()
      setGame(data)
      if (data.status === 'question') navigate('game')
    })
    return unsub
  }, [roomCode])

  const handleStart = async () => {
    await update(ref(rtdb, `games/${roomCode}`), {
      status:            'question',
      currentQuestion:   0,
      questionStartTime: Date.now(),
    })
  }

  const handleLeave = async () => {
    if (isHost) {
      // Host leaving deletes the game
      await remove(ref(rtdb, `games/${roomCode}`))
    } else {
      await remove(ref(rtdb, `games/${roomCode}/players/${user.uid}`))
    }
    navigate('home')
  }

  const copyCode = () => navigator.clipboard.writeText(roomCode)

  if (!game) return <div className="loading">Loading lobby...</div>

  const players = game.players ? Object.entries(game.players) : []

  return (
    <div className="screen">
      <div style={{ width:'100%', maxWidth:560, display:'flex', flexDirection:'column', gap:20 }}>
        {/* Title */}
        <div style={{ textAlign:'center' }}>
          <h2 className="mb-8">Game Lobby</h2>
          <p style={{ color:'var(--muted)' }}>Share the code below with friends</p>
        </div>

        {/* Room code */}
        <div
          className="room-code"
          onClick={copyCode}
          title="Click to copy"
        >
          {roomCode}
        </div>
        <p style={{ textAlign:'center', color:'var(--muted)', fontSize:13 }}>Click code to copy</p>

        {/* Player list */}
        <div className="card">
          <h3 style={{ marginBottom:12 }}>Players ({players.length})</h3>
          <div className="player-list">
            {players.map(([uid, p]) => (
              <div className="player-chip" key={uid}>
                {p.characterEmoji
                  ? <span style={{ fontSize:20 }}>{p.characterEmoji}</span>
                  : p.photoURL && <img src={p.photoURL} alt="" className="avatar" width={24} height={24} />
                }
                <span>{p.name}</span>
                {uid === game.host && (
                  <span style={{ fontSize:11, color:'var(--gold)', fontWeight:800 }}>HOST</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        {isHost ? (
          <button
            className="btn btn-primary btn-lg btn-full"
            onClick={handleStart}
            disabled={players.length < 1}
          >
            🚀 Start Game ({players.length} player{players.length !== 1 ? 's' : ''})
          </button>
        ) : (
          <div className="card" style={{ textAlign:'center', color:'var(--muted)', fontWeight:700 }}>
            ⏳ Waiting for the host to start the game...
          </div>
        )}

        <button className="btn btn-ghost btn-full" onClick={handleLeave}>
          Leave Lobby
        </button>
      </div>
    </div>
  )
}
