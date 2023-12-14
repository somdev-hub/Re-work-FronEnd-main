import React from "react";
import { HiOutlineArrowSmallRight } from "react-icons/hi2";
import bestcandidate_main from "../../assets/bestcandidate-main.svg";

const BestCandidate = () => {
  return (
    <div className="my-[2.5rem] sm:my-[6.25rem]  flex gap-[8rem] mx-[1.5rem] sm:mx-0">
      <div className="sm:items-start items-center flex flex-col flex-start gap-8 ml-0 sm:ml-[6.25rem]">
        <div className=" flex gap-4 justify-center">
          <h1 className="text-center sm:text-left text-[2rem] sm:text-[4rem] font-actor font-[500] sm:font-gilroy-bold leading-[125%] text-[#202020]">
            secure the <h1 className="text-[#5C27C0] inline">best candidate</h1>{" "}
            for your company
          </h1>
        </div>
        <img
          src={bestcandidate_main}
          alt=""
          className=" sm:hidden flex w-[8rem]"
        />
        <p className="text-center sm:text-left text-[1rem] sm:text-[1.5rem] font-[500] leading-[120%] font-quicksand text-[#505050]">
          Enhancing your hiring process with the help of AI Powered tools and
          resources Ensuring that you get the best out of the hiring process
        </p>
        <button className="w-fit mt-[1.5rem] flex p-2 sm:p-4 px-5 justify-center items-center box-border text-[#5C27C0] text-[1rem] sm:text-[1.4rem] font-[400] m-0 border-solid border-[#5C27C0] border-[3px] rounded-full gap-[0.5rem]">
          book a demo{" "}
          <span className="text-[144%]">
            <HiOutlineArrowSmallRight />
          </span>
        </button>
      </div>
      <img
        src={bestcandidate_main}
        alt=""
        className="mr-[9rem] hidden sm:flex"
      />
    </div>
  );
};

export default BestCandidate;
