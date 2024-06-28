import { useState } from 'react'
// import america from './assets/americas.svg'
import './App.css'
import Home from './componentes/Home';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Bem vindos ao Site de viagens </h1>
      <Home />
    </>
  )
}

export default App
