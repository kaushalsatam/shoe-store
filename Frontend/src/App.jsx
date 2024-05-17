import { useState } from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Navigate } from 'react-router-dom';
import ClientLayout from './components/client/ClientLayout.jsx';
import ClientHome from './components/client/Home/Home.jsx';
import AdminLayout from './components/admin/AdminLayout.jsx';
import AdminHome from './components/admin/Home/Home.jsx';
import Customers from './components/admin/Customers/Customers.jsx';
import Products from './components/admin/Products/Products.jsx';
import Orders from './components/admin/Orders/Orders.jsx';
import Transactions from './components/admin/Transactions/Transactions.jsx';
import Login from './components/admin/Login/Login.jsx';
import { adminContext } from './components/admin/Context/adminContext.js';

function App() {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path='/' element={<ClientLayout />}>
          <Route index element={<ClientHome />} />
        </Route>
        <Route path='adminLogin' element={<Login setIsAdminAuthenticated={setIsAdminAuthenticated}/>} />
        <Route path='admin/*' 
          element = {isAdminAuthenticated ? 
            <adminContext.Provider value={{ isAdminAuthenticated, setIsAdminAuthenticated }}>
              <AdminLayout />
            </adminContext.Provider> : <Navigate replace to="/adminLogin"/>}
        >
          <Route index element={<AdminHome />} />
          <Route path='customers' element={<Customers />} />
          <Route path='products' element={<Products />} />
          <Route path='orders' element={<Orders />} />
          <Route path='transactions' element={<Transactions />} />
        </Route>
      </Route>
    )
  );

  return (
    <RouterProvider router={router} />
  );
}

export default App;
