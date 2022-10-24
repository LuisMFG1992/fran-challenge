import React from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";
import "./InputsFields.css";

const rotationInputsOptions = [
  {
    name: "Flip Axis",
    id: "flip",
    options: ["Select an option", "h", "v", "hv"],
  },
  {
    name: "Orientation",
    id: "orient",
    options: ["Select an option", 1, 2, 3, 4, 5, 6, 7, 8, 90, 180, 270],
  },
  {
    name: "Rotation",
    id: "rot",
    options: [0, 359],
    placeholder: "From 0 to 359",
  },
];

const adjustmentInputsOptions = [
  // options and placeholder van hardcodeados pq todos van de -100 a 100 y 0 es el default
  {
    ref: "",
    name: "Brightness",
    id: "bri",
  },
  {
    ref: "",
    name: "Contrast",
    id: "con",
  },
  {
    ref: "",
    name: "Exposure",
    id: "exp",
  },
  {
    ref: "",
    name: "Gamma",
    id: "gam",
  },
  {
    ref: "",
    name: "Highlight",
    id: "high",
  },
  {
    ref: "",
    name: "Hue Shift",
    id: "hue",
  },
  {
    ref: "",
    name: "Invert",
    id: "invert",
  },
  {
    ref: "",
    name: "Saturation",
    id: "sat",
  },
  {
    ref: "",
    name: "Shadow",
    id: "shad",
  },
  {
    ref: "",
    name: "Sharpen",
    id: "sharp",
  },
  {
    ref: "",
    name: "Unsharp Mask",
    id: "usm",
  },
  {
    ref: "",
    name: "Unsharp Mask Radius",
    id: "usmrad",
  },
  {
    ref: "",
    name: "Vibrance ",
    id: "vib",
  },
];

const InputsField = ({
  images,
  selectedImageHandler,
  selectedImageRef,
  paramsHandler,
}) => {
  return (
    <div className="overflow-scroll bg-gray-700 w-1/4 h-inputFields rounded-lg shadow-lg flex items-center flex-col overflow-hidden">
      <div className="flex justify-start flex-col pt-8">
        <p className="text-xl font-bold m-1 text-center">IMAGE</p>

        <select
          onChange={selectedImageHandler}
          ref={selectedImageRef}
          className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-52 p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {images.map((element, index) => (
            <option key={index} value={element}>
              {element}
            </option>
          ))}
        </select>

        <p className="text-xl font-bold m-1 mt-8 text-center">ROTATION</p>

        {rotationInputsOptions.map((input) => {
          return (
            <Input
              key={input.id}
              name={input.name}
              paramsHandler={paramsHandler}
              id={input.id}
              options={input.options}
              placeholder={input.placeholder}
            />
          );
        })}

        <p className="text-xl font-bold m-1 mt-8 text-center">ADJUSTMENT</p>

        {adjustmentInputsOptions.map((input) => {
          return (
            <Input
              key={input.id}
              name={input.name}
              paramsHandler={paramsHandler}
              id={input.id}
            />
          );
        })}

        <div className="m-4 flex items-end">
          {/* <Button label={"Backward"} svg={"backward"} />
          <Button label={"Forward"} svg={"forward"} /> */}
        </div>
      </div>
    </div>
  );
};

export default InputsField;
