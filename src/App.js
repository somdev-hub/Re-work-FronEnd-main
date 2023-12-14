import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import React, { useEffect, useState } from "react";
import Footer from "./components/footer/Footer";
import PrivacyPolicy from "./components/footer/footerContents/PrivacyPolicy";
import TermsAndConditions from "./components/footer/footerContents/TermsAndConditions";
import Cookies from "./components/footer/footerContents/Cookies";
import DataProtection from "./components/footer/footerContents/DataProtection";
import About from "./pages/about/About";
import Career from "./pages/career/Career";
import OpenJobs from "./components/recruiterComponents/OpenJobs";
import Blog from "./pages/blog/Blog";
import SingleBlog from "./pages/singleBlog/SingleBlog";
import InvestInRework from "./pages/invest/InvestInRework";
import Admin from "./pages/adminPages/Admin";
import AdminLogin from "./pages/adminPages/AdminLogin";
import AdminPanelRecruiters from "./components/adminPanel/AdminPanelRecruiters";
import AdminPanelCompanies from "./components/adminPanel/AdminPanelCompanies";
import CMSTermsAndConditions from "./components/adminPanel/cms/CMSTermsAndConditions";
import CMSPrivacyPolicy from "./components/adminPanel/cms/CMSPrivacyPolicy";
import CMSDataProtection from "./components/adminPanel/cms/CMSDataProtection";
import CMSCareer from "./components/adminPanel/cms/CMSCareer";
import AdminPanelHome from "./components/adminPanel/AdminPanelHome";
import Error404 from "./pages/errorPage/Error404";
import Recruiter from "./pages/recruiterPages.jsx/Recruiter";
import RecruiterHome from "./components/recruiterComponents/RecruiterHome";
import RecruitersEditPage from "./components/adminPanel/RecruitersEditPage";
import CompanyEditPage from "./components/adminPanel/CompanyEditPage";
import ClaimedPositions from "./components/recruiterComponents/ClaimedPositions";
import ManageCandidates from "./components/recruiterComponents/ManageCandidates";
import ManageRoles from "./components/adminPanel/manageRoles/ManageRoles";
import AddUser from "./components/adminPanel/manageRoles/AddUser";
import EditUser from "./components/adminPanel/manageRoles/EditUser";

import EmailVerify from "./pages/EmailVerify/index";
import ApplicationsCompanyPostedJobs from "./components/adminPanel/applications/ApplicationsCompanyPostedJobs";
import ApplicationsRecruiterSubmissions from "./components/adminPanel/applications/ApplicationsRecruiterSubmissions";
import ApplicationsCompanyPostedJobsVIewJobs from "./components/adminPanel/applications/ApplicationsCompanyPostedJobsVIewJobs";
import PushNotifications from "./components/adminPanel/PushNotifications";
import Company from "./pages/companyPages/Company";
import CompanyHome from "./components/companyComponents/CompanyHome";
import AddNewJob from "./components/companyComponents/AddNewJob";
import PendingApproval from "./components/companyComponents/PendingApproval";
import RejectedJobs from "./components/companyComponents/RejectedJobs";
import RecruiterSettings from "./components/recruiterComponents/RecruiterSettings";
import LiveJobs from "./components/companyComponents/LiveJobs";
import RecruiterNeedHelp from "./components/recruiterComponents/RecruiterNeedHelp";
import CompanyNeedHelp from "./components/companyComponents/CompanyNeedHelp";
import LiveJobsViewCandidates from "./components/companyComponents/LiveJobsViewCandidates";
import CompanySettings from "./components/companyComponents/CompanySettings";
import AuthContext from "./store/auth-context";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

