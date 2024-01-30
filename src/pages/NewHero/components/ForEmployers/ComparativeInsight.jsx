import React from "react";
import tick from "../../assets/tick-secondary.svg";
import cross from "../../assets/cross-secondary.svg";

const ComparativeInsight = () => {
  const data = [
    {
      feature: "Efficiency",
      aiInterview: { title: "Faster and Automated Process", benefit: true },
      physicalInterview: {
        title: "Time-Consuming Scheduling and Coordination",
        benefit: false
      }
    },
    {
      feature: "Accessibility",
      aiInterview: { title: "Anytime, Anywhere Accessibility", benefit: true },
      physicalInterview: {
        title: "Limited to Specific Locations and Times",
        benefit: false
      }
    },
    {
      feature: "Cost-Effectiveness",
      aiInterview: {
        title: "Cost-Efficient, No Travel Expenses",
        benefit: true
      },
      physicalInterview: {
        title: "Travel Costs, Venue Expenses, and Logistics",
        benefit: false
      }
    },
    {
      feature: "Bias Reduction",
      aiInterview: {
        title: "Minimized Bias through Objective Criteria",
        benefit: true
      },
      physicalInterview: {
        title: "Opportunity for Personalized Evaluation",
        benefit: true
      }
    },
    {
      feature: "Global Reach",
      aiInterview: { title: "Reach Candidates Worldwide", benefit: true },
      physicalInterview: {
        title: "Limited to Local or Specific Talent Pools",
        benefit: false
      }
    },
    {
      feature: "Data-Driven Insights",
      aiInterview: {
        title: "Analytical Insights for Decision-Making",
        benefit: true
      },
      physicalInterview: {
        title: "Limited Data Capture and Analysis",
        benefit: false
      }
    }
  ];
  return (
    <div className="mx-6 xl:mx-[7.5rem] my-16 xl:my-[8rem]">
      <h1 className="text-[#5C27C0] text-[2rem] xl:text-[2.625rem] ">
        <div className="font-[600] font-garnett-semi-bold ">
          Rework AI vs. Traditional Interviews:{" "}
        </div>
        <div className="font-[400] font-garnett-regular">
          A Comparative Insight
        </div>
      </h1>
      <p className="text-[#1F1F1F] font-poppins text-regular xl:text-[1.125rem] font-[400] my-7">
        Elevate Your Hiring Experience with Rework AI. Streamline your process,
        minimize bias, and embrace innovation. Discover why AI interviews
        provide unparalleled efficiency, accessibility, and insights, making
        them the smarter choice for the future of recruitment.
      </p>
      <table className="w-full mt-16">
        <thead>
          <tr className="flex">
            <th
              className="py-4 xl:py-7 flex-1 px-3 xl:px-5 bg-[#EFE5FF] text-base xl:text-[1.375rem] font-[500] font-garnett-medium"
              align="left"
            >
              Features
            </th>
            <th
              className="py-4 xl:py-7 flex-1 px-3 xl:px-5 border-r-[1px] border-solid border-[#EFE5FF] bg-[#5C27C0] text-[#F6F6F6] text-base xl:text-[1.375rem] font-[500] font-garnett-medium"
              align="left"
            >
              AI Interview
            </th>
            <th
              className="py-4 xl:py-7 flex-1 px-3 xl:px-5 bg-[#5C27C0] text-[#F6F6F6] text-base xl:text-[1.375rem] font-[500] font-garnett-medium"
              align="left"
            >
              Physical Interview
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className=" flex">
              <td
                className="py-4 xl:py-7 flex-1 px-3 xl:px-5 bg-[#5C27C0] text-[#F6F6F6] text-base xl:text-[1.375rem] font-[500] font-garnett-medium"
                align="left"
              >
                {item.feature}
              </td>
              <td
                className="py-4 xl:py-7 border-r-[1px] border-solid border-[#5C27C0] flex-1 px-3 xl:px-5 bg-[#F6F6F6] text-base xl:text-[1.25rem] font-[400] font-poppins flex items-center justify-start gap-3"
                align="left"
              >
                <img
                  src={item.aiInterview.benefit ? tick : cross}
                  alt=""
                  className="xl:w-auto w-[1.5rem]"
                />
                {item.aiInterview.title}
              </td>
              <td
                className="py-4 xl:py-7 flex-1 px-3 xl:px-5 bg-[#F6F6F6] text-base xl:text-[1.25rem] font-[400] font-poppins flex items-center justify-start gap-3"
                align="left"
              >
                <img
                  src={item.physicalInterview.benefit ? tick : cross}
                  alt=""
                  className="xl:w-auto w-[1.5rem]"
                />
                {item.physicalInterview.title}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComparativeInsight;
