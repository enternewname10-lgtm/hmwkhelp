import { useState, useEffect } from 'react'
import { doc, updateDoc, increment, arrayUnion } from 'firebase/firestore'
import { db } from '../firebase'
import { packs, pullFromPack, rarityColors } from '../data/packs'
import { isAdmin } from '../utils/admin'

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
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {pieces.map(p => (
        <div key={p.id} style={{
          position:       'absolute',
          width:          p.shape === 2 ? p.size * 2 : p.size,
          height:         p.size,
          background:     color,
          borderRadius:   p.shape === 0 ? '50%' : 3,
          opacity:        0,
          '--tx':         `${p.tx}px`,
          '--ty':         `${p.ty}px`,
          '--rot':        `${p.rot}deg`,
          animation:      'confettiBurst 0.9s ease-out forwards',
          animationDelay: `${p.delay}s`,
        }} />
      ))}
    </div>
  )
}

function PackOpeningScene({ pack }) {
  const [stage, setStage] = useState(0)
  // 0=appear  1=wiggle  2=cut-line  3=flap-open  4=glow

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 300)
    const t2 = setTimeout(() => setStage(2), 850)
    const t3 = setTimeout(() => setStage(3), 1300)
    const t4 = setTimeout(() => setStage(4), 1700)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4) }
  }, [])

  const labels = ['', `Opening ${pack.name}...`, 'Slicing...', 'Opening...', 'Almost there...']

  return (
    <div className="overlay" style={{ background: 'rgba(0,0,0,0.95)' }}>
      {stage >= 3 && (
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `radial-gradient(ellipse 50% 40% at 50% 50%, ${pack.color}28 0%, transparent 65%)`,
          animation: 'glowPulse 1.2s ease-in-out infinite',
        }} />
      )}

      <div style={{ textAlign: 'center', position: 'relative' }}>
        <div style={{
          position: 'relative',
          width: 160,
          height: 220,
          margin: '0 auto',
          perspective: '600px',
          transform: stage === 0 ? 'scale(0.3)' : 'scale(1)',
          opacity:   stage === 0 ? 0 : 1,
          transition: 'transform 0.45s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s',
          animation: stage === 1 ? 'packWiggle 0.6s ease-in-out' : undefined,
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: `linear-gradient(160deg, ${pack.color}55 0%, ${pack.color}22 60%, rgba(255,255,255,0.06) 100%)`,
            border: `2px solid ${pack.color}66`,
            borderRadius: 16,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 10,
            overflow: 'hidden',
            boxShadow: stage >= 3 ? `0 0 40px ${pack.color}55, inset 0 0 20px ${pack.color}22` : undefined,
            transition: 'box-shadow 0.4s',
          }}>
            <span style={{ fontSize: 56, filter: stage >= 3 ? `drop-shadow(0 0 12px ${pack.color})` : undefined, transition: 'filter 0.4s' }}>
              {pack.emoji}
            </span>
            <span style={{ fontSize: 13, fontWeight: 600, color: pack.color, letterSpacing: 1 }}>{pack.name}</span>
          </div>

          {stage >= 2 && (
            <div style={{
              position: 'absolute',
              top: '28%', left: -4, right: -4,
              height: 3,
              background: `linear-gradient(90deg, transparent 0%, #fff 20%, ${pack.color} 50%, #fff 80%, transparent 100%)`,
              boxShadow: `0 0 14px 4px ${pack.color}, 0 0 4px 1px #fff`,
              animation: 'packCutLine 0.55s ease-out forwards',
              zIndex: 10,
            }} />
          )}

          {stage >= 3 && (
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0,
              height: '28%',
              background: `linear-gradient(180deg, ${pack.color}88, ${pack.color}44)`,
              border: `2px solid ${pack.color}88`,
              borderBottom: 'none',
              borderRadius: '16px 16px 0 0',
              transformOrigin: 'top center',
              animation: 'packFlapOpen 0.6s cubic-bezier(0.4,0,0.2,1) forwards',
              zIndex: 11,
            }} />
          )}

          {stage >= 3 && (
            <div style={{
              position: 'absolute',
              top: '28%', left: 0, right: 0,
              height: 70,
              background: `linear-gradient(180deg, ${pack.color}66 0%, transparent 100%)`,
              animation: 'packGlowFlood 0.6s ease-out forwards',
              zIndex: 9,
            }} />
          )}
        </div>

        {stage >= 2 && (
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
            {['✨','⭐','💫','🌟','✨','⭐','💫','✨'].map((s, i) => (
              <span key={i} style={{
                position: 'absolute',
                fontSize: 18 + (i % 3) * 8,
                top:  `${15 + (i * 11) % 70}%`,
                left: `${5  + (i * 13) % 90}%`,
                animation: `starFloat ${0.9 + i * 0.12}s ease-in-out infinite`,
                animationDelay: `${i * 0.08}s`,
                opacity: 0.8,
              }}>{s}</span>
            ))}
          </div>
        )}

        <div style={{
          color: pack.color,
          fontWeight: 600,
          fontSize: 18,
          marginTop: 32,
          opacity: stage >= 1 ? 1 : 0,
          transition: 'opacity 0.3s',
          textShadow: `0 0 20px ${pack.color}`,
        }}>
          {labels[stage] || 'Almost there...'}
        </div>
      </div>
    </div>
  )
}

