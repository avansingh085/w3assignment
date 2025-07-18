import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UsersPage from './pages/Users'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <UsersPage/>
    </>
  )
}

export default App
