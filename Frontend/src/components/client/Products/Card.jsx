import { Button } from "@mui/material";
import cardPlaceholder from "../../../assets/CardPlaceholder.png";
import ShoppingBag from "@mui/icons-material/ShoppingBag";

const ProductCard = ({ sneaker }) => {
  return (
    <div className="max-w-xs mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <img
        className="w-full h-72 object-cover"
        src={cardPlaceholder}
        alt={sneaker.name}
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{sneaker.name}</h3>
        <p className="mt-2 text-gray-600">{sneaker.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-gray-900 font-bold">${sneaker.price}</span>
          <Button variant="text">
            <ShoppingBag />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
