import { useEffect, useState } from "react";
import QuantitySelector from "./QuantitySelector";
import ClearIcon from "@mui/icons-material/Clear";
import { IconButton } from "@mui/material";
import axios from "axios";
import { baseURL } from "../../../utils/baseURL";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

function Item({ bagData, getSubTotal, onRemoveItem }) {
  const [imageSrc, setImageSrc] = useState("");
  const [total, setTotal] = useState(bagData.quantity * bagData.current_price);

  const deleteItem = async () => {
    try {
      await axios.delete(`${baseURL}/bag/${bagData.product_id}`, {
        params: { customer_id: bagData.customer_id },
        headers: { Authorization: localStorage.getItem("authToken") },
      });
      onRemoveItem(bagData.product_id); // Notify parent to remove the item from state
      toast.success("Item removed from bag!");
    } catch (e) {
      console.error(e.message);
    }
  };

  useEffect(() => {
    if (bagData && bagData.left_view && bagData.left_view.data) {
      const binaryData = new Uint8Array(bagData.left_view.data);
      const base64String = btoa(
        binaryData.reduce((data, byte) => data + String.fromCharCode(byte), "")
      );
      setImageSrc(`data:image/jpeg;base64,${base64String}`);
    }
  }, [bagData]);

  useEffect(() => {
    setTotal(bagData.quantity * bagData.current_price);
  }, [bagData.quantity, bagData.current_price]);

  return (
    <div className="item bg-white rounded-2xl shadow-xl m-4 p-4 sm:flex sm:justify-between">
      {/* Image Container */}
      <div className="flex items-center sm:w-48 h-48 overflow-hidden">
        <NavLink to={`/product-details/${bagData.product_id}`}>
          <img
            src={imageSrc}
            alt="Product Image"
            className="w-full h-full object-cover rounded-xl cursor-pointer"
          />
        </NavLink>
      </div>

      {/* Details Container */}
      <div className="flex flex-col justify-center sm:ml-4">
        <h1 className="text-xl font-bold mb-2">
          <NavLink
            to={`/product-details/${bagData.product_id}`}
            className="text-blue-600 hover:underline"
          >
            {bagData.product_name}
          </NavLink>
        </h1>
        <div className="flex items-center mb-2">
          <QuantitySelector
            customer_id={bagData.customer_id}
            product_id={bagData.product_id}
            product_quantity={bagData.quantity}
            product_current_price={bagData.current_price}
            setTotal={setTotal}
            getSubTotal={getSubTotal}
          />
        </div>
        <p className="text-lg font-semibold mb-2">
          Total: <span className="font-normal">₹{total}/-</span>
        </p>
      </div>

      {/* Delete Button */}
      <div className="flex items-center mt-4 sm:mt-0 sm:ml-auto">
        <IconButton aria-label="delete" size="large" onClick={deleteItem}>
          <ClearIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default Item;
