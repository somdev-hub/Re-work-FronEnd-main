import JoditEditor from 'jodit-react';
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { ThreeDots } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { baseUrl } from '../../../baseUrl';
import ProfileCard from '../ProfileCard';

const AdminPaymentsAddPacks = () => {
    const nav = useNavigate()
    const editor = useRef(null);
    const [content, setContent] = useState();


    const [query, setQuery] = useState("");
    const [a, setA] = useState(false);
    const [loaderBtn, setLoaderBtn] = useState(false);

    const close = () => {
        nav('/admin/payments')
    }

    const handlePackFormSubmit = async (e) => {
        e.preventDefault()
        const form = e.target;
        const planName = form.packName.value;
        const credites = form.credits.value;
        const previousPrice = form.initialPrice.value;
        const discount = form.discount.value;
        const features = content
        // console.log(pack, credits, initialPrice, discount, content);
        const data = { planName, credites, previousPrice, discount, features, }
        try {
            if (a) {
                return
            }
            setA(true)
            let token = localStorage.getItem('token')
            const result = await fetch(`${baseUrl}/payment/creditesPost`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });

            const jsonData = await result.json();
            setLoaderBtn(true)
            if (!result.ok) {
                setA(false)
                setLoaderBtn(false)
                throw new Error(jsonData.message);
            }
            setTimeout(() => {
                toast("Success fully added");
                setLoaderBtn(false)
            }, 1000);

        } catch (error) {
            toast(error);
            setLoaderBtn(false)
        }



    }


    // const getTermsandConditions = async () => {
    //     try {
    //         const result = await fetch(`${baseUrl}/users/getTermsAndConditions`);
    //         const jsonData = await result.json();

    //         if (!result.ok) {
    //             throw new Error(jsonData.message);
    //         }
    //         setContent(jsonData.posts.termsAndConditions);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // useEffect(() => {
    //     getTermsandConditions();
    // }, []);
    // const postTermsAndConditions = async (data) => {
    //     try {
    //         const result = await fetch(`${baseUrl}/admin/updateTermsAndConditions`, {
    //             method: "put",
    //             body: JSON.stringify(data),
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //         });
    //         // alert("submitted.");
    //         const jsonData = await result.json();
    //         if (!result.ok) {
    //             throw new Error(jsonData.message);
    //         }
    //         toast(jsonData.message);
    //     } catch (error) {
    //         toast(error);
    //     }
    // };

    // const formHandler = (e) => {
    //     e.preventDefault();

    //     const data = {
    //         termsAndConditions: content,
    //     };
    //     //console.log('clicked',data);
    //     postTermsAndConditions(data);
    // };

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
                <Link to="/admin" className='hover:underline'>Home</Link> / <Link to="/admin/payments" className='hover:underline'>Payments</Link> / Add Packs
            </h2>


            <form className="flex flex-col gap-4 md:mt-10" onSubmit={handlePackFormSubmit}>

                <div className="flex flex-col gap-1">
                    <label htmlFor="PackName" className="font-medium">
                        Pack Name
                    </label>
                    <input
                        type="text"
                        name='packName'
                        placeholder="Name"
                        id="PackName"
                        className="px-3 py-2 border min-w-full rounded-md outline-none focus:ring-1"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="credits" className="font-medium">
                        Credits amount
                    </label>
                    <input
                        type="text"
                        name='credits'
                        placeholder="credits"
                        id="credits"
                        className="px-3 py-2 border min-w-full rounded-md outline-none focus:ring-1"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="InitialPrice" className="font-medium">
                        Initial Price
                    </label>
                    <input
                        type="text"
                        name='initialPrice'
                        placeholder="Amount"
                        id="InitialPrice"
                        className="px-3 py-2 border min-w-full rounded-md outline-none focus:ring-1"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="Discount" className="font-medium">
                        Discount
                    </label>
                    <input
                        type="text"
                        name='discount'
                        placeholder="Discount %"
                        id="Discount"
                        className="px-3 py-2 border min-w-full rounded-md outline-none focus:ring-1"
                    />
                </div>

                <div className="flex flex-col gap-5">
                    <h6 className="font-medium">Pack Features</h6>

                    <div>
                        <JoditEditor
                            ref={editor}
                            value={content}
                            name="features"
                            //config={config}
                            // tabIndex={1} // tabIndex of textarea
                            //onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                            onChange={(newContent) => setContent(newContent)}
                        />
                    </div>

                    {/* <div className="flex justify-end">
                        <button
                            className="bg-[color:var(--blue)] text-white rounded-lg font-medium px-3 py-2"
                        onClick={formHandler}
                        >
                            Update Page
                        </button>
                    </div> */}
                </div>
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
                        <div className='flex justify-end'>
                            <div className="flex justify-center gap-5 py-5 text-white">
                                <button onClick={close}
                                    className="bg-red-500 px-4 py-2 rounded-md font-medium text-lg">
                                    Discard
                                </button>
                                <button type='submit'
                                    className="bg-[color:var(--blue)] px-4 py-2 rounded-md font-medium text-lg">
                                    Save
                                </button>
                            </div>
                        </div>
                }

            </form>



            <ToastContainer />
        </div>
    );
};

export default AdminPaymentsAddPacks;