import React from "react";
import { useReducer } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AiOutlineEye, AiOutlineSearch } from "react-icons/ai";
import ProfileCard from "../ProfileCard";
import { Option, Select } from "@material-tailwind/react";
import PitchingQuestionModal from "../../modal/PitchingQuestionModal";
import { set } from "firebase/database";
import { baseUrl } from "../../../baseUrl";
import Loader from "../../../hook/Loader";



const CompanyPitches = () => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true)

  const [pitchArr, setData] = useState([])
  const [reducer, focusUpdate] = useReducer(x => x + 1, 0)
  useEffect(() => {
    fetch(`${baseUrl}/admin/featureCompany`).then(res => res.json()).then((data) => {
      setData(data)
      setIsLoading(false)
      console.log(pitchArr);
    })



  }, [reducer])


  let DataFilter = (v) => {
    setQuery(v)
  }




  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-between gap-5 flex-wrap pb-4 border-b-2 border-black">
        <div className="border-2 flex items-center gap-5 px-5 py-3 rounded-md w-full lg:w-96 ">
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
          Company Pitches
        </h2>
        <div>
          <Select label="Filter" onChange={DataFilter}  >
            <Option value="Read">Read</Option>
            <Option value="Unread">Unread</Option>
            <Option value="">All</Option>
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
                          Company Id
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
                          Email
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
                          Pitch
                        </th>
                        <br />
                      </tr>
                    </thead>

                    <tbody>
                      {pitchArr
                        .filter((value) => {
                          return (
                            query.toLowerCase() === "" ? value : value?.ApplicationFrom?.companyName.toLowerCase().includes(query) ||
                              query.toLowerCase() === "" ? value : value?.ApplicationFrom?.email.toLowerCase().includes(query) ||
                                query.toLowerCase() === "" ? value : value?.status.includes(query) ||
                                  query.toLowerCase() === "" ? value : value?.ApplicationFrom?._id.toString().includes(query) ||
                            value?.ApplicationFrom?.CustomId?.toString().includes(query)
                          )
                        })
                        .map((data) => (
                          <MyFunction data={data} focusUpdate={focusUpdate} />
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

export default CompanyPitches;

const MyFunction = ({ data, focusUpdate }) => {
  const [modelOpened, setModelOpened] = useState(false);
  let a = (id) => {
    fetch(`${baseUrl}/admin/feature/${id}`, { method: "PUT" }).then(res => res.json()).then((data) => {
      focusUpdate()
    })
  }
  return (
    <tr className="border-b" key={data._id}>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {data?.ApplicationFrom?.CustomId}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">
        {data?.ApplicationFrom?.companyName}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">
        {data?.ApplicationFrom?.email}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">
        {data?.status}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap flex gap-5">
        <button
          className="flex gap-2 items-center font-bold bg-[color:var(--blue)] text-white p-2 rounded-lg cursor-pointer"
          onClick={(e) => {
            setModelOpened(true); a(data._id)
          }}
        >
          View <AiOutlineEye />
        </button>
        <PitchingQuestionModal
          modelOpened={modelOpened}
          setModelOpened={setModelOpened}
          data={data?.message}
        //sending the message here
        />
      </td>
    </tr>
  );
};
