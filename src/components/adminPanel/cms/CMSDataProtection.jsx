import React, { useState, useRef, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import JoditEditor from "jodit-react";
import ProfileCard from "../ProfileCard";
import { baseUrl } from "../../../baseUrl";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../../hook/Loader";
import { ThreeDots } from "react-loader-spinner";

const CMSDataProtection = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true)
  const [loaderBtn, setLoaderBtn] = useState(false);


  const getDataProtection = async () => {
    try {
      const result = await fetch(`${baseUrl}/users/getDataProtection`);
      const jsonData = await result.json();
      setIsLoading(false)


      if (!result.ok) {
        throw new Error(jsonData.message);
      }
      //console.log(jsonData);
      setContent(jsonData.posts.dataProtection);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataProtection();
  }, []);
  let token = localStorage.getItem("token");
  const postDataProtection = useCallback(async (data) => {
    try {
      const result = await fetch(`${baseUrl}/admin/updateDataProtection`, {
        method: 'put',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      const jsonData = await result.json();
      setLoaderBtn(true)
      if (!result.ok) {
        setLoaderBtn(false)
        throw new Error(jsonData.message);
      }
      setTimeout(() => {
        toast("Page updated!");
        setLoaderBtn(false)
      }, 1000);

    } catch (error) {
      toast(error);
      setLoaderBtn(false)
    }
  }, []);

  const formHandler = (e) => {
    e.preventDefault();

    const data = {
      dataProtection: content,
    };

    postDataProtection(data);
  };
  return (
    <div>
      <div className="flex justify-end gap-5 flex-wrap pb-4 border-b-2 border-black group">
        <div>
          <ProfileCard />
        </div>
      </div>

      <div className="flex gap-3 justify-between items-center">
        <h2 className="font-medium text-xl lg:text-2xl lg:font-semibold xl:text-3xl mt-4 mb-8">
          Content Management System
        </h2>

        <Link to="/dataprotection">
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
              <h6 className="font-semibold text-xl">Data Protection</h6>
            </div>

            <div className="p-5 flex flex-col gap-5">
              <h6 className="font-medium">Page Description</h6>

              <div>
                <JoditEditor
                  ref={editor}
                  value={content}
                  // config={config}
                  //tabIndex={1} // tabIndex of textarea
                  // onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                  onChange={(newContent) => {
                    setContent(newContent);
                  }}
                />
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
                  <div className="flex justify-end">
                    <button
                      className="bg-[color:var(--blue)] text-white rounded-lg font-medium px-3 py-2"
                      onClick={formHandler}
                    >
                      Update Page
                    </button>
                  </div>
              }

            </div>
          </div>
      }
      <ToastContainer />
    </div>
  );
};

export default CMSDataProtection;
