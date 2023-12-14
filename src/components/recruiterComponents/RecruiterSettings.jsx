import React, { useState } from "react";
import { useEffect } from "react";
import { FaCloudUploadAlt, FaUserAlt, FaUserCircle } from "react-icons/fa";
// import useInput from "../../hook/use-input";
import { baseUrl } from "../../baseUrl";
import RecruiterNotifications from "./RecruiterNotifications";
import { useDispatch } from "react-redux";
import { counterActions } from "../../store/index-redux";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../../hook/Loader";
import { ThreeDots } from "react-loader-spinner";
// import { Option, Select } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { Option, Select } from "@material-tailwind/react";

const RecruiterSettings = () => {
  const [active, setActive] = useState(<RecruiterDetails />);
  const [activeColor, setActiveColor] = useState(1);

  // const nav = useNavigate();
  return (
    <div>
      <div className="flex justify-between items-center gap-5 pb-4 group">
        <h2 className="font-medium text-xl lg:text-2xl lg:font-semibold xl:text-3xl">
          Settings
        </h2>

        <div>
          <RecruiterNotifications />
        </div>
      </div>

      <div className="flex justify-start gap-10 border-b-2 my-5">
        <h6
          className={`font-medium text-lg cursor-pointer 
            ${activeColor === 1 &&
            "text-[color:var(--blue)] border-b-2 border-[color:var(--blue)]"
            }
          `}
          onClick={() => {
            setActiveColor(1);
            setActive(<RecruiterDetails />);
          }}
        >
          Personal Details
        </h6>
        <h6
          className={`font-medium text-lg cursor-pointer 
          ${activeColor === 2 &&
            "text-[color:var(--blue)] border-b-2 border-[color:var(--blue)]"
            }
          `}
          onClick={() => {
            setActiveColor(2);
            setActive(<BankDetails />);
          }}
        >
          Bank Details
        </h6>
        <h6
          className={`font-medium text-lg cursor-pointer 
          ${activeColor === 3 &&
            "text-[color:var(--blue)] border-b-2 border-[color:var(--blue)]"
            }
          `}
          onClick={() => {
            setActiveColor(3);
            setActive(<RecruiterPassword />);
          }}
        >
          Password
        </h6>
      </div>

      <div>{active}</div>
      <ToastContainer />
    </div>
  );
};

