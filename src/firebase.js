import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey:            'AIzaSyAUsh9BVRUVQyCoAORq38RHG7lzz6LHhMs',
  authDomain:        'hmwk-help.firebaseapp.com',
  projectId:         'hmwk-help',
  storageBucket:     'hmwk-help.firebasestorage.app',
  messagingSenderId: '520283990619',
  appId:             '1:520283990619:web:3dbe16998b13bd12b7ad7e',
  databaseURL:       'https://hmwk-help-default-rtdb.firebaseio.com',
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)
export const rtdb = getDatabase(app)
