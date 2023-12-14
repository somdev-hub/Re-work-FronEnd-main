import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { AiOutlineFieldTime } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useReducer } from "react";
import { useEffect } from "react";
import { baseUrl } from "../../baseUrl";
import CompanyNotifications from "./CompanyNotifications";
import moment from "moment/moment";
import { useSelector } from "react-redux";
import Loader from "../../hook/Loader";

const LiveJobs = () => {
  let [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  let appCount;
  const liveCandidateStatusUpdateState = useSelector(
    (state) => state.counter.companyLiveCandidateStatus_update
  );

  let statusArr = [
    "Internal Shortlist",
    "Candidate Shortlisted",
    "Interview Process",
    "Candidate Selected",
    "Candidate Joined",
    "Payment Done",
  ];

  let token = localStorage.getItem("token");
  useEffect(() => {
    const getCompany = async () => {
      try {
        const result = await fetch(
          `${baseUrl}/company/getCompanyById/${localStorage.getItem("userId")}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const jsonData = await result.json();
        if (!result.ok) {
          throw new Error(jsonData.message);
        }
        setData(jsonData.posts);
        // console.log(jsonData.posts);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getCompany();
  }, [liveCandidateStatusUpdateState]);

  let a = (jobType) => {
    window.localStorage.setItem("jobType", jobType);
    // console.log(jobType);
  };

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center h-[90vh]">
          <Loader />
        </div>
      ) : (
        <>
          <div className="flex justify-between">
            <h2 className="font-medium text-[color:var(--blue)] text-xl lg:text-2xl lg:font-semibold xl:text-3xl mt-4 mb-8">
              Live Jobs
            </h2>
            <div>
              <CompanyNotifications />
            </div>
          </div>

          {data && (
            <div className="py-6 flex flex-col gap-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mt-3">
                {data.jobPostedId.map(
                  (value) =>
                    value.status === "Admin-Approve" && (
                      <div
                        className="border-2 shadow-sm hover:shadow-md rounded-lg overflow-hidden cursor-pointer h-auto p-3"
                        key={value._id}
                      >
                        <div className="flex items-center justify-end gap-2 text-[color:var(--blue)] text-sm">
                          <AiOutlineFieldTime />{" "}
                          {moment(value.createdAt).fromNow()}
                        </div>

                        <h3 className="font-semibold text-xl lg:text-xl xl:text-[18px] my-3">
                          {value.jobTitle}
                        </h3>

                        <div className="flex flex-wrap gap-2 items-center justify-between mt-10 lg:mt-16 font-medium">
                          <p>
                            Total Applications:{" "}
                            <span className="text-[color:var(--blue)] font-semibold">
                              {/* {data[value]} */}
                              {
                                value?.candidatesId?.filter((item) =>
                                  statusArr.includes(item.status)
                                ).length
                              }
                            </span>
                          </p>
                          <Link to="/company/livejobs/show" state={value}>
                            <button className="px-2 py-1.5 bg-[color:var(--blue)] text-white rounded-md font-medium text-sm">
                              View Candidates
                            </button>
                          </Link>
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LiveJobs;
