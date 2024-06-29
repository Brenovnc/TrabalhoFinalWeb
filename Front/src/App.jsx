import { useState } from 'react'
import Home from './componentes/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

// Para a mensagem de erro da tela de login funcionar
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* O ToastContainer é necessário ser colocado aqui para realizar
      mensagens de erro que aparecem no canto direito na tela de login */}
      <ToastContainer />
      <h1>Bem vindos ao Site de viagens </h1>
      <Home />
    </>
  )
}

export default App
