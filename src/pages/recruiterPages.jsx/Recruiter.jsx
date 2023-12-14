import React from "react";
import { AiOutlineHome, AiOutlineRead, AiOutlineSetting } from "react-icons/ai";
import { BiDoorOpen, BiHelpCircle } from "react-icons/bi";
import { BsBagCheck } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import { RiLightbulbFlashLine } from "react-icons/ri";
import { MdOutlineManageSearch } from "react-icons/md";
import { CgLogOut } from "react-icons/cg";
import { Link, useLocation } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { baseUrl } from "../../baseUrl";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { counterActions } from "../../store/index-redux";
import PitchYourFeatureModal from "../../components/modal/PitchYourFeatureModal";
import VoteModal from "../../components/modal/VoteModal";
import { FaUserCircle } from "react-icons/fa";

const Recruiter = ({ isRecruiterSidebarOpen, setIsRecruiterSidebarOpen }) => {
  const path = useLocation().pathname.split("/")[2];
  const authCtx = useContext(AuthContext);
  const navigation = useNavigate();
  const [userDetails, setUserDetails] = useState();
  const [userName, setUserName] = useState();
  const [profilePhoto, setProfilePhoto] = useState();
  const [email, setEmail] = useState();
  const [openPitchFeatureModal, setOpenPitchFeatureModal] = useState(false);
  const [openVoteModal, setOpenVoteModal] = useState(false);

  const dispatch = useDispatch();
  const recruiterNotificationUpdate = () => {
    dispatch(counterActions.recruiterNotificationUpdate());
  };

  const recruiter_settings_update = useSelector(
    (state) => state.counter.recruiter_setting
  );

  useEffect(() => {
    if (userDetails) {
      if (userDetails.recruiterId) {
        let x = userDetails?.recruiterId;
        if (x.profilePhoto) {
          let profilename = x?.profilePhoto?.filename;
          setProfilePhoto(`${baseUrl}/users/getImage/${profilename}`);
        }
        if (x.userName) {
          setUserName(x?.userName);
        }
        if (!x.userName) {
          setUserName(x?.fullName);
        }
        setEmail(x?.email);
      } else {
        setUserName(userDetails?.fullName);

        setEmail(userDetails?.email);
      }
    }
  }, [recruiter_settings_update, userDetails]);

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
      } catch (error) {
        console.log(error);
      }
    };
    getUserDetails();
  }, [recruiter_settings_update]);

  const userVoteId = window.localStorage.getItem('userId')
  const logoutHandler = (e) => {
    e.preventDefault();

    // fetch(`${baseUrl}/auth/vote/${userVoteId}`).then(res => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     if (data.vote === false) {
    //       setOpenVoteModal(true);
    //     } else {
    authCtx.logout();
    navigation("/");

    //   }




    // })







    // setTimeout(() => {
    // authCtx.logout();
    // navigation("/");
    // }, 5000);
  };

  return (
    // <div>
    //   <div>
    <div className="bg-[#E5EDFF] text-black h-screen overflow-y-auto lg:sticky lg:top-0 lg:flex lg:flex-col lg:justify-between">
      <div className="lg:hidden">
        <span>
          <ImCross
            onClick={() => setIsRecruiterSidebarOpen(false)}
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
            {
              profilePhoto ?
                <img
                  src={`${profilePhoto}`}
                  alt=""
                  className="rounded-full w-14 h-14 border-4 border-white "
                />
                :
                <FaUserCircle className="rounded-full w-14 h-14 border-4 border-white text-gray-500 " />

            }
            <div className="flex flex-col">
              <h2 className="font-bold">{userName}</h2>
              <h3>{email}</h3>
            </div>
          </div>

          <hr className="w-full border-2 bg-white my-6" />
        </div>

        <div className="flex flex-col gap-5 px-7 py-5">
          <Link to="/recruiter">
            <div
              onClick={() => setIsRecruiterSidebarOpen(false)}
              className={`flex gap-5 items-center hover:text-[color:var(--blue)] cursor-pointer  
                  ${path === undefined && "text-[color:var(--blue)]"}
                  `}
            >
              <AiOutlineHome className="text-2xl" />
              <h4 className="text-lg">Home</h4>
            </div>
          </Link>

          <Link to="/recruiter/openjobs">
            <div
              onClick={() => setIsRecruiterSidebarOpen(false)}
              className={`flex gap-5 items-center hover:text-[color:var(--blue)] cursor-pointer 
                 ${path === "openjobs" && "text-[color:var(--blue)]"}
                `}
            >
              <BiDoorOpen className="text-2xl" />
              <h4 className="text-lg">Open Positions</h4>
            </div>
          </Link>

          <Link to="/recruiter/claimedpositions">
            <div
              onClick={() => setIsRecruiterSidebarOpen(false)}
              className={`flex gap-5 items-center hover:text-[color:var(--blue)] cursor-pointer 
                 ${path === "claimedpositions" && "text-[color:var(--blue)]"}
                  `}
            >
              <BsBagCheck className="text-2xl" />
              <h4 className="text-lg">Claimed Positions</h4>
            </div>
          </Link>

          <Link to="/recruiter/managecandidates">
            <div
              onClick={() => setIsRecruiterSidebarOpen(false)}
              className={`flex gap-5 items-center hover:text-[color:var(--blue)] cursor-pointer 
                ${path === "managecandidates" && "text-[color:var(--blue)]"}
                `}
            >
              <MdOutlineManageSearch className="text-2xl" />
              <h4 className="text-lg">Manage Candidates</h4>
            </div>
          </Link>

          <Link to="/blogs">
            <div className="flex gap-5 items-center hover:text-[color:var(--blue)] cursor-pointer">
              <AiOutlineRead className="text-2xl" />
              <h4 className="text-lg">Blogs</h4>
            </div>
          </Link>



          <Link to="/recruiter/settings">
            <div
              onClick={() => setIsRecruiterSidebarOpen(false)}
              className={`flex gap-5 items-center hover:text-[color:var(--blue)] cursor-pointer 
                  ${path === "settings" && "text-[color:var(--blue)]"}
                  `}
            >
              <AiOutlineSetting className="text-2xl" />
              <h4 className="text-lg">Settings</h4>
            </div>
          </Link>

          <Link to="/recruiterneedhelp">
            <div className="flex gap-5 items-center hover:text-[color:var(--blue)] cursor-pointer">
              <BiHelpCircle className="text-2xl" />
              <h4 className="text-lg">Need help?</h4>
            </div>
          </Link>

          <div
            className="flex gap-5 items-center hover:text-[color:var(--blue)] cursor-pointer"
            onClick={() => { setOpenPitchFeatureModal(true); window.localStorage.setItem('PITCH_DATA_FOR_FEATURE', "Recruiter") }}
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
          <button
            className="flex gap-5 items-center justify-center bg-[color:var(--blue)] hover:bg-[color:var(--dark-blue)] text-white p-3 rounded-lg w-full"
            onClick={logoutHandler}
          >
            <CgLogOut className="text-2xl" />
            <h4 className="text-lg">Logout</h4>
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

export default Recruiter;

//  <div>
//    <div className="lg:flex">
//      <div className="lg:flex-1 bg-[#0052ff] h-screen lg:sticky top-0 bg-opacity-10 flex flex-col justify-between">
//        <div>
//          <div className="flex flex-col justify-center items-center">
//            <div className="p-4">
//              <Link to="/">
//                <h1 className="text-[color:var(--blue)] font-bold text-2xl">
//                  rework
//                </h1>
//              </Link>
//            </div>

//            <div className="flex items-center gap-5">
//              <img
//                src={`${profilePhoto}`}
//                alt=""
//                className="rounded-full w-14 h-14 border-4 border-white"
//              />

//              <div className="flex flex-col">
//                <h2 className="font-bold">{userName}</h2>
//                <h3>{email}</h3>
//              </div>
//            </div>

//            <hr className="w-full border-2 bg-white my-6" />
//          </div>

//          <div className="flex flex-col gap-6 px-7 py-5">
//            <Link to="/recruiter">
//              <div
//                className={`flex gap-5 items-center hover:text-[color:var(--blue)] cursor-pointer
//                   ${path === undefined && "text-[color:var(--blue)]"}`}
//              >
//                <AiOutlineHome className="text-2xl" />
//                <h4 className="text-xl">Home</h4>
//              </div>
//            </Link>

//            <Link to="/recruiter/openjobs">
//              <div
//                className={`flex gap-5 items-center hover:text-[color:var(--blue)] cursor-pointer
//                  ${path === "openjobs" && "text-[color:var(--blue)]"}
//                 `}
//              >
//                <BiDoorOpen className="text-2xl" />
//                <h4 className="text-xl">Open Positions</h4>
//              </div>
//            </Link>

//            <Link to="/recruiter/claimedpositions">
//              <div
//                className={`flex gap-5 items-center hover:text-[color:var(--blue)] cursor-pointer
//                  ${path === "claimedpositions" && "text-[color:var(--blue)]"}
//                   `}
//              >
//                <BsBagCheck className="text-2xl" />
//                <h4 className="text-xl">Claimed Positions</h4>
//              </div>
//            </Link>

//            <Link to="/recruiter/managecandidates">
//              <div
//                className={`flex gap-5 items-center hover:text-[color:var(--blue)] cursor-pointer
//                 ${path === "managecandidates" && "text-[color:var(--blue)]"}
//                 `}
//              >
//                <MdOutlineManageSearch className="text-2xl" />
//                <h4 className="text-xl">Manage Candidates</h4>
//              </div>
//            </Link>

//            <Link to="/blogs">
//              <div className="flex gap-5 items-center hover:text-[color:var(--blue)] cursor-pointer">
//                <AiOutlineRead className="text-2xl" />
//                <h4 className="text-xl">Blogs</h4>
//              </div>
//            </Link>

//            <Link to="/recruiter/settings">
//              <div
//                className={`flex gap-5 items-center hover:text-[color:var(--blue)] cursor-pointer
//                   ${path === "settings" && "text-[color:var(--blue)]"}
//                   `}
//              >
//                <AiOutlineSetting className="text-2xl" />
//                <h4 className="text-xl">Settings</h4>
//              </div>
//            </Link>

//            <Link to="/recruiterneedhelp">
//              <div className="flex gap-5 items-center hover:text-[color:var(--blue)] cursor-pointer">
//                <BiHelpCircle className="text-2xl" />
//                <h4 className="text-xl">Need help?</h4>
//              </div>
//            </Link>
//          </div>
//        </div>

//        <div>
//          <div className="px-7 py-5 flex justify-center">
//            <button
//              className="flex gap-5 items-center justify-center bg-[color:var(--blue)] text-white p-3 rounded-lg w-full"
//              onClick={logoutHandler}
//            >
//              <CgLogOut className="text-2xl" />
//              <h4 className="text-lg">Logout</h4>
//            </button>
//          </div>
//        </div>
//      </div>
//    </div>
//  </div>;
