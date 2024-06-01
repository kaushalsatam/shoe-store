import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Sidebar from "./Sidebar";
import { baseURL } from "../../../utils/baseURL";
import axios from "axios";
import { useLocation } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const location = useLocation();

  async function getData(gender, category) {
    try {
      const result = await axios.get(`${baseURL}/getProducts`, {
        params: { gender, category },
      });
      setProducts(result.data);
    } catch (error) {
      console.error("Error fetching products:", error);
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
      <Sidebar />
      <div className="ml-64 flex flex-wrap gap-4 justify-around p-12">
        {products.map((data) => (
          <ProductCard key={data.id} cardData={data} />
        ))}
      </div>
    </div>
  );
}

export default Products;
