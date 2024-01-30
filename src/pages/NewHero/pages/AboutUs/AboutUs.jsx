import React from "react";
import about_us_one from "../../assets/about-us-one.svg";
import about_us_two from "../../assets/about-us-two.svg";
import core_value_one from "../../assets/core-value-one.svg";
import core_value_two from "../../assets/core-value-two.svg";
import core_value_three from "../../assets/core-value-three.svg";
import team_member_one from "../../assets/team-member-one.png";
import team_member_two from "../../assets/team-member-two.png";
import team_member_three from "../../assets/team-member-three.png";
import team_member_four from "../../assets/team-member-four.png";
import team_member_five from "../../assets/team-member-five.png";
import team_member_six from "../../assets/team-member-six.png";
import achievement_one from "../../assets/achievements-one.svg";
import achievement_two from "../../assets/achievements-two.svg";
import achievement_three from "../../assets/achievements-three.svg";
import achievement_four from "../../assets/achievements-four.svg";

const AboutUs = () => {
  const team_members = [
    {
      name: "Ranveer Singh",
      position: "Founder & CEO",
      image: team_member_one
    },
    {
      name: "Ankit Rout",
      position: "Full Stack Developer",
      image: team_member_two
    },
    {
      name: "Somdev Behera",
      position: "Full Stack Developer",
      image: team_member_three
    },
    {
      name: "Lavanya Pavada",
      position: "UX/UI Designer",
      image: team_member_four
    },
    {
      name: "Chaitanya Naik",
      position: "UX/UI Designer",
      image: team_member_five
    },
    {
      name: "Abinaya  Boovaraghavan",
      position: "UX/UI Designer",
      image: team_member_six
    }
  ];

  const achievements = [
    {
      image: achievement_one,
      title: "Unmatched Speed in Talent Acquisition",
      numbers: "50%",
      description: "Reduction in Recruitment Turnaround Time (TAT)"
    },
    {
      image: achievement_two,
      title: "Strategic Cost Savings",
      numbers: "60%",
      description: "Decrease in Cost to Hire"
    },
    {
      image: achievement_three,
      title: "Slash hiring costs and maximize efficiency!",
      numbers: "₹0",
      description: "Job Posting Fees"
    },
    {
      image: achievement_four,
      title: "Talent Pipeline Flourishes Within",
      numbers: "24",
      description: "Hours of Engagement"
    }
  ];
  return (
    <div>
      <div className="h-[60vh] md:h-[80vh] 3xl:items-center 3xl:mt-0  flex flex-col items-center justify-center sm:px-0 px-[1rem]">
        <div className="text-center">
          <p className="text-[1.125rem] font-[500] font-poppins">About Us</p>
          <h1 className="2xl:text-[3.125rem] sm:text-[3.1rem] text-[1.5rem] 3xl:text-[6.5rem] font-[500] sm:leading-[5.125rem] 3xl:leading-[9rem] font-garnett-semi-bold heading-h1 py-4">
            Empowering Your Hiring Journey:
          </h1>
          <h1 className="text-[#4C4C4C] sm:text-[2.5rem] 2xl:text-[3.125rem] text-[1.125rem] 3xl:text-[4.5rem] font-400 font-garnett-regular sm:leading-[3rem] 3xl:leading-[6rem]">
            Unveiling the Rework Difference
          </h1>
          <p className="text-center text-[#353535] font-poppins font-[400] text-[0.75rem] sm:text-base 3xl:text-[1.5rem] mt-7 3xl:mt-10">
            Transforming Hiring with A.I. Excellence. Streamlining Your Process,
            <br className="hidden md:inline" />
            Boosting Recruiter Earnings, and Delivering Top-Tier Candidate
            Matches. <br className="hidden md:inline" /> Your Success,
            Simplified.
          </p>
        </div>
        <button className="flex px-[1.5rem] py-[0.5rem] sm:px-[3rem] 2xl:px-[3.5rem] sm:py-[1.1rem] 3xl:mt-[2.5rem] heading-btn rounded-[0.5rem] md:rounded-[1.25rem] text-[#FFFBFB] font-poppins sm:text-[1.2rem] 2xl:text-[1.5rem]  text-[1rem] font-[500] mt-9">
          Get Started
        </button>
      </div>

      <div className="mx-[1.5rem] xl:mx-[7.5rem] my-[4rem] md:my-[8rem] flex gap-4 flex-wrap flex-col md:flex-row">
        <div className="flex flex-col flex-1">
          <div className="">
            <img src={about_us_one} alt="" className="w-[2.25rem] sm:w-auto" />
          </div>
          <p className="text-[#040404] font-garnett-medium text-[1.125rem] font-[500] mt-[1.8rem]">
            Who we are?
          </p>
          <h3 className="text-[#5C27C0] font-garnett-semi-bold text-[1.25rem] sm:text-[1.75rem] font-[600] my-4">
            We are Rework, a team dedicated to supercharging the hiring process
            through our cutting-edge A.I. technology.{" "}
          </h3>
          <p className="text-[#131313] font-poppins text-[14px] md:text-[1.125rem] font-[400]">
            At Rework, we simplify and reduce hiring costs for companies,
            empowering recruiters to earn more by connecting them with top
            employer leads. Our mission is to revolutionize the hiring industry,
            making it easier and more cost-effective for businesses to find and
            hire the best talent through efficient A.I. technology.
          </p>
        </div>
        <div className="flex flex-col flex-1">
          <div className="">
            <img src={about_us_two} alt="" className="w-[2.25rem] sm:w-auto" />
          </div>
          <p className="text-[#040404] font-garnett-medium text-[1.125rem] font-[500] mt-[1.8rem]">
            What we do the best?
          </p>
          <h3 className="text-[#5C27C0] font-garnett-semi-bold text-[1.25rem] sm:text-[1.75rem] font-[600] my-4">
            At Rework, we are committed to making the recruitment process easier
            and more efficient.
          </h3>
          <p className="text-[#131313] font-poppins text-[14px] md:text-[1.125rem] font-[400]">
            We strive to provide the highest quality of service and the best
            possible customer experience. We look forward to helping you
            supercharge your hiring process and find the best candidates for
            your roles.
          </p>
        </div>
      </div>

      <div className="bg-[#5C27C0] px-[1.5rem] xl:px-[7.5rem] py-10 xl:py-[5rem]">
        <h2 className="text-[#FCFCFC] text-[1.5rem] md:text-[2.625rem] font-[400] font-garnett-regular text-center">
          <span className="font-[600] font-garnett-semi-bold">Our Core </span>
          values
        </h2>
        <div className="flex mt-8 md:mt-[5rem] flex-col lg:flex-row">
          <div className="">
            <img src={core_value_one} alt="" className="w-[1.5rem] sm:w-auto" />
            <div className="my-8">
              <h4 className="text-[#FCFCFC] font-garnett-semi-bold text-[1.25rem] md:text-[1.5rem] font-[600]">
                Ensure-impactful
              </h4>
              <p className="text-[#FCFCFC] font-garnett-regular text-[1.25rem] md:text-[1.5rem] font-[400]">
                Innovations
              </p>
            </div>
            <p className="text-white font-poppins font-[400] text-[14px] md:text-base">
              An unwavering commitment to drive maximum customer satisfaction,
              infused with integrity and passion.
            </p>
          </div>
          <div className="my-10 lg:my-0 lg:px-10 lg:mx-10 border-solid lg:border-r-2 lg:border-l-2 border-[#CECECE]">
            <img src={core_value_two} alt="" className="w-[1.5rem] sm:w-auto" />
            <div className="my-8">
              <h4 className="text-[#FCFCFC] font-garnett-semi-bold text-[1.25rem] md:text-[1.5rem] font-[600]">
                Focus on
              </h4>
              <p className="text-[#FCFCFC] font-garnett-regular text-[1.25rem] md:text-[1.5rem] font-[400]">
                self-development
              </p>
            </div>
            <p className="text-white font-poppins font-[400] text-[14px] md:text-base">
              Training and mentorship programs, interactive sessions and
              community meetups to drive personal growth.
            </p>
          </div>
          <div className=" ">
            <img
              src={core_value_three}
              alt=""
              className="w-[1.5rem] sm:w-auto"
            />
            <div className="my-8">
              <h4 className="text-[#FCFCFC] font-garnett-semi-bold text-[1.25rem] md:text-[1.5rem] font-[600]">
                Integrate
              </h4>
              <p className="text-[#FCFCFC] font-garnett-regular text-[1.25rem] md:text-[1.5rem] font-[400]">
                Work-life balance
              </p>
            </div>
            <p className="text-white font-poppins font-[400] text-[14px] md:text-base">
              Latest infrastructure and flexible working hours along with many
              other privileges that inculcate healthy lifestyle choices.
            </p>
          </div>
        </div>
      </div>

      <div className="my-[5rem]">
        <h2 className=" text-[1.5rem] md:text-[2.625rem] font-[400] font-garnett-regular text-center">
          <span className="font-[600] font-garnett-semi-bold heading-h2">
            Meet Our{" "}
          </span>
          Team
        </h2>
        <div className="mx-6 xl:mx-[8rem] grid md:grid-cols-3 md:grid-rows-2 grid-cols-2 justify-items-center gap-0 md:gap-[5rem] justify-center items-center mt-[4rem]">
          {team_members.map((member, index) => {
            return (
              <div
                className="flex flex-col items-center justify-center mb-8 xl:mb-0"
                key={index}
              >
                <img
                  src={member.image}
                  alt=""
                  className="w-[6.25rem] md:w-auto"
                />
                <div className="mt-6">
                  <h4 className="text-[#2C2C2C] text-base md:text-[1.5rem] font-[600] font-garnett-medium text-center">
                    {member.name}
                  </h4>
                  <p className="text-[#2C2C2C] text-center font-garnett-regular text-[14px] md:text-[1.375rem] font-[400]">
                    {member.position}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-[#5C27C0] px-[1.5rem] xl:px-[7.5rem] py-10 xl:py-[5rem]">
        <h2 className="text-[#FCFCFC] text-[1.5rem] md:text-[2.625rem] font-[400] font-garnett-regular text-center">
          <span className="font-[600] font-garnett-semi-bold">Our </span>
          Achievements
        </h2>
        <div className="flex gap-4 mt-8 md:mt-[6.5rem] flex-wrap flex-col md:flex-row">
          {achievements.map((achievement, index) => {
            return (
              <div
                className="bg-[#EFE5FF] rounded-[1.25rem]  p-4 md:p-5 flex flex-col justify-between items-center flex-1 h-[25rem]"
                key={index}
              >
                <img src={achievement.image} alt="" className="w-8 md:w-auto" />
                <p className="text-[#181818] my-4 md:my-0 font-garnett-semi-bold text-[13px] md:text-[1.125rem] font-[600] text-center">
                  {achievement.title}
                </p>
                <h3 className="text-[#181818] mb-4 md:mb-0 text-[1.75rem] md:text-[3.125rem] font-[700] font-space-grotesk text-center">
                  {achievement.numbers}
                </h3>
                <p className="text-[#181818] font-poppins text-[14px] md:text-[1.125rem] font-[400] text-center">
                  {achievement.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
