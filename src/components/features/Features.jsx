import React from "react";

// Removed previous imports

// imported Images from assets folder
import sales from "../../assets/features-1.png";
import commision from "../../assets/features-2.png";
import perks from "../../assets/features-3.png";

// Added Features cards accepts img title and content of the cards with required colors and fonts

const FeaturesCard = ({ cardImg, cardTitle, cardContent }) => {
  return (
    <div className="flex flex-col justify-center items-center md:w-[399px] md:h-[364px] 2xl:w-[480px] 2xl:h-[473px] xs:px-[56px] xs:py-[64px] sm:px-[40px] sm:pt-[60px] sm:pb-[84px] sm:gap-[15.622px] xl:pb-[64px] xl:px-[32px] xl:pt-[48px] 2xl:px-[20px] 2xl:pt-[60px] 2xl:pb-[84px] gap-[12px] xl:rounded-[16px] sm:rounded-[20.83px] xs:rounded-[15.659px] shadow-3xl">
      <img
        src={cardImg}
        alt="features image"
        className="h-[64px] w-[64px] 2xl:w-[84px] 2xl:h-[84px] mb-[24px] 2xl:mb-[30px]"
      />
      <h5 className="font-gilroy-semi-bold text-center text-[28px] md:text-[32px] 2xl:text-[40px] text-[#202020]">
        {cardTitle}
      </h5>
      <p className="font-quicksand text-[20px]  2xl:text-[28px] w-[228px] sm:w-[312px] 2xl:w-[436px] text-[#505050] text-center leading-[120%]">
        {cardContent}
      </p>
    </div>
  );
};

const Features = () => {
  return (
    // Changed the styling using tailwind. NOTE: This design is fully resposive as given in figma.
    <div className="lg:mb-[110px] 2xl:my-[80px] sm:p-0 px-[24px] py-[41.602px] sm:my-[40px] lg:my-[102px] xs:flex sm:block flex-col gap-[44px] xs:gap-0">
      {/* Changed the old heading heading with new font and color */}

      <h2 className="text-center mb-[44px] xs:mb-0 md:mb-[40px] 2xl:mb-[44px] xs:text-[36px] sm:text-[64px] 2xl:text-[84px]font-gilroy-semi-bold text-[#202020] leading-[125%]">
        amazing{" "}
        <span className="text-[#5c27c0] font-gilroy-semi-bold">features</span>
      </h2>

      {/* Removed the old cards sections and changed the old styles with new */}

      <div className="cards flex xs:py-[41.6px] sm:gap-[24px] xl:flex-nowrap content-start justify-center items-start xs:gap-[16px] xl:gap-[16px] 2xl:gap-[20px] xl:mx-[106px] flex-wrap">
        {/* Used the featuredcard component with the appropriate props. */}

        <FeaturesCard
          cardImg={sales}
          cardTitle={"Automated sales"}
          cardContent={
            "Providing you unlimited access to steady stream of jobs so that you can source more, to earn more."
          }
        />
        <FeaturesCard
          cardImg={commision}
          cardTitle={"Highest commission"}
          cardContent={
            "Offering the top commission with no sales or admin work. Best benefits for the best resourcing efforts."
          }
        />
        <FeaturesCard
          cardImg={perks}
          cardTitle={"Community perks"}
          cardContent={
            "With our community, you get to enjoy milestone based increment, insurance coverage, and free training programs"
          }
        />
      </div>
    </div>
  );
};

export default Features;
