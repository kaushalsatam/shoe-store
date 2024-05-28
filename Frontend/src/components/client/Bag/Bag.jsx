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
    <div className="bag">
      {bag.map((item, index) => (
        <Item key={index} bagData={item} /> // Make sure to return the JSX element
      ))}
    </div>
  );
}

export default Bag;