import InvestFormData from "./components/adminPanel/forms/InvestFormData";
import ContactFormData from "./components/adminPanel/forms/ContactFormData";
import RecruiterQuestions from "./components/adminPanel/needHelp/RecruiterQuestions";
import CompanyQuestions from "./components/adminPanel/needHelp/CompanyQuestions";
import ApplicationsRecruiterSubmissionsViewJobs from "./components/adminPanel/applications/ApplicationsRecruiterSubmissionsViewJobs";
import ApplicationsRecruiterSubmissionsViewCandidates from "./components/adminPanel/applications/ApplicationsRecruiterSubmissionsViewCandidates";
import { FaBars } from "react-icons/fa";
import RecruiterPitches from "./components/adminPanel/featurePitches/RecruiterPitches";
import CompanyPitches from "./components/adminPanel/featurePitches/CompanyPitches";
import ForgotPassword from "./pages/login/ForgotPassword";
import HomeCompany from "./pages/home/HomeCompany";
import AdminPayments from "./components/adminPanel/Payments/AdminPayments";
import AdminPaymentsAddPacks from "./components/adminPanel/Payments/AdminPaymentsAddPacks";
import CompanyCredits from "./components/adminPanel/Payments/CompanyCredits";
import CompanyCreditsHistory from "./components/companyComponents/CompanyCreditsHistory";
import Credits from "./components/companyComponents/Credits";
import "swiper/css/bundle";
import ReactGA from "react-ga";
import CandidateRole from "./components/adminPanel/applications/CandidateRole";
import CandidateRoleViewJobs from "./components/adminPanel/applications/CandidateRoleViewJobs";
import CandidateRoleViewCandidates from "./components/adminPanel/applications/CandidateRoleViewCandidates";
import CancellationPage from "./components/footer/footerContents/CancellationPage";
import SupportPage from "./components/footer/footerContents/SupportPage";
import { CreditsCanlePaymet } from "./components/companyComponents/CreditsCanlePaymet";
import { CreditsSuccess } from "./components/companyComponents/CreditsSuccess";
import EmployerPage from "./pages/EmployerPage/EmployerPage";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login2/Login";
import OurTeam from "./pages/OurTeam/OurTeam";
import InvestInUs from "./pages/InvestInUs/InvestInUs";
import Hero from "./pages/NewHero/Hero";

ReactGA.initialize("UA-258280858-1");

const Layout = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Navbar open={open} setOpen={setOpen} />
      <div
        className={` ${
          open && "bg-slate-200 opacity-50"
        } pt-16 md:pt-[4.5rem] `}
      >
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

