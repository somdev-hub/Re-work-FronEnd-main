import React, { Component, useEffect, useState } from "react";
import { AiOutlineSearch, AiOutlineEye } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { Switch } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import AdminPanelRecruiterView from "../modal/AdminPanelRecruiterView";
import StatusChangeModal from "../modal/StatusChangeModal";
import { useSelector } from "react-redux";
import ProfileCard from "./ProfileCard";
import { baseUrl } from "../../baseUrl";
import { useReducer } from "react";
import StatusChangeModalLogin from "../modal/StatusChangeModalLogin";
import Loader from "../../hook/Loader";

const AdminPanelRecruiters = () => {
  const [userArray, setUserArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true)


  const statusChangePageRerender = useSelector(
    (state) => state.counter.statusChangePageRerender
  );

  const [reducevalue, forceupdate] = useReducer((x) => x + 1, 0);

  const [query, setQuery] = useState("");

  // let hndlSearch = (e) => {
  //   let qureyd = query
  //   fetch(`${baseUrl}/recruiter/searchrecruiter/${qureyd}`).then((res) => {
  //     //first check the status code
  //     if (res.status === 200) {
  //       //then extract the json data
  //       res.json().then((data) => {
  //         setUserArray(data);
  //         forceupdate()
  //         console.log(data);
  //       });
  //     }
  //   });

  // }

  // useEffect(() => {
  //   hndlSearch()
  // }, [query])

  const loadDataFromBackend = () => {
    fetch(`${baseUrl}/users/getRecruiters`).then((res) => {
      //first check the status code
      if (res.status === 200) {
        //then extract the json data
        res.json().then((data) => {

          setIsLoading(false)

          setUserArray(data);

          // console.log(data);
        });
      }
    });
  };
  useEffect(() => {
    loadDataFromBackend();
  }, [statusChangePageRerender, reducevalue]);

  // console.log(statusdata);

  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-between gap-5 flex-wrap pb-4 border-b-2 border-black">
        <div className="border-2 flex items-center gap-5 px-5 py-3 rounded-md w-full lg:w-96">
          <AiOutlineSearch className="text-3xl" />
          <input
            // onClick={(e) => { hndlSearch(e) }}
            type="search"
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
        Recruiters
      </h2>

      {
        isLoading ? <div className="flex justify-center items-center h-[60vh]">
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
                          Name
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
                          Mobile Number
                        </th>
                        {/* <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Joined Date
                    </th> */}
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Status
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
                      {userArray
                        .filter(
                          (user) => {
                            return (user.fullName.toLowerCase().includes(query.toLowerCase()) ||
                              user.email.toLowerCase().includes(query.toLowerCase()) ||
                              user._id.toString().includes(query) ||
                              user?.CustomId?.toString().includes(query)
                            )
                          }
                        )
                        .map((data) => (
                          <MyFunction data={data} />
                        ))}
                    </tbody>
                    {/* ))}
                </tbody> */}
                  </table>
                </div>
              </div>
            </div>
          </div>
      }

    </div>
  );
};

export default AdminPanelRecruiters;

const MyFunction = ({ data }) => {
  const [modelOpened, setModelOpened] = useState(false);
  const [statusChangeModal, setStatusChangeModal] = useState(false);

  const [sharedata, setShareData] = useState();
  let a = (data) => {
    setShareData(data);
  };

  const [statusdata, setstatus] = useState();
  let statusChange = (data) => {
    setstatus(data);
  };

  return (
    <tr className="border-b" key={data._id}>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {data?.CustomId}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">
        {data?.fullName}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">
        {data?.email}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {data?.phoneNumber}
      </td>
      {/* <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">
                          {new Date(data?.createdAt).toDateString()}
                        </td> */}
      <td
        className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
        onClick={(e) => {
          statusChange(data);
        }}
      >
        <StatusChangeModalLogin
          modelOpened={statusChangeModal}
          setModelOpened={setStatusChangeModal}
          data={statusdata ? statusdata : data}
        //send data here.....for yes and no
        />


        <div onClick={() => setStatusChangeModal(true)}>
          <Switch
            color="green"
            checked={data?.status === "Allow" ? true : false}
            value={data._id}
          />
        </div>

      </td>

      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap flex gap-5">
        <button
          className="flex gap-2 items-center font-bold bg-[color:var(--blue)] text-white p-2 rounded-lg cursor-pointer"
          onClick={(e) => {
            a(data);
            setModelOpened(true);
          }}
        >
          View <AiOutlineEye />
        </button>
        <AdminPanelRecruiterView
          modelOpened={modelOpened}
          setModelOpened={setModelOpened}
          data={sharedata ? sharedata : data}
        // send the data here
        />
        <Link to="/admin/recruiters/edit" state={data}>
          <button className="flex gap-2 items-center font-bold bg-[color:var(--orange)] text-white p-2 rounded-lg cursor-pointer">
            Edit <FaEdit />
          </button>
        </Link>
      </td>
    </tr>
  );
};
