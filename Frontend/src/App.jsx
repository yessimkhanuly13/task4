import { useState } from 'react'
import './App.css'
import Auth from './components/Auth'
import Main from './components/Main'

function App() {
  const [auth, setAuth] = useState(true);
  return (
    <>
      {auth && (<Auth setAuth={setAuth}/>)}
      {!auth && (<Main/>)}
    </>
  )
}

export default App
