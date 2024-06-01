import { useState } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import ClientLayout from "./components/client/ClientLayout.jsx";
import ClientHome from "./components/client/Home/Home.jsx";
import AdminLayout from "./components/admin/AdminLayout.jsx";
import AdminHome from "./components/admin/Home/Home.jsx";
import Customers from "./components/admin/Customers/Customers.jsx";
import AdminProducts from "./components/admin/Products/Products.jsx";
import Orders from "./components/admin/Orders/Orders.jsx";
import Transactions from "./components/admin/Transactions/Transactions.jsx";
import Login from "./components/admin/Login/Login.jsx";
import { adminContext } from "./components/admin/Context/adminContext.js";
import Signup from "./components/client/Signup/Signup.jsx";
import ClientProducts from "./components/client/Products/Products.jsx";
import Checkout from "./components/client/Checkout/Checkout.jsx";
import AddProduct from "./components/admin/Products/AddProduct.jsx";
import ClientProductDetails from "./components/client/Products/ProductDetails.jsx";
import UserLogin from "./components/client/Login/Login.jsx";
import { clientContext } from "./components/client/Context/clientContext.js";
import Bag from "./components/client/Bag/Bag.jsx";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [customerData, setCustomerData] = useState([]);

  const notify = () => {
    toast("Please Log in!");
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<ClientLayout />}>
          <Route index element={<ClientHome />} />
          <Route path="signup" element={<Signup />} />
          <Route path="products" element={<ClientProducts />} />
          <Route
            path="product-details/:id"
            element={
              <ClientProductDetails
                isAuthenticated={isAuthenticated}
                customerData={customerData}
                notify={notify}
              />
            }
          />
          <Route
            path="user-login"
            element={
              <UserLogin
                setIsAuthenticated={setIsAuthenticated}
                setCustomerData={setCustomerData}
              />
            }
          />
          <Route
            path="user/*"
            element={
              isAuthenticated ? (
                <clientContext.Provider
                  value={{ isAuthenticated, setIsAuthenticated }}
                >
                  <ClientLayout
                    isAuthenticated={isAuthenticated}
                    notify={notify}
                  />
                </clientContext.Provider>
              ) : (
                <Navigate replace to="/user-login" />
              )
            }
          >
            <Route path="checkout" element={<Checkout />} />
            <Route path="bag" element={<Bag customerData={customerData} />} />
          </Route>
        </Route>
        <Route
          path="adminLogin"
          element={<Login setIsAdminAuthenticated={setIsAdminAuthenticated} />}
        />
        <Route
          path="admin/*"
          element={
            isAdminAuthenticated ? (
              <adminContext.Provider
                value={{ isAdminAuthenticated, setIsAdminAuthenticated }}
              >
                <AdminLayout />
              </adminContext.Provider>
            ) : (
              <Navigate replace to="/adminLogin" />
            )
          }
        >
          <Route index element={<AdminHome />} />
          <Route path="customers" element={<Customers />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<Orders />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="addProduct" element={<AddProduct />} />
        </Route>
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-center" theme="dark" />
    </>
  );
}

export default App;
