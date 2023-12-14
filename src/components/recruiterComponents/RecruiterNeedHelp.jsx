import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { FaTelegramPlane } from "react-icons/fa";
import FLowerPotImg from "../../assets/flowerPotImg.png";
import NeedHelpImg from "../../assets/needHelpImg.png";
import { BiArrowBack } from "react-icons/bi";
import { baseUrl } from "../../baseUrl";
import Loader from "../../hook/Loader";
import { ThreeDots } from "react-loader-spinner";

const RecruiterNeedHelp = () => {
  const nav = useNavigate();
  const [email, setemail] = useState("");
  const [recruiterId, setrecruiterId] = useState("");
  const [recruiterName, setrecruiterName] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true)
  const [loaderBtn, setLoaderBtn] = useState(false);



  useEffect(() => {
    fetch(
      `${baseUrl}/users/getUserById/${localStorage.getItem(
        "userId"
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.posts);
        setIsLoading(false)
        setrecruiterId(data.posts.CustomId);
        setemail(data.posts.email);
        setrecruiterName(data.posts.fullName);
      });
  }, []);


  let hndlSubmit = (e) => {
    e.preventDefault();


    const data = { email, recruiterId, message, recruiterName };
    let token = localStorage.getItem('token')
    setLoaderBtn(true)
    fetch(`${baseUrl}/recruiter/needHelpRecruiter`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        toast("submitted");

        setTimeout(() => {
          nav("/recruiter");
        }, 2000);
        setLoaderBtn(false)
      });
  };

  return (
    <div>
      <div className="m-5 sm:p-10 md:px-20 lg:px-40">
        <Link to="/recruiter">
          <p className="flex items-center gap-2  ">
            <BiArrowBack className="text-[color:var(--blue)]" />
            Go back
          </p>
        </Link>
        <strong className="text-[color:var(--blue)] text-xl lg:text-2xl xl:text-3xl flex justify-center items-center gap-4 mb-5">
          Need Some help?{" "}
          <FaTelegramPlane className="text-xl lg:text-2xl xl:text-4xl" />
        </strong>

        {
          isLoading ? <div className="flex justify-center items-center h-[70vh]">
            <Loader />
          </div>
            :

            <div className="border-2 border-gray-500 rounded-3xl p-10 lg:px-40 relative">
              <form onSubmit={hndlSubmit}>
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col sm:flex-row gap-5 lg:gap-10">
                    <div className="flex-1 flex flex-col">
                      <label htmlFor="ID" className="font-medium">
                        ID
                      </label>
                      <input
                        value={recruiterId}
                        readOnly
                        type="text"
                        id="ID"
                        placeholder="47832574"
                        className="border border-gray-300 outline-none focus:ring-1 px-3 py-2 rounded-md"
                      />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <label htmlFor="email" className="font-medium">
                        Email
                      </label>
                      <input
                        value={email}
                        readOnly
                        type="email"
                        id="email"
                        placeholder="name@gmail.com"
                        className="border border-gray-300 outline-none focus:ring-1 px-3 py-2 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col z-10">
                    <label htmlFor="help" className="font-medium">
                      Tell us what you need help with:
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                      }}
                      id="help"
                      placeholder="Type your query"
                      rows={10}
                      className="border border-gray-300 outline-none px-3 py-2 focus:ring-1 rounded-md"
                      required
                    >
                      {message}
                    </textarea>
                  </div>
                  <div className="flex justify-end">

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

                        <button className="bg-[color:var(--blue)] hover:bg-blue-700 text-white w-max px-5 py-2 text-lg rounded-md font-semibold">
                          Get Help
                        </button>
                    }
                  </div>
                </div>
              </form>
              <img
                src={FLowerPotImg}
                alt=""
                className="hidden md:inline absolute bottom-0 right-0 max-h-52"
              />
              <img
                src={NeedHelpImg}
                alt=""
                className="hidden md:inline absolute bottom-0 -left-28 max-h-96"
              />
            </div>
        }

      </div>
      <ToastContainer />
    </div>
  );
};

export default RecruiterNeedHelp;
