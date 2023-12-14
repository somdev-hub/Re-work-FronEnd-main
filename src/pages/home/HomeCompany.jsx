import React from "react";
import Contact from "../../components/contact/Contact";
import HeroCompany from "../../components/hero/HeroCompany";
import Testimonials from "../../components/testimonials/Testimonials";
import HeaderCompany from "../../components/header/HeaderCompany";
import FeaturesCompany from "../../components/features/FeaturesCompany";
import JobsNumberCompany from "../../components/jobsNumber/JobsNumberCompany";

const HomeCompany = () => {
  return (
    <div>
      <HeaderCompany />
      <div className="block md:hidden fixed top-[50%] right-0">
        <a href="https://www.producthunt.com/posts/rework-ai?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-rework&#0045;ai" target="_blank" rel="noreferrer"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=381945&theme=light" alt="Rework&#0032;AI - India's&#0032;1st&#0032;AI&#0045;Powered&#0032;HR&#0032;freelancing&#0032;platform | Product Hunt" style={{
          width: "120px", height: "50px"
        }} width="120" height="50" /></a>
      </div>
      <div className="lg:border-2 lg:my-10 lg:mx-20 rounded-md shadow-md">
        <HeroCompany />
        <FeaturesCompany />
      </div>

      <JobsNumberCompany/>
      <Testimonials />
      <Contact />
    </div>
  );
};

export default HomeCompany;
