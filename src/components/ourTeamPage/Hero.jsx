import React from "react";
import team_main from "../../assets/team-main.png";

const Hero = () => {
  return (
    <div className="mt-[4rem] md:mt-[6.65rem] px-[1.25rem] sm:px-[3.25rem] md:px-[6.25rem] mb-[5rem] flex">
      <div className="flex-1">
        <div className="">
          <p>OUR TEAM</p>
          <h1 className="text-left text-[3.5rem] sm:text-[5.5rem] font-[500] font-gilroy-bold leading-[125%] text-[#505050]">
            Who{" "}
            <span className="text-[#5C27C0] inline font-[500] font-gilroy-bold">
              we are
            </span>{" "}
          </h1>
        </div>
        <p className="mt-10 font-quicksand text-[1rem] sm:text-[1.25rem] font-[500] leading-[125%] text-[#505050]">
          Welcome to Rework, the revolutionary hiring platform that helps
          employers supercharge their hiring process with the help of
          cutting-edge A.I. technology. We believe in making the hiring process
          easier, faster, and more cost-effective. At the same time, we help
          recruiters earn good money by providing employers with the best
          candidate leads.
        </p>
        <br />
        <p className=" font-quicksand text-[1rem] sm:text-[1.25rem] font-[500] leading-[125%] text-[#505050]">
          We also provide a variety of features to help employers get the most
          out of the recruitment process. From detailed candidate profiles to
          automated messaging and interview scheduling, we have all the tools
          you need to ensure a smooth and successful hiring process. Our team of
          experts is always available to provide personalized support and
          advice, and to ensure you get the most out of our platform.
        </p>
      </div>
      <div className="hidden flex-1 justify-end items-center md:flex">
        <img src={team_main} alt="" />
      </div>
    </div>
  );
};

export default Hero;
