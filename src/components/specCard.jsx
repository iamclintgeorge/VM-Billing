import React from "react";

const SpecCard = ({ title }) => {
  return (
    <div className="flex flex-col items-center w-60 h-56 p-5 border-2 border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
      <div className="flex w-full h-full bg-gray-100 rounded-lg">
        <p className="text-lg font-inter text-gray-800">{title}</p>
      </div>
    </div>
  );
};

export default SpecCard;
