import React, { useState, useContext, useCallback, useEffect } from "react";
import ForgotPassImg from "../../assets/ForgotPass.png";
import useInput from "../../hook/use-input";
import { MdMailOutline } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { BiLock, BiArrowBack } from "react-icons/bi";
import { Ri, RiLockLine } from "react-icons/ri";
import { FiLogIn } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import {
  AiOutlineEyeInvisible,
  AiOutlineEye,
  AiOutlineCloseCircle,
  AiFillLinkedin,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import AuthContext from "../../store/auth-context";
import "../../hook/ErrorValidation.css";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../../baseUrl";
import { Modal, useMantineTheme } from "@mantine/core";
import sidepic from "../../assets/Frame.svg";
import vector from "../../assets/Vector.svg";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import Register from "../register/Register";
import { useLinkedIn } from 'react-linkedin-login-oauth2';
import { auth, provider } from "../../pages/google/firebase";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { ThreeDots } from "react-loader-spinner";



const Login = ({ openLoginModal, setOpenLoginModal, RegisterActive }) => {
  const authCtx = useContext(AuthContext);
  const navigation = useNavigate()
  const [active, setActive] = useState("recruiters");
  if (active === "recruiters") {
    localStorage.setItem("role", "recruiter");
  } else {
    localStorage.setItem("role", "company");
  }

  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [checked, setChecked] = useState();
  const [DirctError, setDError] = useState('')
  //LinkedIn integration 
  const { linkedInLogin } = useLinkedIn({
    clientId: '77i710qpv9fagi',
    // redirectUri: `${window.location.origin}/linkedin`,
    // redirectUri: `${window.location.origin}/`,
    redirectUri: `https://rework.club/`,
    // redirectUri: `http://localhost:3000/`,
    onSuccess: (code) => {
      console.log(code);
      console.log('ssss');
      navigation("/")
    },
    onError: (error) => {
      console.log(error)
    }
  });
  //  -----

  const theme = useMantineTheme();
  const location = useLocation();
  useEffect(() => {
    const toTop = () => {
      window.scrollTo(0, 0);
    };

    return () => {
      toTop();
    };
  }, [location]);

  useEffect(() => {
    if (location.state) {
      window.localStorage.setItem("role", "recruiter");
    } else {
      window.localStorage.setItem("role", "company");
    }
  }, [location.state]);

  const handleLinkedinLogin = () => {
    // console.log('under linkedin login');
    linkedInLogin()

  }

  const signInWithGoogle = () => {

    signInWithPopup(auth, provider).then((result) => {
      const firstName = result.user.displayName;
      const email = result.user.email;
      const phoneNumber = result.user.phoneNumber;
      const password = result.user.uid;

      const loginData = { password, email, role: "recruiter" };

      fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(loginData),
      })

        .then((res) => {
          if (res.status !== 200) {
            res.json().then((data) => {
              setDError(data.message)
            });

          }
          return (res.json())
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

          navigation("/recruiter");


        })

    });

  };



  return (
    // <div>
    //   {forgotPass ? (
    //     <ForgotPass />
    //   ) : location.state ? (
    //     <LoginAsRecruiter setForgotPass={setForgotPass} />
    //   ) : (
    //     <LoginAsCompany setForgotPass={setForgotPass} />
    //   )}
    // </div>

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
      opened={openLoginModal}
      onClose={() => setOpenLoginModal(false)}
      withCloseButton={false}
      transition="fade"
      transitionDuration={500}
      transitionTimingFunction="ease"
      padding="0"
    >
      <div className="md:pr-10">
        <div
          className="absolute top-1 right-1 cursor-pointer flex flex-col items-center"
          onClick={() => setOpenLoginModal(false)}
        >
          <AiOutlineCloseCircle className=" text-xl md:text-2xl text-red-500" />
          {/* <span className="font-semibold text-red-500">Close</span> */}
        </div>

        <div className="flex gap-5 justify-center">
          <div className="hidden md:inline-flex flex-1 bg-gradient-to-r from-[#444DA1] to-[#2068FF] ">
            <img
              src={sidepic}
              alt=""
              className="w-60 h-60 object-cover m-auto"
            />
          </div>

          <div className="md:flex-1 flex flex-col gap-1 p-5">
            <div>
              <h3 className="text-lg lg:text-xl xl:text-2xl text-center font-semibold">
                Welcome back on{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2068FF] to-[#444DA1]">
                  rework!
                </span>
              </h3>
            </div>

            {/* {
              active === 'recruiters' ?

                <div className="flex gap-5 items-center justify-center">
                  <p className="ld:text-lg">Sign in with</p>
                  <FcGoogle
                    onClick={() => {
                      signInWithGoogle();
                    }}
                    size={35}
                    className="border rounded-full p-1.5 hover:bg-gray-200 cursor-pointer"
                  />
                  <AiFillLinkedin
                    size={35}
                    onClick={handleLinkedinLogin}
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
                    localStorage.setItem("role", "recruiter");
                  }}
                  checked={(active || RegisterActive) === "recruiters" && true}
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
                    localStorage.setItem("role", "company")
                  }}
                  checked={(active || RegisterActive) === "company" && true}
                />
                <span className="px-2 text-sm">Company</span>
              </label>
            </div>

            {active === "recruiters" ? (
              <LoginAsRecruiter DirctError={DirctError} />
            ) : (
              <LoginAsCompany />
            )}

            <div className="text-center">
              <p
                className="text-xs cursor-pointer"
                onClick={() => {
                  // setOpenLoginModal(false);
                  setOpenRegisterModal(true);

                }}
              >
                Don't have an account?{" "}
                <span className="text-[color:var(--blue)] font-semibold">
                  Signup
                </span>
              </p>

              <Register
                openRegisterModal={openRegisterModal}
                setOpenRegisterModal={setOpenRegisterModal}
                activeState="recruiters"
                checked={checked}
                setChecked={setChecked}
              />

              <Link
                to="/termsandconditions"
                onClick={() => setOpenLoginModal(false)}
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
        </div>
      </div>
    </Modal>
  );
};

export default Login;

const LoginAsRecruiter = ({ DirctError }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [a, setA] = useState(false);
  const [key, setKey] = useState("");
  const [error, setError] = useState();
  const navigation = useNavigate();
  const authCtx = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let postLogin = async (loginData) => {
    setIsLoading(true)
    try {
      const res = await fetch(
        `${baseUrl}/auth/login`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(loginData),
        },
        []
      );

      const jsonData = await res.json();
      setIsLoading(false)
      if (!res.ok) {
        setIsLoading(false)
        throw new Error(jsonData.message);
      }
      setError(null);
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

      navigation("/recruiter");
      setIsLoading(false)
      // console.log("hello");
      // setTimeout(()=>{
      //  navigation("/recruiter");
      //   console.log(jsonData);
      // },300);
    } catch (error) {
      setError(error.message);
      setIsLoading(false)
    }
  };

  //--------------- Login by Pressing Enter ----------------------

  // const onKeyDown = event => {
  //   setKey(event.key);
  //   if (event.key === "Enter") {
  //     let role = "recruiter";
  //     const loginData = { password, email, role };
  //     postLogin(loginData);
  //   }
  // };

  const onSubmit = async (data) => {
    let role = "recruiter";
    // const loginData = { password, email, role };
    const loginData = { password: data.password, email: data.email, role };
    postLogin(loginData);

    // console.log(loginData);

    // toast.success("Successfully logged in!");
    // navigate("/login", { state: "recruiter" });

  };

  const showUserPassword = (e) => {
    setShowPassword(!showPassword);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="group flex flex-col gap-1">
        {error && <p style={{ color: "red" }}>{error}</p>}
        {DirctError && <p style={{ color: "red" }}>{DirctError}</p>}
        <label htmlFor="email">Email</label>
        <div
          className=" rounded-md flex items-center px-3 py-1.5 
          group-focus-within:bg-white  group-focus-within:shadow-md border-2 border-[color:var(--lightest-blue)]"
        >
          <MdMailOutline size={24} className="mr-3" />
          <input
            {...register("email", { required: true })}
            type="text"
            placeholder="Email"
            // autoComplete="off"
            id="email"
            name="email"
            className="border-none outline-none  w-full lg:px-2 lg:py-1 text-lg group-focus-within:bg-white"
            // value={email}
            // onKeyDown={onKeyDown}
          // onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-right text-sm">*Email is invalid.</p>
        )}
      </div>

      <div className="group flex flex-col gap-1">
        <label htmlFor="password">Password</label>
        <div
          className=" rounded-md flex items-center px-3 py-1.5 
          group-focus-within:bg-white  group-focus-within:shadow-md border-2 border-[color:var(--lightest-blue)]"
        >
          <RiLockLine size={30} className="mr-3" />
          <input
            {...register("password", { required: true })}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            id="password"
            name="password"
            className="border-none outline-none  w-full lg:px-2 lg:py-1 text-lg group-focus-within:bg-white"
            // value={password}
            // onKeyDown={onKeyDown}
          // onChange={(e) => setPassword(e.target.value)}
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
          <p className="text-red-500 text-right text-sm">
            *Password is required.
          </p>
        )}
        <div className="flex justify-end">
          <Link to={`/forgotPass`}>
            <p className="underline text-[color:var(--blue)] cursor-pointer">
              Forgot Password?
            </p>
          </Link>
        </div>
      </div>

      <div className="flex justify-center bg-[color:var(--blue)] hover:bg-[color:var(--dark-blue)] rounded-lg">
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
              rounded-lg font-semibold text-white disabled:cursor-not-allowed flex justify-center 
              items-center gap-2"
            >
              <FiLogIn color="white" />
              Login as Recruiter
            </button>
        }

      </div>

    </form>
  );
};

const LoginAsCompany = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [a, setA] = useState(false);
  const [key, setKey] = useState("");
  const [error, setError] = useState();
  const navigation = useNavigate();
  const authCtx = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  let postLogin = useCallback(async (loginData) => {
    setIsLoading(true)
    try {
      const res = await fetch(
        `${baseUrl}/auth/login`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(loginData),
        },
        []
      );

      const jsonData = await res.json();
      setIsLoading(false)
      if (!res.ok) {
        setIsLoading(false)
        throw new Error(jsonData.message);
      }
      setError(null);
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
      navigation("/company");
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      setError(error.message);
    }
  }, []);

// ---------------------Login by Pressing Enter ------------------------

  // const onKeyDown = e => {
  //   // console.log(e.target.value)
  //   setKey(e.key);
  //   if (e.key === "Enter") {

  //     let role = "company";
  //     const loginData = { password, email, role };
  //     // const loginData = { password: data.password, email: data.email, role };
  //     postLogin(loginData);
  //     console.log(loginData);

  //   }
  // };

  const onSubmit = async (data) => {

    let role = "company";
    // const loginData2 = { password, email, role };
    const loginData = { password: data.password, email: data.email, role };
    postLogin(loginData);
    console.log(loginData);
    // console.log(loginData2);

  };

  const showUserPassword = (e) => {
    setShowPassword(!showPassword);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="group flex flex-col gap-1">
        {error && <p style={{ color: "red" }}>{error}</p>}
        <label htmlFor="email">Email</label>
        <div
          className=" rounded-md flex items-center px-3 py-1.5 
            group-focus-within:bg-white  group-focus-within:shadow-md border-2 border-[color:var(--lightest-blue)]"
        >
          {/* <div
          className="bg-[color:var(--lightest-blue)] rounded-md flex items-center px-3 py-1.5 
            group-focus-within:bg-white group-focus-within:ring-2 group-focus-within:shadow-md"
        > */}
          <MdMailOutline size={24} className="mr-3" />
          <input
            {...register("email", { required: true })}
            type="text"
            placeholder="Email"
            name="email"
            id="email"
            // className="border-none outline-none bg-[color:var(--lightest-blue)]  w-full lg:px-2 lg:py-1 text-lg tracking-wider group-focus-within:bg-white"
            className="border-none outline-none  w-full lg:px-2 lg:py-1 text-lg group-focus-within:bg-white"
            // value={email}
            // onKeyDown={onKeyDown}
          // onChange={(e) => setEmail(e.target.value)}
          // onBlur={emailInputBlurHandler}
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-right text-sm">*Email is invalid.</p>
        )}
      </div>

      <div className="group flex flex-col gap-1">
        <label htmlFor="password">Password</label>
        <div
          className=" rounded-md flex items-center px-3 py-1.5 
           group-focus-within:bg-white  group-focus-within:shadow-md border-2 border-[color:var(--lightest-blue)]"
        >
          <RiLockLine size={30} className="mr-3" />
          <input
            {...register("password", { required: true })}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            id="password"
            name="password"
            className="border-none outline-none  w-full lg:px-2 lg:py-1 text-lg group-focus-within:bg-white"
            // value={password}
            // onKeyDown={onKeyDown}
          // onChange={(e) => setPassword(e.target.value)}
          // onBlur={passwordInputBlurHandler}
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
          <p className="text-red-500 text-right text-sm">
            *Password is required.
          </p>
        )}
        <div className="flex justify-end">
          <Link to={`/forgotPass`}>
            <p className="underline text-[color:var(--blue)] cursor-pointer">
              Forgot Password?
            </p>
          </Link>
        </div>
      </div>

      <div className="flex justify-center bg-[color:var(--blue)] hover:bg-[color:var(--dark-blue)] rounded-lg">
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
              rounded-lg font-semibold text-white disabled:cursor-not-allowed flex justify-center 
              items-center gap-2"
            >
              <FiLogIn color="white" />
              Login as Company
            </button>
        }

      </div>
    </form>
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
};
