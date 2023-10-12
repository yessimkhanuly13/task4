import { createContext, useEffect, useState } from 'react'
import './App.css'
import Auth from './components/Auth'
import Main from './components/Main'

export const CurrentUser = createContext();

function App() {
  const [auth, setAuth] = useState(true);
  const [currUserId, setCurrUserId] = useState('');
  
  return (
    <>
      <CurrentUser.Provider value={{currUserId, setCurrUserId}}>
          {auth && (<Auth setAuth={setAuth}/>)}
          {!auth && (<Main setAuth={setAuth}/>)}
      </CurrentUser.Provider>
    </>
  )
}

export default App
