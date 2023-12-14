import React, { useEffect, useState } from "react";
import {
  BsBriefcase,
  BsChevronDown,
  BsChevronUp,
  BsPerson,
  BsThreeDots,
} from "react-icons/bs";
import { BiBuilding, BiBuildings, BiTrendingUp } from "react-icons/bi";
import { TiTickOutline } from "react-icons/ti";
import { FaUsers } from "react-icons/fa";
import { MdOutlinePendingActions, MdMarkEmailRead } from "react-icons/md";
import {
  AiOutlineUser,
  AiOutlineUserAdd,
  AiOutlineQuestionCircle,
} from "react-icons/ai";
import ProfileCard from "./ProfileCard";
import { Select, Option } from "@material-tailwind/react";
import { baseUrl } from "../../baseUrl";
import { useNavigate } from "react-router-dom";
import Loader from "../../hook/Loader";

const AdminPanelHome = () => {
  const [data, setData] = useState();
  const [totalRecruiters, setTotalRecruiters] = useState();
  const [totalCompanies, setTotalCompanies] = useState();
  const [RecruitersJoined, setRecruitersJoined] = useState();
  const [CompaniesJoined, setCompaniesJoined] = useState();
  const [jobsPostedCounts, setJobsPostedCounts] = useState();
  const [newUsersCounts, setNewUsersCounts] = useState();
  const [claimedJobsCounts, setClaimedJobsCounts] = useState();
  const [submittedCVCounts, setSubmittedCVCounts] = useState();
  const [activeRecruitersCounts, setActiveRecruitersCounts] = useState();
  const [activeCompaniesCounts, setActiveCompaniesCounts] = useState();
  const [shortlistedCandidatesCounts, setShortlistedCandidatesCounts] = useState();
  const [isLoading, setIsLoading] = useState(true)

  // const navigation = useNavigate()
  // useEffect(() => {
  //   const storedToken = localStorage.getItem("token");
  //   const storedExpirationDate = localStorage.getItem("expirationTime");
  //   const storedUserId = localStorage.getItem("userId");
  //   const isLoggedIn = localStorage.getItem("isLoggedIn");
  //   if (!storedToken || !storedExpirationDate || !storedUserId) {
  //     navigation("/adminlogin");
  //   } else {
  //     if (isLoggedIn === false) {
  //       navigation("/adminlogin");
  //     } else {
  //       navigation("/admin");
  //     }
  //   }
  // }, []);




  let token = localStorage.getItem("token");
  useEffect(() => {
    fetch(`${baseUrl}/admin/adminDeshboradCount`, {
      headers: {
        "Authorization":`Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false)
        setData(data);
        setTotalCompanies(data.companies);
        setTotalRecruiters(data.recruiters);
        setCompaniesJoined(data.companies);
        setRecruitersJoined(data.recruiters);
        setJobsPostedCounts(data.approvedJobs.length);
        const newUsers = data?.newlyJoinedCompanies.concat(
          data?.newlyJoinedRecruiters
        );
        setClaimedJobsCounts(data.claimedJobs.length);
        setNewUsersCounts(newUsers.length);
        setShortlistedCandidatesCounts(data.shortListedCandidates.length)
        const activeCompanies = data?.companies.filter(
          (company) => company.status === "Allow"
        );
        const activeRecruiters = data?.recruiters.filter(
          (recruiter) => recruiter.status === "Allow"
        );
        setActiveCompaniesCounts(activeCompanies.length);
        setActiveRecruitersCounts(activeRecruiters.length);
        setSubmittedCVCounts(data.submittedCV.length);
      });
  }, []);

const handleTimeFilterChange = (data, filterOptionSelect,activeUser) => {
    let filteredData;
  const now = new Date();
  

    switch (filterOptionSelect) {
      case "today":
        filteredData = data.filter((item) => {
          let itemDate = new Date(item.createdAt);
          if (activeUser) {
            itemDate = new Date(item.updatedAt);
          }
          return (
            itemDate.getFullYear() === now.getFullYear() &&
            itemDate.getMonth() === now.getMonth() &&
            itemDate.getDate() === now.getDate()
          );
        });
        return filteredData;
        break;
      case "pastWeek":
        filteredData = data.filter((item) => {
          let itemDate = new Date(item.createdAt);
          if (activeUser) {
            itemDate = new Date(item.updatedAt);
          }
          const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          return itemDate >= oneWeekAgo && itemDate <= now;
        });
        return filteredData;
        break;
      case "pastMonth":
        filteredData = data.filter((item) => {
          let itemDate = new Date(item.createdAt);
          if (activeUser) {
            itemDate = new Date(item.updatedAt);
          }
          const oneMonthAgo = new Date(
            now.getTime() - 28 * 24 * 60 * 60 * 1000
          );
          return itemDate >= oneMonthAgo && itemDate <= now;
        });
        return filteredData;
        break;
      default:
        return data;
    }
  }
  const shortlistedCandidatesHandler = (value) => {
    const filterResult = handleTimeFilterChange(data?.shortListedCandidates, value);
    setShortlistedCandidatesCounts(filterResult.length);

  };

  const activeCompaniesAndRecruitersHandler = (value) => {
  
    const dataCompanies = handleTimeFilterChange(totalCompanies, value,true);
     const dataRecruiters = handleTimeFilterChange(totalRecruiters, value,true);
    setActiveCompaniesCounts(dataCompanies.length);
    setActiveRecruitersCounts(dataRecruiters.length);
  };
  const cvSubmittedHandler = (value) => {
    const filterResult = handleTimeFilterChange(data?.submittedCV, value);
    setSubmittedCVCounts(filterResult.length);
  };

  const jobsClaimedHandler = (value) => {

    const filterResult = handleTimeFilterChange(data?.claimedJobs, value);

    setClaimedJobsCounts(filterResult.length);
  };

  const newUsersHandler = (value) => {
    const newData = data?.newlyJoinedCompanies.concat(data?.newlyJoinedRecruiters);
    const users = handleTimeFilterChange(newData, value);
    setNewUsersCounts(users.length);
    const usersCompany = handleTimeFilterChange(data?.companies, value);
    setCompaniesJoined(usersCompany);
    const usersRecruiters = handleTimeFilterChange(data?.recruiters, value);
    setRecruitersJoined(usersRecruiters);
  };

  const jobPostedHandler = (value) => {
    const filterResult = handleTimeFilterChange(data?.approvedJobs, value);
    setJobsPostedCounts(filterResult.length);
  };






  return (
    <div>
      <div className="border-b-2 border-black">
        <ProfileCard />
      </div>

      <h2 className="font-medium text-xl lg:text-2xl lg:font-semibold xl:text-3xl mt-4 mb-8">
        Admin Panel
      </h2>
      {
        isLoading ? <div className="flex justify-center items-center h-[60vh]">
          <Loader />
        </div>
          :

          <div className="flex flex-col gap-5 xl:gap-8">
            <div className="flex flex-col gap-5 xl:gap-8 sm:flex-row">
              <div className="border rounded-lg p-5 flex-1 shadow-md hover:shadow-lg">
                <h2 className="text-lg font-medium mb-4">Statistics</h2>

                <div className="flex flex-wrap gap-5">
                  <div className="border rounded-xl p-2 lg:p-4 xl:p-5 flex-1 flex flex-col gap-3 lg:gap-5">
                    <div>
                      <BiBuilding
                        size={35}
                        className="p-1.5 bg-blue-100 border rounded-full text-[color:var(--blue)]"
                      />
                    </div>
                    <div>
                      <h6>Total Companies</h6>
                      <h5 className="font-semibold text-2xl lg:text-3xl">
                        {totalCompanies?.length}
                      </h5>
                    </div>
                  </div>
                  <div className="border rounded-xl p-2 lg:p-4 xl:p-5 flex-1 flex flex-col gap-3 lg:gap-5">
                    <div>
                      <FaUsers
                        size={35}
                        className="p-1.5 bg-red-100 border rounded-full text-red-500"
                      />
                    </div>
                    <div>
                      <h6>Total Recruiters</h6>
                      <h5 className="font-semibold text-2xl lg:text-3xl">
                        {totalRecruiters?.length}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-5 flex-1 flex flex-col gap-5 justify-around shadow-md hover:shadow-lg">
                <div className="flex justify-between gap-2 items-center flex-wrap">
                  <div className="border rounded-full bg-blue-100">
                    <BsBriefcase
                      size={50}
                      className="p-2 text-[color:var(--blue)]"
                    />
                  </div>

                  <div className="">
                    <Select label="Select time" onChange={jobPostedHandler}>
                      <Option value="today">Today</Option>
                      <Option value="pastWeek">Past week</Option>
                      <Option value="pastMonth">Past month</Option>
                      <Option value="allTime">All Time</Option>
                    </Select>
                  </div>
                </div>
                <div>
                  <h6>Jobs Posted</h6>
                  <h5 className="font-semibold text-2xl lg:text-3xl xl:text-4xl">
                    {jobsPostedCounts}
                  </h5>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-5 xl:gap-8 sm:flex-row">
              <div className="border rounded-lg p-5 flex-[2] shadow-md hover:shadow-lg">
                <div className="flex justify-between gap-2 items-center flex-wrap mb-5">
                  <h2 className="text-lg font-medium">Data Overview</h2>

                  <div className="">
                    <Select label="Select time" onChange={newUsersHandler}>
                      <Option value="today">Today</Option>
                      <Option value="pastWeek">Past week</Option>
                      <Option value="pastMonth">Past month</Option>
                      <Option value="allTime">All Time</Option>
                    </Select>
                  </div>
                </div>

                <div className="flex flex-wrap gap-5">
                  <div className="border rounded-xl p-2 lg:p-4 xl:p-5 flex-1 flex flex-col gap-3 lg:gap-5">
                    <div>
                      <AiOutlineUserAdd
                        size={35}
                        className="p-1.5 bg-blue-100 border rounded-full text-[color:var(--blue)]"
                      />
                    </div>
                    <div>
                      <h6>New users</h6>
                      <h5 className="font-semibold text-2xl lg:text-3xl">
                        {newUsersCounts}
                      </h5>
                    </div>
                  </div>
                  <div className="border rounded-xl p-2 lg:p-4 xl:p-5 flex-1 flex flex-col gap-3 lg:gap-5">
                    <div>
                      <BiBuilding
                        size={35}
                        className="p-1.5 bg-red-100 border rounded-full text-red-500"
                      />
                    </div>
                    <div>
                      <h6>Companies Joined</h6>
                      <h5 className="font-semibold text-2xl lg:text-3xl">
                        {CompaniesJoined?.length}
                      </h5>
                    </div>
                  </div>
                  <div className="border rounded-xl p-2 lg:p-4 xl:p-5 flex-1 flex flex-col gap-3 lg:gap-5">
                    <div>
                      <AiOutlineUser
                        size={35}
                        className="p-1.5 bg-blue-100 border rounded-full text-[color:var(--blue)]"
                      />
                    </div>
                    <div>
                      <h6>Recruiters Joined</h6>
                      <h5 className="font-semibold text-2xl lg:text-3xl">
                        {RecruitersJoined?.length}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-5 flex-1 flex flex-col gap-5 justify-around shadow-md hover:shadow-lg">
                <div className="flex justify-between items-center gap-2 flex-wrap">
                  <div className="border rounded-full bg-blue-100">
                    <BsBriefcase
                      size={50}
                      className="p-2 text-[color:var(--blue)]"
                    />
                  </div>

                  <div className="">
                    <Select label="Select time" onChange={jobsClaimedHandler}>
                      <Option value="today">Today</Option>
                      <Option value="pastWeek">Past week</Option>
                      <Option value="pastMonth">Past month</Option>
                      <Option value="allTime">All Time</Option>
                    </Select>
                  </div>
                </div>
                <div>
                  <h6>Jobs Claimed</h6>
                  <h5 className="font-semibold text-2xl lg:text-3xl xl:text-4xl">
                    {claimedJobsCounts}
                  </h5>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-5 xl:gap-8 md:flex-row flex-wrap">
              <div className="border rounded-lg p-5 flex-1 flex flex-col gap-5 justify-around shadow-md hover:shadow-lg">
                <div className="flex justify-between gap-2 items-center flex-wrap mb-5">
                  <h2 className="text-lg font-medium">CV Submitted</h2>

                  <div className="">
                    <Select label="Select time" onChange={cvSubmittedHandler}>
                      <Option value="today">Today</Option>
                      <Option value="pastWeek">Past week</Option>
                      <Option value="pastMonth">Past month</Option>
                      <Option value="allTime">All Time</Option>
                    </Select>
                  </div>
                </div>
                <div className="border rounded-xl p-2 lg:p-4 xl:p-5 flex-1 flex flex-col gap-3 lg:gap-5">
                  <div>
                    <TiTickOutline
                      size={35}
                      className="p-1.5 bg-blue-100 border rounded-full text-[color:var(--blue)]"
                    />
                  </div>
                  <div>
                    <h6>CV Submitted</h6>
                    <h5 className="font-semibold text-2xl lg:text-3xl">
                      {submittedCVCounts}
                    </h5>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-5 flex-[2] shadow-md hover:shadow-lg flex flex-col justify-between">
                <div className="flex justify-between gap-2 items-center flex-wrap mb-5">
                  <h2 className="text-lg font-medium">Active Today</h2>

                  <div className="">
                    <Select
                      label="Select time"
                      onChange={activeCompaniesAndRecruitersHandler}
                    >
                      <Option value="today">Today</Option>
                      <Option value="pastWeek">Past week</Option>
                      <Option value="pastMonth">Past month</Option>
                      <Option value="allTime">All Time</Option>
                    </Select>
                  </div>
                </div>

                <div className="flex flex-wrap gap-5">
                  <div className="border rounded-xl p-2 lg:p-4 xl:p-5 flex-1 flex flex-col gap-3 lg:gap-5">
                    <div>
                      <AiOutlineUser
                        size={35}
                        className="p-1.5 bg-blue-100 border rounded-full text-[color:var(--blue)]"
                      />
                    </div>
                    <div>
                      <h6>Active Recruiters</h6>
                      <h5 className="font-semibold text-2xl lg:text-3xl">
                        {activeRecruitersCounts}
                      </h5>
                    </div>
                  </div>
                  <div className="border rounded-xl p-2 lg:p-4 xl:p-5 flex-1 flex flex-col gap-3 lg:gap-5">
                    <div>
                      <BiBuildings
                        size={35}
                        className="p-1.5 bg-red-100 border rounded-full text-red-500"
                      />
                    </div>
                    <div>
                      <h6>Active Companies</h6>
                      <h5 className="font-semibold text-2xl lg:text-3xl">
                        {activeCompaniesCounts}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-5 flex-1 flex flex-col gap-5 justify-around shadow-md hover:shadow-lg">
                <div className="flex justify-between gap-2 items-center flex-wrap mb-5">
                  <h2 className="text-lg font-medium">Candidate Shortlisted</h2>

                  <div className="">
                    <Select
                      label="Select time"
                      onChange={shortlistedCandidatesHandler}
                    >
                      <Option value="today">Today</Option>
                      <Option value="pastWeek">Past week</Option>
                      <Option value="pastMonth">Past month</Option>
                      <Option value="allTime">All Time</Option>
                    </Select>
                  </div>
                </div>

                <div className="border rounded-xl p-2 lg:p-4 xl:p-5 flex-1 flex flex-col gap-3 lg:gap-5">
                  <div>
                    <TiTickOutline
                      size={35}
                      className="p-1.5 bg-blue-100 border rounded-full text-[color:var(--blue)]"
                    />
                  </div>
                  <div>
                    <h6>Shortlisted Candidates</h6>
                    <h5 className="font-semibold text-2xl lg:text-3xl">
                      {shortlistedCandidatesCounts}{" "}
                    </h5>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="flex flex-col gap-5 xl:gap-8">
          <div className="border rounded-lg p-5 flex-1 flex flex-col gap-5 justify-around shadow-md hover:shadow-lg">
            <div className="flex justify-between border-b-2">
              <h5 className="text-lg font-semibold">Most Claimed Jobs</h5>

              <h5 className="text-lg font-semibold">Job title</h5>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div>
                    <BiTrendingUp
                      size={35}
                      className="p-1.5 bg-blue-100 border rounded-full text-[color:var(--blue)]"
                    />
                  </div>
                  <span>15</span>
                </div>

                <div>Project Manager</div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div>
                    <BiTrendingUp
                      size={35}
                      className="p-1.5 bg-blue-100 border rounded-full text-[color:var(--blue)]"
                    />
                  </div>
                  <span>41</span>
                </div>

                <div>Sales Manager</div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div>
                    <BiTrendingUp
                      size={35}
                      className="p-1.5 bg-blue-100 border rounded-full text-[color:var(--blue)]"
                    />
                  </div>
                  <span>27</span>
                </div>

                <div>Operation Manager</div>
              </div>
            </div>
          </div>
        </div> */}
          </div>
      }
    </div>
  );
};

export default AdminPanelHome;
