import React, { useState } from "react";
import { BsBriefcase } from "react-icons/bs";
import { BiBuilding } from "react-icons/bi";
import { FiRadio } from "react-icons/fi";
import { FaUserCheck } from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";
import { Select, Option } from "@material-tailwind/react";
import CompanyNotifications from "./CompanyNotifications";
import { baseUrl } from "../../baseUrl";
import { useEffect } from "react";
import { useReducer } from "react";
import moment from "moment";
import { TailSpin } from "react-loader-spinner";
import Loader from "../../hook/Loader";

const CompanyHome = () => {
  const [data, setData] = useState();
  const [selectedCandidates, setSelectedCandidates] = useState();
  const [pendingJobs, setPendingJobs] = useState();
  const [liveJobs, setLiveJobs] = useState();
  const [rejectedJobs, setRejectedJobs] = useState();
  const [totalJobs, setTotalJobs] = useState();
  const [selectedCandidatesCounts, setSelectedCandidatesCounts] = useState();
  const [pendingJobsCounts, setPendingJobsCounts] = useState();
  const [liveJobsCounts, setLiveJobsCounts] = useState();
  const [rejectedJobsCounts, setRejectedJobsCounts] = useState();
  const [totalJobsCounts, setTotalJobsCounts] = useState();
  const [isLoading, setIsLoading] = useState(true)

  const [reducerValue, forceUpdata] = useReducer((x) => x + 1, 0);
  let token = localStorage.getItem("token")
  const fetchCompanydetails = async () => {
    try {
      const result = await fetch(
        `${baseUrl}/company/getCompanyById/${localStorage.getItem("userId")}`, {
          headers: {
            "Authorization":`Bearer ${token}`
          }
        }
      );
      const jsonData = await result.json();
      setIsLoading(false)
      if (!result.ok) {
        throw new Error(jsonData.message);
      }
      setData(jsonData.posts);
      forceUpdata();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCompanydetails();
  }, []);

  useEffect(() => {
    let pendingJobsArr = [];
    let liveJobsArr = [];
    let rejectedJobsArr = [];
    let selectedCandidatesArr = [];
    let totalJobsArr = [];
    data?.jobPostedId?.forEach((element) => {
      if (element.status === "company_addJobs_fress") {
        pendingJobsArr.push(element);
      } else if (
        element.status === "Admin-Approve" ||
        element.status === "open_position_Cliam"
      ) {
        liveJobsArr.push(element);
      } else if (element.status === "Admin-Rejected") {
        rejectedJobsArr.push(element);
      }
      element?.candidatesId?.forEach((element_1) => {
        if (element_1.status === "Candidate Selected") {
          selectedCandidatesArr.push(element);
        }
      });
      totalJobsArr.push(element);
    });
    setTotalJobs(totalJobsArr);
    setSelectedCandidates(selectedCandidatesArr);
    setPendingJobs(pendingJobsArr);
    setLiveJobs(liveJobsArr);
    setRejectedJobs(rejectedJobsArr);
    setTotalJobsCounts(totalJobs?.length);
    setSelectedCandidatesCounts(selectedCandidates?.length);
    setPendingJobsCounts(pendingJobs?.length);
    setLiveJobsCounts(liveJobs?.length);
    setRejectedJobsCounts(rejectedJobs?.length)
  }, [reducerValue]);

  const handleTimeFilterChange = (data, filterOptionSelect) => {
    let filteredData;
    const now = new Date();
    switch (filterOptionSelect) {
      case "today":
        filteredData = data.filter((item) => {
          const itemDate = new Date(item.createdAt);
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
          const itemDate = new Date(item.createdAt);
          const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          return itemDate >= oneWeekAgo && itemDate <= now;
        });
        return filteredData;
        break;
      case "pastMonth":
        filteredData = data.filter((item) => {
          const itemDate = new Date(item.createdAt);
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
  const totalJobsTimeFilterHandler = (value) => {
    const data = handleTimeFilterChange(totalJobs, value);
    setTotalJobsCounts(data.length);

  };

  const pendingJobsTimeFilterHandler = (value) => {
    const data = handleTimeFilterChange(pendingJobs, value);
    setPendingJobsCounts(data.length);

  };
  const liveJobsTimeFilterHandler = (value) => {
    const data = handleTimeFilterChange(liveJobs, value);
    setLiveJobsCounts(data.length);
  };

  const rejectedJobsTimeFilterHandler = (value) => {
    const data = handleTimeFilterChange(rejectedJobs, value);
    setRejectedJobsCounts(data.length);
  };

  const selectedCandidatesTimeFilterHandler = (value) => {
    const data = handleTimeFilterChange(selectedCandidates, value);
    setSelectedCandidatesCounts(data.length);
  };

  return (
    <div>
      {
        isLoading ? <div className="flex justify-center items-center h-[90vh]">
          <Loader />
        </div>

          :

          <>
            <div className="border-b-2 border-black mb-4">
              <div className="flex items-center justify-between gap-5">
                <div>
                  <h6 className="font-medium text-xl lg:text-2xl lg:font-semibold xl:text-3xl mt-4 mb-8">
                    Company Dashboard
                  </h6>
                </div>
                <div>
                  <CompanyNotifications />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-5 xl:gap-8">
              <div className="flex flex-col gap-5 xl:gap-8 md:flex-row">
                <div className="border rounded-lg p-5 flex-1 shadow-md hover:shadow-lg">
                  <div className="flex justify-between mb-2">
                    <h2 className="text-lg font-medium mb-4">Statistics</h2>

                    <div className="">
                      <Select
                        label="Select time"
                        onChange={totalJobsTimeFilterHandler}
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
                        <BiBuilding
                          size={35}
                          className="p-1.5 bg-blue-200 border rounded-full text-[color:var(--blue)]"
                        />
                      </div>

                      <div>
                        <h6>Total Posted Jobs</h6>

                        <h5 className="font-semibold text-2xl lg:text-3xl">
                          {totalJobsCounts}
                        </h5>

                      </div>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-5 flex-1 flex flex-col gap-5 justify-around shadow-md hover:shadow-lg">
                  <div className="flex justify-between items-center">
                    <div className="border rounded-full bg-blue-100">
                      <FaUserCheck
                        size={50}
                        className="p-2 text-[color:var(--blue)]"
                      />
                    </div>

                    <div className="">
                      <Select
                        label="Select time"
                        onChange={selectedCandidatesTimeFilterHandler}
                      >
                        <Option value="today">Today</Option>
                        <Option value="pastWeek">Past week</Option>
                        <Option value="pastMonth">Past month</Option>
                        <Option value="allTime">All Time</Option>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <h6>Selected Candidates</h6>

                    <h5 className="font-semibold text-2xl lg:text-3xl xl:text-4xl">
                      {selectedCandidatesCounts}
                    </h5>

                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-5 xl:gap-8 lg:flex-row flex-wrap">
                <div className="border rounded-lg p-5 flex-1 flex flex-col gap-8 lg:gap-10 xl:gap-14 justify-around shadow-md hover:shadow-lg">
                  <div className="flex justify-between items-center">
                    <div className="border rounded-full bg-yellow-200">
                      <MdPendingActions size={50} className="p-2 text-yellow-700" />
                    </div>

                    <div className="">
                      <Select
                        label="Select time"
                        onChange={pendingJobsTimeFilterHandler}
                      >
                        <Option value="today">Today</Option>
                        <Option value="pastWeek">Past week</Option>
                        <Option value="pastMonth">Past month</Option>
                        <Option value="allTime">All Time</Option>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <h6>Pending Approvals</h6>

                    <h5 className="font-semibold text-2xl lg:text-3xl xl:text-4xl">
                      {pendingJobsCounts}
                    </h5>

                  </div>
                </div>

                <div className="border rounded-lg p-5 flex-1 flex flex-col gap-8 lg:gap-10 xl:gap-14 justify-around shadow-md hover:shadow-lg">
                  <div className="flex justify-between items-center">
                    <div className="border rounded-full bg-blue-100">
                      <FiRadio size={50} className="p-2 text-[color:var(--blue)]" />
                    </div>

                    <div className="">
                      <Select
                        label="Select time"
                        onChange={liveJobsTimeFilterHandler}
                      >
                        <Option value="today">Today</Option>
                        <Option value="pastWeek">Past week</Option>
                        <Option value="pastMonth">Past month</Option>
                        <Option value="allTime">All Time</Option>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <h6>Live Jobs</h6>

                    <h5 className="font-semibold text-2xl lg:text-3xl xl:text-4xl">
                      {liveJobsCounts}
                    </h5>

                  </div>
                </div>

                <div className="border rounded-lg p-5 flex-1 flex flex-col gap-8 lg:gap-10 xl:gap-14 justify-around shadow-md hover:shadow-lg">
                  <div className="flex justify-between items-center">
                    <div className="border rounded-full bg-red-100">
                      <BsBriefcase size={50} className="p-2 text-red-500" />
                    </div>

                    <div className="">
                      <Select
                        label="Select time"
                        onChange={rejectedJobsTimeFilterHandler}
                      >
                        <Option value="today">Today</Option>
                        <Option value="pastWeek">Past week</Option>
                        <Option value="pastMonth">Past month</Option>
                        <Option value="allTime">All Time</Option>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <h6>Rejected Jobs</h6>

                    <h5 className="font-semibold text-2xl lg:text-3xl xl:text-4xl">
                      {rejectedJobsCounts}
                    </h5>

                  </div>
                </div>
              </div>
            </div>
          </>
      }

    </div>
  );
};

export default CompanyHome;
