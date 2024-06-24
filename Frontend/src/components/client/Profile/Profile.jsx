import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { NavLink, useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Footer from "../Footer/Footer";
import Logout from "@mui/icons-material/Logout";
import { toast } from "react-toastify";

function Profile({ customerData, setIsAuthenticated, setCustomerData }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCustomerData([]);
    toast.success("Logged out Successfully!");
    navigate("/");
  };

  return (
    <>
      <div className="profile m-4 sm:m-8 bg-white shadow-lg rounded-lg p-4 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-light mb-4 sm:mb-8 flex justify-center items-center text-gray-700">
          Profile
        </h1>
        <div className="profile-menu-container grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-8">
          <div className="md:col-span-1 md:border-r-2 border-gray-200 flex flex-col">
            <div className="avatar-name flex justify-between items-center p-4 gap-4 cursor-default border-b-2 md:border-b-0 border-gray-200">
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12" />
                <span className="text-gray-800 text-lg font-medium">
                  {customerData.name}
                </span>
              </div>
              {isSmallScreen && (
                <>
                  <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={handleMenuOpen}
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                  <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem
                      onClick={handleMenuClose}
                      component={NavLink}
                      to="/user/orders"
                    >
                      <LocalMallIcon className="mr-2" /> Orders
                    </MenuItem>
                    <MenuItem
                      onClick={handleMenuClose}
                      component={NavLink}
                      to="/user/favourites"
                    >
                      <FavoriteIcon className="mr-2" /> Favourites
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleMenuClose();
                        handleLogout();
                      }}
                    >
                      <Logout className="mr-2" /> Logout
                    </MenuItem>
                  </Menu>
                </>
              )}
            </div>
            {!isSmallScreen && (
              <>
                <NavLink to={"/user/orders"} className="w-full">
                  <div className="avatar-name flex justify-start items-center p-4 gap-4 cursor-pointer hover:bg-gray-100">
                    <LocalMallIcon className="text-gray-600" />
                    <span className="text-gray-600 text-lg">Orders</span>
                  </div>
                </NavLink>
                <NavLink to={"/user/favourites"} className="w-full">
                  <div className="avatar-name flex justify-start items-center p-4 gap-4 cursor-pointer hover:bg-gray-100">
                    <FavoriteIcon className="text-gray-600" />
                    <span className="text-gray-600 text-lg">Favourites</span>
                  </div>
                </NavLink>
                <div
                  className="avatar-name flex justify-start items-center p-4 gap-4 cursor-pointer hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  <Logout className="text-gray-600" />
                  <span className="text-gray-600 text-lg">Logout</span>
                </div>
              </>
            )}
          </div>
          <div className="profile-container col-span-1 md:col-span-3">
            <div className="heading-container h-12 sm:h-16 flex items-center ml-4 sm:ml-8">
              <h2 className="text-xl sm:text-2xl font-thin text-gray-700">
                Personal Information
              </h2>
            </div>
            <div className="flex flex-col m-4 sm:m-8 gap-2 sm:gap-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <h3 className="font-bold text-md sm:text-lg text-gray-700">
                  Name:
                </h3>
                <p className="text-gray-600">{customerData.name}</p>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <h3 className="font-bold text-md sm:text-lg text-gray-700">
                  Email:
                </h3>
                <p className="text-gray-600">{customerData.email}</p>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <h3 className="font-bold text-md sm:text-lg text-gray-700">
                  Phone:
                </h3>
                <p className="text-gray-600">{customerData.phone}</p>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <h3 className="font-bold text-md sm:text-lg text-gray-700">
                  Address:
                </h3>
                <p className="text-gray-600">{customerData.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
