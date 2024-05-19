import { useEffect, useState } from "react"
import axios from "axios";
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

function Products() {

  const [productsData, setProductsData] = useState([])

  async function getData(){
    const result = await axios.get("http://localhost:3000/allProducts");
    setProductsData(result.data);
  }

  useEffect(() => {
    getData()
  }, [])

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
                {productsData.map((data, index) => {

                  return(
                        <tr key={index} id="index">
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
                              <IconButton aria-label="delete">
                                <DeleteIcon />
                              </IconButton>
                            </td>
                        </tr>
                  )
                })}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Products
