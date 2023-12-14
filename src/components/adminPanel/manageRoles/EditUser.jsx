import React, { useState, useEffect, useReducer } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import ProfileCard from "../ProfileCard";
import { useLocation, useNavigate } from "react-router-dom";
import { baseUrl } from "../../../baseUrl";
import { Switch } from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";

const EditUser = () => {
  const location = useLocation();
  const [reducerValue, forceUpdata] = useReducer((x) => x + 1, 0);
  const navigation = useNavigate();
  const [data, setData] = useState();
  const [userName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [mobile, setmobile] = useState();
  const [password, setPassword] = useState();

  const [Dashboard, setDashboard] = useState(false);
  const [company, setCompany] = useState(false);
  const [manageRoles, setManageRoles] = useState(false);
  const [forms, setForms] = useState(false);
  const [recruiter, setRecruiter] = useState(false);
  const [referral, setReferral] = useState(false);
  const [cms, setCms] = useState(false);
  const [payment, setPayment] = useState(false);

  const [Applications, setApplications] = useState(false);
  const [Invoices, setInvoices] = useState(false);
  const [Notifications, setNotifications] = useState(false);
  const [NeedHelp, setNeedHelp] = useState(false);
  const [loaderBtn, setLoaderBtn] = useState(false);

  useEffect(() => {
    if (data) {
      setFullName(data.userName);
      setEmail(data.email);
      setmobile(data.mobile);
      setDashboard(data.Dashboard);
      setCompany(data.company);
      setManageRoles(data.manageRoles);
      setForms(data.forms);
      setRecruiter(data.recruiter);
      setReferral(data.referral);
      setCms(data.cms);
      setPayment(data.payment);
      setApplications(data.Applications);
      setInvoices(data.Invoices);
      setNotifications(data.Notifications);
      setNeedHelp(data.NeedHelp);
    }
  }, [reducerValue]);

  // console.log(data);
  useEffect(() => {
    setData(location.state);
    forceUpdata();
  }, []);

  const formHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        userName,
        email,
        mobile,
        password,
        Dashboard,
        company,
        manageRoles,
        forms,
        recruiter,
        referral,
        cms,
        payment,
        Applications,
        Invoices,
        Notifications,
        NeedHelp,
      };
      let token = localStorage.getItem("token");

      const result = fetch(`${baseUrl}/admin/editManageRoleUser/${data._id}`, {
        method: "put",
        body: JSON.stringify(formData),
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });
      // alert("submitted");
      // setLoaderBtn(true)
      toast("User roles updated!");
      
      setTimeout(() => {
        navigation("/admin/manageroles");
        setLoaderBtn(false)
      }, 1000);


      if (!result.ok) {
        setLoaderBtn(false)
        throw new Error("s");
      }
      const jsonData = await result.json();
      // console.log(jsonData);
    } catch (error) {
      setLoaderBtn(true)
      console.log(error);
    }
  };

  // let a = () => {
  //   toast("Go to manage roles page");
  //   setTimeout(() => {
  //     navigation("/admin/manageroles");
  //   }, 1000);
  // };

  return (
    <div>
      <div className="flex justify-end gap-5 flex-wrap pb-4 border-b-2 border-black group">
        <div>
          <ProfileCard />
        </div>
      </div>

      <h2 className="text-[color:var(--blue)] font-medium text-xl lg:text-2xl lg:font-semibold xl:text-3xl mt-4 mb-8">
        Edit User
      </h2>

      <div className="border-2">
        <div className="flex flex-col p-5 lg:p-8 xl:px-10">
          <form className="flex flex-col gap-4" onSubmit={formHandler}>
            <div className="flex flex-col gap-1">
              <label htmlFor="fullName" className="font-medium">
                Full Name
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
                placeholder="Full Name"
                id="fullName"
                className="px-3 py-2 border max-w-lg rounded-md outline-none focus:ring-1"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="font-medium">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="name@email.com"
                id="email"
                className="px-3 py-2 border max-w-lg rounded-md outline-none focus:ring-1"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="phone" className="font-medium">
                Mobile Number
              </label>
              <input
                type="number"
                value={mobile}
                onChange={(e) => {
                  setmobile(e.target.value);
                }}
                placeholder="1234567890"
                id="phone"
                className="px-3 py-2 border max-w-lg rounded-md outline-none focus:ring-1"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="pass" className="font-medium">
                Password
              </label>
              <input
                type="text"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="password"
                id="pass"
                className="px-3 py-2 border max-w-lg rounded-md outline-none focus:ring-1"
              />
            </div>

            <label className="font-medium text-lg">Change User Access</label>

            <div className="flex flex-col gap-4 mt-4">
              <label className="font-medium text-lg">User Access</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-5">
                  <Switch
                    value={"Dashboard"}
                    onClick={(e) => {
                      setDashboard(!Dashboard);
                    }}
                    // onChange={(e) => {hndlClick(e.target.value);}}
                    checked={Dashboard}
                    id="1"
                    label="Dashboard"
                    color="green"
                  />
                  <Switch
                    value={"company"}
                    onClick={(e) => {
                      setCompany(!company);
                    }}
                    // onChange={(e) => {hndlClick(e.target.value);}}
                    checked={company}
                    id="2"
                    label="Company"
                    color="green"
                  />
                  <Switch
                    value={manageRoles}
                    checked={manageRoles}
                    onClick={() => setManageRoles(!manageRoles)}
                    id="3"
                    label="Manage Roles"
                    color="green"
                  />
                  <Switch
                    value={forms}
                    checked={forms}
                    onClick={() => setForms(!forms)}
                    id="4"
                    label="Forms"
                    color="green"
                  />
                </div>
                <div className="flex flex-col gap-5">
                  <Switch
                    value={recruiter}
                    checked={recruiter}
                    onClick={() => setRecruiter(!recruiter)}
                    id="5"
                    label="Recruiter"
                    color="green"
                  />
                  <Switch
                    value={referral}
                    checked={referral}
                    onClick={() => setReferral(!referral)}
                    id="6"
                    label="Referral"
                    color="green"
                  />
                  <Switch
                    value={cms}
                    checked={cms}
                    onClick={() => setCms(!cms)}
                    id="7"
                    label="CMS"
                    color="green"
                  />
                  <Switch
                    value={payment}
                    checked={payment}
                    onClick={() => setPayment(!payment)}
                    id="8"
                    label="Payments"
                    color="green"
                  />
                </div>
                <div className="flex flex-col gap-5">
                  <Switch
                    id="9"
                    label="Applications"
                    color="green"
                    value={Applications}
                    checked={Applications}
                    onClick={() => setApplications(!Applications)}
                  />

                  <Switch
                    id="10"
                    label="Invoices"
                    color="green"
                    value={Invoices}
                    checked={Invoices}
                    onClick={() => setInvoices(!Invoices)}
                  />
                </div>

                <div className="flex flex-col gap-5">
                  <Switch
                    id="11"
                    label="Notifications"
                    color="green"
                    value={Notifications}
                    checked={Notifications}
                    onClick={() => setNotifications(!Notifications)}
                  />

                  <Switch
                    id="12"
                    label="Need Help"
                    color="green"
                    value={NeedHelp}
                    checked={NeedHelp}
                    onClick={() => setNeedHelp(!NeedHelp)}
                  />
                </div>
              </div>
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
                <div className="text-white flex justify-end gap-5 mt-10">
                  <button
                    className="bg-red-500 px-4 py-2 rounded-md flex gap-1.5 items-center font-medium"
                    onClick={() => { navigation("/admin/manageroles"); }}
                  >
                    <AiOutlineDelete />
                    Discard
                  </button>

                  <button
                    className="bg-[color:var(--blue)] px-4 py-2 rounded-md font-medium"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
            }


          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditUser;
