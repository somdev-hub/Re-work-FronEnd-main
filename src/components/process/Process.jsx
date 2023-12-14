import React, { useState } from "react";
// Removed old assets.

// Import new assets
import step1 from '../../assets/step-1.png'
import step2 from '../../assets/step-2.png'
import step3 from '../../assets/step-3.png'
import step4 from '../../assets/step-4.png'

// imported right arrow
import { HiOutlineArrowSmallRight } from "react-icons/hi2";

import Register from "../../pages/register/Register";


// Added Get started button component with all previous functionalties.

const GetStarted = () => {
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  // removed use state functionalities from checked though it has no use.
  const checked = true;

  return (
    <div>
      <button
        onClick={() => setOpenRegisterModal(true)}
        className="flex laptop:py-[12.8px] laptop:pr-[14.7px] laptop:pl-[18.3px] items-center justify-center laptop:gap-[8.586px] laptop:rounded-[45.833px] laptop:border-[2.933px] border-[#5C27C0] laptop:text-[20.608px] leading-normal text-[#5C27C0] hover:bg-[#5C27C0] font-gilroy-semi-bold hover:text-white transition-all duration-150"
      >
        get started <span><HiOutlineArrowSmallRight /></span>
      </button>
      <Register
        openRegisterModal={openRegisterModal}
        setOpenRegisterModal={setOpenRegisterModal}
        activeState="recruiters"
        checked={checked}
      />
      {/* Removed FAQ button */}
    </div>
  );
}


// Added StepsCards component for cards with reposive design.

const StepsCards = ({ steps, stepsimg, title, content }) => {
  return (
    <div>
      <div className="mobile:hidden laptop:flex justify-center items-center rounded-[94.426px] shadow-3xl pt-[12px] pb-[10.8px] w-[76.8px] bg-[#5C27C0] text-white relative top-[40px] left-[98px] text-[36px] font-poppins text-center leading-normal">{steps}</div>
      <div className="bg-white flex flex-col mobile:py-[56px] mobile:px-[24px] mobile:gap-[24px] laptop:w-[274px] tablet:w-[468px] tablet:h-[449px] tablet:py-[72px] tablet:px-[32px] tablet:gap-[32px] laptop:h-[auto] laptop:py-[56px] laptop:px-[24px] laptop:gap-[24px] justify-center items-center rounded-[16px] shadow-3xl">
        <img src={stepsimg} alt="" className="mobile:w-[67.184px] mobile:h-[67.322px] tablet:w-[84.211px] tablet:h-[84.383px] laptop:w-[64px] laptop:h-[64px]" />
        <h5 className="text-[#202020] laptop:block mobile:flex gap-[5px] laptop:text-[24px] tablet:text-[36px] mobile:text-[28px] font-quicksand-medium leading-[120%]"><span className="laptop:hidden tablet:block font-quicksand-medium">{steps}.</span>{title}</h5>
        <p className="self-stretch text-center font-quicksand-medium laptop:text-[20px] tablet:text-[24px] mobile:text-[20px] text-[#7b7b7b] leading-[120%]">{content}</p>
      </div>
    </div>
  )
}


