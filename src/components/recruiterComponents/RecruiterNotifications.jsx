import React, { useEffect, useState, useReducer } from "react";
import { MdNotificationsNone } from "react-icons/md";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { baseUrl } from "../../baseUrl";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import { database } from "../../Firebase";
import { ref, onValue, update, remove } from "firebase/database";

const RecruiterNotifications = () => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notificationsSeen, setNotificationsSeen] = useState(false);
  const [countUnseen, setcountUnseen] = useState();
  const [notifications, setnotifications] = useState([]);
  const recruiter_notification_update = useSelector(
    (state) => state.counter.recruiterNotification_update
  );
  const [reducerValue, forceUpdata] = useReducer((x) => x + 1, 0);
  const [reducerValue_1, forceUpdata_1] = useReducer((x) => x + 1, 0);

  /*------------------------------------------------------------------------------------------------------------------------------------- */
  useEffect(() => {
    setcountUnseen(null);
    let arr = [];
    if (notifications) {
       Object.keys(notifications)
         .slice(0)
         .reverse()
         .map((i) => {
           if (!notifications[i].seen) {
             arr.push(i);
           }
         });
      setcountUnseen(arr);
    }
   
    
  }, [reducerValue_1]);

  /*----------------------------------------------listen notifications------------------------------------------------------------------------- */
  useEffect(() => {
    onValue(
      ref(database, "users/" + localStorage.getItem("userId") + "/"),
      (snapshot) => {
        setnotifications(snapshot.val());
        forceUpdata_1();
      }
    );
  }, []);

  /*------------------------------------------delete notification-------------------------------------------------------------------- */
  const deleteNotification = async (id) => {
    try {
      remove(
        ref(database, "users/" + localStorage.getItem("userId") + `/${id}`)
      );
    } catch (error) {
      console.log(error);
    }
  };
  /*------------------------------------------------update seen notification---------------------------------------------------------- */
  const updateSeenNotification = async (id) => {
    try {
      update(
        ref(database, "users/" + localStorage.getItem("userId") + `/${id}`),
        {
          seen: true,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const seenHandler = (e) => {
    e.preventDefault();
    countUnseen.forEach((element) => {
      updateSeenNotification(element);
    });
  };

  return (
    <div className="relative">
      <div className="flex justify-end gap-5 flex-wrap group">
        <div className="flex">
          <div className="border rounded-full p-1.5 bg-gray-100 hover:bg-gray-200 cursor-pointer">
            <MdNotificationsNone
              className="text-3xl relative"
              onClick={(e) => {
                setNotificationsOpen(!notificationsOpen);
                seenHandler(e);
                setNotificationsSeen(!notificationsSeen);
              }}
            />
            {!notificationsSeen && countUnseen?.length > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 flex justify-center items-center text-white rounded-full bg-[color:var(--blue)]">
                <span className="text-xs">{countUnseen?.length}</span>
              </span>
            )}

            <div
              className={`${
                notificationsOpen ? "inline" : "hidden"
              } absolute z-20 top-14 right-4 w-72 max-w-96 sm:w-96 h-auto max-h-96 overflow-auto pt-1 border bg-white rounded-md shadow-md`}
            >
              <div className="flex flex-col justify-around  gap-2 p-4 border-b-2">
                <div className="flex justify-start items-center">
                  <p className="font-semibold text-lg">Notifications</p>
                </div>
                {notifications && (
                  <div>
                    {Object.keys(notifications)
                      .slice(0)
                      .reverse()
                      .map((i) => {
                        return (
                          <div
                            key={notifications[i]._id}
                            className="flex justify-between items-center gap-5 border-b border-gray-500 p-2"
                          >
                            <div className="flex flex-col">
                              <h3 className="font-medium whitespace-pre-wrap text-light-blue-900">
                                {notifications[i]?.title}
                              </h3>
                              <p>{parse(notifications[i]?.body)}</p>
                              <p className="text-xs teact-gray-500">
                                {new Date(
                                  notifications[i].receivedAt
                                ).toLocaleDateString("en-us", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                })}
                              </p>
                            </div>
                            <div>
                              <AiOutlineCloseCircle
                                className="text-red-500 text-xl cursor-pointer "
                                onClick={(e) => {
                                  deleteNotification(i);
                                }}
                              />
                            </div>
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterNotifications;
