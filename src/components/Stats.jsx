import { findCharacter, rarityColors } from '../data/packs'

export default function Stats({ userDoc, navigate }) {
  const wins   = userDoc?.totalWins   ?? 0
  const losses = userDoc?.totalLosses ?? 0
  const played = userDoc?.gamesPlayed ?? 0
  const coins  = userDoc?.coins       ?? 0
  const winRate = played > 0 ? Math.round((wins / played) * 100) : 0
  const collection = userDoc?.collection ?? []

  // Deduplicate and look up character data
  const uniqueOwned = [...new Set(collection)]
  const ownedChars  = uniqueOwned.map(id => findCharacter(id)).filter(Boolean)

  return (
    <div className="screen-top">
      {/* Nav */}
      <div className="nav-bar">
        <span className="nav-title">📊 Stats</span>
        <button className="btn btn-ghost btn-sm" onClick={() => navigate('home')}>← Back</button>
      </div>

      <h2 style={{ marginBottom:24 }}>Your Stats</h2>

      {/* Stat cards */}
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

      {/* Win rate bar */}
      {played > 0 && (
        <div style={{ width:'100%', maxWidth:700, marginBottom:32 }}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6, fontSize:13, fontWeight:700, color:'var(--muted)' }}>
            <span>Win Rate</span>
            <span>{winRate}%</span>
          </div>
          <div style={{ height:12, background:'rgba(255,255,255,0.08)', borderRadius:999, overflow:'hidden' }}>
            <div
              style={{
                height:'100%',
                width: `${winRate}%`,
                background:'linear-gradient(90deg, var(--purple), var(--cyan))',
                borderRadius:999,
                transition:'width 0.5s ease',
              }}
            />
          </div>
        </div>
      )}

      {/* Collection */}
      <div style={{ width:'100%', maxWidth:700 }}>
        <h3 style={{ marginBottom:16 }}>
          Collection
          <span style={{ color:'var(--muted)', fontWeight:600, fontSize:14, marginLeft:8 }}>
            {uniqueOwned.length} character{uniqueOwned.length !== 1 ? 's' : ''}
          </span>
        </h3>

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
            {ownedChars.map(char => (
              <div
                className="char-card"
                key={char.id}
                style={{ borderColor: rarityColors[char.rarity] + '55' }}
              >
                <span className="char-emoji">{char.emoji}</span>
                <span className="char-name" style={{ color: rarityColors[char.rarity] }}>
                  {char.rarity}
                </span>
                <span className="char-name">{char.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
