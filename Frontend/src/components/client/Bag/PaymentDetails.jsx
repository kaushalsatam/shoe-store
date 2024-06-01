import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";

function PaymentDetails({ subtotal, shippingCost, onCheckout }) {
  //   const total = subtotal + shippingCost;
  const total = subtotal;

  return (
    <div className="checkout-card bg-gray-100 m-8 p-6 fixed right-8 flex flex-col justify-between rounded-2xl shadow-xl w-96 h-3/4">
      <div className="w-full">
        <h1 className="text-2xl font-semibold m-4">Payment Details</h1>
        <div className="flex justify-between m-2">
          <span className="text-lg font-medium">Subtotal:</span>
          <span className="text-lg">₹{subtotal}</span>
        </div>
        <div className="flex justify-between m-2">
          <span className="text-lg font-medium">Shipping:</span>
          <span className="text-lg">₹{shippingCost}</span>
        </div>
        <div className="flex justify-between mx-2 my-4">
          <span className="text-lg font-semibold">Total:</span>
          <span className="text-lg font-semibold">₹{total}</span>
        </div>
      </div>
      <div className="flex flex-col">
        <NavLink to="/products" className="text-blue-500 mb-4">
          ◀ Get back to Products
        </NavLink>
        <Button
          variant="contained"
          size="large"
          onClick={onCheckout}
          className="mt-auto"
        >
          Checkout
        </Button>
      </div>
    </div>
  );
}

export default PaymentDetails;
