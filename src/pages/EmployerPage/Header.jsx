import React from "react";
import { HiOutlineArrowSmallRight } from "react-icons/hi2";
import "swiper/css/pagination";
import "swiper/css";
import Review from "../../components/review/Review";

const Header = () => {
  return (
    <div className="bg-[#5C27C0] h-screen flex flex-col items-center justify-center sm:px-0 px-[1.5rem]">
      <div className="pt-[6rem] mx-[12.5rem] flex justify-center items-center flex-col ">
        <h1 className="text-white text-center font-gilroy-extrabold text-[3rem] sm:text-[6.25rem] font-[400] m-0 leading-tight">
          unleash the power of
        </h1>
        <h1 className="text-[4rem] text-center sm:text-[7rem] font-[400] font-gilroy-extrabold rainbow leading-tight">
          artificial intelligence
        </h1>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-[3.5rem]">
        <h3 className="text-[2rem] sm:text-[3rem] font-[400] font-actor text-white">
          boost your hiring.
        </h3>
        <button className="flex p-2 sm:p-4 px-5 justify-center items-center box-border text-white text-[1rem] sm:text-[1.4rem] font-[400] m-0 border-solid border-white border-[3px] rounded-full gap-[0.5rem]">
          book a demo{" "}
          <span className="text-[144%]">
            <HiOutlineArrowSmallRight />
          </span>
        </button>
      </div>
      <div className="flex items-center justify-center flex-col mt-[4rem] sm:mt-[9rem]">
        <Review />
      </div>
    </div>
  );
};

export default Header;
