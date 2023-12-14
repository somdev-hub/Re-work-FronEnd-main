import React from "react";
import { useReducer } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AiOutlineEye, AiOutlineSearch } from "react-icons/ai";
import { BsFilterLeft } from "react-icons/bs";
import NeedHelpQuestions from "../../modal/NeedHelpQuestions";
import ProfileCard from "../ProfileCard";
import { Option, Select } from "@material-tailwind/react";
import { baseUrl } from "../../../baseUrl";
import Loader from "../../../hook/Loader";

const RecruiterQuestions = () => {
  const [data, setData] = useState([]);
  const [changess, forceData] = useReducer((x) => x + 1, 0);
  const [filter, setFilter] = useState("");
  const [query, setQuery] = useState("");
  let token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {

    fetch(`${baseUrl}/recruiter/needHelpRecruiter`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setIsLoading(false)
        // console.log(data);
      });
  }, [changess]);

  let hndlstatus = (e, id) => {
    e.preventDefault();

    let status = "Read";
    let dataS = { status };
    let token = localStorage.getItem('token');
    fetch(`${baseUrl}/recruiter/needHelpRecruiter/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(dataS),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        forceData();
      });
  };

  let Handlefilter = (v) => {
    let status = v;
    let dataS = { status };
    fetch(`${baseUrl}/recruiter/recruiterFilter`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(dataS),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setData(data);
        // forcedata();
      });
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-between gap-5 flex-wrap pb-4 border-b-2 border-black group">
        <div className="border-2 flex items-center gap-5 px-5 py-3 rounded-md w-full lg:w-96 group-focus-within:ring-2 group-focus-within:shadow-lg">
          <AiOutlineSearch className="text-3xl" />
          <input
            type="search"
            placeholder="Search"
            className="w-full outline-none text-lg"
            onChange={(e) => setQuery(e.target.value.toLowerCase())}
          />
          <BsFilterLeft className="text-3xl" />
        </div>

        <div>
          <ProfileCard />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-[color:var(--blue)] font-medium text-xl lg:text-2xl lg:font-semibold mt-4 mb-8">
          Recruiter Questions
        </h2>
        <div>
          <Select label="Filter" value={filter} onChange={Handlefilter}>
            <Option value="Read">Read</Option>
            <Option value="Unread">Unread</Option>
          </Select>
        </div>
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
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Recruiter Id
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
                          Question
                        </th>
                        <br />
                      </tr>
                    </thead>

                    <tbody>
                      {data
                        .filter((value) => {
                          return query.toLowerCase() === ""
                            ? value
                            : value.recruiterId?.CustomId.toLowerCase().includes(query) ||
                              query.toLowerCase() === ""
                              ? value
                              : value.recruiterName.toLowerCase().includes(query) ||
                                query.toLowerCase() === ""
                                ? value
                                : value.email.toLowerCase().includes(query) ||
                                  query.toLowerCase() === ""
                                  ? value
                                  : value.status.toLowerCase().includes(query) ||
                                    query.toLowerCase() === ""
                                    ? value
                                    : value.recruiterId.toString().includes(query);
                        })
                        .map((data) => (
                          <MyFunction data={data} hndlstatus={hndlstatus} />
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
      }
    </div>
  );
};

export default RecruiterQuestions;

const MyFunction = ({ data, hndlstatus }) => {
  const [modelOpened, setModelOpened] = useState(false);
  const [message, setmessage] = useState([]);
  let a = (message) => {
    setmessage(message);
  };

  return (
    <tr className="border-b" key={data._id}>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {data.status === "Unread" ? (
          <div style={{ display: "flex" }}>
            <div
              style={{
                background: "red",
                content: "",
                borderRadius: "100%",
                height: "7px",
                width: "7px",
              }}
            ></div>
            <div>{data.recruiterId}</div>
          </div>
        ) : (
          data?.recruiterId?.CustomId
        )}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">
        {data.recruiterName}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">
        {data.email}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap flex gap-5">
        <button
          className="flex gap-2 items-center font-bold bg-[color:var(--blue)] text-white p-2 rounded-lg cursor-pointer"
          onClick={(e) => {
            a(data.message);
            setModelOpened(true);
            hndlstatus(e, data._id, data.status);
          }}
        >
          View <AiOutlineEye />
        </button>
        <NeedHelpQuestions
          modelOpened={modelOpened}
          setModelOpened={setModelOpened}
          data={message ? message : data.message}
        // sending the data here
        // sending the data here
        />
      </td>
    </tr>
  );
};
