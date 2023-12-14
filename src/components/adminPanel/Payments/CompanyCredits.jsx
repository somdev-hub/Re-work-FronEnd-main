import { Switch } from '@mantine/core';
import React from 'react';
import { useReducer } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { AiOutlineCloseCircle, AiOutlineEye, AiOutlineSearch } from 'react-icons/ai';
import { FaEdit } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../../baseUrl';
import ProfileCard from '../ProfileCard';
import CompanyCreditsEditModal from '../../modal/CompanyCreditsEditModal';
import Loader from '../../../hook/Loader';
import moment from 'moment/moment';
const CompanyCredits = () => {


    const statusChangePageRerender = useSelector(
        (state) => state.counter.statusChangePageRerender
    );

    const [userArray, setUserArray] = useState([]);
    const [reducevalue, forceupdate] = useReducer((x) => x + 1, 0);
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true)



    // let hndlSearch = (e) => {
    //   let qureyd = query
    //   fetch(`${baseUrl}/company/searchcompany/${qureyd}`).then((res) => {
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
    let token = localStorage.getItem("token");
    const loadDataFromBackend = () => {
        fetch(`${baseUrl}/company/companyCompleteData`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((res) => {
            //first check the status code
            if (res.status === 200) {
                //then extract the json data
                res.json().then((data) => {
                    console.log(data);
                    setIsLoading(false)
                    setUserArray(data);
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
            <div className="flex flex-col lg:flex-row justify-between gap-5 flex-wrap pb-4 border-b-2 border-black group">
                <div className="border-2 flex items-center gap-5 px-5 py-3 rounded-md w-full lg:w-96 group-focus-within:ring-2 group-focus-within:shadow-lg">
                    <AiOutlineSearch className="text-3xl" />
                    <input
                        // onClick={(e) => { hndlSearch(e) }}
                        type="search"
                        placeholder="Search"
                        className="w-full outline-none text-lg"
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>

                <ProfileCard />
            </div>

            <h2 className="text-[color:var(--blue)] font-medium text-xl lg:text-2xl lg:font-semibold xl:text-3xl mt-4 mb-8">
                <Link to="/admin" className='hover:underline'>Home</Link> / Company
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
                                                    Company
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                                >
                                                    Current Pack
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                                >
                                                    Current Packes Credits
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                                >
                                                    Payment
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                                >
                                                    Total credits
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                                >
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        {userArray && (
                                            <tbody>
                                                {userArray
                                                    .filter(
                                                        (user) =>
                                                            user?.companyName?.toLowerCase().includes(query) ||



                                                            user?._id?.toString().includes(query) ||
                                                            user?.CustomId?.toString().includes(query)
                                                    )
                                                    .map((data) => (
                                                        <MyFunction data={data} forceupdate={forceupdate} />
                                                    ))
                                                }
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

export default CompanyCredits;

const MyFunction = ({ data, forceupdate }) => {
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
        <tr key={data._id} className="border-b">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">

                {data.CustomId}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">

                {data.companyName}
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">

                {data?.creditId[data?.creditId.length - 1]?.planName}

            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">

                {data?.creditId[data?.creditId.length - 1]?.credites}
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">

                {data?.creditId[data?.creditId.length - 1]?.newPrice}/-
            </td>
            <td className="text-sm text-red-500 font-light px-6 py-4 whitespace-pre-wrap">

                {data.totalcredites}
            </td>

            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap flex items-center gap-2">
                <button
                    className="flex gap-2 items-center font-bold bg-[color:var(--orange)] text-white p-2 rounded-lg cursor-pointer"
                    onClick={(e) => {
                        a(data);
                        setModelOpened(true);
                    }}
                >
                    Edit <FaEdit />
                </button>
                <CompanyCreditsEditModal
                    modelOpened={modelOpened}
                    setModelOpened={setModelOpened}
                    data={data}
                    forceupdate={forceupdate}
                // send the data here
                />
            </td>
        </tr>
    );
};