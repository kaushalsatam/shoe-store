import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./Header";
import Home from "./Home";
import Customers from "./Customers";
import Products from './Products';
import Orders from './Orders';
import Transactions from './Transactions';

function Admin() {
  return (
    <div id="admin-main">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/transactions" element={<Transactions />} />
        </Routes>
      </Router>
    </div>
  )
}

export default Admin;
