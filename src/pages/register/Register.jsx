import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AiOutlineEyeInvisible,
  AiOutlineEye,
  AiFillLinkedin,
} from "react-icons/ai";
import { useForm } from "react-hook-form";
import { Modal, useMantineTheme } from "@mantine/core";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import { baseUrl } from "../../baseUrl";
import sidepic from "../../assets/signUp.svg";
import vector from "../../assets/Vector.svg";
import { FcGoogle } from "react-icons/fc";
import Login from "../login/Login";
import { auth, provider } from "../../pages/google/firebase";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import { ThreeDots } from "react-loader-spinner";
import { async } from "@firebase/util";
const Register = ({ openRegisterModal, setOpenRegisterModal, activeState, checked, setChecked }) => {
  const theme = useMantineTheme();
  const [showOtp, setShowOtp] = useState(false)
  const [active, setActive] = useState(activeState);
  const [isLoading, setIsLoading] = useState(false)
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const authCtx = useContext(AuthContext);
  const navigation = useNavigate();
  const [DirctError, setDError] = useState('')
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      const firstName = result.user.displayName;
      const email = result.user.email;
      const phoneNumber = result.user.phoneNumber;
      const password = result.user.uid;
      const data = {
        fullName: firstName,
        email: email,
        phoneNumber: phoneNumber,
        password: password,
        role: "google",

      };
      fetch(`${baseUrl}/auth/signup`, {
        method: "put",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.status !== 201) {
            res.json().then((data) => {
              setDError(data.message)
            });

          } else {

            return (res.json())
          }
        })
        .then((jsonData) => {
          const loginData = { password, email, role: "recruiter" };
          fetch(`${baseUrl}/auth/login`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(loginData),
          }).then((res) => {
            if (res.status !== 200) {
              res.json().then((data) => {
                setDError(data.message)
              });

            } else {

              return (res.json())
            }
          })
            .then((jsonData) => {
              console.log(jsonData);
              const expirationTime = new Date(
                new Date().getTime() + +jsonData.expiresIn * 1000
              );

              authCtx.login(
                jsonData.token,
                expirationTime.toISOString(),
                jsonData.userName,
                jsonData.userId,
                jsonData.email,
                jsonData.userRole,
                jsonData.companyName,
                jsonData.dashboard,
                jsonData.company,
                jsonData.manageRoles,
                jsonData.forms,
                jsonData.recruiter,
                jsonData.referral,
                jsonData.cms,
                jsonData.payment
              );
              setShowOtp(true)
              // navigation("/recruiter");


            })
        });
    });
  };

  // handling OTP Function
  const handleOtp = async (event) => {
    event.preventDefault()
    const otp = event.target.otp.value;

    if (otp === '') {
      return toast.error('Provide a valid OTP')
    }
    try {
      const result = await fetch(`${baseUrl}/auth/emailOtpVerification`, {
        method: "post",
        body: JSON.stringify({ email: localStorage.getItem("signupEmail"), otp, role: window.localStorage.getItem('roleForPostJob') }),
        headers: {
          'content-type': 'application/json'
        }
      });

      const jsonData = await result.json();
      if (!result.ok) {
        toast.error(jsonData.message)
        throw new Error(jsonData.message);
      }

      // setOpenRegisterModal(false);
      setShowOtp(false)
      setOpenLoginModal(true)

    } catch (error) {
      console.log(error);
    }

  }



  let resendHandler = async () => {
    try {

      const res = await fetch(`${baseUrl}/auth/resendEmailVerificationCode`, {
        method: 'POST',
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: window.localStorage.getItem('signupEmail') })
      })
      const jsonData = await res.json()
      if (!res.ok) {
        toast.error(jsonData.message)

        throw new Error(jsonData.message)
      }
      // here message gone 
      toast.success(jsonData.message)

    } catch (error) {
      console.log(error);
    }
  } 

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      overflow="inside"
      size="xl"
      centered
      opened={openRegisterModal}
      onClose={() => {
        setOpenRegisterModal(false);
        setShowOtp(false)
      }}
      withCloseButton={false}
      transition="fade"
      transitionDuration={500}
      transitionTimingFunction="ease"
      padding="0"
    >
      <div className="md:pr-10">
        <div
          className="absolute top-1 right-1 cursor-pointer flex flex-col items-center"
          onClick={() => {
            setOpenRegisterModal(false);
            setShowOtp(false)
          }}
        >
          <AiOutlineCloseCircle className=" text-xl md:text-2xl text-red-500" />
          {/* <span className="font-semibold text-red-500">Close</span> */}
        </div>

        <div className="flex gap-5 justify-center">
          <div className={`hidden md:inline-flex flex-1 bg-gradient-to-r from-[#444DA1] to-[#2068FF] ${showOtp && 'md:py-20 lg:py-28'}`}>
            <img
              src={sidepic}
              alt=""
              className="w-60 h-60 object-cover m-auto"
            />
          </div>
          {
            !showOtp ?
              <div className="md:flex-1 flex flex-col gap-1 p-5">
                <div>
                  <h3 className="text-lg text-center font-semibold">
                    Get started with{" "}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2068FF] to-[#444DA1]">
                      rework!
                    </span>
                  </h3>
                </div>

                {/* {
              checked ?
                // active === 'recruiters' ?

                <div className="flex gap-5 items-center justify-center">
                  <p>Sign up with</p>
                  <FcGoogle
                    onClick={() => {
                      signInWithGoogle();
                    }}
                    size={35}
                    className="border rounded-full p-1.5 hover:bg-gray-200 cursor-pointer"
                  />
                  <AiFillLinkedin
                    size={35}
                    className="border rounded-full p-1.5 hover:bg-gray-200 text-blue-800 cursor-pointer"
                  />
                </div> : ''

            } */}

                <div className="flex overflow-hidden justify-center gap-2 sm:gap-4">
                  <label className="flex p-2 xs:items-center sm:items-start cursor-pointer border rounded-full">
                    <input
                      className="my-auto transform scale-125"
                      type="radio"
                      name="role"
                      value={"recruiters"}
                      onClick={() => {
                        setActive("recruiters");
                        setChecked(true)
                      }}
                      // checked={active === "recruiters" && true}
                      checked={checked}
                    />
                    <span className="px-2 text-sm">Recruiter</span>
                  </label>

                  <label className="flex xs:items-center sm:items-start p-2 cursor-pointer border rounded-full">
                    <input
                      className="my-auto transform scale-125"
                      type="radio"
                      name="role"
                      value={"company"}
                      onClick={() => {
                        setActive("company");
                        setChecked(false)
                      }}
                      checked={!checked}
                    // checked={active === "company" && true}
                    />
                    <span className="px-2 text-sm">Company</span>
                  </label>
                </div>

                {checked ? (
                  <RegisterAsRecruiter
                    DirctError={DirctError}
                    showOtp={showOtp}
                    setShowOtp={setShowOtp}
                  />
                ) : (
                  <RegisterAsCompany
                    showOtp={showOtp}
                    setShowOtp={setShowOtp}
                  />
                )}

                <div className="text-center">
                  <p
                    className="text-xs cursor-pointer"
                    onClick={() => {
                      // setOpenRegisterModal(false);
                      setOpenLoginModal(true);
                    }}
                  >
                    Already have an account?{" "}
                    <span className="text-[color:var(--blue)] font-semibold">
                      Login
                    </span>
                  </p>

                  <Login
                    openLoginModal={openLoginModal}
                    setOpenLoginModal={setOpenLoginModal}
                    RegisterActive={active}
                  />

                  <Link
                    to="/termsandconditions"
                    onClick={() => setOpenRegisterModal(false)}
                  >
                    <p className="text-xs">
                      By signing up you're agreeing to our{" "}
                      <span className="text-[color:var(--blue)] font-semibold">
                        Terms and Conditions
                      </span>
                    </p>
                  </Link>
                </div>
              </div>
              :
              <div className={`md:flex-1 flex flex-col gap-1 px-5  h-60 w-full `}>
                <h3 className="text-lg text-center font-semibold pb-5 mt-3 md:mb-20 lg:mb-24">
                  Get started with{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2068FF] to-[#444DA1]">
                    rework!
                  </span>
                </h3>

                <form onSubmit={handleOtp}>
                  <div className="group flex flex-col">
                    <label htmlFor="otp" className="text-sm font-medium py-1">
                      OTP
                    </label>
                    <div
                      className=" rounded-md flex items-center px-2 py-0.5 
group-focus-within:bg-white  group-focus-within:shadow-md border-2 border-[color:var(--lightest-blue)]"
                    >
                      {/* <FiUser size={20} className="mr-5" /> */}
                      <input
                        type="number"
                        placeholder="Input Your OTP "
                        autoComplete="false"
                        id="otp"
                        name="otp"
                        className="border-none outline-none  w-full lg:px-2 lg:py-0.5 group-focus-within:bg-white"
                      />
                    </div>
                  </div>

                  <div className="flex justify-center bg-[color:var(--blue)] hover:bg-[color:var(--dark-blue)] rounded-lg mt-4">
                    {
                      isLoading ? <ThreeDots
                        height="36"
                        width="36"
                        radius="9"
                        // color="#4287f5"
                        color="white"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClassName=""
                        visible={true}
                      /> :
                        <button
                          type="submit"
                          className="w-full py-1.5 
           font-semibold text-white disabled:cursor-not-allowed"
                        >
                          Submit OTP
                        </button>
                    }

                  </div>
                  <div className="flex justify-end">
                    <p className="text-right text-[color:var(--dark-blue)] cursor-pointer text-sm mr-2 hover:underline py-1 inline" onClick={resendHandler}   >Resend Code</p>
                  </div>

                </form>



              </div>
          }
        </div>
      </div>
    </Modal>
  );
};
export default Register;

