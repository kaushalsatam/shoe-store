import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../../utils/baseURL";
import { useLoading } from "../../../Context/LoadingContext";

const ProductCard = ({ cardData }) => {
  const [imageSrc, setImageSrc] = useState("");
  const { setLoading } = useLoading();

  async function getProductData(id) {
    setLoading(true);
    try {
      const response = await axios.get(`${baseURL}/getImage`, {
        params: { id },
        responseType: "arraybuffer", // Ensure the response is in the right format
      });
      // Convert the binary data to a base64 string
      const base64String = btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      setImageSrc(`data:image/jpeg;base64,${base64String}`);
    } catch (error) {
      console.error("Error fetching product data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (cardData.id) {
      getProductData(cardData.id);
    }
  }, [cardData.id]);

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
            <FavoriteBorderOutlinedIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
