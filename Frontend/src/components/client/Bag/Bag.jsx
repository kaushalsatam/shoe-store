import axios from "axios";
import { useEffect, useState } from "react";
import { baseURL } from "../../../utils/baseURL";
import Item from "./Item";

function Bag({ customerData }) {
  const [bag, setBag] = useState([]); // Initialize to an empty array

  async function getBagData() {
    const id = customerData.id;
    try {
      const response = await axios.get(`${baseURL}/bag`, {
        params: { id },
      });
      setBag(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error("Error fetching bag data", error);
    }
  }

  useEffect(() => {
    if (customerData.id) {
      getBagData();
    }
  }, [customerData]);

  return (
    <div className="grid grid-cols-2">
      <div className="bag bg-gray-100 rounded-2xl p-4 m-4 shadow-2xl">
        {bag.map((item, index) => (
          <Item key={index} bagData={item} /> // Make sure to return the JSX element
        ))}
      </div>
      <div className="checkout-card h-fit w-auto bg-orange-200 m-8 p-4 fixed right-4">
        <h1 className="text-2xl font-semibold">Checkout</h1>
      </div>
    </div>
  );
}

export default Bag;