/************************************************************************************************************************************************ */

/************************************************************************************************************************************************ */

// Recruiter sign up
const RegisterAsRecruiter = ({ DirctError, showOtp, setShowOtp }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState(null);
  const [error, setError] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const postSignup = useCallback(async (data) => {
    setIsLoading(true)
    try {
      const res = await fetch(`${baseUrl}/auth/signup`, {
        method: "put",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const jsonData = await res.json();
      setIsLoading(false)
      console.log(jsonData);
      if (!res.ok) {
        setSubmitted(false)
        setIsLoading(false)
        throw new Error(jsonData.message);
      }
      localStorage.setItem("signupEmail", data.email);
      localStorage.setItem("roleForPostJob", 'recruiter');
      setShowOtp(true)
      setError(null);
      setMsg(jsonData.message);

    } catch (error) {
      setMsg(null);
      setError(error.message);
      setIsLoading(false)
    }
  }, []);

  const showUserPassword = (e) => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async () => {
    // if (submitted) {
    //   return;
    // }
    // setSubmitted(true);
    const data = {
      fullName: fullName,
      email: email,
      phoneNumber: phoneNumber,
      password: password,
      role: "recruiter",
    };

    postSignup(data);
    //toast.success("Successfully registered!");
    // navigate("/login", { state: "recruiter" });
  };

  return (
    <>
      {
        !showOtp &&
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="group flex flex-col">
            {msg && <p style={{ color: "green" }}>{msg}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {DirctError && <p style={{ color: "red" }}>{DirctError}</p>}
            <label htmlFor="name" className="text-sm">
              Full Name
            </label>
            <div
              className=" rounded-md flex items-center px-2 py-0.5 
           group-focus-within:bg-white  group-focus-within:shadow-md border-2 border-[color:var(--lightest-blue)]"
            >
              {/* <FiUser size={20} className="mr-5" /> */}
              <input
                type="text"
                placeholder="Your Name"
                autoComplete="new-password"
                id="name"
                {...register("fullName", { required: true })}
                className="border-none outline-none  w-full lg:px-2 lg:py-0.5 group-focus-within:bg-white"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            {errors.fullName && (
              <p className="text-red-500 text-right text-xs">*Name is required.</p>
            )}
          </div>

          <div className="group flex flex-col">
            <label htmlFor="email" className="text-sm">
              Email
            </label>
            <div
              className=" rounded-md flex items-center px-2 py-0.5 
          group-focus-within:bg-white  group-focus-within:shadow-md border-2 border-[color:var(--lightest-blue)]"
            >
              {/* <MdMailOutline size={20} className="mr-5" /> */}
              <input
                type="email"
                placeholder="name@gmail.com"
                autoComplete="new-password"
                id="email"
                {...register("email", {
                  pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                })}
                {...register("email", { required: true })}
                className="border-none outline-none w-full  lg:py-0.5 group-focus-within:bg-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-right text-xs">
                *Provide a valid email address.
              </p>
            )}
          </div>

          <div className="group flex flex-col">
            <label htmlFor="phone" className="text-sm">
              Contact Number
            </label>
            <div
              className=" rounded-md flex items-center px-2 py-0.5 
          group-focus-within:bg-white  group-focus-within:shadow-md border-2 border-[color:var(--lightest-blue)]"
            >
              {/* <FaMobileAlt size={20} className="mr-5" /> */}
              <input
                type="number"
                placeholder="Mobile Number"
                autoComplete="off"
                id="phone"
                {...register("phone", { pattern: /^[1-9]{1}[0-9]{9}$/ })}
                {...register("phone", { required: true })}
                className="border-none outline-none  w-full lg:px-2 lg:py-0.5 group-focus-within:bg-white"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            {((phoneNumber?.length > 0 && phoneNumber?.length !== 10) || errors.phone) && (
              <p className="text-red-500 text-right text-xs">
                *Phone number must contain 10 digit.
              </p>
            )}

          </div>

          <div className="group flex flex-col">
            <label htmlFor="password" className="text-sm">
              Password
            </label>
            <div
              className=" rounded-md flex items-center px-2 py-0.5 
          group-focus-within:bg-white  group-focus-within:shadow-md border-2 border-[color:var(--lightest-blue)]"
            >
              {/* <BiLock size={20} className="mr-5" /> */}
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a Password"
                id="password"
                {...register("password", { required: true })}
                className="border-none outline-none  w-full lg:px-2 lg:py-0.5 group-focus-within:bg-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {showPassword ? (
                <AiOutlineEye
                  size={20}
                  className="mx-5 cursor-pointer"
                  onClick={showUserPassword}
                />
              ) : (
                <AiOutlineEyeInvisible
                  size={20}
                  className="mx-5 cursor-pointer"
                  onClick={showUserPassword}
                />
              )}
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs text-right">
                *Provide a valid password.
              </p>
            )}
          </div>

          <div className="flex justify-center bg-[color:var(--blue)] hover:bg-[color:var(--dark-blue)] rounded-lg mt-2">
            {
              isLoading ? <ThreeDots
                height="36"
                width="36"
                radius="9"
                // color="#4287f5"
                color="white"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
              /> :
                <button
                  type="submit"
                  className="w-full py-1.5 
           font-semibold text-white disabled:cursor-not-allowed"
                >
                  Signup
                </button>
            }

          </div>
        </form>
      }
    </>
  );
};

