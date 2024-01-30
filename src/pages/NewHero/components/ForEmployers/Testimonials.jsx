import React from "react";
import testimonial_one from "../../assets/testimonial-one.png";
import testimonial_two from "../../assets/testimonial-two.png";
import testimonial_three from "../../assets/testimonial-three.png";

const Testimonials = () => {
  const testimonials = [
    {
      user: "Theresa Webb",
      designation: "HR Manager, Amazon",
      testimonial:
        "“Rework has been a great way to make the hiring process easier and faster. We've been able to save money and time, and the recruiters have been able to find the best employers leads. Highly recommend! “",
      userProfile: testimonial_one
    },
    {
      user: "Savannah Nguyen",
      designation: "HR Manager, Microsoft",
      testimonial:
        "“Rework has been a great way to make the hiring process easier and faster. We've been able to save money and time, and the recruiters have been able to find the best employers leads. Highly recommend! ““ Rework has been a great way to make the hiring process easier and faster.  Highly recommend! “",
      userProfile: testimonial_two
    },
    {
      user: "Theresa Webb",
      designation: "HR Manager, Amazon",
      testimonial:
        "“Rework has been a great way to make the hiring process easier and faster. We've been able to save money and time, and the recruiters have been able to find the best employers leads. Highly recommend! “",
      userProfile: testimonial_one
    },
    {
      user: "Ronald Richards",
      designation: "HR Manager, Google",
      testimonial:
        "“Rework has been a great way to make the hiring process easier and faster. We've been able to save money and time, and the recruiters have been able to find the best employers leads. Highly recommend! “",
      userProfile: testimonial_three
    },
    {
      user: "Ronald Richards",
      designation: "HR Manager, Google",
      testimonial:
        "“Rework has been a great way to make the hiring process easier and faster. We've been able to save money and time, and the recruiters have been able to find the best employers leads. Highly recommend! “",
      userProfile: testimonial_three
    },
    {
      user: "Ronald Richards",
      designation: "HR Manager, Google",
      testimonial:
        "“Rework has been a great way to make the hiring process easier and faster. We've been able to save money and time, and the recruiters have been able to find the best employers leads. Highly recommend! “",
      userProfile: testimonial_three
    }
  ];
  return (
    <div className="bg-[#F6F6F6] px-6 xl:px-[7.5rem] py-12 xl:py-[5rem]">
      <h1 className=" text-[2rem] xl:text-[2.625rem] text-center">
        <span className="font-[600] font-garnett-semi-bold text-[#5C27C0]">
          Customer{" "}
        </span>
        <span className="font-[400] font-garnett-regular text-[#181818]">
          Testimonials
        </span>
      </h1>
      <p className="text-[#1F1F1F] font-poppins text-regular xl:text-[1.125rem] text-center font-[400] my-7">
        What others has say About Us
      </p>
      <div className="mt-12 xl:mt-[5rem] flex flex-col lg:flex-row lg:gap-6">
        <div className="flex-1">
          {testimonials.map((testimonial, index) => {
            return (
              index % 3 === 0 && (
                <div
                  className="bg-[#EFE5FF] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.15)] p-5 rounded-[1rem] mb-7"
                  key={index}
                >
                  <p className="text-base xl:text-[1.125rem] font-[400] font-poppins">
                    {testimonial.testimonial}
                  </p>
                  <div className="flex gap-4 items-center mt-7">
                    <img
                      src={testimonial.userProfile}
                      alt=""
                      className="w-10 xl:w-12 h-10 xl:h-12 rounded-full"
                    />
                    <div className="">
                      <h3 className="text-[#5C27C0] font-garnett-regular font-[400] text-[1.3rem] xl:text-[1.5rem]">
                        {testimonial.user}
                      </h3>
                      <p className="text-[#6A6A6A] font-poppins font-[500] text-[14px] xl:text-base">
                        {testimonial.designation}
                      </p>
                    </div>
                  </div>
                </div>
              )
            );
          })}
        </div>
        <div className="flex-1">
          {testimonials.map((testimonial, index) => {
            return (
              index % 3 === 1 && (
                <div
                  className="bg-[#EFE5FF] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.15)] p-5 rounded-[1rem] mb-7"
                  key={index}
                >
                  <p className="text-base xl:text-[1.125rem] font-[400] font-poppins">
                    {testimonial.testimonial}
                  </p>
                  <div className="flex gap-4 items-center mt-7">
                    <img
                      src={testimonial.userProfile}
                      alt=""
                      className="w-10 xl:w-12 h-10 xl:h-12 rounded-full"
                    />
                    <div className="">
                      <h3 className="text-[#5C27C0] font-garnett-regular font-[400] text-[1.3rem] xl:text-[1.5rem]">
                        {testimonial.user}
                      </h3>
                      <p className="text-[#6A6A6A] font-poppins font-[500] text-[14px] xl:text-base">
                        {testimonial.designation}
                      </p>
                    </div>
                  </div>
                </div>
              )
            );
          })}
        </div>
        <div className="flex-1">
          {testimonials.map((testimonial, index) => {
            return (
              index % 3 === 2 && (
                <div
                  className="bg-[#EFE5FF] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.15)] p-5 rounded-[1rem] mb-7"
                  key={index}
                >
                  <p className="text-base xl:text-[1.125rem] font-[400] font-poppins">
                    {testimonial.testimonial}
                  </p>
                  <div className="flex gap-4 items-center mt-7">
                    <img
                      src={testimonial.userProfile}
                      alt=""
                      className="w-10 xl:w-12 h-10 xl:h-12 rounded-full"
                    />
                    <div className="">
                      <h3 className="text-[#5C27C0] font-garnett-regular font-[400] text-[1.3rem] xl:text-[1.5rem]">
                        {testimonial.user}
                      </h3>
                      <p className="text-[#6A6A6A] font-poppins font-[500] text-[14px] xl:text-base">
                        {testimonial.designation}
                      </p>
                    </div>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
