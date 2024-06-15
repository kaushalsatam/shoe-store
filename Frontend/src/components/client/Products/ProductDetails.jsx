import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseURL } from "../../../utils/baseURL";
import axios from "axios";
import Carousel from "./Carousel";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SizeGrid from "./SizeGrid";
import { useLoading } from "../../../Context/LoadingContext"; // Import the loading context

function ProductDetails({ isAuthenticated, customerData, notify }) {
  const [productData, setProductData] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const { setLoading } = useLoading(); // Use the loading context

  async function addToBag(id) {
    try {
      if (isAuthenticated) {
        if (size) {
          toast.success("Added to bag!");
          const customerId = parseInt(JSON.stringify(customerData.id));
          const productId = parseInt(id);
          const request = await axios.post(`${baseURL}/addtobag`, {
            customerId,
            productId,
            quantity,
            size,
          });
          // console.log(request.data);
        } else {
          toast.warning("Please select size to add item to your bag!");
        }
      } else {
        toast.warning("Please log in to add items to your bag!");
      }
    } catch (e) {
      console.error("Error adding to bag: " + e.message);
    }
  }

  async function addToFavourites() {
    try {
      if (isAuthenticated) {
        const customerId = parseInt(JSON.stringify(customerData.id));
        const productId = parseInt(id);
        await axios.post(`${baseURL}/favourites`, {
          customerId,
          productId,
        });
        toast.success("Added to favourites!");
      } else {
        toast.warning("Please log in to add items to your bag!");
      }
    } catch (e) {
      console.error("Error adding to favourites: " + e.message);
    }
  }

  useEffect(() => {
    async function getProductData(id) {
      setLoading(true); // Set loading to true when starting the data fetch
      try {
        const response = await axios.get(`${baseURL}/products/${id}`);
        setProductData(response.data[0]);
      } catch (error) {
        setError("Error fetching product data");
        console.error(error);
      } finally {
        setLoading(false); // Set loading to false after the data fetch is complete
      }
    }

    getProductData(id);
  }, [id, setLoading]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!productData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-2">
      <div className="flex items-start">
        <Carousel productData={productData} />
      </div>
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
        <SizeGrid
          setSize={setSize}
          isKids={productData.gender == "Kids" ? true : false}
        />
        <button
          className="border p-4 mx-4 bg-black hover:bg-gray-900 text-white rounded-full font-semibold"
          onClick={() => {
            addToBag(id);
          }}
        >
          Add to Bag
        </button>
        <button
          className="border p-4 mx-4 border-black bg-white hover:bg-gray-200 rounded-full font-semibold"
          onClick={() => addToFavourites()}
        >
          Add to Favourites
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;
