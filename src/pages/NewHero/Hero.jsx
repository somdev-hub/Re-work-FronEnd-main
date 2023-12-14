import React from "react";
import Navbar from "./Navbar";
import "./hero.css";
import tick from "./assets/tick.svg";
import hero_review_one from "./assets/hero-review-one.png";
import hero_review_two from "./assets/hero-review-two.png";
import hero_review_three from "./assets/hero-review-three.png";

const Hero = () => {
  return (
    <div>
      <Navbar />
      <div className="3xl:h-screen 3xl:items-center 3xl:mt-0 mt-[6rem] sm:mt-[9rem] w-screen flex flex-col items-center justify-center sm:px-0 px-[1rem]">
        <div className="text-center">
          <h1 className="lg:text-[4.5rem] sm:text-[3.5rem] text-[2.3rem] 3xl:text-[6.5rem] font-[700] sm:leading-[5.125rem] 3xl:leading-[9rem] font-poppins heading py-2">
            Earn by Referring Talent
          </h1>
          <h1 className="text-[#4C4C4C] sm:text-[2.5rem] lg:text-[3.5rem] text-[1.5rem] 3xl:text-[4.5rem] font-400 font-poppins sm:leading-[3rem] 3xl:leading-[6rem]">
            from your Friends & Family.
          </h1>
          <p className="text-center font-poppins font-[300] 3xl:text-[1.5rem] mt-5 3xl:mt-10">
            Pharetra blandit augue volutpat libero augue semper. Non diam neque{" "}
            <br />
            praesent sem senectus mauris lectus a urna. Tortor pellentesque
            ipsum .
          </p>
        </div>
        <button className="flex px-[1.5rem] py-[0.5rem] sm:px-[3.5rem] sm:py-[1.1rem] 3xl:mt-[2.5rem] heading-btn text-[#FFFBFB] font-poppins sm:text-[1.5rem] text-[1rem] font-[500] mt-6">
          Get Started
        </button>
        <div className="mt-6 3xl:mt-10 flex gap-5 sm:gap-10 flex-wrap items-center justify-center">
          <div className="flex gap-2">
            <img src={tick} alt="" />
            <p className="text-[#808080] font-[600] font-poppins">
              AI Powered Shortlisting
            </p>
          </div>
          <div className="flex gap-2">
            <img src={tick} alt="" />
            <p className="text-[#808080] font-[600] font-poppins">
              Backed by Community
            </p>
          </div>
          <div className="flex gap-2">
            <img src={tick} alt="" />
            <p className="text-[#808080] font-[600] font-poppins">
              Hassle Free Payout
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className=" border-b-2 border-[#BCBCBC] border-solid w-[40vw] mt-[5rem] relative flex justify-center">
            <p className="absolute text-[#6A6A6A] font-[500] font-poppins bottom-[-11px] bg-white sm:px-5 text-center">
              Based on 100+ Reviews from
            </p>
          </div>
          <div className="flex mt-10 gap-5 items-center justify-center flex-wrap">
            <div className="">
              <img src={hero_review_one} alt="" />
            </div>
            <div
              className="
           sm:block hidden  border-solid border-r-2 border-[#BCBCBC] h-14"
            ></div>
            <div className="">
              <img src={hero_review_two} alt="" />
            </div>
            <div
              className="
           sm:block hidden border-r-2 border-solid border-[#BCBCBC] h-14"
            ></div>
            <div className="">
              <img src={hero_review_three} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;