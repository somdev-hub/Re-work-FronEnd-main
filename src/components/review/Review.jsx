import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay} from 'swiper/modules';
import "swiper/css";

import Nokia from "../../assets/Nokia.png";
import Google from "../../assets/Google.png";
import Amazon from "../../assets/amazon.png";
import IBM from "../../assets/IBM.png";
import Yamaha from "../../assets/Yamaha.png";

// Import Swiper styles after importing Swiper components

// Install Swiper modules
const Review = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    // Check if the window width is less than or equal to 475px (adjust this breakpoint as needed)
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 639);
    };
    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize); // Listen to window resize events
    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="w-full bg-[#5C27C0] 2xl:mx-auto xs:py-3  sm:py-7 2xl:py-10 xs:px-2 2xl:px-[415px] 3xl:px-[317px]">
      <p className="text-white opacity-80 font-gilroy-medium font-normal xs:pb-3 sm:pb-[10px] lg:pb-[16px] sm:text-base lg:text-2xl text-center">
        Trusted by 1000+ brands including
      </p>
      {isMobile ? (
        <div className="flex w-screen h-[40px] items-center justify-center px-3">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={14}
            slidesPerView={3}
            autoplay
            pagination={false}
          >
            <SwiperSlide>
              <img
                src={Nokia}
                alt="Nokia"
                className="h-[40px] w-[120px] object-contain"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={Google}
                alt="Google"
                className="h-[40px] w-[120px] object-contain"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={Amazon}
                alt="Amazon"
                className="h-[40px] w-[130px] object-contain"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={IBM}
                alt="IBM"
                className="h-[40px] w-[98px] object-contain"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={Yamaha}
                alt="Yamaha"
                className="h-[40px] w-[120px] object-contain"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      ) : (
        <div className="flex justify-center sm:gap-[12px] lg:gap-10 3xl:gap-8">
          <img
            src={Nokia}
            alt="Nokia"
            className="w-auto sm:w-[107px] md:w-[137px] h-auto object-contain"
          />
          <img
            src={Google}
            alt="Google"
            className="w-auto sm:w-[100px] md:w-[130px] h-auto object-contain"
          />
          <img
            src={Amazon}
            alt="Amazon"
            className="w-auto sm:w-[80px] md:w-[112px] h-auto object-contain"
          />
          <img
            src={IBM}
            alt="IBM"
            className="w-auto sm:w-[50px] md:w-[80px] h-auto object-contain"
          />
          <img
            src={Yamaha}
            alt="Yamaha"
            className="w-auto sm:w-[123px] md:w-[183px] h-auto object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default Review;
