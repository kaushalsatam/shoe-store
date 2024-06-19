import { IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { NavLink } from "react-router-dom";

function FavouriteItem({ favourite, customerId, deleteItem }) {
  const imageSrc = favourite.left_view
    ? `data:image/jpeg;base64,${btoa(
        new Uint8Array(favourite.left_view.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      )}`
    : "";

  console.log(favourite);

  return (
    <div className="item flex flex-col sm:flex-row m-4 bg-white rounded-2xl shadow-xl justify-between">
      <div className="item-info flex flex-col sm:flex-row">
        <NavLink
          to={`/product-details/${favourite.product_id}`}
          className="sm:block hidden"
        >
          <div className="w-48 h-48 overflow-hidden p-4 m-4">
            <img
              src={imageSrc}
              alt="Product Image"
              className="w-full h-full object-cover rounded-xl cursor-pointer"
            />
          </div>
        </NavLink>
        <div className="flex flex-col justify-center items-start p-4 sm:p-0 sm:pl-4">
          <h1 className="text-xl font-bold cursor-pointer">
            <NavLink to={`/product-details/${favourite.product_id}`}>
              {favourite.name}
            </NavLink>
          </h1>
          <p>by {favourite.brand}</p>
          <p>₹{favourite.current_price}/-</p>
        </div>
      </div>
      <div className="flex items-start sm:items-center p-4 sm:p-0">
        <IconButton
          aria-label="delete"
          size="large"
          onClick={() => deleteItem(customerId, favourite.product_id)} // Pass customerId and product_id
        >
          <ClearIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default FavouriteItem;
