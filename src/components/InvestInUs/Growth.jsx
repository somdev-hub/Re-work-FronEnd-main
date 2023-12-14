import React from "react";
import invest_growth from "../../assets/invest-growth.png";

const Growth = () => {
  return (
    <div className="bg-[#5C27C0] flex py-[5rem] sm:py-0 sm:pt-[5rem] px-[1.5rem] lg:px-0">
      <img src={invest_growth} alt="" className="lg:block hidden" />
      <div className="grid grid-cols-2 grid-rows-2 gap-[3rem]">
        <div className="">
          <h3 className="text-white font-gilroy-bold text-[2rem] text-center lg:text-left sm:text-[2.5rem] w-fit font-[400] leading-[115%]">
            10+
            <div className="font-gilroy-regular text-[1.5rem] sm:text-[2.5rem]">
              startups
            </div>
          </h3>
        </div>
        <div className="">
          <h3 className="text-white font-gilroy-bold text-[2rem] text-center lg:text-left sm:text-[2.5rem] w-fit font-[400] leading-[115%]">
            30+
            <div className="font-gilroy-regular text-[1.5rem] sm:text-[2.5rem]">
              open positions
            </div>
          </h3>
        </div>
        <div className="">
          <h3 className="text-white font-gilroy-bold text-[2rem] text-center lg:text-left sm:text-[2.5rem] w-fit font-[400] leading-[115%]">
            20+
            <div className="font-gilroy-regular text-[1.5rem] sm:text-[2.5rem]">
              MNCs
            </div>
          </h3>
        </div>
        <div className="">
          <h3 className="text-white font-gilroy-bold text-[2rem] text-center lg:text-left sm:text-[2.5rem] w-fit font-[400] leading-[115%]">
            ₹100K+
            <div className="font-gilroy-regular text-[1.5rem] sm:text-[2.5rem]">
              earned by recruiters
            </div>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Growth;
