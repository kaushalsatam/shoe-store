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

function App() {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<ClientLayout />}>
          <Route index element={<ClientHome />} />
          <Route path="signup" element={<Signup />} />
          <Route path="products" element={<ClientProducts />} />
          <Route
            path="product-details/:id"
            element={<ClientProductDetails />}
          />
          <Route path="checkout" element={<Checkout />} />
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

  return <RouterProvider router={router} />;
}

export default App;
