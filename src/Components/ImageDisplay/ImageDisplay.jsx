import React from "react";
import MultipleImage from "../MultipleImage/MultipleImage";

import "./ImageDisplay.css";

const ImageDisplay = ({
  fullURL,
  selectedImage,
  images,
  params,
  urlCreator,
}) => {
  return (
    <div className="flex flex-col w-full">
      <div className="h-imageDisplayContainer mb-2 bg-gray-700 ml-2 h-1/4 p-2 rounded-lg shadow-lg flex flex-col justify-center items-center overflow-hidden">
        <p className="text-sm">
          Image is being scaled in–browser to fit viewing area. {""}
          <span className="underline text-blue-500 cursor-pointer">
            Open in a new window
          </span>
        </p>
        {fullURL === "" || fullURL.includes("Select") ? (
          <p className="text-2xl font-bold m-1 mt-8">Select an image</p>
        ) : (
          <img
            className="p-6 h-imageDisplay"
            src={fullURL}
            alt={selectedImage}
          />
        )}
      </div>

      <div className="bg-gray-700 ml-2 h-1/3 p-2 rounded-lg shadow-lg flex justify-center flex-col items-center overflow-hidden">
        <MultipleImage
          images={images}
          params={params}
          selectedImage={selectedImage}
          urlCreator={urlCreator}
        />
        <label
          className="text-left block mb-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
          htmlFor="file_input"
        >
          Upload file
        </label>
        <input
          className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="file_input"
          type="file"
        />
      </div>
    </div>
  );
};

export default ImageDisplay;
