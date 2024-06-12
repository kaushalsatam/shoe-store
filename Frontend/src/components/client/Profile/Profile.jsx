import React from "react";
import Avatar from "@mui/material/Avatar";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { NavLink } from "react-router-dom";

function Profile({ customerData }) {
  return (
    <div className="profile m-4 sm:m-8 bg-white shadow-lg rounded-lg p-4 sm:p-8">
      <h1 className="text-2xl sm:text-3xl font-light mb-4 sm:mb-8 flex justify-center items-center text-gray-700">
        Profile
      </h1>
      <div className="profile-menu-container grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-8">
        <div className="sm:grid-cols-1 sm:border-r-2 border-gray-200 flex sm:flex-col">
          <div className="avatar-name flex justify-start items-center p-4 gap-4 cursor-default border-b-2 sm:border-b-0 sm:border-gray-200">
            <Avatar className="w-12 h-12" />
            <span className="text-gray-800 text-lg font-medium">
              {customerData.name}
            </span>
          </div>
          <NavLink to={"/user/orders"}>
            <div className="avatar-name flex justify-start items-center p-4 gap-4 cursor-pointer hover:bg-gray-100">
              <LocalMallIcon className="text-gray-600" />
              <span className="text-gray-600 text-lg">My Orders</span>
            </div>
          </NavLink>
        </div>
        <div className="profile-container col-span-1 sm:col-span-3">
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
  );
}

export default Profile;
