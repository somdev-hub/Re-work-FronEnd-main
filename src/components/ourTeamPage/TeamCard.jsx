import React from "react";

const TeamCard = ({ image, name, designation }) => {
  return (
    <div className="rounded-[1rem] w-[16rem] mx-auto sm:mx-0">
      <div className="h-[70%] rounded-t-[1rem] w-full">
        <img
          src={image}
          alt=""
          className="h-full w-full object-cover rounded-t-[1rem]"
        />
      </div>
      <div className="h-[30%] bg-white rounded-b-[1rem] flex flex-col justify-center sm:py-0 py-[0.8rem]">
        <h4 className="text-[#202020] m-0 text-[1.3rem] sm:text-[1.5rem] text-center font-actor">
          {name}
        </h4>
        <p className="text-[#202020] text-[1rem] sm:text-[1.2rem] font-gilroy-regular font-[400] text-center mt-1">
          {designation}
        </p>
      </div>
    </div>
  );
};

export default TeamCard;
