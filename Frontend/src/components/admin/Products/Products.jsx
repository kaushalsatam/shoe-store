import { useEffect, useState } from "react";
import axios from "axios";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { NavLink } from "react-router-dom";
import { baseURL } from "../../../utils/baseURL";

function Products() {
  const [productsData, setProductsData] = useState([]);

  const getData = async () => {
    try {
      const result = await axios.get(`${baseURL}/allProducts`);
      setProductsData(result.data);
    } catch (error) {
      console.error("There was an error fetching the products!", error);
    }
  };

  const deleteRow = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/deleteProduct/${id}`);
      setProductsData((prevData) =>
        prevData.filter((product) => product.id !== id)
      );
    } catch (error) {
      console.error("There was an error deleting the product!", error);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteRow(id);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                ID
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Brand
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Category
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Gender
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {productsData.map((data) => (
              <tr key={data.id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {data.id}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {data.name}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {data.brand}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {data.category}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {data.gender}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {data.stock_quantity > 0 ? "In Stock" : "Out of Stock"}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {data.stock_quantity}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDelete(data.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="add-product flex justify-start m-4">
        <NavLink to={"/admin/addProduct"}>
          <IconButton aria-label="add">
            <AddIcon fontSize="large" />
          </IconButton>
        </NavLink>
      </div>
    </div>
  );
}

export default Products;