export default function Market({ user, userDoc, navigate }) {
  const [reveal,   setReveal]   = useState(null)
  const [spinning, setSpinning] = useState(null)
  const [message,  setMessage]  = useState('')

  const admin = isAdmin(user)
  const coins = userDoc?.coins ?? 0

  const handleBuy = async (pack) => {
    if (!admin && coins < pack.cost) { setMessage('Not enough coins — play more games to earn some.'); return }
    setMessage('')
    setSpinning(pack)

    const char = pullFromPack(pack)
    const userRef = doc(db, 'users', user.uid)
    const firestoreUpdate = { collection: arrayUnion(char.id) }
    if (!admin) firestoreUpdate.coins = increment(-pack.cost)
    await updateDoc(userRef, firestoreUpdate)

    setTimeout(() => {
      setSpinning(null)
      setReveal({ char, pack })
    }, 1800)
  }

  return (
    <div className="screen-top">
      <div style={{ width: '100%', maxWidth: 840, paddingTop: 32, marginBottom: 24 }}>
        <h2 style={{ marginBottom: 4 }}>Character Packs</h2>
        <p>Open packs to collect characters. Rarer pulls are harder to get.</p>
      </div>

      {message && (
        <p style={{ color: 'var(--danger)', fontWeight: 500, marginBottom: 16, fontSize: 14 }}>{message}</p>
      )}

      <div className="market-grid">
        {packs.map(pack => (
          <div className="pack-card" key={pack.id}>
            <span className="pack-emoji">{pack.emoji}</span>
            <span className="pack-name">{pack.name}</span>
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

            <button
              className="btn btn-primary btn-sm btn-full"
              style={{ marginTop: 6 }}
              disabled={(!admin && coins < pack.cost) || !!spinning}
              onClick={() => handleBuy(pack)}
            >
              {!admin && coins < pack.cost ? 'Need more coins' : spinning ? 'Opening...' : 'Open Pack'}
            </button>
          </div>
        ))}
      </div>

      {spinning && <PackOpeningScene pack={spinning} />}

      {reveal && (
        <div className="overlay" onClick={() => setReveal(null)}>
          <Confetti color={rarityColors[reveal.char.rarity]} />
          <div className="reveal-box" style={{ position: 'relative', zIndex: 1 }} onClick={e => e.stopPropagation()}>
            <div style={{ color: 'var(--subtle)', fontSize: 12, fontWeight: 500, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>
              {reveal.pack.name}
            </div>
            <span
              className="reveal-char-emoji"
              style={{
                animation: 'charReveal 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
                filter: `drop-shadow(0 0 20px ${rarityColors[reveal.char.rarity]})`,
              }}
            >
              {reveal.char.emoji}
            </span>
            <div className="reveal-char-name">{reveal.char.name}</div>
            <div
              className="reveal-rarity"
              style={{
                background: rarityColors[reveal.char.rarity] + '30',
                color:      rarityColors[reveal.char.rarity],
                border:     `1px solid ${rarityColors[reveal.char.rarity]}55`,
              }}
            >
              {reveal.char.rarity}
            </div>
            {reveal.char.rarity === 'Legendary' && (
              <div style={{ fontSize: 20, marginBottom: 12, color: '#fbbf24', fontWeight: 600 }}>Legendary pull!</div>
            )}
            {reveal.char.rarity === 'Epic' && (
              <div style={{ fontSize: 16, marginBottom: 12, color: '#a855f7', fontWeight: 600 }}>Epic pull!</div>
            )}
            <button className="btn btn-primary btn-full" onClick={() => setReveal(null)}>
              Nice
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
