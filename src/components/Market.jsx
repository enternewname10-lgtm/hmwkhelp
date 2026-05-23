import { useState, useEffect } from 'react'
import { doc, updateDoc, increment, arrayUnion } from 'firebase/firestore'
import { db } from '../firebase'
import { packs, pullFromPack, rarityColors } from '../data/packs'

function Confetti({ color }) {
  const pieces = Array.from({ length: 40 }, (_, i) => {
    const angle = (i / 40) * Math.PI * 2
    const dist  = 120 + Math.random() * 180
    return {
      id:    i,
      tx:    Math.cos(angle) * dist,
      ty:    Math.sin(angle) * dist - 80,
      rot:   Math.random() * 720 - 360,
      size:  5 + Math.random() * 7,
      delay: Math.random() * 0.25,
      shape: i % 3,
    }
  })
  return (
    <div style={{ position:'absolute', inset:0, pointerEvents:'none', display:'flex', alignItems:'center', justifyContent:'center' }}>
      {pieces.map(p => (
        <div key={p.id} style={{
          position:        'absolute',
          width:           p.shape === 2 ? p.size * 2 : p.size,
          height:          p.size,
          background:      color,
          borderRadius:    p.shape === 0 ? '50%' : 3,
          opacity:         0,
          '--tx':          `${p.tx}px`,
          '--ty':          `${p.ty}px`,
          '--rot':         `${p.rot}deg`,
          animation:       `confettiBurst 0.9s ease-out forwards`,
          animationDelay:  `${p.delay}s`,
        }} />
      ))}
    </div>
  )
}

function PackOpeningScene({ pack }) {
  const [stage, setStage] = useState(0) // 0=appear, 1=shake, 2=crack, 3=flash

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 400)
    const t2 = setTimeout(() => setStage(2), 900)
    const t3 = setTimeout(() => setStage(3), 1400)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  const stageStyles = [
    { transform: 'scale(0.2)', opacity: 0 },
    { transform: 'scale(1.1)',  opacity: 1, animation: 'packShake 0.5s ease-in-out' },
    { transform: 'scale(1.3)',  opacity: 1, animation: 'packCrack 0.5s ease-in-out', filter: `drop-shadow(0 0 24px ${pack.color})` },
    { transform: 'scale(2)',    opacity: 0, transition: 'all 0.3s ease-in' },
  ]

  return (
    <div className="overlay" style={{ background: 'rgba(0,0,0,0.92)' }}>
      <div style={{ textAlign: 'center' }}>
        {/* Pack emoji going through stages */}
        <span style={{
          fontSize: 96,
          display: 'block',
          transition: 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)',
          ...stageStyles[stage],
        }}>
          {pack.emoji}
        </span>

        {/* Particles */}
        {stage >= 2 && (
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
            {['✨','⭐','💫','🌟','✨','⭐','💫'].map((s, i) => (
              <span key={i} style={{
                position: 'absolute',
                fontSize: 24 + (i % 3) * 8,
                top: `${20 + (i * 10) % 60}%`,
                left: `${10 + (i * 13) % 80}%`,
                animation: `starFloat ${0.8 + i * 0.15}s ease-in-out infinite`,
                animationDelay: `${i * 0.1}s`,
              }}>{s}</span>
            ))}
          </div>
        )}

        <div style={{
          color: pack.color,
          fontWeight: 900,
          fontSize: 24,
          marginTop: 24,
          opacity: stage >= 1 ? 1 : 0,
          transition: 'opacity 0.3s ease',
          textShadow: `0 0 20px ${pack.color}`,
        }}>
          {stage < 2 ? `Opening ${pack.name}...` : stage < 3 ? '✨ Almost there...' : '🌟 Revealing!'}
        </div>
      </div>
    </div>
  )
}

