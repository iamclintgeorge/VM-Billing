import React from "react";

const SpecCard = ({ title }) => {
  return (
    <div>
      <div className="h-56 w-60 border-gray-500 border-2">
        <p>{title}</p>
      </div>
    </div>
  );
};

export default SpecCard;
