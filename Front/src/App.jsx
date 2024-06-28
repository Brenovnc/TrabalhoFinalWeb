import { useState } from 'react'
import Home from './componentes/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

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
