import React from "react";
import success_story_one from "../../assets/success-story-one.png";
import success_story_two from "../../assets/success-story-two.png";
import success_story_three from "../../assets/success-story-three.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination } from "swiper/modules";

const SuccessStories = () => {
  const success_stories = [
    {
      img: success_story_one,
      heading:
        "Rework has been a great way to make the hiring process easier and faster.",
      text: "“We've been able to save money and time, and the recruiters have been able to find the best employers leads. Highly recommend! “"
    },
    {
      img: success_story_two,
      heading:
        "Rework has been a great way to make the hiring process easier and faster.",
      text: "“We've been able to save money and time, and the recruiters have been able to find the best employers leads. Highly recommend! “"
    },
    {
      img: success_story_three,
      heading:
        "Rework has been a great way to make the hiring process easier and faster.",
      text: "“We've been able to save money and time, and the recruiters have been able to find the best employers leads. Highly recommend! “"
    },
    {
      img: success_story_one,
      heading:
        "Rework has been a great way to make the hiring process easier and faster.",
      text: "“We've been able to save money and time, and the recruiters have been able to find the best employers leads. Highly recommend! “"
    },
    {
      img: success_story_two,
      heading:
        "Rework has been a great way to make the hiring process easier and faster.",
      text: "“We've been able to save money and time, and the recruiters have been able to find the best employers leads. Highly recommend! “"
    },
    {
      img: success_story_three,
      heading:
        "Rework has been a great way to make the hiring process easier and faster.",
      text: "“We've been able to save money and time, and the recruiters have been able to find the best employers leads. Highly recommend! “"
    }
  ];
  return (
    <div className="bg-[#F6F6F6] px-6 xl:px-[7.5rem] py-12 xl:py-[5rem] flex flex-col items-center">
      <h1 className="text-[#5C27C0] text-[2rem] xl:text-[2.625rem] text-center">
        <span className="font-[600] font-garnett-semi-bold ">Success </span>
        <span className="font-[400] font-garnett-regular">Stories</span>
      </h1>
      <p className="text-[#1C1C1C] font-poppins text-[1rem] xl:text-[1.125rem] font-[400] text-center mt-6 xl:mt-8">
        Dive into our success stories blog—real insights, real triumphs. Learn
        and elevate your hiring strategies from those who've paved the way.
      </p>
      <div className="w-full mt-[5rem]">
        <Swiper
          spaceBetween={50}
          slidesPerView={window.innerWidth > 768 ? 3 : 1}
          pagination={{
            clickable: true
            // renderBullet: function (index, className) {
            //   return (
            //     '<span class="' + className + '">' + (index + 1) + "</span>"
            //   );
            // }
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {success_stories.map((story, index) => (
            <SwiperSlide key={index}>
              <div className=" rounded-[1rem] bg-white shadow-[0px_2px_20px_0px_rgba(0,0,0,0.13)] my-4 mb-12">
                <img
                  src={story.img}
                  alt=""
                  className="rounded-t-[1rem] w-full object-cover"
                />
                <div className="p-5">
                  <p className="text-[#202020] font-garnett-medium text-[1.25rem]  font-[500] ">
                    {story.heading}
                  </p>
                  <p className="text-[#6A6A6A] font-poppins text-[1rem] xl:text-[1.125rem] font-[400]  mt-6 xl:mt-8">
                    {story.text}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SuccessStories;
