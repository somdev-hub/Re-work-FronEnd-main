import React, { useState } from "react";
import { AiFillInstagram } from "react-icons/ai";
import { BsTwitter } from "react-icons/bs";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import gcp from "../../assets/gcp.png";
import jupiter from "../../assets/jupiter_money.png";
import simplePay from "../../assets/simpl.png";
import slack from "../../assets/slack.png";
import stripe from "../../assets/stripe.png";
import zoom from "../../assets/zoom.png";
import ContactUsModal from "../modal/ContactUsModal";
import footerLogo from "../../assets/footer_logo.png";
import useGoogleAnalyticsTracker from "../../hook/useGoogleAnalyticsTracker";

const Footer = () => {
  const [modelOpened, setModelOpened] = useState(false);
  const googleTracker = useGoogleAnalyticsTracker("Social Link");

  return (
    // fixed bug : removed bg-color and added bg-[#0F48E3] in Line 23
    <footer className="bg-[#5C27C0] text-white text-center md:text-left">
      <div className="py-8  md:py-10 lg:w-full md:w-[90%] mx-auto flex flex-col items-center md:flex-row">
        {/* bug fixed : removed items-center and added mx-auto, responsive width and gap css in Line 25  */}
        <div className="flex flex-col justify-center md:flex-row  lg:gap-12 xl:gap-40 3xl:gap-x-[217px] gap-48 lg:w-[92%] xl:w-[88%] 2xl:w-[90%]  mx-auto 3xl:mx-28">
          {/* bug fixed : removed items-center and justify-center, semi-bold in Line 27  */}
          <div className="text-sm w-full md:w-fit flex md:flex-col gap-1 ">
            {/* fixed bug : added  lg:pl-4 in Line 30*/}
            <div className="flex flex-col gap-1">
              <img
                src={footerLogo}
                className="w-[170px] xl:w-[258px] lg:mb-[40px] 2xl:mb-[0px] 2xl:h-[80px] 3xl:h-[104px] mx-auto md:mx-0"
                alt="footer-logo"
              />
              {/* fixed bug : removed font family, size, style and added mt-[40px], mb-[16px] in Line 37*/}
              <div className="leading-[26px] 2xl:pt-[40px] 3xl:pt[53px] 2xl:pb-[16px] 3xl:pb-[24px]">
                {/* fixed bug : added font family, size, style, in Line 39 */}
                <h3 className="font-gilroy-bold font-semibold text-xl lg:mb-[16px] 2xl:mb-[24px]">
                  You do the pre-work
                  <p  className="font-gilroy-bold font-normal text-xl">
                  We do the rework
                </p>
                </h3>
                {/* fixed bug : removed mb-2 and added font family, size, style, in Line 43 */}
                
              </div>
              <div className="w-[270px]">
                {/* fixed bug : removed font-light and added font family, size and style in Line 49*/}
                <h6 className="text-xl font-gilroy-medium font-normal ">
                  Come join us on a mission to change the hiring industry
                </h6>
              </div>
            </div>
          </div>
          {/* bug fixed :  removed border line */}
          {/* fixed bug : added Quick Links visit section and removed heading tag and placed <p> tag and added font styles from div to particular elements in Link section from Line 46 to 64*/}
          <div className="flex flex-col gap-1 mt-5">
            {/* fixed bug : removed font family in line 59*/}
            <div className="">
              {/* fixed bug : added font family mb-4*/}
              <h3 className="2xl:text-[24px] 3xl:text-[32px] mb-4 font-gilroy-semi-bold">
                Quick Links
              </h3>
            </div>
            {/* fixed bug : added opacity in Line 66  font-light and added font family, size and style in Line 68 to 81*/}
            <div className="flex gap-2 opacity-80 flex-col ">
              <Link to="/about">
                <p className="font-gilroy-regular text-base font-normal">
                  About us
                </p>
              </Link>
              <div
                className="cursor-pointer"
                onClick={() => setModelOpened(true)}
              >
                <p className="font-gilroy-regular 2xl:text-base 3xl:text-xl font-normal">
                  Contact Us
                </p>
              </div>
              <Link to="/investinrework">
                <p className="font-gilroy-regular 2xl:text-base 3xl:text-xl font-normal">
                  Invest in us
                </p>
              </Link>
            </div>
          </div>
          {/* fixed bug : added Resources visit section and removed heading tag and placed <p> tag and added font styles from div to particular elements in Link section from Line 66 to 83*/}
          <div className="flex flex-col gap-1 mt-5">
            {/* fixed bug : added mb-4 in Line 86 */}
            <h3 className="2xl:text-[24px] 3xl:text-[32px] font-gilroy-semi-bold mb-4 ">
              Resources
            </h3>
            <div className="flex gap-2 flex-col opacity-80 font-normal">
              <Link to="/privacypolicy">
                <p className="font-gilroy-regular 2xl:text-base 3xl:text-xl font-normal">
                  Privacy Policy
                </p>
              </Link>

              <Link to="/dataprotection">
                <p className="font-gilroy-regular 2xl:text-base 3xl:text-xl font-normal">
                  Data Protection
                </p>
              </Link>

              <Link to="/termsandconditions">
                <p className="font-gilroy-regular text-base font-normal">
                  Terms and Conditions
                </p>
              </Link>
            </div>
          </div>

          {/* bug fixed :  removed border div section */}
          {/* fixed bug : added max-w-250px in Line 88 */}
          <div className="md:space-y-3 flex flex-col md:flex-row 2xl:max-w-[217px] 3xl:max-w-[310px] m-auto md:block gap-5 mt-5">
            {/* fixed bug: added For recruiters and For employers text inside the technology partners group fromLine 90 to 98*/}
            <div className="grid 2xl:gap-2 3xl:gap-3 mb-10">
              <p className="2xl:text-xl 3xl:text-[28px] font-normal font-gilroy-medium ">
                For recruiters
              </p>
              <div className="border border-white bg-white h-full opacity-80" />
              <p className="2xl:text-xl 3xl:text-[28px]  font-normal font-gilroy-medium ">
                For employers
              </p>
            </div>
            {/* fixed bug : removed text-center and added font gilroy font-family in Line 100*/}
            <div className="">
              <h3 className="mb-4 xl:text-[24px] 2xl:text-[34px] font-gilroy-semi-bold">
                Technology partners
              </h3>
            </div>
            {/* fixed bug : removed place-content-center grid-cols-2 md:grid-cols-3  items-center in Line 104  */}
            <div className="grid md:space-y-2 place-items-center xl:pr-14 2xl:pr-[99px] gap-x-0 gap-y-3 md:gap-y-0 ">
              {/* fixed bug : divide the between 2 div section each contain 3 images or logo adde flex padding margin and object scale down property in images from line 106 to 133 */}
              <div className="flex gap-4">
                <img
                  src={simplePay}
                  alt="simple_pay"
                  className=" object-scale-down"
                />
                <img
                  src={jupiter}
                  alt="jupiter"
                  className="pl-1 w-10/12 object-scale-down"
                />
                <img src={gcp} alt="gcp" className="object-scale-down" />
              </div>
              <div className="flex gap-3">
                <img
                  src={zoom}
                  alt="zoom"
                  className=" mr-2 object-scale-down"
                />
                <img
                  src={slack}
                  alt="slack"
                  className="pr-6 object-scale-down"
                />
                <img
                  src={stripe}
                  alt="stripe"
                  className="w-9/12 object-scale-down"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*fixed bug : border div line removed */}
      {/* fixed bug : added a div for footer's bottom background-color "#00000033" in Line  144 */}
      <div className="w-full h-full bg-[#00000033]">
        {/* fixed bug : added div for w-[90%] and padding margin for content width fixing in Line 146 */}
        <div className="py-2 lg:px-0 2xl:px-8 md:py-4 lg:w-[92%] xl:w-[88%] 2xl:w-[90%] mx-auto ">
          {/* fixed bug : added flex property in Line 148 to manage text and social icons */}
          <div className="flex flex-col items-center md:flex-row md:justify-between gap-2">
            {/* fixed bug : removed pb-14 in Line 150 */}
            <div className="md:space-y-3 flex flex-col md:flex-row mt-10 md:mt-0 md:block gap-5 ">
              {/* fixed bug : removed connect us on heading div */}
              <div className="flex gap-5 ">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.linkedin.com/company/reworkai/"
                  onClick={() => {
                    googleTracker(
                      "LinkedIn Page Visit",
                      "https://www.linkedin.com/company/reworkai/"
                    );
                  }}
                >
                  <IoLogoLinkedin className="text-2xl" />
                </a>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.youtube.com/channel/UCcEPeYGWKmOtmElIA91d0JQ"
                  onClick={() => {
                    googleTracker(
                      "Youtube Channel Visit",
                      "https://www.youtube.com/channel/UCcEPeYGWKmOtmElIA91d0JQ"
                    );
                  }}
                >
                  {/* <BsYoutube  /> */}
                  <FaYoutube className="text-2xl"></FaYoutube>
                </a>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.instagram.com/reworkai/"
                  onClick={() => {
                    googleTracker(
                      "Intagram Page Visit",
                      "https://www.instagram.com/reworkai/"
                    );
                  }}
                >
                  <AiFillInstagram className="text-2xl" />
                </a>

                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://twitter.com/rework_ai"
                  onClick={() => {
                    googleTracker(
                      "twitter Page Visit",
                      "https://twitter.com/rework_ai"
                    );
                  }}
                >
                  <BsTwitter className="text-2xl" />
                </a>
              </div>
            </div>
            {/* fixed bug : removed border and visiting links and added &copy; 2023 Rework. added opacity and responsive padding in Line 210*/}
            <p className="text-base opacity-60 font-inter font-normal lg:pr-4 xl:pr-5 2xl:pr-9">
              &copy; 2023 Rework.
            </p>
          </div>
        </div>
      </div>
      <ContactUsModal
        modelOpened={modelOpened}
        setModelOpened={setModelOpened}
        data=""
      />
    </footer>
  );
};

export default Footer;


