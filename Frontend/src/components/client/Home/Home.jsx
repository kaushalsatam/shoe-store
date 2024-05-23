import FeaturedProduct from "./FeaturedProduct";
import runningShoes from "../../../assets/RunningShoes.jpg";
import casualSneakers from "../../../assets/CasualSneakers.jpg";
import formalShoes from "../../../assets/FormalShoes.jpg";
import Front from "./Front";
import { NavLink } from "react-router-dom";

function Home() {
  return (
    <>
      <Front />
      <div className="bg-white py-4">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            <span className="block">Step into Style</span>
            <span className="block text-indigo-600">
              With Our Latest Collection
            </span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <NavLink
                to={"/products"}
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Shop Now
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Product Showcase --> */}
      <section className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">
              Our Collection
            </h2>
            <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Featured Products
            </p>
          </div>

          <div className="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
            {/* Product 1 */}
            <FeaturedProduct
              imgSrc={runningShoes}
              category="Running Shoes"
              description=" High-performance running shoes for all your training needs."
              route="/products?category=Running"
            />

            {/* Product 2 */}
            <FeaturedProduct
              imgSrc={casualSneakers}
              category="Casual Sneakers"
              description=" Comfortable and stylish sneakers for everyday wear."
              route="/products?category=Sneakers"
            />

            <FeaturedProduct
              imgSrc={formalShoes}
              category="Formal Shoes"
              description=" Elegant formal shoes for your professional attire."
              route="/products?category=Formal"
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
