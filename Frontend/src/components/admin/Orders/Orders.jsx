import { useEffect, useState } from "react";
import { baseURL } from "../../../utils/baseURL";
import axios from "axios";
import { NavLink } from "react-router-dom";

function Orders() {
  const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      const request = await axios.get(`${baseURL}/get-orders`);
      setOrdersData(request.data);
    } catch (error) {
      setError("Error fetching orders data.");
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // This will format the date as "MM/DD/YYYY" or according to the locale settings
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-4 text-center">Loading...</div>
        ) : error ? (
          <div className="p-4 text-center text-red-500">{error}</div>
        ) : (
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Customer ID
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Total Amount
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Shipping Method
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Order Status
                </th>
              </tr>
            </thead>
            <tbody>
              {ordersData.map((order) => (
                <tr key={order.id} className="hover:bg-gray-100 cursor-pointer">
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <NavLink
                      to={`/admin/orders/${order.id}`}
                      className="block h-full w-full"
                    >
                      {order.id}
                    </NavLink>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <NavLink
                      to={`/admin/orders/${order.id}`}
                      className="block h-full w-full"
                    >
                      {order.customer_id}
                    </NavLink>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <NavLink
                      to={`/admin/orders/${order.id}`}
                      className="block h-full w-full"
                    >
                      {formatDate(order.date)}
                    </NavLink>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <NavLink
                      to={`/admin/orders/${order.id}`}
                      className="block h-full w-full"
                    >
                      {order.total_amount}
                    </NavLink>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <NavLink
                      to={`/admin/orders/${order.id}`}
                      className="block h-full w-full"
                    >
                      {order.shipping_method}
                    </NavLink>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <NavLink
                      to={`/admin/orders/${order.id}`}
                      className="block h-full w-full"
                    >
                      {order.order_status}
                    </NavLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Orders;
