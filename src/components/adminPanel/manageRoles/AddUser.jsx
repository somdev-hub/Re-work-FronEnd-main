import React, { useState } from "react";
import { Switch } from "@material-tailwind/react";
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../../baseUrl";
import ProfileCard from "../ProfileCard";
import { toast, ToastContainer } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
const AddUser = () => {
  const nav = useNavigate();
  const [er, setEr] = useState();
  const [msg, setMsg] = useState();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

  const [submitted, setSubmitted] = useState(false);
  const [loaderBtn, setLoaderBtn] = useState(false);

  let handleSubmit = (e) => {
    e.preventDefault();
    setLoaderBtn(true)
    // if (submitted) {
    //   return;
    // }
    // setSubmitted(true);

    if (password !== confirmPassword) {
      setEr("password not match");
      toast("password not match");
    } else {
      const data = {
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
      // console.log(data.mobile);
      fetch(`${baseUrl}/auth/signupAdminPanel`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          
          if (data.status === 201) {
            toast(data.message);
            // console.log(data.message);
            // setEr(data.message)
            setTimeout(() => {
              nav("/admin/manageroles");
              setLoaderBtn(false)
            }, 1000);

          } else {
            setSubmitted(false);
            toast(data.message);
            setLoaderBtn(false)

          }
        });
    }
  };

  let discrdHandale = () => {
    nav("/admin/manageroles");
  };

  return (
    <div>
      <div className="flex justify-end gap-5 flex-wrap pb-4 border-b-2 border-black group">
        <div>
          <ProfileCard />
        </div>
      </div>

      <h2 className="text-[color:var(--blue)] font-medium text-xl lg:text-2xl lg:font-semibold xl:text-3xl mt-4 mb-8">
        Add User
      </h2>

      <div className="border-2">
        <div className="flex flex-col p-5 lg:p-8 xl:px-10">
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
            className="flex flex-col gap-4"
          >
            {msg && <p style={{ color: "green" }}>{msg}</p>}
            {er && <p style={{ color: "red" }}>{er}</p>}
            <div className="flex flex-col gap-1">
              <label htmlFor="fullName" className="font-medium">
                Full Name
              </label>
              <input
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                type="text"
                placeholder="Full Name"
                id="fullName"
                required
                className="px-3 py-2 border max-w-lg rounded-md outline-none focus:ring-1"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="font-medium">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                placeholder="name@email.com"
                id="email"
                required
                className="px-3 py-2 border max-w-lg rounded-md outline-none focus:ring-1"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="phone" className="font-medium">
                Mobile Number
              </label>
              <input
                value={mobile}
                onChange={(e) => {
                  setMobile(e.target.value);
                }}
                type="text"
                placeholder="1234567890"
                id="phone"
                required
                className="px-3 py-2 border max-w-lg rounded-md outline-none focus:ring-1"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="pass" className="font-medium">
                Create Password
              </label>
              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="text"
                placeholder="password"
                id="pass"
                required
                className="px-3 py-2 border max-w-lg rounded-md outline-none focus:ring-1"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="confirmPass" className="font-medium">
                Confirm Password
              </label>
              <input
                type="text"
                placeholder="confirm password"
                id="confirmPass"
                required
                className="px-3 py-2 border max-w-lg rounded-md outline-none focus:ring-1"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </div>

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
                    onClick={discrdHandale}
                  >
                    <AiOutlineDelete />
                    Discard
                  </button>

                  <button className="bg-[color:var(--blue)] px-4 py-2 rounded-md font-medium">
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

export default AddUser;
