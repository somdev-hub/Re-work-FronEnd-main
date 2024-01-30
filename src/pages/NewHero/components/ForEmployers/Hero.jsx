import React from "react";
import for_employers_hero from "../../assets/for-employers-hero.svg";
import tick from "../../assets/tick-blue.svg";

const Hero = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between mx-6 xl:mx-[7.5rem] mt-[4rem]">
      <div className="flex-1">
        <h1 className="text-[#5C27C0]">
          <span className="font-[600] font-garnett-semi-bold text-[2.5rem] xl:text-[3.375rem] 3xl:-text-[4rem]">
            Elevate Your Team with{" "}
          </span>
          <span className="font-[400] font-garnett-regular text-[2rem] xl:text-[3rem]">
            Rework's Revolutionary <br /> Hiring Solution.
          </span>
        </h1>
        <p className="text-[#1C1C1C] font-poppins text-[0.875rem] font-[400] mt-4">
          Empower your business with cutting-edge A.I. technology, simplified
          processes, and top-tier talent connections. Rework is your strategic
          partner in redefining how you hire{" "}
        </p>
        <button className="flex px-[1.5rem] py-[0.5rem] sm:px-[2rem] 2xl:px-[3.5rem] sm:py-[1rem] 3xl:mt-[2.5rem] shadow-[0px_8px_18px_0px_rgba(174,93,255,0.46)] rounded-[0.5rem] md:rounded-[1.25rem] text-[#FFFBFB] font-poppins sm:text-[1.2rem] 2xl:text-[1.5rem] bg-[#5C27C0] text-[1rem] font-[500] mt-9">
          Book A Demo
        </button>
        <div className="flex mt-12 gap-3">
          <img src={tick} className="text-[#5C27C0]" alt="" />
          <p className="text-[#5C27C0] font-poppins font-[400] text-[0.875rem]">
            No credit Required
          </p>
        </div>
        <div className="flex mt-4 gap-3">
          <img src={tick} className="text-[#5C27C0]" alt="" />
          <p className="text-[#5C27C0] font-poppins font-[400] text-[0.875rem]">
            Streamlined Recruitment Process
          </p>
        </div>
      </div>
      <div className="2xl:w-[40%] mt-8 md:mt-0">
        <img src={for_employers_hero} alt="" className="" />
      </div>
    </div>
  );
};

export default Hero;
