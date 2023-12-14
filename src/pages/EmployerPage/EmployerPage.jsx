import React from "react";
import Header from "./Header";
import "./EmployerPage.css";
import WhyRework from "./WhyRework";
import HowItWorks from "./HowItWorks";
import BestCandidate from "./BestCandidate";
import Benefits from "./Benefits";
import Testimonials from "../../components/testimonials/Testimonials";
import PricingPlans from "./PricingPlans";
import Reviews from "./Reviews";
import GetInTouch from "./GetInTouch";

const EmployerPage = () => {
  return (
    <div>
      <Header />
      <WhyRework />
      <HowItWorks />
      <BestCandidate />
      <Benefits />
      <Testimonials/>
      <PricingPlans/>
      <Reviews/>
      <GetInTouch/>
    </div>
  );
};

export default EmployerPage;
