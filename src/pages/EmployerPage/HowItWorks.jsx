import React, { useState } from "react";
import howitworks_main from "../../assets/howitworks-main.jpg";
import howitworks_main2 from "../../assets/howitworks-main2.jpg";
import howitworks_main3 from "../../assets/howitworks-main3.jpg";

const HowItWorks = () => {
  const howitworks_data = [
    {
      heading: "step 1",
      text: "Rework has been a great way to make the hiring process easier and faster.",
      img: howitworks_main
    },
    {
      heading: "step 2",
      text: "Rework has been a great way to make the hiring process easier and faster.",
      img: howitworks_main2
    },
    {
      heading: "step 3",
      text: "Rework has been a great way to make the hiring process easier and faster.",
      img: howitworks_main3
    }
  ];
  const [current, setCurrent] = useState({ index: 0, img: howitworks_main });

  const stepClickHandler = (e, index) => {
    e.preventDefault();
    setCurrent({
      index: index,
      img: howitworks_data[index].img
    });
  };
  return (
    <div className="my-[5rem] sm:mx-0 mx-[1.5rem]">
      <div className="text-center flex gap-4 justify-center">
        <h1 className="text-[2.25rem] sm:text-[4rem] font-actor font-[500] sm:font-gilroy-bold leading-[125%] text-[#202020]">
          How it{" "}
        </h1>

        <h1 className="text-[2.25rem] sm:text-[4rem] font-actor font-[500] sm:font-gilroy-bold leading-[125%] text-[#5C27C0]">
          works
        </h1>
      </div>
      <div className="flex gap-[3rem] mt-8">
        <div className="flex flex-col gap-[1rem] sm:ml-[6.25rem]">
          {howitworks_data.map((item, index) => {
            return (
              <div key={index} className="">
                <div
                  className={`sm:rounded-[1rem] border-box cursor-pointer py-6 px-8 items-start  border-solid border-[1.6px] flex flex-col gap-[0.5rem]  ${
                    current.index === index
                      ? "bg-[#5C27C0]  rounded-t-[1rem] "
                      : "bg-white rounded-[1rem] shadow-2xl "
                  }`}
                  onClick={(e) => stepClickHandler(e, index)}
                >
                  <h4
                    className={`${
                      current.index === index ? "text-white" : "text-[#5C27C0]"
                    }  font-actor text-[1.5rem] sm:text-[2.25rem] font-[400] leading-[125%]`}
                  >
                    {item.heading}
                  </h4>
                  <p
                    className={`${
                      current.index === index ? "text-white" : "text-[#505050]"
                    } font-quicksand font-[500] leading-[120%] text-[14px] sm:text-[1.25rem]`}
                  >
                    {item.text}
                  </p>
                </div>
                {current.index === index && (
                  <img
                    src={current.img}
                    alt=""
                    className="h-[15rem] w-full object-cover flex sm:hidden rounded-b-[1rem] "
                  />
                )}
              </div>
            );
          })}
        </div>
        <div className="mr-[8rem] w-1/2 hidden sm:flex">
          <img
            src={current.img}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
