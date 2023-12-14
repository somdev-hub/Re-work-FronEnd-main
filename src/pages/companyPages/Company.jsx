import React, { useContext, useState, useEffect } from "react";
import {
  AiOutlineHome,
  AiOutlineSetting,
  AiOutlineFileAdd,
} from "react-icons/ai";
import { BiHelpCircle, BiTime } from "react-icons/bi";
import { ImCross } from "react-icons/im";
import { MdClose } from "react-icons/md";
import { CgLogOut } from "react-icons/cg";
import { FiRadio } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { baseUrl } from "../../baseUrl";
import { useDispatch, useSelector } from "react-redux";
import { counterActions } from "../../store/index-redux";
import { RiLightbulbFlashLine } from "react-icons/ri";
import PitchYourFeatureModal from "../../components/modal/PitchYourFeatureModal";
import VoteModal from "../../components/modal/VoteModal";
import { FaCoins } from "react-icons/fa";

const Company = ({ isCompanySidebarOpen, setIsCompanySidebarOpen }) => {
  const path = useLocation().pathname.split("/")[2];
  const authCtx = useContext(AuthContext);
  const navigation = useNavigate();
  const companyEmail = window.localStorage.getItem("userEmailId");
  const companyUserName = window.localStorage.getItem("userName");
  const [email, setEmail] = useState();
  const [photo, setPhoto] = useState();
  const [userName, setUserName] = useState();
  const [isTokenFound, setTokenFound] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [openPitchFeatureModal, setOpenPitchFeatureModal] = useState(false);
  const [openVoteModal, setOpenVoteModal] = useState(false);

  const dispatch = useDispatch();
  const companyNotificationUpdate = () => {
    dispatch(counterActions.companyNotificationUpdate());
  };

  const company_settings_update = useSelector(
    (state) => state.counter.company_setting
  );

  /*----------------------------------------Saving Notifications--------------------------------------------------------------------- */
  const saveNotification = async (data) => {
    try {
      const result = await fetch(
        `${baseUrl}/users/saveNotification/${localStorage.getItem("userId")}`,
        {
          method: "put",
          body: JSON.stringify(data),
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      const jsonData = await result.json();
      if (!result.ok) {
        throw new Error(jsonData.message);
      }
      // console.log(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  /*----------------------------------------------------------------------------------------------------------------------------------- */
  const userVoteId = window.localStorage.getItem('userId')
  const logoutHandler = (e) => {
    e.preventDefault();
    // fetch(`${baseUrl}/auth/vote/${userVoteId}`).then(res => res.json())
    //   .then((data) => {
    //     if (data.vote === false) {
    //       setOpenVoteModal(true);
    //     } 
    //     else {
          authCtx.logout();
          navigation("/");
      //   }
      // })

  };

  // const logoutHandler = (e) => {
  //   e.preventDefault();


  //   setOpenVoteModal(true);


  //   // setTimeout(() => {
  //   // authCtx.logout();
  //   // navigation("/");
  //   // }, 5000);
  // };

  // const [userDetails, setUserDetails] = useState();
  // let profilename;
  // if(userDetails){
  //   if(userDetails.companyId){
  //     if ((userDetails.companyId).companyLogo) {
  //       profilename= ((userDetails.companyId).companyLogo).filename;
  //     }
  //   }
  // }
  useEffect(() => {
    if (userDetails) {
      if (userDetails.companyId) {
        let x = userDetails.companyId;
        if (x.companyLogo) {
          let profilename = x.companyLogo.filename;
          setPhoto(`${baseUrl}/users/getImage/${profilename}`);
        }
        if (x.profileName) {
          setUserName(x.profileName);
        }
        if (!x.profileName) {
          setUserName(x.companyName);
        }
        setEmail(x.email);
      } else {
        setUserName(userDetails.companyName);
        setEmail(userDetails.email);
      }
    }
  }, [company_settings_update, userDetails]);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const result = await fetch(
          `${baseUrl}/users/getUserById/${localStorage.getItem("userId")}`
        );
        const jsonData = await result.json();
        if (!result.ok) {
          throw new Error(jsonData.message);
        }
        setUserDetails(jsonData.posts);
        // console.log(jsonData);
      } catch (error) {
        console.log(error);
      }
    };
    getUserDetails();
  }, [company_settings_update]);

  return (
    // <div>
    //   <div>
    <div className="bg-[#E5EDFF] text-black h-screen overflow-y-auto lg:sticky lg:top-0 lg:flex lg:flex-col lg:justify-between">
      <div className="lg:hidden">
        <span>
          <ImCross
            onClick={() => setIsCompanySidebarOpen(false)}
            className="px-5 text-6xl"
          />
        </span>
      </div>

      <div className="overflow-y-auto overflow-x-hidden">
        <div className="flex flex-col justify-center items-center">
          <div className="p-4">
            <Link to="/">
              <h1 className="text-[color:var(--blue)] font-bold text-2xl">
                rework
              </h1>
            </Link>
          </div>

          <div className="flex items-center gap-5">
            <img
              src={`${photo}`}
              alt=""
              className="rounded-full w-14 h-14 border-4 border-white"
            />

            <div className="flex flex-col">
              <h2 className="font-bold">{userName}</h2>
              <h3 className="text-sm break-words">{email}</h3>
            </div>
          </div>

          <hr className="w-full border-2 bg-white my-6" />
        </div>

        <div className="flex flex-col gap-5 px-7 py-5">
          <Link to="/company">
            <div
              onClick={() => setIsCompanySidebarOpen(false)}
              className={`flex gap-5 items-center hover:text-[color:var(--blue)] cursor-pointer  
                  ${path === undefined && "text-[color:var(--blue)]"}`}
            >
              <AiOutlineHome className="text-2xl" />
              <h4 className="text-lg">Home</h4>
            </div>
          </Link>

          <Link to="/company/addnewjob">
            <div
              onClick={() => setIsCompanySidebarOpen(false)}
              className={`flex gap-5 items-center hover:text-[color:var(--blue)] cursor-pointer 
                 ${path === "addnewjob" && "text-[color:var(--blue)]"}
                `}
            >
              <AiOutlineFileAdd className="text-2xl" />
              <h4 className="text-lg">Add Jobs</h4>
            </div>
          </Link>

          <Link to="/company/pendingapproval">
            <div
              onClick={() => setIsCompanySidebarOpen(false)}
              className={`flex gap-5 items-center hover:text-[color:var(--blue)] cursor-pointer 
                 ${path === "pendingapproval" && "text-[color:var(--blue)]"}
                  `}
            >
              <BiTime className="text-2xl" />
              <h4 className="text-lg">Pending Approval</h4>
            </div>
          </Link>

          <Link to="/company/rejectedjobs">
            <div
              onClick={() => setIsCompanySidebarOpen(false)}
              className={`flex gap-5 items-center hover:text-[color:var(--blue)] cursor-pointer 
                ${path === "rejectedjobs" && "text-[color:var(--blue)]"}
                `}
            >
              <MdClose className="text-2xl" />
              <h4 className="text-lg">Rejected Jobs</h4>
            </div>
          </Link>

          <Link to="/company/livejobs">
            <div
              onClick={() => setIsCompanySidebarOpen(false)}
              className={`flex gap-5 items-center hover:text-[color:var(--blue)] cursor-pointer 
              ${path === "livejobs" && "text-[color:var(--blue)]"} `}
            >
              <FiRadio className="text-2xl" />
              <h4 className="text-lg">Live Jobs</h4>
            </div>
          </Link>

          <Link to="/company/credits">
            <div className={`flex gap-5 items-center hover:text-[color:var(--blue)] cursor-pointer 
                  ${path === "credits" && "text-[color:var(--blue)]"}`}
              onClick={() => setIsCompanySidebarOpen(false)}>
              <FaCoins className="text-2xl" />
              <h4 className="text-lg">Credits</h4>
            </div>
          </Link>

          <Link to="/company/settings">
            <div
              onClick={() => setIsCompanySidebarOpen(false)}
              className={`flex gap-5 items-center hover:text-[color:var(--blue)] cursor-pointer 
                ${path === "settings" && "text-[color:var(--blue)]"}
                `}
            >
              <AiOutlineSetting className="text-2xl" />
              <h4 className="text-lg">Settings</h4>
            </div>
          </Link>

          <Link to="/companyneedhelp">
            <div className="flex gap-5 items-center hover:text-[color:var(--blue)] cursor-pointer">
              <BiHelpCircle className="text-2xl" />
              <h4 className="text-lg">Need help?</h4>
            </div>
          </Link>

          <div 
            className="flex gap-5 items-center hover:text-[color:var(--blue)] cursor-pointer"
            onClick={() => { setOpenPitchFeatureModal(true); window.localStorage.setItem('PITCH_DATA_FOR_FEATURE', "company") }}
          >
            <RiLightbulbFlashLine className="text-2xl" />
            <h4 className="text-lg">Pitch a Feature!</h4>
          </div>
          <PitchYourFeatureModal
            openPitchFeatureModal={openPitchFeatureModal}
            setOpenPitchFeatureModal={setOpenPitchFeatureModal}
          />
        </div>
      </div>

      <div>
        <div className="px-7 py-5 flex justify-center">
          <button className="flex gap-5 items-center justify-center bg-[color:var(--blue)] hover:bg-[color:var(--dark-blue)] text-white p-3 rounded-lg w-full">
            <CgLogOut className="text-2xl" />
            <h4 className="text-lg" type="button" onClick={logoutHandler}>
              Logout
            </h4>
          </button>
          <VoteModal
            openVoteModal={openVoteModal}
            setOpenVoteModal={setOpenVoteModal}
          />
        </div>
      </div>
    </div>
    //   </div>
    // </div>
  );
};

export default Company;
