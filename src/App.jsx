import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Routing from './Routing'
import Navbar from './Investor/Navigation'

function App() {
  const [count, setCount] = useState(0)

  return (
    <> 
    <Navbar/>
<Routing/>
    </>
  )
}

export default App
