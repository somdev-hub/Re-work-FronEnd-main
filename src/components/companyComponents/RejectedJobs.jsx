import React, { useState, useEffect } from "react";
import {
  AiOutlineFileDone,
  AiOutlineSearch,
  AiOutlineEye,
} from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import CompanyRejectedJobsView from "../modal/CompanyRejectedJobsView";
import { baseUrl } from "../../baseUrl";
import PendingApprovalEdit from "../modal/PendingApprovalEdit";
import CompanyNotifications from "./CompanyNotifications";
import { useSelector } from "react-redux";
import Loader from "../../hook/Loader";


const RejectedJobs = () => {
  const [candidateData, setCandidateData] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  const [query, setQuery] = useState("");

  // let hndlSearch = (e) => {
  //   let qureyd = query
  //   fetch(`${baseUrl}/company/rejectedsearchbar/${qureyd}`).then((res) => {
  //     //first check the status code
  //     if (res.status === 200) {
  //       //then extract the json data
  //       res.json().then((data) => {
  //         setCandidateData(data);

  //         // forceupdate()
  //         console.log(data);
  //       });
  //     }
  //   });

  // }

  // useEffect(() => {
  //   hndlSearch()
  // }, [query])
  let token = localStorage.getItem("token");
  useEffect(() => {
    fetch(`${baseUrl}/company/companyRejected`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setCandidateData(data);
        setIsLoading(false)

      });
  }, []);

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
                <AiOutlineSearch className="text-3xl text-[color:var(--blue)] " />
                <input
                  // onClick={(e) => { hndlSearch(e) }}
                  type="text"
                  placeholder="Job title or keyword"
                  className="w-full outline-none text-lg"
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <div>
                <CompanyNotifications />
              </div>
            </div>

            <div>
              <h2 className="font-medium text-[color:var(--blue)] text-xl lg:text-2xl lg:font-semibold xl:text-3xl mt-4 mb-8">
                Rejected Jobs
              </h2>
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
                            ID
                          </th>
                          <th
                            scope="col"
                            className="font-medium text-gray-900 px-6 py-4 text-left"
                          >
                            Job Title
                          </th>
                          <th
                            scope="col"
                            className="font-medium text-gray-900 px-6 py-4 text-left"
                          >
                            Package
                          </th>
                          <th
                            scope="col"
                            className="font-medium text-gray-900 px-6 py-4 text-left"
                          >
                            Experience
                          </th>
                          <th
                            scope="col"
                            className="font-medium text-gray-900 px-6 py-4 text-left"
                          >
                            Job Type
                          </th>
                          <th
                            scope="col"
                            className="font-medium text-gray-900 px-6 py-4 text-left"
                          >
                            JD
                          </th>
                          <th
                            scope="col"
                            className="font-medium text-gray-900 px-6 py-4 text-left"
                          >
                            Remark
                          </th>
                          <th
                            scope="col"
                            className="font-medium text-gray-900 px-6 py-4 text-left"
                          >
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {candidateData
                          .filter((value) => {
                            return query.toLowerCase() === ""
                              ? value
                              : value.jobTitle.toLowerCase().includes(query) ||
                                query.toLowerCase() === ""
                                ? value
                                : value.package.toLowerCase().includes(query) ||
                                  query.toLowerCase() === ""
                                  ? value
                                  : value.experience.toLowerCase().includes(query) ||
                                    query.toLowerCase() === ""
                                    ? value
                                    : value.jobType.toLowerCase().includes(query) ||

                                    value?.CustomId?.toString().includes(query)
                          })
                          .map((data) => (
                            <MyFunction data={data} />
                          ))}
                      </tbody>
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

export default RejectedJobs;

const MyFunction = ({ data }) => {
  const [modelOpened, setModelOpened] = useState(false);
  const [editModelOpened, setEditModelOpened] = useState(false);

  let [single, setSingleData] = useState();
  let a = (data) => {
    setSingleData(data);
  };

  let [remrk, setremrk] = useState("");
  let rej = (remark) => {
    setremrk(remark);
  };

  return (
    <tr className="border-b" key={data._id}>
      <td className="px-6 py-4 whitespace-pre-wrap text-sm font-medium text-gray-900">
        {data?.CustomId}
      </td>
      <td className="px-6 py-4 whitespace-pre-wrap text-sm font-medium text-gray-900">
        {data.jobTitle}
      </td>
      <td className="text-sm font-medium px-6 py-4 whitespace-pre-wrap">
        {data.package}
      </td>
      <td className="text-sm font-medium text-gray-900 px-6 py-4 whitespace-pre-wrap">
        {data.experience}
      </td>
      <td className="text-sm font-medium text-gray-900 px-6 py-4 whitespace-pre-wrap">
        {data.jobType}
      </td>
      <td className="text-sm font-medium text-gray-900 px-6 py-4 whitespace-pre-wrap">
        <a
          href={`${baseUrl}/users/getImage/${data?.jobDetailsFile?.filename}`}
          download={data?.jobDetailsFile?.filename}
          target="_blank"
          rel="noreferrer"
        >
          <AiOutlineFileDone className="text-[color:var(--blue)] text-xl" />
        </a>
      </td>

      <td className="text-sm font-medium text-gray-900 px-6 py-4 whitespace-pre-wrap">
        <div
          className="flex gap-2 items-center font-bold bg-[color:var(--blue)] text-white p-2 rounded-md cursor-pointer"
          onClick={(e) => {
            rej(data.remark);
            setModelOpened(true);
          }}
        >
          View <AiOutlineEye />
        </div>
        <CompanyRejectedJobsView
          modelOpened={modelOpened}
          setModelOpened={setModelOpened}
          data={remrk ? remrk : data.remark}
        />
      </td>

      <td className="text-sm font-medium text-gray-900 px-6 py-4 whitespace-pre-wrap">
        <button
          className="flex gap-2 items-center font-bold bg-yellow-600 text-white px-3 py-2 rounded-md cursor-pointer"
          onClick={(e) => {
            a(data);
            setEditModelOpened(true);
          }}
        >
          Edit <FaEdit />
        </button>
        <PendingApprovalEdit
          modelOpened={editModelOpened}
          setModelOpened={setEditModelOpened}
          data={single ? single : data}
        // send the data here
        />
      </td>
    </tr>
  );
};
