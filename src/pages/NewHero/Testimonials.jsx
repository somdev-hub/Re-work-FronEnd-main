import React, { useEffect, useRef, useState } from "react";
// import axios from "axios";

const Testimonials = () => {
  const data = [
    {
      id: 1,
      text: "“ Rework has been a great way to make the hiring process easier and faster. We've been able to save money and time, and the recruiters have been able to find the best employers leads. Highly recommend! ““ $Rework has been a great way to make the hiring process easier and faster$.  Highly recommend! “",
      name: "Theresa Webb",
      designation: "HR Manager, Google"
    },
    {
      id: 2,
      text: "“ Rework has been a great way to make the hiring process easier and faster. We've been able to save money and time, and the recruiters have been able to find the best employers leads. Highly recommend! ““ $Rework has been a great way to make the hiring process easier and faster$. Highly recommend! “",
      name: "Theresa Webb",
      designation: "HR Manager, Google"
    },
    {
      id: 3,
      text: "“ Rework has been a great way to make the hiring process easier and faster. We've been able to save money and time, and the recruiters have been able to find the best employers leads. Highly recommend! “",
      name: "Theresa Webb",
      designation: "HR Manager, Google"
    },
    {
      id: 4,
      text: "“ Rework has been a great way to make the hiring process easier and faster. We've been able to save money and time, and the recruiters have been able to find the best employers leads. Highly recommend! ““ Rework has been a great way to make the hiring process $ easier and faster.  Highly recommend! $“",
      name: "Theresa Webb",
      designation: "HR Manager, Google"
    },
    {
      id: 5,
      text: "“$ Rework has been a great way to make the hiring process easier and faster.$ We've been able to save money and time, and the recruiters have been able to find the best employers leads. Highly recommend! “",
      name: "Theresa Webb",
      designation: "HR Manager, Google"
    },
    {
      id: 6,
      text: "“ Rework has been a great way to make the hiring process easier and faster. We've been able to save money and time, and the recruiters have been able to find the best employers leads. Highly recommend! ““ $Rework has been a great way to make the hiring process easier and faster$.  Highly recommend! “",
      name: "Theresa Webb",
      designation: "HR Manager, Google"
    }
  ];
  const [testimonials, setTestimonials] = useState([]);
  const scrollDiv = useRef(null);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("/data/newhero//testimonials.json");
      const response = await data.json();
      setTestimonials(response);
    };
    fetchData();
  }, []);
  // console.log(testimonials);
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollDiv.current) {
        scrollDiv.current.scrollTop += 5;
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="mt-[4rem] bg-[#FDFDFD]">
      <h2 className="text-[2.6rem] font-poppins font-[600] heading text-center">
        Look what others has to say about us
      </h2>
      <p className="text-[#434343] text-[1.125rem] font-[400] font-poppins text-center">
        Look what others has to say about us
      </p>
      <div className="mx-6 xl:mx-[8rem] mt-[5rem]  relative ">
        <div className="absolute w-full top-[-5rem] bg-[#FDFDFD] h-[6rem] md:h-[12rem] blur-[27px]"></div>
        <div
          className="flex md:flex-row flex-col gap-7 overflow-scroll scrollbar-hide h-[100vh] xl:h-[120vh] 3xl:h-[90vh] py-[5rem] scroll-smooth justify-center"
          ref={scrollDiv}
        >
          <div className="flex  gap-7 flex-col">
            {Array.from({ length: 20 }).map((_, index) => {
              const item = testimonials[index % testimonials.length];
              return (
                index % 3 === 0 && (
                  <div
                    key={index}
                    className="rounded-xl bg-[#FAFAFA] shadow-lg py-[1.56rem] px-[2.3rem] self-start items-start gap-[2.3rem] flex flex-col md:w-[25rem]"
                  >
                    <p className="font-[400] font-poppins text-[1.125rem] ">
                      {item?.text
                        .split("$")
                        .map((part, index) =>
                          index % 2 === 0 ? (
                            part
                          ) : (
                            <span className="bg-[#F0EB6D]">{part}</span>
                          )
                        )}
                    </p>
                    <div>
                      <h3 className="text-[#5C27C0] font-gilroy-medium text-[1.5rem] leading-[2rem]">
                        {item?.name}
                      </h3>
                      <p className="text-[#6A6A6A] text-[1rem] font-[500] font-poppins">
                        {item?.designation}
                      </p>
                    </div>
                  </div>
                )
              );
            })}
          </div>
          <div className="flex   gap-7 flex-col">
            {Array.from({ length: 20 }).map((_, index) => {
              const item = testimonials[index % testimonials.length];
              return (
                index % 2 === 0 && (
                  <div
                    key={index}
                    className="rounded-xl bg-[#FAFAFA] shadow-lg py-[1.56rem] px-[2.3rem] self-start items-start gap-[2.3rem] flex flex-col md:w-[25rem]"
                  >
                    <p className="font-[400] font-poppins text-[1.125rem] ">
                      {item?.text
                        .split("$")
                        .map((part, index) =>
                          index % 2 === 0 ? (
                            part
                          ) : (
                            <span className="bg-[#FE947D]">{part}</span>
                          )
                        )}
                    </p>
                    <div>
                      <h3 className="text-[#5C27C0] font-gilroy-medium text-[1.5rem] leading-[2rem]">
                        {item?.name}
                      </h3>
                      <p className="text-[#6A6A6A] text-[1rem] font-[500] font-poppins">
                        {item?.designation}
                      </p>
                    </div>
                  </div>
                )
              );
            })}
          </div>
          <div className="flex gap-7 flex-col">
            {Array.from({ length: 20 }).map((_, index) => {
              const item = testimonials[index % testimonials.length];
              return (
                (index + 1) % 3 === 0 && (
                  <div className="rounded-xl bg-[#FAFAFA] shadow-lg py-[1.56rem] px-[2.3rem] self-start items-start gap-[2.3rem] flex flex-col md:w-[25rem]">
                    <p className="font-[400] font-poppins text-[1.125rem] ">
                      {item?.text
                        .split("$")
                        .map((part, index) =>
                          index % 2 === 0 ? (
                            part
                          ) : (
                            <span className="bg-[#6DD8F0]">{part}</span>
                          )
                        )}
                    </p>
                    <div>
                      <h3 className="text-[#5C27C0] font-gilroy-medium text-[1.5rem] leading-[2rem]">
                        {item?.name}
                      </h3>
                      <p className="text-[#6A6A6A] text-[1rem] font-[500] font-poppins">
                        {item?.designation}
                      </p>
                    </div>
                  </div>
                )
              );
            })}
          </div>
        </div>
        <div className="absolute w-full bottom-[-5rem] bg-[#FDFDFD] h-[6rem] md:h-[12rem] blur-[27px]"></div>
      </div>
    </div>
  );
};

export default Testimonials;
