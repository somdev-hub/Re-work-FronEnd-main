import React from "react";
import "../hero.css";
import featured_one from "../../assets/featured-one.png";
import featured_two from "../../assets/featured-two.png";
import featured_three from "../../assets/featured-three.png";
import featured_four from "../../assets/featured-four.png";
// import featured_five from "./assets/featured-five.png";

const Featured = () => {
  return (
    <div className="mt-[4rem] flex flex-col items-center mx-[7.5rem]">
      <div className="relative border-t-2 border-solid border-[#AD93DF] w-[60vw] flex flex-col items-center ">
        <h2 className="absolute  text-[2rem] text-center bg-[#FEFEFE] top-[-25px] px-[3%]">
          <span className="font-[600] text-transparent !bg-clip-text [background:linear-gradient(87.15deg,_#5c27c0,_#300580_0.01%,_#a47eeb)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] text-center font-garnett-semi-bold ">
            Featured On{" "}
          </span>
          <span className="font-[400] font-garnett-regular heading-h2-right  text-center">
            Prominent Platforms
          </span>
        </h2>
      </div>
      <div className="flex flex-col lg:flex-row flex-wrap w-full items-center mt-[3.5rem] justify-between mx-[7.5rem]">
        <img src={featured_one} alt="" className="w-[12rem]" />
        <img src={featured_two} alt="" className="w-[12rem]" />
        <img src={featured_three} alt="" className="w-[12rem]" />
        <img src={featured_four} alt="" className="w-[12rem]" />
      </div>
      <div className="flex flex-col lg:flex-row flex-wrap w-full items-center mt-[3rem] justify-between mx-[7.5rem]">
        <img src={featured_four} alt="" className="w-[12rem]" />
        <img src={featured_one} alt="" className="w-[12rem]" />
        <img src={featured_two} alt="" className="w-[12rem]" />
        <img src={featured_three} alt="" className="w-[12rem]" />
      </div>
    </div>
  );
};

export default Featured;
