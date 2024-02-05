import React from "react";
import amazon from "../../assets/amazon-grey.png";
import google from "../../assets/google-grey.svg";
import nokia from "../../assets/nokia-grey.png";
import spotify from "../../assets/spotify-grey.png";
// import tcs from "../../assets/tcs.png";
import microsoft from "../../assets/microsoft-grey.svg";
import trust_one from "../../assets/trust-one.svg";
import trust_two from "../../assets/trust-two.svg";
// import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

const Brands = () => {
  const width = window.innerWidth;
  return (
    <div className="bg-[#F6F6F6] py-12 mt-[8rem]">
      <p className="text-[#AD93DF] font-poppins text-[1.25rem] text-center font-[500]">
        Hire for 1000+ Brands Including
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
            <img src={amazon} alt="" className="opacity-[50%]" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={google} alt="" className="opacity-[50%]" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={nokia} alt="" className="opacity-[50%]" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={nokia} alt="" className="opacity-[50%]" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={spotify} alt="" className="opacity-[50%]" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={microsoft} alt="" className="opacity-[50%]" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={amazon} alt="" className="opacity-[50%]" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={google} alt="" className="opacity-[50%]" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={nokia} alt="" className="opacity-[50%]" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={spotify} alt="" className="opacity-[50%]" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={microsoft} alt="" className="opacity-[50%]" />
          </SwiperSlide>
          {/* <SwiperSlide>
            <img src={tcs} alt="" />
          </SwiperSlide> */}
        </Swiper>
      </div>
    </div>
  );
};

export default Brands;
