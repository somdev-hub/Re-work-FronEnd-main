import { Option, Select } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useReducer } from "react";
import { AiOutlineEye, AiOutlineSearch } from "react-icons/ai";
import { baseUrl } from "../../../baseUrl";
import Loader from "../../../hook/Loader";
import NeedHelpQuestions from "../../modal/NeedHelpQuestions";
import ProfileCard from "../ProfileCard";

const InvestFormData = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  const [filter, setFilter] = useState("");
  const [updateData, forcedata] = useReducer((x) => x + 1, 0);
  // const statusChangePageRerender = useSelector(
  //   (state) => state.counter.statusChangePageRerender
  // );
  // console.log(message);
  const [query, setQuery] = useState("");

  // let hndlSearch = (e) => {

  //   let qureyd = query
  //   fetch(`http://localhost:5000/admin/searchInvestQurey/${qureyd}`).then((res) => {
  //     if (res.status === 200) {
  //       res.json().then((data) => {
  //         console.log(data);
  //         setData(data);

  //       });
  //     }
  //   });

  // }

  // useEffect(() => {
  //   hndlSearch()
  // }, [query])

  useEffect(() => {
    fetch(`${baseUrl}/admin/InvestQurey`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setIsLoading(false)

      });
  }, [updateData]);

  let hndlstatus = (e, id) => {
    e.preventDefault();

    let status = "Read";
    let dataS = { status };
    fetch(`${baseUrl}/admin/InvestQureyStatus/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(dataS),
    })
      .then((res) => res.json())
      .then((data) => {
        forcedata();
        // console.log(data);
        // setData(data)
      });
  };

  let Handlefilter = (v) => {
    let status = v;
    let dataS = { status };
    fetch(`${baseUrl}/admin/InvestQureyFilter`, {
      method: "POST",
      headers: { "content-type": "application/json" },
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
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div>
          <ProfileCard />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-[color:var(--blue)] font-medium text-xl lg:text-2xl lg:font-semibold mt-4 mb-8">
          Invest Form
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
                          Full Name
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
                          Status
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Action
                        </th>

                        <br />
                      </tr>
                    </thead>
                    <tbody>
                      {data
                        .filter((value) => {
                          return query.toLowerCase() === ""
                            ? value
                            : value.fullName.toLowerCase().includes(query) ||
                              query.toLowerCase() === ""
                              ? value
                              : value.email.toLowerCase().includes(query) ||
                                query.toLowerCase() === ""
                                ? value
                                : value.company.toLowerCase().includes(query) ||
                                  query.toLowerCase() === ""
                                  ? value
                                  : value.status.toLowerCase().includes(query) ||
                                    query.toLowerCase() === ""
                                    ? value
                                    : value._id.toLowerCase().includes(query) ||
                                    value.phoneNumber.toString().includes(query);
                        })
                        .map((d) => (
                          <MyFunction d={d} hndlstatus={hndlstatus} />
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

export default InvestFormData;

const MyFunction = ({ d, hndlstatus }) => {
  const [modelOpened, setModelOpened] = useState(false);

  const [message, setMessage] = useState("");
  let a = (message) => {
    setMessage(message);
  };

  return (
    <tr className="border-b" key={d._id}>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">
        {d.fullName}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">
        {d.email}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {d.phoneNumber}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {d.company}
      </td>

      {d.status === "Unread" ? (
        <td className="text-sm text-red-900 font-bolder px-6 py-4 whitespace-pre-wrap">
          <button
            className="flex gap-2 items-center font-medium text-red-500 px-3 py-2 rounded-lg cursor-pointer"
          // style={{ backgroundColor: "red" }}
          >
            {d.status}
          </button>
        </td>
      ) : (
        <td className="text-sm text-grey-900   px-6 py-4 whitespace-pre-wrap">
          <button
            className="flex gap-2 text-green-600 items-center font-medium text-grey px-3 py-2 rounded-lg cursor-pointer"
          // style={{ backgroundColor: 'transparent', border: '2px solid grey' }}
          >
            {d.status}
          </button>
        </td>
      )}

      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap flex gap-5">
        <button
          className="flex gap-2 items-center font-bold bg-[color:var(--blue)] text-white px-3 py-2 rounded-lg cursor-pointer"
          onClick={(e) => {
            setModelOpened(true);
            a(d.message);
            hndlstatus(e, d._id, d.status);
          }}
        >
          {/* <NeedHelpQuestions
                            modelOpened={modelOpened}
                            setModelOpened={setModelOpened}
                            data={message}
                          // sending the data here
                          /> */}
          View <AiOutlineEye />
        </button>
        <NeedHelpQuestions
          modelOpened={modelOpened}
          setModelOpened={setModelOpened}
          data={message ? message : d.status}
        // sending the data here
        />
      </td>
    </tr>
  );
};
