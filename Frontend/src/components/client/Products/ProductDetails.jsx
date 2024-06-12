import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseURL } from "../../../utils/baseURL";
import axios from "axios";
import Carousel from "./Carousel";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SizeGrid from "./SizeGrid";

function ProductDetails({ isAuthenticated, customerData, notify }) {
  const [productData, setProductData] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  async function addToBag(id) {
    try {
      if (isAuthenticated) {
        toast.success("Added to bag successfully!");
        const customerId = parseInt(JSON.stringify(customerData.id));
        const productId = parseInt(id);
        const request = await axios.post(`${baseURL}/addtobag`, {
          customerId,
          productId,
          quantity,
          size,
        });
        console.log(request.data);
      } else {
        toast.error("Please log in to add items to your bag.");
      }
    } catch (e) {
      toast.error("Error adding to bag: " + e.message);
      console.log(e.message);
    }
  }

  useEffect(() => {
    async function getProductData(id) {
      try {
        const response = await axios.get(`${baseURL}/products/${id}`);
        setProductData(response.data[0]);
      } catch (error) {
        setError("Error fetching product data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getProductData(id);
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="grid grid-cols-2">
      <div className="flex items-start">
        {productData ? (
          <Carousel productData={productData} />
        ) : (
          "No product data"
        )}
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
        <SizeGrid setSize={setSize} />
        <button
          className="border p-4 mx-4 bg-black hover:bg-gray-900 text-white rounded-full font-semibold"
          onClick={() => {
            addToBag(id);
          }}
        >
          Add to Bag
        </button>
        <button className="border p-4 mx-4 border-black bg-white hover:bg-gray-200 rounded-full font-semibold">
          Add to Favourites
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;
