import React from "react";
import { HiOutlineArrowSmallRight } from "react-icons/hi2";
import invest_header from "../../assets/invest-header.png";

const Header = () => {
  return (
    <div className="flex mx-[1.5rem] lg:mx-0 lg:ml-[6.25rem] mt-[4rem] sm:mt-[7rem] mb-[5rem] items-center justify-between">
      <div className="lg:w-[60%]">
        <h1 className="text-left text-[3.5rem] sm:text-[5.5rem] font-[500] font-actor leading-[125%] text-[#505050]">
          invest in <br className="hidden lg:block" />
          <span className="text-[#5C27C0] inline font-[500] font-gilroy-bold">
            rework
          </span>{" "}
        </h1>
        <p className="font-[500] font-quicksand text-[1.25rem] text-[#505050] mt-8">
          Ready to help shape the future of remote work and grow with us?
          Explore our partner programs, find the one that’s right for you, and
          let’s make the future happen faster together.
        </p>
        <button className="w-fit mt-[1.5rem] flex p-2 sm:p-4 px-3 sm:px-5 justify-center items-center box-border text-[#5C27C0] text-[1.4rem] sm:text-[1.4rem] font-[400] m-0 border-solid border-[#5C27C0] border-[3px] font-gilroy-medium rounded-full gap-[0.5rem]">
          know more{" "}
          <span className="text-[144%]">
            <HiOutlineArrowSmallRight />
          </span>
        </button>
      </div>
      <div className="w-[40%] hidden lg:flex justify-center items-center">
        <img src={invest_header} alt="" />
      </div>
    </div>
  );
};

export default Header;
