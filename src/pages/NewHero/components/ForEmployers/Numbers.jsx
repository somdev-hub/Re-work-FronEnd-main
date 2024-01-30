import React from "react";

const Numbers = () => {
  return (
    <div className="mx-6 xl:mx-[7.5rem] my-12 xl:my-[6rem] flex flex-col lg:flex-row justify-between">
      <h1 className="text-[#5C27C0] lg:w-[30%] text-[2rem] xl:text-[2.375rem]">
        <span className="font-[600] font-garnett-medium ">
          How Rework AI has been a good{" "}
        </span>
        <span className="font-[400] font-garnett-regular">
          Hiring br platform for Companies
        </span>
      </h1>
      <div className="flex mt-4 lg:mt-0 lg:w-[70%]">
        <div className="mr-4 flex flex-col items-center">
          <h3 className="text-[#5C27C0] font-space-grotesk text-[2.5rem] xl:text-[3.125rem] font-[700] text-center">
            80%
          </h3>
          <p className="text-[#3B3B3B] font-poppins font-[400] text-base xl:text-[1.125rem] w-[70%] text-center">
            Reduction in your recruitment TAT with the access to a wider talent
            pool on the platform
          </p>
        </div>
        <div className="px-4 border-r-2 border-l-2 border-solid border-[#5C27C0]">
          <h3 className="text-[#5C27C0] font-space-grotesk text-[2.5rem] xl:text-[3.125rem] font-[700] text-center">
            50%
          </h3>
          <p className="text-[#3B3B3B] font-poppins font-[400] text-base xl:text-[1.125rem] text-center">
            Streamline your budgeting and save money while finding the top
            candidates
          </p>
        </div>
        <div className="ml-4">
          <h3 className="text-[#5C27C0] font-space-grotesk text-[2.5rem] xl:text-[3.125rem] font-[700] text-center">
            10k
          </h3>
          <p className="text-[#3B3B3B] font-poppins font-[400] text-base xl:text-[1.125rem] text-center">
            Certified sourcing partners’ expertise
          </p>
        </div>
      </div>
    </div>
  );
};

export default Numbers;
