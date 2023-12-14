import React from "react";
import Hero from "../../components/ourTeamPage/Hero";
import MeetOurTeam from "../../components/ourTeamPage/MeetOurTeam";
import OurAchievements from "../../components/ourTeamPage/OurAchievements";
import CoreValues from "../../components/ourTeamPage/CoreValues";
import "./OurTeam.css";

const OurTeam = () => {
  return (
    <div className="">
      <Hero />
      <MeetOurTeam />
      <div className="mx-[1.5rem] md:mx-[6.25rem]">
        <OurAchievements />
        <CoreValues />
      </div>
    </div>
  );
};

export default OurTeam;
