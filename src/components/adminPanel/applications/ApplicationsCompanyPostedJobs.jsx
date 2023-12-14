import React, { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import ProfileCard from "../ProfileCard";
import { toast, ToastContainer } from "react-toastify";
import { baseUrl } from "../../../baseUrl";

import Loader from "../../../hook/Loader";
const ApplicationsCompanyPostedJobs = () => {
  const [companies, setCompanies] = useState([]);

  const [query, setQuery] = useState("");


  const [isLoading, setIsLoading] = useState(true)


  // let hndlSearch = (e) => {
  //   let qureyd = query
  //   fetch(`${baseUrl}/company/adminCompanyApllicationSearchbar/${qureyd}`).then((res) => {
  //     //first check the status code
  //     if (res.status === 200) {
  //       //then extract the json data
  //       res.json().then((data) => {
  //         setCompanies(data.posts);
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
    const getCompanies = async () => {
      try {
        const result = await fetch(`${baseUrl}/admin/getCompanies`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        const jsonData = await result.json();
        // console.log(jsonData)
        setIsLoading(false)
        if (!result.ok) {
          throw new Error(jsonData.message);
        }
        // toast(jsonData.message);
        setCompanies(jsonData.posts);
      } catch (error) {
        toast(error);
      }
    };
    getCompanies();

  }, [window.localStorage.getItem('companyPostedJobApprovel')]);

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

      <h2 className="text-[color:var(--blue)] font-medium text-xl lg:text-2xl lg:font-semibold xl:text-3xl mt-4 mb-8">
        Companies
      </h2>


      {
        isLoading ? <div className="flex justify-center items-center h-[60vh]">
          <Loader />
        </div>
          :

          <div className="py-6 flex flex-col gap-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mt-3">
              {companies.filter((value) => {



                return query.toLowerCase() === '' ? value : value.companyName.toLowerCase().includes(query) ||
                  query.toLowerCase() === '' ? value : value._id.toLowerCase().includes(query) ||

                value?.CustomId?.toString().includes(query);


              })
                .map((value) => (
                  <div key={value?._id}>
                    <div className="border-2 shadow-sm hover:shadow-md rounded-lg overflow-hidden h-max p-3">
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                        <img
                          src={`${baseUrl}/users/getImage/${(value?.companyLogo)?.filename}`}
                          alt=""
                          className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 object-cover"
                        />
                        <h3 className="font-semibold text-xl lg:text-2xl my-3">
                          {value?.companyName}
                        </h3>
                      </div>

                      <div className="flex justify-between flex-wrap gap-2 items-center mt-10 lg:mt-14 font-medium">
                        <p className="text-sm">
                          Id:{" "}
                          <span className="text-[color:var(--blue)]">
                            {value?.CustomId}
                          </span>
                        </p>

                        <Link to={`/admin/companypostedjobs/${value._id}`} state={value}>
                          <button className="px-3 py-1.5 bg-[color:var(--blue)] text-white rounded-md font-medium text-sm cursor-pointer">
                            View jobs
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
      }
    </div>
  );
};
// import React, { useState, useEffect, useReducer } from "react";
// import {
//   AiOutlineEye,
//   AiOutlineFileDone,
//   AiOutlineSearch,
// } from "react-icons/ai";
// import { FcApprove, FcDisapprove } from "react-icons/fc";
// import { useParams } from "react-router-dom";
// import CompanyPostedJobRejectModal from "../../modal/CompanyPostedJobRejectModal";
// import JobDetailsModal from "../../modal/JobDetailsModal";
// import ProfileCard from "../ProfileCard";
// import { ToastContainer, toast } from "react-toastify";

// const ApplicationsCompanyPostedJobs = () => {
//   const [viewModelOpened, setViewModelOpened] = useState(false);
//   const [rejectJobRemarkModel, setRejectJobRemarkModel] = useState(false);

//   const { id } = useParams();

//   const [companyData, setCompany] = useState([]);
//   const [jobsCompanyDetails, setJobsCompanyDetails] = useState("");
//   const [updateApi, forceUpdate] = useReducer((x) => x + 1, 0);

//   useEffect(() => {
//     fetch(`/company/companyJobData/${id}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setCompany(data);
//         // console.log(data);
//       });
//   }, [updateApi]);

//   useEffect(() => {
//     fetch(`/company/companyData/${id}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setJobsCompanyDetails(data);
//       });
//   }, [updateApi]);

//   let hndleAccept = (e, status, id) => {
//     if (status === "company_addJobs_fress") {
//       const statusDb = "Admin-Approve";

//       //   console.log(addFor);
//       const s = { statusDb };
//       // console.log(s);
//       fetch(`/company/AdminStatusChange/${id}`, {
//         method: "PUT",
//         headers: { "content-type": "application/json" },
//         body: JSON.stringify(s),
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           // alert("Approved.....");
//           toast("Approved!");
//           forceUpdate();
//           // console.log(data);
//         });
//     }
//   };

//   // let hndleReject = (e, status, id) => {
//   //   if (status === "company_addJobs_fress") {
//   //     const statusDb = "Admin-Rejected";

//   //     //   console.log(addFor);
//   //     const s = { statusDb };
//   //     // console.log(s);
//   //     fetch(`/company/AdminStatusChange/${id}`, {
//   //       method: "PUT",
//   //       headers: { "content-type": "application/json" },
//   //       body: JSON.stringify(s),
//   //     })
//   //       .then((res) => res.json())
//   //       .then((data) => {
//   //         // alert("This is rejected by you");
//   //         toast("This is rejected by you!");
//   //         forceUpdate();
//   //       });
//   //   } else {
//   //     // alert("You already selected");
//   //     toast("You already rejected this!");
//   //   }
//   // };
//   const [vId, setID] = useState()
//   let a = (id) => {
//     setID(id)
//   }
//   const [v, setv] = useState()
//   let bl = (id) => {
//     setv(id)
//   }

//   return (
//     <div>
//       <div className="flex flex-col lg:flex-row justify-between gap-5 flex-wrap pb-4 border-b-2 border-black group">
//         <div className="border-2 flex items-center gap-5 px-5 py-3 rounded-md w-full lg:w-96 group-focus-within:ring-2 group-focus-within:shadow-lg">
//           <AiOutlineSearch className="text-3xl" />
//           <input
//             type="text"
//             placeholder="Search"
//             className="w-full outline-none text-lg"
//           />
//         </div>

//         <div>
//           <ProfileCard />
//         </div>
//       </div>

//       <div className="my-5">
//         <div className="flex flex-col sm:flex-row sm:justify-start gap-5">
//           <img
//             src="https://s3.amazonaws.com/cdn.designcrowd.com/blog/2017/April/35-Famous-Circle-Logos/19_400.png"
//             alt=""
//             className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 object-cover"
//           />
//           <h3 className="font-semibold text-xl lg:text-2xl my-3">
//             {jobsCompanyDetails?.companyName}
//           </h3>
//         </div>
//       </div>

//       <div className="flex flex-wrap justify-start">
//         <h2 className="text-[color:var(--blue)] font-medium text-xl lg:text-2xl lg:font-semibold xl:text-3xl mt-4 mb-8">
//           Jobs Posted by {jobsCompanyDetails?.companyName}
//         </h2>
//       </div>

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
//                       Job Title
//                     </th>
//                     <th
//                       scope="col"
//                       className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
//                     >
//                       Job Type
//                     </th>
//                     <th
//                       scope="col"
//                       className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
//                     >
//                       JD
//                     </th>
//                     <th
//                       scope="col"
//                       className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
//                     >
//                       View
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
//                   {companyData.map((value) => (
//                     <tr className="border-b" key={value._id}>
//                       <td className="px-6 py-4 whitespace-pre-wrap text-sm font-medium text-gray-900">
//                         {value?._id}
//                       </td>
//                       <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">
//                         {value?.jobTitle}
//                       </td>
//                       <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">
//                         {value?.jobType}
//                       </td>
//                       <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">
//                         <AiOutlineFileDone className="text-[color:var(--blue)] text-xl" />
//                       </td>
//                       <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">
//                         <button
//                           className="flex gap-2 items-center font-bold bg-yellow-600 text-white p-2 rounded-lg cursor-pointer"
//                           onClick={() => { setViewModelOpened(true); bl(value) }}
//                         >
//                           <JobDetailsModal
//                             modelOpened={viewModelOpened}
//                             setModelOpened={setViewModelOpened}
//                             data={v ? v : value}
//                           // send the data here
//                           />
//                           View <AiOutlineEye />
//                         </button>
//                       </td>
//                       <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap flex gap-5">
//                         <button
//                           onClick={(e) => {
//                             hndleAccept(e, value.status, value._id);
//                           }}
//                           className="flex gap-2 items-center font-bold bg-green-500 text-white p-2 rounded-lg cursor-pointer"
//                         >
//                           Approve <FcApprove />
//                         </button>
//                         <button
//                           // onClick={(e) => {
//                           //   hndleReject(e, value.status, value._id);
//                           // }}
//                           onClick={() => { setRejectJobRemarkModel(true); a(value._id) }}
//                           className="flex gap-2 items-center font-bold bg-red-500 text-white p-2 rounded-lg cursor-pointer"
//                         >
//                           <CompanyPostedJobRejectModal
//                             modelOpened={rejectJobRemarkModel}
//                             setModelOpened={setRejectJobRemarkModel}
//                             data={vId ? vId : value}
//                           // send the data here
//                           />
//                           Reject <FcDisapprove />
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
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

export default ApplicationsCompanyPostedJobs;

// // export default ApplicationsCompanyPostedJobs;
