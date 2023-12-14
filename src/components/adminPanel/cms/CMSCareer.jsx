import React, { useState, useRef } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import JoditEditor from "jodit-react";
import ProfileCard from "../ProfileCard";

const CMSCareer = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-between gap-5 flex-wrap pb-4 border-b-2 border-black group">
        <div className="border-2 flex items-center gap-5 px-5 py-3 rounded-md w-full lg:w-96 group-focus-within:ring-2 group-focus-within:shadow-lg">
          <AiOutlineSearch className="text-3xl" />
          <input
            type="text"
            placeholder="Search"
            className="w-full outline-none text-lg"
          />
        </div>

        <div>
          <ProfileCard />
        </div>
      </div>

      <div className="flex gap-3 justify-between items-center">
        <h2 className="font-medium text-xl lg:text-2xl lg:font-semibold xl:text-3xl mt-4 mb-8">
          Content Management System
        </h2>

        <Link to="/career">
          <button className="border px-3 py-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-sm">
            Go to Page
          </button>
        </Link>
      </div>

      <div className="border-2 rounded-lg shadow-md">
        <div className="flex justify-between p-5 border-b-2">
          <h6 className="font-semibold text-xl">Career</h6>
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
              config={config}
              tabIndex={1} // tabIndex of textarea
              onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
              onChange={(newContent) => {}}
            />
          </div>

          <div className="flex justify-end">
            <button className="bg-[color:var(--blue)] text-white rounded-lg font-medium px-3 py-2">
              Update Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CMSCareer;
