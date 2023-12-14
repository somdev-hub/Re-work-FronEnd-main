import { Switch } from '@mantine/core';
import moment from 'moment/moment';
import React, { useEffect, useReducer } from 'react';
import { useState } from 'react';
import { AiOutlineCloseCircle, AiOutlineEye, AiOutlineSearch } from 'react-icons/ai';
import { BiPlus } from 'react-icons/bi';
import { FaEdit } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../../baseUrl';
import Loader from '../../../hook/Loader';
import AdminPanelCompanyView from '../../modal/AdminPanelCompanyView';
import AdminPaymentEditModal from '../../modal/AdminPaymentEditModal';
import StatusChangeModal from '../../modal/StatusChangeModal';
import ProfileCard from '../ProfileCard';


const AdminPayments = () => {

    const statusChangePageRerender = useSelector(
        (state) => state.counter.statusChangePageRerender
    );

    const [userArray, setUserArray] = useState([]);
    const [reducevalue, forceupdate] = useReducer((x) => x + 1, 0);
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true)




    const loadDataFromBackend = () => {
        let token = localStorage.getItem('token')
        fetch(`${baseUrl}/payment/creditesGet`, {
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
                        placeholder="Search By Pack Name"
                        className="w-full outline-none text-lg"
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>

                <ProfileCard />
            </div>
            <h2 className="text-[color:var(--blue)] font-medium text-xl lg:text-2xl lg:font-semibold xl:text-3xl mt-4 mb-8">
                <Link to="/admin" className='hover:underline'>Home</Link> / Payments
            </h2>

            <Link to="add-packs" className='flex justify-end py-5'>
                <button className="flex gap-2 items-center font-bold bg-[color:var(--blue)] text-white p-2 rounded-lg cursor-pointer"> Add Packs <BiPlus /> </button>
            </Link>

            {
                isLoading ? <div className="flex justify-center items-center h-[54vh]">
                    <Loader />
                </div>
                    :

                    <div className="flex flex-col">
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="overflow-hidden">
                                    <table className="min-w-full ">
                                        <thead className="border-b ">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                                >
                                                    Pack Name
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                                >
                                                    Credits
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                                >
                                                    Initial Price
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                                >
                                                    Discount
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                                >
                                                    Date
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
                                            </tr>
                                        </thead>
                                        {userArray && (
                                            <tbody>
                                                {userArray.filter(
                                                    (user) =>
                                                        user?.planName.toLowerCase().includes(query)
                                                )

                                                    .map((data) => (
                                                        <MyFunction data={data} />
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

export default AdminPayments;

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
        <tr key={data._id} className="border-b">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {data.planName}

            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">
                {data.credites}
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {data.previousPrice}
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">
                {data.discount}%
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">
                {moment(data.createdAt).format("DD-MM-YY")}

            </td>

            <td
                className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                onClick={(e) => {
                    statusChange(data,);
                }}
            >
                <StatusChangeModal
                    modelOpened={statusChangeModal}
                    setModelOpened={setStatusChangeModal}
                    data={statusdata}
                //send data here.....for yes and no
                />
                <div onClick={() => setStatusChangeModal(true)}>
                    <Switch
                        color="green"
                        checked={data.status}
                    />
                </div>
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
                <AdminPaymentEditModal
                    modelOpened={modelOpened}
                    setModelOpened={setModelOpened}

                    data={data}
                // send the data here
                />

            </td>
        </tr>
    );
};