export default function Market({ user, userDoc, navigate }) {
  const [reveal,  setReveal]  = useState(null)   // { char, pack }
  const [spinning, setSpinning] = useState(null) // pack being opened
  const [message, setMessage] = useState('')

  const coins = userDoc?.coins ?? 0

  const handleBuy = async (pack) => {
    if (coins < pack.cost) { setMessage("Not enough coins! Play more games to earn coins."); return }
    setMessage('')
    setSpinning(pack)

    const char = pullFromPack(pack)
    const userRef = doc(db, 'users', user.uid)
    await updateDoc(userRef, {
      coins:      increment(-pack.cost),
      collection: arrayUnion(char.id),
    })

    // Let animation play for 1.8s before revealing
    setTimeout(() => {
      setSpinning(null)
      setReveal({ char, pack })
    }, 1800)
  }

  return (
    <div className="screen-top">
      {/* Nav */}
      <div className="nav-bar">
        <span className="nav-title">🛒 Market</span>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <div className="coin-badge">🪙 {coins.toLocaleString()}</div>
          <button className="btn btn-ghost btn-sm" onClick={() => navigate('home')}>← Back</button>
        </div>
      </div>

      <h2 style={{ textAlign:'center', marginBottom:8 }}>Character Packs</h2>
      <p style={{ textAlign:'center', color:'var(--muted)', marginBottom:24, fontSize:14 }}>
        Open packs to collect characters. Rarer characters are harder to get!
      </p>

      {message && (
        <div style={{ color:'var(--red)', fontWeight:700, marginBottom:16, textAlign:'center' }}>{message}</div>
      )}

      <div className="market-grid">
        {packs.map(pack => (
          <div
            className="pack-card"
            key={pack.id}
            style={{ borderColor: coins >= pack.cost ? pack.color + '55' : 'var(--border)' }}
          >
            <span className="pack-emoji">{pack.emoji}</span>
            <span className="pack-name" style={{ color: pack.color }}>{pack.name}</span>
            <span className="pack-cost">🪙 {pack.cost}</span>

            <div className="pack-odds">
              {pack.characters.map(c => (
                <span
                  key={c.id}
                  className="rarity-pip"
                  style={{ background: rarityColors[c.rarity] + '22', color: rarityColors[c.rarity] }}
                >
                  {c.rarity}
                </span>
              ))}
            </div>

            <div style={{ display:'flex', gap:6, fontSize:22, margin:'6px 0' }}>
              {pack.characters.map(c => (
                <span key={c.id} title={`${c.name} (${c.rarity})`}>{c.emoji}</span>
              ))}
            </div>

            <button
              className="btn btn-primary btn-sm btn-full"
              style={{ marginTop:8, background: pack.color }}
              disabled={coins < pack.cost || !!spinning}
              onClick={() => handleBuy(pack)}
            >
              {coins < pack.cost ? 'Need more coins' : spinning ? 'Opening...' : 'Open Pack'}
            </button>
          </div>
        ))}
      </div>

      {/* Pack opening scene */}
      {spinning && <PackOpeningScene pack={spinning} />}

      {/* Reveal overlay */}
      {reveal && (
        <div className="overlay" onClick={() => setReveal(null)}>
          <Confetti color={rarityColors[reveal.char.rarity]} />
          <div className="reveal-box" style={{ position:'relative', zIndex:1 }} onClick={e => e.stopPropagation()}>
            <div style={{ color:'var(--muted)', fontSize:13, fontWeight:700, marginBottom:12 }}>
              {reveal.pack.name} · You got...
            </div>
            <span
              className="reveal-char-emoji"
              style={{
                animation: 'charReveal 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
                filter: `drop-shadow(0 0 24px ${rarityColors[reveal.char.rarity]})`,
              }}
            >
              {reveal.char.emoji}
            </span>
            <div className="reveal-char-name">{reveal.char.name}</div>
            <div
              className="reveal-rarity"
              style={{
                background: rarityColors[reveal.char.rarity] + '33',
                color:      rarityColors[reveal.char.rarity],
                border:     `1px solid ${rarityColors[reveal.char.rarity]}66`,
              }}
            >
              {reveal.char.rarity}
            </div>
            {reveal.char.rarity === 'Legendary' && (
              <div style={{ fontSize:32, marginBottom:12, animation:'starFloat 0.8s ease-in-out infinite' }}>🎉 🏆 🎉</div>
            )}
            {reveal.char.rarity === 'Epic' && (
              <div style={{ fontSize:24, marginBottom:12 }}>✨ Epic pull! ✨</div>
            )}
            {reveal.char.rarity === 'Rare' && (
              <div style={{ fontSize:20, marginBottom:12 }}>💙 Nice pull!</div>
            )}
            <button className="btn btn-primary btn-full" onClick={() => setReveal(null)}>
              Sweet!
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
