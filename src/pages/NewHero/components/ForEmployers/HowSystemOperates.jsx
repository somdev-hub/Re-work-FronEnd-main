import React from "react";

const HowSystemOperates = () => {
  return (
    <div className="mt-[9rem] bg-[#F6F6F6] px-6 xl:px-[7.5rem] py-[3rem] xl:py-[6rem] flex flex-col items-center">
      <h1 className="text-[#5C27C0] text-[2rem] xl:text-[2.625rem] text-center">
        <span className="font-[600] font-garnett-semi-bold ">
          How Our System{" "}
        </span>
        <span className="font-[400] font-garnett-regular">Operates</span>
      </h1>
      <p className="text-[#1C1C1C] font-poppins text-[1rem] xl:text-[1.125rem] font-[400] text-center">
        Simplify your hiring journey step by step. Elevate your recruitment
        strategy effortlessly with Rework's guided process.
      </p>
      <div className="flex flex-col md:flex-row gap-[3.75rem] mt-[4.12rem]">
        <div className="bg-[#EFE5FF] px-[1.8rem] pt-[1.5rem] xl:pt-[1.8rem] pb-[3rem] xl:pb-[3.75rem] flex-1">
          <h2 className="text-[#656565] font-space-grotesk text-[2rem] font-[700]">
            01
          </h2>
          <h3 className="text-[#5C27C0] font-garnett-semi-bold text-[1.125rem] font-[600] my-4 xl:my-[1.88rem]">
            Sign Up
          </h3>
          <p className="text-[#5B5B5B] font-poppins text-[1rem] xl:text-[1.125rem] font-[400]">
            Follow the link below to sign up and get access of the current job
            postings
          </p>
        </div>
        <div className="bg-[#EFE5FF] px-[1.8rem] pt-[1.5rem] xl:pt-[1.8rem] pb-[3rem] xl:pb-[3.75rem] flex-1">
          <h2 className="text-[#656565] font-space-grotesk text-[2rem] font-[700]">
            02
          </h2>
          <h3 className="text-[#5C27C0] font-garnett-semi-bold text-[1.125rem] font-[600] my-4 xl:my-[1.88rem]">
            Upload Documents
          </h3>
          <p className="text-[#5B5B5B] font-poppins text-[1rem] xl:text-[1.125rem] font-[400]">
            Shortlist the most qualified candidate and upload their details for
            the top companies
          </p>
        </div>
        <div className="bg-[#EFE5FF] px-[1.8rem] pt-[1.5rem] xl:pt-[1.8rem] pb-[3rem] xl:pb-[3.75rem] flex-1">
          <h2 className="text-[#656565] font-space-grotesk text-[2rem] font-[700]">
            03
          </h2>
          <h3 className="text-[#5C27C0] font-garnett-semi-bold text-[1.125rem] font-[600] my-4 xl:my-[1.88rem]">
            Get Rewards
          </h3>
          <p className="text-[#5B5B5B] font-poppins text-[1rem] xl:text-[1.125rem] font-[400]">
            As soon as the candidate gets selected you get your benefits
          </p>
        </div>
      </div>
      <button className="flex px-[1.5rem] py-[0.5rem] sm:px-[2rem] 2xl:px-[3.5rem] sm:py-[1rem] 3xl:mt-[2.5rem] shadow-[0px_8px_18px_0px_rgba(174,93,255,0.46)] rounded-[0.5rem] md:rounded-[1.25rem] text-[#FFFBFB] font-poppins sm:text-[1.2rem] 2xl:text-[1.5rem] bg-[#5C27C0] text-[1rem] font-[500] mt-[4rem]">
        Get Started
      </button>
    </div>
  );
};

export default HowSystemOperates;
