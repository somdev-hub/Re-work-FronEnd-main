import React, { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import ManageCandidateViewDetailsModal from "../modal/ManageCandidateViewDetailsModal";
import { baseUrl } from "../../baseUrl";
import RecruiterNotifications from "./RecruiterNotifications";
import Loader from "../../hook/Loader";

const ManageCandidates = () => {
  const [modelOpened, setModelOpened] = useState(false);
  const [candidates, setCandidates] = useState();
  const [isLoading, setIsLoading] = useState(true)

  // console.log(candidates);

  const getCandiadates = async () => {
    try {
      const result = await fetch(`${baseUrl}/users/getCandidatesProfile`);
      const jsonData = await result.json();
      setIsLoading(false)

      if (!result.ok) {
        throw new Error(jsonData.message);
      }
      // console.log(jsonData.posts);
      let fetchedData = jsonData.posts;
      let adjFetchedData = [];
      if (fetchedData) {
        fetchedData.forEach((element) => {
          if (element.recruiterId) {
            if (element.recruiterId._id === localStorage.getItem("userId")) {
              adjFetchedData.push(element);
            }
          }
        });
      }
      setCandidates(adjFetchedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCandiadates();
  }, []);

  const [sharedata, setShareData] = useState();
  let a = (data) => {
    setShareData(data);
  };

  // console.log(sharedata);

  const [query, setQuery] = useState("");

  // let hndlSearch = (e) => {
  //   let qureyd = query
  //   fetch(`${baseUrl}/users/manageJobssearchbar/${qureyd}`).then((res) => {
  //     //first check the status code
  //     if (res.status === 200) {
  //       //then extract the json data
  //       res.json().then((data) => {
  //         // setUserArray(data);
  //         let fetchedData = data.posts;
  //         let adjFetchedData = [];
  //         if (fetchedData) {
  //           fetchedData.forEach((element) => {
  //             if (element.recruiterId) {
  //               if (element.recruiterId._id === localStorage.getItem("userId")) {
  //                 adjFetchedData.push(element);
  //               }
  //             }
  //           });
  //         }
  //         setCandidates(adjFetchedData);
  //         // forceupdate()
  //         console.log(data);
  //       });
  //     }
  //   });

  // }

  // useEffect(() => {
  //   hndlSearch()
  // }, [query])

  return (
    <div>

      {
        isLoading ? <div className="flex justify-center items-center h-[90vh]">
          <Loader />
        </div>
          :
          <>
            <div className="flex items-center justify-between gap-5 pb-4 group">
              <div className="border-2 flex items-center gap-5 px-5 py-3 rounded-md w-full group-focus-within:ring-2 group-focus-within:shadow-lg">
                <AiOutlineSearch className="text-3xl text-[color:var(--blue)]" />
                <input
                  type="text"
                  placeholder="Job title or keyword"
                  className="w-full outline-none text-lg"
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>

              <div>
                <RecruiterNotifications />
              </div>
            </div>

            <div className="flex flex-col">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="min-w-full">
                      <thead className="border-b">
                        <tr>
                          <th
                            scope="col"
                            className="font-medium text-gray-900 px-6 py-4 text-left"
                          >
                            Full Name
                          </th>
                          <th
                            scope="col"
                            className="font-medium text-gray-900 px-6 py-4 text-left"
                          >
                            Company
                          </th>
                          <th
                            scope="col"
                            className="font-medium text-gray-900 px-6 py-4 text-left"
                          >
                            Role
                          </th>
                          <th
                            scope="col"
                            className="font-medium text-gray-900 px-6 py-4 text-left"
                          >
                            Application Status
                          </th>
                          <th
                            scope="col"
                            className="font-medium text-gray-900 px-6 py-4 text-left"
                          >
                            Remark
                          </th>
                        </tr>
                      </thead>
                      {candidates && (
                        <tbody>
                          {candidates
                            .filter((value) => {
                              return query.toLowerCase() === ""
                                ? value
                                : value.name.toLowerCase().includes(query) ||
                                  query.toLowerCase() === ""
                                  ? value
                                  : value.jobId?.companyId.companyName
                                    .toLowerCase()
                                    .includes(query) || query.toLowerCase() === ""
                                    ? value
                                    : value.jobId.jobTitle
                                      .toLowerCase()
                                      .includes(query) || query.toLowerCase() === ""
                                      ? value
                                      : value.status.toLowerCase().includes(query) ||
                                        query.toLowerCase() === ""
                                        ? value
                                        : value.remarks.toLowerCase().includes(query) ||
                                          query.toLowerCase() === ""
                                          ? value
                                          : value._id.toString().includes(query);
                            })

                            .map((candidate) => {
                              return (
                                <MyFunction
                                  candidate={candidate}
                                // modelOpened={modelOpened}
                                // setModelOpened={setModelOpened}
                                />
                              );
                            })}
                        </tbody>
                      )}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </>
      }



    </div>
  );
};

export default ManageCandidates;

const MyFunction = ({ candidate }) => {
  const [modelOpened, setModelOpened] = useState(false);

  return (
    <tr className="border-b" key={candidate?._id}>
      <td className="px-6 py-4 whitespace-pre-wrap text-sm font-medium text-gray-900">
        {candidate?.name}
      </td>
      {candidate.jobId?.companyId && (
        <td className="text-sm text-[color:var(--blue)] font-medium px-6 py-4 whitespace-pre-wrap">
          {candidate?.jobId?.companyId?.companyName}
        </td>
      )}
      <td className="text-sm font-medium text-gray-900 px-6 py-4 whitespace-pre-wrap">
        {candidate?.jobId?.jobTitle}
      </td>
      <td
        className={`text-sm font-medium 
                           text-blue-500  px-6 py-4 whitespace-pre-wrap`}
      >
        {candidate?.status}
      </td>
      <td className="text-sm font-medium text-gray-900 px-6 py-4 whitespace-pre-wrap">
        {candidate?.remarks.length > 20
          ? candidate.remarks.slice(0, 20) + "..."
          : candidate.remarks}
      </td>

      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap flex gap-5">
        <div
          className="flex gap-2 items-center font-bold bg-[color:var(--blue)] text-white p-2 rounded-md cursor-pointer"
          onClick={(e) => {
            setModelOpened(true);
          }}
        >
          View Details
        </div>
        {MyFunction}
        <ManageCandidateViewDetailsModal
          modelOpened={modelOpened}
          setModelOpened={setModelOpened}
          candidateData={candidate}

        // send the job data here and then fetch in JobDetailsModal
        />
      </td>
    </tr>
  );
};
