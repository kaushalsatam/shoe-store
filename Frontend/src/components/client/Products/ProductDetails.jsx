import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseURL } from "../../../utils/baseURL";
import axios from "axios";
import Carousel from "./Carousel";

function ProductDetails() {
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

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
      {productData ? <Carousel productData={productData} /> : "No product data"}
      <div className="data p-8 flex flex-col gap-4">
        {" "}
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
        <button className="border p-4 mx-4 bg-black text-white rounded-full font-semibold">
          Add to Bag
        </button>
        <button className="border p-4 mx-4 border-black bg-white rounded-full font-semibold">
          Add to Favourites
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;
