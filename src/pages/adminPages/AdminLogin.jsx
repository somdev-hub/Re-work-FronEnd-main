import React, { useState } from "react";
import { BiArrowBack, BiLock } from "react-icons/bi";
import { MdMailOutline, MdSentimentSatisfiedAlt } from "react-icons/md";
import { FiLogIn } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import ForgotPassImg from "../../assets/ForgotPass.png";
import AdminLoginImg from "../../assets/adminLogin.png";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import { baseUrl } from "../../baseUrl";
import useInput from "../../hook/use-input";
import validator from "validator";
import { useEffect } from "react";
import { RiLockLine } from "react-icons/ri";
import { ThreeDots } from "react-loader-spinner";

const AdminLogin = () => {
  const [forgotPass, setForgotPass] = useState(false);
  return (
    <div>
      {forgotPass ? (
        <ForgotPass />
      ) : (
        <LoginByAdmin setForgotPass={setForgotPass} />
      )}
    </div>
  );
};

export default AdminLogin;

const LoginByAdmin = ({ setForgotPass }) => {
  const [showPassword, setShowPassword] = useState(false);

  const showUserPassword = (e) => {
    setShowPassword(!showPassword);
  };
  const [email, setEmail] = useState();
  const [msg, setMsg] = useState();
  const [password, setPassword] = useState();
  const navigation = useNavigate();
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedExpirationDate = localStorage.getItem("expirationTime");
    const storedUserId = localStorage.getItem("userId");
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!storedToken || !storedExpirationDate || !storedUserId) {
      navigation("/adminlogin");
    } else {
      if (isLoggedIn === false) {
        navigation("/adminlogin");
      } else {
        navigation("/admin");
      }
    }
  }, []);



  const formHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    console.log(email, password);
    try {
      const result = await fetch(`${baseUrl}/auth/adminlogin`, {
        method: "post",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-type": "application/json",
        },
      });

      const jsonData = await result.json();
      setIsLoading(false)
      if (!result.ok) {
        setMsg(jsonData.message);
        toast.error(jsonData.message);
        setIsLoading(false)
        throw new Error(jsonData.message);
      }

      const expirationTime = new Date(
        new Date().getTime() + +jsonData.expiresIn * 1000
      );
      authCtx.login(
        jsonData.token,
        expirationTime.toISOString(),
        jsonData.userName,
        jsonData.userId,
        jsonData.email,
        "Admin",
        jsonData.companyName,
        jsonData.dashboard,
        jsonData.company,
        jsonData.manageRoles,
        jsonData.forms,
        jsonData.recruiter,
        jsonData.referral,
        jsonData.cms,
        jsonData.payment,
        jsonData.applications,
        jsonData.invoices,
        jsonData.notifications,
        jsonData.needHelp
      );

      navigation("/admin");
      setIsLoading(false)
    } catch (error) {
      setMsg(error.message);
      // toast(error.message)
      setIsLoading(false)
    }
  };

  return (
    <div className="py-8 px-6 md:py-10 md:px-14 lg:px-20 xl:px-24 flex items-center gap-10 min-h-screen">
      <div className=" flex-1 ">
        <Link to="/">
          <p className="flex items-center gap-2 absolute top-4 ">
            <BiArrowBack className="text-[color:var(--blue)]" />
            Go back
          </p>
        </Link>
        <h1 className="text-[color:var(--blue)] font-bold text-4xl absolute top-12 ">
          rework
        </h1>

        <div className="absolute top-0 right-0">
          <div className="bg-[color:var(--blue)] rounded-bl-full w-32 h-28 "></div>
        </div>
        <div className="absolute top-16 right-16">
          <div className="w-10 h-10 bg-[#93dfff] z-10 rounded-full"></div>
        </div>

        <div className="absolute bottom-24 left-10">
          <div className="bg-[color:var(--blue)] w-10 h-10 rounded-full"></div>
        </div>
        <div className="absolute bottom-10 left-24">
          <div className="bg-[color:var(--blue)] w-10 h-10 rounded-full"></div>
        </div>
        <div className="absolute bottom-0 left-0">
          <div className="bg-[color:var(--blue)] w-16 h-16 rounded-full"></div>
        </div>
        <div className="absolute bottom-24 left-24">
          <div className="bg-[color:var(--blue)] w-5 h-5 rounded-full"></div>
        </div>
        <div className="absolute bottom-16 left-16">
          <div className="bg-[color:var(--blue)] w-5 h-5 rounded-full"></div>
        </div>
        <div className="absolute bottom-28 left-2">
          <div className="bg-[color:var(--blue)] w-5 h-5 rounded-full"></div>
        </div>
        <div className="absolute bottom-2 left-28">
          <div className="bg-[color:var(--blue)] w-5 h-5 rounded-full"></div>
        </div>

        <div className="max-w-lg mx-auto flex flex-col gap-5 border-2 rounded-lg shadow-md p-4 sm:p-8 md:p-5 lg:py-14 lg:px-10">
          <div className="flex flex-col gap-2">
            <h2 className="font-bold text-2xl lg:text-3xl flex gap-5 justify-center">
              <span className="text-[color:var(--blue)] ">
                <FaUser />
              </span>
              <span>Admin Login</span>
            </h2>
          </div>
          <h4 style={{ color: "red" }}>{msg}</h4>
          <form className="flex flex-col gap-4 lg:gap-6" onSubmit={formHandler}>
            <div className="group flex flex-col gap-1">
              <label htmlFor="email">Email Address</label>
              <div
                className=" rounded-md flex items-center px-3 py-1.5 
               group-focus-within:bg-white  group-focus-within:shadow-md border-2 border-[color:var(--lightest-blue)]"
              >
                <MdMailOutline size={24} className="mr-5" />
                <input
                  type="email"
                  name='email'
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="Email"
                  autoComplete="off"
                  id="email"
                  className="border-none outline-none  w-full lg:px-2 lg:py-1 text-lg group-focus-within:bg-white"
                />
              </div>
            </div>

            <div className="group flex flex-col gap-1">
              <label htmlFor="password">Password</label>
              <div
                className=" rounded-md flex items-center px-3 py-1.5 
                 group-focus-within:bg-white  group-focus-within:shadow-md border-2 border-[color:var(--lightest-blue)]"
              >
                <RiLockLine size={30} className="mr-3" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name='password'
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  id="password"
                  className="border-none outline-none  w-full lg:px-2 lg:py-1 text-lg group-focus-within:bg-white"
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
              <div className="flex justify-end">
                <p
                  className="underline text-[color:var(--blue)] cursor-pointer"
                  onClick={() => setForgotPass(true)}
                >
                  Forgot Password? 
                </p>
              </div>
              <ToastContainer />
            </div>

            <div className="bg-[color:var(--blue)] flex justify-center items-center px-3
             py-2 rounded-lg mt-5 cursor-pointer">
              {
                isLoading ? <ThreeDots
                  height="36"
                  width="36"
                  radius="9"
                  color="white"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName="" 
                  visible={true}
                /> :
                  <>
                    <FiLogIn color="white" />
                    <button
                      className="text-white text-lg font-bold ml-2"
                      type="submit"
                    >
                      Login
                    </button>
                  </>
              }

            </div>
          </form>
        </div>
      </div>

      <div className="hidden md:inline-flex flex-1">
        <img src={AdminLoginImg} alt="" className="" />
      </div>
    </div>
  );
};

