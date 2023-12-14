import React from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import parse from "html-react-parser";
import {
  FaMoneyCheck,
  FaUserFriends,
  FaNetworkWired,
  FaBusinessTime,
} from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";

const JobDetailsModal = ({ modelOpened, setModelOpened, data }) => {
  const theme = useMantineTheme();

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={5}
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

        {data.companyId && (
          <h2 className="text-[color:var(--blue)] text-xl md:text-2xl font-bold pb-4">
            {data.companyId.companyName}
          </h2>
        )}

        <div className="flex flex-col justify-start gap-3 sm:flex-row">
          <div className="flex-1 flex flex-col gap-3">
            <div>
              <div className="flex items-center gap-2">
                <FaNetworkWired />
                <span className="text-lg font-medium">Role</span>
              </div>
              {data && <h3>{data.jobTitle}</h3>}
            </div>

            {data && (
              <div>
                <div className="flex items-center gap-2">
                  <FaBusinessTime />
                  <span className="text-lg font-medium">Experience</span>
                </div>
                <h3>{data.experience} </h3>
              </div>
            )}

            {data && (
              <div>
                <div className="flex items-center gap-2">
                  <FaMoneyCheck />
                  <span className="text-lg font-medium">Package</span>
                </div>
                <h3>
                  {" "}
                  {`${data.Currency}  ${data.package}  ${data.format}/Annual`}{" "}
                </h3>
              </div>
            )}

            {data && (
              <div>
                <div className="flex items-center gap-2">
                  <FaUserFriends />
                  <span className="text-lg font-medium">Company Size</span>
                </div>
                <h3>{data.companyId.companySize} </h3>
              </div>
            )}
          </div>

          <div className="flex flex-col py-8">
            <h4 className="text-[color:var(--blue)] sm:text-end text-3xl font-semibold">
              {data.rewardType === "Money"
                ? `₹${data.earnPerClosure}`
                : `${data.earnPerClosure}%`}
            </h4>
            <p>Earn per Closure</p>
          </div>
        </div>

        <div className="py-6 flex flex-col gap-5">
          <h4 className="text-[color:var(--blue)] text-xl font-semibold">
            Job Description
          </h4>
          {data.companyId && (
            <div className="">
              <p className="text-lg font-medium">About us</p>
              <p>{data.companyId.aboutUs}</p>
            </div>
          )}
          <div>
            <h5 className="text-lg font-medium">
              Responsibilties as {data && data.jobTitle}
            </h5>
            <p>{parse(data.responsibilities)}</p>
          </div>

          <div>
            <h5 className="text-lg font-medium">
              Qualifications for {data && data.jobTitle}
            </h5>
            <p>{data.qualification}</p>
          </div>

          <div>
            <span className="text-lg font-medium">Job Type: </span>
            <span>{data.jobType}</span>
          </div>

          <div>
            <span className="text-lg font-medium">Pay: </span>
            <span>
              {" "}
              {`${data.Currency} ${data.package}${data.format}/Annual`}
            </span>
          </div>

          <div>
            <h5 className="text-lg font-medium">Benefits:</h5>
            <p>{parse(data.benefits)}</p>
          </div>

          {/* <div>
            <h5 className="text-lg font-medium">Ability to commute/remote</h5>
            <p>
              Ability to commute/relocate: Indore, Indore - 452001, Madhya
              Pradesh: Reliably commute or planning to relocate before starting
              work (Required)
            </p>
          </div> */}

          {/* <div>
            <h5 className="text-lg font-medium">Education</h5>
            <p> Bachelor's work: 1 year (Preferred)</p>
          </div> */}

          {data.companyId && (
            <div>
              <h5 className="text-lg font-medium">Website</h5>
              <p className="text-[color:var(--blue)]">
                {data.companyId.companyWebsite}
              </p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default JobDetailsModal;
