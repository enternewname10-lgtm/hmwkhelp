import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { packs, findCharacter, rarityColors } from '../data/packs'

export default function Stats({ user, userDoc, navigate }) {
  const wins   = userDoc?.totalWins   ?? 0
  const losses = userDoc?.totalLosses ?? 0
  const played = userDoc?.gamesPlayed ?? 0
  const coins  = userDoc?.coins       ?? 0
  const winRate = played > 0 ? Math.round((wins / played) * 100) : 0
  const collection     = userDoc?.collection ?? []
  const activeCharId   = userDoc?.activeCharacter ?? null

  const uniqueOwned = [...new Set(collection)]
  const ownedChars  = uniqueOwned.map(id => findCharacter(id)).filter(Boolean)

  const setActive = async (charId) => {
    const userRef = doc(db, 'users', user.uid)
    await updateDoc(userRef, { activeCharacter: charId })
  }

  return (
    <div className="screen-top">
      <div className="nav-bar">
        <span className="nav-title">📊 Stats</span>
        <button className="btn btn-ghost btn-sm" onClick={() => navigate('home')}>← Back</button>
      </div>

      <h2 style={{ marginBottom:24 }}>Your Stats</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value" style={{ color:'var(--green)' }}>{wins}</div>
          <div className="stat-label">WINS</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color:'var(--red)' }}>{losses}</div>
          <div className="stat-label">LOSSES</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color:'var(--cyan)' }}>{winRate}%</div>
          <div className="stat-label">WIN RATE</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{played}</div>
          <div className="stat-label">GAMES PLAYED</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color:'var(--gold)' }}>{coins.toLocaleString()}</div>
          <div className="stat-label">COINS</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color:'var(--purple2)' }}>{uniqueOwned.length}</div>
          <div className="stat-label">CHARACTERS</div>
        </div>
      </div>

      {played > 0 && (
        <div style={{ width:'100%', maxWidth:700, marginBottom:32 }}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6, fontSize:13, fontWeight:700, color:'var(--muted)' }}>
            <span>Win Rate</span><span>{winRate}%</span>
          </div>
          <div style={{ height:10, background:'#e2e8f0', borderRadius:999, overflow:'hidden' }}>
            <div style={{
              height:'100%', width:`${winRate}%`,
              background:'linear-gradient(90deg, var(--purple), var(--cyan))',
              borderRadius:999, transition:'width 0.5s ease',
            }} />
          </div>
        </div>
      )}

      {/* Collection */}
      <div style={{ width:'100%', maxWidth:700 }}>
        <h3 style={{ marginBottom:4 }}>
          Collection
          <span style={{ color:'var(--muted)', fontWeight:600, fontSize:14, marginLeft:8 }}>
            {uniqueOwned.length} character{uniqueOwned.length !== 1 ? 's' : ''}
          </span>
        </h3>
        <p style={{ fontSize:13, marginBottom:16 }}>Tap a character to use it as your in-game profile.</p>

        {ownedChars.length === 0 ? (
          <div className="card" style={{ textAlign:'center', color:'var(--muted)', padding:40 }}>
            <div style={{ fontSize:48, marginBottom:12 }}>📦</div>
            <p>No characters yet! Open packs in the Market to start collecting.</p>
            <button className="btn btn-primary mt-16" onClick={() => navigate('market')}>
              Go to Market
            </button>
          </div>
        ) : (
          <div className="collection-grid">
            {ownedChars.map(char => {
              const isActive = char.id === activeCharId
              const rawId    = char.id.split('_')[0]
              const packId   = rawId === 'xmas' ? 'christmas' : rawId
              const pack     = packs.find(p => p.id === packId)
              const rc       = rarityColors[char.rarity]
              return (
                <div
                  key={char.id}
                  className="char-card"
                  onClick={() => setActive(isActive ? null : char.id)}
                  style={{
                    cursor: 'pointer',
                    outline: isActive ? `2px solid ${rc}` : '2px solid transparent',
                    transform: isActive ? 'scale(1.05)' : undefined,
                    transition: 'all 0.15s',
                  }}
                  title={isActive ? 'Active — click to deselect' : 'Click to use in game'}
                >
                  {/* Rarity bar at top */}
                  <div style={{ height: 4, background: rc, width:'100%', borderRadius:'4px 4px 0 0', marginBottom: 10 }} />

                  {/* Pack scene strip */}
                  {pack?.theme && (
                    <div style={{ fontSize: 13, letterSpacing: 2, opacity: 0.5, marginBottom: 6, lineHeight:1 }}>
                      {pack.theme.scene.join(' ')}
                    </div>
                  )}

                  {/* Character emoji */}
                  <div style={{ fontSize: 38, lineHeight: 1, marginBottom: 8 }}>{char.emoji}</div>

                  {/* Name */}
                  <div style={{ fontSize: 11, fontWeight: 600, color: '#1e293b', letterSpacing: 0.3, marginBottom: 2 }}>
                    {char.name}
                  </div>

                  {/* Rarity */}
                  <div style={{
                    fontSize: 9, fontWeight: 500, letterSpacing: 1,
                    color: rc, textTransform: 'uppercase',
                  }}>
                    {isActive ? '● active' : char.rarity}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
