import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { ThreeDots } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { baseUrl } from "../../baseUrl";
import { counterActions } from "../../store/index-redux";
import CompanyNotifications from "./CompanyNotifications";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const CompanySettings = () => {
  const [active, setActive] = useState(<CompanyDetails />);
  const [activeColor, setActiveColor] = useState(1);

  return (
    <div>
      <div className="flex justify-between items-center gap-5 flex-wrap pb-4 group">
        <h2 className="font-medium text-xl lg:text-2xl lg:font-semibold xl:text-3xl">
          Settings
        </h2>
        <div>
          <CompanyNotifications />
        </div>
      </div>

      <div className="flex justify-start gap-10 border-b-2 my-5">
        <h6
          className={`font-medium text-lg cursor-pointer 
            ${
              activeColor === 1 &&
              "text-[color:var(--blue)] border-b-2 border-[color:var(--blue)]"
            }
          `}
          onClick={() => {
            setActiveColor(1);
            setActive(<CompanyDetails />);
          }}
        >
          Company Details
        </h6>
        <h6
          className={`font-medium text-lg cursor-pointer 
          ${
            activeColor === 2 &&
            "text-[color:var(--blue)] border-b-2 border-[color:var(--blue)]"
          }
          `}
          onClick={() => {
            setActiveColor(2);
            setActive(<CompanySecurity />);
          }}
        >
          Security
        </h6>
      </div>

      <div>{active}</div>
      <ToastContainer />
    </div>
  );
};

