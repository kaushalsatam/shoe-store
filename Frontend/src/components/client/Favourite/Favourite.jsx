import axios from "axios";
import React, { useState, useEffect } from "react";
import { baseURL } from "../../../utils/baseURL";
import FavouriteItem from "./FavouriteItem"; // Adjust the path as necessary
import { toast } from "react-toastify";

function Favourite({ customerData }) {
  const [myFavourites, setMyFavourites] = useState([]);

  const getFavourites = async (id) => {
    try {
      const request = await axios.get(`${baseURL}/favourites`, {
        params: { id },
      });
      setMyFavourites(request.data);
    } catch (error) {
      console.error("Failed to fetch favourites", error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`${baseURL}/favourites`, {
        params: { id },
      });
      setMyFavourites(myFavourites.filter((item) => item.id !== id));
      toast.success("Removed from favourites!");
    } catch (error) {
      console.error("Failed to delete item", error);
    }
  };

  useEffect(() => {
    if (customerData && customerData.id) {
      getFavourites(customerData.id);
    }
  }, [customerData]);

  return (
    <div className="favourites m-4 sm:m-8 bg-gray-100 shadow-lg rounded-lg p-4 sm:p-8">
      <h1 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-8 flex justify-center items-center text-gray-700">
        Favourites
      </h1>
      <hr className="m-8" />
      {myFavourites.length > 0 ? (
        myFavourites.map((favourite) => (
          <FavouriteItem
            key={favourite.id}
            favourite={favourite}
            deleteItem={deleteItem}
          />
        ))
      ) : (
        <p className="text-gray-500 text-center">No favourites found.</p>
      )}
    </div>
  );
}

export default Favourite;
