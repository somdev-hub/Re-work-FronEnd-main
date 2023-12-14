import React, { useState, useEffect } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { database } from "../../Firebase";
import { ref, set } from "firebase/database";
import mongoose from 'mongoose';
import { baseUrl } from "../../baseUrl";
import { useDispatch, useSelector } from "react-redux";
import { counterActions } from "../../store/index-redux";

const CompanyPostedJobRejectModal = ({ modelOpened, setModelOpened, data }) => {
  const theme = useMantineTheme();
  const [remark, setRemark] = useState("");
  const dispatch = useDispatch();

  /*----------------------------------Send notification--------------------------------------------------------------- */
  const sendNotification = async (data) => {
    let x = mongoose.Types.ObjectId();
    let id = x.toString();

    let notificationTitle = "Admin-rejection";
    let notificationBody = `<span className= text-green-500> ${data.jobTitle}</span> job has been rejected by 
                            admin.`;

    await set(ref(database, "users/" + data.companyId + `/${id}`), {
      title: notificationTitle,
      body: notificationBody,
      receivedAt: Date.now(),
      seen: false,
    });


  };

  let hndleReject = (id) => {
    const statusDb = "Admin-Rejected";

    //   console.log(addFor);
    const s = { statusDb, remark };
    // console.log(s);
    let token = localStorage.getItem('token');
    fetch(`${baseUrl}/company/AdminStatusChange/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(s),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(
          counterActions.jobsAction({ jobId: data._id })
        );
        let newData = {
          jobTitle: data.jobTitle,
          companyId: data.companyId,
        };
        sendNotification(newData);
        window.localStorage.setItem("companyPostedJobApprovel", id);
        // alert("This is rejected by you");
        toast("This is rejected by you!");
        setTimeout(() => {
          setModelOpened(false);
        }, 1000);

        // forceUpdate();
      });
  };

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      overflow="outside"
      size="70%"
      opened={modelOpened}
      onClose={() => setModelOpened(false)}
      withCloseButton={false}
      transition="fade"
      transitionDuration={500}
      transitionTimingFunction="ease"
    >
      <div className="md:px-10">
      <div
          className="absolute top-2 right-2 cursor-pointer flex flex-col items-center"
          onClick={() => setModelOpened(false)}
        >
          <AiOutlineCloseCircle className=" text-lg md:text-xl text-red-500" />
          <span className=" text-sm md:font-semibold text-red-500">Close</span>
        </div>

        <div className="flex flex-col gap-5 my-10">
          <h2 className="text-[color:var(--blue)] text-xl md:text-2xl font-bold">
            Rejection Remark
          </h2>

          <div className="flex flex-col gap-2">
            <label htmlFor="rejectionRemark">
              Why are you rejecting this job?
            </label>
            <textarea
              value={remark}
              onChange={(e) => {
                setRemark(e.target.value);
              }}
              type="text"
              id="rejectionRemark"
              rows={5}
              placeholder="Write your remark here..."
              className="border outline-none rounded-md px-3 py-2 focus:ring-1"
            />
          </div>
        </div>

        <button
          className="bg-red-500 px-4 py-2 rounded-md text-white font-semibold flex items-center gap-1.5 ml-auto mb-10"
          onClick={(e) => {
            hndleReject(data);
          }}
        >
          Reject
        </button>
        <ToastContainer />
      </div>
    </Modal>
  );
};

export default CompanyPostedJobRejectModal;
