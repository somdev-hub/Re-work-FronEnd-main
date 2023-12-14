import React, { useEffect } from "react";
// import core_values_one from "../../assets/core-values-one.png";
// import core_values_two from "../../assets/core-values-two.png";
// import core_values_three from "../../assets/core-values-three.png";

const CoreValues = () => {
  const [coreValues, setCoreValues] = React.useState([]);
  // const core_values_data = [
  //   {
  //     title: "Ensure-impactful innovations",
  //     description:
  //       "An unwavering commitment to drive maximum customer satisfaction, infused with integrity and passion.",
  //     image: core_values_one
  //   },
  //   {
  //     title: "Focus on self-development",
  //     description:
  //       "Training and mentorship programs, interactive sessions and community meetups to drive personal growth.",
  //     image: core_values_two
  //   },
  //   {
  //     title: "Integrate work-life balance",
  //     description:
  //       "Latest infrastructure and flexible working hours along with many other privileges that inculcate healthy lifestyle choices.",
  //     image: core_values_three
  //   }
  // ];
  useEffect(() => {
    fetch("data/team_core_values.json")
      .then((response) => response.json())
      .then((json) => setCoreValues(json));
  }, []);
  return (
    <div className="my-10 sm:my-[5rem]">
      <h1 className="text-center text-[2.25rem] sm:text-[4rem] font-[500] font-gilroy-bold leading-[125%] text-[#505050]">
        our core{" "}
        <span className="text-[#5C27C0] inline font-gilroy-bold">values</span>{" "}
      </h1>
      <p className="text-[#707070] font-poppins text-[1rem] sm:text-[1.4rem] font-[400] mt-4 sm:mt-[4rem] text-center">
        We’re enthusiastic learners and seasoned inventors. Together, we can{" "}
        <br /> create solutions that serve not just technology but the humans
        behind it.
      </p>

      <div className="flex-wrap flex flex-col sm:flex-row gap-[3rem] mt-8 sm:mt-[5.5rem] justify-center">
        {coreValues.map((item, index) => {
          return (
            <div
              key={index}
              className="w-full sm:w-[22rem] h-[20rem] sm:h-[22rem] px-8 py-10 flex flex-col items-center box-border justify-center rounded-[0.6rem] shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
            >
              <img src={item.image} alt="" />
              <div className="flex flex-col justify-center text-center">
                <h4 className="leading-normal mt-3 font-[400] text-[1.5rem] sm:text-[1.7rem] font-gilroy-medium">
                  {item.title}
                </h4>
                <p className="mt-3 text-[#505050] font-quicksand text-[1rem] sm:text-[1.2rem] font-[400] leading-[120%]">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CoreValues;
