import { useState, useEffect } from "react";

function Carousel({ productData }) {
  const [imageURLs, setImageURLs] = useState({
    main: "",
    left: "",
    right: "",
    top: "",
    bottom: "",
  });

  const [displayedImageURL, setDisplayedImageURL] = useState(""); // State to store the URL of the displayed image

  useEffect(() => {
    if (productData) {
      const views = {
        main: productData.main?.data,
        left: productData.left_view?.data,
        right: productData.right_view?.data,
        top: productData.top_view?.data,
        bottom: productData.bottom_view?.data,
      };

      const newImageURLs = {};

      for (const [key, imageData] of Object.entries(views)) {
        if (imageData) {
          newImageURLs[key] = `data:image/jpeg;base64,${arrayBufferToBase64(
            imageData
          )}`;
        }
      }

      setImageURLs((prevURLs) => ({ ...prevURLs, ...newImageURLs }));
    }
  }, [productData]);

  // Helper function to convert ArrayBuffer to Base64
  function arrayBufferToBase64(buffer) {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  // Function to handle image click event
  function displayImage(url) {
    // Set the URL of the clicked image to the last image URL state
    setDisplayedImageURL(url);
  }

  return (
    <div className="flex items-center gap-8">
      <div className="m-8 flex flex-col w-20 gap-4">
        {Object.entries(imageURLs).map(
          ([key, url]) =>
            url && (
              <img
                key={key}
                src={url}
                alt={`${key} view`}
                className="rounded-2xl hover:opacity-75"
                onMouseOver={() => displayImage(url)} // Modified to pass a function
              />
            )
        )}
      </div>
      <img
        src={displayedImageURL || imageURLs.left} // Display the clicked image if available, otherwise display the default image (left view)
        alt="Main Image"
        className="h-auto w-96 rounded-lg"
      />
    </div>
  );
}

export default Carousel;
