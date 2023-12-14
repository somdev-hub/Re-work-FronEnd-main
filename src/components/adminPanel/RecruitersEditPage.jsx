import React, { useState, useEffect, useRef, useReducer } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { Select, Option } from "@material-tailwind/react";
import ProfileCard from "./ProfileCard";
import { useNavigate, useLocation } from "react-router-dom";
import { baseUrl } from "../../baseUrl";
import { toast, ToastContainer } from "react-toastify";
import moment from "moment/moment";
import { set } from "mongoose";
import { ThreeDots } from "react-loader-spinner";

const RecruitersEditPage = () => {
  const location = useLocation();
  const navigation = useNavigate();
  const accountTypeRef = useRef();

  const [recruiter, setRecruiter] = useState();

  const [fullName, setFullName] = useState();
  const [fullNameError, setFullNameError] = useState('');

  const [email, setemail] = useState();
  const [emailError, setemailError] = useState("");

  const [dob, setdob] = useState();
  const [dobError, setdobError] = useState("");

  const [mobileNum1, setmobileNum1] = useState();
  const [mobileNum1Error, setmobileNum1Error] = useState("");

  const [mobileNum2, setmobileNum2] = useState();
  const [mobileNum2Error, setmobileNum2Error] = useState("");

  const [highestEducation, sethighestEducation] = useState();
  const [highestEducationError, sethighestEducationError] = useState("");

  const [city, setcity] = useState();
  const [cityError, setcityError] = useState("");

  const [state, setstate] = useState();
  const [stateError, setstateError] = useState("");

  const [_PAN, set_PAN] = useState();
  const [_PANError, set_PANError] = useState("");

  const [_GST, set_GST] = useState();
  const [_GSTError, set_GSTError] = useState("");

  const [accountHolderName, setaccountHolderName] = useState();
  const [accountHolderNameError, setaccountHolderNameError] = useState("");

  const [accountType, setaccountType] = useState("");
  const [accountTypeError, setaccountTypeError] = useState("");

  const [bankAccountNumber, setbankAccountNumber] = useState();
  const [bankAccountNumberError, setbankAccountNumberError] = useState("");

  const [bankName, setbankName] = useState();
  const [bankNameError, setbankNameError] = useState("");

  const [ifscCode, setifscCode] = useState();
  const [ifscCodeError, setifscCodeError] = useState("");

  const [swiftCode, setswiftCode] = useState();
  const [swiftCodeError, setswiftCodeError] = useState("");

  const [linkedIn, setlinkedIn] = useState();
  const [linkedInError, setlinkedInError] = useState("");

  const [facebook, setfacebook] = useState();
  const [facebookError, setfacebookError] = useState("");

  const [instagram, setinstagram] = useState();
  const [instagramError, setinstagramError] = useState("");

  const [twitter, settwitter] = useState();
  const [twitterError, settwitterError] = useState("");

  const [reducerValue, forceUpdata] = useReducer((x) => x + 1, 0);
  const [loaderBtn, setLoaderBtn] = useState(false);

  useEffect(() => {
    setRecruiter(location.state);
    forceUpdata();
  }, []);

  useEffect(() => {
    if (recruiter) {
      if (recruiter.recruiterId) {
        let x = recruiter.recruiterId;
        setFullName(x.fullName);
        setemail(x.email);
        let date = new Date(x.dob).toISOString();
        let adjDate = date.split("T")[0];
        setdob(adjDate);
        // setdob(x.dob);
        setmobileNum1(x.mobileNum1);
        setmobileNum2(x.mobileNum2);
        sethighestEducation(x.highestEducation);
        setcity(x.city);
        setstate(x.state);
        set_PAN(x._PAN);
        set_GST(x._GST);
        setaccountHolderName(x.accountHolderName);
        setaccountType(x.accountType);
        setbankAccountNumber(x.bankAccountNumber);
        setbankName(x.bankName);
        setifscCode(x.ifscCode);
        setswiftCode(x.swiftCode);
        setlinkedIn(x.linkedIn);
        setfacebook(x.facebook);
        settwitter(x.twitter);
        setinstagram(x.instagram);
      } else {
        setFullName(recruiter.fullName);
        setemail(recruiter.email);
      }
    }
  }, [reducerValue]);

  const [submitted, setSubmitted] = useState(false);

  const formHandler = async (e) => {
    e.preventDefault();

    if (!fullName) {
      setFullNameError('Full name is required')
    } else {
      setFullNameError('')
    }


    if (!email) {
      setemailError('Error is required')
    } else {
      setemailError('')
    }

    if (!dob) {
      setdobError('dob is required')
    } else {
      setdobError('')
    }

    if (!mobileNum1) {
      setmobileNum1Error('Mobile number 1 is required')
    } else {
      setmobileNum1Error('')
    }

    if (!mobileNum2) {
      setmobileNum2Error('Moibile number 2 required')
    } else {
      setmobileNum2Error('')
    }

    if (!highestEducation) {
      sethighestEducationError('Highest Education is required')
    } else {
      sethighestEducationError('')
    }

    if (!city) {
      setcityError('City is required')
    } else {
      setcityError('')
    }

    if (!state) {
      setstateError('State is required')
    } else {
      setstateError('')
    }

    if (!_PAN) {
      set_PANError('PAN is required')
    } else {
      set_PANError('')
    }

    if (!_GST) {
      set_GSTError('GST is required')
    } else {
      set_GSTError('')
    }

    if (!accountHolderName) {
      setaccountHolderNameError('Account holder name is required')
    } else {
      setaccountHolderNameError('')
    }

    if (!accountType) {
      setaccountTypeError('Account type is required')
    } else {
      setaccountTypeError('')
    }

    if (!bankAccountNumber) {
      setbankAccountNumberError('Bank account number is required')
    } else {
      setbankAccountNumberError('')
    }

    if (!bankName) {
      setbankNameError('Bank Name is required')
    } else {
      setbankNameError('')
    }

    if (!ifscCode) {
      setifscCodeError('IFSC code is required')
    } else {
      setifscCodeError('')
    }

    if (!swiftCode) {
      setswiftCodeError('Swift code is required')
    } else {
      setswiftCodeError('')
    }

    if (!linkedIn) {
      setlinkedInError('LinkedIn is required')
    } else {
      setlinkedInError('')
    }

    if (!facebook) {
      setfacebookError('Facebook is required')
    } else {
      setfacebookError('')
    }

    if (!instagram) {
      setinstagramError('Instragram is required')
    } else {
      setinstagramError('')
    }

    if (!twitter) {
      settwitterError('Twitter is required')
    } else {
      settwitterError('')
    }

    if (fullName && email && dob && mobileNum1 && mobileNum2 && highestEducation && city && state && _PAN && _GST && accountHolderName && accountType && bankAccountNumber && bankName && ifscCode && swiftCode && linkedIn && facebook && instagram && twitter) {
      try {
        // if (submitted) {
        //   return;
        // }
        // setSubmitted(true);


        const data = {
          fullName,
          email,
          dob,
          mobileNum1,
          mobileNum2,
          city,
          state,
          _PAN,
          _GST,
          accountHolderName,
          accountType,
          bankAccountNumber,
          bankName,
          ifscCode,
          highestEducation,
          swiftCode,
          linkedIn,
          facebook,
          twitter,
          instagram,
        };
        // console.warn(accountType);
        let token = localStorage.getItem("token")
        const result = await fetch(
          `${baseUrl}/admin/editRecruiter/${recruiter._id}`,
          {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
              "Content-type": "application/json",
              "Authorization": `Bearer ${token}`
            },
          }
        );
        const jsonData = await result.json();
        // console.log(jsonData);
        setLoaderBtn(true)

        if (!result.ok) {
          toast(jsonData.message);
          setSubmitted(false)
          setLoaderBtn(false)
          throw new Error(jsonData.message);
        }

        toast("Recruiter data updated!");
        setTimeout(() => {
          navigation("/admin/recruiters");
          setLoaderBtn(false)
        }, 1000);

      } catch (error) {
        toast(error);
        setLoaderBtn(false)
      }
    }
  };

  return (
    <div>
      <div className="flex justify-end gap-5 flex-wrap pb-4 border-b-2 border-black group">
        <div>
          <ProfileCard />
        </div>
      </div>

      <h2 className="text-[color:var(--blue)] font-medium text-xl lg:text-2xl lg:font-semibold xl:text-3xl mt-4 mb-8">
        Recruiter Details
      </h2>

      <div className="border-2">
        <div className="flex flex-col p-5 lg:p-8 xl:px-10">
          <form className="flex flex-col gap-4" onSubmit={formHandler}>
            <div className="flex flex-col gap-1">
              <label htmlFor="fullName" className="font-medium">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
                placeholder="Aman Garg"
                id="fullName"
                className="px-3 py-2 border max-w-lg rounded-md outline-none focus:ring-1"
              />
              {fullNameError && <p className="text-red-600">{fullNameError}</p>}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="font-medium">
                Email
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => {
                  setemail(e.target.value);
                }}
                placeholder="name@gmail.com"
                id="email"
                className="px-3 py-2 border max-w-lg rounded-md outline-none focus:ring-1"
              />
              {emailError && <p className="text-red-600">{emailError}</p>}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="dob" className="font-medium">
                DOB
              </label>
              <input
                type="Date"
                value={dob}
                onChange={(e) => {
                  setdob(e.target.value);
                }}
                placeholder="May 22, 1995"
                id="dob"
                className="px-3 py-2 border max-w-lg rounded-md outline-none focus:ring-1"
              />
              {dobError && <p className="text-red-600">{dobError}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="phone1" className="font-medium">
                  Mobile No.
                </label>
                <input
                  type="tel"
                  value={mobileNum1}
                  onChange={(e) => {
                    setmobileNum1(e.target.value);
                  }}
                  placeholder="1234567890"
                  id="phone1"
                  className="px-3 py-2 border max-w-lg rounded-md outline-none focus:ring-1"
                />
                {mobileNum1Error && <p className="text-red-600">{mobileNum1Error}</p>}
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="phone2" className="font-medium">
                  Mobile No. 2
                </label>
                <input
                  type="tel"
                  value={mobileNum2}
                  onChange={(e) => {
                    setmobileNum2(e.target.value);
                  }}
                  placeholder="9876543210"
                  id="phone2"
                  className="px-3 py-2 border max-w-lg rounded-md outline-none focus:ring-1"
                />
                {mobileNum2Error && <p className="text-red-600">{mobileNum2Error}</p>}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="education" className="font-medium">
                Highest Education
              </label>
              <input
                type="text"
                value={highestEducation}
                onChange={(e) => {
                  sethighestEducation(e.target.value);
                }}
                placeholder="B.Com"
                id="education"
                className="px-3 py-2 border max-w-lg rounded-md outline-none focus:ring-1"
              />
              {highestEducationError && <p className="text-red-600">{highestEducationError}</p>}
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="city" className="font-medium">
                City
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => {
                  setcity(e.target.value);
                }}
                placeholder="Pitampura"
                id="city"
                className="px-3 py-2 border max-w-lg rounded-md outline-none focus:ring-1"
              />
              {cityError && <p className="text-red-600">{cityError}</p>}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="state" className="font-medium">
                State
              </label>
              <input
                type="text"
                value={state}
                onChange={(e) => {
                  setstate(e.target.value);
                }}
                placeholder="Delhi"
                id="state"
                className="px-3 py-2 border max-w-lg rounded-md outline-none focus:ring-1"
              />
              {stateError && <p className="text-red-600">{stateError}</p>}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="pan" className="font-medium">
                PAN
              </label>
              <input
                type="text"
                value={_PAN}
                onChange={(e) => {
                  set_PAN(e.target.value);
                }}
                placeholder="NH1234UCG"
                id="pan"
                className="px-3 py-2 border max-w-lg rounded-md outline-none focus:ring-1"
              />
              {_PANError && <p className="text-red-600">{_PANError}</p>}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="gst" className="font-medium">
                GST
              </label>
              <input
                type="text"
                value={_GST}
                onChange={(e) => {
                  set_GST(e.target.value);
                }}
                placeholder="YNH1234UCGTU67"
                id="gst"
                className="px-3 py-2 border max-w-lg rounded-md outline-none focus:ring-1"
              />
              {_GSTError && <p className="text-red-600">{_GSTError}</p>}
            </div>

            <h2 className="font-medium text-xl lg:text-2xl lg:font-semibold xl:text-3xl mt-6 mb-2">
              Account Details
            </h2>

            <div className="flex flex-col gap-1">
              <label htmlFor="accountHolderName" className="font-medium">
                Account Holder Name
              </label>
              <input
                type="text"
                value={accountHolderName}
                onChange={(e) => {
                  setaccountHolderName(e.target.value);
                }}
                placeholder="Aman garg"
                id="accountHolderName"
                className="px-3 py-2 border max-w-lg rounded-md outline-none focus:ring-1"
              />
              {accountHolderNameError && <p className="text-red-600">{accountHolderNameError}</p>}
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
                  value={accountType}
                  onChange={(value) => {
                    setaccountType(value);
                  }}
                >
                  <Option value="Saving">Saving</Option>
                  <Option value="Current">Current</Option>
                </Select>
                {/* </Select> */}
              </div>
              {accountTypeError && <p className="text-red-600">{accountTypeError}</p>}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="accountNum" className="font-medium">
                Bank Account Number
              </label>
              <input
                type="number"
                value={bankAccountNumber}
                onChange={(e) => {
                  setbankAccountNumber(e.target.value);
                }}
                placeholder="1234567890"
                id="accountNum"
                className="px-3 py-2 border max-w-lg rounded-md outline-none focus:ring-1"
              />
              {bankAccountNumberError && <p className="text-red-600">{bankAccountNumberError}</p>}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="bankName" className="font-medium">
                Bank Name
              </label>
              <input
                type="text"
                value={bankName}
                onChange={(e) => {
                  setbankName(e.target.value);
                }}
                placeholder="STATE BANK OF INDIA"
                id="bankName"
                className="px-3 py-2 border max-w-lg rounded-md outline-none focus:ring-1"
              />
              {bankNameError && <p className="text-red-600">{bankNameError}</p>}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="ifsc" className="font-medium">
                IFSC Code
              </label>
              <input
                type="text"
                value={ifscCode}
                onChange={(e) => {
                  setifscCode(e.target.value);
                }}
                placeholder="DJGN3984FN"
                id="ifsc"
                className="px-3 py-2 border max-w-lg rounded-md outline-none focus:ring-1"
              />
              {ifscCodeError && <p className="text-red-600">{ifscCodeError}</p>}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="swift" className="font-medium">
                Swift Code
              </label>
              <input
                type="text"
                value={swiftCode}
                onChange={(e) => {
                  setswiftCode(e.target.value);
                }}
                placeholder="DJGN3984FN"
                id="swift"
                className="px-3 py-2 border max-w-lg rounded-md outline-none focus:ring-1"
              />
              {swiftCodeError && <p className="text-red-600">{swiftCodeError}</p>}
            </div>

            <h2 className="font-medium text-xl lg:text-2xl lg:font-semibold xl:text-3xl mt-6 mb-2">
              Social Media Links
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="linkedin" className="font-medium">
                  Linkedin
                </label>
                <input
                  type="text"
                  value={linkedIn}
                  onChange={(e) => {
                    setlinkedIn(e.target.value);
                  }}
                  placeholder="abcd"
                  id="linkedin"
                  className="px-3 py-2 border max-w-lg rounded-md outline-none focus:ring-1"
                />
                {linkedInError && <p className="text-red-600">{linkedInError}</p>}
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="facebook" className="font-medium">
                  Facebook
                </label>
                <input
                  type="text"
                  value={facebook}
                  onChange={(e) => {
                    setfacebook(e.target.value);
                  }}
                  placeholder="abcd"
                  id="facebook"
                  className="px-3 py-2 border max-w-lg rounded-md outline-none focus:ring-1"
                />
                {facebookError && <p className="text-red-600">{facebookError}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="twitter" className="font-medium">
                  Twitter
                </label>
                <input
                  type="text"
                  value={twitter}
                  onChange={(e) => {
                    settwitter(e.target.value);
                  }}
                  placeholder="abcd"
                  id="twitter"
                  className="px-3 py-2 border max-w-lg rounded-md outline-none focus:ring-1"
                />
                {twitterError && <p className="text-red-600">{twitterError}</p>}
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="insta" className="font-medium">
                  Instagram
                </label>
                <input
                  type="text"
                  value={instagram}
                  onChange={(e) => {
                    setinstagram(e.target.value);
                  }}
                  placeholder="abcd"
                  id="insta"
                  className="px-3 py-2 border max-w-lg rounded-md outline-none focus:ring-1"
                />
                {instagramError && <p className="text-red-600">{instagramError}</p>}
              </div>
            </div>

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

                <div className="text-white flex justify-end gap-5 mt-10 font-medium">
                  <button
                    onClick={() => { navigation("/admin/recruiters"); }}
                    className="bg-red-500 px-4 py-2 rounded-md flex gap-1.5 items-center"
                    type="button"
                  >
                    <AiOutlineDelete />
                    Discard
                  </button>

                  <button
                    className="bg-[color:var(--blue)] px-4 py-2 rounded-md"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
            }


          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RecruitersEditPage;
