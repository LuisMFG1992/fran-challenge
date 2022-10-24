import React from "react";

const svgIcon = {
  backward: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 mr-2"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
      />
    </svg>
  ),
  forward: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 mr-2"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3"
      />
    </svg>
  ),
};

const Button = ({ label, svg }) => {
  return (
    <button className="m-4 min min-w-24 inline-flex items-center px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-md">
      {svg === "backward" ? svgIcon.backward : svgIcon.forward}
      {label}
    </button>
  );
};

export default Button;
