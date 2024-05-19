import Card from "./Card";
import Sidebar from "./Sidebar";

function Products() {
  const sneaker = {
    name: "Cool Sneaker",
    description: "This is a cool sneaker that is very comfortable and stylish.",
    price: 120,
    // imageUrl: { cardPlaceholder },
  };

  return (
    <div className="products-container flex">
      <Sidebar />
      <div className="flex flex-wrap gap-4 justify-around p-12">
        <Card sneaker={sneaker} />
        <Card sneaker={sneaker} />
        <Card sneaker={sneaker} />
        <Card sneaker={sneaker} />
        <Card sneaker={sneaker} />
        <Card sneaker={sneaker} />
      </div>
    </div>
  );
}

export default Products;
