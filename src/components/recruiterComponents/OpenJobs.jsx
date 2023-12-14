import React, { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFilterLeft } from "react-icons/bs";
import SingleJob from "./SingleJob";
import { useSelector, useDispatch } from "react-redux";
import RecruiterNotifications from "./RecruiterNotifications";
import { baseUrl } from "../../baseUrl";
import Loader from "../../hook/Loader";
import { deleteToken } from "firebase/messaging";

const OpenJobs = () => {
  const [IT, setIT] = useState(true);
  const [openPositions, setOpenPositions] = useState();
  const [searchQuery, setSearchQuery] = useState("");

  const [isLoading, setIsLoading] = useState(true)

  const statusAfterClaimedJob = useSelector(
    (state) => state.counter.claim_rerender
  );

  const [query, setQuery] = useState("IT");



  const fetchData = async () => {
    try {
      let token = localStorage.getItem('token')
      const result = await fetch(`${baseUrl}/recruiter/getOpenPositions`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!result) {
        throw new Error("No open jobs found.");
      }
      const jsonData = await result.json();
      setIsLoading(false)
      console.log(jsonData.posts);
      setOpenPositions(jsonData.posts);
    } catch (error) {
      console.log(error);
    }
  };

  // console.warn(openPositions);
  useEffect(() => {
    fetchData();
  }, [statusAfterClaimedJob, query]);

  return (
    <div>

      {
        isLoading ? <div className="flex justify-center items-center h-[90vh]">
          <Loader />
        </div>
          :

          <div className="">
            <div className="flex justify-between gap-5 flex-wrap pb-4 border-b-2 border-black">
              <div className="flex">
                <button
                  className={`flex-1 px-5 min-w-fit border rounded-l-md font-semibold ${query === "IT" && "bg-[color:var(--blue)] text-white"
                    } `}
                  // onClick={() => setIT(true)}
                  onClick={(e) => setQuery("IT")}
                >
                  IT
                </button>
                <button
                  className={`flex-1 px-5 min-w-fit border rounded-r-md font-semibold  ${query === "non-IT" && "bg-[color:var(--blue)] text-white"
                    } `}
                  onClick={(e) => setQuery("non-IT")}
                // onClick={() => setIT(false)}
                >
                  NON - IT
                </button>
              </div>

              <div className="flex items-center gap-5 group">
                <div className="border-2 flex items-center gap-5 px-5 py-3 rounded-md w-full lg:w-96 group-focus-within:ring-2 group-focus-within:shadow-lg">
                  <AiOutlineSearch className="text-3xl" />
                  <input
                    type="text"
                    placeholder="Search"
                    id="searchInput"
                    className="w-full outline-none text-lg"
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div>
                  <RecruiterNotifications />
                </div>
              </div>
            </div>

            {openPositions && (
              <div className="">
                {Object.values(openPositions).filter((value) => {
                  return searchQuery.toLowerCase() === ""
                    ? value
                    : value.jobTitle
                      ?.toLowerCase()
                      .includes(searchQuery) ||
                      searchQuery.toLowerCase() === ""
                      ? value
                      : value.experience
                        .toLowerCase()
                        .includes(searchQuery) ||
                        searchQuery.toLowerCase() === ""
                        ? value
                        : value.companyId?.companyName
                          .toLowerCase()
                          .includes(searchQuery) ||
                          searchQuery.toLowerCase() === ""
                          ? value
                          : value.package.toLowerCase().includes(searchQuery) ||
                            searchQuery.toLowerCase() === ""
                            ? value
                            : value?.skills.includes(searchQuery) ||
                              searchQuery.toLowerCase() === ""
                              ? value
                              : value.earnPerClosure
                                .toLowerCase()
                                .includes(searchQuery) ||
                                searchQuery.toLowerCase() === ""
                                ? value
                                : value.noticePeriod
                                  .toString()
                                  .includes(searchQuery) ||
                                  searchQuery.toLowerCase() === ""
                                  ? value
                                  : value.location.toLowerCase().includes(searchQuery) ||
                                    searchQuery.toLowerCase() === ""
                                    ? value
                                    : value.communication
                                      .toString()
                                      .includes(searchQuery) ||
                                    value?.CustomId?.toString().includes(searchQuery);
                }).map((position) => {
                  let x = position.recruiterIdClaimed.indexOf(
                    localStorage.getItem("userId")
                  );
                  if (x === -1 && position.status === "Admin-Approve") {
                    if (position.Tech === query) {
                      return <SingleJob key={position._id} openPosition={position} />;
                    }
                  }
                })}
              </div>
            )
            }
          </div>
      }
    </div>
  );
};

export default OpenJobs;


