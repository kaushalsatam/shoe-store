import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import ShoppingBag from "@mui/icons-material/ShoppingBag";
import { NavLink } from "react-router-dom";

const ProductCard = ({ cardData }) => {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    if (cardData.left_view.data) {
      // Create a Uint8Array from the binary data
      const binaryData = new Uint8Array(cardData.left_view.data);
      // Convert the binary data to a base64 string
      const base64String = btoa(
        binaryData.reduce((data, byte) => data + String.fromCharCode(byte), "")
      );
      setImageSrc(`data:image/jpeg;base64,${base64String}`);
    }
  }, [cardData.left_view.data]);

  return (
    <div className="max-w-xs mx-auto bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      <NavLink to={`/product-details/${cardData.id}`}>
        <img
          className="w-full h-72 object-cover"
          src={imageSrc}
          alt="Shoe image"
        />
      </NavLink>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{cardData.name}</h3>
        <p className="mt-2 text-gray-600">
          {cardData.description.slice(0, 101) + "..."}
        </p>
        <div className="mt-4 flex items-center justify-between ">
          <span className="text-gray-900 font-bold">
            ₹{cardData.current_price}
          </span>
          <Button variant="text">
            <ShoppingBag />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
