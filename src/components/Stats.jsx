import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { findCharacter, rarityColors } from '../data/packs'
import CharacterArt from './CharacterArt'

function Scene({ packId }) {
  if (packId === 'desert') return (
    <>
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, #f97316 0%, #fb923c 30%, #fbbf24 60%, #ca8a04 100%)' }} />
      <div style={{ position:'absolute', top:10, right:14, width:22, height:22, borderRadius:'50%', background:'#fef08a', boxShadow:'0 0 14px 6px rgba(253,224,71,0.65)' }} />
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:38, background:'#92400e', borderRadius:'55% 45% 0 0 / 24px 20px 0 0' }} />
      <div style={{ position:'absolute', bottom:0, right:-4, width:55, height:26, background:'#a16207', borderRadius:'60% 40% 0 0 / 16px 10px 0 0' }} />
      <div style={{ position:'absolute', bottom:24, left:'42%', width:18, height:7, background:'#38bdf8', borderRadius:'50%', opacity:0.75 }} />
    </>
  )

  if (packId === 'ocean') return (
    <>
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, #38bdf8 0%, #0284c7 35%, #075985 72%, #0c4a6e 100%)' }} />
      <div style={{ position:'absolute', top:0, left:'28%', width:9, height:'65%', background:'linear-gradient(180deg,rgba(255,255,255,0.18),transparent)', transform:'skewX(-12deg)' }} />
      <div style={{ position:'absolute', top:0, left:'52%', width:6, height:'50%', background:'linear-gradient(180deg,rgba(255,255,255,0.1),transparent)', transform:'skewX(8deg)' }} />
      {[{l:'12%',t:'32%',s:5},{l:'22%',t:'55%',s:3},{l:'68%',t:'28%',s:4},{l:'78%',t:'50%',s:3},{l:'45%',t:'18%',s:4}].map((b,i) => (
        <div key={i} style={{ position:'absolute', left:b.l, top:b.t, width:b.s, height:b.s, borderRadius:'50%', background:'rgba(255,255,255,0.5)', border:'1px solid rgba(255,255,255,0.3)' }} />
      ))}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:22, background:'#78350f' }} />
      <div style={{ position:'absolute', bottom:18, left:10, width:7, height:16, background:'#f97316', borderRadius:'4px 4px 0 0' }} />
      <div style={{ position:'absolute', bottom:18, left:16, width:5, height:10, background:'#fb7185', borderRadius:'4px 4px 0 0' }} />
      <div style={{ position:'absolute', bottom:18, right:8, width:6, height:13, background:'#ec4899', borderRadius:'4px 4px 0 0' }} />
    </>
  )

  if (packId === 'sky') return (
    <>
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, #0ea5e9 0%, #38bdf8 45%, #7dd3fc 80%, #e0f2fe 100%)' }} />
      <div style={{ position:'absolute', top:14, left:4, width:32, height:13, background:'rgba(255,255,255,0.92)', borderRadius:12 }} />
      <div style={{ position:'absolute', top:9, left:12, width:22, height:15, background:'rgba(255,255,255,0.95)', borderRadius:12 }} />
      <div style={{ position:'absolute', top:22, right:4, width:28, height:11, background:'rgba(255,255,255,0.85)', borderRadius:12 }} />
      <div style={{ position:'absolute', top:17, right:14, width:18, height:13, background:'rgba(255,255,255,0.9)', borderRadius:12 }} />
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:20, background:'#86efac' }} />
    </>
  )

  if (packId === 'christmas') return (
    <>
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, #0f172a 0%, #1e3a5f 40%, #1d4ed8 75%, #bfdbfe 100%)' }} />
      {[{l:'12%',t:'8%'},{l:'38%',t:'5%'},{l:'62%',t:'11%'},{l:'80%',t:'7%'},{l:'22%',t:'20%'},{l:'70%',t:'22%'}].map((s,i) => (
        <div key={i} style={{ position:'absolute', left:s.l, top:s.t, width:2, height:2, borderRadius:'50%', background:'#fff' }} />
      ))}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:28, background:'#f0f9ff', borderRadius:'50% 50% 0 0 / 14px 14px 0 0' }} />
      <div style={{ position:'absolute', bottom:24, right:8, width:0, height:0, borderLeft:'9px solid transparent', borderRight:'9px solid transparent', borderBottom:'22px solid #15803d' }} />
      <div style={{ position:'absolute', bottom:24, right:10, width:0, height:0, borderLeft:'7px solid transparent', borderRight:'7px solid transparent', borderBottom:'14px solid #166534' }} />
      {[{l:'20%',t:'35%'},{l:'50%',t:'28%'},{l:'75%',t:'40%'}].map((s,i) => (
        <div key={i} style={{ position:'absolute', left:s.l, top:s.t, width:3, height:3, borderRadius:'50%', background:'rgba(255,255,255,0.8)' }} />
      ))}
    </>
  )

  if (packId === 'forest') return (
    <>
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, #86efac 0%, #4ade80 28%, #16a34a 60%, #14532d 100%)' }} />
      <div style={{ position:'absolute', bottom:16, left:-4, width:0, height:0, borderLeft:'14px solid transparent', borderRight:'14px solid transparent', borderBottom:'40px solid #14532d' }} />
      <div style={{ position:'absolute', bottom:30, left:0, width:0, height:0, borderLeft:'10px solid transparent', borderRight:'10px solid transparent', borderBottom:'28px solid #166534' }} />
      <div style={{ position:'absolute', bottom:16, right:-4, width:0, height:0, borderLeft:'12px solid transparent', borderRight:'12px solid transparent', borderBottom:'34px solid #14532d' }} />
      <div style={{ position:'absolute', bottom:28, right:0, width:0, height:0, borderLeft:'9px solid transparent', borderRight:'9px solid transparent', borderBottom:'24px solid #166534' }} />
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:18, background:'#14532d' }} />
      <div style={{ position:'absolute', top:16, left:22, width:7, height:7, borderRadius:'50% 0', background:'rgba(74,222,128,0.7)', transform:'rotate(45deg)' }} />
      <div style={{ position:'absolute', top:28, right:20, width:5, height:5, borderRadius:'50% 0', background:'rgba(134,239,172,0.6)', transform:'rotate(-30deg)' }} />
    </>
  )

  if (packId === 'space') return (
    <>
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, #020617 0%, #0f0c29 45%, #1e1b4b 100%)' }} />
      {[{l:'8%',t:'6%',s:2},{l:'28%',t:'4%',s:1.5},{l:'52%',t:'10%',s:2},{l:'72%',t:'5%',s:1.5},{l:'88%',t:'18%',s:2},{l:'18%',t:'22%',s:1},{l:'62%',t:'26%',s:1.5},{l:'42%',t:'16%',s:1},{l:'80%',t:'30%',s:1}].map((s,i) => (
        <div key={i} style={{ position:'absolute', left:s.l, top:s.t, width:s.s, height:s.s, borderRadius:'50%', background:'#fff', opacity:0.85 }} />
      ))}
      <div style={{ position:'absolute', top:10, left:10, width:22, height:22, borderRadius:'50%', background:'linear-gradient(135deg, #a78bfa, #6d28d9)', boxShadow:'0 0 10px rgba(139,92,246,0.55)' }} />
      <div style={{ position:'absolute', top:19, left:4, width:34, height:9, border:'1.5px solid rgba(167,139,250,0.45)', borderRadius:'50%', transform:'rotateX(65deg)' }} />
    </>
  )

  return <div style={{ position:'absolute', inset:0, background:'var(--surface)' }} />
}

