import React, { useEffect, useState } from "react";
import Amazon from "../../assets/AmazonBgColor.png";
import AmazonBgWhite from "../../assets/amazon.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import "swiper/css/pagination";
import "swiper/css";
const Testimonials = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    // Check if the window width is less than or equal to 475px (adjust this breakpoint as needed)
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 739);
    };
    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize); // Listen to window resize events
    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="pb-8 px-6 md:py-10 md:px-14 lg:px-20 xl:px-24 ">
      <div className="flex justify-center items-center xs:py-[40px] sm:py-[40px]">
        {/* fixed bug : remove old text and added new text as praises for work added py text size, font, line height, and color in line  8 to 12 */}
        <h2 className="text-center text-lg xs:text-[36px] sm:text-[44px] lg:text-[54px] xl:text-[64px] 2xl:[84px]  font-semibold mb-3 text-[#202020] leading-[120%]">
          praises for <span className="text-[#5C27C0]">rework</span>
        </h2>
        {/* removed the div and para content */}
      </div>
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        autoplay
        pagination={{ clickable: true }}
        style={{
          "--swiper-pagination-color": "#5C27C0",
          "--swiper-pagination-bullet-inactive-color": "#D9D9D9",
          "--swiper-pagination-bullet-inactive-opacity": "1",
          "--swiper-pagination-bullet-horizontal-gap": "4px"
        }}
      >
        <SwiperSlide>
          <div className="flex justify-center pb-8 ">
            <div className="border p-5 rounded-[21px] xs:shadow-[0_2px_2px_0_rgba(92,39,192,0.32)] sm:shadow-[0_3px_9px_0_rgba(92,39,192,0.32)] 2xl:shadow-[0_4px_12px_0_rgba(92,39,192,0.32)] max-w-6xl xs:py-[48px] xs:px-[35px] sm:pt-[84px] 2xl:pt-[112px] sm:pb-[60px] 2xl:pb-[80px] sm:pl-[125px] 2xl:pl-[170px] sm:pr-[115px] 2xl:pr-[150px]  xs:bg-[#5C27C0]">
              {/* removed div */}
              {/* <div className="flex items-center gap-5 mb-4 xs:bg-[#5C27C0]"></div> */}

              <p className="font-quicksand xs:text-[16px] sm:text-[24px] 2xl:text-[32px] xs:font-[300] font-medium leading-tight xs:mb-[54px] sm:mb-[52px]  xs:max-w-[305px] sm:max-w-[405px] md:max-w-[610px] 2xl:max-w-[810px] xs:text-white text-[#505050] text-center">
                “ Rework has been a great way to make the hiring process easier
                and faster. We've been able to save money and time, and the
                recruiters have been able to find the best employers leads.
                Highly recommend! “
              </p>
              <div className="flex flex-col items-center">
                <img
                  src={isMobile ? AmazonBgWhite : Amazon}
                  alt="Amazon-logo"
                  className="xs:pb-[6px] sm:pb-[10px] object-contain"
                />
                <p className="font-gilroy-semi-bold sm:text-[24px] 2xl:text-[32px] xs:text-white md:text-[#202020] leading-[120%] ">
                  Rohit Shrivastav
                </p>
                <p className="font-gilroy-medium sm:text-[24px] 2xl:text-[32px] xs:text-white md:text-[#202020] leading-[120%]">
                  HR, Google
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex justify-center pb-8 ">
            <div className="border p-5 rounded-[21px] xs:shadow-[0_2px_8px_0_rgba(92,39,192,0.32)] sm:shadow-[0_3px_9px_0_rgba(92,39,192,0.32)] 2xl:shadow-[0_4px_12px_0_rgba(92,39,192,0.32)] max-w-6xl xs:py-[48px] xs:px-[35px] sm:pt-[84px] 2xl:pt-[112px] sm:pb-[60px] 2xl:pb-[80px] sm:pl-[125px] 2xl:pl-[170px] sm:pr-[115px] 2xl:pr-[150px]  xs:bg-[#5C27C0]">
              {/* removed div */}
              {/* <div className="flex items-center gap-5 mb-4 xs:bg-[#5C27C0]"></div> */}

              <p className="font-quicksand xs:text-[16px] sm:text-[24px] 2xl:text-[32px] xs:font-[300] font-medium leading-tight xs:mb-[54px] sm:mb-[52px]  xs:max-w-[305px] sm:max-w-[405px] md:max-w-[610px] 2xl:max-w-[810px] xs:text-white text-[#505050] text-center">
                “ Rework has been a great way to make the hiring process easier
                and faster. We've been able to save money and time, and the
                recruiters have been able to find the best employers leads.
                Highly recommend! “
              </p>
              <div className="flex flex-col items-center">
                <img
                  src={isMobile ? AmazonBgWhite : Amazon}
                  alt="Amazon-logo"
                  className="xs:pb-[6px] sm:pb-[10px] object-contain"
                />
                <p className="font-gilroy-semi-bold sm:text-[24px] 2xl:text-[32px] xs:text-white md:text-[#202020] leading-[120%] ">
                  Rohit Shrivastav
                </p>
                <p className="font-gilroy-medium sm:text-[24px] 2xl:text-[32px] xs:text-white md:text-[#202020] leading-[120%]">
                  HR, Google
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex justify-center pb-8 ">
            <div className="border p-5 rounded-[21px] xs:shadow-[0_2px_8px_0_rgba(92,39,192,0.32)] sm:shadow-[0_3px_9px_0_rgba(92,39,192,0.32)] 2xl:shadow-[0_4px_12px_0_rgba(92,39,192,0.32)] max-w-6xl xs:py-[48px] xs:px-[35px] sm:pt-[84px] 2xl:pt-[112px] sm:pb-[60px] 2xl:pb-[80px] sm:pl-[125px] 2xl:pl-[170px] sm:pr-[115px] 2xl:pr-[150px]  xs:bg-[#5C27C0]">
              {/* removed div */}
              {/* <div className="flex items-center gap-5 mb-4 xs:bg-[#5C27C0]"></div> */}

              <p className="font-quicksand xs:text-[16px] sm:text-[24px] 2xl:text-[32px] xs:font-[300] font-medium leading-tight xs:mb-[54px] sm:mb-[52px]  xs:max-w-[305px] sm:max-w-[405px] md:max-w-[610px] 2xl:max-w-[810px] xs:text-white text-[#505050] text-center">
                “ Rework has been a great way to make the hiring process easier
                and faster. We've been able to save money and time, and the
                recruiters have been able to find the best employers leads.
                Highly recommend! “
              </p>
              <div className="flex flex-col items-center">
                <img
                  src={isMobile ? AmazonBgWhite : Amazon}
                  alt="Amazon-logo"
                  className="xs:pb-[6px] sm:pb-[10px] object-contain"
                />
                <p className="font-gilroy-semi-bold sm:text-[24px] 2xl:text-[32px] xs:text-white md:text-[#202020] leading-[120%] ">
                  Rohit Shrivastav
                </p>
                <p className="font-gilroy-medium sm:text-[24px] 2xl:text-[32px] xs:text-white md:text-[#202020] leading-[120%]">
                  HR, Google
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      {/* <div className="flex w-full flex-wrap justify-center text-xs font-semibold text-white pb-8 pt-4">
        <button className="rounded-[7.28px]  border-[3px] border-[#2068FF] mt-4 w-[174px] h-12  block mx-auto md:mx-0">
          <span className="block rounded-[7.28px] text-[#2068FF] text-lg font-medium">
            View More
          </span>
        </button>
      </div> */}
    </div>
  );
};

export default Testimonials;
