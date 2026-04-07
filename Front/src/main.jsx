import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import LoginUser from './componentes/auth/LoginUser.jsx'
import CreateUser from './componentes/auth/CreateUser.jsx'
import NotFound from './componentes/NotFound.jsx'
import ProtectedRoute from './componentes/ProtectedRoute.jsx'

import MapPage from './componentes/mapa/Map.jsx'
import InserirNovoLocal from './componentes/TelaAdmin/TelaPrincipal.jsx'
import PerfilUsuario from './componentes/TelaVerPassagens/PerfilUsuario.jsx'

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
        path: '/Cadastro',
        element : <CreateUser />
      }
    ]
  },
  {
    path: '/home',
        element: (
          <ProtectedRoute>
            <MapPage />
          </ProtectedRoute>
        ),
  },
  {
    path: '/perfil',
    element: <PerfilUsuario />
  },
  {
    path: '/admin',
    element: <InserirNovoLocal />
  },
  {
    path: '*', // Rota padrão caso n se encontre outra
    element: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={routes}/>
)
