import React, { useState, useEffect, useReducer } from "react";
import {
  AiOutlineEye,
  AiOutlineFileDone,
  AiOutlineSearch,
} from "react-icons/ai";
import { useParams } from "react-router-dom";
import JobDetailsModal from "../../modal/JobDetailsModal";
import ProfileCard from "../ProfileCard";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { baseUrl } from "../../../baseUrl";
import Loader from "../../../hook/Loader";

const CandidateRoleViewJobs = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true)
  const [jobs, setJobs] = useState([]);
  const [company, setcompany] = useState();
  const { id } = useParams();

  const [companyData, setCompany] = useState([]);
  const [jobsCompanyDetails, setJobsCompanyDetails] = useState("");
  const [updateApi, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    let arr = [];
    setcompany(location.state);
    console.log(location.state);
    location.state.jobPostedId.forEach((element) => {
      if (element) {
        arr.push(element);
      }
    });
    setJobs(arr);
    setIsLoading(false)
  }, [location]);


  // let token = localStorage.getItem('token')
  // useEffect(() => {
  //   fetch(`${baseUrl}/company/companyJobData/${id}`, {
  //     headers: {
  //       "Authorization": `Bearer ${token}`
  //     }
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setCompany(data);
  //       // console.log(data);
  //       setIsLoading(false)
  //     });
  // }, [updateApi]);


  // useEffect(() => {
  //   fetch(`${baseUrl}/company/companyData/${id}`, {
  //     headers: {
  //       "Authorization": `Bearer ${token}`
  //     }
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setJobsCompanyDetails(data);
  //     });
  // }, [updateApi]);




  const [query, setQuery] = useState("");


  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-between gap-5 flex-wrap pb-4 border-b-2 border-black group">
        <div className="border-2 flex items-center gap-5 px-5 py-3 rounded-md w-full lg:w-96 group-focus-within:ring-2 group-focus-within:shadow-lg">
          <AiOutlineSearch className="text-3xl" />
          <input
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Search"
            className="w-full outline-none text-lg"
          />
        </div>

        <div>
          <ProfileCard />
        </div>
      </div>

      <div className="my-5">
        <div className="flex flex-col sm:flex-row sm:justify-start gap-5">
          <img
            // src={logo}
            src={`${baseUrl}/users/getImage/${company?.companyLogo?.filename}`}
            alt=""
            className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 object-cover"
          />
          <h3 className="font-semibold text-xl lg:text-2xl my-3">
            {company?.companyName}
          </h3>
        </div>
      </div>



      {
        isLoading ? <div className="flex justify-center items-center h-[54vh]">
          <Loader />
        </div>
          :

          <>
            <div className="flex flex-wrap justify-start">
              <h2 className="text-[color:var(--blue)] font-medium text-xl lg:text-2xl lg:font-semibold xl:text-3xl mt-4 mb-8">
                Jobs Posted by {company?.companyName}
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
                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                          >
                            ID
                          </th>

                          <th
                            scope="col"
                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                          >
                            Job Title
                          </th>
                          <th
                            scope="col"
                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                          >
                            Job Type
                          </th>
                          <th
                            scope="col"
                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                          >
                            JD
                          </th>
                          <th
                            scope="col"
                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                          >
                            View
                          </th>
                          <th
                            scope="col"
                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                          >
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {jobs
                          .filter((value) => {
                            return query.toLowerCase() === ""
                              ? value
                              : value.jobTitle.toLowerCase().includes(query) ||
                                query.toLowerCase() === ""
                                ? value
                                : value.jobType.toLowerCase().includes(query) ||
                                  query.toLowerCase() === ""
                                  ? value
                                  : value._id.toString().includes(query) ||
                                  value?.CustomId?.toString().includes(query);

                          })
                          .map((value) => (
                            <MyFunction value={value} />
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </>
      }



      <ToastContainer />
    </div>
  );
};

export default CandidateRoleViewJobs;

const MyFunction = ({ value }) => {
  const [viewModelOpened, setViewModelOpened] = useState(false);

  const [sendValue, setSendValue] = useState();
  let a = (data) => {
    setSendValue(data);
  };

  return (
    <tr className="border-b" key={value._id}>
      <td className="px-6 py-4 whitespace-pre-wrap text-sm font-medium text-gray-900">
        {value?.CustomId}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">
        {value?.jobTitle}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">
        {value?.jobType}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">
        <a
          href={`${baseUrl}/users/getImage/${value?.jobDetailsFile?.filename}`}
          download={value?.jobDetailsFile?.filename}
          target="_blank"
          rel="noreferrer"
        >
          <AiOutlineFileDone className="text-[color:var(--blue)] text-xl" />
        </a>
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">
        <button
          className="flex gap-2 items-center font-bold bg-yellow-600 text-white p-2 rounded-lg cursor-pointer"
          onClick={() => {
            a(value);
            setViewModelOpened(true);
          }}
        >
          View <AiOutlineEye />
        </button>
        <JobDetailsModal
          modelOpened={viewModelOpened}
          setModelOpened={setViewModelOpened}
          data={sendValue ? sendValue : value}

        // send the data here
        />
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap flex gap-5">
        <Link
          to={`/admin/candidaterole/${value._id}/candidates`}
          state={value}
        >
          <button className="flex gap-2 items-center font-bold bg-green-500 text-white p-2 rounded-lg cursor-pointer">
            View Candidates
          </button>
        </Link>
      </td>
    </tr>
  );
};
