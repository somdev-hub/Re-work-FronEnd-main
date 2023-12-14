import React from "react";
import benefits1 from "../../assets/benefits1.png";
import benefits2 from "../../assets/benefits2.png";
import benefits3 from "../../assets/benefits3.png";

const Benefits = () => {
  const benefits_data = [
    {
      img: benefits1,
      heading: "80% Faster Hiring",
      text: "Reduce your recruitment TAT by 80% with the access to a wider talent pool on the platform"
    },
    {
      img: benefits2,
      heading: "50% Savings",
      text: "Streamline your budgeting and save money while finding the top candidates"
    },
    {
      img: benefits3,
      heading: "Higher shortlist ratio",
      text: "Leverage the expertise of our network of over 10K certified sourcing partners"
    }
  ];
  return (
    <div className="my-10 sm:my-[5rem] mx-6 sm:mx-[6.5rem]">
      <div className="sm:items-start items-center flex gap-4 justify-center">
        <h1 className="text-center sm:text-left text-[2rem] sm:text-[4rem] font-actor font-[500] sm:font-gilroy-bold leading-[125%] text-[#202020]">
          benefits
        </h1>
      </div>
      <div className="flex flex-col sm:flex-row gap-4  mt-10">
        {benefits_data.map((item, index) => {
          return (
            <div
              className="py-[3rem] px-[2rem] flex flex-col gap-6 bg-[#5C27C0] items-center rounded-[1rem] "
              key={index}
            >
              <img src={item.img} alt="" />
              <h4 className="text-[1.75rem] sm:text-[2rem] font-[400] font-actor text-white">
                {item.heading}
              </h4>
              <p className="text-white font-quicksand text-[1rem] sm:text-[1.25rem] font-[400] leading-[120%] text-center">
                {item.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Benefits;
