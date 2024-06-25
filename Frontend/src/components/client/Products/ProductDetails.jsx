import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseURL } from "../../../utils/baseURL";
import axios from "axios";
import Carousel from "./Carousel";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SizeGrid from "./SizeGrid";
import { useLoading } from "../../../Context/LoadingContext"; // Import the loading context

function ProductDetails({ isAuthenticated, customerData }) {
  const [productData, setProductData] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(null);
  const [error, setError] = useState(null);
  const [isFavourite, setIsFavourite] = useState(false); // State to track if product is in favourites
  const { id } = useParams();
  const { setLoading } = useLoading(); // Use the loading context

  async function addToBag(id) {
    try {
      if (isAuthenticated) {
        if (size) {
          toast.success("Added to bag!");
          const customerId = Number(customerData.id);
          const productId = Number(id);
          await axios.post(`${baseURL}/addtobag`, {
            customerId,
            productId,
            quantity,
            size,
          });
        } else {
          toast.warning("Please select size to add item to your bag!");
        }
      } else {
        toast.warning("Please log in to add items to your bag!");
      }
    } catch (e) {
      // toast.error("Error adding to bag: " + e.message);
      console.error("Error adding to bag: " + e.message);
    }
  }

  async function toggleFavourite() {
    try {
      const customerId = Number(customerData.id);
      const productId = Number(id);

      if (isFavourite) {
        await axios.delete(`${baseURL}/favourites`, {
          data: { customerId, productId },
        });
        setIsFavourite(false);
        toast.success("Removed from favourites!");
      } else {
        await axios.post(`${baseURL}/favourites`, {
          customerId,
          productId,
        });
        setIsFavourite(true);
        toast.success("Added to favourites!");
      }
    } catch (e) {
      // toast.error("Error updating favourites: " + e.message);
      console.error("Error updating favourites: " + e.message);
    }
  }

  async function checkIfFavourite() {
    try {
      const customerId = Number(customerData.id);
      const productId = Number(id);
      const response = await axios.get(
        `${baseURL}/favourites?customerId=${customerId}&productId=${productId}`
      );
      if (response.data.length > 0) {
        setIsFavourite(true);
      }
    } catch (e) {
      console.error("Error checking favourites: " + e.message);
    }
  }

  useEffect(() => {
    async function getProductData(id) {
      setLoading(true); // Set loading to true when starting the data fetch
      try {
        const response = await axios.get(`${baseURL}/products/${id}`);
        setProductData(response.data[0]);
        if (isAuthenticated) {
          checkIfFavourite(); // Check if the product is in the favourites list
        }
      } catch (error) {
        setError("Error fetching product data");
        console.error(error);
      } finally {
        setLoading(false); // Set loading to false after the data fetch is complete
      }
    }

    getProductData(id);
  }, [id, setLoading, isAuthenticated]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!productData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <Carousel productData={productData} />
      <div className="data p-8 flex flex-col gap-4">
        <h1 className="font-black text-4xl">{productData.name}</h1>
        <h2 className="text-xl">
          by <span className="font-bold">{productData.brand}</span>
        </h2>
        <div>
          <span className="text-lg">
            MRP: <s>₹{productData.original_price}</s>
            <span className="font-bold"> ₹{productData.current_price}</span>
          </span>
        </div>
        <p className="text-lg">{productData.description}</p>
        <SizeGrid setSize={setSize} isKids={productData.gender === "Kids"} />
        <button
          className="border p-4 mx-4 bg-black hover:bg-gray-900 text-white rounded-full font-semibold"
          onClick={() => addToBag(id)}
        >
          Add to Bag
        </button>
        <button
          className="border p-4 mx-4 border-black bg-white hover:bg-gray-200 rounded-full font-semibold"
          onClick={toggleFavourite}
        >
          {isFavourite ? "Remove from Favourites" : "Add to Favourites"}
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;
