import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../../../utils/baseURL"; // Adjust the import according to your project structure

function QuantitySelector({ customer_id, product_id, product_quantity }) {
  const [quantity, setQuantity] = useState(product_quantity);

  const updateQuantityInBackend = async (newQuantity) => {
    try {
      await axios.put(`${baseURL}/cart/update-quantity`, {
        customer_id,
        product_id,
        quantity: newQuantity,
      });
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const increaseQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateQuantityInBackend(newQuantity);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateQuantityInBackend(newQuantity);
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
      <button
        onClick={decreaseQuantity}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
      >
        -
      </button>
      <div className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded text-lg">
        {quantity}
      </div>
      <button
        onClick={increaseQuantity}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
      >
        +
      </button>
    </div>
  );
}

export default QuantitySelector;
