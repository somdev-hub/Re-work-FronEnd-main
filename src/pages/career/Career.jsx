import React from "react";
import CareerImg from "../../assets/CareerPageImmg.png";
import CareerImg2 from "../../assets/CareerPageImg2.png";
import CareerImg3 from "../../assets/CareerPageImg3.png";
import { FiArrowRight } from "react-icons/fi";
import { BsGraphUp, BsSearch } from "react-icons/bs";
import { AiOutlineDollarCircle, AiOutlineSetting } from "react-icons/ai";
import { FaGraduationCap, FaBalanceScaleLeft } from "react-icons/fa";
import { MdOutlineWork } from "react-icons/md";
import Newsletter from "../../components/newsletter/Newsletter";

const Career = () => {
  return (
    <div>
      <div className="py-4 px-6 md:py-3 md:px-14 lg:px-20 xl:px-24">
        <div className="py-2">
          <h2 className="text-[color:var(--blue)]">Home / Career</h2>
        </div>

        <div className="flex flex-col md:flex-row md:justify-between md:items-center md:gap-10 lg:gap-20">
          <div className="flex-1">
            <h1 className="text-lg lg:text-xl font-semibold">
              Careers at rework
            </h1>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold max-w-xl tracking-wide py-4">
              <div className="text-[color:var(--blue)] leading-normal">
                Revolutionise{" "}
              </div>
              outsourcing for good
            </h1>
            <p className="md:text-lg">
              Impact, influence and change tech hiring for the better.
            </p>

            <div className="py-4">
              <button className="flex justify-center items-center gap-4 bg-[color:var(--blue)] px-4 py-2 text-white font-semibold rounded-lg">
                Join our Team
                <FiArrowRight size={30} />
              </button>
            </div>
          </div>

          <div className="flex-1">
            <img src={CareerImg} alt="" />
          </div>
        </div>

        <div className="py-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-wide py-4">
            Trending{" "}
            <span className="text-[color:var(--blue)]">Opportunities</span>
          </h1>
          <p className="text-lg lg:text-xl pb-5 lg:pb-8 font-medium">
            We promise you an inclusive work environment where you will fall in
            love with challenging as well as getting challenged.
          </p>
          <div className="flex items-center gap-3 w-full border border-black rounded-full px-5 py-4">
            <input
              type="text"
              placeholder="Search for opportunities"
              className="w-full outline-none text-lg tracking-wide px-3"
            />
            <BsSearch size={30} color="gray" />
          </div>
        </div>

        <div className="py-4 lg:py-8 xl:py-12">
          <div className="py-4 lg:py-8 xl:py-12">
            <h2 className="text-center text-lg md:text-xl lg:text-3xl xl:text-4xl font-semibold mb-3">
              Benefits at{" "}
              <span className="text-[color:var(--blue)]">rework</span>
            </h2>
            <p className="text-center lg:text-2xl lg:font-light">
              100% remote. Contribute to the mission, anywhere in the world.
            </p>
          </div>

          <div className="flex flex-col gap-6 md:flex-row lg:py-6">
            <div className="border-2 px-3 py-4 sm:px-10 sm:py-10 rounded-lg flex flex-col gap-6 shadow-md hover:shadow-lg md:flex-1">
              <div className="flex flex-col justify-center items-center gap-5">
                <BsGraphUp size={35} className="text-[color:var(--blue)]" />
                {/* <img src={Sales} alt="" className="h-40 lg:h-48 object-cover" /> */}
                <h4 className="text-lg lg:text-xl font-semibold">
                  Responsibility & Ownership
                </h4>
              </div>
              <p className="text-center">
                Grow with us as we trust you with the best projects.
                Collaborative and exciting.
              </p>
            </div>

            <div className="border-2 px-3 py-4 sm:px-10 sm:py-10 rounded-lg flex flex-col gap-6 shadow-md hover:shadow-lg md:flex-1">
              <div className="flex flex-col justify-center items-center gap-5">
                <FaGraduationCap
                  size={35}
                  className="text-[color:var(--blue)]"
                />
                {/* <img src={Money} alt="" className="h-40 lg:h-48 object-cover" /> */}
                <h4 className="text-lg lg:text-xl font-semibold">
                  Learning and training
                </h4>
              </div>
              <p className="text-center">
                Keep improving and getting better with support from the
                organisation.
              </p>
            </div>

            <div className="border-2 px-3 py-4 sm:px-10 sm:py-10 rounded-lg flex flex-col gap-6 shadow-md hover:shadow-lg md:flex-1">
              <div className="flex flex-col justify-center items-center gap-5">
                <MdOutlineWork size={35} className="text-[color:var(--blue)]" />
                {/* <img src={Trophy} alt="" className="h-40 lg:h-48 object-cover" /> */}
                <h4 className="text-lg lg:text-xl font-semibold">
                  Hybrid work environment
                </h4>
              </div>
              <p className="text-center">
                Work at the highest efficiency from the office or your balcony.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-6 md:flex-row py-6">
            <div className="border-2 px-3 py-4 sm:px-10 sm:py-10 rounded-lg flex flex-col gap-6 shadow-md hover:shadow-lg md:flex-1">
              <div className="flex flex-col justify-center items-center gap-5">
                <FaBalanceScaleLeft
                  size={35}
                  className="text-[color:var(--blue)]"
                />
                {/* <img src={Sales} alt="" className="h-40 lg:h-48 object-cover" /> */}
                <h4 className="text-lg lg:text-xl font-semibold">
                  Freedom and balance
                </h4>
              </div>
              <p className="text-center">
                With great power comes great responsibility. The power is with
                you.
              </p>
            </div>

            <div className="border-2 px-3 py-4 sm:px-10 sm:py-10 rounded-lg flex flex-col gap-6 shadow-md hover:shadow-lg md:flex-1">
              <div className="flex flex-col justify-center items-center gap-5">
                <AiOutlineDollarCircle
                  size={35}
                  className="text-[color:var(--blue)]"
                />
                {/* <img src={Money} alt="" className="h-40 lg:h-48 object-cover" /> */}
                <h4 className="text-lg lg:text-xl font-semibold">
                  Annual offsites
                </h4>
              </div>
              <p className="text-center">
                All work and no play makes you a dull person. We’re not letting
                that happen.
              </p>
            </div>

            <div className="border-2 px-3 py-4 sm:px-10 sm:py-10 rounded-lg flex flex-col gap-6 shadow-md hover:shadow-lg md:flex-1">
              <div className="flex flex-col justify-center items-center gap-5">
                <AiOutlineSetting
                  size={35}
                  className="text-[color:var(--blue)]"
                />
                {/* <img src={Trophy} alt="" className="h-40 lg:h-48 object-cover" /> */}
                <h4 className="text-lg lg:text-xl font-semibold">
                  Top-notch work equipment
                </h4>
              </div>
              <p className="text-center">
                Be at your most efficient with the latest in technology. Fall in
                love with work.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:justify-between md:items-center md:gap-10 lg:gap-20">
          <div className="flex-1">
            <img src={CareerImg2} alt="" />
          </div>

          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold max-w-xl tracking-wide py-4">
              Why work with{" "}
              <span className="text-[color:var(--blue)] leading-normal">
                rework?
              </span>
            </h1>
            <div className="flex flex-col gap-3 font-medium">
              <p className="md:text-lg">
                Rework promotes a culture of impacting users’ lives with our
                innovations. And we are looking for people who share, understand
                our vision and contribute to it. Our company facilitates an
                environment with open communication, togetherness and equal
                opportunities.
              </p>
              <p className="md:text-lg">
                We’re passionate about constantly expanding and forever keen to
                find dynamic talent. Join us to level up not just the company’s
                benchmarks but your own as well.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:justify-between md:items-center md:gap-10 lg:gap-20">
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold max-w-xl tracking-wide py-4">
              Join the{" "}
              <div className="text-[color:var(--blue)] leading-normal">
                rework team
              </div>
            </h1>
            <p className="md:text-lg font-medium">
              Innovate with the latest and greatest technologies & get to work
              on some of the coolest projects you can imagine.
            </p>

            <div className="py-4">
              <button className="flex justify-center items-center gap-4 bg-[color:var(--blue)] px-4 py-2 text-white font-semibold rounded-lg">
                Apply Now
              </button>
            </div>
          </div>

          <div className="flex-1">
            <img src={CareerImg3} alt="" />
          </div>
        </div>
      </div>

      <Newsletter />
    </div>
  );
};

export default Career;
