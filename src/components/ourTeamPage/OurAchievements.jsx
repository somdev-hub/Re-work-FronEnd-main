import React from "react";
import trophy from "../../assets/emoji-trophy.svg";

const OurAchievements = () => {
  return (
    <div className="my-10 sm:my-[5rem]">
      <h1 className="text-center text-[2.25rem] sm:text-[4rem]  font-[500] font-gilroy-bold leading-[125%] text-[#505050]">
        our{" "}
        <span className="text-[#5C27C0] inline font-gilroy-bold">
          achievements
        </span>{" "}
      </h1>
      <p className="text-[#707070] font-poppins text-[1rem] sm:text-[1.4rem] font-[400] mt-4 sm:mt-[4rem] text-center">
        With the utmost priority of adding value to the your business we
        undertake, we ensure <br /> that our partners stay ahead of the clutter
        and achieve excellence.
      </p>

      <div className="flex-wrap flex flex-col items-center sm:flex-row gap-[3rem] mt-8 sm:mt-[5.5rem] justify-center">
        <div className="w-[18rem] h-[12.5rem] flex items-center justify-center rounded-[0.6rem] shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <img src={trophy} alt="" />
        </div>
        <div className="w-[18rem] h-[12.5rem] shadow-[0_3px_10px_rgb(0,0,0,0.2)] flex items-center justify-center rounded-[0.6rem]">
          <img src={trophy} alt="" />
        </div>
        <div className="w-[18rem] h-[12.5rem] shadow-[0_3px_10px_rgb(0,0,0,0.2)] flex items-center justify-center rounded-[0.6rem]">
          <img src={trophy} alt="" />
        </div>
      </div>
    </div>
  );
};

export default OurAchievements;
