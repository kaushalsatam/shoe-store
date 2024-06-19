import React from "react";
import frontImage from "../../../assets/Nike3.png";

function Front() {
  return (
    <div className="home-front-page flex flex-col lg:flex-row justify-center items-center my-6 px-4 lg:px-0">
      <div
        className="front-heading mb-6 lg:mb-0 lg:mr-6 text-center lg:text-left"
        data-aos="fade-right"
      >
        <h1 className="mt-1 text-3xl sm:text-4xl font-extrabold text-gray-900 sm:tracking-tight lg:text-5xl xl:text-6xl">
          Step Up Your Game:{" "}
          <span className="text-gray-500">
            Discover the Ultimate Sneaker Collection!
          </span>
        </h1>
      </div>
      <div className="relative" data-aos="fade-left">
        <div className="absolute inset-0 h-full w-full bg-gray-200 z-0 rounded-full"></div>
        <img
          src={frontImage}
          alt="Front Image"
          className="relative z-10 p-6"
          style={{
            maxHeight: "500px",
            maxWidth: "500px",
            width: "100%",
            height: "auto",
          }}
        />
      </div>
    </div>
  );
}

export default Front;
