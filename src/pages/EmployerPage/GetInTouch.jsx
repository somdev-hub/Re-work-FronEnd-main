import React from "react";
import { HiOutlineArrowSmallRight } from "react-icons/hi2";

const GetInTouch = () => {
  return (
    <div className="my-[5rem] flex flex-col items-center justify-center bg-[#5C27C0] sm:bg-white rounded-[1rem] sm:rounded-none mx-[1.5rem] sm:mx-0 px-4 sm:px-0 py-8 sm:py-0">
      <div className="inline-flex flex-col items-center self-stretch justify-center xs:gap-[12px]">
        {/* Created a h1 for title of contact us. */}
        <h1 className="text-center sm:text-left text-[2rem] sm:text-[4rem] font-actor font-[500] sm:font-gilroy-bold leading-[125%] text-white sm:text-[#202020]">
          Don't hesitate{" "}
          <h1 className="sm:text-[#5C27C0] inline">get in touch</h1>{" "}
        </h1>
        {/* Created a p for content for contact us. */}
        <p className="text-center text-[20px] xs:text-[16px] sm:text-[20px] xl:text-[24px] 2xl:text-[32px] font-quicksand text-white sm:text-[#505050] leading-[120%] xs:max-w-[325px]">
          One of our customer service representatives will be happy to assist
          you.
        </p>
      </div>
      {/* Created a button for Contact us button */}
      <button className="flex justify-center font-gilroy-semi-bold items-center duration-300 transition-in-out xs:rounded-[32.258px] sm:rounded-[66.667px] 2xl:text-[32px] border-[3px] md:border-[3px] 2xl:border-[4.267px] hover:border-[3px] md:hover:border-[3px] 2xl:hover:border-[4.267px] border-transparent hover:border-inherit text-[16px] md:text-[20px] bg-white sm:bg-[#5C27C0]  text-[#5C27C0] sm:text-white hover:bg-white hover:text-[#5C27C0] xs:py-[10px] xs:pl-[10px] xs:pr-[10px] py-[12.8px] pl-[18.3px] pr-[14.7px]  xs:mt-[25px] sm:mt-[30px] lg:mt-[40px] 2xl:mt-[50px] gap-[8.59px]">
        contact us{" "}
        <span>
          <HiOutlineArrowSmallRight />
        </span>
      </button>
    </div>
  );
};

export default GetInTouch;
