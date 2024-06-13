import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Sidebar from "./Sidebar";
import { baseURL } from "../../../utils/baseURL";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useLoading } from "../../../Context/LoadingContext.jsx"; // Import the loading context

function Products() {
  const [search, setSearch] = useState("");
  // console.log(search);
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const { setLoading } = useLoading(); // Use the loading context

  async function getData(gender, category) {
    setLoading(true); // Set loading to true when starting the data fetch
    try {
      const result = await axios.get(`${baseURL}/getProducts`, {
        params: { gender, category },
      });
      setProducts(result.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false); // Set loading to false after the data fetch is complete
    }
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const genderParam = searchParams.get("gender");
    const categoryParam = searchParams.get("category");
    getData(genderParam, categoryParam);
  }, [location.search]);

  return (
    <div className="products-container flex">
      <Sidebar setSearch={setSearch} />
      <div className="ml-64 flex flex-wrap gap-4 justify-around p-12">
        {products
          .filter((data) => {
            return search.toLowerCase() === ""
              ? data
              : data.name.toLowerCase().includes(search);
          })
          .map((data) => (
            <ProductCard key={data.id} cardData={data} />
          ))}
      </div>
    </div>
  );
}

export default Products;
