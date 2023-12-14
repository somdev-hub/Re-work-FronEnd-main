import React, { useState } from "react";
import HeaderImg from "../../assets/hero-illustration.svg";
import Register from "../../pages/register/Register";

const HeaderCompany = () => {
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  // const [openLoginModal, setOpenLoginModal] = useState(false);
  const [a, setA] = useState();

  return (
    <div className="bg-gradient-to-r from-[#444DA1] to-[#2068FF] py-8 px-6 bg-opacity-80 md:flex md:flex-row-reverse items-center justify-between md:py-20 md:px-14 lg:px-20 xl:px-24 ">
      <div className="pb-4 md:pb-0">
        <img
          src={HeaderImg}
          alt=""
          loading="eager"
          className="object-cover min-w-[36vw] mx-auto"
        />
      </div>

      <div className="text-white flex flex-col md:gap-12 justify-center items-center lg:items-start">
        <div className="text-center md:pt-10 lg:text-left">
          <h2 className=" text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-4 md:mb-8 uppercase">
            UNLEASH POWER OF AI
          </h2>
          <h2 className=" text-2xl sm:text-3xl md:text-4xl  xl:text-4xl font-extrabold mb-4 md:mb-8 uppercase">
            Boost your Hiring BY 80%
          </h2>
          <h4 className="text-sm md:text-base lg:text-lg max-w-md  mx-auto lg:ml-0">
            Streamline your hiring and source the best candidates for your
            company with the help of AI powered tools
          </h4>
        </div>

        <div className="flex sm:gap-10 text-white py-5">
          <button
            onClick={() => {
              setA(true);
              setOpenRegisterModal(true);
            }}
            className="bg-white text-[color:var(--blue)] font-bold text-sm px-3 py-2 rounded-l-lg sm:rounded-lg sm:text-base md:text-lg md:px-8 md:py-4"
          >
            <span className="text-[#333D92]">I'm a Recruiter</span>
          </button>

          {/* <Register
            openRegisterModal={openRegisterModal}
            setOpenRegisterModal={setOpenRegisterModal}
            activeState="recruiters"
          /> */}

          <button
            onClick={() => {
              setA(false);
              setOpenRegisterModal(true);
            }}
            className="bg-[color:var(--orange)] hover:bg-[color:var(--hover-orange)] font-bold text-sm px-3 py-2 rounded-r-lg sm:rounded-lg sm:text-base md:text-lg md:px-8 md:py-4"
          >
            I'm an Employer
          </button>

          <Register
            openRegisterModal={openRegisterModal}
            setOpenRegisterModal={setOpenRegisterModal}
            activeState={a ? "recruiters" : "company"}
          />
        </div>
        <div className="hidden md:block lg:ml-24">
          <a href="https://www.producthunt.com/posts/rework-ai?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-rework&#0045;ai" target="_blank" rel="noreferrer"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=381945&theme=light" alt="Rework&#0032;AI - India's&#0032;1st&#0032;AI&#0045;Powered&#0032;HR&#0032;freelancing&#0032;platform | Product Hunt" style={{
            width: "250px", height: "54px"
          }} width="250" height="54" /></a>
        </div>
      </div>
    </div>
  );
};

export default HeaderCompany;