const Process = () => {

  return (
    <div>
      {/* div for laptop */}
      {/* Added fixed height div for destop version */}
      <div className="laptop:block mobile:hidden h-[772px] pb-80px">
        {/* Added purple section for desktop screens */}
        <div className="h-[396px] bg-[#5C27C0] pt-[80px] text-white">
          {/* Added heading */}
          <h1 className="font-gilroy-semi-bold text-[64px] leading-[125%] text-center">steps to earn</h1>
        </div>
        {/* Added div for cards and button with relative position to match the figma design  */}
        <div className="relative top-[-250px] flex flex-col justify-center items-center gap-[64px]">
          {/* added div for cards and added cards components with props */}
          <div className="cards flex flex-nowrap content-start justify-center items-start gap-[32px]">
            <StepsCards steps={1} stepsimg={step1} title={"Sign Up"} content={"Follow the link below to sign up and get access of the current job postings"} />
            <StepsCards steps={2} stepsimg={step2} title={"Upload Details"} content={"Shortlist the most qualified candidate and upload their details for the top companies"} />
            <StepsCards steps={3} stepsimg={step3} title={"Selection Process"} content={"Candidate profile goes through AI-powered shortlisting and selection process"} />
            <div>
              {/* Have to extra div for last card because of some line break which was not possible in props. */}
              <div className="flex justify-center items-center rounded-[94.426px] shadow-3xl pt-[12px] pb-[10.8px] w-[76.8px] bg-[#5C27C0] text-white relative top-[40px] left-[98px] text-[36px] font-poppins text-center leading-normal">4</div>
              <div className="bg-white flex flex-col w-[274px] h-[auto] py-[56px] px-[24px] gap-[24px] justify-center items-center rounded-[16px] shadow-3xl">
                <img src={step4} alt="" className="mobile:w-[67.184px] mobile:h-[67.322px] tablet:w-[84.211px] tablet:h-[84.383px] laptop:w-[64px] laptop:h-[64px]" />
                <h5 className="text-[#202020] text-[24px] font-quicksand-medium leading-[120%]">Get Rewards</h5>
                <p className="self-stretch text-center font-quicksand-medium text-[20px] text-[#7b7b7b] leading-[120%]">Viola! <br /> As soon as the candidate gets selected you get your benefits</p>
              </div>
            </div>
          </div>
          <GetStarted />
        </div>
      </div>
      {/* div for mobile and tablet */}
      {/* Added div for mobile and tablet version not included get started button as it was not present in the figma for tablet and mobile versions. */}
      <div className="laptop:hidden mobile:flex flex-col items-center self-stretch bg-[#5C27C0] gap-[44px] mobile:py-[40px] mobile:px-[24px] tablet:pt-[102px] tablet:pb-[151.62px] tablet:px-[32px]" >
        {/* Added heading for tablet and mobile screens. */}
        <h1 className="text-white font-gilroy-semi-bold tablet:text-[64px] mobile:text-[36px] leading-[125%]">steps to earn</h1>
        {/* Added div for cards */}
        <div className="flex justify-center items-start content-start tablet:gap-[24px] mobile:gap-[28px] flex-wrap">
          <StepsCards stepsimg={step1} steps={1} title={"Sign Up"} content={"Follow the link below to sign up and get access of the current job postings"} />
          <StepsCards steps={2} stepsimg={step2} title={"Upload Details"} content={"Shortlist the most qualified candidate and upload their details for the top companies"} />
          <StepsCards steps={3} stepsimg={step3} title={"Selection Process"} content={"Candidate profile goes through AI-powered shortlisting and selection process"} />
          <div>
            {/* Have to extra div for last card because of some line break which was not possible in props for tablet and mobile versions. */}
            <div className="bg-white flex flex-col mobile:py-[56px] mobile:px-[24px] mobile:gap-[24px] laptop:w-[274px] tablet:w-[468px] tablet:h-[449px] tablet:py-[72px] tablet:px-[32px] tablet:gap-[32px] laptop:h-[auto] laptop:py-[56px] laptop:px-[24px] laptop:gap-[24px] justify-center items-center rounded-[16px] shadow-3xl">
              <img src={step4} alt="" className="mobile:w-[67.184px] mobile:h-[67.322px] tablet:w-[84.211px] tablet:h-[84.383px] laptop:w-[64px] laptop:h-[64px]" />
              <h5 className="text-[#202020] laptop:block mobile:flex gap-[5px] laptop:text-[24px] tablet:text-[36px] mobile:text-[28px] font-quicksand-medium leading-[120%]"><span className="laptop:hidden tablet:block font-quicksand-medium">4.</span>Get Rewards</h5>
              <p className="self-stretch text-center font-quicksand-medium laptop:text-[20px] tablet:text-[24px] mobile:text-[20px] text-[#7b7b7b] leading-[120%]">Viola! <br /> As soon as the candidate gets selected you get your benefits</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    // removed how its works section.
  );
};

export default Process;
