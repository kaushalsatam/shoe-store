import { useEffect, useState } from "react";
import axios from "axios";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { baseURL } from "../../../utils/baseURL";

function Customers() {
  const [customerData, setCustomerData] = useState([]);

  async function getData() {
    const result = await axios.get(`${baseURL}/customers`);
    setCustomerData(result.data);
  }

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
                Email
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {customerData.map((data, index) => {
              return (
                <tr key={index} id="index">
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {data.id}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {data.name}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {data.email}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {data.phone}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <IconButton aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Customers;
