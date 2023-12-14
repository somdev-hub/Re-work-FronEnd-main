import React, { useState, useEffect } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import { FaEdit } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { baseUrl } from "../../baseUrl";

const AdminPanelCompanyView = ({ modelOpened, setModelOpened, data }) => {
  const theme = useMantineTheme();

  const [companyName, setcompanyName] = useState();
  const [companyWebsite, setcompanyWebsite] = useState();
  const [industry, setindustry] = useState();
  const [contactNum1, setcontactNum1] = useState();
  const [contactNum2, setcontactNum2] = useState();
  const [headquarter, setheadquarter] = useState();
  const [companySize, setcompanySize] = useState();
  const [aboutUs, setaboutUs] = useState();
  const [contactPerson, setcontactPerson] = useState();
  const [contactPersonEmail, setcontactPersonEmail] = useState();
  const [contactPersonMobNo, setcontactPersonMobNo] = useState();
  const [companyAddress, setcompanyAddress] = useState();
  const [_PAN, set_PAN] = useState();
  const [_CIN, set_CIN] = useState();
  const [_TAN, set_TAN] = useState();
  const [_GST, set_GST] = useState();
  const [incorporationDate, setincorporationDate] = useState();
  const [linkedIn, setlinkedIn] = useState();
  const [facebook, setfacebook] = useState();
  const [twitter, settwitter] = useState();
  const [instagram, setinstagram] = useState();

  useEffect(() => {
    if (data) {
      if (data.companyId) {
        let x = data.companyId;
        setcompanyName(x.companyName);
        setcompanyWebsite(x.companyWebsite);
        setindustry(x.industry);
        setcontactNum1(x.contactNum1);
        setcontactNum2(x.contactNum2);
        setheadquarter(x.headquarter);
        setcompanySize(x.companySize);
        setaboutUs(x.aboutUs);
        setcontactPerson(x.contactPerson);
        setcontactPersonEmail(x.contactPersonEmail);
        setcontactPersonMobNo(x.contactPersonMobNo);
        setcompanyAddress(x.companyAddress);
        set_PAN(x._PAN);
        set_CIN(x._CIN);
        set_TAN(x._TAN);
        set_GST(x._GST);
        let date = new Date(x.incorporationDate);
        let adjDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;

        setincorporationDate(adjDate);
        setlinkedIn(x.linkedIn);
        setfacebook(x.facebook);
        settwitter(x.twitter);
        setinstagram(x.instagram);
      } else {
        setcompanyName(data.companyName);
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
          {companyName}
        </h2>
        <h2 className="font-medium pb-5 lg:pb-8">Company Name</h2>

        <div className="flex flex-col justify-start gap-3 sm:flex-row">
          <div className="flex-1 flex flex-col gap-5">
            <div>
              <span className="text-lg font-medium">Company Website</span>
              <h3>{companyWebsite}</h3>
            </div>

            <div>
              <span className="text-lg font-medium">Industry</span>
              <h3>{industry}</h3>
            </div>

            <div>
              <span className="text-lg font-medium">Contact Number</span>
              <h3>{contactNum1}</h3>
            </div>

            <div>
              <span className="text-lg font-medium">Headquaters</span>
              <h3>{headquarter}</h3>
            </div>

            <div>
              <span className="text-lg font-medium">Company Size</span>
              <h3>{companySize}</h3>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-5">
            <h4 className="text-xl font-semibold">Social Media Links</h4>

            <div>
              <span className="text-lg font-medium">Facebook</span>
              <h3>{facebook}</h3>
            </div>

            <div>
              <span className="text-lg font-medium">Twitter</span>
              <h3>{twitter}</h3>
            </div>

            <div>
              <span className="text-lg font-medium">Instagram</span>
              <h3>{instagram}</h3>
            </div>

            <div>
              <span className="text-lg font-medium">Linkedin</span>
              <h3>{linkedIn}</h3>
            </div>
          </div>
        </div>

        <div className="py-6 flex flex-col gap-5">
          <h4 className="text-[color:var(--blue)] text-xl font-semibold">
            About Us
          </h4>

          <div>
            {/* <h5 className="text-lg font-medium">View our terms</h5> */}
            <p>{aboutUs}</p>
          </div>

          {/* <div>
            <h5 className="text-lg font-medium">General Disclaimer</h5>
            <p>
              Establish and maintain processes to manage scope over the project
              lifecycle, setting project quality and performance standards, and
              assessing and managing risk within project. Monitor and assign
              resources appropriately to streamline project efficiency and
              maximize deliverable outputs. Report project outcomes and/or risks
              to the appropriate management channels as needed—escalating issues
              as and when necessary.
            </p>
          </div> */}

          <div>
            <div className="text-lg font-medium">Contact Person</div>
            <span>{contactPerson}</span>
          </div>

          <div>
            <div className="text-lg font-medium">Contact Number</div>
            <span>{contactPersonMobNo}</span>
          </div>

          <div>
            <div className="text-lg font-medium">Contact Person Email</div>
            <span>{contactPersonEmail}</span>
          </div>

          <div>
            <div className="text-lg font-medium">Company Address</div>
            <span>{companyAddress}</span>
          </div>

          <div>
            <div className="text-lg font-medium">PAN</div>
            <span>{_PAN}</span>
          </div>

          <div>
            <div className="text-lg font-medium">CIN</div>
            <span>{_CIN}</span>
          </div>

          <div>
            <div className="text-lg font-medium">TAN</div>
            <span>{_TAN}</span>
          </div>

          <div>
            <div className="text-lg font-medium">GST</div>
            <span>{_GST}</span>
          </div>

          <div>
            <div className="text-lg font-medium">Incorporation Date </div>
            <span>{incorporationDate}</span>
          </div>
        </div>

        <Link to="/admin/company/edit" state={data}>
          <button className="bg-[color:var(--orange)] px-4 py-2 rounded-md text-white font-semibold flex items-center gap-1.5 ml-auto mb-10">
            <FaEdit />
            Edit
          </button>
        </Link>
      </div>
    </Modal>
  );
};

export default AdminPanelCompanyView;
