import React, { useCallback, useState } from "react";
import signup_background from "../../assets/signup-background.jpg";
import signup_animation from "../../assets/signup-animation.svg";
import signup_clutch from "../../assets/signup-clutch.jpg";
import { Link } from "react-router-dom";
import { baseUrl } from "../../baseUrl";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const [signupForm, setSignupForm] = React.useState({
    fullName: "",
    email: "",
    contactNumber: "",
    password: "",
    role: "recruiter"
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
        <h3 className="text-[3rem] font-[400] font-actor text-[#5C27C0] m-0">
          log in
        </h3>
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
            className="w-full flex items-start gap-2 py-3 px-6 rounded-[0.635rem] bg-white shadow-2xl focus:outline-none font-actor font-[400] text-[1rem] text-[#7B7B7B]"
          />
          {errors.fullName && (
            <p className="text-red-500 text-left text-xs">*Name is required.</p>
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
            className="w-full flex items-start gap-2 py-3 px-6 rounded-[0.635rem] bg-white shadow-2xl focus:outline-none font-actor font-[400] text-[1rem] text-[#7B7B7B]"
          />
          {errors.email && (
            <p className="text-red-500 text-left text-xs">
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
            className="w-full flex items-start gap-2 py-3 px-6 rounded-[0.635rem] bg-white shadow-2xl focus:outline-none font-actor font-[400] text-[1rem] text-[#7B7B7B]"
          />
          {errors.phone && (
            <p className="text-red-500 text-left text-xs">
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
            className="w-full flex items-start gap-2 py-3 px-6 rounded-[0.635rem] bg-white shadow-2xl focus:outline-none font-actor font-[400] text-[1rem] text-[#7B7B7B]"
          />
          {errors.password && (
            <p className="text-red-500 text-left text-xs">
              *Password is required.
            </p>
          )}
          <button
            // onClick={handleSubmit}
            type="submit"
            className="bg-[#5C27C0] w-full py-4 text-white rounded-full font-gilroy-medium font-[400] text-[1rem] mt-8"
          >
            sign up
          </button>
          <p className="font-[400] font-gilroy-medium text-[#7B7B7B] text-[1rem]">
            Already have an account?{" "}
            <span className="text-[#5C27C0]">
              <Link to="/login">Login</Link>
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

export default SignUp;