const CompanyDetails = () => {
  const [company, setCompany] = useState();
  const [profileName, setprofileName] = useState();
  const [tagLine, settagLine] = useState();
  const [logo, setlogo] = useState();
  const [logo_, setlogo_] = useState();
  const [emailBranding, setemailBranding] = useState(false);
  const [jdBranding, setjdBranding] = useState(false);
  const [postJobBranding, setpostJobBranding] = useState(false);
  const [contactNum1, setcontactNum1] = useState();
  const [contactNum2, setcontactNum2] = useState();
  const [email, setemail] = useState();
  const [twitter, settwitter] = useState();
  const [facebook, setfacebook] = useState();
  const [linkedIn, setlinkedIn] = useState();
  const [loaderBtn, setLoaderBtn] = useState(false);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const companySettingsUpdate = () => {
    dispatch(counterActions.companySetting());
  };
  const company_settings_update = useSelector(
    (state) => state.counter.company_setting
  );

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const result = await fetch(
          `${baseUrl}/users/getUserById/${localStorage.getItem("userId")}`
        );
        const jsonData = await result.json();
        if (!result.ok) {
          throw new Error(jsonData.message);
        }
        setCompany(jsonData.posts);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCompany();
  }, [company_settings_update]);

  useEffect(() => {
    if (company) {
      if (company.companyId) {
        let x = company.companyId;
        setprofileName(x.profileName);
        settagLine(x.tagLine);
        setcontactNum1(x.contactNum1);
        setcontactNum2(x.contactNum2);
        setemail(x.email);
        settwitter(x.twitter);
        setfacebook(x.facebook);
        setlinkedIn(x.linkedIn);
        if (company) {
          if (company.companyId) {
            if (company.companyId.companyLogo) {
              let profilename = company.companyId.companyLogo.filename;
              setlogo(`${baseUrl}/users/getImage/${profilename}`);
            }
          }
        }
        setemailBranding(x.emailBranding);
        setjdBranding(x.jdBranding);
        setpostJobBranding(x.postJobBranding);
      } else {
        setemail(company.email);
        setcontactNum1(company.phoneNumber);
      }
    }
  }, [company]);

  const formHandler = async (e) => {
    e.preventDefault();
    setLoaderBtn(true);
    try {
      const formData = new FormData();
      formData.append("profileName", profileName);
      formData.append("tagLine", tagLine);
      formData.append("email", email);
      formData.append("logo", logo);
      formData.append("emailBranding", emailBranding);
      formData.append("jdBranding", jdBranding);
      formData.append("postJobBranding", postJobBranding);
      formData.append("contactNum1", contactNum1);
      formData.append("contactNum2", contactNum2);
      formData.append("twitter", twitter);
      formData.append("facebook", facebook);
      formData.append("linkedIn", linkedIn);
      let token = localStorage.getItem("token");
      const result = await fetch(
        `${baseUrl}/company/settingsCompany/${localStorage.getItem("userId")}`,
        {
          method: "put",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const jsonData = await result.json();
      if (!result.ok) {
        toast.error(jsonData.message);
        throw new Error("Something went wrong.");
      }
      companySettingsUpdate();
      setLoaderBtn(false);

      toast.success(jsonData.message);
      // setTimeout(() => {
      //   nav("/company");
      // }, 1000);
    } catch (error) {
      toast(error);
      setLoaderBtn(false);
    }
  };
  let a = () => {
    setTimeout(() => {
      nav("/company");
    }, 600);
  };

  return (
    <div>
      <div className="my-10">
        <h6 className="text-lg font-semibold lg:text-xl xl:text-2xl">
          Company Profile
        </h6>
        <p className="text-gray-600">
          Update your company logo and details here!
        </p>
      </div>

      <form className="flex flex-col gap-10" onSubmit={formHandler}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center">
          <div className="flex-1">
            <label htmlFor="profileName" className="font-medium">
              Public Profile Name
            </label>
            <p className="text-gray-500 text-sm">
              This will be displayed on your profile
            </p>
          </div>
          <input
            type="text"
            id="profileName"
            value={profileName}
            onChange={(e) => {
              setprofileName(e.target.value);
            }}
            placeholder="Seeman Corporation"
            required
            className="flex-[2] outline-none px-3 py-2 border rounded-md focus:ring-2"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center">
          <div className="flex-1">
            <label htmlFor="tagline" className="font-medium">
              TagLine
            </label>
            <p className="text-gray-500 text-sm">A quick intro of company!</p>
          </div>
          <input
            type="text"
            id="tagline"
            value={tagLine}
            onChange={(e) => {
              settagLine(e.target.value);
            }}
            placeholder="Write your tagline..."
            required
            className="flex-[2] outline-none px-3 py-2 border rounded-md focus:ring-2"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center">
          <div className="flex-1">
            <label htmlFor="mobile1" className="font-medium">
              Company Logo
            </label>
            <p className="text-gray-500 text-sm">
              Company Logo (Displayed on profile){" "}
            </p>
          </div>
          <div className="flex-[2] flex gap-2 justify-between items-center">
            <img
              src={logo}
              alt=""
              className="w-10 h-10 lg:w-16 lg:h-16 xl:w-20 xl:h-20 rounded-full"
            />

            <div className="border shadow-sm rounded-md p-5">
              <input
                type="file"
                name=""
                id="updateLogo"
                className="hidden"
                onChange={(e) => {
                  setlogo(e.target.files[0]);
                  setlogo_(URL.createObjectURL(e.target.files[0]));
                }}
              />
              <label
                htmlFor="updateLogo"
                className="flex flex-col items-center flex-wrap gap-5"
              >
                <FaCloudUploadAlt className="text-2xl text-gray-600 cursor-pointer" />
                <p className="text-sm text-gray-600" id="updateLogo">
                  {logo_ ? (
                    <div className="flex flex-col gap-1 items-center">
                      {logo_ && (
                        <img
                          src={logo_}
                          alt=""
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      )}
                    </div>
                  ) : (
                    "Upload the new company logo."
                  )}
                </p>
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center">
          <div className="flex-1">
            <label htmlFor="branding" className="font-medium">
              Branding
            </label>
            <p className="text-gray-500 text-sm">Check your branding areas</p>
          </div>

          <div className="flex-[2] flex justify-start">
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="brandEmails"
                className="my-1.5"
                checked={emailBranding ? true : false}
                onClick={(e) => {
                  setemailBranding(!emailBranding);
                }}
              />
              <div className="flex flex-col ">
                <label htmlFor="brandEmails" className="font-medium">
                  Emails
                </label>
                <p className="text-gray-500 text-sm">
                  Includes your logo and details.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="JD"
                className="my-1.5"
                checked={jdBranding ? true : false}
                onClick={(e) => {
                  setjdBranding(!jdBranding);
                }}
              />
              <div className="flex flex-col ">
                <label htmlFor="JD" className="font-medium">
                  JD
                </label>
                <p className="text-gray-500 text-sm">
                  Includes your logo and details.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="brandJobPost"
                className="my-1.5"
                checked={postJobBranding ? true : false}
                onClick={(e) => {
                  setpostJobBranding(!postJobBranding);
                }}
              />
              <div className="flex flex-col ">
                <label htmlFor="brandJobPost" className="font-medium">
                  Job Post
                </label>
                <p className="text-gray-500 text-sm">
                  Includes your logo and details.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center">
          <div className="flex-1">
            <label htmlFor="mobile1" className="font-medium">
              Contact Number
            </label>
            <p className="text-gray-500 text-sm">Company contact number</p>
          </div>
          <input
            type="number"
            value={contactNum1}
            onChange={(e) => {
              setcontactNum1(e.target.value);
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
              Alternative contact number
            </label>
            <p className="text-gray-500 text-sm">Company Alternative number</p>
          </div>
          <input
            type="number"
            value={contactNum2}
            onChange={(e) => {
              setcontactNum2(e.target.value);
            }}
            id="mobile2"
            placeholder="1234567890"
            required
            className="flex-[2] outline-none px-3 py-2 border rounded-md focus:ring-2"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center">
          <div className="flex-1">
            <label htmlFor="email" className="font-medium">
              Company Email
            </label>
            <p className="text-gray-500 text-sm">Comapny email ID</p>
          </div>
          <input
            type="email"
            value={email}
            readOnly
            // onChange={(e) => {
            //   setemail(e.target.value);
            // }}
            id="email"
            placeholder="company@email.com"
            className="flex-[2] outline-none px-3 py-2 border rounded-md focus:ring-2"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center">
          <div className="flex-1">
            <label htmlFor="socialProfiles" className="font-medium">
              Social Profiles
            </label>
            <p className="text-gray-500 text-sm">Add your social profiles</p>
          </div>
          <div className="flex-[2] flex flex-col gap-5">
            <div className="flex flex-col">
              <label htmlFor="twitterProfile" className="text-sm font-medium">
                Twitter Link
              </label>
              <input
                type="text"
                value={twitter}
                onChange={(e) => {
                  settwitter(e.target.value);
                }}
                id="twitterProfile"
                placeholder="Twitter"
                className="flex-[2] outline-none px-3 py-2 border rounded-md focus:ring-2"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="facebookLink" className="text-sm font-medium">
                Facebook Link
              </label>
              <input
                type="text"
                value={facebook}
                onChange={(e) => {
                  setfacebook(e.target.value);
                }}
                id="facebookLink"
                placeholder="Facebook"
                className="flex-[2] outline-none px-3 py-2 border rounded-md focus:ring-2"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="linkedinLink" className="text-sm font-medium">
                Linkedin Link
              </label>
              <input
                type="text"
                value={linkedIn}
                onChange={(e) => {
                  setlinkedIn(e.target.value);
                }}
                id="linkedinLink"
                placeholder="Linkedin"
                className="flex-[2] outline-none px-3 py-2 border rounded-md focus:ring-2"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-5 text-white">
          <button
            className="font-semibold px-4 py-1.5 border bg-gray-400 hover:bg-gray-500 rounded-md"
            type="button"
            onClick={a}
          >
            Cancel
          </button>

          {loaderBtn ? (
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
          ) : (
            <button
              className="font-semibold px-4 py-1.5 border bg-[color:var(--blue)] rounded-md"
              type="submit"
            >
              Save Changes
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

const CompanySecurity = () => {
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
  const [oldPasswordError, setOldPasswordError] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  // added show old New and confirm hooks
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [securityLoader, setSecurityLoader] = useState(false);
  // added show hide password toggle functionality
  const togglePasswordVisibility = (field) => {
    if (field === "oldPassword") setShowOldPassword(!showOldPassword);
    if (field === "newPassword") setShowNewPassword(!showNewPassword);
    if (field === "confirmPassword")
      setShowConfirmPassword(!showConfirmPassword);
  };
  const formHandler = async (e) => {
    e.preventDefault();

    if (!oldPassword) {
      setOldPasswordError("Old Password is required");
    } else {
      setOldPasswordError("");
    }

    if (!newPassword) {
      setNewPasswordError("New Password is required");
    } else {
      setNewPasswordError("");
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Confirm Password is required");
    } else {
      setConfirmPasswordError("");
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
      nav("/company");
    }, 1000);
  };

  return (
    <div className="px-2">
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

          <div className="flex-[2] relative">
            <input
              type={showOldPassword ? "text" : "password"}
              autoComplete="off"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              id="currPass"
              placeholder="Current password"
              className="outline-none px-3 py-2 border rounded-md focus:ring-2 w-full blackPlaceholder"
            />
            <span
              className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
              onClick={() => togglePasswordVisibility("oldPassword")}
            >
              {showOldPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
        {oldPasswordError && (
          <p className="text-red-600 md:ml-[33%] mt-[-5%] md:mt-[-2.5%]">
            {oldPasswordError}
          </p>
        )}

        <div className="">
          <div className="flex flex-col sm:flex-row items-start sm:items-center">
            <label htmlFor="newPass" className="flex-1 font-medium">
              New Password
            </label>
            <div className="flex-[2] relative">
              <input
                type={showNewPassword ? "text" : "password"}
                autoComplete="off"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                id="newPass"
                placeholder="New password"
                className="outline-none px-3 py-2 border rounded-md focus:ring-2 w-full blackPlaceholder"
              />
              <span
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                onClick={() => togglePasswordVisibility("newPassword")}
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {newPasswordError && (
            <p className="text-red-600 md:ml-[33%] ">{newPasswordError}</p>
          )}
          <p className="sm:text-end text-gray-400 text-sm">
            Keep your password strong.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center">
          <label htmlFor="confirmPass" className="flex-1 font-medium">
            Confirm Password
          </label>
          <div className="flex-[2] relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              autoComplete="off"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              id="confirmPass"
              placeholder="Confirm new password"
              className="outline-none px-3 py-2 border rounded-md focus:ring-2 w-full blackPlaceholder"
            />
            <span
              className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
              onClick={() => togglePasswordVisibility('confirmPassword')}>
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
        {confirmPasswordError && (
          <p className="text-red-600 md:ml-[33%] mt-[-5%] md:mt-[-2.5%]">
            {confirmPasswordError}
          </p>
        )}

        <div className="flex items-center justify-end gap-5 text-white">
          <button
            className="font-semibold px-4 py-1.5 border bg-gray-400 hover:bg-gray-500 rounded-md"
            type="button"
            onClick={a}
          >
            Cancel
          </button>

          {securityLoader ? (
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
          ) : (
            <button
              className="font-semibold px-4 py-1.5 border bg-[color:var(--blue)] rounded-md"
              type="submit"
            >
              Update Password
            </button>
          )}
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CompanySettings;
