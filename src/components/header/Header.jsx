import React, { useEffect, useState } from "react";
import hero from "../../assets/hero1.png";
import { Link } from "react-router-dom";
import { ImArrowRight2 } from "react-icons/im";
import recuter1 from "../../assets/recuter_1.png";
import recuter2 from "../../assets/recuter_2.png";
import recuter3 from "../../assets/recuter_3.png";
import recuter4 from "../../assets/recuter_4.png";
import recuter5 from "../../assets/recuter_5.png";
import Register from "../../pages/register/Register";
import { HiOutlineArrowSmallRight } from "react-icons/hi2";

import moonlight from "../../assets/moonlight.png";
import earnmore from "../../assets/earnmore.png";
import grow from "../../assets/grow.png";

import SubBanner from "../header/subBanner";
// import { AiFillStar } from "react-icons/ai";
import clutch from "../../assets/clutch.png";
import starRating from "../../assets/starRating.png";
import recruitersProfile from "../../assets/recruitersProfile.png";

const slideDuration = 3000;
const images = [moonlight, earnmore, grow];

const Header = () => {
  const [smllBanner, setSmllBanner] = useState(true);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [checked, setChecked] = useState(true);
  useEffect(() => {
    if (window.innerWidth > 769) {
      setSmllBanner(false);
    }
  }, []);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Update the current image index to move to the next slide
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, slideDuration);
    // Clear the interval when the component is unmounted or the dependency array changes
    return () => clearInterval(interval);
  }, []);
  return (
    <section className="w-screen xl:w-full flex md:flex-row flex-col justify-center items-center md:justify-between relative md:top-0 top-[-40px]">
      <div className="flex flex-col md:items-start items-center relative lg:pl-[7%] md:pl-[5%] pl-[0] gap-[40px] lg:gap-[40px] xl:gap-[50px] top-3">
        <section className="flex flex-col xs:justify-center  items-center md:items-start gap-[40px] md:gap-0">
          <h1 className="mt-[70px] md:mt-0 lg:mt-[60px] xl:mt-[0] text-[#202020] text-[48px] lg:text-[60px] xl:text-[96px] 2xl:text-[110px] 3xl:text-[128px] flex flex-col leading-[60px] md:leading-[60px] xl:leading-[90px] text-center md:text-left 2xl:gap-[12px]">
            <span className="block font-gilroy-extrabold font-normal md:w-[440px] xl:w-[675px] 2xl:w-[810px] 3xl:w-[900px]">
              it’s your turn to
            </span>
            <div className="lg:w-[330px] xl:w-[530px] md:h-auto 2xl:w-[610px] 2xl:h-[150px] w-[345px]">
              <img
                src={images[currentImageIndex]}
                alt="moonlight" 
                className="w-full h-auto object-contain"
              />
            </div>
          </h1>
          <div className="mt-[40px] mb-[40px] xs:mt-0 xs:mb-0 sm:mt-[0px] sm:mb-0 lg:mt-[40px]  xl:mb-[30px]">
            {/* <button className="w-full flex justify-center md:block">
              <Link
                to="/"
                className="text-[#5C27C0] border-[3.2px] border-[#5C27C0] rounded-[50px] py-[15.5px] pl-[18.6px] pr-[15.5px] lg:pl-[16px] lg:pr-[20px] lg:py-[14px] hover:bg-[#5C27C0] hover:text-white duration-300 flex gap-[9px] items-center justify-center w-fit text-[24px] md:text-[22.481px] lg:text-[32px] md:mt-[20px] lg:mt-[32px] 2xl:mt-[40px] 2xl:mb-[100px] font-semibold"
              >
                get started
                <ImArrowRight2 size={25} />
              </Link>
            </button> */}
            <button
              // Used the old button functionalities and changed the styles accordingly
              onClick={() => setOpenRegisterModal(true)}
              className="flex justify-center font-gilroy-semi-bold items-center hover:text-white duration-300 transition-in-out head-color xs:rounded-[32.258px] xl:rounded-[66.667px] 2xl:text-[32px] gap-[8.59px] border-[3px] md:border-[3px] 2xl:border-[4.267px] text-[16px] md:text-[20px] buttons-styles xs:py-[10px] xs:pl-[10px] xs:pr-[10px] py-[12.8px] pl-[18.3px] pr-[14.7px]"
            >
              get started{" "}
              <span className="text-[144%]">
                <HiOutlineArrowSmallRight />
              </span>
            </button>
          </div>
          <Register
            openRegisterModal={openRegisterModal}
            setOpenRegisterModal={setOpenRegisterModal}
            activeState="recruiters"
            checked={checked}
          />
        </section>

        <section className="relative bottom-5">
          <div className="flex justify-center items-end gap-x-9 relative mb-[20px] mt-[40px] md:mt-[10px] lg:mt-[20px]">
            <div className="">
              {/* <h5 className="text-[17px] 2xl:text-[24px] text-[#17313B] font-normal font-gilroy-medium ">
                REVIEWED ON
              </h5> */}
              <img
                src={clutch}
                alt="clutch"
                className="h-auto w-[113px] 2xl:w-[157px] object-contain"
              />
            </div>
            <div className="">
              {/* <div className="flex justify-center items-center gap-x-1">
                <AiFillStar color="orange" />
                <AiFillStar color="orange" />
                <AiFillStar color="orange" />
                <AiFillStar color="orange" />
                <AiFillStar color="orange" />
              </div>
              <p className="text-[17px] 2xl:text-[24px] text-[#17313B] font-normal font-gilroy-medium mt-[3px]">
                4.7 RATING
              </p> */}
              <img
                src={starRating}
                alt="recruites rating"
                className="w-[100px] 2xl:w-[160px] object-contain"
              />
            </div>
          </div>
          {smllBanner && <SubBanner />}

          <div className="grid justify-center md:block gap-[6px] lg:mt-[32px] 2xl:mt-[40px]">
            {/* <p className="text-[#7B7B7B] font-gilroy-regular pb-1 text-[15px] md:text-[16px] 2xl:text-[20px] md:text-base text-center md:text-start ">
              Trusted by recruiters
            </p>
            <div className="flex items-center justify-center md:justify-start pl-8 md:pl-0">
              <img src={recuter1} alt="recuter photo" />
              <img
                src={recuter2}
                alt="recuter photo"
                className="translate-x-[-10px]"
              />
              <img
                src={recuter3}
                alt="recuter photo"
                className="translate-x-[-20px]"
              />
              <img
                src={recuter4}
                alt="recuter photo"
                className="translate-x-[-30px]"
              />
              <img
                src={recuter5}
                alt="recuter photo"
                className="translate-x-[-40px]"
              />
              <span className="text-[11px] rounded-full bg-[#5C27C0] text-white h-[36px] w-[36px] flex justify-center items-center translate-x-[-50px] font-gilroy-bold font-medium">
                10K+
              </span>
            </div> */}
            <p className="text-[#7B7B7B] font-gilroy-regular pb-1 text-[15px] md:text-[16px] 2xl:text-[20px] md:text-base text-center md:text-start ">
              Trusted by recruiters
            </p>
            <img
              src={recruitersProfile}
              alt="recruites rating"
              className="h-auto w-[200px] 2xl:w-[266px] object-contain"
            />
          </div>
        </section>
      </div>
      {!smllBanner && <SubBanner />}
      <div>
        <img
          src={hero}
          alt="hero image"
          className="w-[400px] h-[500px] md:w-[500px] md:h-[600px] xl:w-[586px] xl:h-[684px] 2xl:w-[750px] 2xl:h-[900px] object-cover 2xl:object-right relative right-0 hidden md:block"
        />
      </div>
    </section>
  );
};

export default Header;
