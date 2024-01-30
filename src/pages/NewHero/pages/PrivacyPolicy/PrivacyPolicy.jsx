import React, { useEffect, useState } from "react";
import { baseUrl } from "../../../../baseUrl";
import parse, { domToReact } from "html-react-parser";
import "../../components/hero.css";

const PrivacyPolicy = () => {
  const [policy, setPolicy] = useState("");
  const [updatedAt, setUpdatedAt] = useState();

  const getPrivacyPolicy = async () => {
    //   setIsLoading(true)
    try {
      const result = await fetch(`${baseUrl}/users/getPrivacyPolicy`);
      const jsonData = await result.json();

      if (!result.ok) {
        //   setIsLoading(false)
        throw new Error(jsonData.message);
      }
      // console.log(jsonData);
      setPolicy(jsonData.posts.privacyPolicy);
      // setIsLoading(false)
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      const date = new Date(jsonData.posts.updatedAt);
      const adjDate = ` ${months[date.getMonth()]} ${
        date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
      }, ${date.getFullYear()}`;
      // console.log(adjDate);
      setUpdatedAt(adjDate);
    } catch (error) {
      console.log(error);
      // setIsLoading(false)
    }
  };

  useEffect(() => {
    getPrivacyPolicy();
  }, []);

  const options = {
    replace: ({ name, children }) => {
      if (name === "p") {
        return (
          <p className="text-[#272727] font-poppins text-[1.125rem] font-[400]">
            {domToReact(children)}
          </p>
        );
      }
    }
  };

  useEffect(() => {
    getPrivacyPolicy();
    // console.log(termsAndConditions);
  }, []);
  return (
    <div className="mt-0 xl:mt-6">
      <div className="py-8 md:py-[2.3rem] bg-[#E6D7FE] px-6 xl:px-[7.5rem]">
        <h1 className="text-[#5C27C0] font-garnett-semi-bold text-[1.5rem] md:text-[3.125rem] font-[600] m-0">
          Privacy Policy
        </h1>
      </div>
      <div className="bg-[#F5F0FF] xl:px-[7.31rem] px-[1.5rem] py-[4rem]">
        <p className="text-[#272727] font-garnett-medium-italic text-base md:text-[1.125rem] font-[600] italic mb-10">
          Last updated: {updatedAt}
        </p>
        <p>{parse(policy, options)}</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
