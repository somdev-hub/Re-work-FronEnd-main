import React, { useState, useCallback, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFilterLeft } from "react-icons/bs";
import ClaimedJob from "./ClaimedJob";
import { baseUrl } from "../../baseUrl";
import RecruiterNotifications from "./RecruiterNotifications";
import Loader from "../../hook/Loader";

const ClaimedPositions = () => {
  const [IT, setIT] = useState(true);
  const [claimedPositions, setClaimedPositions] = useState();
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('');

  // console.log(claimedPositions);
  const [query, setQuery] = useState("IT");

  // let hndlSearch = (e) => {
  //   let qureyd = query
  //   fetch(`${baseUrl}/recruiter/Claimpositionsearchbar/${qureyd}/${localStorage.getItem('userId')}`).then((res) => {
  //     //first check the status code
  //     if (res.status === 200) {
  //       //then extract the json data
  //       res.json().then((data) => {
  //         // setUserArray(data);
  //         setClaimedPositions(data.posts);
  //         // forceupdate()
  //         console.log(data);
  //       });
  //     }
  //   });

  // }

  // useEffect(() => {
  //   hndlSearch()
  // }, [query])

  const fetchData = useCallback(async () => {
    try {
      let token = localStorage.getItem('token')
      const result = await fetch(
        `${baseUrl}/recruiter/getClaimedPositions/${localStorage.getItem(
          "userId"
        )}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      );
      if (!result) {
        throw new Error("No open jobs found.");
      }
      const jsonData = await result.json();
      setIsLoading(false)
      setClaimedPositions(jsonData.posts);
      console.log(jsonData.posts);
      // console.log(claimedPositions);
      // console.log(jsonData);
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center h-[90vh]">
          <Loader />
        </div>
      ) : (
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
                // onClick={() => setIT(false)}
                onClick={(e) => setQuery("non-IT")}
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
                  className="w-full outline-none text-lg"
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div>
                <RecruiterNotifications />
              </div>
            </div>
          </div>

          {claimedPositions && (
            <div className="">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                {Object.values(claimedPositions)
                  .filter((value) => {
                    return searchQuery.toLowerCase() === ""
                      ? value
                      : value.jobId?.jobTitle
                        ?.toLowerCase()
                        .includes(searchQuery) ||
                        searchQuery.toLowerCase() === ""
                        ? value
                        : value.jobId?.experience
                          .toLowerCase()
                          .includes(searchQuery) ||
                          searchQuery.toLowerCase() === ""
                          ? value
                          : value.jobId?.companyId?.companyName
                            .toLowerCase()
                            .includes(searchQuery) ||
                            searchQuery.toLowerCase() === ""
                            ? value
                            : value.jobId?.package
                              .toLowerCase()
                              .includes(searchQuery) ||
                              searchQuery.toLowerCase() === ""
                              ? value
                              : value.jobId?.skills.includes(searchQuery) ||
                                searchQuery.toLowerCase() === ""
                                ? value
                                : value.jobId?.earnPerClosure
                                  .toLowerCase()
                                  .includes(searchQuery) ||
                                  searchQuery.toLowerCase() === ""
                                  ? value
                                  : value.jobId?.noticePeriod
                                    .toString()
                                    .includes(searchQuery) ||
                                    searchQuery.toLowerCase() === ""
                                    ? value
                                    : value.jobId?.location
                                      .toLowerCase()
                                      .includes(searchQuery) ||
                                      searchQuery.toLowerCase() === ""
                                      ? value
                                      : value.jobId?.communication
                                        .toString()
                                        .includes(searchQuery) ||
                                        searchQuery.toLowerCase() === ""
                                        ? value
                                        : value.jobId?._id.toString().includes(searchQuery);
                  })
                  .map((position) => {
                    if (position.jobId?.Tech === query) {
                      return (
                        <ClaimedJob
                          key={position._id}
                          claimedPosition={position}
                        />
                      );
                    }
                  })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ClaimedPositions;

