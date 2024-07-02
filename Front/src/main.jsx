import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import LoginUser from './componentes/auth/LoginUser.jsx'
import CreateUser from './componentes/auth/CreateUser.jsx'


import ComprarPassagem from './componentes/mapa/ComprarPassagem.jsx'
// import AtualizarPropriedade from './componentes/AtualizarPropriedade.jsx'

const routes = createBrowserRouter([
  {
    path: '/',
    element : <App />,
    children: [
      {
        path : '/login-user',
        element : <LoginUser />
      },
      {
        path: 'criar-user',
        element : <CreateUser />
      }
    ]
  },
  {
    path: '/ComprarPassagem',
    element: <ComprarPassagem />
  },
  //   path: '/atualizar-propriedade',
  //   element : <AtualizarPropriedade />
  // }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={routes}/>
)