import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Sidebar from "./Sidebar";
import { baseURL } from "../../../utils/baseURL";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useLoading } from "../../../Context/LoadingContext.jsx"; // Import the loading context
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function Products({ customerData, isAuthenticated }) {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const { setLoading } = useLoading(); // Use the loading context
  const [selectedCategory, setSelectedCategory] = useState(""); // Add state for selected category
  const [sort, setSort] = useState(""); // Add state for sorting

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

  useEffect(() => {
    // Filter products based on search input, selected category, and sort option
    let updatedProducts = products.filter((data) => {
      const matchesSearch =
        search.toLowerCase() === "" || data.name.toLowerCase().includes(search);
      const matchesCategory =
        selectedCategory === "" || data.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort products based on selected sort option
    if (sort) {
      updatedProducts = updatedProducts.sort((a, b) => {
        switch (sort) {
          case "price ASC":
            return a.current_price - b.current_price;
          case "price DESC":
            return b.current_price - a.current_price;
          case "name ASC":
            return a.name.localeCompare(b.name);
          case "name DESC":
            return b.name.localeCompare(a.name);
          default:
            return 0;
        }
      });
    }

    setFilteredProducts(updatedProducts);
  }, [search, selectedCategory, sort, products]);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <div className="products-container flex flex-col lg:flex-row">
      <div className="lg:hidden">
        <IconButton onClick={toggleDrawer(true)} aria-label="menu">
          <ArrowForwardIosIcon />
        </IconButton>
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          <Sidebar
            setSearch={setSearch}
            setSelectedCategory={setSelectedCategory}
            setSort={setSort}
          />
        </Drawer>
      </div>
      <div className="hidden lg:block lg:w-1/4 xl:w-1/5">
        <Sidebar
          setSearch={setSearch}
          setSelectedCategory={setSelectedCategory}
          setSort={setSort}
        />
      </div>
      <div className="flex-1 flex flex-wrap gap-4 justify-around p-4 lg:p-8">
        {filteredProducts.map((data) => (
          <ProductCard
            key={data.id}
            cardData={data}
            customerData={customerData}
            isAuthenticated={isAuthenticated}
          />
        ))}
      </div>
    </div>
  );
}

export default Products;
