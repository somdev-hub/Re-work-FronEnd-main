import React, { useState, useEffect, useReducer } from "react";
import {
  AiOutlineEye,
  AiOutlineFileDone,
  AiOutlineSearch,
} from "react-icons/ai";
import { FcApprove, FcDisapprove } from "react-icons/fc";
import { useParams } from "react-router-dom";
import CompanyPostedJobRejectModal from "../../modal/CompanyPostedJobRejectModal";
import JobDetailsModal from "../../modal/JobDetailsModal";
import ProfileCard from "../ProfileCard";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { baseUrl } from "../../../baseUrl";
import { database } from "../../../Firebase";
import { ref, set } from "firebase/database";
import mongoose from "mongoose";
import { useDispatch, useSelector } from "react-redux";
import { counterActions } from "../../../store/index-redux";
import Loader from "../../../hook/Loader";
import { ThreeDots } from "react-loader-spinner";


const ApplicationsCompanyPostedJobsVIewJobs = () => {
  const { id } = useParams();

  const [company, setcompany] = useState();
  const [jobs, setJobs] = useState([]);
  const [companyData, setCompany] = useState([]);
  const [updateApi, forceUpdate] = useReducer((x) => x + 1, 0);
  const [logo, setLogo] = useState();
  const location = useLocation();
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const approvedOrrejectedIds = useSelector(
    (state) => state.counter.jobsActionArray
  );

  const [isLoading, setIsLoading] = useState(true)



  useEffect(() => {
    setcompany(location.state);
    if (location.state.companyLogo) {
      let url = `${baseUrl}/users/getImage/${location.state.companyLogo.filename}`;
      setLogo(url);
    }
    if (location.state.jobPostedId) {
      let arr = [];
      location.state.jobPostedId.forEach((element) => {
        if (element.status === "company_addJobs_fress") {
          arr.push(element);
        }
      });

      const filteredArray = arr.filter(element => !approvedOrrejectedIds?.includes(element._id));
      setIsLoading(false)

      setJobs(filteredArray);
    }
  }, [approvedOrrejectedIds]);
  // }, [updateApi, window.localStorage.getItem("companyPostedJobApprovel")]);
  // console.log(jobs);

  // useEffect(() => {
  //   fetch(`/company/companyJobData/${id}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setCompany(data);
  //       // console.log(data);
  //     });
  // }, [updateApi]);

  // useEffect(() => {
  //   fetch(`/company/companyData/${id}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setJobsCompanyDetails(data);
  //     });
  // }, [updateApi]);

  /*----------------------------------------------------------------------------------------------------------------------------- */
  const postNotification = async (data) => {
    try {
      let token = location.getItem('token')
      const res = await fetch(`${baseUrl}/admin/sendNotifications`, {
        method: "post",
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data),
      });

      const jsonData = await res.json();
      if (!res.ok) {
        throw new Error(jsonData.message);
      }
      return jsonData.posts;
    } catch (error) {
      console.log(error);
    }
  };
  /*----------------------------------Send notification--------------------------------------------------------------- */

  const sendNotification = async (data) => {
    let x = mongoose.Types.ObjectId();
    let id = x.toString();

    let notificationTitle = "Admin-approval";
    let notificationBody = `<span className= text-green-500> ${data.jobTitle}</span> job has been approved by 
                            admin.`;

    await set(ref(database, "users/" + data.companyId + `/${id}`), {
      title: notificationTitle,
      body: notificationBody,
      receivedAt: Date.now(),
      seen: false,
    });
    x = mongoose.Types.ObjectId();
    id = x.toString();
    const arr = await postNotification({ clientType: "Recruiters" });
    // console.log(arr);
    notificationTitle = "New Job";
    notificationBody = `A new job has been posted by companyId: <span className= text-green-500> ${data.companyId}</span>
                        for <span className= text-green-500> ${data.jobTitle}</span> `;
    arr?.forEach((element) => {
      set(ref(database, "users/" + element + `/${id}`), {
        title: notificationTitle,
        body: notificationBody,
        receivedAt: Date.now(),
        seen: false,
      });
    });
  };




  const [actionCompleteV, SetActionV] = useState('Wait...')
  /*----------------------------------------------------------------------------------------------------------------------------------- */
  let hndleAccept = (e, status, id) => {
    if (status === "company_addJobs_fress") {
      const statusDb = "Admin-Approve";

      //   console.log(addFor);
      const s = { statusDb };
      // console.log(s);
      let token = localStorage.getItem('token')
      fetch(`${baseUrl}/company/AdminStatusChange/${id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(s),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data", data);
          dispatch(counterActions.jobsAction({ jobId: data._id }));
          // alert("Approved.....");
          let newData = {
            jobTitle: data.jobTitle,
            companyId: data.companyId,
          };
          sendNotification(newData);
          window.localStorage.setItem("companyPostedJobApprovel", id);
          toast("Approved!");
          SetActionV("Approved")


          // forceUpdate();
          // console.log(data);
        }).catch((error) => {
          SetActionV("Server error")

          console.log(error);


        });
    }
  };
  // let hndleReject = (e, status, id) => {
  //   if (status === "company_addJobs_fress") {
  //     const statusDb = "Admin-Rejected";

  //     //   console.log(addFor);
  //     const s = { statusDb };
  //     // console.log(s);
  //     fetch(`/company/AdminStatusChange/${id}`, {
  //       method: "PUT",
  //       headers: { "content-type": "application/json" },
  //       body: JSON.stringify(s),
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         // alert("This is rejected by you");
  //         toast("This is rejected by you!");
  //         forceUpdate();
  //       });
  //   } else {
  //     // alert("You already selected");
  //     toast("You already rejected this!");
  //   }
  // };

  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-between gap-5 flex-wrap pb-4 border-b-2 border-black group">
        <div className="border-2 flex items-center gap-5 px-5 py-3 rounded-md w-full lg:w-96 group-focus-within:ring-2 group-focus-within:shadow-lg">
          <AiOutlineSearch className="text-3xl" />
          <input
            type="text"
            placeholder="Search"
            className="w-full outline-none text-lg"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div>
          <ProfileCard />
        </div>
      </div>

      <div className="my-5">
        <div className="flex flex-col sm:flex-row sm:justify-start gap-5">
          <img
            src={logo}
            alt=""
            className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 object-cover"
          />
          <h3 className="font-semibold text-xl lg:text-2xl my-3">
            {company?.companyName}
          </h3>
        </div>
      </div>

      <div className="flex flex-wrap justify-start">
        <h2 className="text-[color:var(--blue)] font-medium text-xl lg:text-2xl lg:font-semibold xl:text-3xl mt-4 mb-8">
          Jobs Posted by {company?.companyName}
        </h2>
      </div>


      {

        isLoading ? <div className="flex justify-center items-center h-[54vh]">
          <Loader />
        </div>
          :
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
                                : value?._id.toString().includes(query) ||
                                value?.CustomId?.toLowerCase().includes(query);
                        })
                        .map((value) => (
                          <MyFunction value={value} hndleAccept={hndleAccept} actionCompleteV={actionCompleteV} />
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
      }
      <ToastContainer />
    </div>
  );
};

export default ApplicationsCompanyPostedJobsVIewJobs;

const MyFunction = ({ value, hndleAccept, actionCompleteV }) => {
  const [viewModelOpened, setViewModelOpened] = useState(false);
  const [rejectJobRemarkModel, setRejectJobRemarkModel] = useState(false);

  const [sendId, setSendId] = useState();
  let a = (id) => {
    setSendId(id);
  };

  // ------


  const [actionComplete, SetAction] = useState(null)
  let Q = (id) => {
    SetAction(id)
  }




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
          onClick={() => setViewModelOpened(true)}
        >
          View <AiOutlineEye />
        </button>
        <JobDetailsModal
          modelOpened={viewModelOpened}
          setModelOpened={setViewModelOpened}
          data={value}
        // send the data here
        />
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap flex gap-5">


        {
          actionComplete === value?._id ? <div className="flex justify-end">
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
            //   className="flex gap-2 items-center font-bold bg-green-200 text-black p-2 rounded-lg cursor-pointer" aria-disabled="true">
            //   Wait...
            // </button> 

            :
            <>

              <button
                onClick={(e) => {
                  hndleAccept(e, value.status, value._id);
                  Q(value._id)
                }}
                className="flex gap-2 items-center font-bold bg-green-500 text-white p-2 rounded-lg cursor-pointer"
              >
                Approve <FcApprove />
              </button>
              <button
                // onClick={(e) => {
                //   hndleReject(e, value.status, value._id);
                // }}
                onClick={() => {
                  setRejectJobRemarkModel(true);
                  a(value._id);

                }}
                className="flex gap-2 items-center font-bold bg-red-500 text-white p-2 rounded-lg cursor-pointer"
              >
                <CompanyPostedJobRejectModal
                  modelOpened={rejectJobRemarkModel}
                  setModelOpened={setRejectJobRemarkModel}
                  data={sendId ? sendId : value._id}
                // send the data here
                />
                Reject <FcDisapprove />
              </button>
            </>
        }


      </td>
    </tr>
  );
};
