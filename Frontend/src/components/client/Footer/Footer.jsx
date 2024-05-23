import { NavLink } from "react-router-dom";

function Footer() {
  return (
    // Footer
    <footer className="bg-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav className="flex flex-wrap justify-center">
          <div className="px-5 py-2">
            <a href="#" className="text-base text-gray-400 hover:text-gray-100">
              About Us
            </a>
          </div>
          <div className="px-5 py-2">
            <a href="#" className="text-base text-gray-400 hover:text-gray-100">
              Contact
            </a>
          </div>
          <div className="px-5 py-2">
            <a href="#" className="text-base text-gray-400 hover:text-gray-100">
              Privacy Policy
            </a>
          </div>
          <div className="px-5 py-2">
            <NavLink
              to="/admin"
              className="text-base text-gray-400 hover:text-gray-100"
            >
              Admin
            </NavLink>
          </div>
        </nav>
        <p className="mt-8 text-center text-base text-gray-400">
          &copy; 2024 ShoeStore, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