const AdminLayout = () => {
  const [isAdminSidebarOpen, setIsAdminSidebarOpen] = useState(false);
  // return (
  //   <>
  //     <div className="lg:flex">
  //       <div className="sticky z-50 g:flex-1 h-max lg:h-screen lg:sticky top-0 overflow-y-auto">
  //         <Admin />
  //       </div>

  //       <div className="lg:flex-[4]">
  //         <div className="m-5 lg:pb-8 lg:mx-10">
  //           <Outlet />
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // );
  return (
    <>
      <div className="lg:hidden z-40 sticky top-0">
        {isAdminSidebarOpen ? (
          <div>
            <Admin
              isAdminSidebarOpen={isAdminSidebarOpen}
              setIsAdminSidebarOpen={setIsAdminSidebarOpen}
            />
          </div>
        ) : (
          <div className="bg-[#E5EDFF] w-full text-black">
            <FaBars
              onClick={() => setIsAdminSidebarOpen(true)}
              className="p-5 text-6xl "
            />
          </div>
        )}
      </div>

      <div className="flex">
        <div className="hidden lg:inline-block lg:flex-1">
          <Admin
            isAdminSidebarOpen={isAdminSidebarOpen}
            setIsAdminSidebarOpen={setIsAdminSidebarOpen}
          />
        </div>

        <div className="lg:flex-[4] w-full overflow-x-hidden">
          <div
            className={`${
              isAdminSidebarOpen && "hidden"
            } m-5 lg:pb-8 lg:mx-10 overflow-x-hidden`}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

const RecruiterLayout = () => {
  const [isRecruiterSidebarOpen, setIsRecruiterSidebarOpen] = useState(false);
  // return (
  //   <>
  //     <div className="lg:flex">
  //       <div className="sticky w-full z-50 lg:flex-1 h-max lg:h-screen lg:sticky top-0 overflow-y-auto">
  //         <Recruiter />
  //       </div>

  //       <div className="lg:flex-[4]">
  //         <div className="m-5 lg:pb-8 lg:mx-10">
  //           <Outlet />
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // );
  return (
    <>
      <div className="lg:hidden z-40 sticky top-0">
        {isRecruiterSidebarOpen ? (
          <div>
            <Recruiter
              isRecruiterSidebarOpen={isRecruiterSidebarOpen}
              setIsRecruiterSidebarOpen={setIsRecruiterSidebarOpen}
            />
          </div>
        ) : (
          <div className="bg-[#E5EDFF] w-full text-black">
            <FaBars
              onClick={() => setIsRecruiterSidebarOpen(true)}
              className="p-5 text-6xl "
            />
          </div>
        )}
      </div>

      <div className="flex">
        <div className="hidden lg:inline-block lg:flex-1">
          <Recruiter
            isRecruiterSidebarOpen={isRecruiterSidebarOpen}
            setIsRecruiterSidebarOpen={setIsRecruiterSidebarOpen}
          />
        </div>

        <div className="lg:flex-[4] w-full overflow-x-hidden">
          <div
            className={`${
              isRecruiterSidebarOpen && "hidden"
            } m-5 lg:pb-8 lg:mx-10 overflow-x-hidden`}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

const CompanyLayout = () => {
  const [isCompanySidebarOpen, setIsCompanySidebarOpen] = useState(false);
  // return (
  //   <>
  //     <div className="lg:flex">
  //       <div className="sticky w-full z-50 lg:flex-1 h-max lg:h-screen lg:sticky top-0 overflow-y-auto">
  //         <Company />
  //       </div>

  //       <div className="lg:flex-[4]">
  //         <div className="m-5 lg:pb-8 lg:mx-10">
  //           <Outlet />
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // );
  return (
    <>
      <div className="lg:hidden z-40 sticky top-0">
        {isCompanySidebarOpen ? (
          <div>
            <Company
              isCompanySidebarOpen={isCompanySidebarOpen}
              setIsCompanySidebarOpen={setIsCompanySidebarOpen}
            />
          </div>
        ) : (
          <div className="bg-[#E5EDFF] w-full text-black">
            <FaBars
              onClick={() => setIsCompanySidebarOpen(true)}
              className="p-5 text-6xl "
            />
          </div>
        )}
      </div>

      <div className="flex">
        <div className="hidden lg:inline-block lg:flex-1">
          <Company
            isCompanySidebarOpen={isCompanySidebarOpen}
            setIsCompanySidebarOpen={setIsCompanySidebarOpen}
          />
        </div>

        <div className="lg:flex-[4] w-full overflow-x-hidden">
          <div
            className={`${
              isCompanySidebarOpen && "hidden"
            } m-5 lg:pb-8 lg:mx-10 overflow-x-hidden`}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const userRole = authCtx.role;
  const dashboard = localStorage.getItem("dashboard");
  const company = localStorage.getItem("company");
  const recruiter = localStorage.getItem("recruiter");
  const referral = localStorage.getItem("referral");
  const forms = localStorage.getItem("forms");
  const manageRoles = localStorage.getItem("manageRoles");
  const cms = localStorage.getItem("cms");
  const payment = localStorage.getItem("payment");
  const applications = localStorage.getItem("applications");
  const invoices = localStorage.getItem("invoices");
  const notifications = localStorage.getItem("notifications");
  const needHelp = localStorage.getItem("needHelp");
  // console.log("dashboard", dashboard);
  // console.log("company", company);
  console.log("application", applications);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        // {
        //   path: "/employers",
        //   element: <HomeCompany />
        // },
        {
          path: "/employers",
          element: <EmployerPage />
        },
        {
          path: "/ourteam",
          element: <OurTeam />
        },

        {
          path: "/privacypolicy",
          element: <PrivacyPolicy />
        },
        {
          path: "/termsandconditions",
          element: <TermsAndConditions />
        },
        {
          path: "/support",
          element: <SupportPage />
        },
        {
          path: "/cancellation",
          element: <CancellationPage />
        },

        {
          path: "/cookies",
          element: <Cookies />
        },
        {
          path: "/dataprotection",
          element: <DataProtection />
        },
        {
          path: "/about",
          element: <About />
        },
        {
          path: "/career",
          element: <Career />
        },
        // {
        //   path: "/investinrework",
        //   element: <InvestInRework />
        // },
        {
          path: "/investinrework",
          element: <InvestInUs />
        },
        {
          path: "/blogs",
          element: <Blog />
        },
        {
          path: "/singleblog/:id",
          element: <SingleBlog />
        }
      ]
    },
    // {
    //   path: "/register",
    //   element: <Register />,
    // },
    // {
    //   path: "/login",
    //   element: <Login />,
    // },
    {
      path: "/newHero",
      element: <Hero />
    },
    {
      path: "/signup",
      element: <SignUp />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/forgotPass",
      element: <ForgotPassword />
    },
    {
      path: "/auth/user/:id/verify/:token",
      element: <EmailVerify />
    },

    //admin paths start here
    {
      path: "/adminlogin",
      element: <AdminLogin />
    },

    {
      path: "/admin",
      element:
        isLoggedIn &&
        userRole &&
        userRole !== "recruiter" &&
        userRole !== "company" ? (
          <AdminLayout />
        ) : (
          <AdminLogin />
        ),
      children: [
        {
          path: "/admin",
          element:
            isLoggedIn &&
            dashboard === "true" &&
            userRole &&
            userRole !== "recruiter" &&
            userRole !== "company" ? (
              <AdminPanelHome />
            ) : (
              <Error404 />
            )
        },
        {
          path: "recruiters",
          element:
            isLoggedIn &&
            recruiter === "true" &&
            userRole &&
            userRole !== "recruiter" &&
            userRole !== "company" ? (
              <AdminPanelRecruiters />
            ) : (
              <Error404 />
            )
        },
        {
          path: "recruiters/edit",
          element:
            isLoggedIn &&
            recruiter === "true" &&
            userRole &&
            userRole !== "recruiter" &&
            userRole !== "company" ? (
              <RecruitersEditPage />
            ) : (
              <Error404 />
            )
        },
        {
          path: "companies",
          element:
            isLoggedIn &&
            company === "true" &&
            userRole &&
            userRole !== "recruiter" &&
            userRole !== "company" ? (
              <AdminPanelCompanies />
            ) : (
              <Error404 />
            )
        },
        {
          path: "company/edit",
          element:
            isLoggedIn &&
            company === "true" &&
            userRole &&
            userRole !== "recruiter" &&
            userRole !== "company" ? (
              <CompanyEditPage />
            ) : (
              <Error404 />
            )
        },
        {
          path: "cmstermsandconditions/edit",
          element:
            isLoggedIn &&
            cms === "true" &&
            userRole &&
            userRole !== "recruiter" &&
            userRole !== "company" ? (
              <CMSTermsAndConditions />
            ) : (
              <Error404 />
            )
        },
        {
          path: "cmsprivacypolicy/edit",
          element:
            isLoggedIn &&
            cms === "true" &&
            userRole &&
            userRole !== "recruiter" &&
            userRole !== "company" ? (
              <CMSPrivacyPolicy />
            ) : (
              <Error404 />
            )
        },
        {
          path: "cmsdataprotection/edit",
          element:
            isLoggedIn &&
            cms === "true" &&
            userRole &&
            userRole !== "recruiter" &&
            userRole !== "company" ? (
              <CMSDataProtection />
            ) : (
              <Error404 />
            )
        },
        {
          path: "cmscareer/edit",
          element:
            isLoggedIn &&
            cms === "true" &&
            userRole &&
            userRole !== "recruiter" &&
            userRole !== "company" ? (
              <CMSCareer />
            ) : (
              <Error404 />
            )
        },
        {
          path: "manageroles",
          element:
            isLoggedIn &&
            manageRoles === "true" &&
            userRole &&
            userRole !== "recruiter" &&
            userRole !== "company" ? (
              <ManageRoles />
            ) : (
              <Error404 />
            )
        },
        {
          path: "manageroles/adduser",
          element:
            isLoggedIn &&
            manageRoles === "true" &&
            userRole &&
            userRole !== "recruiter" &&
            userRole !== "company" ? (
              <AddUser />
            ) : (
              <Error404 />
            )
        },
        {
          path: "manageroles/edituser",
          element:
            isLoggedIn &&
            manageRoles === "true" &&
            userRole &&
            userRole !== "recruiter" &&
            userRole !== "company" ? (
              <EditUser />
            ) : (
              <Error404 />
            )
        },
        {
          path: "payments",
          element:
            isLoggedIn &&
            payment === "true" &&
            userRole &&
            userRole !== "recruiter" &&
            userRole !== "company" ? (
              <AdminPayments />
            ) : (
              <Error404 />
            )
        },
        {
          path: "payments/add-packs",
          element:
            isLoggedIn &&
            payment === "true" &&
            userRole &&
            userRole !== "recruiter" &&
            userRole !== "company" ? (
              <AdminPaymentsAddPacks />
            ) : (
              <Error404 />
            )
        },
        {
          path: "companyCredits",
          element:
            isLoggedIn &&
            payment === "true" &&
            userRole &&
            userRole !== "recruiter" &&
            userRole !== "company" ? (
              <CompanyCredits />
            ) : (
              <Error404 />
            )
        },
        {
          path: "companypostedjobs",
          element:
            isLoggedIn &&
            applications === "true" &&
            userRole &&
            userRole !== "recruiter" &&
            userRole !== "company" ? (
              <ApplicationsCompanyPostedJobs />
            ) : (
              <Error404 />
            )
        },
        {
          path: "companypostedjobs/:id",
          element:
            isLoggedIn &&
            applications === "true" &&
            userRole &&
            userRole !== "recruiter" &&
            userRole !== "company" ? (
              <ApplicationsCompanyPostedJobsVIewJobs />
            ) : (
              <Error404 />
            )
        },
        {
          path: "recruitersubmissions",
          element:
            isLoggedIn &&
            applications === "true" &&
            userRole &&
            userRole !== "recruiter" &&
            userRole !== "company" ? (
              <ApplicationsRecruiterSubmissions />
            ) : (
              <Error404 />
            )
        },

        // ===========================
        {
          path: "candidaterole",
          element:
            isLoggedIn &&
            applications === "true" &&
            userRole &&
            userRole !== "recruiter" &&
            userRole !== "company" ? (
              <CandidateRole />
            ) : (
              <Error404 />
            )
        },
        {
          path: "candidaterole/:id",
          element:
            isLoggedIn &&
            applications === "true" &&
            userRole &&
            userRole !== "recruiter" &&
            userRole !== "company" ? (
              <CandidateRoleViewJobs />
            ) : (
              <Error404 />
            )
        },
        {
          path: "candidaterole/:id/candidates",
          element:
            isLoggedIn &&
            applications === "true" &&
            userRole &&
            userRole !== "recruiter" &&
            userRole !== "company" ? (
              <CandidateRoleViewCandidates />
            ) : (
              <Error404 />
            )
        },

        // ===========================

        {
          path: "recruitersubmissions/:id",
          element:
            isLoggedIn &&
            applications === "true" &&
            userRole &&
            userRole !== "recruiter" &&
            userRole !== "company" ? (
              <ApplicationsRecruiterSubmissionsViewJobs />
            ) : (
              <Error404 />
            )
        },
        {
          path: "recruitersubmissions/:id/candidates",
          element:
            isLoggedIn &&
            applications === "true" &&
            userRole &&
            userRole !== "recruiter" &&
            userRole !== "company" ? (
              <ApplicationsRecruiterSubmissionsViewCandidates />
            ) : (
              <Error404 />
            )
        },
        {
          path: "pushnotifications",
          element:
            isLoggedIn &&
            notifications === "true" &&
            userRole !== "recruiter" &&
            userRole !== "company" ? (
              <PushNotifications />
            ) : (
              <Error404 />
            )
        },
        {
          path: "recruiterhelp",
          element:
            isLoggedIn &&
            needHelp === "true" &&
            userRole !== "recruiter" &&
            userRole !== "company" ? (
              <RecruiterQuestions />
            ) : (
              <Error404 />
            )
        },
        {
          path: "companyhelp",
          element:
            isLoggedIn &&
            needHelp === "true" &&
            userRole !== "recruiter" &&
            userRole !== "company" ? (
              <CompanyQuestions />
            ) : (
              <Error404 />
            )
        },
        {
          path: "recruiterPitch",
          element:
            isLoggedIn &&
            needHelp === "true" &&
            userRole !== "recruiter" &&
            userRole !== "company" ? (
              <RecruiterPitches />
            ) : (
              <Error404 />
            )
        },
        {
          path: "companyPitch",
          element:
            isLoggedIn &&
            needHelp === "true" &&
            userRole !== "recruiter" &&
            userRole !== "company" ? (
              <CompanyPitches />
            ) : (
              <Error404 />
            )
        },
        {
          path: "investform",
          element:
            isLoggedIn &&
            forms === "true" &&
            userRole !== "recruiter" &&
            userRole !== "company" ? (
              <InvestFormData />
            ) : (
              <Error404 />
            )
        },
        {
          path: "contactform",
          element:
            isLoggedIn &&
            forms === "true" &&
            userRole !== "recruiter" &&
            userRole !== "company" ? (
              <ContactFormData />
            ) : (
              <Error404 />
            )
        }
      ]
    },

    //recruiter dashboard paths
    {
      path: "/recruiterneedhelp",
      element:
        isLoggedIn && userRole === "recruiter" ? (
          <RecruiterNeedHelp />
        ) : (
          <redirect to="/" />
        )
    },
    {
      path: "/recruiter",
      element:
        isLoggedIn && userRole === "recruiter" ? (
          <RecruiterLayout />
        ) : (
          <redirect to="/" />
        ),

      children: [
        {
          path: "/recruiter",
          element:
            isLoggedIn && userRole === "recruiter" ? (
              <RecruiterHome />
            ) : (
              <redirect to="/" />
            )
        },

        {
          path: "openjobs",
          element:
            isLoggedIn && userRole === "recruiter" ? (
              <OpenJobs />
            ) : (
              <redirect to="/" />
            )
        },
        {
          path: "claimedpositions",
          element:
            isLoggedIn && userRole === "recruiter" ? (
              <ClaimedPositions />
            ) : (
              <redirect to="/" />
            )
        },
        {
          path: "managecandidates",
          element:
            isLoggedIn && userRole === "recruiter" ? (
              <ManageCandidates />
            ) : (
              <redirect to="/" />
            )
        },

        {
          path: "settings",
          element:
            isLoggedIn && userRole === "recruiter" ? (
              <RecruiterSettings />
            ) : (
              <redirect to="/" />
            )
        }
      ]
    },

    //company dashboard pages
    {
      path: "/companyneedhelp",
      element:
        isLoggedIn && userRole === "company" ? (
          <CompanyNeedHelp />
        ) : (
          <redirect to="/" />
        )
    },
    {
      path: "/company",
      element:
        isLoggedIn && userRole === "company" ? (
          <CompanyLayout />
        ) : (
          <redirect to="/" />
        ),
      children: [
        {
          path: "/company",
          element:
            isLoggedIn && userRole === "company" ? (
              <CompanyHome />
            ) : (
              <redirect to="/" />
            )
        },
        {
          path: "addnewjob",
          element:
            isLoggedIn && userRole === "company" ? (
              <AddNewJob />
            ) : (
              <redirect to="/" />
            )
        },
        {
          path: "pendingapproval",
          element:
            isLoggedIn && userRole === "company" ? (
              <PendingApproval />
            ) : (
              <redirect to="/" />
            )
        },
        {
          path: "rejectedjobs",
          element:
            isLoggedIn && userRole === "company" ? (
              <RejectedJobs />
            ) : (
              <redirect to="/" />
            )
        },
        {
          path: "livejobs",
          element:
            isLoggedIn && userRole === "company" ? (
              <LiveJobs />
            ) : (
              <redirect to="/" />
            )
        },
        {
          path: "livejobs/show",
          element:
            isLoggedIn && userRole === "company" ? (
              <LiveJobsViewCandidates />
            ) : (
              <redirect to="/" />
            )
        },
        {
          path: "credits",
          element:
            isLoggedIn && userRole === "company" ? (
              <Credits></Credits>
            ) : (
              <redirect to="/" />
            )
        },
        {
          path: "credits_cancel",
          element:
            isLoggedIn && userRole === "company" ? (
              <CreditsCanlePaymet></CreditsCanlePaymet>
            ) : (
              <redirect to="/" />
            )
        },
        {
          path: "credits_Success",
          element:
            isLoggedIn && userRole === "company" ? (
              <CreditsSuccess></CreditsSuccess>
            ) : (
              <redirect to="/" />
            )
        },

        {
          path: "credits/history",
          element:
            isLoggedIn && userRole === "company" ? (
              <CompanyCreditsHistory></CompanyCreditsHistory>
            ) : (
              <redirect to="/" />
            )
        },

        {
          path: "settings",
          element:
            isLoggedIn && userRole === "company" ? (
              <CompanySettings />
            ) : (
              <redirect to="/" />
            )
        }
      ]
    },

    // error page path
    {
      path: "/*",
      element: <Error404 />
    }
  ]);

  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
