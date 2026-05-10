import { useState } from 'react'
import { doc, updateDoc, increment, arrayUnion } from 'firebase/firestore'
import { db } from '../firebase'
import { packs, pullFromPack, rarityColors } from '../data/packs'

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

      {/* Spinning animation overlay */}
      {spinning && (
        <div className="overlay">
          <div style={{ textAlign:'center' }}>
            <span style={{
              fontSize: 96,
              display: 'block',
              animation: 'packSpin 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
            }}>
              {spinning.emoji}
            </span>
            <div style={{
              color: spinning.color,
              fontWeight: 900,
              fontSize: 22,
              marginTop: 16,
              animation: 'fadeIn 0.4s ease',
            }}>
              Opening {spinning.name}...
            </div>
            <div style={{
              display: 'flex',
              gap: 8,
              justifyContent: 'center',
              marginTop: 16,
              fontSize: 28,
              animation: 'starFloat 1.8s ease-in-out infinite',
            }}>
              ✨ ⭐ 🌟 ⭐ ✨
            </div>
          </div>
        </div>
      )}

      {/* Reveal overlay */}
      {reveal && (
        <div className="overlay" onClick={() => setReveal(null)}>
          <div className="reveal-box" onClick={e => e.stopPropagation()}>
            <div style={{ color:'var(--muted)', fontSize:13, fontWeight:700, marginBottom:12 }}>
              {reveal.pack.name} · You got...
            </div>
            <span
              className="reveal-char-emoji"
              style={{
                animation: 'charReveal 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
                filter: `drop-shadow(0 0 16px ${rarityColors[reveal.char.rarity]})`,
              }}
            >
              {reveal.char.emoji}
            </span>
            <div className="reveal-char-name">{reveal.char.name}</div>
            <div
              className="reveal-rarity"
              style={{
                background: rarityColors[reveal.char.rarity] + '22',
                color:      rarityColors[reveal.char.rarity],
              }}
            >
              {reveal.char.rarity}
            </div>
            {reveal.char.rarity === 'Legendary' && (
              <div style={{ fontSize:32, marginBottom:12, animation:'starFloat 1s ease-in-out infinite' }}>
                🎉 🏆 🎉
              </div>
            )}
            {reveal.char.rarity === 'Rare' && (
              <div style={{ fontSize:24, marginBottom:12 }}>✨ Nice pull! ✨</div>
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
