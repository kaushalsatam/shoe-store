import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { baseURL } from "../../../utils/baseURL";
import axios from "axios";

function ProductDetails() {
  const { id } = useParams();

  async function getProductData(id) {
    const request = await axios.get(`${baseURL}/products/${id}`);
    console.log(request.data[0]);
  }

  useEffect(() => {
    getProductData(id);
  }, [id]);
  return <div></div>;
}

export default ProductDetails;
