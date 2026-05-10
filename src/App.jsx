import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore'
import { auth, db } from './firebase'

import Login   from './components/Login'
import Home    from './components/Home'
import Lobby   from './components/Lobby'
import GamePlay from './components/GamePlay'
import Results  from './components/Results'
import Market   from './components/Market'
import Stats    from './components/Stats'

export default function App() {
  const [user,    setUser]    = useState(null)
  const [userDoc, setUserDoc] = useState(null)
  const [screen,  setScreen]  = useState('login')
  const [roomCode, setRoomCode] = useState(null)
  const [isHost,   setIsHost]   = useState(false)
  const [loading,  setLoading]  = useState(true)

  // Auth state listener — create Firestore profile on first login
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          setUser(firebaseUser)
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

  // Live Firestore subscription for coins / collection changes
  useEffect(() => {
    if (!user) return
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
  }

  if (loading) return <div className="loading">Loading AlgebraBlast...</div>

  const shared = { user, userDoc, navigate, roomCode, isHost }

  switch (screen) {
    case 'login':   return <Login   {...shared} />
    case 'home':    return <Home    {...shared} />
    case 'lobby':   return <Lobby   {...shared} />
    case 'game':    return <GamePlay {...shared} />
    case 'results': return <Results  {...shared} />
    case 'market':  return <Market   {...shared} />
    case 'stats':   return <Stats    {...shared} />
    default:        return <Home    {...shared} />
  }
}
