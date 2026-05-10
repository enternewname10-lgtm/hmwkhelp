import { useEffect, useState } from 'react'
import { ref, onValue, remove } from 'firebase/database'
import { rtdb } from '../firebase'

const PODIUM_COLORS = ['#f59e0b', '#94a3b8', '#cd7c3e']
const PODIUM_HEIGHTS = [120, 90, 70]

export default function Results({ user, roomCode, navigate }) {
  const [game, setGame] = useState(null)

  useEffect(() => {
    const gameRef = ref(rtdb, `games/${roomCode}`)
    const unsub = onValue(gameRef, (snap) => {
      if (snap.exists()) setGame(snap.val())
    })
    return unsub
  }, [roomCode])

  const handleHome = async () => {
    // Clean up game from RTDB
    if (game?.host === user.uid) {
      await remove(ref(rtdb, `games/${roomCode}`))
    }
    navigate('home')
  }

  if (!game) return <div className="loading">Loading results...</div>

  const players = game.players ? Object.entries(game.players) : []
  const sorted  = [...players].sort((a, b) => (b[1].score ?? 0) - (a[1].score ?? 0))
  const myData  = game.players?.[user.uid]
  const myCoins = myData?.coinsEarned ?? 0
  const myScore = myData?.score ?? 0
  const myRank  = sorted.findIndex(([uid]) => uid === user.uid) + 1

  const topThree = sorted.slice(0, 3)

  return (
    <div className="screen">
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:20, width:'100%' }}>
        {/* Header */}
        <div style={{ textAlign:'center' }}>
          <div style={{ fontSize:64, marginBottom:8 }}>
            {myRank === 1 ? '🏆' : myRank === 2 ? '🥈' : myRank === 3 ? '🥉' : '🎮'}
          </div>
          <h1 className="gradient-text">
            {myRank === 1 ? 'You Won!' : `You Finished #${myRank}`}
          </h1>
          <p style={{ marginTop:8 }}>
            Score: <strong style={{ color:'var(--cyan)' }}>{myScore.toLocaleString()} pts</strong> &nbsp;·&nbsp;
            Earned: <strong style={{ color:'var(--gold)' }}>+{myCoins} 🪙</strong>
          </p>
        </div>

        {/* Podium */}
        {topThree.length > 0 && (
          <div className="podium">
            {/* Reorder for visual podium: 2nd, 1st, 3rd */}
            {[topThree[1], topThree[0], topThree[2]].map((entry, visualIdx) => {
              if (!entry) return <div key={visualIdx} style={{ width:100 }} />
              const [uid, p] = entry
              const actualRank = visualIdx === 0 ? 2 : visualIdx === 1 ? 1 : 3
              return (
                <div className="podium-slot" key={uid}>
                  {p.photoURL && (
                    <img src={p.photoURL} alt="" className="avatar" width={36} height={36} />
                  )}
                  <div
                    className="podium-block"
                    style={{
                      background: PODIUM_COLORS[actualRank - 1],
                      height:     PODIUM_HEIGHTS[actualRank - 1],
                    }}
                  >
                    #{actualRank}
                  </div>
                  <div className="podium-name">{p.name?.split(' ')[0]}</div>
                  <div style={{ fontSize:13, color:'var(--gold)', fontWeight:700 }}>{(p.score ?? 0).toLocaleString()} pts</div>
                </div>
              )
            })}
          </div>
        )}

        {/* Full leaderboard */}
        <div className="leaderboard">
          {sorted.map(([uid, p], i) => (
            <div className={`lb-row ${uid === user.uid ? 'me' : ''}`} key={uid}>
              <span className="lb-rank">{i + 1}</span>
              {p.photoURL && (
                <img src={p.photoURL} alt="" className="avatar" width={28} height={28} />
              )}
              <span style={{ flex:1, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                {p.name} {uid === user.uid && '(you)'}
              </span>
              <span className="lb-score">{(p.score ?? 0).toLocaleString()} pts</span>
              <span className="lb-coins">+{p.coinsEarned ?? 0}🪙</span>
            </div>
          ))}
        </div>

        <div style={{ display:'flex', gap:12 }}>
          <button className="btn btn-ghost" onClick={() => navigate('market')}>🛒 Market</button>
          <button className="btn btn-primary btn-lg" onClick={handleHome}>🏠 Home</button>
        </div>
      </div>
    </div>
  )
}
