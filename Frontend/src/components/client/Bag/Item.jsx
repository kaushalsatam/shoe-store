import React, { useEffect, useState } from "react";
import QuantitySelector from "./QuantitySelector";

function Item({ bagData }) {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    if (bagData && bagData.left_view && bagData.left_view.data) {
      // Create a Uint8Array from the binary data
      const binaryData = new Uint8Array(bagData.left_view.data);
      // Convert the binary data to a base64 string
      const base64String = btoa(
        binaryData.reduce((data, byte) => data + String.fromCharCode(byte), "")
      );
      setImageSrc(`data:image/jpeg;base64,${base64String}`);
    }
  }, [bagData]);
  return (
    <div className="item flex m-4">
      <div className="w-48 h-48 overflow-hidden bg-gray-100 p-4 m-4">
        <img
          src={imageSrc}
          alt="Product Image"
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <h1 className="text-2xl font-bold">{bagData.product_name}</h1>
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <QuantitySelector
            customer_id={bagData.customer_id}
            product_id={bagData.product_id}
            product_quantity={bagData.quantity}
          />
        </div>
      </div>
    </div>
  );
}

export default Item;