/************************************************************************************************************************************************ */

/************************************************************************************************************************************************ */

// Comapny sign up
const RegisterAsCompany = ({ showOtp, setShowOtp }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState(null);
  const [error, setError] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [companyName, setCompanyName] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const postSignup = useCallback(async (data) => {
    setIsLoading(true)
    try {
      const res = await fetch(`${baseUrl}/auth/signupCompany`, {
        method: "put",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const jsonData = await res.json();
      setIsLoading(false)
      if (!res.ok) {
        setSubmitted(false)
        setIsLoading(false)
        throw new Error(jsonData.message);
      }
      localStorage.setItem("signupEmail", data.email);
      localStorage.setItem("roleForPostJob", 'company');
      setShowOtp(true)
      setError(null);
      setMsg(jsonData.message);
    } catch (error) {
      setMsg(null);
      setIsLoading(false)
      setError(error.message);
    }
  }, []);

  const showUserPassword = (e) => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async () => {
    // if (submitted) {
    //   return;
    // }
    // setSubmitted(true);
    const data = {
      fullName: fullName,
      email: email,
      phoneNumber: phoneNumber,
      companyName: companyName,
      password: password,
      role: "company",
    };

    postSignup(data);
    //toast.success("Successfully registered!");
    // navigate("/login");
  };

  return (

    <>
      {
        !showOtp &&
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="group flex flex-col">
            {msg && <p style={{ color: "green" }}>{msg}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <label htmlFor="name" className="text-sm">
              Full Name
            </label>
            <div
              className=" rounded-md flex items-center px-2 py-0.5 
           group-focus-within:bg-white  group-focus-within:shadow-md border-2 border-[color:var(--lightest-blue)]"
            >
              {/* <FiUser size={20} className="mr-5" /> */}
              <input
                type="text"
                placeholder="Your Name"
                autoComplete="new-password"
                id="name"
                {...register("fullName", { required: true })}
                className="border-none outline-none  w-full lg:px-2 lg:py-0.5 group-focus-within:bg-white"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            {errors.fullName && (
              <p className="text-red-500 text-right text-xs">*Name is required.</p>
            )}
          </div>
          <div className="flex flex-col lg:flex-row gap-2">
            <div className="group flex flex-col flex-1">
              <label htmlFor="companyName" className="text-sm">
                Company Name
              </label>
              <div
                className=" rounded-md flex items-center px-2 py-0.5 
           group-focus-within:bg-white  group-focus-within:shadow-md border-2 border-[color:var(--lightest-blue)]"
              >
                {/* <BiBuilding size={20} className="mr-5" /> */}
                <input
                  type="text"
                  placeholder="Enter Company Name"
                  autoComplete="off"
                  id="companyName"
                  {...register("companyName", { required: true })}
                  className="border-none outline-none w-full  lg:py-0.5 group-focus-within:bg-white"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
              {errors.companyName && (
                <p className="text-red-500 text-right text-xs">
                  *Provide a valid company name.
                </p>
              )}
            </div>

            <div className="group flex flex-col flex-1">
              <label htmlFor="companyEmail" className="text-sm">
                Company Email
              </label>
              <div
                className=" rounded-md flex items-center px-2 py-0.5 
           group-focus-within:bg-white  group-focus-within:shadow-md border-2 border-[color:var(--lightest-blue)]"
              >
                {/* <MdMailOutline size={20} className="mr-5" /> */}
                <input
                  type="email"
                  placeholder="name@company"
                  autoComplete="new-password"
                  id="companyEmail"
                  {...register("email", {
                    pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  })}
                  {...register("email", { required: true })}
                  className="border-none outline-none w-full  lg:py-0.5 group-focus-within:bg-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-right text-xs">
                  *Provide a valid email address.
                </p>
              )}
            </div>
          </div>

          <div className="group flex flex-col">
            <label htmlFor="phone" className="text-sm">
              Contact Number
            </label>
            <div
              className=" rounded-md flex items-center px-2 py-0.5 
        group-focus-within:bg-white  group-focus-within:shadow-md border-2 border-[color:var(--lightest-blue)]"
            >
              {/* <FaMobileAlt size={20} className="mr-5" /> */}
              <input
                type="number"
                placeholder="Mobile Number"
                autoComplete="off"
                id="phone"
                {...register("phone", { pattern: /^[1-9]{1}[0-9]{9}$/ })}
                {...register("phone", { required: true })}
                className="border-none outline-none  w-full lg:px-2 lg:py-0.5 group-focus-within:bg-white"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            {((phoneNumber?.length > 0 && phoneNumber?.length !== 10) || errors.phone) && (
              <p className="text-red-500 text-right text-xs">
                *Phone number must contain 10 digit.
              </p>
            )}
          </div>

          <div className="group flex flex-col">
            <label htmlFor="password" className="text-sm">
              Password
            </label>
            <div
              className=" rounded-md flex items-center px-2 py-0.5 
         group-focus-within:bg-white  group-focus-within:shadow-md border-2 border-[color:var(--lightest-blue)]"
            >
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a Password"
                id="password"
                {...register("password", { required: true })}
                className="border-none outline-none  w-full lg:px-2 lg:py-0.5 group-focus-within:bg-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {showPassword ? (
                <AiOutlineEye
                  size={20}
                  className="mx-5 cursor-pointer"
                  onClick={showUserPassword}
                />
              ) : (
                <AiOutlineEyeInvisible
                  size={20}
                  className="mx-5 cursor-pointer"
                  onClick={showUserPassword}
                />
              )}
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs text-right">
                *Provide a valid password.
              </p>
            )}
          </div>

          <div className="flex justify-center bg-[color:var(--blue)] hover:bg-[color:var(--dark-blue)] rounded-lg mt-2">
            {
              isLoading ? <ThreeDots
                height="36"
                width="36"
                radius="9"
                // color="#4287f5"
                color="white"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
              /> :
                <button
                  type="submit"
                  className="w-full py-1.5 
           font-semibold text-white disabled:cursor-not-allowed"
                >
                  Signup
                </button>
            }

          </div>
        </form>

      }
    </>




  );
};