export default function Stats({ user, userDoc, navigate }) {
  const wins   = userDoc?.totalWins   ?? 0
  const losses = userDoc?.totalLosses ?? 0
  const played = userDoc?.gamesPlayed ?? 0
  const coins  = userDoc?.coins       ?? 0
  const winRate = played > 0 ? Math.round((wins / played) * 100) : 0
  const collection   = userDoc?.collection ?? []
  const activeCharId = userDoc?.activeCharacter ?? null

  const uniqueOwned = [...new Set(collection)]
  const ownedChars  = uniqueOwned.map(id => findCharacter(id)).filter(Boolean)

  const setActive = async (charId) => {
    const userRef = doc(db, 'users', user.uid)
    await updateDoc(userRef, { activeCharacter: charId })
  }

  return (
    <div className="screen-top">
      <div className="nav-bar">
        <span className="nav-title">Stats</span>
        <button className="btn btn-ghost btn-sm" onClick={() => navigate('home')}>← Back</button>
      </div>

      <div style={{ width: '100%', maxWidth: 620, marginTop: 8 }}>
        <h2 style={{ marginBottom: 20 }}>Your Stats</h2>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value" style={{ color: 'var(--success)' }}>{wins}</div>
            <div className="stat-label">wins</div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ color: 'var(--danger)' }}>{losses}</div>
            <div className="stat-label">losses</div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ color: 'var(--primary)' }}>{winRate}%</div>
            <div className="stat-label">win rate</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{played}</div>
            <div className="stat-label">played</div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ color: 'var(--gold)' }}>{coins.toLocaleString()}</div>
            <div className="stat-label">coins</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{uniqueOwned.length}</div>
            <div className="stat-label">characters</div>
          </div>
        </div>

        {played > 0 && (
          <div style={{ marginBottom: 40 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 12, fontWeight: 500, color: 'var(--muted)' }}>
              <span>Win rate</span><span>{winRate}%</span>
            </div>
            <div style={{ height: 5, background: 'var(--border)', borderRadius: 999, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${winRate}%`, background: 'var(--primary)', borderRadius: 999, transition: 'width 0.5s ease' }} />
            </div>
          </div>
        )}
      </div>

      {/* Collection */}
      <div style={{ width: '100%', maxWidth: 700 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 6 }}>
          <h3>Collection</h3>
          <span style={{ color: 'var(--muted)', fontWeight: 400, fontSize: 13 }}>
            {uniqueOwned.length} character{uniqueOwned.length !== 1 ? 's' : ''}
          </span>
        </div>
        <p style={{ fontSize: 13, marginBottom: 16 }}>Tap a card to use that character in games.</p>

        {ownedChars.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', color: 'var(--muted)', padding: '40px 24px' }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>📦</div>
            <p style={{ marginBottom: 16 }}>No characters yet. Open packs in the Market.</p>
            <button className="btn btn-primary" onClick={() => navigate('market')}>Go to Market</button>
          </div>
        ) : (
          <div className="collection-grid">
            {ownedChars.map(char => {
              const isActive = char.id === activeCharId
              const rawId    = char.id.split('_')[0]
              const packId   = rawId === 'xmas' ? 'christmas' : rawId
              const rc       = rarityColors[char.rarity]
              return (
                <div
                  key={char.id}
                  className="char-card"
                  onClick={() => setActive(isActive ? null : char.id)}
                  style={{
                    outline: isActive ? `2px solid ${rc}` : '2px solid transparent',
                    transform: isActive ? 'scale(1.04)' : undefined,
                    transition: 'all 0.15s',
                  }}
                  title={isActive ? 'Active — click to deselect' : 'Click to use in game'}
                >
                  <div style={{ position: 'relative', width: '100%', height: 88, overflow: 'hidden' }}>
                    <Scene packId={packId} />
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <CharacterArt charId={char.id} size={54} />
                    </div>
                    {isActive && (
                      <div style={{ position: 'absolute', top: 5, right: 5, background: rc, borderRadius: '50%', width: 14, height: 14, fontSize: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 600 }}>✓</div>
                    )}
                  </div>

                  <div style={{ height: 3, background: rc, width: '100%' }} />
                  <div style={{ padding: '7px 8px 5px', width: '100%' }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text)', marginBottom: 1 }}>{char.name}</div>
                    <div style={{ fontSize: 9, fontWeight: 500, color: isActive ? rc : 'var(--subtle)', textTransform: 'uppercase', letterSpacing: 0.4 }}>
                      {isActive ? '● active' : char.rarity}
                    </div>
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
