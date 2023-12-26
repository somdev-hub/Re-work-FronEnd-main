import React from "react";
import amazon from "./assets/amazon.png";
import google from "./assets/google.png";
import nokia from "./assets/nokia.png";
import spotify from "./assets/spotify.png";
import tcs from "./assets/tcs.png";
import microsoft from "./assets/microsoft.png";
import trust_one from "./assets/trust-one.svg";
import trust_two from "./assets/trust-two.svg";
// import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

const Trusted = () => {
  const width = window.innerWidth;
  return (
    <div className="bg-[#5C27C0] mt-[6rem] py-8 ">
      <p className="text-[#EFE5FF] font-[400] text-[1.125rem] text-center font-poppins">
        Hire for 100+ Brands Including
      </p>
      <div className="mt-8">
        <Swiper
          className="mySwiper"
          modules={[Autoplay]}
          autoplay={{
            delay: 1000
          }}
          loopedSlides={true}
          loop={true}
          centeredSlides={true}
          slidesPerView={width < 500 ? 3 : 5}
          spaceBetween={50}
        >
          <SwiperSlide>
            <img src={amazon} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={google} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={nokia} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={spotify} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={microsoft} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={amazon} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={google} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={nokia} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={spotify} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={microsoft} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={tcs} alt="" />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="mt-[3rem] md:mt-[6rem] xl:mt-[10rem] xl:mx-[7rem]">
        <div className="flex justify-center items-center flex-col md:flex-row gap-[5rem] md:gap-0">
          <div className="px-8 md:border-solid md:border-r-2 border-[#CECECE]">
            <img src={trust_one} alt="" />
            <div className="my-7">
              <p className="text-[#EFE5FF] font-[700] text-[1.5rem] font-poppins text-left">
                Empowering Through
              </p>
              <p className="text-[#EFE5FF] font-[400] text-[1.5rem] font-poppins text-left">
                Artificial Intelligence.
              </p>
            </div>
            <p className="text-left font-[400] text-white">
              Zero overhead in the hiring process - promise! Source top quality
              candidates for some of the best companies and maximize your
              earning.
            </p>
          </div>
          <div className="px-8 border-solid border-r-2 border-[#CECECE]">
            <img src={trust_two} alt="" />
            <div className="my-7">
              <p className="text-[#EFE5FF] font-[700] text-[1.5rem] font-poppins text-left">
                Prioritizing the progress of
              </p>
              <p className="text-[#EFE5FF] font-[400] text-[1.5rem] font-poppins text-left">
                Community.
              </p>
            </div>
            <p className="text-left font-[400] text-white">
              Join us in prioritizing the growth and success of our vibrant
              community. Together, we advance, innovate, and redefine standards,
              shaping a future
            </p>
          </div>
          <div className="px-8 ">
            <img src={trust_one} alt="" />
            <div className="my-7">
              <p className="text-[#EFE5FF] font-[700] text-[1.5rem] font-poppins text-left">
                Empowering Through
              </p>
              <p className="text-[#EFE5FF] font-[400] text-[1.5rem] font-poppins text-left">
                Artificial Intelligence.
              </p>
            </div>
            <p className="text-left font-[400] text-white">
              Zero overhead in the hiring process - promise! Source top quality
              candidates for some of the best companies and maximize your
              earning.
            </p>
          </div>
        </div>
      </div>
      <button className=" rounded-lg border-2 border-[#5C27C0] bg-[#F6F6F6] shadow-xl flex justify-center items-center px-[1.8rem] py-4 mt-[8rem] font-poppins text-[1.125rem] font-[500] text-[#5C27C0] self-center mx-auto">
        Get Started
      </button>
    </div>
  );
};

export default Trusted;
