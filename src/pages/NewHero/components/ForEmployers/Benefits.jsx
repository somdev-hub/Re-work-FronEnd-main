import React from "react";
import benefit_one from "../../assets/for-employers-benefits-one.svg";
import benefit_two from "../../assets/for-employers-benefits-two.svg";
import benefit_three from "../../assets/for-employers-benefits-three.svg";
import benefit_four from "../../assets/for-employers-benefits-four.svg";
import benefit_five from "../../assets/for-employers-benefits-five.svg";
import benefit_six from "../../assets/for-employers-benefits-six.svg";

const Benefits = () => {
  const benefits = [
    {
      img: benefit_one,
      heading: "60%",
      subHeading: "Cost Reduce",
      text: "Zero overhead in the hiring process - promise! Source top quality candidates for some of the best companies"
    },
    {
      img: benefit_two,
      heading: "50% Faster",
      subHeading: "Recruitment by TAT",
      text: "Zero overhead in the hiring process - promise! Source top quality candidates for some of the best companies"
    },
    {
      img: benefit_three,
      heading: "Highly Contextualized",
      subHeading: "Interview",
      text: "Al models generate highly contextualized interviews for the candidates based on your Company profile, Job description and Candidate's CV."
    },
    {
      img: benefit_four,
      heading: "Automated",
      subHeading: "Scheduling",
      text: "Email & WhatsApp based communication for interview scheduling with automated reminders."
    },
    {
      img: benefit_five,
      heading: "AI generated Interviews",
      subHeading: "On what matters",
      text: "0 manual interventions, completely seamless experience for the candidates."
    },
    {
      img: benefit_six,
      heading: "in-built",
      subHeading: "ATS",
      text: "To manage all of your candidates & Credo verified CVs. Integrations with other ATS coming soon."
    }
  ];
  return (
    <div className="mt-[6rem] mx-[1.5rem] xl:mx-[7.5rem]">
      <h1 className="text-[#5C27C0] text-[2rem] xl:text-[2.625rem] text-center">
        <span className="font-[600] font-garnett-semi-bold ">
          Our Amazing Benefits{" "}
        </span>
        <span className="font-[400] font-garnett-regular">
          Helpful For Your Hiring
        </span>
      </h1>

      <div className="mt-[5rem] grid grid-rows-1 md:grid-rows-2 grid-cols-1 md:grid-cols-3 gap-[3rem] md:gap-[5rem]">
        {benefits.map((benefit, index) => (
          <div className="" key={index}>
            <img src={benefit.img} alt="" />
            <div className="my-4">
              <h3 className="font-[600] md:text-[1.3rem] xl:text-[1.5rem] font-garnett-semi-bold">
                {benefit.heading}
              </h3>
              <p className="text-[1.3rem] xl:text-[1.5rem] font-[400] font-garnett-regular">
                {benefit.subHeading}
              </p>
            </div>
            <p className="text-[#1D1D1D] font-poppins font-[400] md:text-[14px] xl:text-[1rem]">
              {benefit.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Benefits;
