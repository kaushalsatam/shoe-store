import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../../../utils/baseURL";
import { debounce } from "lodash";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { IconButton } from "@mui/material";
import { useLoading } from "../../../Context/LoadingContext";

function QuantitySelector({
  customer_id,
  product_id,
  product_quantity,
  product_current_price,
  setTotal,
  getSubTotal, // Make sure the prop name is correct
}) {
  const [quantity, setQuantity] = useState(product_quantity);
  const { setLoading } = useLoading();

  const updateQuantityInBackend = debounce(async (newQuantity) => {
    setLoading(true);
    try {
      await axios.put(`${baseURL}/cart/update-quantity`, {
        customer_id,
        product_id,
        quantity: newQuantity,
      });
      // Call getSubTotal after updating quantity in the backend
      getSubTotal();
    } catch (error) {
      console.error("Error updating quantity:", error);
    } finally {
      setLoading(false);
    }
  }, 500);

  const changeQuantity = (delta) => {
    const newQuantity = quantity + delta;
    if (newQuantity > 0) {
      setQuantity(newQuantity);
      setTotal(newQuantity * product_current_price);
      updateQuantityInBackend(newQuantity);
    }
  };

  useEffect(() => {
    setQuantity(product_quantity);
  }, [product_quantity]);

  return (
    <div className="flex items-center space-x-4">
      <IconButton onClick={() => changeQuantity(-1)}>
        <RemoveIcon />
      </IconButton>
      <div className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded text-lg">
        {quantity}
      </div>
      <IconButton onClick={() => changeQuantity(1)}>
        <AddIcon />
      </IconButton>
    </div>
  );
}

export default QuantitySelector;
