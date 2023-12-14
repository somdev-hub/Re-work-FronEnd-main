import React, { useState, useRef } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { Select, Option } from "@material-tailwind/react";
import JoditEditor from "jodit-react";
import ProfileCard from "./ProfileCard";
import { baseUrl } from "../../baseUrl";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { database } from "../../Firebase";
import mongoose from "mongoose";
import { ref, set } from "firebase/database";
import { ThreeDots } from "react-loader-spinner";

const PushNotifications = () => {
  const editor = useRef(null);
  const [notificationTitle, setNotificationTitle] = useState();
  const [notificationBody, setNotificationBody] = useState();
  const [clientType, setClientType] = useState();
  const [id, setid] = useState("");
  const nav = useNavigate();
  const [loaderBtn, setLoaderBtn] = useState(false);

  const postNotification = async (data) => {
    try {
      let token = localStorage.getItem('token')
      const res = await fetch(`${baseUrl}/admin/sendNotifications`, {
        method: "post",
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data),
      });

      const jsonData = await res.json();
      setLoaderBtn(true)
      if (!res.ok) {
        setLoaderBtn(false)
        throw new Error(jsonData.message);
      }
      setTimeout(() => {
        toast.success('Notification send')
        setLoaderBtn(false)
      }, 1000);

      return jsonData.posts;

    } catch (error) {
      console.log(error);
      setLoaderBtn(false)
    }
  };

  const formHandler = async (e) => {
    e.preventDefault();

    const x = mongoose.Types.ObjectId();
    const id = x.toString();
    const data = {
      notificationTitle: notificationTitle,
      notificationBody: notificationBody,
      clientType: clientType,
    };

    const arr = await postNotification({ clientType: clientType });
    // console.log(arr);
    arr?.forEach((element) => {
      set(ref(database, "users/" + element + `/${id}`), {
        title: notificationTitle,
        body: notificationBody,
        receivedAt: Date.now(),
        seen: false,
      });
    });

  };

  return (
    <div>
      <div className="flex justify-end gap-5 flex-wrap pb-4 border-b-2 border-black group">
        <div>
          <ProfileCard />
        </div>
      </div>

      <div className="flex gap-3 justify-between items-center">
        <h2 className="font-medium text-[color:var(--blue)] text-xl lg:text-2xl lg:font-semibold xl:text-3xl mt-4 mb-8">
          Push Notifications
        </h2>
      </div>

      <div className="border-2 rounded-lg shadow-md">
        <div className="flex justify-end items-center p-5">
          <div>
            <Select
              label="Send to"
              onChange={(value) => {
                setClientType(value);
              }}
            >
              <Option value="Recruiters">Recruiters</Option>
              <Option value="Companies">Companies</Option>
              <Option value="Both">Both</Option>
            </Select>
          </div>
        </div>

        <div className="flex flex-col gap-2 p-5">
          <h6 className="font-semibold text-xl">Notification Title</h6>
          <input
            type="text"
            value={notificationTitle}
            onChange={(e) => {
              setNotificationTitle(e.target.value);
            }}
            className="w-full border rounded-md outline-none px-3 py-2 focus:ring-1"
            placeholder="New Comments"
          />
        </div>

        <div className="p-5 flex flex-col gap-5">
          <h6 className="font-medium">Message</h6>

          <div>
            <JoditEditor
              ref={editor}
              value={notificationBody}
              //config={config}
              //tabIndex={1} // tabIndex of textarea
              //onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
              onChange={(newContent) => {
                setNotificationBody(newContent);
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
                  className="bg-[color:var(--blue)] text-white rounded-lg font-medium px-4 py-2 flex items-center gap-2"
                  onClick={formHandler}
                >
                  Send <AiOutlineSend />
                </button>
              </div>
          }

        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PushNotifications;
