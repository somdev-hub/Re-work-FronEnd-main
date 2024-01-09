import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { HiMiniBars3 } from "react-icons/hi2";
import { IoCloseSharp } from "react-icons/io5";
import Register from "../../register/Register";
import Login from "../../login/Login";
import AOS from "aos";
import "aos/dist/aos.css";

const NavItem = ({ to, children, external = false, setNavBg }) => {
  const LinkComponent = external ? "a" : Link;
  const currentPath =
    window.location.pathname === to
      ? "text-[#5C27C0] font-semibold"
      : "text-[#8E8E8E] group-hover:text-[#5C27C0] group-hover:font-semibold";
  return (
    <li
      onClick={() => setNavBg(false)}
      className="group relative w-full lg:w-auto md:border-none border-[#fffefe] py-4 lg:py-0 sm:pb-4 lg:pb-0 text-sm xl:text-base"
    >
      <a
        to={to}
        href={to}
        className={`border-transparent pb-1 relative ${currentPath}`}
      >
        {children}
      </a>
      <div
        className={`absolute left-[25%] rounded-full bottom-[-8px] h-1  group-hover:bg-[#5C27C0] duration-300 ${
          currentPath === "text-[#5C27C0] font-semibold"
            ? "w-1/2 bg-[#5C27C0]"
            : "w-0 group-hover:w-1/2"
        }`}
      ></div>
    </li>
  );
};

const ButtonLink = ({
  onClick,
  to,
  setOpenModal,
  children,
  primary = false,
  setNavBg
}) => (
  <button
    onClick={() => {
      setNavBg(false);
      onClick();
    }}
    className="lg:w-fit lg:border-none pb-4 py-4 lg:py-0 lg:pb-0"
  >
    <Link
      onClick={() => setOpenModal(true)}
      to={to}
      className={`lg:border-2 border-[#5C27C0] rounded-[10px] lg:px-4 lg:py-2 xl:px-5 xl:py-3  duration-300 font-semibold text-sm xl:text-base ${
        primary
          ? "lg:bg-[#5C27C0] lg:text-white hover:text-[#5C27C0] hover:bg-white hover:border-[#5C27C0]"
          : "text-[#5C27C0] lg:hover:bg-[#5C27C0] lg:hover:text-white"
      }`}
    >
      {children}
    </Link>
  </button>
);

const Navbar = () => {
  const [smallNav, setSmallNav] = useState(false);
  const [navBg, setNavBg] = useState(false);
  const [checked, setChecked] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const navItems = [
    {
      to: "https://talentfinder.rework.club/",
      external: true,
      label: "Talent Finder"
    },
    { to: "/newhero", label: "For Recruiters" },
    { to: "/employers", label: "For Employers" },
    { to: "/newaboutus", label: "About Us" },
    { to: "/company", label: "Company" }
  ];

  const buttonLinks = [
    {
      onClick: () => setOpenLoginModal(true),
      to: "/",
      primary: true,
      label: "Sign in"
    },
    { onClick: () => setOpenRegisterModal(true), to: "/", label: "Get Started" }
  ];

  useEffect(() => {
    if (window.innerWidth > 769) {
      setSmallNav(true);
    } else {
      setSmallNav(false);
    }
  }, []);

  const [show, setShow] = useState(true);

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
      className={`bg-transparent lg:bg-white 2xl:py-[13px] py-8 fixed top-0 w-screen left-0 z-50 ${
        show
          ? "w-full z-50 top-0 ease-in-out"
          : "w-full top-0 fixed z-50 ease-in-out lg:shadow-md"
      }`}
    >
      <div className="flex items-center gap-10 px-0 lg:px-[5%] xl:px-[7%]">
        <div className="shadow-md md:shadow-none flex justify-between items-center px-[6%] lg:px-0 w-full py-5 2xl:py-[20px] lg:py-0 bg-white lg:bg-transparent fixed lg:relative lg:w-fit top-0">
          <Link to="/">
            <img
              src={logo}
              alt="Rework logo"
              className="lg:w-auto lg:h-auto w-[83.55] h-[24px]"
            />
          </Link>

          {/* navbar activation using useEffect cancelled */}

          {/* display navbar in smaller divice using navBg state */}
          <div className="lg:hidden block">
            {navBg ? (
              <IoCloseSharp
                onClick={() => setNavBg(false)}
                className="lg:hidden visible relative"
                size={25}
              />
            ) : (
              <HiMiniBars3
                onClick={() => setNavBg(true)}
                className="lg:hidden visible relative"
                size={23}
              />
            )}
          </div>
        </div>

        {/* display the small nav with some aniamtiom */}
        <div
          className={`relative w-full opacity-100 lg:block duration-300 z-50 mt-3 lg:mt-0 lg:right-auto ease-out  ${
            navBg ? "right-0" : " right-[-100%]"
          } `}
          // the navbar in mobile devices will the outside the viewport if navBg is false or inside the screen otherwise
          data-aos="fade-left"
        >
          <ul className="flex flex-col items-center xl:gap-x-[24px] lg:gap-x-[14px] lg:p-0 mt-[20px] border border-gray-100 rounded-lg lg:flex-row lg:mt-0 lg:border-0 bg-[#f9f1ff] lg:bg-transparent font-poppins 3xl:text-[1.3rem] 2xl:text-[1rem] lg:text-[1rem] xl:text-[16px] md:text-[12px] py-6 lg:py-0 text-center text-[1rem] font-[500] justify-between flex-1 w-full">
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-5">
              {navItems.map(({ to, external, label }) => (
                <NavItem
                  key={to}
                  to={to}
                  external={external}
                  setNavBg={setNavBg}
                >
                  {label}
                </NavItem>
              ))}
            </div>

            <div className="flex flex-col lg:flex-row justify-center gap-2 lg:gap-4 xl:gap-6 mt-1 lg:mt-0">
              {buttonLinks.map(({ onClick, to, primary, label }) => (
                <ButtonLink
                  key={to}
                  onClick={onClick}
                  to={to}
                  primary={primary}
                  setNavBg={setNavBg}
                >
                  {label}
                </ButtonLink>
              ))}
              <Login
                openLoginModal={openLoginModal}
                setOpenLoginModal={setOpenLoginModal}
              />
              <Register
                openRegisterModal={openRegisterModal}
                setOpenRegisterModal={setOpenRegisterModal}
                activeState="recruiters"
                checked={checked}
                setChecked={setChecked}
              />
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