const RecruiterDetails = () => {
  // const [charCount, setCharCount] = useState(400);
  const [isLoading, setIsLoading] = useState(true)
  const [recruiter, setRecruiter] = useState();
  const [fullName, setFullName] = useState();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState();
  const [photo, setPhoto] = useState();
  const [photo_, setPhoto_] = useState();
  const [profilePhoto, setProfilePhoto] = useState();
  const [introduction, setIntroduction] = useState('');
  const [mobileNum1, setMobileNum1] = useState();
  const [mobileNum2, setMobileNum2] = useState('');
  const nav = useNavigate();
  const [loaderBtn, setLoaderBtn] = useState(false);

  const dispatch = useDispatch();
  const recruiterSettingsUpdate = () => {
    dispatch(counterActions.recruiterSetting());
  };

  const recruiter_settings_update = useSelector(
    (state) => state.counter.recruiter_setting
  );
  /*---------------------------------fetching users details------------------------------------------------------------------------ */
  useEffect(() => {
    const fetchRecruiter = async () => {
      try {
        const result = await fetch(
          `${baseUrl}/users/getUserById/${localStorage.getItem("userId")}`
        );
        const jsonData = await result.json();
        if (!result.ok) {
          throw new Error(jsonData.message);
        }
        setRecruiter(jsonData.posts);
        setIsLoading(false)

      } catch (error) {
        console.log(error);
      }
    };

    fetchRecruiter();
  }, [recruiter_settings_update]);
  /*--------------------------------------------------setting user details---------------------------------------------------------- */
  useEffect(() => {
    if (recruiter) {
      if (recruiter.recruiterId) {
        let x = recruiter.recruiterId;
        setFullName(x.fullName);
        setUserName(x.userName);
        setEmail(x.email);
        setPhoto(x.photo);
        setIntroduction(x.introduction);
        setMobileNum1(x.mobileNum1);
        setMobileNum2(x.mobileNum2);
        if (recruiter) {
          if (recruiter.recruiterId) {
            if (recruiter.recruiterId.profilePhoto) {
              let profilename = recruiter.recruiterId.profilePhoto.filename;
              setProfilePhoto(`${baseUrl}/users/getImage/${profilename}`);
            }
          }
        }
      } else {
        setFullName(recruiter.fullName);
        setEmail(recruiter.email);
        setMobileNum1(recruiter.phoneNumber);
      }
    }
  }, [recruiter]);

  /*------------------------------------------------updating settings-------------------------------------------------------------- */
  const formHandler = async (e) => {
    e.preventDefault();
    setLoaderBtn(true);

    try {
      const formData = new FormData();
      formData.set("fullName", fullName);
      formData.set("userName", userName);
      formData.set("email", email);
      formData.append("profilePhoto", photo);
      formData.set("introduction", introduction);
      formData.set("mobileNum1", mobileNum1);
      formData.set("mobileNum2", mobileNum2);

      let token = localStorage.getItem('token')
      const result = await fetch(
        `${baseUrl}/recruiter/settingsRecruiter/${localStorage.getItem(
          "userId"
        )}`,
        {
          method: "put",
          headers: {
            "Authorization": `Bearer ${token}`
          },
          body: formData,
        }
      );
      const jsonData = await result.json();
      console.log(jsonData, "kkkkkkkkk")
      setIsLoading(false)

      if (!result.ok) {
        toast.error(jsonData.message, {

        })
        throw new Error(jsonData.message);

      }
      recruiterSettingsUpdate();
      setLoaderBtn(false);

      toast.success(jsonData.message);
      // setTimeout(() => {
      //   nav('/recruiter')
      // }, 2000)
    } catch (error) {
      toast(error);
      setLoaderBtn(false);

    }
  };

  let a = () => {
    setTimeout(() => {
      nav("/recruiter");
    }, 600);
  };
  /*---------------------------------------------------------------------------------------------------------------------------------- */
  return (
    <div>
      <div className="my-10">
        <h6 className="text-lg font-semibold lg:text-xl xl:text-2xl">
          Profile Info
        </h6>
        <p className="text-gray-600">
          Update your photo and personal details here!
        </p>
      </div>
      {
        isLoading ? <div className="flex justify-center items-center h-[54vh]">
          <Loader />
        </div>
          :

          <form className="flex flex-col gap-10" onSubmit={formHandler}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center">
              <label htmlFor="fullName" className="flex-1 font-medium">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
                id="fullName"
                placeholder={fullName}
                required
                className="flex-[2] outline-none px-3 py-2 border rounded-md focus:ring-2"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center">
              <label htmlFor="username" className="flex-1 font-medium">
                Username
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                id="username"
                placeholder={userName}
                // required
                className="flex-[2] outline-none px-3 py-2 border rounded-md focus:ring-2"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center">
              <label htmlFor="email" className="flex-1 font-medium">
                Email
              </label>
              <input
                type="text"
                value={email}
                readOnly
                // onChange={(e) => {
                //   setEmail(e.target.value);
                // }}
                id="email"
                placeholder={email}
                className="flex-[2] outline-none px-3 py-2 border rounded-md focus:ring-2"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center">
              <div className="flex-1">
                <label htmlFor="mobile1" className="font-medium">
                  Your Photo
                </label>
                <p className="text-gray-500 text-sm">
                  This will be displayed on your profile.
                </p>
              </div>
              <div className="flex-[2] flex gap-2 justify-between items-center">
                {
                  profilePhoto ?
                    <img
                      src={`${profilePhoto}`}
                      alt=""
                      className="w-10 h-10 lg:w-16 lg:h-16 rounded-full"
                    />
                    :
                    <FaUserCircle className="w-10 h-10 lg:w-16 lg:h-16 rounded-full text-gray-500" />

                }

                <div className="border shadow-sm rounded-md p-5">
                  <input
                    type="file"
                    name=""
                    id="updateLogo"
                    className="hidden"
                    onChange={(e) => {
                      setPhoto(e.target.files[0]);
                      setPhoto_(URL.createObjectURL(e.target.files[0]));
                    }}
                  />
                  <label
                    htmlFor="updateLogo"
                    className="flex flex-col items-center flex-wrap gap-5"
                  >
                    <FaCloudUploadAlt className="text-2xl text-gray-600 cursor-pointer" />
                    <p className="text-sm text-gray-600" id="updateLogo">
                      {photo_ ? (
                        <div className="flex flex-col gap-1 items-center">
                          {photo_ && (
                            <img
                              src={photo_}
                              alt=""
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          )}
                          x
                        </div>
                      ) : (
                        "Upload the new profile photo."
                      )}
                    </p>
                  </label>
                </div>
              </div>
            </div>

            <div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center">
                <div className="flex-1">
                  <label htmlFor="bio" className="font-medium">
                    Your Introduction
                  </label>
                  <p className="text-gray-500 text-sm">
                    Write a short description.
                  </p>
                </div>
                <textarea
                  type="text"
                  id="bio"
                  value={introduction}
                  onChange={(e) => {
                    setIntroduction(e.target.value);
                    // setCharCount(charCount - 1);
                  }}
                  rows={5}
                  placeholder="Add a short bio..."
                  className="flex-[2] outline-none px-3 py-2 border rounded-md focus:ring-2"
                />
              </div>
              {/* <p className="sm:text-end text-gray-400 text-sm">
            {charCount} characters left
          </p> */}
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center">
              <div className="flex-1">
                <label htmlFor="mobile1" className="font-medium">
                  Mobile
                </label>
                <p className="text-gray-500 text-sm">Your Mobile number</p>
              </div>
              <input
                type="number"
                value={mobileNum1}
                onChange={(e) => {
                  setMobileNum1(e.target.value);
                }}
                id="mobile1"
                placeholder="9876543210"
                required
                className="flex-[2] outline-none px-3 py-2 border rounded-md focus:ring-2"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center">
              <div className="flex-1">
                <label htmlFor="mobile2" className="font-medium">
                  Alternative Mobile
                </label>
                <p className="text-gray-500 text-sm">Your Mobile number</p>
              </div>
              <input
                type="number"
                value={mobileNum2}
                onChange={(e) => {
                  setMobileNum2(e.target.value);
                }}
                id="mobile2"
                placeholder="1234567890"
                className="flex-[2] outline-none px-3 py-2 border rounded-md focus:ring-2"

              />
            </div>

            <div className="flex items-center justify-end gap-5 text-white">
              <button
                className="font-semibold px-4 py-1.5 border bg-gray-400 hover:bg-gray-500 rounded-md"
                type="button"
                onClick={a}
              >
                Cancel
              </button>

              {
                loaderBtn ? <div className="flex justify-end">
                  <ThreeDots
                    height="50"
                    width="50"
                    radius="9"
                    color="#4287f5"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}

                  />
                </div>
                  :
                  <button
                    className="font-semibold px-4 py-1.5 border bg-[color:var(--blue)] rounded-md"
                    type="submit"
                  >
                    Save Changes
                  </button>
              }
            </div>
          </form>
      }
    </div>
  );
};

