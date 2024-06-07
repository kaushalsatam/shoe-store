import axios from "axios";
import { useEffect, useState } from "react";
import { baseURL } from "../../../utils/baseURL";
import Item from "./Item";
import PaymentDetails from "./PaymentDetails";
import { NavLink, useNavigate } from "react-router-dom";
import sadBag from "../../../assets/Sad Bag.png";
import brand from "../../../assets/Brand.svg";

function Bag({ customerData }) {
  const [bag, setBag] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const navigate = useNavigate();

  async function getBagData() {
    const id = customerData.id;
    try {
      const response = await axios.get(`${baseURL}/bag`, {
        params: { id },
        headers: { Authorization: localStorage.getItem("authToken") },
      });
      setBag(response.data);
    } catch (error) {
      console.error("Error fetching bag data", error);
    }
  }

  async function getSubTotal() {
    const id = customerData.id;
    try {
      const response = await axios.get(`${baseURL}/get-subtotal`, {
        params: { id },
        headers: { Authorization: localStorage.getItem("authToken") },
      });
      // console.log("Subtotal response:", response.data); // Debugging
      setSubtotal(response.data.subtotal);
    } catch (error) {
      console.error("Error fetching subtotal", error);
    }
  }

  // handling payment

  const generateReceipt = () => {
    return `receipt_${new Date().getTime()}`;
  };

  const handleCheckout = async () => {
    const receipt = generateReceipt();
    try {
      const response = await axios.post(`${baseURL}/order`, {
        amount: subtotal * 100,
        receipt,
      });
      console.log(response.data);
      var options = {
        key: "rzp_test_LB2LYfJ6UCC7fn", // Enter the Key ID generated from the Dashboard
        amount: subtotal * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Solespace inc.",
        description: "Test Transaction",
        image: brand,
        order_id: response.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: async function (response) {
          //
          const body = {
            ...response,
            id: customerData.id,
            amount: subtotal,
          };

          const validateResponse = await axios.post(
            `${baseURL}/order/validate`,
            {
              body,
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          // console.log(validateResponse.data);
          navigate("/products");
        },
        prefill: {
          name: customerData.name,
          email: customerData.email,
          contact: customerData.phone,
        },
        notes: {
          address: "Solespace Inc., Mumbai, Maharashtra, India",
        },
        theme: {
          color: "#3399cc",
        },
      };
      var rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });
      rzp1.open();
      e.preventDefault();
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    if (customerData.id) {
      console.log(customerData);
      getBagData();
      getSubTotal();
    }
  }, [customerData]);

  return (
    <div>
      {!bag.length ? (
        <div className="empty-bag flex flex-col justify-center items-center p-4 m-4 gap-8">
          <h2 className="text-4xl">Your bag is currently empty.</h2>
          <img src={sadBag} alt="Sad Bag" height={200} width={200} />
          <p className="text-2xl">
            Looks like you haven't added anything to your bag yet.
          </p>
          <NavLink to={"/products"}>
            <p className="text-2xl text-blue-700">
              Start shopping to fill it up!
            </p>
          </NavLink>
        </div>
      ) : (
        <div className="grid grid-cols-3">
          <div className="bag bg-gray-100 rounded-2xl p-4 m-4 shadow-2xl col-span-2">
            {bag.map((item, index) => (
              <Item key={index} bagData={item} getSubTotal={getSubTotal} />
            ))}
          </div>
          <PaymentDetails
            subtotal={subtotal}
            shippingCost={0}
            onCheckout={handleCheckout}
          />
        </div>
      )}
    </div>
  );
}

export default Bag;
