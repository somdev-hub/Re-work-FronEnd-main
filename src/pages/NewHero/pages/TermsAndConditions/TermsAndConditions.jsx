import React, { useEffect, useState } from "react";
import { baseUrl } from "../../../../baseUrl";
import parse, { domToReact } from "html-react-parser";
import "../../components/hero.css";

const TermsAndConditions = () => {
  const [termsAndConditions, setTermsAndConditions] = useState("");

  const getTermsandConditions = async () => {
    // setIsLoading(true)
    try {
      const result = await fetch(`${baseUrl}/users/getTermsAndConditions`);
      const jsonData = await result.json();

      if (!result.ok) {
        // setIsLoading(false)
        throw new Error(jsonData.message);
      }
      setTermsAndConditions(jsonData.posts.termsAndConditions);
      //   setIsLoading(false)
    } catch (error) {
      console.log(error);
      //   setIsLoading(false)
    }
  };

  const options = {
    replace: ({ name, children }) => {
      if (name === "p") {
        return (
          <p className="text-[#272727] font-poppins text-[1.125rem] font-[400]">
            {domToReact(children)}
          </p>
        );
      }
      if (name === "strong") {
        return (
          <h3 className="text-[#272727] font-garnett-medium text-[1.5rem] font-[500]">
            {domToReact(children)}
          </h3>
        );
      }
    }
  };

  useEffect(() => {
    getTermsandConditions();
    // console.log(termsAndConditions);
  }, []);
  return (
    <div className="mt-0 xl:mt-6">
      <div className="py-8 md:py-[2.3rem] bg-[#E6D7FE] px-6 xl:px-[7.5rem]">
        <h1 className="text-[#5C27C0] font-garnett-semi-bold text-[1.5rem] md:text-[3.125rem] font-[600] m-0">
          Terms & Conditions
        </h1>
      </div>
      <div className="bg-[#F5F0FF] px-6 xl:px-[7.31rem] py-[4rem]">
        <p>{parse(termsAndConditions, options)}</p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
