import React, { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { baseUrl } from "../../../baseUrl";
import Loader from "../../../hook/Loader";
import ProfileCard from "../ProfileCard";

const CandidateRole = () => {
  const [companies, setCompanies] = useState([]);
  const approveCandidateState = useSelector(
    (state) => state.counter.adminApproveCandidate_state
  );
  // console.log("approveCandidateState", approveCandidateState);

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

  // useEffect(() => {
  //   fetch("http://localhost:5000/company/companyData")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setCompany(data);
  //       // console.log(data);
  //     });
  // }, []);
  let token = localStorage.getItem("token");
  const getCompanies = async () => {
    try {
      const result = await fetch(`${baseUrl}/admin/getCompanies`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const jsonData = await result.json();
      setIsLoading(false)

      if (!result.ok) {
        throw new Error(jsonData.message);
      }
      setCompanies(jsonData.posts);
      // console.log(jsonData.posts);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCompanies();
  }, [
    approveCandidateState,
    window.localStorage.getItem("companyPostedJobApprovel"),
  ]);

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
        All Candidate list
      </h2>

      {
        isLoading ? <div className="flex justify-center items-center h-[60vh]">
          <Loader />
        </div>
          :

          <div className="py-6 flex flex-col gap-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mt-3">
              {companies
                .filter((value) => {
                  return query.toLowerCase() === ""
                    ? value
                    : value.companyName.toLowerCase().includes(query) ||
                      query.toLowerCase() === ""
                      ? value
                      : value._id.toLowerCase().includes(query) ||
                      value?.CustomId?.toString().includes(query);
                })
                .map((value) => (
                  <div key={value?._id}>
                    <div className="border-2 shadow-sm hover:shadow-md rounded-lg overflow-hidden h-max p-3">
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                        <img
                          src={`${baseUrl}/users/getImage/${value?.companyLogo?.filename}`}
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

                        <Link
                          to={`/admin/candidaterole/${value._id}`}
                          state={value}
                        >
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

export default CandidateRole;
