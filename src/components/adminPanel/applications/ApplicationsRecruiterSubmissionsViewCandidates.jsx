

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

const ApplicationsRecruiterSubmissionsViewCandidates = () => {
  let [data, setData] = useState([]);
  const location = useLocation();
  const [updateApi, forceUpdate] = useReducer((x) => x + 1, 0);
  const [candidates, setCandidates] = useState([]);
  const [job, setJob] = useState();
  const [reducerValue, forceData] = useReducer((x) => x + 1, 0);
  const dispatch = useDispatch();

  const applicationsIds = useSelector((state) => state.counter.candidateApplicationArray)

  useEffect(() => {
    let arr = [];
    setJob(location.state);
    location.state.candidatesId.forEach((element) => {
      if (element.status === "Submitted") {
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

  let hndleAccept = (e, status, id) => {
    if (status === "Submitted") {
      const statusDb = "Internal Shortlist";

      //   console.log(addFor);
      const s = { statusDb };
      //   console.log(s);
      let token = localStorage.getItem('token')
      fetch(`${baseUrl}/recruiter/ManageProfileStatusChange/${id}`, {
        method: "PUT",
        headers: { "content-type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(s),
      })
        .then((res) => res.json())
        .then((data) => {
          // alert("Approved.....");
          let newData = {
            type: "Accept",
            recruiterId: data.recruiterId,
            companyId: job.companyId,
            rTitle: "Admin-approved",
            rBody: `Application of candidate <span className= text-green-500 >${data.name}</span> for <span className= text-green-500>${job.jobTitle}</span> has been accepted by admin.`,
            cTitle: "New Application",
            cBody: `A new candidate's application named <span className= text-green-500 >${data.name}</span> has been received by <span className= text-green-500 >${data.recruiterId}</span> for
                             <span className= text-green-500> ${data.jobTitle}</span>,.`,
          };
          sendNotification(newData);
          dispatch(counterActions.candidateApplicationAction({ applicationId: data._id }))
          toast("Approved!");

          forceUpdate();
        });
    }
  };

  let hndleReject = (e, status, id) => {
    if (status === "Submitted") {
      const statusDb = "Admin Rejected";

      //   console.log(addFor);
      const s = { statusDb };
      //   console.log(s);
      let token = localStorage.getItem('token')
      fetch(`${baseUrl}/recruiter/ManageProfileStatusChange/${id}`, {
        method: "PUT",
        headers: { "content-type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(s),
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch(counterActions.candidateApplicationAction({ applicationId: data._id }))
          let newData = {
            recruiterId: data.recruiterId,
            rTitle: "Admin-rejection",
            rBody: `Application of candidate <span className= text-green-500 >${data.name}</span> for <span className= text-green-500>${job.jobTitle}</span> has been rejected by admin.`,
          };
          sendNotification(newData);
          // alert("This is rejected by you");
          toast("Rejected!");
          forceUpdate();
        });
    } else {
      // alert("You already selected");
      toast("You already selected this!");
    }
  };
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
                      <MyFunction value={value} hndleAccept={hndleAccept} hndleReject={hndleReject} job={job} />

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

export default ApplicationsRecruiterSubmissionsViewCandidates;

const MyFunction = ({ value, hndleAccept, hndleReject, job }) => {


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
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap flex gap-5">

        {
          Action === value?._id ? <div className="flex justify-end">
            <ThreeDots
              height="50"
              width="50"
              radius="9"
              color="#4287f5"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}

            />
          </div>
            // <button
            //   className="flex gap-2 items-center font-bold bg-green-200 text-black p-2 rounded-lg cursor-pointer" aria-disabled="true"> Wait..</button>
            :
            <>
              <button
                onClick={(e) => {
                  hndleAccept(e, value.status, value._id);
                  a(value._id)
                }}
                className="flex gap-2 items-center font-bold bg-green-500 text-white p-2 rounded-lg cursor-pointer"
              >
                Approve <FcApprove />
              </button>

              <button
                onClick={(e) => {
                  hndleReject(e, value.status, value._id);
                  a(value._id)
                }}
                className="flex gap-2 items-center font-bold bg-red-500 text-white p-2 rounded-lg cursor-pointer"
              >
                Reject <FcDisapprove />
              </button>
            </>
        }


      </td>
    </tr>
  );
};





















// import React, { useState, useEffect, useReducer } from "react";
// import { AiOutlineFileDone, AiOutlineSearch } from "react-icons/ai";
// import { FcApprove, FcDisapprove } from "react-icons/fc";
// import ProfileCard from "../ProfileCard";
// import { ToastContainer, toast } from "react-toastify";
// import { useLocation } from "react-router-dom";
// import { baseUrl } from "../../../baseUrl";
// import { useDispatch } from "react-redux";
// import { counterActions } from "../../../store/index-redux";
// import { database } from "../../../Firebase";
// import { ref, set } from "firebase/database";
// import mongoose from "mongoose";

// const ApplicationsRecruiterSubmissionsViewCandidates = () => {
//   let [data, setData] = useState([]);
//   const location = useLocation();
//   const [updateApi, forceUpdate] = useReducer((x) => x + 1, 0);
//   const [candidates, setCandidates] = useState([]);
//   const [job, setJob] = useState();
//   const [reducerValue, forceData] = useReducer((x) => x + 1, 0);
//   const dispatch = useDispatch();

//   const updatePageFunc = () => {
//     dispatch(counterActions.adminApproveCandidate());
//   };

//   useEffect(() => {
//     let arr = [];
//     setJob(location.state);
//     location.state.candidatesId.forEach((element) => {
//       if (element.status === "Submitted") {
//         arr.push(element);
//       }
//     });
//     setCandidates(arr);
//   }, [location, updateApi]);
//   /*----------------------------------Send notification--------------------------------------------------------------- */
//   const sendNotification = async (data) => {
//     let x = mongoose.Types.ObjectId();
//     let id = x.toString();

//     set(ref(database, "users/" + data.recruiterId + `/${id}`), {
//       title: data.rTitle,
//       body: data.rBody,
//       receivedAt: Date.now(),
//       seen: false,
//     });
//     if (data.type === "Accept") {
//       x = mongoose.Types.ObjectId();
//       id = x.toString();
//       // console.log("*",data.companyId._id)
//       set(ref(database, "users/" + data.companyId._id + `/${id}`), {
//         title: data.cTitle,
//         body: data.cBody,
//         receivedAt: Date.now(),
//         seen: false,
//       });
//     }
//   };

//   /*--------------------------------------------------------------------------------------------------------------------------- */

//   let hndleAccept = (e, status, id) => {
//     if (status === "Submitted") {
//       const statusDb = "Internal Shortlist";

//       //   console.log(addFor);
//       const s = { statusDb };
//       //   console.log(s);
//       fetch(`${baseUrl}/recruiter/ManageProfileStatusChange/${id}`, {
//         method: "PUT",
//         headers: { "content-type": "application/json" },
//         body: JSON.stringify(s),
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           // alert("Approved.....");
//           let newData = {
//             type: "Accept",
//             recruiterId: data.recruiterId,
//             companyId: job.companyId,
//             rTitle: "Admin-approved",
//             rBody: `Application of candidate <span className= text-green-500 >${data.name}</span> for <span className= text-green-500>${job.jobTitle}</span> has been accepted by admin.`,
//             cTitle: "New Application",
//             cBody: `A new candidate's application named <span className= text-green-500 >${data.name}</span> has been received by <span className= text-green-500 >${data.recruiterId}</span> for
//                              <span className= text-green-500> ${data.jobTitle}</span>,.`,
//           };
//           sendNotification(newData);
//           updatePageFunc();
//           toast("Approved!");

//           forceUpdate();
//         });
//     }
//   };

//   let hndleReject = (e, status, id) => {
//     if (status === "Submitted") {
//       const statusDb = "Admin Rejected";

//       //   console.log(addFor);
//       const s = { statusDb };
//       //   console.log(s);
//       fetch(`${baseUrl}/recruiter/ManageProfileStatusChange/${id}`, {
//         method: "PUT",
//         headers: { "content-type": "application/json" },
//         body: JSON.stringify(s),
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           updatePageFunc();
//           let newData = {
//             recruiterId: data.recruiterId,
//             rTitle: "Admin-rejection",
//             rBody: `Application of candidate <span className= text-green-500 >${data.name}</span> for <span className= text-green-500>${job.jobTitle}</span> has been rejected by admin.`,
//           };
//           sendNotification(newData);
//           // alert("This is rejected by you");
//           toast("Rejected!");
//           forceUpdate();
//         });
//     } else {
//       // alert("You already selected");
//       toast("You already selected this!");
//     }
//   };
//   const [query, setQuery] = useState("");
//   // console.log(query);
//   return (
//     <div>
//       <div className="flex flex-col lg:flex-row justify-between gap-5 flex-wrap pb-4 border-b-2 border-black group">
//         <div className="border-2 flex items-center gap-5 px-5 py-3 rounded-md w-full lg:w-96 group-focus-within:ring-2 group-focus-within:shadow-lg">
//           <AiOutlineSearch className="text-3xl" />
//           <input
//             onChange={(e) => setQuery(e.target.value)}
//             type="text"
//             placeholder="Search"
//             className="w-full outline-none text-lg"
//           />
//         </div>

//         <div>
//           <ProfileCard />
//         </div>
//       </div>

//       <h2 className="text-[color:var(--blue)] font-medium text-xl lg:text-2xl lg:font-semibold xl:text-3xl mt-4 mb-8">
//         Recruiter Submissions
//       </h2>

//       <div className="flex flex-col">
//         <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
//           <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
//             <div className="overflow-hidden">
//               <table className="min-w-full">
//                 <thead className="border-b">
//                   <tr>
//                     <th
//                       scope="col"
//                       className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
//                     >
//                       ID
//                     </th>
//                     <th
//                       scope="col"
//                       className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
//                     >
//                       Recruiter Name
//                     </th>
//                     <th
//                       scope="col"
//                       className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
//                     >
//                       Email
//                     </th>
//                     <th
//                       scope="col"
//                       className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
//                     >
//                       Role
//                     </th>
//                     <th
//                       scope="col"
//                       className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
//                     >
//                       Company Name
//                     </th>
//                     <th
//                       scope="col"
//                       className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
//                     >
//                       CV
//                     </th>
//                     <th
//                       scope="col"
//                       className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
//                     >
//                       Action
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {candidates
//                     .filter((value) => {
//                       return query.toLowerCase() === ""
//                         ? job
//                         : job.jobTitle.toLowerCase().includes(query) ||
//                           query.toLowerCase() === ""
//                           ? job
//                           : job.jobType.toLowerCase().includes(query) ||
//                             query.toLowerCase() === ""
//                             ? value
//                             : value.recruiterId.fullName
//                               .toLowerCase()
//                               .includes(query) || query.toLowerCase() === ""
//                               ? value
//                               : value.recruiterId.email
//                                 .toLowerCase()
//                                 .includes(query) || query.toLowerCase() === ""
//                                 ? job
//                                 : job.companyId.companyName
//                                   .toLowerCase()
//                                   .includes(query) ||
//                                 value._id.toString().includes(query);
//                     })
//                     .map((value) => (
//                       <tr className="border-b" key={value?._id}>
//                         <td className="px-6 py-4 whitespace-pre-wrap text-sm font-medium text-gray-900">
//                           {value?._id}
//                         </td>
//                         <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">
//                           {value?.recruiterId?.fullName}
//                         </td>
//                         <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">
//                           {value?.recruiterId?.email}
//                         </td>
//                         <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">
//                           {job.jobTitle}
//                         </td>
//                         <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">
//                           {job.companyId?.companyName}
//                         </td>
//                         <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">
//                           <a
//                             href={`${baseUrl}/users/getImage/${value?.resume?.filename}`}
//                             download={value?.resume?.filename}
//                             target="_blank"
//                             rel="noreferrer"
//                           >
//                             <AiOutlineFileDone className="text-[color:var(--blue)] text-xl" />
//                           </a>
//                         </td>
//                         <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap flex gap-5">
//                           <button
//                             onClick={(e) => {
//                               hndleAccept(e, value.status, value._id);
//                             }}
//                             className="flex gap-2 items-center font-bold bg-green-500 text-white p-2 rounded-lg cursor-pointer"
//                           >
//                             Approve <FcApprove />
//                           </button>
//                           <button
//                             onClick={(e) => {
//                               hndleReject(e, value.status, value._id);
//                             }}
//                             className="flex gap-2 items-center font-bold bg-red-500 text-white p-2 rounded-lg cursor-pointer"
//                           >
//                             Reject <FcDisapprove />
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default ApplicationsRecruiterSubmissionsViewCandidates;
