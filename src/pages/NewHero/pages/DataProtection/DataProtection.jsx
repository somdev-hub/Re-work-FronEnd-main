import React, { useEffect, useState } from "react";
import { baseUrl } from "../../../../baseUrl";
import parse, { domToReact } from "html-react-parser";
import "../../components/hero.css";

const DataProtection = () => {
  const [dataProtection, setDataProtection] = useState("");
  const [updatedAt, setUpdatedAt] = useState();
  // const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    const toTop = () => {
      window.scrollTo(0, 0);
    };

    return () => {
      toTop();
    };
  }, []);

  const getDataProtection = async () => {
    //   setIsLoading(true)
    try {
      const result = await fetch(`${baseUrl}/users/getDataProtection`);
      const jsonData = await result.json();

      if (!result.ok) {
        //   setIsLoading(false)
        throw new Error(jsonData.message);
      }
      // console.log(jsonData);
      setDataProtection(jsonData.posts.dataProtection);
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

  const options = {
    replace: ({ name, children }) => {
      if (name === "p") {
        return (
          <p className="text-[#272727] font-poppins text-[1.125rem] font-[400]">
            {domToReact(children)}
          </p>
        );
      }
      if (name === "span") {
        return (
          <h3 className="text-[#272727] font-garnett-medium text-[1.5rem] font-[500]">
            {domToReact(children)}
          </h3>
        );
      }
    }
  };

  useEffect(() => {
    getDataProtection();
  }, []);

  return (
    <div className="mt-0 xl:mt-6">
      <div className="py-8 md:py-[2.3rem] bg-[#E6D7FE] px-6 xl:px-[7.5rem]">
        <h1 className="text-[#5C27C0] font-garnett-semi-bold text-[1.5rem] md:text-[3.125rem] font-[600] m-0">
          Data Protection
        </h1>
      </div>
      <div className="bg-[#F5F0FF] px-6 xl:px-[7.31rem] py-[4rem]">
        <p className="text-[#272727] font-garnett-medium-italic text-base md:text-[1.125rem] font-[600] italic mb-10">
          Last updated: {updatedAt}
        </p>
        <p>{parse(dataProtection, options)}</p>
      </div>
    </div>
  );
};

export default DataProtection;
