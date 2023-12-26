import React from "react";
import tick_green from "../../assets/tick-green.svg";
import cross_red from "../../assets/cross-red.svg";
import { HiOutlineArrowSmallRight } from "react-icons/hi2";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, } from 'swiper/modules';
import "swiper/css/pagination";
import "swiper/css";

const PricingPlans = () => {
  const pricing_data = [
    {
      heading: "1 month",
      mostPopular: false,
      subheading: "Suitable for companies with 5-10 openings",
      list: [
        {
          tick: true,
          text: "10 interview-ready candidates"
        },
        {
          tick: true,
          text: "Unlimited job postings"
        },
        {
          tick: true,
          text: "Receive pre-vetted profiles within 48 hours"
        },
        {
          tick: false,
          text: "Dedicated account manager"
        },
        {
          tick: false,
          text: "Assistance with interview scheduling"
        },
        {
          tick: false,
          text: "Custom reports"
        }
      ]
    },
    {
      heading: "3 months",
      mostPopular: true,
      subheading: "Suitable for companies with 5-10 openings",
      list: [
        {
          tick: true,
          text: "10 interview-ready candidates"
        },
        {
          tick: true,
          text: "Unlimited job postings"
        },
        {
          tick: true,
          text: "Receive pre-vetted profiles within 48 hours"
        },
        {
          tick: true,
          text: "Dedicated account manager"
        },
        {
          tick: true,
          text: "Assistance with interview scheduling"
        },
        {
          tick: false,
          text: "Custom reports"
        }
      ]
    },
    {
      heading: "6 months",
      mostPopular: false,
      subheading: "Suitable for companies with 10+ openings",
      list: [
        {
          tick: true,
          text: "10 interview-ready candidates"
        },
        {
          tick: true,
          text: "Unlimited job postings"
        },
        {
          tick: true,
          text: "Receive pre-vetted profiles within 48 hours"
        },
        {
          tick: true,
          text: "Dedicated account manager"
        },
        {
          tick: true,
          text: "Assistance with interview scheduling"
        },
        {
          tick: true,
          text: "Custom reports"
        }
      ]
    }
  ];
  return (
    <div className=" sm:my-[5rem] sm:mx-[6rem] flex flex-col items-center">
      <div className="text-center flex gap-4 justify-center">
        <h1 className="text-[2.25rem] sm:text-[4rem] font-actor font-[500] sm:font-gilroy-bold leading-[125%] text-[#5C27C0]">
          Pricing
        </h1>
        <h1 className="text-[2.25rem] sm:text-[4rem] font-actor font-[500] sm:font-gilroy-bold leading-[125%] text-[#202020]">
          Plans
        </h1>
      </div>
      <div className="hidden sm:flex gap-[1.25rem] mt-10">
        {pricing_data.map((item, index) => {
          return (
            <div
              key={index}
              className={`py-8 px-8 flex flex-col gap-6 rounded-[1rem]  shadow-2xl cursor-pointer ${
                item.mostPopular ? "bg-[#5C27C0] " : "bg-white"
              }`}
            >
              <div className="">
                <div className="flex justify-between items-center">
                  <h4
                    className={`text-[2.5rem] leading-[125%] font-[400] ${
                      item.mostPopular ? "text-white" : "text-[#5C27C0]"
                    } font-actor `}
                  >
                    {item.heading}
                  </h4>
                  {item.mostPopular && (
                    <button className="w-fit flex p-2 justify-center items-center box-border text-white  text-[1rem] sm:text-[14px] font-[400] m-0 border-solid border-white border-[2px] rounded-full gap-[0.5rem]">
                      most popular
                    </button>
                  )}
                </div>
                <h5
                  className={`${
                    item.mostPopular ? "text-white" : "text-[#505050]"
                  } text-[1.5rem] font-[400] leading-[125%] font-gilroy-medium mt-4 w-[90%]`}
                >
                  {item.subheading}
                </h5>
              </div>
              <div className="">
                <ul className="">
                  {item.list.map((list_item, index) => {
                    return (
                      <li
                        key={index}
                        className="list-none flex gap-2 w-[90%] mb-3 "
                      >
                        <img
                          src={list_item.tick ? tick_green : cross_red}
                          alt=""
                        />
                        <p
                          className={`${
                            item.mostPopular ? "text-white" : "text-[#505050]"
                          } font-[400] leading-[125%] font-gilroy-regular`}
                        >
                          {list_item.text}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
      <div className="sm:hidden overflow-hidden w-full ">
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView="auto"
          spaceBetween={30}
          //   autoplay
          // centeredSlides={true}
          pagination={{ clickable: true }}
          style={{
            "--swiper-pagination-color": "#5C27C0",
            "--swiper-pagination-bullet-inactive-color": "#D9D9D9",
            "--swiper-pagination-bullet-inactive-opacity": "1",
            "--swiper-pagination-bullet-horizontal-gap": "4px"
          }}
          // className="custom-swiper"
        >
          {pricing_data.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <div
                  key={index}
                  className={`mt-[3rem] mx-6 py-8 px-4 flex flex-col gap-6 rounded-[1rem]  shadow-2xl cursor-pointer mb-[3rem] m-auto ${
                    item.mostPopular ? "bg-[#5C27C0] " : "bg-white"
                  }`}
                >
                  <div className="">
                    <div className=" items-center">
                      <h4
                        className={`text-center text-[2.5rem] leading-[125%] font-[400] ${
                          item.mostPopular ? "text-white" : "text-[#5C27C0]"
                        } font-actor `}
                      >
                        {item.heading}
                      </h4>
                      {/* {item.mostPopular && (
                        <button className="w-fit flex p-2 justify-center items-center box-border text-white  text-[1rem] sm:text-[14px] font-[400] m-0 border-solid border-white border-[2px] rounded-full gap-[0.5rem]">
                          most popular
                        </button>
                      )} */}
                    </div>
                    <h5
                      className={`${
                        item.mostPopular ? "text-white" : "text-[#505050]"
                      } text-center text-[1.5rem] font-[400] leading-[125%] font-gilroy-medium mt-4`}
                    >
                      {item.subheading}
                    </h5>
                  </div>
                  <div className="">
                    <ul className="">
                      {item.list.map((list_item, index) => {
                        return (
                          <li
                            key={index}
                            className="list-none flex items-center gap-2 mb-2 "
                          >
                            <img
                              src={list_item.tick ? tick_green : cross_red}
                              alt=""
                            />
                            <p
                              className={`${
                                item.mostPopular
                                  ? "text-white"
                                  : "text-[#505050]"
                              } font-[400] leading-[125%] font-gilroy-regular text-[14px]`}
                            >
                              {list_item.text}
                            </p>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <button className="w-fit mt-[1.5rem] flex p-2 sm:p-2 px-5 sm:px-5 justify-center items-center box-border text-[#5C27C0] text-[1rem] sm:text-[1.4rem] font-[400] m-0 border-solid border-[#5C27C0] border-[3px] rounded-full gap-[0.5rem]">
        book a demo{" "}
        <span className="text-[144%]">
          <HiOutlineArrowSmallRight />
        </span>
      </button>
    </div>
  );
};

export default PricingPlans;
