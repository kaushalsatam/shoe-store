import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../../../utils/baseURL"; // Adjust the import according to your project structure
import { debounce } from "lodash";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { IconButton } from "@mui/material";

function QuantitySelector({
  customer_id,
  product_id,
  product_quantity,
  product_current_price,
  setTotal,
}) {
  const [quantity, setQuantity] = useState(product_quantity);

  const updateQuantityInBackend = debounce(async (newQuantity) => {
    try {
      await axios.put(`${baseURL}/cart/update-quantity`, {
        customer_id,
        product_id,
        quantity: newQuantity,
      });
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  }, 500);

  const increaseQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateQuantityInBackend(newQuantity);
    setTotal(newQuantity * product_current_price);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateQuantityInBackend(newQuantity);
      setTotal(newQuantity * product_current_price);
    }
  };

  useEffect(() => {
    // Optionally, you can fetch the current quantity from the backend when the component mounts
    const fetchQuantity = async () => {
      try {
        const response = await axios.get(`${baseURL}/cart`, {
          params: { customer_id, product_id },
        });
        setQuantity(response.data.quantity);
      } catch (error) {
        console.error("Error fetching quantity:", error);
      }
    };

    fetchQuantity();
  }, [customer_id, product_id]);

  return (
    <div className="flex items-center space-x-4">
      <IconButton onClick={decreaseQuantity}>
        <RemoveIcon />
      </IconButton>
      <div className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded text-lg">
        {quantity}
      </div>
      <IconButton onClick={increaseQuantity}>
        <AddIcon />
      </IconButton>
    </div>
  );
}

export default QuantitySelector;
