import React, { useEffect, useState } from "react";
import QuantitySelector from "./QuantitySelector";

function Item({ bagData }) {
  const [imageSrc, setImageSrc] = useState("");
  const [total, setTotal] = useState(bagData.quantity * bagData.current_price);

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

  useEffect(() => {
    setTotal(bagData.quantity * bagData.current_price);
  }, [bagData.quantity, bagData.current_price]);

  return (
    <div className="item flex m-4 bg-white rounded-2xl shadow-xl">
      <div className="w-48 h-48 overflow-hidden p-4 m-4">
        <img
          src={imageSrc}
          alt="Product Image"
          className="w-full h-full object-cover rounded-xl cursor-pointer"
        />
      </div>
      <div className="flex flex-col justify-center items-start">
        <h1 className="text-xl font-bold cursor-pointer">
          {bagData.product_name}
        </h1>
        <p>{bagData.price}</p>
        <div className="flex p-4">
          <QuantitySelector
            customer_id={bagData.customer_id}
            product_id={bagData.product_id}
            product_quantity={bagData.quantity}
            product_current_price={bagData.current_price}
            setTotal={setTotal}
          />
        </div>
        <div>
          <p className="text-xl font-semibold">
            Total: <span className="font-normal">₹{total}/-</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Item;
