import React, { useState } from "react";

function SizeGrid({ setSize, isKids }) {
  const [selectedSize, setSelectedSize] = useState(null);

  function handleClick(value) {
    setSize(value);
    setSelectedSize(value);
  }

  const adultSizes = [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10];
  const kidsSizes = [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7];

  const sizes = isKids ? kidsSizes : adultSizes;

  return (
    <div className="size-grid-container grid grid-cols-3 grid-rows-3 text-center">
      {sizes.map((size) => (
        <div
          key={size}
          className={`border-2 m-2 p-4 rounded-md cursor-pointer ${
            selectedSize === size ? "border-black" : "border-gray-300"
          } hover:border-black`}
          onClick={() => handleClick(size)}
        >
          {isKids ? `UK ${size}` : `UK ${size}`}
        </div>
      ))}
    </div>
  );
}

export default SizeGrid;
