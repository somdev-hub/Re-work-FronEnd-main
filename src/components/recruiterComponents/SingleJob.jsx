import React, { useState } from "react";
import { BsClock, BsDownload } from "react-icons/bs";
import { FaBusinessTime } from "react-icons/fa";
import { BiCalendarEdit, BiMicrophone } from "react-icons/bi";
import { MdOutlinePeopleAlt, MdOutlineLocationOn } from "react-icons/md";
import { AiOutlineCalendar, AiOutlineLike } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";
import JobDetailsModal from "../modal/JobDetailsModal";
import { useEffect } from "react";
import { useCallback } from "react";
import { useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import { counterActions } from "../../store/index-redux";
import { baseUrl } from "../../baseUrl";
import moment from "moment";
import { ThreeDots } from "react-loader-spinner";


const SingleJob = ({ openPosition }) => {
  const [modelOpened, setModelOpened] = useState(false);
  const [numOfClaims, setNumOfClaims] = useState(0);
  const [skills, setSkills] = useState("");
  const [logo, setlogo] = useState();
  const dispatch = useDispatch();
  const [updateApi, forceUpdate] = useReducer((x) => x + 1, 0);
  const [loaderBtn, setLoaderBtn] = useState(false);


  useEffect(() => {
    if (openPosition.companyId) {
      if (openPosition.companyId.companyLogo) {
        let url = `${baseUrl}/users/getImage/${openPosition.companyId.companyLogo.filename}`;
        setlogo(url);
      }
    }
  }, []);

  //console.log(openPosition.skills);
  const claimPositionHandler = async () => {
    let status = "open_position_Cliam";
    let statusChange = { status };
    setLoaderBtn(true)
    try {
      let token = localStorage.getItem('token');
      const result = await fetch(
        `${baseUrl}/recruiter/claimPosition/${openPosition._id}/${localStorage.userId}`,
        {
          method: "put",
          headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${token}`
          },
          body: JSON.stringify(statusChange),
        }
      );
      const jsonData = await result.json();
      if (!result.ok) {
        throw new Error(jsonData.message);
      }
      forceUpdate();
      dispatch(counterActions.onClaimJobRerenderPage());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (openPosition) {
      setSkills(openPosition.skills);
    }

    setNumOfClaims(openPosition.recruiterIdClaimed.length);

    // if (!openPosition.recruiterIdclaimed) {
    // }
  }, [updateApi]);

  let [openPositionA, setopenPosition] = useState();
  let a = (openPosition) => {
    setopenPosition(openPosition);
  };

  return (
    <>
      {openPosition && (
        <div className="border-2 border-gray-400 rounded-md my-6 p-3 sm:p-5 md:p-8 hover:shadow-md">
          <div className="flex flex-col gap-7">
            <div className="flex flex-col gap-3 sm:flex-row justify-between">
              <div className="flex items-center gap-5">
                <img
                  src={logo}
                  alt=""
                  className="w-10 h-10 md:w-14 md:h-14 object-cover"
                />

                <div className="flex flex-col gap-1">
                  {/* <h4 className="font-medium text-2xl">{openPosition.role}</h4> */}
                  <h4 className="font-medium text-2xl">
                    {openPosition.jobTitle}
                  </h4>

                  <p className="flex flex-wrap items-center gap-3">
                    <BsClock color="var(--blue" />
                    {moment(openPosition.createdAt).fromNow()} | ID:{" "}
                    <span className="text-[color:var(--blue)]">
                      {openPosition.CustomId}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex flex-col">
                <h4 className="text-[color:var(--blue)] sm:text-end text-3xl font-semibold">
                  {openPosition.rewardType === "Money"
                    ? `₹${openPosition.earnPerClosure}`
                    : `${openPosition.earnPerClosure}%`}
                </h4>
                <p>Earn per Closure</p>
              </div>
            </div>

            <div>
              <h5 className="font-medium text-lg">Mandatory Skills:</h5>

              {skills && (
                <div className="flex flex-wrap gap-5 py-3">
                  {skills.map((value) => {
                    return (
                      <div
                        key={value}
                        className="border border-gray-400 rounded-md px-4 py-1.5"
                      >
                        {value}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div>
              <div className="bg-[#0052ff] bg-opacity-60 rounded-md text-white">
                <div className="flex flex-col md:flex-row justify-evenly p-5">
                  <div className="border-r-2 p-4">
                    <p className="font-semibold text-xl">
                      {openPosition.experience}
                    </p>
                    <div className="flex items-center gap-2">
                      <FaBusinessTime />
                      <p>Experience</p>
                    </div>
                  </div>
                  <div className="border-r-2 p-4">
                    <p className="font-semibold text-xl">
                      {openPosition.package}{openPosition.format}

                    </p>
                    <div className="flex items-center gap-2">
                      <BiCalendarEdit />
                      <p>Package ( {openPosition.Currency})</p>
                    </div>
                  </div>
                  <div className="border-r-2 p-4">
                    <p className="font-semibold text-xl">
                      {openPosition.jobTitle}
                    </p>
                    <div className="flex items-center gap-2">
                      <MdOutlinePeopleAlt />
                      <p>Role</p>
                    </div>
                  </div>
                  <div className="border-r-2 p-4">
                    <p className="font-semibold text-xl">
                      {openPosition.noticePeriod}
                    </p>
                    <div className="flex items-center gap-2">
                      <AiOutlineCalendar />
                      <p>Notice Period</p>
                    </div>
                  </div>
                  <div className="border-r-2 p-4">
                    <p className="font-semibold text-xl">
                      {openPosition.location}
                    </p>
                    <div className="flex items-center gap-2">
                      <MdOutlineLocationOn />
                      <p>Location</p>
                    </div>
                  </div>
                  <div className="border-r-2 md:border-none p-4">
                    <p className="font-semibold text-xl">
                      {openPosition.communication}
                    </p>
                    <div className="flex items-center gap-2">
                      <BiMicrophone />
                      <p>Communication</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 py-2">
                <AiOutlineLike className="text-xl" />
                <p>
                  Claimed by Recruiters:{" "}
                  <span className="text-[color:var(--blue)] font-semibold">
                    {numOfClaims < 10 ? `0${numOfClaims}` : numOfClaims}
                  </span>
                </p>
              </div>
            </div>

            <div>
              <div className="flex flex-wrap justify-between gap-4">
                <div className="flex gap-5">
                  {
                    loaderBtn ? <div className="flex justify-end">
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
                      :

                      <button
                        className="px-5 py-2 bg-[color:var(--blue)] text-white rounded-md font-medium text-lg"
                        onClick={claimPositionHandler}
                      >
                        Claim Job
                      </button>
                  }

                  <button
                    className="flex items-center gap-2 border-2 border-gray-500 py-2 px-4 rounded-md font-medium text-lg"
                    onClick={() => {
                      setModelOpened(true);
                      a(openPosition);
                    }}
                  >
                    View Details
                    <FiChevronDown />
                  </button>
                  {openPosition && (
                    <JobDetailsModal
                      modelOpened={modelOpened}
                      setModelOpened={setModelOpened}
                      data={openPositionA ? openPositionA : openPosition}
                    // send the job data here and then fetch in JobDetailsModal
                    />
                  )}
                </div>
                <a
                  className="flex items-center gap-2 bg-[color:var(--blue)] text-white px-5 py-2 rounded-md font-medium text-lg"
                  type="button"
                  href={`${baseUrl}/users/getImage/${openPosition?.jobDetailsFile?.filename}`}
                  download={openPosition?.jobDetailsFile?.filename}
                  target="_blank" rel="noreferrer"
                >
                  <BsDownload />
                  Download JD
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleJob;
