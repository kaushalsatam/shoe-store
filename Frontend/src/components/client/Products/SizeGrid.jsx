import React from "react";

function SizeGrid({ setSize }) {
  function handleClick(value) {
    setSize(value);
  }

  return (
    <div className="size-grid-container grid grid-cols-3 grid-rows-3 text-center">
      <div
        className="border-2 m-2 p-4 cursor-pointer hover:border-black"
        onClick={() => handleClick(6)}
      >
        UK 6
      </div>
      <div
        className="border-2 m-2 p-4 cursor-pointer hover:border-black"
        onClick={() => handleClick(6.5)}
      >
        UK 6.5
      </div>
      <div
        className="border-2 m-2 p-4 cursor-pointer hover:border-black"
        onClick={() => handleClick(7)}
      >
        UK 7
      </div>
      <div
        className="border-2 m-2 p-4 cursor-pointer hover:border-black"
        onClick={() => handleClick(7.5)}
      >
        UK 7.5
      </div>
      <div
        className="border-2 m-2 p-4 cursor-pointer hover:border-black"
        onClick={() => handleClick(8)}
      >
        UK 8
      </div>
      <div
        className="border-2 m-2 p-4 cursor-pointer hover:border-black"
        onClick={() => handleClick(8.5)}
      >
        UK 8.5
      </div>
      <div
        className="border-2 m-2 p-4 cursor-pointer hover:border-black"
        onClick={() => handleClick(9)}
      >
        UK 9
      </div>
      <div
        className="border-2 m-2 p-4 cursor-pointer hover:border-black"
        onClick={() => handleClick(9.5)}
      >
        UK 9.5
      </div>
      <div
        className="border-2 m-2 p-4 cursor-pointer hover:border-black"
        onClick={() => handleClick(10)}
      >
        UK 10
      </div>
    </div>
  );
}

export default SizeGrid;
