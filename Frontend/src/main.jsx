import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import ClientLayout from './components/client/ClientLayout.jsx'
import ClientHome from './components/client/Home/Home.jsx'
import AdminLayout from './components/admin/AdminLayout.jsx'
import AdminHome from './components/admin/Home/Home.jsx'
import Customers from './components/admin/Customers/Customers.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<ClientLayout />}>
        <Route path='' element={<ClientHome />}/>
      </Route>
      <Route path='admin/' element={<AdminLayout />}>
        <Route path='' element={<AdminHome />} />
        <Route path='customers' element={<Customers />}/>
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
