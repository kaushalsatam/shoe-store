import axios from "axios";
import { baseURL } from "../../../utils/baseURL";
import { useEffect, useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function CustomerOrders({ customerData }) {
  const [placedOrders, setPlacedOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [orderProducts, setOrderProducts] = useState({});

  async function getOrders(id, status) {
    try {
      const request = await axios.get(`${baseURL}/get-orders`, {
        params: { id, status },
      });
      if (status === "Placed") {
        setPlacedOrders(request.data);
      } else if (status === "Completed") {
        setCompletedOrders(request.data);
      }
      console.log(request.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }

  async function getOrderedProducts(orderId) {
    try {
      const request = await axios.get(`${baseURL}/get-orders/products`, {
        params: { orderId },
      });
      setOrderProducts((prev) => ({
        ...prev,
        [orderId]: request.data,
      }));
    } catch (error) {
      console.error("Error fetching ordered products:", error);
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // This will format the date as "MM/DD/YYYY" or according to the locale settings
  };

  useEffect(() => {
    if (customerData.id) {
      getOrders(customerData.id, "Placed");
      getOrders(customerData.id, "Completed");
    }
  }, [customerData.id]);

  const renderOrders = (orders, title) => (
    <div>
      <h2 className="customer-orders sm:text-xl font-light mb-4 sm:mb-8 flex justify-center items-center text-gray-700">
        {title}
      </h2>
      {orders.map((item) => (
        <Accordion key={item.id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${item.id}-content`}
            id={`panel${item.id}-header`}
            onClick={() => {
              if (!orderProducts[item.id]) {
                getOrderedProducts(item.id);
              }
            }}
          >
            <div className="main-content flex flex-col">
              <span className="font-semibold">Order #{item.id}</span>
              <span>Order Date: {formatDate(item.date)}</span>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <span className="total_amount block font-semibold">
              Total amount: ₹ {item.total_amount} /-
            </span>
            <h2 className="font-semibold">Items Ordered: </h2>
            <div>
              {orderProducts[item.id] ? (
                <div>
                  {orderProducts[item.id].map((product) => (
                    <div key={product.id}>
                      <span>
                        {product.name} - Qty. {product.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                "Loading products..."
              )}
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );

  return (
    <div className="profile m-4 sm:m-8 bg-gray-100 shadow-lg rounded-lg p-4 sm:p-8">
      <h1 className="customer-orders text-2xl sm:text-3xl font-semibold mb-4 sm:mb-8 flex justify-center items-center text-gray-700">
        Orders
      </h1>
      <hr className="m-8" />
      {renderOrders(placedOrders, "Placed Orders")}
      <hr className="m-8" />
      {renderOrders(completedOrders, "Completed Orders")}
    </div>
  );
}

export default CustomerOrders;
