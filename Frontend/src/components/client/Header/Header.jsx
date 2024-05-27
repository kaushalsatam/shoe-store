import IconButton from "@mui/material/IconButton";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import brand from "../../../assets/Brand.svg";
import { NavLink } from "react-router-dom";
import AccountMenu from "../AccountMenu/AccountMenu";

function Header() {
  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <NavLink to={"/"}>
          <div className="flex gap-4 justify-center items-center font-bold text-slate-900">
            <h1 className="text-3xl">Solespace</h1>
            <img
              src={brand}
              alt="Solespace logo"
              className="logo"
              height={50}
              width={50}
            />
          </div>
        </NavLink>
        <nav className="flex list-none gap-8 items-center">
          <li className="text-xl font-medium text-gray-500">
            <NavLink to={"/products?gender=Men"}>Men</NavLink>
          </li>
          <li className="text-xl font-medium text-gray-500">
            <NavLink to={"/products?gender=Women"}>Women</NavLink>
          </li>
          <li className="text-xl font-medium text-gray-500">
            <NavLink to={"/products?gender=Kids"}>Kids</NavLink>
          </li>
          <li className="text-xl font-medium text-gray-500">
            <NavLink to={"/products?gender=Unisex"}>Unisex</NavLink>
          </li>

          <li className="text-xl font-medium">
            <NavLink to={"/user/bag"}>
              <IconButton aria-label="bag">
                <ShoppingBagIcon />
              </IconButton>
            </NavLink>
          </li>
          <li className="text-xl font-medium">
            {/* <IconButton aria-label="person">
              <PersonIcon />
            </IconButton> */}
            <AccountMenu />
          </li>
        </nav>
      </div>
    </header>
  );
}

export default Header;
