import React from "react";
// import "./hero.css";

import Trusted from "../components/ForRecruiters/Trusted";
import Steps from "../components/ForRecruiters/Steps";
import AchievingHeights from "../components/ForRecruiters/AchievingHeights";
import Testimonials from "../components/ForRecruiters/Testimonials";
import CommonQuestions from "../components/ForRecruiters/CommonQuestions";
import Featured from "../components/ForRecruiters/Featured";
import Hero from "../components/ForRecruiters/Hero";

const ForRecruiter = () => {
  return (
    <>
      <Hero />
      <Trusted />
      <Steps />
      <AchievingHeights />
      <Testimonials />
      <CommonQuestions />
      <Featured />
    </>
  );
};

export default ForRecruiter;
