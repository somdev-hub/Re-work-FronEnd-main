import React, { useState, useContext, useReducer, useEffect } from "react";
import { BsChevronDown, BsChevronUp, BsPerson } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { MdNotificationsNone } from "react-icons/md";
import { CgLogOut } from "react-icons/cg";
import { Switch } from "@material-tailwind/react";
import AuthContext from "../../store/auth-context";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../baseUrl";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import { database } from "../../Firebase";
import { ref, remove, update, onValue } from "firebase/database";

//top content (the user photo and notifications section)

const ProfileCard = () => {
  const [open, setOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notificationsSeen, setNotificationsSeen] = useState(false);
  const [countUnseen, setcountUnseen] = useState([]);
  const [notifications, setnotifications] = useState([]);
  const [reducerValue, forceUpdata] = useReducer((x) => x + 1, 0);
  const [reducerValue_1, forceUpdata_1] = useReducer((x) => x + 1, 0);

  const admin_notification_update = useSelector(
    (state) => state.counter.adminNotification_update
  );

  const authCtx = useContext(AuthContext);
  const navigation = useNavigate();

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
    }

    setcountUnseen(arr);
  }, [reducerValue_1]);

  /*-----------------------------------------------fetch notifications-------------------------------------------------------------- */
  useEffect(() => {
    onValue(
      ref(database, "users/" + localStorage.getItem("userId") + "/"),
      (snapshot) => {
        setnotifications(snapshot.val());
        // console.log(notifications);
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

  const logoutHandler = (e) => {
    e.preventDefault();
    authCtx.logout();
    navigation("/");
  };

  return (
    <div className="relative">
      <div className="flex justify-end gap-5 flex-wrap pb-4 group">
        <div className="flex items-center gap-5">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSrdB8rRgA1qgkw0ckcTrhIa0kpV2ILvbMWg&usqp=CAU"
            alt=""
            className="rounded-full w-14 h-14 border-4 border-white"
          />

          <div className="flex flex-col relative">
            <h2 className="font-bold">Joseph N</h2>
            <h3 className="flex items-center gap-3">
              Super Admin{" "}
              {open ? (
                <BsChevronDown
                  className="cursor-pointer"
                  onClick={() => setOpen(!open)}
                />
              ) : (
                <BsChevronUp
                  className="cursor-pointer"
                  onClick={() => setOpen(!open)}
                />
              )}
            </h3>

            <div
              className={`${
                open ? "inline" : "hidden"
              } absolute z-30 top-12 w-max h-auto pt-1 border bg-white rounded-md shadow-md cursor-pointer`}
            >
              <div className="flex justify-around items-center gap-2 p-4 border-b-2 hover:bg-[color:var(--blue)] hover:text-white">
                <BsPerson color="var(--blue) hover:white" size={20} />
                <h3 className="font-medium">Profile</h3>
              </div>
              <div className="flex justify-around items-center gap-2 p-4 border-b-2 hover:bg-[color:var(--blue)] hover:text-white">
                <Switch color="green" />
                <h3 className="font-medium">Dark Mode</h3>
              </div>
              <div className="flex justify-around items-center gap-2 p-4 hover:bg-[color:var(--blue)] hover:text-white">
                <CgLogOut color="var(--blue) hover:white" size={20} />
                <h3
                  className="font-medium"
                  type="button"
                  onClick={logoutHandler}
                >
                  Logout
                </h3>
              </div>
            </div>
          </div>

          <div className="border rounded-full p-1.5 bg-gray-100 hover:bg-gray-200">
            <MdNotificationsNone
              className="text-3xl cursor-pointer relative"
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
              } absolute z-20 top-16 right-4 w-full sm:w-96 h-auto max-h-96 overflow-auto pt-1 border bg-white rounded-md shadow-md`}
            >
              <div className="flex flex-col justify-around  gap-2 p-4 border-b-2">
                <div className="flex justify-start items-center">
                  <p className="font-semibold text-lg">Notifications</p>
                </div>

                {notifications && (
                  <>
                    {Object.keys(notifications)
                      .slice(0)
                      .reverse()
                      .map((i) => {
                        return (
                          <div
                            key={i}
                            className="flex justify-between items-center gap-5 border-b border-gray-500 p-2"
                          >
                            <div className="flex flex-col">
                              <h3 className="font-medium whitespace-pre-wrap text-light-blue-900">
                                {notifications[i].title}
                              </h3>
                              <p>{parse(notifications[i].body)}</p>
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
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
