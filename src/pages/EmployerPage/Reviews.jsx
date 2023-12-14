import React from "react";
import capterra from "../../assets/CapterraReview.png";
import trustpilot from "../../assets/trustPilotReview.png";
import crowd from "../../assets/crowdReviev.png";

const Reviews = () => {
  return (
    <div className="my-5">
      <div className="bg-[#5C27C0] py-[3rem] ">
        <div className="flex sm:flex-row flex-col gap-6 sm:gap-[3.5rem] justify-center items-center">
          <div className="bg-white rounded-[1rem] flex items-center flex-col justify-center gap-[3.5px] py-2">
            <img src={capterra} alt="" />
          </div>
          <div className="bg-white rounded-[1rem] flex items-center flex-col justify-center gap-[3.5px] py-2">
            <img src={trustpilot} alt="" />
          </div>
          <div className="bg-white rounded-[1rem] flex items-center flex-col justify-center gap-[3.5px] py-2">
            <img src={crowd} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
