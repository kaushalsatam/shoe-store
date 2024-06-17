import { useEffect, useState } from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../../utils/baseURL";
import { useLoading } from "../../../Context/LoadingContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton } from "@mui/material";
import { red } from "@mui/material/colors";
import { toast } from "react-toastify";

const ProductCard = ({ cardData, customerData, isAuthenticated }) => {
  const [imageSrc, setImageSrc] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const { setLoading } = useLoading();

  const getProductImage = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseURL}/getImage`, {
        params: { id },
        responseType: "arraybuffer",
      });
      const base64String = btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      setImageSrc(`data:image/jpeg;base64,${base64String}`);
    } catch (error) {
      console.error("Error fetching product image:", error);
    } finally {
      setLoading(false);
    }
  };

  const checkIfFavorite = async () => {
    if (!customerData || !customerData.id || !cardData.id) return;

    try {
      const response = await axios.get(`${baseURL}/favourites`, {
        params: {
          customerId: customerData.id,
          productId: cardData.id,
        },
      });
      setIsFavorite(response.data.length > 0);
    } catch (error) {
      console.error("Error checking favorite status:", error);
    }
  };

  const toggleFavorite = async () => {
    try {
      if (isAuthenticated) {
        if (isFavorite) {
          await axios.delete(`${baseURL}/favourites`, {
            data: {
              customerId: customerData.id,
              productId: cardData.id,
            },
          });
          setIsFavorite(false);
          toast.success("Removed from favourites!");
        } else {
          await axios.post(`${baseURL}/favourites`, {
            customerId: customerData.id,
            productId: cardData.id,
          });
          setIsFavorite(true);
          toast.success("Added to favourites!");
        }
      } else {
        toast.warning("Please log in to add to favourites!");
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      toast.error("Failed to update favourites. Please try again later.");
    }
  };

  useEffect(() => {
    getProductImage(cardData.id);
    checkIfFavorite();
  }, [cardData.id, customerData]);

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
          <IconButton variant="text" onClick={toggleFavorite}>
            {isFavorite ? (
              <FavoriteIcon sx={{ color: red[500] }} />
            ) : (
              <FavoriteBorderOutlinedIcon />
            )}
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
