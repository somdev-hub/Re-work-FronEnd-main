import React, { useCallback, useState } from "react";
import main_logo from "../../assets/main-logo.svg";

import signup_asset_one from "../../assets/signup-asset-one.svg";
import signup_asset_two from "../../assets/signup-asset-two.svg";
import signup_asset_three from "../../assets/signup-asset-three.svg";

const ForgetPassword = () => {
  const [step, setStep] = useState(1);
  const handleSteps = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };
  const setSteps = (e, num) => {
    e.preventDefault();
    if (step >= num) setStep(num);
  };
  return (
    <div className="p-4 flex h-screen ">
      <div className="flex flex-1 mt-5 flex-col mx-6 xl:mx-[7.65rem]">
        <div className="">
          <img src={main_logo} alt="" className="w-[7rem] xl:w-auto" />
        </div>
        <div className="flex flex-col flex-1 justify-center">
          <div className="">
            <h3 className="text-[#5C27C0] text-center font-[600] text-[1.75rem] font-garnett-semi-bold">
              Forget Password
            </h3>
            <p className="text-center font-[600] mt-3 text-[1.125rem] font-poppins text-[#5C5C5C]">
              Reset your password in just 3 easy steps
            </p>
          </div>
          <div className="relative flex  my-10 justify-between">
            <div
              onClick={(e) => setSteps(e, 1)}
              className="bg-[#5C27C0] rounded-full w-12 h-12 font-space-grotesk text-[1.5rem] font-[700] flex justify-center items-center text-white cursor-pointer"
            >
              1
            </div>
            <div
              className={`border-dashed ${
                step >= 2 ? "border-[#5C27C0]" : "border-[#AD93DF]"
              } absolute top-1/2 border-t-2 w-1/2 -z-10 `}
            ></div>
            <div
              onClick={(e) => setSteps(e, 2)}
              className={`${
                step >= 2 ? "bg-[#5C27C0]" : "bg-[#EFE5FF]"
              } rounded-full w-12 h-12 font-space-grotesk text-[1.5rem] font-[700] flex justify-center items-center text-white cursor-pointer`}
            >
              2
            </div>
            <div
              className={`border-dashed ${
                step === 3 ? "border-[#5C27C0]" : " border-[#AD93DF]"
              } absolute top-1/2 border-t-2 w-1/2 -z-10 left-1/2 `}
            ></div>
            <div
              onClick={(e) => setSteps(e, 3)}
              className={`${
                step === 3 ? "bg-[#5C27C0]" : "bg-[#EFE5FF]"
              } rounded-full w-12 h-12 font-space-grotesk text-[1.5rem] font-[700] flex justify-center items-center text-white cursor-pointer`}
            >
              3
            </div>
          </div>
          <p className="text-center font-[400] text-[1.125rem] font-poppins text-[#5C5C5C]">
            {step === 1
              ? " Enter your Registered email ID"
              : step === 2
              ? " An OTP is sent to your registered Email ID"
              : "Enter your New Password and Confirm it."}
          </p>
          <form action="" className="mt-10 flex flex-col gap-4">
            {step === 1 ? (
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="border-solid border-[1px] border-[#B1B0B0] items-center p-[10px] xl:p-4 flex rounded-[0.625rem] font-poppins font-[400] text-[#1F1F1F] box-border outline-none text-[14px] xl:text-[1rem]"
              />
            ) : step === 2 ? (
              <input
                name="email"
                type="number"
                placeholder="Enter OTP"
                className="border-solid border-[1px] border-[#B1B0B0] items-center p-[10px] xl:p-4 flex rounded-[0.625rem] font-poppins font-[400] text-[#1F1F1F] box-border outline-none text-[14px] xl:text-[1rem]"
              />
            ) : (
              <>
                <input
                  name="email"
                  type="email"
                  placeholder="New Email"
                  className="border-solid border-[1px] border-[#B1B0B0] items-center p-[10px] xl:p-4 flex rounded-[0.625rem] font-poppins font-[400] text-[#1F1F1F] box-border outline-none text-[14px] xl:text-[1rem]"
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Confirm Email"
                  className="border-solid border-[1px] border-[#B1B0B0] items-center p-[10px] xl:p-4 flex rounded-[0.625rem] font-poppins font-[400] text-[#1F1F1F] box-border outline-none text-[14px] xl:text-[1rem]"
                />
              </>
            )}

            <button
              // onClick={handleSubmit}
              onClick={handleSteps}
              //   type="submit"
              className="bg-[#5C27C0] w-full py-[10px] xl:py-4 text-white rounded-2xl xl:rounded-[1.25rem] font-poppins font-[400] text-[1rem]  shadow-[0px_8px_18px_0px_rgba(174,93,255,0.46)] mt-[5rem]"
            >
              {step === 3 ? "Change Password" : "Next"}
            </button>
          </form>
        </div>
      </div>
      <div className="flex flex-col flex-1 bg-[#5C27C0] rounded-lg relative overflow-hidden">
        <img src={signup_asset_three} alt="" className="top-0 absolute" />
        <p className="text-[#F5F5F5] font-poppins text-[1rem] font-[400] mt-8 2xl:mt-[4rem] z-10 mx-8 2xl:mx-[5rem]">
          Rework has been a great way to make the hiring process easier and
          faster. We've been able to save money and time, and the recruiters
          have been able to find the best employers leads. Highly recommend!{" "}
        </p>
        <p className="text-[#D8C5FC] font-garnett-medium text-[14px] font-[500] z-10 mx-[5rem] mt-5">
          -------- Teresa Webb, Product Manager
        </p>
        <img
          src={signup_asset_one}
          alt=""
          className="absolute w-[60%] top-[33%] right-[5%]"
        />
        <img
          src={signup_asset_two}
          alt=""
          className="absolute w-[40%] bottom-[12%] left-[10%]"
        />
      </div>
    </div>
  );
};

export default ForgetPassword;
