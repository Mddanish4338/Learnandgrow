import React from "react";
import Button from "./Button";

export const ViewFeaturesButton = () => {
  const handleClick = () => {
    console.log("View all features clicked");
  };

  return (
    <div className="flex gap-8 items-center self-start mt-4 ml-[-20px] font-medium tracking-wide leading-tight text-black">
      <Button
        className="self-stretch pr-4 my-auto ml-5"
        size="large"
        variant="primary"
        onClick={handleClick} // ✅ Yahan click event rakho
      >
        Enroll Now!
      </Button>
    </div>
  );
};
