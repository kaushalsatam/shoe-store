import IconButton from "@mui/material/IconButton";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import brand from "../../../assets/Brand.svg";

function Header() {
  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
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
        <nav className="flex list-none gap-8 items-center">
          <li className="text-xl font-medium text-gray-500">Men</li>
          <li className="text-xl font-medium text-gray-500">Women</li>
          <li className="text-xl font-medium text-gray-500">Kids</li>
          <li className="text-xl font-medium text-gray-500">Unisex</li>
          <li className="text-xl font-medium">
            <IconButton aria-label="bag">
              <ShoppingBagIcon />
            </IconButton>
          </li>
          <li className="text-xl font-medium">
            <IconButton aria-label="person">
              <PersonIcon />
            </IconButton>
          </li>
        </nav>
      </div>
    </header>
  );
}

export default Header;
