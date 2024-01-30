import React, { useCallback, useState } from "react";
import main_logo from "../../assets/main-logo.svg";
import { Link } from "react-router-dom";
import { baseUrl } from "../../../../baseUrl";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import signup_asset_one from "../../assets/signup-asset-one.svg";
import signup_asset_two from "../../assets/signup-asset-two.svg";
import signup_asset_three from "../../assets/signup-asset-three.svg";

const Signup = () => {
  const [signupForm, setSignupForm] = React.useState({
    fullName: "",
    email: "",
    contactNumber: "",
    password: "",
    role: "recruiter",
    confirmPassword: ""
  });
  const navigate = useNavigate();
  const [msg, setMsg] = useState(null);
  const [error, setError] = useState(null);

  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e) => {
    if (e.target.name === "contactNumber") {
      const val = e.target.value;
      if (val.length > 10 || val.match(/^[0-9]+$/) === null) {
        return;
      }
    }
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(signupForm);
    setSubmitted(true);
    postSignup(signupForm);
    toast.success("Successfully registered!");
    navigate("/login", { state: "recruiter" });
  };
  const postSignup = useCallback(async (data) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${baseUrl}/auth/signup`, {
        method: "put",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      });

      const jsonData = await res.json();
      setIsLoading(false);
      console.log(jsonData);
      if (!res.ok) {
        setSubmitted(false);
        setIsLoading(false);
        throw new Error(jsonData.message);
      }
      localStorage.setItem("signupEmail", data.email);
      localStorage.setItem("roleForPostJob", "recruiter");
      // setShowOtp(true);
      setError(null);
      setMsg(jsonData.message);
    } catch (error) {
      setMsg(null);
      setError(error.message);
      setIsLoading(false);
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  return (
    <div className="p-4 flex h-screen ">
      <div className="flex flex-1 mt-5 flex-col mx-6 xl:mx-[7.65rem]">
        <div className="">
          <img src={main_logo} alt="" className="w-[7rem] xl:w-auto" />
        </div>
        <div className="flex flex-col flex-1 justify-center">
          <div className="">
            <h3 className="text-[#5C27C0] text-center font-[600] text-[1.75rem] font-garnett-semi-bold">
              Ready to Thrive?
            </h3>
            <p className="text-center font-[600] text-[1.125rem] font-poppins text-[#5C5C5C]">
              <span>Sign Up</span> & Get Started for Free !
            </p>
          </div>
          <form
            action=""
            className="mt-6 flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              {...register("fullName", { required: true })}
              name="fullName"
              onChange={handleChange}
              value={signupForm.fullName}
              type="text"
              placeholder="Full Name"
              className="border-solid border-[1px] border-[#B1B0B0] items-center p-[10px] xl:p-4 flex rounded-[0.625rem] font-poppins font-[400] text-[#1F1F1F] box-border outline-none text-[14px] xl:text-[1rem]"
            />
            {errors.fullName && (
              <p className="text-[#A90E0E] font-poppins text-[14px] font-[400] text-left">
                *Name is required.
              </p>
            )}
            <input
              {...register("email", {
                pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
              })}
              {...register("email", { required: true })}
              name="email"
              onChange={handleChange}
              value={signupForm.email}
              type="text"
              placeholder="Email"
              className="border-solid border-[1px] border-[#B1B0B0] items-center p-[10px] xl:p-4 flex rounded-[0.625rem] font-poppins font-[400] text-[#1F1F1F] box-border outline-none text-[14px] xl:text-[1rem]"
            />
            {errors.email && (
              <p className="text-[#A90E0E] font-poppins text-[14px] font-[400] text-left">
                *Provide valid Email.
              </p>
            )}
            <input
              {...register("phone", { pattern: /^[1-9]{1}[0-9]{9}$/ })}
              {...register("phone", { required: true })}
              name="contactNumber"
              onChange={handleChange}
              value={signupForm.contactNumber}
              placeholder="Contact Number"
              className="border-solid border-[1px] border-[#B1B0B0] items-center p-[10px] xl:p-4 flex rounded-[0.625rem] font-poppins font-[400] text-[#1F1F1F] box-border outline-none text-[14px] xl:text-[1rem]"
            />
            {errors.phone && (
              <p className="text-[#A90E0E] font-poppins text-[14px] font-[400] text-left">
                *Contact Number is required.
              </p>
            )}
            <input
              {...register("password", { required: true })}
              name="password"
              onChange={handleChange}
              value={signupForm.password}
              type="text"
              placeholder="Create Password"
              className="border-solid border-[1px] border-[#B1B0B0] items-center p-[10px] xl:p-4 flex rounded-[0.625rem] font-poppins font-[400] text-[#1F1F1F] box-border outline-none text-[14px] xl:text-[1rem]"
            />
            {errors.password && (
              <p className="text-[#A90E0E] font-poppins text-[14px] font-[400] text-left">
                *Password is required.
              </p>
            )}
            <input
              {...register("password", { required: true })}
              name="password"
              onChange={handleChange}
              value={signupForm.confirmPassword}
              type="text"
              placeholder="Confirm Password"
              className="border-solid border-[1px] border-[#B1B0B0] items-center p-[10px] xl:p-4 flex rounded-[0.625rem] font-poppins font-[400] text-[#1F1F1F] box-border outline-none text-[14px] xl:text-[1rem]"
            />
            {errors.password && (
              <p className="text-[#A90E0E] font-poppins text-[14px] font-[400] text-left">
                *Password is required.
              </p>
            )}
            <button
              // onClick={handleSubmit}
              type="submit"
              className="bg-[#5C27C0] w-full py-[10px] xl:py-4 text-white rounded-2xl xl:rounded-[1.25rem] font-poppins font-[400] text-[1rem] mt-8 shadow-[0px_8px_18px_0px_rgba(174,93,255,0.46)]"
            >
              Sign up
            </button>
            <p className="font-[500] text-center font-poppins text-[#515151] text-[1rem]">
              Already have an account?{" "}
              <span className="text-[#5C27C0] font-[700]">
                <Link to="/login">Login</Link>
              </span>
            </p>
          </form>
        </div>
      </div>
      <div className="flex flex-col flex-1 bg-[#5C27C0] rounded-lg relative overflow-hidden">
        <img src={signup_asset_three} alt="" className="top-0 absolute" />
        <p className="text-[#F5F5F5] font-poppins text-[1rem] font-[400] mt-8 2xl:mt-[4rem] z-10 mx-8 2xl:mx-[5rem]">
          Rework has been a great way to make the hiring process easier and
          faster. We've been able to save money and time, and the recruiters
          have been able to find the best employers leads. Highly recommend!
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

export default Signup;
