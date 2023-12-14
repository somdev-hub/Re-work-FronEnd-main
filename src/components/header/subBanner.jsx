import React from "react";
import AI from "../../assets/AI.png";
import group from "../../assets/group.png";
import money from "../../assets/money.png";

const SubBanner = () => {
  return (
    <section className="md:absolute relative my-10 md:my-0 right-0 top-0 md:top-[49.5%] xl:top-[341px] 2xl:top-[448px] z-20 flex flex-col gap-[16px] 2xl:gap-[21px]">
      <section className="rounded-[10.705px] 2xl:rounded-[14px] flex items-center justify-center gap-[10.705px] py-[6.7px] 2xl:py-[8px] 2xl:px-[24px] shadow-[0_2.4px_8px_2.676px_rgba(0,0,0,0.12)] bg-white relative md:right-[95%] h-[85px] w-[310px] xl:w-[326px] 2xl:w-[412px] md:h-[82px] 2xl:h-[110px] xl:right-[106%] 2xl:right-[111%]">
        <img
          src={AI}
          alt="AI"
          className="w-[55px] 2xl:w-[70px] h-[55px] 2xl:h-[70px] object-contain"
        />
        <div className="flex flex-col gap-[6px]">
          <h3 className="text-[#505050] text-[16px] 2xl:text-[20px] font-gilroy-bold font-normal">
            AI-Powered Shortlisting
          </h3>
          <p className="text-[#505050] text-[10px] xs:text-[12px] 2xl:text-[16px] font-quicksand w-[210px] lg:w-[210px] 2xl:w-[280px] font-medium leading-tight">
            Save time spent in manually sourcing & screening candidates.
          </p>
        </div>
      </section>
      <section className="rounded-[10.705px] 2xl:rounded-[14px] flex items-center justify-center py-[6.7px] 2xl:py-[8px] px-[16px] 2xl:px-[24px] shadow-[0_2.4px_8px_2.676px_rgba(0,0,0,0.12)] bg-white relative md:right-[112%] xl:right-[121%] 2xl:right-[126%] right-0 h-[85px] w-[310px] xl:w-[326px] 2xl:w-[412px] md:h-[82px] 2xl:h-[110px] gap-[10.705px]">
        <img
          src={group}
          alt=""
          className="w-[55px] 2xl:w-[70px] h-[55px] 2xl:h-[70px] object-contain"
        />
        <div className="flex flex-col gap-[6px]">
          <h3 className="text-[#505050] text-[16px] 2xl:text-[20px] font-gilroy-bold  font-normal">
            Backed by Community
          </h3>
          <p className="text-[#505050] text-[10px] xs:tetx-[12px] 2xl:text-[16px] font-quicksand w-[240px] lg:w-[210px] 2xl:w-[280px] font-medium leading-tight">
            Build XL-sized pipelines of relevant candidates.
          </p>
        </div>
      </section>
      <section className="rounded-[10.705px] 2xl:rounded-[14px] flex items-center justify-center py-[6.7px] 2xl:py-[8px] px-[16px] 2xl:px-[24px] shadow-[0_2.4px_8px_2.676px_rgba(0,0,0,0.12)] bg-white relative md:right-[96%] xl:right-[105%] 2xl:right-[108%] h-[85px] w-[310px] xl:w-[326px] 2xl:w-[412px] md:h-[82px] 2xl:h-[110px] gap-[10.705px]">
        <img
          src={money}
          alt=""
          className="w-[55px] 2xl:w-[70px] h-[55px] 2xl:h-[70px] object-contain"
        />
        <div className="flex flex-col gap-[6px]">
          <h3 className="text-[#505050] text-[16px] 2xl:text-[20px] font-gilroy-bold  font-normal">
            Hassle-free Payouts
          </h3>
          <p className="text-[#505050] text-[10px] xs:text-[12px] 2xl:text-[16px] font-quicksand w-[240px] lg:w-[210px] 2xl:w-[280px] font-medium leading-tight">
            Eliminate hefty closure fees & expensive database subscriptions.
          </p>
        </div>
      </section>
    </section>
  );
};

export default SubBanner;
