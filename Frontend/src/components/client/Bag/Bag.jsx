import axios from "axios";
import { useEffect, useState } from "react";
import { baseURL } from "../../../utils/baseURL";
import Item from "./Item";
import PaymentDetails from "./PaymentDetails";

function Bag({ customerData }) {
  const [bag, setBag] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  async function getBagData() {
    const id = customerData.id;
    try {
      const response = await axios.get(`${baseURL}/bag`, {
        params: { id },
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
        image: "https://example.com/your_logo",
        order_id: response.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: async function (response) {
          //
          const body = {
            ...response,
            id: customerData.id,
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
          console.log(validateResponse.data);
        },
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9000090000",
        },
        notes: {
          address: "Razorpay Corporate Office",
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
      getBagData();
      getSubTotal();
    }
  }, [customerData]);

  return (
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
  );
}

export default Bag;
