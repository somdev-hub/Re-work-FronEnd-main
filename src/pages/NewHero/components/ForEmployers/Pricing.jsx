import React from "react";
import green_tick from "../../assets/tick-green.svg";
import red_cross from "../../assets/cross-red.svg";

const Pricing = () => {
  const price_list = [
    {
      name: "1 Month",
      price: "₹199.00",
      mostPopular: false,
      suitableFor: "Suitable for companies with 5-10 openings",
      features: [
        {
          advantage: true,
          feature: "10 interview-ready candidates"
        },
        {
          advantage: true,
          feature: "Unlimited job postings"
        },
        {
          advantage: true,
          feature: "Receive pre-vetted profiles within 48 hours"
        },
        {
          advantage: false,
          feature: "Dedicated account manager"
        },
        {
          advantage: false,
          feature: "Assistance with interview scheduling"
        },
        {
          advantage: false,
          feature: "Custom reports"
        }
      ]
    },
    {
      name: "3 Month",
      price: "₹149.00",
      mostPopular: true,
      suitableFor: "Suitable for companies with 5-10 openings",
      features: [
        {
          advantage: true,
          feature: "10 interview-ready candidates"
        },
        {
          advantage: true,
          feature: "Unlimited job postings"
        },
        {
          advantage: true,
          feature: "Receive pre-vetted profiles within 48 hours"
        },
        {
          advantage: false,
          feature: "Dedicated account manager"
        },
        {
          advantage: false,
          feature: "Assistance with interview scheduling"
        },
        {
          advantage: false,
          feature: "Custom reports"
        }
      ]
    },
    {
      name: "6 Month",
      price: "₹169.00",
      mostPopular: false,
      suitableFor: "Suitable for companies with 5-10 openings",
      features: [
        {
          advantage: true,
          feature: "10 interview-ready candidates"
        },
        {
          advantage: true,
          feature: "Unlimited job postings"
        },
        {
          advantage: true,
          feature: "Receive pre-vetted profiles within 48 hours"
        },
        {
          advantage: false,
          feature: "Dedicated account manager"
        },
        {
          advantage: false,
          feature: "Assistance with interview scheduling"
        },
        {
          advantage: false,
          feature: "Custom reports"
        }
      ]
    }
  ];
  return (
    <div className="mx-6 xl:mx-[7.5rem] mt-[6.5rem] flex flex-col items-center">
      <h1 className="text-[#5C27C0] text-[2rem] xl:text-[2.625rem] text-center">
        <span className="font-[600] font-garnett-semi-bold ">
          Choose Your Simple,{" "}
        </span>
        <span className="font-[400] font-garnett-regular">
          Transparent Pricing
        </span>
      </h1>
      <p className="text-[#1C1C1C] font-poppins text-[1rem] xl:text-[1.125rem] font-[400] text-center mt-6 xl:mt-8">
        Unlock simplicity and transparency in pricing. Choose the solution that
        suits you best—no hidden fees, just straightforward, cost-effective
        options for your hiring success.
      </p>
      <div className="flex flex-col lg:flex-row gap-12 xl:gap-16 mt-[5rem]">
        {price_list.map((price, index) => (
          <div
            className={`shadow-[0px_20px_40px_0px_rgba(118,118,118,0.35)] rounded-[0.625rem] p-8 ${
              price.mostPopular ? "bg-[#5C27C0]" : "bg-white"
            }`}
          >
            <p
              className={`text-center font-garnett-medium text-[1rem] xl:text-[1.4rem] font-[500] ${
                price.mostPopular ? "text-white" : "text-[#5C27C0]"
              }`}
            >
              {price.name}
            </p>
            <p
              className={` font-garnett-medium text-[2rem] xl:text-[2.5rem] font-[500] mt-4 text-center ${
                price.mostPopular ? "text-white" : "text-[#1F1F1F]"
              }`}
            >
              {price.price}
              <span className="text-[1rem] font-garnett-medium">/month</span>
            </p>
            <p
              className={` text-center text-[1rem] xl:text-[1.125rem] font-[500] mt-6 xl:mt-10 ${
                price.mostPopular ? "text-white" : "text-[#5C27C0]"
              }`}
            >
              {price.suitableFor}
            </p>
            <ul>
              {price.features.map((feature, index) => (
                <li className="flex items-start mt-4 gap-2" key={index}>
                  <img
                    src={feature.advantage ? green_tick : red_cross}
                    alt=""
                  />
                  <p
                    className={`font-poppins font-[400] ${
                      price.mostPopular ? "text-white" : "text-[#5B5B5B]"
                    } text-[14px] xl:text-[1rem]`}
                  >
                    {feature.feature}
                  </p>
                </li>
              ))}
            </ul>
            <button
              className={`${
                price.mostPopular
                  ? "bg-white text-[#5C27C0]"
                  : "bg-[#5C27C0] text-white"
              } shadow-[0px_20px_40px_0px_rgba(92,39,192,0.35)] rounded-[0.625rem] py-4 px-7 mt-12 text-center font-poppins font-[500] text-[1rem] xl:text-[1.125rem] w-full`}
            >
              Get Started
            </button>
          </div>
        ))}
      </div>
      <button className="shadow-[0px_8px_40px_0px_rgba(0,0,0,0.22)] bg-transparent border-[2px] border-solid border-[#5C27C0] rounded-[0.625rem] py-4 px-7 text-center font-poppins font-[500] text-[1.125rem] mt-[5rem]">
        Book a Demo
      </button>
    </div>
  );
};

export default Pricing;
