import React, { useEffect } from "react";
import RecruiterNotifications from "./RecruiterNotifications";
import { BsBriefcase } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { MdOutlineWorkOutline, MdOutlineWorkOff } from "react-icons/md";
import { Select, Option } from "@material-tailwind/react";
import { useState } from "react";
import moment from "moment/moment";
import { baseUrl } from "../../baseUrl";
import Loader from "../../hook/Loader";
const RecruiterHome = () => {
  const [apiData, setApiData] = useState();
  const [_ITJobCounts, setITJobCounts] = useState();
  const [nonITJobCounts, setNonITJobCounts] = useState();
  const [totalCandidates, setTotalCandidates] =
    useState();
  const [totalClaimedPosition, setTotalClaimedPosition] = useState();
  const [count_Tech, setTechCount] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  let token = localStorage.getItem('token')
  useEffect(() => {
    fetch(
      `${baseUrl}/recruiter/recruitordetails/${window.localStorage.getItem(
        "userId"
      )}`, {
        headers: {
          "Authorization":`Bearer ${token}`
        }
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setITJobCounts(data.ITJobCounts);
        setNonITJobCounts(data.nonITJobCounts);
        setApiData(data.data);
        setTotalCandidates((data.data.candidatesId).length);
        setTotalClaimedPosition(data.data.claimedJobId.length)
        setTechCount(data);
        setIsLoading(false)
      });
  }, []);


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

  const totalCandidateTimeFilterHandler = (value) => {

    const candidates = apiData?.candidatesId;
    const data = handleTimeFilterChange(candidates, value);
    setTotalCandidates(data.length);

  };

  const totalClaimedPositionFilterHandler = (value) => {
    const claimedPositions = apiData?.claimedJobId;
    const data = handleTimeFilterChange(claimedPositions, value);
    setTotalClaimedPosition(data.length);
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
                    Recruiter Dashboard
                  </h6>
                </div>
                <div>
                  <RecruiterNotifications />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-5 xl:gap-8">
              <div className="flex flex-col gap-5 xl:gap-8 sm:flex-row">
                <div className="border rounded-lg p-5 flex-1 shadow-md hover:shadow-lg">
                  <h2 className="text-lg font-medium mb-4">Total Open Positions</h2>

                  <div className="flex flex-wrap gap-5">
                    <div className="border rounded-xl p-2 lg:p-4 xl:p-5 flex-1 flex flex-col gap-3 lg:gap-5">
                      <div>
                        <MdOutlineWorkOutline
                          size={35}
                          className="p-1.5 bg-blue-100 border rounded-full text-[color:var(--blue)]"
                        />
                      </div>
                      <div>
                        <h6>IT</h6>
                        <h5 className="font-semibold text-2xl lg:text-3xl">
                          {_ITJobCounts}
                        </h5>
                      </div>
                    </div>
                    <div className="border rounded-xl p-2 lg:p-4 xl:p-5 flex-1 flex flex-col gap-3 lg:gap-5">
                      <div>
                        <MdOutlineWorkOff
                          size={35}
                          className="p-1.5 bg-red-100 border rounded-full text-red-500"
                        />
                      </div>
                      <div>
                        <h6>Non - IT</h6>
                        <h5 className="font-semibold text-2xl lg:text-3xl">
                          {nonITJobCounts}
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
                      <Select label="Select time"
                        onChange={totalCandidateTimeFilterHandler}>
                        <Option value="today">Today</Option>
                        <Option value="pastWeek">Past week</Option>
                        <Option value="pastMonth">Past month</Option>
                        <Option value="allTime">All Time</Option>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <h6>Total Candidates</h6>
                    <h5 className="font-semibold text-2xl lg:text-3xl xl:text-4xl">
                      {totalCandidates}
                    </h5>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-5 xl:gap-8 sm:flex-row">
                <div className="border rounded-lg p-5 flex-1 flex flex-col gap-8 lg:gap-10 xl:gap-14 justify-around shadow-md hover:shadow-lg">
                  <div className="flex justify-between gap-2 items-center flex-wrap">
                    <div className="border rounded-full bg-blue-100">
                      <FaUsers size={50} className="p-2 text-[color:var(--blue)]" />
                    </div>

                    <div className="">
                      <Select
                        label="Select time"
                        onChange={totalClaimedPositionFilterHandler}
                      >
                        <Option value="today">Today</Option>
                        <Option value="pastWeek">Past week</Option>
                        <Option value="pastMonth">Past month</Option>
                        <Option value="allTime">All Time</Option>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <h6>Total Claimed Positions</h6>
                    <h5 className="font-semibold text-2xl lg:text-3xl xl:text-4xl">
                      {totalClaimedPosition}
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

export default RecruiterHome;
