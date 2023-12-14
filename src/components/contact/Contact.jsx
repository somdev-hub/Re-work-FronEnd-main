import React, { useState } from "react";

// Removed the old contact us svg image

// imported right arrow
import { HiOutlineArrowSmallRight } from "react-icons/hi2";
import useGoogleAnalyticsTracker from "../../hook/useGoogleAnalyticsTracker";
import ContactUsModal from "../modal/ContactUsModal";

// Created a seperate contact us button with all responsive designs. This button contains the previous functionality.

const ContactUs = () => {
  const [modelOpened, setModelOpened] = useState(false);
  const googleTracker = useGoogleAnalyticsTracker("Contact Us Button");

  const handleContact = () => {
    setModelOpened(true);
    googleTracker("Clicked");
  };

  return (
    <div>
      <button
        onClick={handleContact}
        className="flex justify-center font-gilroy-semi-bold items-center duration-300 transition-in-out head-color xs:rounded-[32.258px] sm:rounded-[66.667px] 2xl:text-[32px] border-[3px] md:border-[3px] 2xl:border-[4.267px] hover:border-[3px] md:hover:border-[3px] 2xl:hover:border-[4.267px] border-transparent hover:border-inherit text-[16px] md:text-[20px] button-styles bg-white text-[#5C27C0] hover:bg-[#5C27C0] hover:text-white xs:py-[10px] xs:pl-[10px] xs:pr-[10px] py-[12.8px] pl-[18.3px] pr-[14.7px]  xs:mt-[25px] sm:mt-[30px] lg:mt-[40px] 2xl:mt-[50px] gap-[8.59px]"
        // className="lg:px-[32.2px] lg:py-[17.6px] sm:pl-[22px] sm:pr-[18px] sm:py-[18px] xs:py-[9.68px] xs:pl-[11.6px] xs:pr-[9.68px] inline-flex lg:gap-[11.792px] sm:gap-[12px] xs:gap-[5.806px] justify-center items-center lg:rounded-[62.946px] sm:rounded-[66.667px] xs:rounded-[32.258px] bg-white text-[#5C27C0] font-gilroy-semi-bold lg:text-[28.302px] sm:text-[32px] xs:text-[16px] lg:mt-[40px] lg:mb-[62.75px]"
      >
        contact us{" "}
        <span>
          <HiOutlineArrowSmallRight />
        </span>
      </button>
      <ContactUsModal
        modelOpened={modelOpened}
        setModelOpened={setModelOpened}
        data=""
      />
    </div>
  );
};

const Contact = () => {
  return (
    // created a div for contact us page
    <div className="flex flex-col justify-center items-center mt-[70px] lg:mt-[50px] xs:mx-[20px] mx-auto mb-[80px] lg:mb-[280px] 2xl:mb-[140px]">
      {/* Created a div for inner that contact title content and button */}
      <div className="flex flex-col justify-center items-center xs:min-w-[380px] sm:max-w-[600px] md:min-w-[500px] lg:min-w-[900px] xl:min-w-[1240px] 2xl:min-w-[1400px] bg-[#5C27C0] rounded-[15px] sm:rounded-[20px] 2xl:rounded-[25px] xs:py-[32px] sm:py-[40px] sm:px-[40px] lg:px-0 lg:py-[62px] 2xl:py-[80px]">
        {/* created a div that contains title and content */}
        <div className="inline-flex flex-col items-center self-stretch justify-center xs:gap-[12px]">
          {/* Created a h1 for title of contact us. */}
          <h1 className="text-center text-white font-gilroy-bold text-[32px] sm:text-[40px] lg:text-[50px] xl:text-[72px] 2xl:text-[92px] leading-[120%] xs:w-[222px] sm:w-full">
            don’t hesitate, get in touch
          </h1>
          {/* Created a p for content for contact us. */}
          <p className="text-center text-[20px] xs:text-[16px] sm:text-[20px] xl:text-[24px] 2xl:text-[32px] font-quicksand text-white leading-[120%] xs:max-w-[325px]">
            One of our customer service representatives will be happy to assist
            you.
          </p>
        </div>
        {/* Created a button for Contact us button */}
        <ContactUs />
      </div>
    </div>

    // Removed the old contact us design.
  );
};

export default Contact;
