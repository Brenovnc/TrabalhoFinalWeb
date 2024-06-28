import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import LoginUser from './componentes/auth/LoginUser.jsx'
import CreateUser from './componentes/auth/CreateUser.jsx'
// import AtualizarPropriedade from './componentes/AtualizarPropriedade.jsx'

const routes = createBrowserRouter([
  {
    path: '/',
    element : <App />,
    children: [
      {
        path : '/',
        element : <LoginUser />
      },
      {
        path: 'criar-user',
        element : <CreateUser />
      }
    ]
  },
  {
    path: '/path',
    element: <p/>
  },
  //   path: '/atualizar-propriedade',
  //   element : <AtualizarPropriedade />
  // }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={routes}/>
)