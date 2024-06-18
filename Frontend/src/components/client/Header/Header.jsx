import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import brand from "../../../assets/Brand.svg";
import { NavLink } from "react-router-dom";
import AccountMenu from "../AccountMenu/AccountMenu";

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <NavLink to={"/"}>
          <div className="flex gap-4 justify-center items-center font-bold text-slate-900">
            <h1 className="hidden lg:block text-3xl">Solespace</h1>
            <img
              src={brand}
              alt="Solespace logo"
              className="logo"
              height={50}
              width={50}
            />
          </div>
        </NavLink>
        <div className="flex">
          <nav className="flex list-none gap-8 items-center">
            <li className="hidden lg:block text-xl font-medium text-gray-500">
              <NavLink to={"/products?gender=Men"}>Men</NavLink>
            </li>
            <li className="hidden lg:block text-xl font-medium text-gray-500">
              <NavLink to={"/products?gender=Women"}>Women</NavLink>
            </li>
            <li className="hidden lg:block text-xl font-medium text-gray-500">
              <NavLink to={"/products?gender=Kids"}>Kids</NavLink>
            </li>
            <li className="hidden lg:block text-xl font-medium text-gray-500">
              <NavLink to={"/products?gender=Unisex"}>Unisex</NavLink>
            </li>
            <li className="text-xl font-medium">
              <AccountMenu />
            </li>
          </nav>
          <div className="lg:hidden flex items-center">
            <IconButton aria-label="menu" onClick={handleMenuOpen}>
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={isMenuOpen}
              onClose={handleMenuClose}
              keepMounted
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleMenuClose}>
                <NavLink to={"/products?gender=Men"} className="text-gray-500">
                  Men
                </NavLink>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <NavLink
                  to={"/products?gender=Women"}
                  className="text-gray-500"
                >
                  Women
                </NavLink>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <NavLink to={"/products?gender=Kids"} className="text-gray-500">
                  Kids
                </NavLink>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <NavLink
                  to={"/products?gender=Unisex"}
                  className="text-gray-500"
                >
                  Unisex
                </NavLink>
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