const ForgotPass = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [first, setFirst] = useState(false);
  const [second, setSecond] = useState(false);

  const [otp, setOtp] = useState("");
  const [errorMsg, setErrorMsg] = useState();
  const [msg, setMsg] = useState();
  const [isFirstError, setIsErrorFirst] = useState();
  const [isSecondError, setIsErrorSecond] = useState();
  const [isThirdError, setIsErrorThird] = useState();
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    value: email,
    hasError: emailHasError,
    isValid: emailIsValid,
    valueChangeHandler: emailChangeHandler,
    reset: emailResetInput,
    inputBlurHandler: emailInputBlurHandler,
  } = useInput((value) => {
    if (validator.isEmail(value)) {
      return true;
    } else {
      return false;
    }
  });

  const {
    value: newPassword,
    hasError: newPasswordHasError,
    isValid: newPasswordIsValid,
    valueChangeHandler: newPasswordChangeHandler,
    reset: newPasswordResetInput,
    inputBlurHandler: newPasswordInputBlurHandler,
  } = useInput((value) => value.trim().length > 4);

  const {
    value: confirmPassword,
    hasError: confirmPasswordHasError,
    isValid: confirmPasswordIsValid,
    valueChangeHandler: confirmPasswordChangeHandler,
    reset: confirmPasswordResetInput,
    inputBlurHandler: confirmPasswordInputBlurHandler,
  } = useInput((value) => value.trim() === newPassword);

  const formHandler = async (event) => {
    event.preventDefault();
    let url;

    try {
      if (!first) {
        url = `${baseUrl}/auth/adminPostResetPassword`;
        const role = window.localStorage.getItem("role");
        const data = { email: email };
        const result = await fetch(url, {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const jsonData = await result.json();

        if (!result.ok) {
          throw new Error(jsonData.message);
        }
        await setFirst(true);
        setErrorMsg(null);
        setMsg(jsonData.message);
        localStorage.setItem("email", email);
      } else {
        if (!second) {
          url = `${baseUrl}/auth/adminOtpVerification`;

          const data = {
            email: localStorage.getItem("email"),
            otp: otp.toString(),
          };

          const result = await fetch(url, {
            method: "post",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          });

          const jsonData = await result.json();
          if (!result.ok) {
            throw new Error(jsonData.message);
          }
          setSecond(true);
          setMsg(jsonData.message);
          localStorage.setItem("otpToken", jsonData.otpToken);
        } else {
          url = `${baseUrl}/auth/adminPostNewPassword`;

          const result = await fetch(url, {
            method: "post",
            body: JSON.stringify({
              email: localStorage.getItem("email"),
              newPassword: newPassword,
              otpToken: localStorage.getItem("otpToken"),
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });

          const jsonData = await result.json();

          if (!result.ok) {
            throw new Error(jsonData.message);
          }
          setErrorMsg(null);
          setMsg(jsonData.message);
          localStorage.removeItem("email");
          localStorage.removeItem("otpToken");
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
            jsonData.dashboard,
            jsonData.company,
            jsonData.manageRoles,
            jsonData.forms,
            jsonData.recruiter,
            jsonData.referral,
            jsonData.cms,
            jsonData.payment
          );
          navigate("/admin");
        }
      }
    } catch (error) {
      setMsg(null);
      setErrorMsg(error.message);
    }
  };

  const showUserPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="py-8 px-6 md:py-10 md:px-14 lg:px-20 xl:px-24 flex items-center gap-10 min-h-screen">
      <div className="flex flex-col gap-5 flex-1">
        <div className="flex flex-col gap-2">
          <Link to="/">
            <p className="flex items-center gap-2">
              <BiArrowBack className="text-[color:var(--blue)]" />
              Go back
            </p>
          </Link>
          <h2 className=" font-bold text-2xl lg:text-4xl">
            Forgot <span className="text-[color:var(--blue)]">Password</span>
          </h2>
          <h3 className="text-lg md:text-xl lg:text-2xl font-medium">
            Reset your password in just 3 easy steps{" "}
          </h3>
        </div>

        <div className="flex items-center text-black">
          <span
            className={`border-2 border-[color:var(--blue)] rounded-full p-4 w-14 h-14 text-lg text-white bg-[color:var(--blue)] flex        justify-center items-center`}
          >
            <span>{first ? <TiTick size={25} /> : "1"}</span>
          </span>

          <div className="bg-gray-300 h-0.5 w-20"></div>

          <span
            className={`border-2 border-[color:var(--blue)] rounded-full p-4 w-14 h-14 text-lg flex justify-center items-center
      ${first && "bg-[color:var(--blue)] text-white"}
      `}
          >
            <span>{second ? <TiTick size={25} /> : "2"}</span>
          </span>

          <div className="bg-gray-300 h-0.5 w-20"></div>

          <span
            className={`border-2 border-[color:var(--blue)] rounded-full p-4 w-14 h-14 text-lg flex justify-center items-center
      ${second && "bg-[color:var(--blue)] text-white"}
      `}
          >
            <span>3</span>
          </span>
        </div>
        {!first ? (
          <div className="lg:max-w-lg font-medium">
            Enter your Registered Email Id
          </div>
        ) : !second ? (
          <div className="lg:max-w-lg font-medium">
            A 6 digit code has been sent to you.
          </div>
        ) : (
          <div className="lg:max-w-lg font-medium">Create a new Password.</div>
        )}

        <form className="flex flex-col gap-4 lg:gap-6" onSubmit={formHandler}>
          {!first ? (
            <>
              <div className="group flex flex-col gap-1">
                {msg && <p style={{ color: "green" }}>{msg}</p>}
                {/* {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>} */}
                <label htmlFor="email">Email</label>
                {/*isFirstError && (<p style={{color:"red"}}>{errorMsg}</p>)*/}
                <div
                  id="email-err"
                  className="bg-[color:var(--lightest-blue)] rounded-md flex items-center px-3 py-2 
        group-focus-within:bg-white group-focus-within:ring-2 group-focus-within:shadow-md"
                >
                  <MdMailOutline size={20} className="mr-5" />
                  <input
                    type="text"
                    placeholder="Email"
                    autoComplete="off"
                    id="email"
                    className="border-none outline-none bg-[color:var(--lightest-blue)] w-full lg:px-2 lg:py-1 text-lg group-focus-within:bg-white"
                    value={email}
                    onChange={emailChangeHandler}
                  />
                </div>
                {errorMsg && (
                  <div className="flex justify-end">
                    <p className="text-red-500 cursor-pointer">{errorMsg}</p>
                  </div>
                )}
              </div>
              <div className="bg-[color:var(--blue)] flex justify-center items-center px-3 py-2 rounded-lg mt-5 cursor-pointer">
                <button className="text-white text-lg font-bold ml-2">
                  Continue
                </button>
              </div>
            </>
          ) : !second ? (
            <>
              <div className="group flex flex-col gap-1">
                {msg && <p style={{ color: "green" }}>{msg}</p>}
                {/* {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>} */}
                <label htmlFor="otp">OTP</label>
                {/*isSecondError && (<p style={{color:"red"}}>{errorMsg}</p>)*/}
                <div
                  id="OTP-err"
                  className="bg-[color:var(--lightest-blue)] rounded-md flex items-center px-3 py-2 
        group-focus-within:bg-white group-focus-within:ring-2 group-focus-within:shadow-md"
                >
                  <BiLock size={20} className="mr-5" />
                  <input
                    type="text"
                    placeholder="OTP"
                    id="otp"
                    className="border-none outline-none bg-[color:var(--lightest-blue)] w-full lg:px-2 lg:py-1 text-lg tracking-wider group-focus-within:bg-white"
                    value={otp}
                    onChange={(e) => {
                      setOtp(e.target.value);
                    }}
                  />
                </div>
                {errorMsg && (
                  <div className="flex justify-end">
                    <p className="text-red-500 cursor-pointer">{errorMsg}</p>
                  </div>
                )}
              </div>
              <div className="bg-[color:var(--blue)] flex justify-center items-center px-3 py-2 rounded-lg mt-5 cursor-pointer">
                <button className="text-white text-lg font-bold ml-2">
                  Continue
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="group flex flex-col gap-1">
                {msg && <p style={{ color: "green" }}>{msg}</p>}
                {/* {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>} */}
                <label htmlFor="password">New Password</label>
                {/*isThirdError && (<p style={{color:"red"}}>{errorMsg}</p>)*/}
                <div
                  id="newPassword-err"
                  className="bg-[color:var(--lightest-blue)] rounded-md flex items-center px-3 py-2 
        group-focus-within:bg-white group-focus-within:ring-2 group-focus-within:shadow-md"
                >
                  <BiLock size={20} className="mr-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="New Password"
                    id="password"
                    className="border-none outline-none bg-[color:var(--lightest-blue)] w-full lg:px-2 lg:py-1 text-lg tracking-wider group-focus-within:bg-white"
                    value={newPassword}
                    onChange={newPasswordChangeHandler}
                    onBlur={newPasswordInputBlurHandler}
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
                {newPasswordHasError && (
                  <p className="error-text">
                    *Minimum length of password must be 5.
                  </p>
                )}
              </div>
              <div className="group flex flex-col gap-1">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div
                  className="bg-[color:var(--lightest-blue)] rounded-md flex items-center px-3 py-2 
        group-focus-within:bg-white group-focus-within:ring-2 group-focus-within:shadow-md"
                >
                  <BiLock size={20} className="mr-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    id="confirmPassword"
                    className="border-none outline-none bg-[color:var(--lightest-blue)] w-full lg:px-2 lg:py-1 text-lg tracking-wider group-focus-within:bg-white"
                    value={confirmPassword}
                    onChange={confirmPasswordChangeHandler}
                    onBlur={confirmPasswordInputBlurHandler}
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
                {confirmPasswordHasError && (
                  <p className="error-text">*Passwords doesn't matches.</p>
                )}
                {errorMsg && (
                  <div className="flex justify-end">
                    <p className="text-red-500 cursor-pointer">{errorMsg}</p>
                  </div>
                )}
              </div>
              <div className="bg-[color:var(--blue)] flex justify-center items-center px-3 py-2 rounded-lg mt-5 cursor-pointer">
                <FiLogIn color="white" />
                <button className="text-white text-lg font-bold ml-2">
                  Login
                </button>
              </div>
            </>
          )}

          <div className="text-left">
            <Link to="/register">
              <p>
                Don't have an account?{" "}
                <span className="text-[color:var(--blue)] font-semibold">
                  Create Account
                </span>
              </p>
            </Link>
          </div>
        </form>
      </div>

      <div className="hidden md:inline-flex flex-1">
        <img src={ForgotPassImg} alt="" className="" />
      </div>
    </div>
  );

  // return (
  //   <div className="py-8 px-6 md:py-10 md:px-14 lg:px-20 xl:px-24 flex items-center gap-10 min-h-screen">
  //     <div className="flex flex-col gap-5 flex-1">
  //       <div className="flex flex-col gap-2">
  //         <h2 className=" font-bold text-2xl lg:text-4xl">
  //           Forgot <span className="text-[color:var(--blue)]">Password</span>
  //         </h2>
  //         <h3 className="text-lg md:text-xl lg:text-2xl font-medium">
  //           Reset your password in just 3 easy steps{" "}
  //         </h3>
  //       </div>

  //       <div className="flex items-center text-black">
  //         <span
  //           className={`border-2 border-[color:var(--blue)] rounded-full p-4 w-14 h-14 text-lg text-white bg-[color:var(--blue)] flex        justify-center items-center`}
  //         >
  //           <span>{first ? <TiTick size={25} /> : "1"}</span>
  //         </span>

  //         <div className="bg-gray-300 h-0.5 w-20"></div>

  //         <span
  //           className={`border-2 border-[color:var(--blue)] rounded-full p-4 w-14 h-14 text-lg flex justify-center items-center
  //         ${first && "bg-[color:var(--blue)] text-white"}
  //         `}
  //         >
  //           <span>{second ? <TiTick size={25} /> : "2"}</span>
  //         </span>

  //         <div className="bg-gray-300 h-0.5 w-20"></div>

  //         <span
  //           className={`border-2 border-[color:var(--blue)] rounded-full p-4 w-14 h-14 text-lg flex justify-center items-center
  //         ${second && "bg-[color:var(--blue)] text-white"}
  //         `}
  //         >
  //           <span>3</span>
  //         </span>
  //       </div>
  //       {!first ? (
  //         <div className="lg:max-w-lg font-medium">
  //           Enter your Registered Email Id
  //         </div>
  //       ) : !second ? (
  //         <div className="lg:max-w-lg font-medium">
  //           A 6 digit code has been sent to you.
  //         </div>
  //       ) : (
  //         <div className="lg:max-w-lg font-medium">Create a new Password.</div>
  //       )}

  //       <form className="flex flex-col gap-4 lg:gap-6">
  //         {!first ? (
  //           <>
  //             <div className="group flex flex-col gap-1">
  //               <label htmlFor="email">Email</label>
  //               <div
  //                 className="bg-[color:var(--lightest-blue)] rounded-md flex items-center px-3 py-2
  //           group-focus-within:bg-white group-focus-within:ring-2 group-focus-within:shadow-md"
  //               >
  //                 <MdMailOutline size={20} className="mr-5" />
  //                 <input
  //                   type="text"
  //                   placeholder="Email"
  //                   autoComplete="off"
  //                   id="email"
  //                   className="border-none outline-none bg-[color:var(--lightest-blue)] w-full lg:px-2 lg:py-1 text-lg group-focus-within:bg-white"
  //                 />
  //               </div>

  //               <div className="flex justify-end">
  //                 <p className="underline text-[color:var(--blue)] cursor-pointer">
  //                   Error?
  //                 </p>
  //               </div>
  //             </div>
  //             <div className="bg-[color:var(--blue)] flex justify-center items-center px-3 py-2 rounded-lg mt-5 cursor-pointer">
  //               <button
  //                 className="text-white text-lg font-bold ml-2"
  //                 onClick={(e) => {
  //                   e.preventDefault();
  //                   setFirst(true);
  //                 }}
  //               >
  //                 Continue
  //               </button>
  //             </div>
  //           </>
  //         ) : !second ? (
  //           <>
  //             <div className="group flex flex-col gap-1">
  //               <label htmlFor="otp">OTP</label>
  //               <div
  //                 className="bg-[color:var(--lightest-blue)] rounded-md flex items-center px-3 py-2
  //           group-focus-within:bg-white group-focus-within:ring-2 group-focus-within:shadow-md"
  //               >
  //                 <BiLock size={20} className="mr-5" />
  //                 <input
  //                   type="text"
  //                   placeholder="OTP"
  //                   id="otp"
  //                   className="border-none outline-none bg-[color:var(--lightest-blue)] w-full lg:px-2 lg:py-1 text-lg tracking-wider group-focus-within:bg-white"
  //                 />
  //               </div>
  //               <div className="flex justify-end">
  //                 <p className="underline text-[color:var(--blue)] cursor-pointer">
  //                   Error?
  //                 </p>
  //               </div>
  //             </div>
  //             <div className="bg-[color:var(--blue)] flex justify-center items-center px-3 py-2 rounded-lg mt-5 cursor-pointer">
  //               <button
  //                 className="text-white text-lg font-bold ml-2"
  //                 onClick={(e) => {
  //                   e.preventDefault();
  //                   setSecond(true);
  //                 }}
  //               >
  //                 Continue
  //               </button>
  //             </div>
  //           </>
  //         ) : (
  //           <>
  //             <div className="group flex flex-col gap-1">
  //               <label htmlFor="password">New Password</label>
  //               <div
  //                 className="bg-[color:var(--lightest-blue)] rounded-md flex items-center px-3 py-2
  //           group-focus-within:bg-white group-focus-within:ring-2 group-focus-within:shadow-md"
  //               >
  //                 <BiLock size={20} className="mr-5" />
  //                 <input
  //                   type={showPassword ? "text" : "password"}
  //                   placeholder="New Password"
  //                   id="password"
  //                   className="border-none outline-none bg-[color:var(--lightest-blue)] w-full lg:px-2 lg:py-1 text-lg tracking-wider group-focus-within:bg-white"
  //                 />
  //                 {showPassword ? (
  //                   <AiOutlineEye
  //                     size={20}
  //                     className="mx-5 cursor-pointer"
  //                     onClick={showUserPassword}
  //                   />
  //                 ) : (
  //                   <AiOutlineEyeInvisible
  //                     size={20}
  //                     className="mx-5 cursor-pointer"
  //                     onClick={showUserPassword}
  //                   />
  //                 )}
  //               </div>
  //             </div>
  //             <div className="group flex flex-col gap-1">
  //               <label htmlFor="confirmPassword">Confirm Password</label>
  //               <div
  //                 className="bg-[color:var(--lightest-blue)] rounded-md flex items-center px-3 py-2
  //           group-focus-within:bg-white group-focus-within:ring-2 group-focus-within:shadow-md"
  //               >
  //                 <BiLock size={20} className="mr-5" />
  //                 <input
  //                   type={showPassword ? "text" : "password"}
  //                   placeholder="Confirm Password"
  //                   id="confirmPassword"
  //                   className="border-none outline-none bg-[color:var(--lightest-blue)] w-full lg:px-2 lg:py-1 text-lg tracking-wider group-focus-within:bg-white"
  //                 />
  //                 {showPassword ? (
  //                   <AiOutlineEye
  //                     size={20}
  //                     className="mx-5 cursor-pointer"
  //                     onClick={showUserPassword}
  //                   />
  //                 ) : (
  //                   <AiOutlineEyeInvisible
  //                     size={20}
  //                     className="mx-5 cursor-pointer"
  //                     onClick={showUserPassword}
  //                   />
  //                 )}
  //               </div>
  //               <div className="flex justify-end">
  //                 <p className="underline text-[color:var(--blue)] cursor-pointer">
  //                   Error?
  //                 </p>
  //               </div>
  //             </div>
  //             <div className="bg-[color:var(--blue)] flex justify-center items-center px-3 py-2 rounded-lg mt-5 cursor-pointer">
  //               <FiLogIn color="white" />
  //               <button className="text-white text-lg font-bold ml-2">
  //                 Login
  //               </button>
  //             </div>
  //           </>
  //         )}

  //         <div className="text-left">
  //           <Link to="/register">
  //             <p>
  //               Don't have an account?{" "}
  //               <span className="text-[color:var(--blue)] font-semibold">
  //                 Create Account
  //               </span>
  //             </p>
  //           </Link>
  //         </div>
  //       </form>
  //     </div>

  //     <div className="hidden md:inline-flex flex-1">
  //       <img src={ForgotPassImg} alt="" className="" />
  //     </div>
  //   </div>
  // );
};
