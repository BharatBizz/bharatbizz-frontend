import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Routing from './Routing'
import Navbar from './Investor/Navigation'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollTop'

function App() {
  const [count, setCount] = useState(0)

  return (
    <> 
    <ScrollToTop/>
    <Navbar/>
<Routing/>
<Footer/>
    </>
  )
}

export default App
