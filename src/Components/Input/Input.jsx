import React from "react";

const Input = (props) => {
  return (
    <>
      <label
        htmlFor="Flip"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
      >
        Flip
      </label>
      <select
        id="Flip"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        ref={props.refe}
        onChange={props.inputHandler}
      >
        {/* {inputs.options.map((option) => {
          <option key={option} value={option}>
            {option}
          </option>;
        })} */}

        <option defaultValue="default"></option>
        <option value="h">Horizontal</option>
        <option value="v">Vertical</option>
        <option value="hv">Horizontal and vertical</option>
      </select>
    </>
  );
};

export default Input;
