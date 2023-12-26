import React from "react";
import step1 from "./assets/step-one.svg";
import step2 from "./assets/step-two.svg";
import step3 from "./assets/step-three.svg";
import step4 from "./assets/step-four.svg";
import right_arrow from "./assets/right-arrow.svg";
import right_arrow_black from "./assets/right-arrow-black.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Steps = () => {
  const steps = [
    {
      img: step1,
      heading: "Sign Up",
      text: "Follow the link below to sign up and get access of the current job postings"
    },
    {
      img: step2,
      heading: "Sign Up",
      text: "Follow the link below to sign up and get access of the current job postings"
    },
    {
      img: step3,
      heading: "Sign Up",
      text: "Follow the link below to sign up and get access of the current job postings"
    },
    {
      img: step4,
      heading: "Sign Up",
      text: "Follow the link below to sign up and get access of the current job postings"
    }
  ];
  return (
    <div className="xl:my-[6rem] my-[3rem] xl:mx-[7.5rem] mx-[1.5rem]">
      <h2 className="text-center font-[500] text-[2.625rem]  ">
        <span className="heading font-garnett-semi-bold">
          Start Earning in 4{" "}
        </span>
        <span className="font-garnett-regular text-black">Simple Steps</span>
      </h2>
      <div className="md:flex hidden mt-[7rem]">
        {steps.map((step, index) => {
          return (
            <div
              key={index}
              className={` ${
                index % 2 === 0 ? "bg-[#5C27C0]" : "bg-[#EFE5FF]"
              } rounded-[0.6rem] flex flex-col items-center relative transform transition-transform duration-500 hover:scale-y-[1.1] `}
            >
              {index !== steps.length - 1 && (
                <div
                  className={`absolute rounded-lg ${
                    index % 2 === 0 ? "bg-[#5C27C0]" : "bg-[#EFE5FF]"
                  } right-[-5%] flex flex-row items-center justify-start py-2.5 z-50 px-0 box-border`}
                >
                  <img
                    src={index % 2 === 0 ? right_arrow : right_arrow_black}
                    alt=""
                  />
                </div>
              )}
              <div className="py-[5.6rem] px-6 transform transition-transform duration-500  hover:scale-y-[0.909] flex flex-col items-center">
                <img src={step.img} alt="" />
                <h3
                  className={`${
                    index % 2 === 0 ? "text-[#EDEDED]" : "text-black"
                  }
                
                font-garnett-semi-bold text-[1.3rem] font-[600] text-center mt-[3.75rem]`}
                >
                  {step.heading}
                </h3>
                <p
                  className={`${
                    index % 2 === 0 ? "text-[#EDEDED]" : "text-black"
                  }
                font-poppins font-[400] text-[1.125rem] text-center mt-5`}
                >
                  {step.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="md:hidden block mt-[5rem]">
        <Swiper
          spaceBetween={50}
        >
          {steps.map((step, index) => {
            return (
              <SwiperSlide key={index}>
                <div
                  key={index}
                  className={` ${
                    index % 2 === 0 ? "bg-[#5C27C0]" : "bg-[#EFE5FF]"
                  } rounded-[0.6rem] flex flex-col items-center relative transform transition-transform duration-500 hover:scale-y-[1.1] mx-5`}
                >
                  {index !== steps.length - 1 && (
                    <div
                      className={`absolute rounded-lg ${
                        index % 2 === 0 ? "bg-[#5C27C0]" : "bg-[#EFE5FF]"
                      } right-[-5%] flex flex-row items-center justify-start py-2.5 z-50 px-0 box-border`}
                    >
                      <img
                        src={index % 2 === 0 ? right_arrow : right_arrow_black}
                        alt=""
                      />
                    </div>
                  )}
                  <div className="py-[5.6rem] px-6 transform transition-transform duration-500  hover:scale-y-[0.909] flex flex-col items-center">
                    <img src={step.img} alt="" />
                    <h3
                      className={`${
                        index % 2 === 0 ? "text-[#EDEDED]" : "text-black"
                      }
                
                font-garnett-semi-bold text-[1.3rem] font-[600] text-center mt-[3.75rem]`}
                    >
                      {step.heading}
                    </h3>
                    <p
                      className={`${
                        index % 2 === 0 ? "text-[#EDEDED]" : "text-black"
                      }
                font-poppins font-[400] text-[1.125rem] text-center mt-5`}
                    >
                      {step.text}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default Steps;
