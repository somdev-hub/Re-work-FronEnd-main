import React, { useState, useEffect } from "react";
// removed the imports of old image
import Register from "../../pages/register/Register";

// Import new images and an arrow icon from react-icons
import { HiOutlineArrowSmallRight } from "react-icons/hi2";
import AI from "../../assets/recruiters_ai.png";
import Hand from "../../assets/recruiters_hands.png";

const HeroRecruiter = () => {
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [checked, setChecked] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if the window width is less than or equal to 768px (adjust this breakpoint as needed)
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize); // Listen to window resize events

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      id="recruiters"
      className="w-full h-full bg-white sm:py-[60px] xl:py-[80px] 3xl:py-[108px] sm:px-[50px] xl:px-[100px] 3xl:px-[160px]"
    >
      <div className="flex xs:pt-[40px] xs:px-[24px] sm:gap-0 xl:gap-[120px] 2xl:gap-[202px]">
        <div className="grid justify-items-center lg:block mx-auto">
          <h1 className="text-[40px] xs:text-[32px] xs:text-center lg:text-[40px] xl:text-[64px] 3xl:text-[82px] xs:max-w-[382px] xl:max-w-[946px] leading-[115%] text-black font-gilroy-bold ">
            unleashing the power of <br />
            <span className="font-gilroy-bold  head-color">
              artificial intelligence
            </span>
          </h1>
          {/* AI image for mobile view */}
          {isMobile ? (
            <img
              src={AI}
              alt="AI"
              className="w-[180px] sm:w-[230px] mx-auto my-6 object-contain"
            />
          ) : null}
          <p className=" lg:text-[24px] xs:text-center xs:pt-[24px] xs:pb-[56px] sm:mt-[24px] sm:mb-[56px] xs:text-[16px] 3xl:text-[32px] font-quicksand font-medium leading-[120%] text-color max-w-[392px] xs:max-w-[392px] lg:max-w-[600px] xl:max-w-[700px] 2xl:max-w-[900px] lg:mt-[32px] 2xl:mt-[40px] lg:mb-[76px] 2xl:mb-[96px]">
            Zero overhead in the hiring process - promise! Source top quality
            candidates for some of the best companies and maximize your earning
          </p>
          <div className="grid justify-center lg:block">
            <button
              // Used the old button functionalities and changed the styles accordingly
              onClick={() => setOpenRegisterModal(true)}
              className="flex xs:hidden justify-center font-gilroy-semi-bold items-center hover:text-white duration-300 transition-in-out head-color xs:rounded-[32.258px] xl:rounded-[66.667px] border-[3px] md:border-[3px] 2xl:border-[4.267px] text-[16px] md:text-[20px] 2xl:text-[32px] gap-[8.59px] buttons-styles py-[12.8px] pl-[18.3px] pr-[14.7px]"
            >
              get started{" "}
              <span className="text-[144%]">
                <HiOutlineArrowSmallRight />
              </span>
            </button>
          </div>
        </div>
        {/* Ai image for web view */}
        {isMobile ? null : (
          <img
            src={AI}
            alt="AI"
            className="w-auto xl:w-[357px] 2xl:w-[476px] object-contain"
          />
        )}
      </div>

      <Register
        openRegisterModal={openRegisterModal}
        setOpenRegisterModal={setOpenRegisterModal}
        activeState="recruiters"
        checked={checked}
      />
      <div className="flex xs:pb-[40px] xs:px-[24px] sm:gap-[45px] lg:gap-[35px] xl:gap-[175px] 2xl:gap-[175px] xs:mt-0 mt-[100px]">
        {/* Hand image for web view */}
        {isMobile ? null : (
          <img
            src={Hand}
            alt="hand"
            className="w-auto h-auto lg:w-[357px] 2xl:w-[476px] sm:mb-[45px] xl:mb-[30px] 2xl:mb-0 object-contain"
          />
        )}
        <div className="grid justify-items-center lg:block mx-auto">
          {/* <h1 className="grid justify-items-center xs:block lg:block mx-auto lg:mx-0 xs:text-[32px] xs:text-center sm:text-[40px] xl:text-[64px] 3xl:text-[84px] w-[560px] xs:max-w-[382px] xl:max-w-[946px] 2xl:mt-[60px] leading-[115%] text-black font-gilroy-bold "> */}
          <h1 className="grid justify-items-center xs:block lg:block mx-auto lg:mx-0 text-[40px] xs:text-[32px] xs:text-center :text-[40px] xl:text-[64px] 3xl:text-[82px] xs:max-w-[382px] xl:max-w-[946px] leading-[115%] text-black font-gilroy-bold">
            prioritizing progress of the
            <span className="font-gilroy-bold  head-color pl-[10px] xl:pl-[20px]">
              community
            </span>
          </h1>
          {/*Hands image for mobile view */}
          {isMobile ? (
            <img
              src={Hand}
              alt="hand"
              className="w-[180px] sm:w-[230px] mx-auto my-6 object-contain"
            />
          ) : null}
          <p className="lg:text-[24px] xs:text-center xs:pt-[24px] xs:pb-[56px] sm:mt-[24px] sm:mb-[56px] xs:text-[16px] 3xl:text-[32px] font-quicksand font-medium leading-[120%] text-color max-w-[392px] xs:max-w-[392px] lg:max-w-[600px] xl:max-w-[700px] 2xl:max-w-[900px] lg:mt-[32px] 2xl:mt-[40px] lg:mb-[60px] xl:mb-[76px] 2xl:mb-[96px]">
            Zero overhead in the hiring process - promise! Source top quality
            candidates for some of the best companies and maximize your earning
          </p>
          <div className="grid justify-center lg:block">
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
        </div>
      </div>
    </div>
  );
};

export default HeroRecruiter;
