import React, { useState, useEffect, useReducer } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import { FaEdit } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

const AdminPanelRecruiterView = ({ modelOpened, setModelOpened, data }) => {
  const theme = useMantineTheme();
  const [recruiter, setRecruiter] = useState();
  const [fullName, setFullName] = useState();
  const [email, setemail] = useState();
  const [dob, setdob] = useState();
  const [mobileNum1, setmobileNum1] = useState();
  const [mobileNum2, setmobileNum2] = useState();
  const [highestEducation, sethighestEducation] = useState();
  const [city, setcity] = useState();
  const [state, setstate] = useState();
  const [_PAN, set_PAN] = useState();
  const [_GST, set_GST] = useState();
  const [accountHolderName, setaccountHolderName] = useState();
  const [accountType, setaccountType] = useState("");
  const [bankAccountNumber, setbankAccountNumber] = useState();
  const [bankName, setbankName] = useState();
  const [ifscCode, setifscCode] = useState();
  const [swiftCode, setswiftCode] = useState();
  const [linkedIn, setlinkedIn] = useState();
  const [facebook, setfacebook] = useState();
  const [instagram, setinstagram] = useState();
  const [twitter, settwitter] = useState();
  const [updateData, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    if (data) {
      forceUpdate();
      if (data.recruiterId) {
        let x = data.recruiterId;
        setFullName(x.fullName);
        setemail(x.email);
        let date = new Date(x.dob).toLocaleDateString();
        let adjDate = date.split("T")[0];
        setdob(adjDate);
        // setdob(x.dob);
        setmobileNum1(x.mobileNum1);
        setmobileNum2(x.mobileNum2);
        sethighestEducation(x.highestEducation);
        setcity(x.city);
        setstate(x.state);
        set_PAN(x._PAN);
        set_GST(x._GST);
        setaccountHolderName(x.accountHolderName);
        setaccountType(x.accountType);
        setbankAccountNumber(x.bankAccountNumber);
        setbankName(x.bankName);
        setifscCode(x.ifscCode);
        setswiftCode(x.swiftCode);
        setlinkedIn(x.linkedIn);
        setfacebook(x.facebook);
        settwitter(x.twitter);
        setinstagram(x.instagram);
      } else {
        setFullName(data.fullName);
        setemail(data.email);
      }
    }
  }, [data]);

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
      size="xl"
      centered
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

        <h2 className="text-[color:var(--blue)] text-xl md:text-2xl font-bold">
          {fullName}
        </h2>
        <h2 className="font-medium pb-5 lg:pb-8">Recruiter</h2>

        <div className="flex flex-col justify-start gap-3 sm:flex-row">
          <div className="flex-1 flex flex-col gap-5">
            <div>
              <span className="text-lg font-medium">Email</span>
              <h3>{email}</h3>
            </div>

            <div>
              <span className="text-lg font-medium">DOB</span>
              <h3>{dob}</h3>
            </div>

            <div>
              <span className="text-lg font-medium">Mobile Number</span>
              <h3>{mobileNum1}</h3>
            </div>

            <div>
              <span className="text-lg font-medium">City</span>
              <h3>{city}</h3>
            </div>

            <div>
              <span className="text-lg font-medium">State</span>
              <h3>{state}</h3>
            </div>

            <div>
              <span className="text-lg font-medium">Education</span>
              <h3>{highestEducation}</h3>
            </div>

            <div>
              <span className="text-lg font-medium">PAN</span>
              <h3>{_PAN}</h3>
            </div>

            <div>
              <span className="text-lg font-medium">GST</span>
              <h3>{_GST}</h3>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-5">
            <h4 className="text-xl font-semibold">Account Details</h4>

            <div>
              <span className="text-lg font-medium">Account Holder Name</span>
              <h3>{accountHolderName} </h3>
            </div>

            <div>
              <span className="text-lg font-medium">Account Type</span>
              <h3>{accountType}</h3>
            </div>

            <div>
              <span className="text-lg font-medium">Bank Account Number</span>
              <h3> {bankAccountNumber} </h3>
            </div>

            <div>
              <span className="text-lg font-medium">Bank Name</span>
              <h3>{bankName} </h3>
            </div>

            <div>
              <span className="text-lg font-medium">IFSC Code</span>
              <h3> {ifscCode}</h3>
            </div>

            <div>
              <span className="text-lg font-medium">Swift Code</span>
              <h3>{swiftCode} </h3>
            </div>
          </div>
        </div>

        <div className="py-6 flex flex-col gap-5">
          <h4 className="text-[color:var(--blue)] text-xl font-semibold">
            Social Media Links
          </h4>

          <div>
            <div className="text-lg font-medium">Facebook</div>
            <span> {facebook}</span>
          </div>

          <div>
            <div className="text-lg font-medium">Twitter</div>
            <span>{twitter} </span>
          </div>

          <div>
            <div className="text-lg font-medium">Instagram</div>
            <span>{instagram} </span>
          </div>

          <div>
            <div className="text-lg font-medium">Linkedin</div>
            <span>{linkedIn} </span>
          </div>
        </div>

        <Link to="/admin/recruiters/edit" state={data}>
          <button className="bg-[color:var(--orange)] px-4 py-2 rounded-md text-white font-semibold flex items-center gap-1.5 ml-auto mb-10">
            <FaEdit />
            Edit
          </button>
        </Link>
      </div>
    </Modal>
  );
};

export default AdminPanelRecruiterView;
