import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Sidebar from "./Sidebar";
import { baseURL } from "../../../utils/baseURL";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);

  async function getData() {
    const result = await axios.get(`${baseURL}/getProducts`);
    setProducts(result.data);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="products-container flex">
      <Sidebar />
      <div className="flex flex-wrap gap-4 justify-around p-12">
        {products.map((data) => (
          <ProductCard key={data.id} cardData={data} />
        ))}
      </div>
    </div>
  );
}

export default Products;
