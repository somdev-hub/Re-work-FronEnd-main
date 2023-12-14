import React, { useState, useContext, useEffect } from "react";
import { MdDashboard, MdOutlineNotificationsActive, MdPayment } from "react-icons/md";
import {
  AiFillCaretDown,
  AiFillCaretUp,
  AiOutlineFileSearch,
} from "react-icons/ai";
import { FaRegUserCircle, FaWpforms } from "react-icons/fa";
import { BiBuildings, BiWallet, BiHelpCircle } from "react-icons/bi";
import { RiUserSettingsLine, RiLightbulbFlashLine } from "react-icons/ri";
import { BsStack } from "react-icons/bs";
import { VscReferences } from "react-icons/vsc";
import { ImCross } from "react-icons/im";
import { CgLogOut } from "react-icons/cg";
import { TbFileInvoice } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../baseUrl";
import { useDispatch, useSelector } from "react-redux";
import { counterActions } from "../../store/index-redux";

const Admin = ({ isAdminSidebarOpen, setIsAdminSidebarOpen }) => {
  const path = useLocation().pathname.split("/")[2];

  const [cms, setCms] = useState(false);
  const [forms, setForms] = useState(false);
  const [applications, setApplications] = useState(false);
  const [needHelp, setNeedHelp] = useState(false);
  const [featurePitches, setFeaturePitches] = useState(false);
  const [isTokenFound, setTokenFound] = useState(false);
  const authCtx = useContext(AuthContext);
  const navigation = useNavigate();

  const dispatch = useDispatch();
  const adminNotificationUpdate = () => {
    dispatch(counterActions.adminNotificationUpdate());
  };

  const admin_settings_update = useSelector(
    (state) => state.counter.admin_setting
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

  const logoutHandler = (e) => {
    e.preventDefault();
    authCtx.logout();
    navigation("/");
  };
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-[#E5EDFF] text-black h-screen overflow-y-auto lg:sticky lg:top-0 lg:flex lg:flex-col lg:justify-between">
      <div className="lg:hidden">
        <span>
          <ImCross
            onClick={() => setIsAdminSidebarOpen(false)}
            className="px-5 text-6xl"
          />
        </span>
      </div>
      <div>
        <div className="flex flex-col justify-center items-center sticky top-0 bg-[#E5EDFF] lg:relative">
          <div className="p-4">
            <Link to="/">
              <h1 className="text-[color:var(--blue)] font-bold text-2xl">
                rework
              </h1>
            </Link>
          </div>

          <hr className="w-full border-2 bg-white my-6" />
        </div>

        <div className="flex flex-col gap-5 px-7 py-5">
          <Link to="/admin">
            <div
              onClick={() => setIsAdminSidebarOpen(false)}
              className={`flex gap-5 items-center hover:text-[color:var(--blue)] 
                ${path === undefined && "text-[color:var(--blue)]"
                } cursor-pointer`}
            >
              <MdDashboard
                size={40}
                className="text-2xl bg-white p-1.5 rounded-full border-2"
              />
              <h4 className="text-lg">Dashboard</h4>
            </div>
          </Link>

          <Link to="/admin/recruiters">
            <div
              onClick={() => setIsAdminSidebarOpen(false)}
              className={`flex gap-5 items-center hover:text-[color:var(--blue)]
                 ${path === "recruiters" && "text-[color:var(--blue)]"
                } cursor-pointer`}
            >
              <FaRegUserCircle
                size={40}
                className="text-2xl bg-white p-1.5 rounded-full border"
              />
              <h4 className="text-lg">Recruiter</h4>
            </div>
          </Link>

          <Link to="/admin/companies">
            <div
              onClick={() => setIsAdminSidebarOpen(false)}
              className={`flex gap-5 items-center hover:text-[color:var(--blue)] ${path === "companies" && "text-[color:var(--blue)]"
                } cursor-pointer`}
            >
              <BiBuildings
                size={40}
                className="text-2xl bg-white p-1.5 rounded-full border"
              />
              <h4 className="text-lg">Company</h4>
            </div>
          </Link>

          <div
            className="flex justify-between gap-5 items-center hover:text-[color:var(--blue)] cursor-pointer"
            onClick={() => {
              setCms(!cms);
            }}
          >
            <div className="flex gap-5 items-center">
              <BsStack
                size={40}
                className="text-2xl bg-white p-1.5 rounded-full border"
              />
              <h4 className="text-lg">CMS</h4>
            </div>

            {cms ? <AiFillCaretDown size={25} /> : <AiFillCaretUp size={25} />}
          </div>
          {cms && (
            <div className="flex flex-col gap-3 items-start ml-12 ">
              <Link to="/admin/cmstermsandconditions/edit">
                <h2
                  onClick={() => setIsAdminSidebarOpen(false)}
                  className={`hover:text-[color:var(--blue)] cursor-pointer ${path === "cmstermsandconditions" &&
                    "text-[color:var(--blue)]"
                    }`}
                >
                  Terms and Conditions
                </h2>
              </Link>

              <Link to="/admin/cmsprivacypolicy/edit">
                <h2
                  onClick={() => setIsAdminSidebarOpen(false)}
                  className={`hover:text-[color:var(--blue)] cursor-pointer ${path === "cmsprivacypolicy" && "text-[color:var(--blue)]"
                    } `}
                >
                  Privacy Policies
                </h2>
              </Link>

              <Link to="/admin/cmsdataprotection/edit">
                <h2
                  onClick={() => setIsAdminSidebarOpen(false)}
                  className={`hover:text-[color:var(--blue)] cursor-pointer ${path === "cmsdataprotection" && "text-[color:var(--blue)]"
                    } `}
                >
                  Data Protection
                </h2>
              </Link>

              {/* <Link to="/admin/cmscareer/edit">
                    <h2
                      className={`hover:text-[color:var(--blue)] cursor-pointer ${
                        path === "cmscareer" && "text-[color:var(--blue)]"
                      } `}
                    >
                      Career
                    </h2>
                  </Link> */}
            </div>
          )}

          <div
            className="flex justify-between gap-5 items-center hover:text-[color:var(--blue)] cursor-pointer"
            onClick={() => {
              setForms(!forms);
            }}
          >
            <div className="flex gap-5 items-center">
              <FaWpforms
                size={40}
                className="text-2xl bg-white p-1.5 rounded-full border"
              />
              <h4 className="text-lg">Forms</h4>
            </div>

            {forms ? (
              <AiFillCaretDown size={25} />
            ) : (
              <AiFillCaretUp size={25} />
            )}
          </div>
          {forms && (
            <div className="flex flex-col gap-3 items-start ml-12 ">
              <Link to="/admin/investform">
                <h2
                  onClick={() => setIsAdminSidebarOpen(false)}
                  className={`hover:text-[color:var(--blue)] cursor-pointer ${path === "investform" && "text-[color:var(--blue)]"
                    } `}
                >
                  Invest
                </h2>
              </Link>

              <Link to="/admin/contactform">
                <h2
                  onClick={() => setIsAdminSidebarOpen(false)}
                  className={`hover:text-[color:var(--blue)] cursor-pointer ${path === "contactform" && "text-[color:var(--blue)]"
                    }`}
                >
                  Contact Us
                </h2>
              </Link>
            </div>
          )}

          <div className="flex gap-5 items-center hover:text-[color:var(--blue)] cursor-pointer">
            <VscReferences
              size={40}
              className="text-2xl bg-white p-1.5 rounded-full border"
            />
            <h4 className="text-lg">Referral</h4>
          </div>

          <Link to="/admin/manageroles">
            <div
              onClick={() => setIsAdminSidebarOpen(false)}
              className={`flex gap-5 items-center hover:text-[color:var(--blue)] cursor-pointer 
                ${path === "manageroles" && "text-[color:var(--blue)]"} `}
            >
              <RiUserSettingsLine
                size={40}
                className="text-2xl bg-white p-1.5 rounded-full border"
              />
              <h4 className="text-lg">Manage Roles</h4>
            </div>
          </Link>

          <div
            className="flex justify-between gap-5 items-center hover:text-[color:var(--blue)] cursor-pointer"
            onClick={() => {
              setApplications(!applications);
            }}
          >
            <div className="flex gap-5 items-center">
              <AiOutlineFileSearch
                size={40}
                className="text-2xl bg-white p-1.5 rounded-full border"
              />
              <h4 className="text-lg">Applications</h4>
            </div>

            {applications ? (
              <AiFillCaretDown size={25} />
            ) : (
              <AiFillCaretUp size={25} />
            )}
          </div>
          {applications && (
            <div className="flex flex-col gap-3 items-start ml-12 ">
              <Link to="/admin/recruitersubmissions">
                <h2
                  onClick={() => setIsAdminSidebarOpen(false)}
                  className={`hover:text-[color:var(--blue)] cursor-pointer ${path === "recruitersubmissions" &&
                    "text-[color:var(--blue)]"
                    }`}
                >
                  Recruiters submission
                </h2>
              </Link>

              <Link to="/admin/companypostedjobs">
                <h2
                  onClick={() => setIsAdminSidebarOpen(false)}
                  className={`hover:text-[color:var(--blue)] cursor-pointer ${path === "companypostedjobs" && "text-[color:var(--blue)]"
                    } `}
                >
                  Company Posted Jobs
                </h2>
              </Link>
              <Link to="/admin/candidaterole">
                <h2
                  onClick={() => setIsAdminSidebarOpen(false)}
                  className={`hover:text-[color:var(--blue)] cursor-pointer ${path === "candidaterole" && "text-[color:var(--blue)]"
                    } `}
                >
                  Candidate Role
                </h2>
              </Link>
            </div>
          )}
          <Link to="/admin/payments">
            <div
              onClick={() => setIsAdminSidebarOpen(false)}
              className={`flex gap-5 items-center hover:text-[color:var(--blue)] cursor-pointer
            ${path === "payments" && "text-[color:var(--blue)]"}`}>
              <BiWallet
                size={40}
                className="text-2xl bg-white p-1.5 rounded-full border"
              />
              <h4 className="text-lg">Payments</h4>
            </div>
          </Link>

          <Link to="/admin/companyCredits">
            <div
              onClick={() => setIsAdminSidebarOpen(false)}
              className={`flex gap-5 items-center hover:text-[color:var(--blue)] cursor-pointer
            ${path === "companyCredits" && "text-[color:var(--blue)]"}`}>
              <MdPayment
                size={40}
                className="text-2xl bg-white p-1.5 rounded-full border"
              />
              <h4 className="text-lg">Company Credits</h4>
            </div>
          </Link>

          <div className="flex gap-5 items-center hover:text-[color:var(--blue)] cursor-pointer">
            <TbFileInvoice
              size={40}
              className="text-2xl bg-white p-1.5 rounded-full border"
            />
            <h4 className="text-lg">Invoices</h4>
          </div>

          <Link to="/admin/pushnotifications">
            <div
              onClick={() => setIsAdminSidebarOpen(false)}
              className={`flex gap-5 items-center hover:text-[color:var(--blue)] cursor-pointer 
                ${path === "pushnotifications" && "text-[color:var(--blue)]"}
                `}
            >
              <MdOutlineNotificationsActive
                size={40}
                className="text-2xl bg-white p-1.5 rounded-full border"
              />
              <h4 className="text-lg">Push Notifications</h4>
            </div>
          </Link>

          <div
            className="flex justify-between gap-5 items-center hover:text-[color:var(--blue)] cursor-pointer"
            onClick={() => {
              setNeedHelp(!needHelp);
            }}
          >
            <div className="flex gap-5 items-center">
              <BiHelpCircle
                size={40}
                className="text-2xl bg-white p-1.5 rounded-full border"
              />
              <h4 className="text-lg">Need Help!</h4>
            </div>

            {needHelp ? (
              <AiFillCaretDown size={25} />
            ) : (
              <AiFillCaretUp size={25} />
            )}
          </div>
          {needHelp && (
            <div className="flex flex-col gap-3 items-start ml-12 ">
              <Link to="/admin/recruiterhelp">
                <h2
                  onClick={() => setIsAdminSidebarOpen(false)}
                  className={`hover:text-[color:var(--blue)] cursor-pointer ${path === "recruiterhelp" && "text-[color:var(--blue)]"
                    } `}
                >
                  Recruiter Questions
                </h2>
              </Link>

              <Link to="/admin/companyhelp">
                <h2
                  onClick={() => setIsAdminSidebarOpen(false)}
                  className={`hover:text-[color:var(--blue)] cursor-pointer ${path === "companyhelp" && "text-[color:var(--blue)]"
                    }`}
                >
                  Company Questions
                </h2>
              </Link>
            </div>
          )}

          <div
            className="flex justify-between gap-5 items-center hover:text-[color:var(--blue)] cursor-pointer"
            onClick={() => {
              setFeaturePitches(!featurePitches);
            }}
          >
            <div className="flex gap-5 items-center">
              <RiLightbulbFlashLine
                size={40}
                className="text-2xl bg-white p-1.5 rounded-full border"
              />
              <h4 className="text-lg">Feature Pitch</h4>
            </div>

            {featurePitches ? (
              <AiFillCaretDown size={25} />
            ) : (
              <AiFillCaretUp size={25} />
            )}
          </div>
          {featurePitches && (
            <div className="flex flex-col gap-3 items-start ml-12 ">
              <Link to="/admin/recruiterPitch">
                <h2
                  onClick={() => setIsAdminSidebarOpen(false)}
                  className={`hover:text-[color:var(--blue)] cursor-pointer ${path === "recruiterPitch" && "text-[color:var(--blue)]"
                    } `}
                >
                  Recruiter Pitches
                </h2>
              </Link>

              <Link to="/admin/companyPitch">
                <h2
                  onClick={() => setIsAdminSidebarOpen(false)}
                  className={`hover:text-[color:var(--blue)] cursor-pointer ${path === "companyPitch" && "text-[color:var(--blue)]"
                    }`}
                >
                  Company Pitches
                </h2>
              </Link>
            </div>
          )}
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
        </div>
      </div>
    </div>
    //   </div>
    // </div>
  );
};

export default Admin;