// <------------------------------------------------------------------------------------------------------------------------------>

const RecruiterPassword = () => {
  const nav = useNavigate();
  // const {
  //   value: oldPassword,
  //   hasError: oldPasswordHasError,
  //   isValid: oldPasswordIsValid,
  //   valueChangeHandler: oldPasswordChangeHandler,
  //   reset: oldPasswordResetInput,
  //   inputBlurHandler: oldPasswordInputBlurHandler,
  // } = useInput((value) => value !== "");

  // const {
  //   value: newPassword,
  //   hasError: newPasswordHasError,
  //   isValid: newPasswordIsValid,
  //   valueChangeHandler: newPasswordChangeHandler,
  //   reset: newPasswordResetInput,
  //   inputBlurHandler: newPasswordInputBlurHandler,
  // } = useInput((value) => value.trim().length > 8);

  // const {
  //   value: confirmPassword,
  //   hasError: confirmPasswordHasError,
  //   isValid: confirmPasswordIsValid,
  //   valueChangeHandler: confirmPasswordChangeHandler,
  //   reset: confirmPasswordResetInput,
  //   inputBlurHandler: confirmPasswordInputBlurHandler,
  // } = useInput((value) => value.trim() === newPassword);

  const [oldPassword, setOldPassword] = useState("");
  const [oldPasswordError, setOldPasswordError] = useState("")

  const [newPassword, setNewPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("")

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("")

  const [securityLoader, setSecurityLoader] = useState(false);
  const [googleTrue, setgoogleTrue] = useState(false)
  useEffect(() => {

    fetch(`${baseUrl}/users/getUserById/${localStorage.getItem("userId")}`).then(res => res.json())
      .then((data) => {
        setgoogleTrue(data.posts.google);
        console.log(googleTrue);
      })

  }, [googleTrue])



  const formHandler = async (e) => {
    e.preventDefault();


    if (!oldPassword) {
      setOldPasswordError('Old Password is required')
    } else {
      setOldPasswordError('')
    }

    if (!newPassword) {
      setNewPasswordError('New Password is required')
    } else {
      setNewPasswordError('')
    }

    if (!confirmPassword) {
      setConfirmPasswordError('Confirm Password is required')
    } else {
      setConfirmPasswordError('')
    }

    if (oldPassword && newPassword && confirmPassword) {

      if (newPassword === confirmPassword) {
        setSecurityLoader(true);

        try {
          const result = await fetch(
            `${baseUrl}/users/changeUserPassword/${localStorage.getItem(
              "userId"
            )}`,
            {
              method: "put",
              body: JSON.stringify({ newPassword, oldPassword }),
              headers: {
                "Content-type": "application/json",
              },
            }
          );

          const jsonData = await result.json();
          if (!result.ok) {
            toast.error(jsonData.message);
            throw new Error(jsonData.message);
          }
          // console.log(jsonData);
          toast.success("Password changed!");
          setSecurityLoader(false);

        } catch (error) {
          console.log(error);
          toast.error(error);
          setSecurityLoader(false);

        }
      } else {
        toast.error("New Password and confirm password doesn't match!");
      }
    }


    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };




  let a = () => {
    toast("Redirecting to dashboard!");
    setTimeout(() => {
      nav("/recruiter");
    }, 1000);
  };

  return (
    <>
      {
        googleTrue === true ?
          <div style={{ width: '78vw', height: '71vh', display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <h3 className="text-[#0984e3] font-bold">You Are Logged in By Google</h3>
            <p>You have not access to change password from here</p>


          </div> :

          <div>
            <div className="my-10">
              <h6 className="text-lg font-semibold lg:text-xl xl:text-2xl">
                Password
              </h6>
              <p className="text-gray-600">
                Please enter your current password to change your password!
              </p>
            </div>

            <form className="flex flex-col gap-10" onSubmit={formHandler}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center">
                <label htmlFor="currPass" className="flex-1 font-medium">
                  Current Password
                </label>
                <input
                  type="text"
                  autoComplete="off"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  // onBlur={oldPasswordInputBlurHandler}
                  id="currPass"
                  placeholder="current password"
                  className="flex-[2] outline-none px-3 py-2 border rounded-md focus:ring-2"
                />
              </div>
              {oldPasswordError && <p className="text-red-600 md:ml-[33%] mt-[-5%] md:mt-[-2.5%]">{oldPasswordError}</p>}


              <div className="">
                <div className="flex flex-col sm:flex-row items-start sm:items-center">
                  <label htmlFor="newPass" className="flex-1 font-medium">
                    New Password
                  </label>
                  <input
                    type="text"
                    autoComplete="off"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    // onBlur={newPasswordInputBlurHandler}
                    id="newPass"
                    placeholder="new password"
                    className="flex-[2] outline-none px-3 py-2 border rounded-md focus:ring-2"
                  />
                </div>
                {newPasswordError && <p className="text-red-600 md:ml-[33%] ">{newPasswordError}</p>}
                <p className="sm:text-end text-gray-400 text-sm">
                  Keep your password strong.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center">
                <label htmlFor="confirmPass" className="flex-1 font-medium">
                  Confirm Password
                </label>
                <input
                  type="text"
                  value={confirmPassword}
                  autoComplete="off"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  // onBlur={confirmPasswordInputBlurHandler}
                  id="confirmPass"
                  placeholder="confirm new password"
                  className="flex-[2] outline-none px-3 py-2 border rounded-md focus:ring-2"
                />
              </div>
              {confirmPasswordError && <p className="text-red-600 md:ml-[33%] mt-[-5%] md:mt-[-2.5%]">{confirmPasswordError}</p>}


              <div className="flex items-center justify-end gap-5 text-white">
                <button
                  className="font-semibold px-4 py-1.5 border bg-gray-400 hover:bg-gray-500 rounded-md"
                  type="button"
                  onClick={a}
                >
                  Cancel
                </button>


                {
                  securityLoader ?
                    <ThreeDots
                      height="50"
                      width="50"
                      radius="9"
                      color="#4287f5"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      wrapperClassName=""
                      visible={true}
                    />
                    :

                    <button
                      className="font-semibold px-4 py-1.5 border bg-[color:var(--blue)] rounded-md"
                      type="submit"
                    >
                      Update Password
                    </button>
                }
              </div>
            </form>
          </div>
      }
    </>
  );
};

// .........................Bank detail ...................................................

const BankDetails = () => {
  const nav = useNavigate();
  const [Loader, setLoader] = useState(false);
  const [selectValue, setSelectValue] = useState('Saving')
  const [recruiterBanking, setRecruiterBanking] = useState([])
  const [reduce, forceUpdate] = useState((x) => x + 1, 0)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,

  } = useForm();



  useEffect(() => {
    const fetchRecruiter = async () => {
      try {
        const result = await fetch(
          `${baseUrl}/recruiter/recruitorBankingDetails/${localStorage.getItem("userId")}`, {
          method: 'GET',
          headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
        }
        );
        const jsonData = await result.json();
        if (!result.ok) {
          throw new Error(jsonData.message);
        }
        console.log(jsonData);
        setRecruiterBanking(jsonData.data);

      } catch (error) {
        console.log(error);
      }
    };

    fetchRecruiter();
  }, [reduce]);




  const handleUpdateBankDetails = async (data) => {
    try {
      const bankDetails = {
        accountHolderName: data.accountHolderName,
        accountType: selectValue,
        bankAccountNumber: data.accountNum,
        bankName: data.bankName,
        ifscCode: data.ifsc,
        swiftCode: data.swift,
      }
      const result = await fetch(
        `${baseUrl}/recruiter/editRecruitorBankingDetails/${localStorage.getItem("userId")}`, {
        method: 'PUT',
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "content-type": "application/json"
        },
        body: JSON.stringify(bankDetails)
      }
      );
      const jsonData = await result.json();
      if (!result.ok) {
        toast.error(jsonData.message)

        throw new Error(jsonData.message);
      }
      console.log(jsonData);
      toast.success(jsonData.message)
      forceUpdate()
    } catch (error) {
      console.log(error);

    }






  }
  let a = () => {
    toast("Redirecting to dashboard!");

    nav("/recruiter");

  };

  return (
    <div>
      <h2 className="text-lg font-semibold lg:text-xl xl:text-2xl my-5">
        Account Details
      </h2>

      <form onSubmit={handleSubmit(handleUpdateBankDetails)}>


        <div className="flex flex-col gap-1">
          <label htmlFor="accountHolderName" className="font-medium">
            Account Holder Name
          </label>
          <input
            {...register('accountHolderName', { required: 'Account Holder Name is required' })}
            defaultValue={recruiterBanking?.accountHolderName}
            type="text"
            placeholder="Aman garg"
            id="accountHolderName"
            className="px-3 py-2 border max-w-lg rounded-md outline-none focus:ring-1"
          />
          {errors.accountHolderName && <p className="text-red-600">{errors.accountHolderName?.message}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="accountType" className="font-medium">
            Account Type
          </label>
          <div className="max-w-lg">
            {/* <Select
                  label="Account"
                  value={accountType}
                  onChange={(e) => {
                    setaccountType(e.target.value);
                  }}
                >
                  <Option selected value="Saving">
                    Savings
                  </Option>
                  <Option value="Current">Current</Option> */}
            <Select
              label="Account"
              value={recruiterBanking?.accountType}

              {...register('accountType')}
              // value={selectValue}
              onChange={(value) => {
                setSelectValue(value);
              }}
            >
              <Option defaultChecked value="Saving">Saving</Option>
              <Option value="Current">Current</Option>
            </Select>

          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="accountNum" className="font-medium">
            Bank Account Number
          </label>
          <input
            type="number"
            defaultValue={recruiterBanking?.bankAccountNumber}

            {...register('accountNum', { required: 'Account Number is required' })}
            placeholder="1234567890"
            id="accountNum"
            className="px-3 py-2 border max-w-lg rounded-md outline-none focus:ring-1"
          />
          {errors.accountNum && <p className="text-red-600">{errors.accountNum?.message}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="bankName" className="font-medium">
            Bank Name
          </label>
          <input
            type="text"
            defaultValue={recruiterBanking?.bankName}

            {...register('bankName', { required: 'Bank Name is required' })}
            placeholder="STATE BANK OF INDIA"
            id="bankName"
            className="px-3 py-2 border max-w-lg rounded-md outline-none focus:ring-1"
          />
          {errors.bankName && <p className="text-red-600">{errors.bankName?.message}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="ifsc" className="font-medium">
            IFSC Code
          </label>
          <input
            type="text"
            defaultValue={recruiterBanking?.ifscCode}

            {...register('ifsc', { required: 'IFSC Code is required' })}
            placeholder="DJGN3984FN"
            id="ifsc"
            className="px-3 py-2 border max-w-lg rounded-md outline-none focus:ring-1"
          />
          {errors.ifsc && <p className="text-red-600">{errors.ifsc?.message}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="swift" className="font-medium">
            Swift Code
          </label>
          <input
            type="text"
            defaultValue={recruiterBanking?.swiftCode}

            {...register('swift', { required: ' Swift Code is required' })}
            placeholder="DJGN3984FN"
            id="swift"
            className="px-3 py-2 border max-w-lg rounded-md outline-none focus:ring-1"
          />
          {errors.swift && <p className="text-red-600">{errors.swift?.message}</p>}
        </div>

        <div className="flex items-center justify-end gap-5 text-white">
          <button
            className="font-semibold px-4 py-1.5 border bg-gray-400 hover:bg-gray-500 rounded-md"
            type="button"
            onClick={a}
          >
            Cancel
          </button>


          {
            Loader ?
              <ThreeDots
                height="50"
                width="50"
                radius="9"
                color="#4287f5"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
              />
              :

              <button
                className="font-semibold px-4 py-1.5 border bg-[color:var(--blue)] rounded-md"
                type="submit"
              >
                Update
              </button>
          }
        </div>

      </form>
    </div>
  )
}

export default RecruiterSettings;
