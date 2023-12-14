import React, { useState } from "react";
import signup_background from "../../assets/signup-background.jpg";
import signup_clutch from "../../assets/signup-clutch.jpg";
import signup_animation from "../../assets/signup-animation.svg";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../baseUrl";
import { toast, ToastContainer } from "react-toastify";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";

const Login = () => {
  const [loginForm, setLoginForm] = React.useState({
    email: "",
    password: ""
  });
  // const [showPassword, setShowPassword] = useState(false);
  // const [a, setA] = useState(false);
  // const [key, setKey] = useState("");
  const [error, setError] = useState();
  const navigation = useNavigate();
  // const authCtx = useContext(AuthContext);
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
    <div className="flex h-screen overflow-hidden">
      <div className="w-1/2 relative">
        <img
          src={signup_background}
          alt=""
          className="h-full w-full object-cover absolute z-[-10]"
        />
        <img
          src={signup_animation}
          className="absolute top-[20%] left-[10%]"
          alt=""
        />
      </div>
      <div className="w-1/2 pr-[9rem] pl-[6rem] my-auto">
        <h3 className="text-[3rem] font-[400] font-actor text-[#5C27C0] m-0 relative">
          welcome back
        </h3>
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
            className="w-full flex items-start gap-2 py-3 px-6 rounded-[0.635rem] bg-white shadow-2xl focus:outline-none font-actor font-[400] text-[1rem] text-[#7B7B7B]"
          />
          {errors.email && (
            <p className="text-red-500 text-left text-xs">
              *Provide valid Email.
            </p>
          )}
          <input
            {...register("password", { required: true })}
            name="password"
            onChange={handleChange}
            value={loginForm.password}
            type="password"
            placeholder="Password"
            className="w-full flex items-start gap-2 py-3 px-6 rounded-[0.635rem] bg-white shadow-2xl focus:outline-none font-actor font-[400] text-[1rem] text-[#7B7B7B]"
          />
          {errors.password && (
            <p className="text-red-500 text-left text-xs">
              *Password is required.
            </p>
          )}
          <p className="text-right cursor-pointer text-[1rem] font-gilroy-medium font-[400] text-[#5C27C0]">
            Forgot password?
          </p>
          <button
            type="submit"
            className="bg-[#5C27C0] w-full py-4 text-white rounded-full font-gilroy-medium font-[400] text-[1rem] mt-8"
          >
            sign up
          </button>
          <p className="font-[400] font-gilroy-medium text-[#7B7B7B] text-[1rem]">
            Don't have an account?{" "}
            <span className="text-[#5C27C0]">
              <Link to="/signup">Sign Up</Link>
            </span>
          </p>
        </form>
        <img
          src={signup_clutch}
          className="absolute bottom-[3%] right-[1%] w-[6rem]"
          alt=""
        />
      </div>
    </div>
  );
};

export default Login;
