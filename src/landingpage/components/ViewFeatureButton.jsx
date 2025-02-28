import { Button } from "@nextui-org/react";
import React from "react";
import { useNavigate } from "react-router-dom"; 


export const ViewFeaturesButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
   
      navigate("/auth/login"); 
  };

  return (
    <div className="flex gap-8 items-center self-start mt-4 ml-[-20px] font-medium tracking-wide leading-tight text-black">
      <Button
        className="self-stretch text-xl px-8 py-8 font-semibold bg-[#7096D1] text-white hover:bg-slate-800 pr-4 my-auto ml-5"
        size="large"
        variant="primary"
        onPress={handleClick} 
      >
        Enroll Now!
      </Button>
    </div>
  );
};
