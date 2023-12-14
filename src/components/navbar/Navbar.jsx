import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { HiMiniBars3 } from "react-icons/hi2";
import { IoCloseSharp } from "react-icons/io5";
import Register from "../../pages/register/Register";
import Login from "../../pages/login/Login";
import AOS from "aos";
import "aos/dist/aos.css";
const Navbar = () => {
  const [smllNav, setSmllNav] = useState(false);
  const [navBg, setNavBg] = useState(false);

  const [checked, setChecked] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  useEffect(() => {
    if (window.innerWidth > 769) {
      setSmllNav(true);
    } else {
      setSmllNav(false);
    }
  }, []);

  const [show, setShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY < 20) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
  }, [show]);

  // animate on scroll has been added for navbar animation 
  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic"
    });
  }, []);
  return (
    <nav
      className={`bg-transparent md:bg-white 2xl:py-[16px] py-8 fixed top-0 w-screen left-0 z-50 ${
        show
          ? "w-full z-50 top-0 ease-in-out"
          : "w-full top-0 fixed z-50 ease-in-out md:shadow-md"
      }`}
    >
      <div className="flex items-center justify-between px-0 md:px-[5%] lg:px-[5%] xl:px-[7%]">
        <div className="shadow-md md:shadow-none flex justify-between items-center px-[6%] md:px-0 w-full py-5 2xl:py-[20px] md:py-0 bg-white md:bg-transparent fixed md:relative md:w-fit top-0">
          <Link to="/">
            <img
              src={logo}
              alt="Rework logo"
              className="lg:w-auto lg:h-auto w-[83.55] h-[24px]"
            />
          </Link>

          {/* navbar activation using useEffect cancelled */}

          {/* {smllNav ? (
            <IoCloseSharp
              onClick={() => setSmllNav(!smllNav)}
              className="md:hidden visible relative"
              size={25}
            />
          ) : (
            <HiMiniBars3
              onClick={() => setSmllNav(!smllNav)}
              className="md:hidden visible relative"
              size={23}
            />
          )} */}

          {/* <div className="sm:hidden block">
            {smllNav ? (
              <IoCloseSharp
                onClick={() => setSmllNav(!smllNav)}
                className="md:hidden visible relative"
                size={25}
              />
            ) : (
              <HiMiniBars3
                onClick={() => setSmllNav(!smllNav)}
                className="md:hidden visible relative"
                size={23}
              />
            )}
          </div> */}

          {/* display navbar in smaller divice using navBg state */}
          <div className="sm:hidden block">
            {navBg ? (
              <IoCloseSharp
                onClick={() => setNavBg(false)}
                className="md:hidden visible relative"
                size={25}
              />
            ) : (
              <HiMiniBars3
                onClick={() => setNavBg(true)}
                className="md:hidden visible relative"
                size={23}
              />
            )}
          </div>
        </div>

        {/* display the small nav with some aniamtiom */}
        <div
          className={`relative w-full opacity-100 md:block md:w-auto duration-300 z-50 mt-3 md:mt-0 md:right-auto ease-out  ${
            navBg ? "right-0" : " right-[-100%]"
          } `}
          // the navbar in mobile devices will the outside the viewport if navBg is false or inside the screen otherwise
          data-aos="fade-left"
        >
          <ul className="flex flex-col items-center lg:gap-x-[24px] md:gap-x-[14px] gap-y-4 md:p-0 mt-[20px] border border-gray-100 rounded-lg md:flex-row md:mt-0 md:border-0 bg-[#f9f1ff] md:bg-transparent font-gilroy-Regular 2xl:text-[20px] lg:text-[14px] xl:text-[16px] md:text-[12px] text-[14px] font-normal py-9 md:py-0 text-center">
            {/* <li onClick={()=>{
              setSmllNav(false)
            }} className="border-b-[2px] w-screen md:w-fit md:border-none border-[#fffefe] pb-4 md:pb-0">
              <Link
                to="/https://talentfinder.rework.club"
                className="text-[#b7b7b7] hover:text-[#5C27C0] duration-300 border-b-[3px] hover:border-[#5C27C0] border-transparent pb-1 relative"
              >
                Talent Finder
                <span className="w-[30px] text-white bg-[#5C27C0] text-[6px] xl:text-[8px] rounded-[50px] py-[4px] px-[6px] absolute left-[60%] md:left-[53%] xl:left-[55%] 2xl:left-[75%] bottom-[19px] xl:bottom-[22px] 2xl:bottom-[28px] font-gilroy-bold">
                  NEW
                </span>
              </Link>
            </li> */}
            <li
              onClick={() => {
                setNavBg(false);
              }}
              className="border-b-[2px] w-screen md:w-fit md:border-none border-[#fffefe] pb-4 md:pb-0"
            >
              <a
                href="https://talentfinder.rework.club/"
                className="text-[#b7b7b7] hover:text-[#5C27C0] duration-300 border-b-[3px] hover:border-[#5C27C0] border-transparent pb-1 relative"
              >
                Talent Finder
                <span className="w-[30px] text-white bg-[#5C27C0] text-[6px] xl:text-[8px] rounded-[50px] py-[4px] px-[6px] absolute left-[60%] md:left-[53%] xl:left-[55%] 2xl:left-[75%] bottom-[19px] xl:bottom-[22px] 2xl:bottom-[28px] font-gilroy-bold">
                  NEW
                </span>
              </a>
            </li>
            {/* reinsure link */}
            {/* <li onClick={()=>{
              setSmllNav(false)
            }} className="border-b-[2px] w-screen md:w-fit md:border-none border-[#fffefe] pb-4 md:pb-0">
              <Link
                to="/"
                className="text-[#b7b7b7] hover:text-[#5C27C0] duration-300 border-b-[3px] hover:border-[#5C27C0] border-transparent pb-1 relative"
              >
                Reinsure
                <span className="w-[30px] text-white bg-[#5C27C0] text-[6px] xl:text-[8px] rounded-[50px] py-[4px] px-[6px] absolute left-[60%] md:left-[53%] xl:left-[55%] 2xl:left-[65%] md:bottom-[19px] bottom-[17px] xl:bottom-[22px] 2xl:bottom-[28px] font-gilroy-bold">
                  NEW
                </span>
              </Link>
            </li> */}


            {/* all list items has been added with onClick event to close the navbar */}
            <li
              onClick={() => {
                setNavBg(false);
              }}
              className="border-b-[2px] w-screen md:w-fit md:border-none border-[#fffefe] pb-4 md:pb-0"
            >
              <Link
                to="/"
                className="text-[#b7b7b7] hover:text-[#5C27C0] duration-300 border-b-[3px] hover:border-[#5C27C0] border-transparent pb-1 relative"
              >
                For Recruiters
              </Link>
            </li>
            <li
              onClick={() => {
                setNavBg(false);
              }}
              className="border-b-[2px] w-screen md:w-fit md:border-none border-[#fffefe] pb-4 md:pb-0"
            >
              <Link
                to="/employers"
                className="text-[#b7b7b7] hover:text-[#5C27C0] duration-300 border-b-[3px] hover:border-[#5C27C0] border-transparent pb-1"
              >
                For Employers
              </Link>
            </li>
            {/* our team link */}
            {/* <li onClick={()=>{
              setSmllNav(false)
            }} className="border-b-[2px] w-screen md:w-fit md:border-none border-[#fffefe] pb-4 md:pb-0">
              <Link
                to="/"
                className="text-[#b7b7b7] hover:text-[#5C27C0] duration-300 border-b-[3px] hover:border-[#5C27C0] border-transparent pb-1"
              >
                Our Team
              </Link>
            </li> */}
            <div className="flex md:flex-row flex-col justify-center md:gap-2 lg:gap-2 xl:gap-4 lg:pl-[0px] xl:pl-[20px] md:pl-[10px] pl-0 mt-1 md:mt-0">
              <button
                onClick={() => setNavBg(false)}
                className="border-b-[2px] w-screen md:w-fit md:border-none border-[#fffefe] pb-4 md:pb-0"
              >
                <Link
                  onClick={() => setOpenLoginModal(true)}
                  to="/"
                  className="text-[#5C27C0] md:border-[2.347px] border-[#5C27C0] rounded-[36.667px] xl:text-[16.486px] 2xl:text-[20.486px] lg:text-[14.486px] text-[12.486px] md:px-[16px] md:py-[8.267px] xl:px-[20px] xl:py-[10.267px] 2xl:px-[26.667px] 2xl:py-[13.689px] md:hover:bg-[#5C27C0] md:hover:text-white duration-300 font-semibold"
                >
                  Sign in
                </Link>
                <Login
                  openLoginModal={openLoginModal}
                  setOpenLoginModal={setOpenLoginModal}
                />
              </button>
              <button
                onClick={() => setNavBg(false)}
                className="mt-[20px] md:mt-0"
              >
                <Link
                  onClick={() => setOpenRegisterModal(true)}
                  to="/"
                  className="md:text-white text-black md:border-[2.347px] border-[#5C27C0] rounded-[36.67px] 2xl:text-[20.486px] xl:text-[16.486px] lg:text-[14.486px] text-[12.486px] md:px-[16px] md:py-[8.267px] xl:px-[20px] xl:py-[10.267px] 2xl:px-[26.667px] 2xl:py-[13.689px] md:bg-[#5C27C0] bg-transparent hover:bg-transparent hover:text-[#5C27C0] duration-300 font-semibold mt-1"
                >
                  Sign up
                </Link>
                <Register
                  openRegisterModal={openRegisterModal}
                  setOpenRegisterModal={setOpenRegisterModal}
                  activeState="recruiters"
                  checked={checked}
                  setChecked={setChecked}
                />
              </button>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
