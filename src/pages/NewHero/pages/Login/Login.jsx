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
import eye from "../../assets/eye.svg";
import eye_off from "../../assets/eye-off.svg";

const Login = () => {
  const [loginForm, setLoginForm] = React.useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState();
  const navigation = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    console.log(loginForm);
    postLogin(loginForm);
  };
  let postLogin = async (loginData) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${baseUrl}/auth/login`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(loginData)
        },
        []
      );

      const jsonData = await res.json();
      setIsLoading(false);
      if (!res.ok) {
        setIsLoading(false);
        throw new Error(jsonData.message);
      }
      setError(null);
      const expirationTime = new Date(
        new Date().getTime() + +jsonData.expiresIn * 1000
      );

      // authCtx.login(
      //   jsonData.token,
      //   expirationTime.toISOString(),
      //   jsonData.userName,
      //   jsonData.userId,
      //   jsonData.email,
      //   jsonData.userRole,
      //   jsonData.companyName,
      //   jsonData.dashboard,
      //   jsonData.company,
      //   jsonData.manageRoles,
      //   jsonData.forms,
      //   jsonData.recruiter,
      //   jsonData.referral,
      //   jsonData.cms,
      //   jsonData.payment
      // );

      navigation("/recruiter");
      setIsLoading(false);
      // console.log("hello");
      // setTimeout(()=>{
      //  navigation("/recruiter");
      //   console.log(jsonData);
      // },300);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };
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
              {...register("email", {
                pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
              })}
              {...register("email", { required: true })}
              name="email"
              onChange={handleChange}
              value={loginForm.email}
              type="email"
              placeholder="Email"
              className="border-solid border-[1px] border-[#B1B0B0] items-center p-[10px] xl:p-4 flex rounded-[0.625rem] font-poppins font-[400] text-[#1F1F1F] box-border outline-none text-[14px] xl:text-[1rem]"
            />
            {errors.email && (
              <p className="text-red-500 text-left text-xs">
                *Provide valid Email.
              </p>
            )}
            <div className="relative w-full">
              <input
                {...register("password", { required: true })}
                name="password"
                onChange={handleChange}
                value={loginForm.password}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="border-solid border-[1px] border-[#B1B0B0] items-center p-[10px] w-full xl:p-4 flex rounded-[0.625rem] font-poppins font-[400] text-[#1F1F1F] box-border outline-none text-[14px] xl:text-[1rem]"
              />
              {showPassword ? (
                <img
                  src={eye_off}
                  className="absolute bottom-[20%] xl:bottom-[30%] right-[2%] cursor-pointer"
                  alt=""
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <img
                  src={eye}
                  className="absolute bottom-[20%] xl:bottom-[30%] right-[2%] cursor-pointer"
                  alt=""
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>
            {errors.password && (
              <p className="text-red-500 text-left text-xs">
                *Password is required.
              </p>
            )}
            <Link
              to="/forgetpassword"
              className="text-right cursor-pointer text-[1rem] font-poppins font-[600] text-[#5C27C0]"
            >
              Forgot password?
            </Link>
            <button
              // onClick={handleSubmit}
              type="submit"
              className="bg-[#5C27C0] w-full py-[10px] xl:py-4 text-white rounded-2xl xl:rounded-[1.25rem] font-poppins font-[400] text-[1rem] mt-8 shadow-[0px_8px_18px_0px_rgba(174,93,255,0.46)]"
            >
              Sign up
            </button>
            <p className="font-[500] text-center font-poppins text-[#515151] text-[1rem]">
              Don’t have an account?{" "}
              <span className="text-[#5C27C0] font-[700]">
                <Link to="/signup">Sign Up</Link>
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

export default Login;
