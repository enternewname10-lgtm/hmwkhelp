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
  // 0=appear  1=wiggle  2=cut-line  3=flap-open  4=burst

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 250)
    const t2 = setTimeout(() => setStage(2), 800)
    const t3 = setTimeout(() => setStage(3), 1200)
    const t4 = setTimeout(() => setStage(4), 1650)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4) }
  }, [])

  const labels = ['', `Opening ${pack.name}...`, 'Tearing open...', 'Revealing...', 'Almost there...']

  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    angle: (i / 18) * 360,
    dist: 80 + (i % 3) * 30,
    size: 4 + (i % 4) * 2,
    delay: i * 0.03,
  }))

  return (
    <div className="overlay" style={{
      background: 'linear-gradient(180deg, #0a1628 0%, #0d2344 40%, #0f3460 70%, #1a4a7a 100%)',
    }}>
      {/* Ambient light bloom */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: stage >= 3
          ? `radial-gradient(ellipse 60% 45% at 50% 42%, rgba(96,165,250,0.22) 0%, ${pack.color}18 40%, transparent 70%)`
          : 'radial-gradient(ellipse 40% 30% at 50% 42%, rgba(96,165,250,0.08) 0%, transparent 60%)',
        transition: 'background 0.6s ease',
      }} />

      {/* Star field */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {[...Array(24)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: `${(i * 17 + 5) % 95}%`,
            top: `${(i * 23 + 3) % 85}%`,
            width: i % 4 === 0 ? 2 : 1,
            height: i % 4 === 0 ? 2 : 1,
            borderRadius: '50%',
            background: '#fff',
            opacity: 0.3 + (i % 3) * 0.2,
          }} />
        ))}
      </div>

      {/* Light particles burst on open */}
      {stage >= 4 && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {particles.map(p => (
            <div key={p.id} style={{
              position: 'absolute',
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              background: p.id % 2 === 0 ? '#bfdbfe' : pack.color,
              opacity: 0,
              '--tx': `${Math.cos(p.angle * Math.PI / 180) * p.dist}px`,
              '--ty': `${Math.sin(p.angle * Math.PI / 180) * p.dist - 60}px`,
              '--rot': '0deg',
              animation: 'confettiBurst 0.75s ease-out forwards',
              animationDelay: `${p.delay}s`,
            }} />
          ))}
        </div>
      )}

      <div style={{ textAlign: 'center', position: 'relative' }}>
        {/* Pack card */}
        <div style={{
          position: 'relative',
          width: 180,
          height: 252,
          margin: '0 auto',
          perspective: '800px',
          transform: stage === 0 ? 'scale(0.25) translateY(30px)' : 'scale(1) translateY(0)',
          opacity: stage === 0 ? 0 : 1,
          transition: 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1), opacity 0.35s',
          animation: stage === 1 ? 'packWiggle 0.55s ease-in-out' : undefined,
          filter: stage >= 4 ? `drop-shadow(0 0 28px ${pack.color}cc) drop-shadow(0 0 60px rgba(96,165,250,0.4))` : `drop-shadow(0 8px 24px rgba(0,0,0,0.6))`,
        }}>
          {/* Main pack body */}
          <div style={{
            position: 'absolute', inset: 0,
            background: `linear-gradient(155deg, rgba(255,255,255,0.12) 0%, ${pack.color}44 30%, ${pack.color}28 65%, rgba(14,30,60,0.6) 100%)`,
            border: `1.5px solid ${pack.color}88`,
            borderRadius: 18,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 12,
            overflow: 'hidden',
            backdropFilter: 'blur(2px)',
          }}>
            {/* Foil shine */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(115deg, rgba(255,255,255,0.18) 0%, transparent 35%, rgba(255,255,255,0.06) 55%, transparent 75%, rgba(255,255,255,0.1) 100%)',
              borderRadius: 18,
              pointerEvents: 'none',
            }} />
            {/* Top edge highlight */}
            <div style={{
              position: 'absolute', top: 0, left: 12, right: 12, height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
              borderRadius: 1,
            }} />
            <span style={{
              fontSize: 62,
              position: 'relative', zIndex: 1,
              filter: stage >= 4 ? `drop-shadow(0 0 16px ${pack.color})` : `drop-shadow(0 4px 8px rgba(0,0,0,0.5))`,
              transition: 'filter 0.5s',
            }}>
              {pack.emoji}
            </span>
            <span style={{ fontSize: 12, fontWeight: 700, color: pack.color, letterSpacing: 2, textTransform: 'uppercase', position: 'relative', zIndex: 1 }}>
              {pack.name}
            </span>
          </div>

          {/* Tear line */}
          {stage >= 2 && (
            <div style={{
              position: 'absolute',
              top: '26%', left: -6, right: -6,
              height: 4,
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 15%, #fff 35%, rgba(96,165,250,0.9) 50%, #fff 65%, rgba(255,255,255,0.6) 85%, transparent 100%)',
              boxShadow: '0 0 16px 6px rgba(96,165,250,0.7), 0 0 6px 2px #fff',
              animation: 'packCutLine 0.45s ease-out forwards',
              zIndex: 10,
            }} />
          )}

          {/* Flap that opens back */}
          {stage >= 3 && (
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0,
              height: '26%',
              background: `linear-gradient(180deg, ${pack.color}bb 0%, ${pack.color}66 100%)`,
              border: `1.5px solid ${pack.color}99`,
              borderBottom: 'none',
              borderRadius: '18px 18px 0 0',
              transformOrigin: 'top center',
              animation: 'packFlapOpen 0.55s cubic-bezier(0.4,0,0.2,1) forwards',
              zIndex: 11,
              boxShadow: `inset 0 -4px 12px rgba(0,0,0,0.3)`,
            }} />
          )}

          {/* Light flood from opening */}
          {stage >= 3 && (
            <div style={{
              position: 'absolute',
              top: '26%', left: 0, right: 0,
              height: 90,
              background: `linear-gradient(180deg, rgba(96,165,250,0.55) 0%, ${pack.color}33 40%, transparent 100%)`,
              animation: 'packGlowFlood 0.55s ease-out forwards',
              zIndex: 9,
            }} />
          )}
        </div>

        {/* Status text */}
        <div style={{
          color: stage >= 4 ? '#bfdbfe' : 'rgba(148,163,184,0.9)',
          fontWeight: 600,
          fontSize: 15,
          marginTop: 36,
          letterSpacing: 0.5,
          opacity: stage >= 1 ? 1 : 0,
          transition: 'opacity 0.3s, color 0.4s',
          textShadow: stage >= 4 ? `0 0 24px rgba(96,165,250,0.8)` : undefined,
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
