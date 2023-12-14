import { Option, Select } from '@material-tailwind/react';
import React, { useState, useEffect, useReducer } from "react";
import { AiOutlineFileDone, AiOutlineSearch } from "react-icons/ai";
import { FcApprove, FcDisapprove } from "react-icons/fc";
import ProfileCard from "../ProfileCard";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { baseUrl } from "../../../baseUrl";
import { useDispatch, useSelector } from "react-redux";
import { counterActions } from "../../../store/index-redux";
import { database } from "../../../Firebase";
import { ref, set } from "firebase/database";
import mongoose from "mongoose";
import { ThreeDots } from "react-loader-spinner";
import ManageCandidateViewDetailsModal from '../../modal/ManageCandidateViewDetailsModal';

const CandidateRoleViewCandidates = () => {
  let [data, setData] = useState([]);
  const location = useLocation();
  const [updateApi, forceUpdate] = useReducer((x) => x + 1, 0);
  const [candidates, setCandidates] = useState([]);
  const [job, setJob] = useState();
  const dispatch = useDispatch();

  const applicationsIds = useSelector((state) => state.counter.candidateApplicationArray)

  useEffect(() => {
    let arr = [];
    setJob(location.state);
    location.state.candidatesId.forEach((element) => {
      if (element) {
        arr.push(element);
      }
    });

    // ------
    const filteredArray = arr.filter(element => !applicationsIds?.includes(element._id));
    // ------



    setCandidates(filteredArray);
  }, [location, applicationsIds]);
  /*----------------------------------Send notification--------------------------------------------------------------- */
  const sendNotification = async (data) => {
    let x = mongoose.Types.ObjectId();
    let id = x.toString();

    set(ref(database, "users/" + data.recruiterId + `/${id}`), {
      title: data.rTitle,
      body: data.rBody,
      receivedAt: Date.now(),
      seen: false,
    });
    if (data.type === "Accept") {
      x = mongoose.Types.ObjectId();
      id = x.toString();
      // console.log("*",data.companyId._id)
      set(ref(database, "users/" + data.companyId._id + `/${id}`), {
        title: data.cTitle,
        body: data.cBody,
        receivedAt: Date.now(),
        seen: false,
      });
    }
  };

  /*--------------------------------------------------------------------------------------------------------------------------- */

  const [query, setQuery] = useState("");
  const [customValue, setcustomValue] = useState("");

  const formHandler = async (data, value) => {
    console.log(data, value);
    try {
      let token = localStorage.getItem('token');
      const result = await fetch(`${baseUrl}/recruiter/ManageProfileStatusChange/${data._id}`, {
        method: 'put',
        body: JSON.stringify({ statusDb: value }),
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const jsonData = await result.json();
      toast(`Current status is "${jsonData.status}"`);

      if (!result.ok) {
        throw new Error(jsonData.message);
      }
      setcustomValue(jsonData.status);
      let newData = {
        name: jsonData.name,
        recruiterId: jsonData.recruiterId,
        jobTitle: job.jobTitle,
        status: jsonData.status,
      };
      sendNotification(newData);
      forceUpdate()
      // toast(jsonData.message);
    } catch (error) {
      console.log(error);
      toast(error);
    }
  };


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

      <h2 className="text-[color:var(--blue)] font-medium text-xl lg:text-2xl lg:font-semibold xl:text-3xl mt-4 mb-8">
        Recruiter Submissions
      </h2>

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
                      Recruiter Name
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Company Name
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      CV
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Details
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
                  {candidates
                    .filter((value) => {
                      return query.toLowerCase() === ""
                        ? job
                        : job.jobTitle.toLowerCase().includes(query) ||
                          query.toLowerCase() === ""
                          ? job
                          : job.jobType.toLowerCase().includes(query) ||
                            query.toLowerCase() === ""
                            ? value
                            : value.recruiterId.fullName
                              .toLowerCase()
                              .includes(query) || query.toLowerCase() === ""
                              ? value
                              : value.recruiterId.email
                                .toLowerCase()
                                .includes(query) || query.toLowerCase() === ""
                                ? job
                                : job.companyId.companyName
                                  .toLowerCase()
                                  .includes(query) ||
                                value.CustomId.toString().includes(query);
                    })
                    .map((value) => (
                      <MyFunction value={value} job={job} formHandler={formHandler} customValue={customValue} />

                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CandidateRoleViewCandidates;

const MyFunction = ({ value, job, formHandler, customValue }) => {

  const [modelOpened, setModelOpened] = useState(false);

  const [Action, setAction] = useState(null);


  let a = (id) => {
    setAction(id)
  }









  return (
    <tr className="border-b" key={value?._id}>
      <td className="px-6 py-4 whitespace-pre-wrap text-sm font-medium text-gray-900">
        {value?.CustomId}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">
        {value?.recruiterId?.fullName}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">
        {value?.recruiterId?.email}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">
        {job.jobTitle}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">
        {job.companyId?.companyName}
      </td>



      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">
        <a
          href={`${baseUrl}/users/getImage/${value?.resume?.filename}`}
          download={value?.resume?.filename}
          target="_blank"
          rel="noreferrer"
        >
          <AiOutlineFileDone className="text-[color:var(--blue)] text-xl" />
        </a>
      </td>



      <td className="text-sm text-gray-900 font-light  py-4 whitespace-nowrap flex gap-5">
        <div
          className="flex gap-2 items-center font-bold bg-[color:var(--blue)] text-white p-2 rounded-md cursor-pointer"
          onClick={(e) => {
            setModelOpened(true);
          }}>
          View Details
        </div>

        <ManageCandidateViewDetailsModal
          modelOpened={modelOpened}
          setModelOpened={setModelOpened}
          candidateData={value}

        // send the job data here and then fetch in JobDetailsModal
        />
      </td>




      <td >

        <select
          label={value.status}
          value={customValue ? customValue : value.status}
          onChange={(e) => {
            formHandler(value, e.target.value);
          }}>
          <option value="Candidate Shortlisted">
            Candidate Shortlisted
          </option>
          <option value="Interview Process">Interview Process</option>
          <option value="Candidate Selected">Candidate Selected</option>
          <option value="Candidate Joined">Candidate Joined</option>
          <option value='Payment Done'>Payment Done</option>

        </select>

      </td>
    </tr>
  );
};



