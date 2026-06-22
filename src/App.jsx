import { useState, useEffect } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore'
import { auth, db } from './firebase'
import { findCharacter } from './data/packs'
import { isAdmin } from './utils/admin'

import Login       from './components/Login'
import Home        from './components/Home'
import Lobby       from './components/Lobby'
import GamePlay    from './components/GamePlay'
import FishingGame from './components/FishingGame'
import Results     from './components/Results'
import Market      from './components/Market'
import Stats       from './components/Stats'

const NAV_ITEMS = [
  { id: 'home',   icon: '🎮', label: 'Play' },
  { id: 'market', icon: '🛒', label: 'Market' },
  { id: 'stats',  icon: '📊', label: 'Stats' },
]

const SIDEBAR_SCREENS = new Set(['home', 'market', 'stats'])

function Sidebar({ user, userDoc, screen, navigate }) {
  const admin      = isAdmin(user)
  const coins      = userDoc?.coins ?? 0
  const activeChar = userDoc?.activeCharacter ? findCharacter(userDoc.activeCharacter) : null

  return (
    <aside className="app-sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <span style={{ fontSize: 18 }}>🧮</span>
        <span>AlgebraBlast</span>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            className={`sidebar-item${screen === item.id ? ' active' : ''}`}
            onClick={() => navigate(item.id)}
          >
            <span className="sidebar-item-icon">{item.icon}</span>
            <span className="sidebar-item-label">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        {/* Coins */}
        <div className="sidebar-coins">
          <span>🪙</span>
          <span>{admin ? '∞' : coins.toLocaleString()}</span>
          {admin && <span style={{ fontSize: 11, color: 'var(--muted)', marginLeft: 2 }}>admin</span>}
        </div>

        {/* Active character */}
        {activeChar && (
          <div
            style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--muted)', cursor: 'pointer', padding: '4px 0' }}
            onClick={() => navigate('stats')}
            title="Change character"
          >
            <span style={{ fontSize: 18 }}>{activeChar.emoji}</span>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{activeChar.name}</span>
          </div>
        )}

        {/* User row */}
        <div className="sidebar-user-row">
          {user?.photoURL
            ? <img src={user.photoURL} alt="avatar" className="avatar" width={26} height={26} />
            : <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, flexShrink: 0 }}>👤</div>
          }
          <span style={{ flex: 1, fontSize: 13, fontWeight: 500, color: 'var(--text-2)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {user?.isAnonymous ? 'Guest' : user?.displayName?.split(' ')[0]}
          </span>
          <button
            className="btn btn-ghost btn-sm"
            style={{ padding: '4px 10px', fontSize: 12 }}
            onClick={() => signOut(auth)}
          >
            Out
          </button>
        </div>
      </div>
    </aside>
  )
}

export default function App() {
  const [user,     setUser]     = useState(null)
  const [userDoc,  setUserDoc]  = useState(null)
  const [screen,   setScreen]   = useState('login')
  const [roomCode, setRoomCode] = useState(null)
  const [isHost,   setIsHost]   = useState(false)
  const [gameMode, setGameMode] = useState('regular')
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          setUser(firebaseUser)
          if (firebaseUser.isAnonymous) {
            setUserDoc({ coins: 1400, totalWins: 0, totalLosses: 0, gamesPlayed: 0, collection: [], isGuest: true })
            setScreen('home')
          } else {
            const ref = doc(db, 'users', firebaseUser.uid)
            const snap = await getDoc(ref)
            if (!snap.exists()) {
              await setDoc(ref, {
                displayName: firebaseUser.displayName,
                photoURL:    firebaseUser.photoURL,
                coins:       500,
                totalWins:   0,
                totalLosses: 0,
                gamesPlayed: 0,
                collection:  [],
              })
            }
            setScreen('home')
          }
        } else {
          setUser(null)
          setUserDoc(null)
          setScreen('login')
        }
      } catch (err) {
        console.error('Auth/Firestore error:', err)
        alert('Setup error: ' + err.message + '\n\nMake sure Firestore is enabled in your Firebase console.')
      } finally {
        setLoading(false)
      }
    })
    return unsub
  }, [])

  useEffect(() => {
    if (!user || user.isAnonymous) return
    const ref = doc(db, 'users', user.uid)
    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) setUserDoc(snap.data())
    })
    return unsub
  }, [user])

  const navigate = (target, opts = {}) => {
    setScreen(target)
    if (opts.roomCode !== undefined) setRoomCode(opts.roomCode)
    if (opts.isHost   !== undefined) setIsHost(opts.isHost)
    if (opts.gameMode !== undefined) setGameMode(opts.gameMode)
  }

  if (loading) return <div className="loading">Loading AlgebraBlast...</div>

  const shared = { user, userDoc, navigate, roomCode, isHost, gameMode }
  const showSidebar = user && SIDEBAR_SCREENS.has(screen)

  let content
  switch (screen) {
    case 'login':   content = <Login       {...shared} />; break
    case 'home':    content = <Home        {...shared} />; break
    case 'lobby':   content = <Lobby       {...shared} />; break
    case 'game':    content = gameMode === 'fishing'
                              ? <FishingGame {...shared} />
                              : <GamePlay    {...shared} />; break
    case 'results': content = <Results     {...shared} />; break
    case 'market':  content = <Market      {...shared} />; break
    case 'stats':   content = <Stats       {...shared} />; break
    default:        content = <Home        {...shared} />
  }

  if (!showSidebar) return content

  return (
    <div className="app-layout">
      <Sidebar user={user} userDoc={userDoc} screen={screen} navigate={navigate} />
      <main className="app-main">
        {content}
      </main>
    </div>
  )
}
