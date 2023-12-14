import React, { useEffect, useState } from "react";
import { AiOutlineFileDone, AiOutlineSearch } from "react-icons/ai";
import { baseUrl } from "../../baseUrl";
import { FaEdit } from "react-icons/fa";
import PendingApprovalEdit from "../modal/PendingApprovalEdit";
import CompanyNotifications from "./CompanyNotifications";
import { useSelector } from "react-redux";
import Loader from "../../hook/Loader";

const PendingApproval = () => {
  const [pendindJobs, setpendindJobs] = useState([]);

  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true)

  // let hndlSearch = (e) => {
  //   let qureyd = query
  //   fetch(`${baseUrl}/company/pendingApprovesearchbar/${qureyd}`).then((res) => {
  //     //first check the status code
  //     if (res.status === 200) {
  //       //then extract the json data
  //       res.json().then((data) => {
  //         setpendindJobs(data);
  //         // forceupdate()
  //         console.log(data);
  //       });
  //     }
  //   });

  // }

  // useEffect(() => {
  //   hndlSearch()
  // }, [query])

  const pendingJobEditRenderState = useSelector(
    (state) => state.counter.companyPendingJob_edit
  );
  let token = localStorage.getItem("token")
  useEffect(() => {
    fetch(`${baseUrl}/company/companyPending`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setpendindJobs(data);
        setIsLoading(false)
      });
  }, [pendingJobEditRenderState]);

  return (
    <div>

      {
        isLoading ? <div className="flex justify-center items-center h-[90vh]">
          <Loader />
        </div>

          :
          <>

            <div className="flex items-center justify-between gap-5 pb-4">
              <div className="border-2 flex items-center gap-5 px-5 py-3 rounded-md w-full">
                <AiOutlineSearch className="text-3xl text-[color:var(--blue)]" />
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
                Pending Approval
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
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {pendindJobs
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

export default PendingApproval;

const MyFunction = ({ data }) => {
  const [modelOpened, setModelOpened] = useState(false);

  let [single, setSingleData] = useState();
  let a = (data) => {
    setSingleData(data);
  };
  return (
    <tr className="border-b" key={data._id}>
      <td className="px-6 py-4 whitespace-pre-wrap text-sm font-medium text-gray-900">
        {data.CustomId}
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

      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap flex gap-5">
        <button
          className="flex gap-2 items-center font-bold bg-yellow-600 text-white px-3 py-2 rounded-md cursor-pointer"
          onClick={(e) => {
            setModelOpened(true);
            a(data);
          }}
        >
          Edit <FaEdit />
        </button>
        <PendingApprovalEdit
          modelOpened={modelOpened}
          setModelOpened={setModelOpened}
          data={single ? single : data}
        // send the data here
        />
      </td>
    </tr>
  );
};
