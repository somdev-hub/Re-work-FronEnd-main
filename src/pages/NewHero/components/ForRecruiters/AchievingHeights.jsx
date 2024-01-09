import React, { useEffect, useState } from "react";

const AchievingHeights = () => {
  const [noOfCompanies, setNoOfCompanies] = useState(0);
  const [noOfRecruiters, setNoOfRecruiters] = useState(0);
  const [noOfCandidates, setNoOfCandidates] = useState(0);

  const counter = (min, max, state) => {
    // let i = parseInt(max / 2);
    const intervalId = setInterval(() => {
      if (min <= max) {
        state(min);
        min++;
      } else {
        clearInterval(intervalId);
      }
    }, 10);
  };

  useEffect(() => {
    counter(600, 1245, setNoOfCompanies);
  }, []);

  useEffect(() => {
    counter(35800, 36245, setNoOfRecruiters);
  }, []);

  useEffect(() => {
    counter(600, 1241, setNoOfCandidates);
  }, []);

  return (
    <div className="xl:py-[8rem] py-[4rem] xl:px-[7.5rem] px-[1.5rem] bg-[#5C27C0] text-white flex flex-col md:flex-row">
      <div className="md:w-[30%]">
        <h3 className="font-[500] font-garnett-medium text-[1.5rem] md:text-[2rem] xl:text-[2.3rem] text-center md:text-left">
          Achieving heights, counting success numbers
        </h3>
      </div>
      <div className="flex md:gap-0 gap-5 mt-5 md:mt-0 justify-center items-center md:w-[70%] flex-col md:flex-row">
        <div className="md:border-r-2 border-solid border-white flex flex-col items-center justify-center px-4">
          <h2 className="text-[2rem] md:text-[3.125rem] font-[700] font-space-grotesk">
            {noOfCompanies}+
          </h2>
          <p className="text-[1.125rem] font-[400] font-poppins text-center text-[#F5F5F5] ">
            Top Companies uses our Platform to Hire Cadidates
          </p>
        </div>
        <div className="md:border-r-2 border-solid border-white flex flex-col items-center justify-center px-4">
          <h2 className="text-[2rem] md:text-[3.125rem] font-[700] font-space-grotesk">
            {noOfRecruiters}+
          </h2>
          <p className="text-[1.125rem] font-[400] font-poppins text-center text-[#F5F5F5] ">
            Recruiters Earn Daily with the Help of our Platform.
          </p>
        </div>
        <div className="e flex flex-col items-center justify-center px-4">
          <h2 className="text-[2rem] md:text-[3.125rem] font-[700] font-space-grotesk">
            {noOfCandidates}+
          </h2>
          <p className="text-[1.125rem] font-[400] font-poppins text-center text-[#F5F5F5] ">
            Candidates Hired Until now and are still counting.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AchievingHeights;
