import React from "react";
import { IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

function FavouriteItem({ favourite, deleteItem }) {
  const imageSrc = favourite.left_view
    ? `data:image/jpeg;base64,${btoa(
        new Uint8Array(favourite.left_view.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      )}`
    : "";

  return (
    <div className="item flex m-4 bg-white rounded-2xl shadow-xl justify-between">
      <div className="item-info flex">
        <div className="w-48 h-48 overflow-hidden p-4 m-4">
          <img
            src={imageSrc}
            alt="Product Image"
            className="w-full h-full object-cover rounded-xl cursor-pointer"
          />
        </div>
        <div className="flex flex-col justify-center items-start">
          <h1 className="text-xl font-bold cursor-pointer">{favourite.name}</h1>
          <p>{favourite.price}</p>
        </div>
      </div>
      <div className="flex items-start">
        <IconButton
          aria-label="delete"
          size="large"
          onClick={() => deleteItem(favourite.id)}
        >
          <ClearIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default FavouriteItem;
