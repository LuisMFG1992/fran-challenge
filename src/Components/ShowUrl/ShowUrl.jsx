import React from "react";

const ShowUrl = (props) => {
  let doesIncludes = props.fullURL.includes("Select");

  return (
    <div className="flex mt-2 mb-2">
      <span className=" inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-900 dark:text-white dark:border-gray-600">
        URL
      </span>
      <div
        type="text"
        className="rounded-none rounded-r-lg bg-gray-600 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {props.fullURL && !doesIncludes ? props.fullURL : "Select an image"}
      </div>
    </div>
  );
};

export default ShowUrl;
