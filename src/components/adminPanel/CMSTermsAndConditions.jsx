import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsChevronDown, BsFilterLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
import JoditEditor from "jodit-react";
import { useRef } from "react";
import { useCallback, useEffect } from "react";
import ProfileCard from "./ProfileCard";
import { baseUrl } from "../../baseUrl";
import Loader from "../../hook/Loader";

const CMSTermsAndConditions = () => {
  const editor = useRef(null);
  const [content, setContent] = useState();
  const [isLoading, setIsLoading] = useState(true)


  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
  };

  const getTermsandConditions = async () => {
    try {
      const result = await fetch(`${baseUrl}/users/getTermsAndConditions`);
      const jsonData = await result.json();
      setIsLoading(false)

      if (!result.ok) {
        throw new Error(jsonData.message);
      }
      setContent(jsonData.posts.termsAndConditions);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTermsandConditions();
  }, []);

  let token = localStorage.getItem("token");
  const postTermsAndConditions = async (data) => {
    try {
      const result = await fetch(`${baseUrl}/admin/updateTermsAndConditions`, {
        method: "put",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer${token}`
        },
      });
      alert("submitted.");
      const jsonData = await result.json();
      if (!result.ok) {
        throw new Error(jsonData.message);
      }
      // console.log(jsonData.message);
    } catch (error) {
      console.log(error);
    }
  };

  const formHandler = (e) => {
    e.preventDefault();

    const data = {
      termsAndConditions: content,
    };
    //console.log('clicked',data);
    postTermsAndConditions(data);
  };

  return (
    <div>
      <div className="flex justify-between gap-5 flex-wrap pb-4 border-b-2 border-black group">
        <div className="border-2 flex items-center gap-5 px-5 py-3 rounded-md w-full lg:w-96 group-focus-within:ring-2 group-focus-within:shadow-lg">
          <AiOutlineSearch className="text-3xl" />
          <input
            type="text"
            placeholder="Search"
            className="w-full outline-none text-lg"
          />
          <BsFilterLeft className="text-3xl" />
        </div>

        {/* <div className="flex items-center gap-5">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSrdB8rRgA1qgkw0ckcTrhIa0kpV2ILvbMWg&usqp=CAU"
            alt=""
            className="rounded-full w-14 h-14 border-4 border-white"
          />

          <div className="flex flex-col">
            <h2 className="font-bold">Joseph N</h2>
            <h3 className="flex items-center gap-3">
              Super Admin <BsChevronDown />
            </h3>
          </div>
        </div> */}

        <div>
          <ProfileCard />
        </div>
      </div>

      <div className="flex gap-3 justify-between items-center">
        <h2 className="font-medium text-xl lg:text-2xl lg:font-semibold xl:text-3xl mt-4 mb-8">
          Content Management System
        </h2>

        <Link to="/termsandconditions">
          <button className="border px-3 py-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-sm">
            Go to Page
          </button>
        </Link>
      </div>
      {
        isLoading ? <div className="flex justify-center items-center h-[60vh]">
          <Loader />
        </div>
          :

          <div className="border-2 rounded-lg shadow-md">
            <div className="flex justify-between p-5 border-b-2">
              <h6 className="font-semibold text-xl">Terms and Conditions</h6>
              <button className="border px-3 py-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-[color:var(--blue)] text-sm">
                Print
              </button>
            </div>

            <div className="p-5 flex flex-col gap-5">
              <h6 className="font-medium">Page Description</h6>

              <div>
                <JoditEditor
                  ref={editor}
                  value={content}
                  //config={config}
                  // tabIndex={1} // tabIndex of textarea
                  //onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                  onChange={(newContent) => setContent(newContent)}
                />
              </div>

              <div className="flex justify-end">
                <button
                  className="bg-[color:var(--blue)] text-white rounded-lg font-medium px-3 py-2"
                  onClick={formHandler}
                >
                  Update Page
                </button>
              </div>
            </div>
          </div>
      }

    </div>
  );
};

export default CMSTermsAndConditions;
