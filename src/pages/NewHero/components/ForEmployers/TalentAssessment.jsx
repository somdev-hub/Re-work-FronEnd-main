import React from "react";
import strategic_handbook from "../../assets/strategic-handbook.png";

const TalentAssessment = () => {
  return (
    <div className="px-6 xl:px-[7.5rem] py-[3rem] xl:py-[5rem] bg-[#F6F6F6] mt-[3.5rem] flex flex-col md:flex-row items-center justify-between">
      <div className="">
        <h1 className="text-[#5C27C0] text-[2rem] xl:text-[2.625rem] ">
          <span className="font-[600] font-garnett-semi-bold ">
            Discover the Future{" "}
          </span>
          <span className="font-[400] font-garnett-regular">
            Talent <br className="hidden md:block" /> Assessment!
          </span>
        </h1>
        <p className="text-[#1F1F1F] font-poppins text-regular xl:text-[1.125rem] font-[400] my-7">
          Facing challenges in traditional hiring? <br /> Uncover the costs,
          pitfalls, and the game-changing role of Generative AI in recruitment.
        </p>
        <p className="text-[#1F1F1F] font-poppins text-regular xl:text-[1.125rem] font-[700]">
          🔍 Inside this Whitepaper
        </p>
        <ul>
          <li className="text-[#1F1F1F] font-poppins list-disc text-regular xl:text-[1.125rem] font-[400] ml-6">
            Manual vs. Machine-based hiring: Costs & Challenges.
          </li>
          <li className="text-[#1F1F1F] font-poppins list-disc text-regular xl:text-[1.125rem] font-[400] ml-6">
            The truth about "Interview as a Service."
          </li>
          <li className="text-[#1F1F1F] font-poppins list-disc text-regular xl:text-[1.125rem] font-[400] ml-6">
            Generative AI: The simple explanation. Optimize Your Hiring Process
            Today!
          </li>
        </ul>
        <button className="flex px-[1.5rem] py-[0.5rem] sm:px-[2rem] 2xl:px-[3.5rem] sm:py-[1rem] 3xl:mt-[2.5rem] shadow-[0px_8px_18px_0px_rgba(174,93,255,0.46)] rounded-[0.5rem] md:rounded-[1.25rem] text-[#FFFBFB] font-poppins sm:text-[1.2rem] 2xl:text-[1.5rem] bg-[#5C27C0] text-[1rem] font-[500] mt-12 md:mt-[5rem] xl:mt-[7rem]">
          Download Now for Smarter Recruitment
        </button>
      </div>
      <div className="mt-8 md:mt-0">
        <img src={strategic_handbook} alt="" />
      </div>
    </div>
  );
};

export default TalentAssessment;
