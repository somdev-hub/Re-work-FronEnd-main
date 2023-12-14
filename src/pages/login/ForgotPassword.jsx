import React, { useState, useContext } from "react";
import ForgotPassImg from "../../assets/ForgotPass.png";
import useInput from "../../hook/use-input";
import { MdMailOutline } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { BiLock, BiArrowBack } from "react-icons/bi";
import { FiLogIn } from "react-icons/fi";
import { Link } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import AuthContext from "../../store/auth-context";
import "../../hook/ErrorValidation.css";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../../baseUrl";
import Register from "../register/Register";

const ForgotPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [first, setFirst] = useState(false);
  const [second, setSecond] = useState(false);
  const [otp, setOtp] = useState("");
  const [errorMsg, setErrorMsg] = useState();
  const [msg, setMsg] = useState();
  const [isFirstError, setIsErrorFirst] = useState();
  const [isSecondError, setIsErrorSecond] = useState();
  const [isThirdError, setIsErrorThird] = useState();
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  //const [email, setEmail]=useState("");

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
        url = `${baseUrl}/auth/postResetPassword`;
        const role = window.localStorage.getItem("role");
        const data = { email: email, role: role };
        // console.log(data);
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
          url = `${baseUrl}/auth/otpVerification`;

          const data = {
            email: localStorage.getItem("email"),
            role: window.localStorage.getItem("role"),
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
          url = `${baseUrl}/auth/postNewPassword`;

          const result = await fetch(url, {
            method: "post",
            body: JSON.stringify({
              email: localStorage.getItem("email"),
              newPassword: newPassword,
              otpToken: localStorage.getItem("otpToken"),
              role: window.localStorage.getItem("role"),
            }),
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
          if (jsonData.userRole === "recruiter") {
            navigate("/recruiter");
          } else if (jsonData.userRole === "company") {
            navigate("/company");
          }
        }
      }
    } catch (error) {
      setMsg(null);
      setErrorMsg(error.message);
    }
  };

  const showUserPassword = (e) => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="py-8 px-6 md:py-10 md:px-14 lg:px-20 xl:px-24 flex items-center gap-10 min-h-screen">
      <div className="flex flex-col gap-5 flex-1">
        <div className="flex flex-col gap-2">
          <Link to="/">
            <p className="flex items-center gap-2 ">
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

        <form
          className="flex flex-col gap-4 lg:gap-6"
          onSubmit={(e) => {
            formHandler(e);
          }}
        >
          {!first ? (
            <>
              <div className="group flex flex-col gap-1">
                {msg && <p style={{ color: "green" }}>{msg}</p>}

                <label htmlFor="email">Email</label>
                {/*isFirstError && (<p style={{color:"red"}}>{errorMsg}</p>)*/}
                <div
                  id="email-err"
                  className=" rounded-md flex items-center px-3 py-1.5 
                  group-focus-within:bg-white  group-focus-within:shadow-md border-2 border-[color:var(--lightest-blue)]"
                >
                  <MdMailOutline size={24} className="mr-3" />
                  <input
                    type="text"
                    placeholder="Email"
                    autoComplete="off"
                    id="email"
                    className="border-none outline-none  w-full lg:px-2 lg:py-1 text-lg group-focus-within:bg-white"
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
            <p
              className="cursor-pointer"
              onClick={() => setOpenRegisterModal(true)}
            >
              Don't have an account?{" "}
              <span className="text-[color:var(--blue)] font-semibold">
                Create Account
              </span>
            </p>
            <Register
              openRegisterModal={openRegisterModal}
              setOpenRegisterModal={setOpenRegisterModal}
            />
          </div>
        </form>
      </div>

      <div className="hidden md:inline-flex flex-1">
        <img src={ForgotPassImg} alt="" className="" />
      </div>
    </div>
  );
};

export default ForgotPassword;
