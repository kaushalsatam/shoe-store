import { NavLink } from "react-router-dom";
import brand from "../../../assets/Brand.svg";
import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton } from "@mui/material";

function Header() {
  return (
    <nav className="flex justify-between my-8 p-4 shadow-xl bg-cyan-100 rounded-3xl sticky top-0 z-50">
      <div className="flex gap-2 justify-center items-center">
        <img
          src={brand}
          alt="Solespace logo"
          className="logo"
          height={50}
          width={50}
        />
      </div>
      <ul className="inline-flex gap-8 justify-center items-center text-xl">
        <li>
          <NavLink
            to={"/admin"}
            className={({ isActive }) => (isActive ? "" : "text-gray-500")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/admin/customers"}
            className={({ isActive }) => (isActive ? "" : "text-gray-500")}
          >
            Customers
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/admin/products"}
            className={({ isActive }) => (isActive ? "" : "text-gray-500")}
          >
            Products
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/admin/orders"}
            className={({ isActive }) => (isActive ? "" : "text-gray-500")}
          >
            Orders
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/admin/transactions"}
            className={({ isActive }) => (isActive ? "" : "text-gray-500")}
          >
            Transactions
          </NavLink>
        </li>
        <li>
          <IconButton aria-label="delete">
            <LogoutIcon />
          </IconButton>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
