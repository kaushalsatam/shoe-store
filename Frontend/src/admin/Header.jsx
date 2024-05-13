import { NavLink } from "react-router-dom"

function Header() {
  return (
    <div className="admin-header-container">
      <h1>Solespace Administrator</h1>
      <nav className="admin-header">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/customers">Customers</NavLink></li>
          <li><NavLink to="/products">Products</NavLink></li>
          <li><NavLink to="/orders">Orders</NavLink></li>
          <li><NavLink to="/transactions">Transactions</NavLink></li>
      </nav>
    </div>
  )
}

export default Header
