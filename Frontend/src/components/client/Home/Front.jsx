import frontImage from "../../../assets/Nike3.png";

function Front() {
  return (
    <div className="home-front-page flex justify-center items-center my-6">
      <div className="front-heading">
        <h1 className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
          Step Up Your Game:{" "}
          <span className="text-gray-500">
            Discover the Ultimate Sneaker Collection!
          </span>
        </h1>
      </div>
      <div className="relative">
        <div className="absolute inset-0 h-full w-full bg-gray-200 z-0 rounded-full"></div>
        <img
          src={frontImage}
          alt="Front Image"
          className="relative z-10 p-6"
          height={1100}
          width={1100}
        />
      </div>
    </div>
  );
}

export default Front;
