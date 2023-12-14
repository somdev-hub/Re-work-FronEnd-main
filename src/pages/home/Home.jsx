import React from "react";
import Contact from "../../components/contact/Contact";
import FAQrecruiter from "../../components/faq/FAQrecruiter";
import Features from "../../components/features/Features";
import Header from "../../components/header/Header";
import HeroRecruiter from "../../components/hero/HeroRecruiter";
import JobsNumbers from "../../components/jobsNumber/JobsNumbers";
import Process from "../../components/process/Process";
import Testimonials from "../../components/testimonials/Testimonials";
import Review from "../../components/review/Review";
 
const Home = () => {
  return (
    <div>
    <div className="w-full h-full">
      <Header />
      {/* added riview component */}
  
      </div>
     {/* Changed the margin in x axis to zero. */}

     <div className="lg:my-0 lg:mx-0">
         <Review />
        <HeroRecruiter />
        <Features />
        <Process />
      </div>

      {/* <JobsNumbers /> */}
      <Testimonials />
      {/* <FAQrecruiter /> */}
      <Contact />
    </div>
  );
};

export default Home;
