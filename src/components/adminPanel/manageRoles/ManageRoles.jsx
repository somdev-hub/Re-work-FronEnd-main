import React, { useState } from "react";
import { AiOutlineSearch, AiOutlineDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import { Switch } from "@material-tailwind/react";
import StatusChangeModalManageRole from "../../modal/StatusChangeModalManageRole";
import ProfileCard from "../ProfileCard";
import { useEffect } from "react";
import { useReducer } from "react";
import { baseUrl } from "../../../baseUrl";
import ManageRolesDeleteUserModal from "../../modal/ManageRolesDeleteUserModal";
import { useSelector } from "react-redux";
import Loader from "../../../hook/Loader";

const ManageRoles = () => {
  const statusChangePageRerender = useSelector(
    (state) => state.counter.statusChangePageRerender
  );

  const [statusChangeModal, setStatusChangeModal] = useState(false);
  const [deleteUserModal, setDeleteUserModal] = useState(false);

  const [data, setData] = useState([]);
  const [updateData, fu] = useReducer((x) => x + 1, 0);
  const [query, setQuery] = useState("");
  const [statusdata, setstatus] = useState();
  const [isLoading, setIsLoading] = useState(true)






  // let hndlSearch = (e) => {
  //   let qureyd = query
  //   fetch(`${baseUrl}/admin/searchadminuser/${qureyd}`).then((res) => {
  //     //first check the status code
  //     if (res.status === 200) {
  //       //then extract the json data
  //       res.json().then((data) => {
  //         setData(data);
  //         forceUpdate()
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
    fetch(`${baseUrl}/admin/manageRole`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setIsLoading(false)
      });
  }, [
    statusChangePageRerender,
    statusdata,
    window.localStorage.getItem("deletedUser"),
    updateData
  ]);

  let statusChange = (data) => {
    setstatus(data);

    // const userName = window.localStorage.getItem('userName')
    // const password =  prompt('please fill the password')
    // const data = {userName,password}
    // fetch('http://localhost:5000/auth/adminlogin',{
    //   method:"POST",
    //   headers:{"content-type":"application/json"},
    //   body:JSON.stringify(data)
    // }
    // ).then((res)=>res.json())
    // .then((data)=>{

    // //   if (data.token) {
    // fetch(`${baseUrl}/admin/manageRole/${id}`, {
    //   method: "DELETE",
    // }).then((res) => res.json());
    // //     .then((data)=>{
    // forceUpdate();
    //     })
    //   } else {
    //     console.log(data);
    //     alert('wrong password')
    //   }
    // })
    //};
  };
  const [id, setId] = useState('')
  let a = (id) => {
    setId(id)
  }

  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-between gap-5 flex-wrap pb-4 border-b-2 border-black group">
        <div className="border-2 flex items-center gap-5 px-5 py-3 rounded-md w-full lg:w-96 group-focus-within:ring-2 group-focus-within:shadow-lg">
          <AiOutlineSearch className="text-3xl" />
          <input
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

      <div className="flex items-center justify-between">
        <h2 className="text-[color:var(--blue)] font-medium text-xl lg:text-2xl lg:font-semibold xl:text-3xl mt-4 mb-8">
          Manage Roles
        </h2>
        <Link to="/admin/manageroles/adduser">
          <button className="text-white bg-[color:var(--blue)] px-4 py-2 rounded-md font-semibold">
            Add Users +
          </button>
        </Link>
      </div>

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
                          className="font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          ID
                        </th>
                        <th
                          scope="col"
                          className="font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Name
                        </th>

                        <th
                          scope="col"
                          className="font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    {data && (
                      <tbody>
                        {data
                          .filter(
                            (user) =>
                              user.userName
                                .toLowerCase()
                                .includes(query.toLowerCase()) ||
                              user._id.toString().includes(query) ||
                              user?.CustomId?.toString().includes(query)
                          )
                          .map((d) => (
                            <tr className="border-b" key={d._id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {d?.CustomId}
                              </td>
                              <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-pre-wrap">
                                {d.userName}
                              </td>

                              <td
                                className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                                onClick={(e) => {
                                  statusChange(d);
                                }}
                              >
                                <StatusChangeModalManageRole
                                  modelOpened={statusChangeModal}
                                  setModelOpened={setStatusChangeModal}
                                  data={statusdata}
                                //send data here.....for yes and no
                                />
                                <div onClick={() => setStatusChangeModal(true)}>
                                  <Switch
                                    color="green"
                                    checked={d.status === "Allow" ? true : false}
                                  />
                                </div>
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap flex gap-5">
                                <Link to="/admin/manageroles/edituser" state={d}>
                                  <div className="flex gap-2 items-center font-bold bg-[color:var(--orange)] text-white p-2 rounded-lg cursor-pointer">
                                    Edit <BiEdit />
                                  </div>
                                </Link>
                                <div
                                  className="flex gap-2 items-center font-bold bg-red-500 text-white p-2 rounded-lg cursor-pointer"
                                  onClick={(e) => {
                                    setDeleteUserModal(true);
                                    a(d._id);
                                  }}
                                >
                                  Delete <AiOutlineDelete />
                                </div>
                                <ManageRolesDeleteUserModal
                                  modelOpened={deleteUserModal}
                                  setModelOpened={setDeleteUserModal}
                                  data={d}
                                  id={id}
                                  fu={fu}
                                />
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    )}
                  </table>
                </div>
              </div>
            </div>
          </div>
      }

    </div>
  );
};

export default ManageRoles;
