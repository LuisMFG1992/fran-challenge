import React from "react";
import MultipleImagePlaceholder from "../MultipleImagePlaceholder/MultipleImagePlaceholder";

import "./MultipleImage.css";

const MultipleImage = ({ images, params, selectedImage, urlCreator }) => {
  const imageFitered = images.filter(
    (images) => images !== selectedImage && images !== "Select an image"
  );

  const fiveImageArr = imageFitered.slice(0, 5);

  const arrFullUrl = fiveImageArr.map((element) => {
    return urlCreator(element, params);
  });

  const imageComponent = (
    <div className="w-full flex flex-row">
      {arrFullUrl.map((element) => (
        <img
          className="img-dimention p-1"
          src={element}
          alt={element}
          key={element}
          //   width="100"
          //   height="100"
        />
      ))}
    </div>
  );

  return (
    <div>{!selectedImage ? <MultipleImagePlaceholder /> : imageComponent}</div>
  );
};

export default MultipleImage;
