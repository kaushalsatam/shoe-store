import { NavLink } from "react-router-dom";

function FeaturedProduct(props) {
  return (
    <div
      className="flex flex-col rounded-lg shadow-lg overflow-hidden"
      data-aos="fade-up"
    >
      <div className="flex-shrink-0">
        <img
          className="h-48 w-full object-cover"
          src={props.imgSrc}
          alt="Product"
        />
      </div>
      <div className="flex-1 bg-white p-6 flex flex-col justify-between">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900">
            <a href="#" className="hover:underline">
              {props.category}
            </a>
          </h3>
          <p className="mt-3 text-base text-gray-500">{props.description}</p>
        </div>
        <div className="mt-6">
          <NavLink
            to={props.route}
            className="text-indigo-600 hover:text-indigo-500 font-medium"
          >
            Buy Now &rarr;
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default FeaturedProduct;
