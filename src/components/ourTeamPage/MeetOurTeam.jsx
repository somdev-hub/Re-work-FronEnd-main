import React, { useEffect, useState } from "react";
import profile_icon from "../../assets/profile-icon.svg";
import TeamCard from "./TeamCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';
import "swiper/css/navigation";
import "swiper/css";

const MeetOurTeam = () => {
  const [team, setTeam] = useState([]);
  // const team_data = [
  //   {
  //     name: "Ranveer Singh",
  //     designation: "Founder & CEO",
  //     image: profile_icon
  //   },
  //   {
  //     name: "Ranveer Singh",
  //     designation: "Founder & CEO",
  //     image: profile_icon
  //   },
  //   {
  //     name: "Ranveer Singh",
  //     designation: "Founder & CEO",
  //     image: profile_icon
  //   },
  //   {
  //     name: "Ranveer Singh",
  //     designation: "Founder & CEO",
  //     image: profile_icon
  //   },
  //   {
  //     name: "Ranveer Singh",
  //     designation: "Founder & CEO",
  //     image: profile_icon
  //   },
  //   {
  //     name: "Ranveer Singh",
  //     designation: "Founder & CEO",
  //     image: profile_icon
  //   },
  //   {
  //     name: "Ranveer Singh",
  //     designation: "Founder & CEO",
  //     image: profile_icon
  //   }
  // ];
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("/data/team.json");
      const response = await data.json();
      setTeam(response);
      // console.log(team);
    };
    fetchData();
  }, []);
  return (
    <div className="bg-[#5C27C0] py-[2.5rem] sm:py-[5rem] px-0 sm:px-[6.25rem]">
      <h1 className="text-center  text-[2.25rem] sm:text-[4rem] font-[500] font-gilroy-bold leading-[125%] text-white">
        Meet our team
      </h1>
      <div className="hidden sm:flex flex-wrap gap-[1.25rem] mt-8 sm:mt-[5.5rem] justify-center">
        {team.map((item, index) => {
          return (
            <TeamCard
              key={index}
              name={item.name}
              designation={item.designation}
              image={item.image}
            />
          );
        })}
      </div>
      <div className="sm:hidden block mt-8">
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          {team.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <TeamCard
                  name={item.name}
                  designation={item.designation}
                  image={item.image}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default MeetOurTeam;
