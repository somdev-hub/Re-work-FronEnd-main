import React from "react";
import why_rework1 from "../../assets/why-rework1.svg";
import why_rework2 from "../../assets/why-rework2.svg";
import why_rework3 from "../../assets/why-rework3.svg";
import check_circle from "../../assets/check-circle.svg";

const WhyRework = () => {
  const whyrework_data = [
    {
      img: why_rework1,
      heading: "Reduce Recruitment TAT by 50%",
      list: [
        "Profiles double-vetted and matched by SuperHire",
        "Only candidates who agreed to interview with you",
        "Pipeline starts building within 24 hours"
      ]
    },
    {
      img: why_rework2,
      heading: "Reduce Cost to Hire by 60%",
      list: [
        "No need for expensive database subscriptions",
        "No expensive agency or any other closure fees",
        "No job posting fee"
      ]
    },
    {
      img: why_rework3,
      heading: "Spend time on what matters",
      list: [
        "Save time spent on sourcing & screening",
        "Use bandwidth to enhance interview experience",
        "Focus only on relevant candidates"
      ]
    }
  ];
  return (
    <div className="my-[2.5rem] sm:mt-[5rem] mx-[1.5rem] sm:mx-[6.5rem] sm:mb-[5rem]">
      <div className="text-center flex gap-4 justify-center">
        <h1 className="text-[2.25rem] sm:text-[4rem] font-actor font-[500] sm:font-gilroy-bold leading-[125%] text-[#202020]">
          why{" "}
        </h1>

        <h1 className="text-[2.25rem] sm:text-[4rem] font-actor font-[500] sm:font-gilroy-bold leading-[125%] text-[#5C27C0]">
          rework
        </h1>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 mt-10">
        {whyrework_data.map((data, index) => {
          return (
            <div
              className="flex flex-col gap-[1.5rem] items-center justify-center px-0 sm:px-8"
              key={index}
            >
              <img src={data.img} alt="" className="w-[4rem] h-[4rem]" />
              <h4 className="text-center text-[1.75rem] sm:text-[2rem] font-actor font-[500] text-[#202020]">
                {data.heading}
              </h4>
              <ul>
                {data.list.map((list, index) => {
                  return (
                    <li
                      key={index}
                      className="text-[1.25rem] font-[400] leading-[125%] text-[#505050] font-gilroy-regular list-none flex gap-4 mb-[0.75rem]"
                    >
                      <img src={check_circle} alt="" />
                      {list}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WhyRework;
