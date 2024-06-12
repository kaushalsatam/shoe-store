import axios from "axios";
import { useParams } from "react-router-dom";
import { baseURL } from "../../../utils/baseURL";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { CircularProgress } from "@mui/material";

function OrderDetails() {
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(null);
  const { id } = useParams();

  const getOrderDetails = async (id) => {
    try {
      const request = await axios.get(`${baseURL}/order-details`, {
        params: { id },
      });
      setOrderDetails(request.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id) => {
    setUpdateLoading(true);
    setUpdateError(null);
    setUpdateSuccess(null);

    try {
      const response = await axios.patch(
        `${baseURL}/update-order-status`,
        null,
        {
          params: { id },
        }
      );
      setUpdateSuccess(
        response.data.message || "Order status updated successfully"
      );
      // Refresh order details
      getOrderDetails(id);
    } catch (err) {
      setUpdateError(err.message);
    } finally {
      setUpdateLoading(false);
    }
  };

  useEffect(() => {
    getOrderDetails(id);
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!orderDetails.length) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>No order details found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Order #{id}</h1>

      {/* Customer Details Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4">Customer Details</h2>
        <p className="text-lg">
          <span className="font-semibold">Name:</span>{" "}
          {orderDetails[0]?.customer_name}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Email:</span> {orderDetails[0]?.email}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Phone:</span> {orderDetails[0]?.phone}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Shipping Address:</span>{" "}
          {orderDetails[0]?.address}
        </p>
      </div>

      {/* Order Summary Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
        <p className="text-lg">
          <span className="font-semibold">Order Status:</span>{" "}
          {orderDetails[0]?.order_status}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Total Amount:</span> ₹{" "}
          {orderDetails[0]?.total_amount}/-
        </p>
        <p className="text-lg">
          <span className="font-semibold">Paid Amount:</span> ₹{" "}
          {orderDetails[0]?.total_amount}/-
        </p>
      </div>

      {/* Order Items Section */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {orderDetails.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{item.product_name}</h2>
            <p className="text-gray-700">Quantity: {item.quantity}</p>
          </div>
        ))}
      </div>

      {/* Update Order Status Button */}
      <div className="mt-6 flex justify-center">
        <Button
          variant="contained"
          color="success"
          onClick={() => updateStatus(id)}
          disabled={updateLoading}
        >
          {updateLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Success"
          )}
        </Button>
      </div>

      {/* Update Status Messages */}
      {updateError && (
        <div className="mt-4 text-red-500 text-center">
          Error: {updateError}
        </div>
      )}
      {updateSuccess && (
        <div className="mt-4 text-green-500 text-center">{updateSuccess}</div>
      )}
    </div>
  );
}

export default OrderDetails;
