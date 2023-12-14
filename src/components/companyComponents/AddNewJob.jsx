import React, { useState, useRef } from "react";
import { Select, Option } from "@material-tailwind/react";
import { FiUpload } from "react-icons/fi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import JoditEditor from "jodit-react";
import { baseUrl } from "../../baseUrl";
import CompanyNotifications from "./CompanyNotifications";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { database } from "../../Firebase";
import { ref, set } from "firebase/database";
import mongoose from "mongoose";
import { ThreeDots } from "react-loader-spinner";

const AddNewJob = () => {
  const nav = useNavigate();
  const editor = useRef(null);
  const [jobDetailsFile, setjobDetailsFile] = useState();
  const [skills, setSkills] = useState([]);
  const [value, setValue] = useState();
  const [jobTitle, setjobTitle] = useState();
  const [jobType, setJobType] = useState(null);
  const [experienceYear, setExperienceYEAR] = useState();
  const [experienceMonth, setExperienceMONTH] = useState();
  const [packageMinimum, setPackageMINIMUM] = useState();
  const [packageMaximum, setPackageMAXIMUM] = useState();
  const [earnPerClosure, setearnPerClosure] = useState();
  const [noticePeriod, setNoticePeriod] = useState();
  const [location, setLocation] = useState();
  const [communication, setCommunication] = useState();
  const [qualification, setQualification] = useState();
  const [status] = useState("company_addJobs_fress");
  const [rewardType, setRewardType] = useState();
  const [responsibilities, setResponsibilities] = useState();
  const [benefits, setBenefits] = useState();
  const [Tech, setTech] = useState();
  const [Currency, setCurrency] = useState();
  const [format, setformat] = useState();
  const [loaderBtn, setLoaderBtn] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleChangeJOBTYPE = (value) => {
    setJobType(value);
  };
  const handleChangeReward = (value) => {
    setRewardType(value);
  };
  const handleChangeCommunication = (value) => {
    setCommunication(value);
  };
  const handleChangeformat = (value) => {
    setformat(value);
  };
  const handleChangeCurrency = (value) => {
    setCurrency(value);
  };
  const handleChangeTech = (value) => {
    setTech(value);
  };

  const saveSkills = (e) => {
    setValue(e.target.value);
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    const copySkills = [...skills];
    copySkills.push(value);
    setSkills(copySkills);
    setValue("");
  };
  const handleRemoveSkill = (e, index) => {
    e.preventDefault();

    const copySkills = [...skills];
    copySkills.splice(index, 1);
    setSkills(copySkills);
  };

  const [submitted, setSubmitted] = useState(false);
  let token = localStorage.getItem("token");
  /*----------------------------fetch users id-------------------------------------------------------------------------- */

  const postNotification = async (data) => {
    try {
      const res = await fetch(`${baseUrl}/admin/sendNotifications`, {
        method: "post",
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data),
      });

      const jsonData = await res.json();

      if (!res.ok) {
        throw new Error(jsonData.message);
      }
      return jsonData.posts;
    } catch (error) {
      console.log(error);
    }
  };
  /*----------------------------------Send notification--------------------------------------------------------------- */
  const sendNotification = async (data) => {
    const x = mongoose.Types.ObjectId();
    const id = x.toString();



    let notificationTitle = "New Job";
    let notificationBody = `A new job opening for a <span className= text-green-500> ${data.jobTitle}</span> at <span className= text-green-500 >${data.companyName}</span> has been received and requires administrative approval.`;

    const arr = await postNotification({ clientType: "Admin" });
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
  /*-------------------------------------------------------------------------------------------------------------------------------- */

  const onSubmit = async (e) => {
    setLoaderBtn(true)

    try {
      //    if (submitted) {
      //   return;
      // }
      // setSubmitted(true);
      const companyid = window.localStorage.getItem("userId");

      let experience = `${experienceYear}Y ${experienceMonth}M`;
      let packages = `${packageMinimum}-${packageMaximum}`;
      const formData = new FormData();
      formData.append("jobTitle", jobTitle);
      formData.append("jobType", jobType);
      skills.forEach((skill) => formData.append("skills[]", skill));
      formData.append("experience", experience);
      formData.append("package", packages);
      formData.append("rewardType", rewardType);
      formData.append("earnPerClosure", earnPerClosure);
      formData.append("communication", communication);
      formData.append("location", location);
      formData.append("noticePeriod", noticePeriod);
      formData.append("jobDetailsFile", jobDetailsFile);
      formData.append("responsibilities", responsibilities);
      formData.append("qualifications", qualification);
      formData.append("benefits", benefits);
      formData.append("status", status);
      formData.append("Tech", Tech);
      formData.append("Currency", Currency);
      formData.append("format", format);
      let token = localStorage.getItem('token')
      const result = await fetch(`${baseUrl}/company/postJob/${companyid}`, {
        method: "PUT",
        body: formData,
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await result.json();
      if (!result.ok) {
        toast.error(data.message);
        throw new Error(data.message);
      }

      toast.success(data.message);

      let newData = {
        companyName: localStorage.getItem("companyName"),
        jobTitle: data.posts.jobTitle,
      };
      sendNotification(newData);

      setTimeout(() => {
        nav("/company/pendingapproval");
      }, 1000);
    }
    catch (error) {
      toast.error(error);
      setLoaderBtn(false)
    };
  };

  // console.log(skills);

  return (
    <div className="">
      <div className="flex justify-end gap-5 flex-wrap pb-4 border-b-2 border-black group">
        <div className="flex items-center gap-5">
          <h6 className="font-bold text-xl lg:text-2xl text-gray-700">
            Hi, {localStorage.getItem("companyName")}
          </h6>
          <div>
            <CompanyNotifications />
          </div>
        </div>
      </div>

      <div className="border-2 shadow-md rounded-md my-5 md:px-2 lg:px-4 xl:px-6 ">
        <div className="flex flex-col gap-5 p-5">
          <h6 className="font-medium text-[color:var(--blue)] text-xl lg:text-2xl lg:font-semibold xl:text-3xl mt-4 mb-6">
            Post new Job
          </h6>

          <div>
            <div className="flex flex-col">
              <form
                className="flex flex-col gap-4"
                // onSubmit={(e) => {
                //   handleSubmit(e);
                // }}
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex flex-col gap-1">
                  <label htmlFor="jobTitle" className="font-medium flex gap-1">
                    Job Title
                    {errors.jobTitle && (
                      <p className="text-red-500 text-2xl"> * </p>
                    )}
                  </label>
                  <input
                    {...register("jobTitle", { required: true })}
                    value={jobTitle}
                    onChange={(e) => {
                      setjobTitle(e.target.value);
                    }}
                    type="text"
                    placeholder="Type the job title"
                    id="jobTitle"
                    className="px-3 py-2 border rounded-md outline-none focus:ring-1"
                  />
                </div>

                {/* ----------------------------------------- */}

                <div className="flex flex-col gap-2">
                  <label className="font-medium">Job Type</label>
                  <Select
                    label="Job Type"
                    value={jobType}
                    onChange={handleChangeJOBTYPE}
                  >
                    <Option value="Full Time">Full Time</Option>
                    <Option value="Part Time">Part Time</Option>
                    <Option value="Internship">Internship</Option>
                  </Select>
                </div>

                {/* ----------------------------------------- */}

                <div className="flex flex-col gap-2">
                  <label className="font-medium">Job Category</label>
                  <Select label="Tech" value={Tech} onChange={handleChangeTech}>
                    <Option value="IT">IT </Option>
                    <Option value="non-IT">Non-IT</Option>
                  </Select>
                </div>

                {/* ----------------------------------------- */}

                <div className="flex flex-col gap-1">
                  <label htmlFor="skills" className="font-medium">
                    Skills
                  </label>
                  <input
                    type="text"
                    placeholder="add skill and enter"
                    id="skills"
                    className="px-3 py-2 border rounded-md outline-none focus:ring-1"
                    value={value}
                    onChange={saveSkills}
                  />
                  <button onClick={handleAddSkill} className="hidden">
                    Enter
                  </button>
                  <div className="flex flex-wrap my-2">
                    {skills?.map((skill, i) => (
                      <div
                        className="px-3 py-1 flex items-center gap-2 border border-gray-500 rounded-xl mr-2 mb-2"
                        key={i}
                      >
                        {skill}
                        <AiOutlineCloseCircle
                          className="cursor-pointer text-red-500"
                          onClick={(e) => handleRemoveSkill(e, i)}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* ----------------------------------------- */}

                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="experience"
                    className="font-medium flex gap-1"
                  >
                    Experience{" "}
                    {errors.experienceYear && (
                      <p className="text-red-500 text-2xl"> * </p>
                    )}
                    {errors.experienceMonth && (
                      <p className="text-red-500 text-2xl"> * </p>
                    )}
                  </label>
                  <div className="max-w-md grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      {...register("experienceYear", { required: true })}
                      value={experienceYear}
                      onChange={(e) => {
                        setExperienceYEAR(e.target.value);
                      }}
                      type="number"
                      placeholder="Year"
                      id="experience"
                      className="px-3 py-2 border max-w-sm rounded-md outline-none focus:ring-1"
                    />
                    <input
                      {...register("experienceMonth", { required: true })}
                      value={experienceMonth}
                      onChange={(e) => {
                        setExperienceMONTH(e.target.value);
                      }}
                      type="number"
                      placeholder="Month"
                      id="experience"
                      className="px-3 py-2 border max-w-sm rounded-md outline-none focus:ring-1"
                    />
                  </div>
                </div>

                {/* ----------------------------------------- */}

                <div className="flex flex-col gap-2">
                  <label className="font-medium">Currency</label>
                  <Select
                    label="Currency"
                    value={Currency}
                    onChange={handleChangeCurrency}
                  >
                    <Option value="₹">₹ Rupees</Option>
                    <Option value="$">$ Dollars</Option>
                    <Option value="€">€ Euros</Option>
                  </Select>
                </div>

                {/* ----------------------------------------- */}

                <div className="flex flex-col gap-2">
                  <label className="font-medium">Currency Format</label>
                  <Select
                    label="Currency format"
                    value={format}
                    onChange={handleChangeformat}
                  >
                    <Option value="k">Thousands</Option>
                    <Option value="Lacs">Lacks</Option>
                    <Option value="M">Millons</Option>
                    <Option value="Cr.">Crores</Option>
                  </Select>
                </div>

                {/* ----------------------------------------- */}

                <div className="flex flex-col gap-1">
                  <label htmlFor="currWork" className="font-medium flex gap-1">
                    Package
                    {errors.packageMinimum && (
                      <p className="text-red-500 text-2xl"> * </p>
                    )}
                    {errors.packageMaximum && (
                      <p className="text-red-500 text-2xl"> * </p>
                    )}
                  </label>
                  <div className="max-w-md grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      {...register("packageMinimum", { required: true })}
                      value={packageMinimum}
                      onChange={(e) => {
                        setPackageMINIMUM(e.target.value);
                      }}
                      type="number"
                      placeholder="minimum"
                      id="currWork"
                      className="px-3 py-2 border max-w-sm rounded-md outline-none focus:ring-1"
                    />
                    <input
                      {...register("packageMaximum", { required: true })}
                      value={packageMaximum}
                      onChange={(e) => {
                        setPackageMAXIMUM(e.target.value);
                      }}
                      type="number"
                      placeholder="maximum"
                      id="currWork"
                      className="px-3 py-2 border max-w-sm rounded-md outline-none focus:ring-1"
                    />
                  </div>
                </div>

                {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="ctc" className="font-medium">
                      Last / Current CTC
                    </label>
                    <input
                      type="text"
                      placeholder="CTC"
                      id="ctc"
                      className="px-3 py-2 border max-w-md rounded-md outline-none focus:ring-1"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="CTC" className="font-medium">
                      Expected CTC
                    </label>
                    <input
                      type="text"
                      placeholder="CTC"
                      id="CTC"
                      className="px-3 py-2 border max-w-md rounded-md outline-none focus:ring-1"
                    />
                  </div>
                </div> */}
                <div className="flex flex-col gap-2">
                  <label className="font-medium ">Reward Loyalty Type </label>
                  <Select
                    label="reward type"
                    value={rewardType}
                    onChange={handleChangeReward}
                  >
                    <Option value="Percentage">Percentage</Option>
                    <Option value="Money">Money</Option>
                  </Select>
                </div>

                {/* ----------------------------------------- */}

                <div className="flex flex-col gap-1">
                  <label htmlFor="closure" className="font-medium flex gap-1">
                    Earn Per Closure
                    {errors.earnPerClosure && (
                      <p className="text-red-500 text-2xl"> * </p>
                    )}
                  </label>
                  <input
                    {...register("earnPerClosure", { required: true })}
                    value={earnPerClosure}
                    onChange={(e) => {
                      setearnPerClosure(e.target.value);
                    }}
                    type="text"
                    placeholder="money or percentage"
                    id="closure"
                    className="px-3 py-2 border rounded-md outline-none focus:ring-1"
                  />
                </div>

                {/* ----------------------------------------- */}

                <div className="flex flex-col gap-2">
                  <label className="font-medium ">Communication </label>
                  <Select
                    label="communication medium"
                    value={communication}
                    onChange={handleChangeCommunication}
                  >
                    <Option value="Beginner">Beginner</Option>
                    <Option value="Intermediate">Intermediate</Option>
                    <Option value="Advanced">Advanced</Option>
                  </Select>
                </div>

                {/* ----------------------------------------- */}

                <div className="flex flex-col gap-1">
                  <label htmlFor="location" className="font-medium flex gap-1">
                    Location
                    {errors.location && (
                      <p className="text-red-500 text-2xl"> * </p>
                    )}
                  </label>
                  <input
                    {...register("location", { required: true })}
                    value={location}
                    onChange={(e) => {
                      setLocation(e.target.value);
                    }}
                    type="text"
                    placeholder="Delhi"
                    id="location"
                    className="px-3 py-2 border rounded-md outline-none focus:ring-1"
                  />
                </div>

                {/* ----------------------------------------- */}

                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="noticePeriod"
                    className="font-medium flex gap-1"
                  >
                    Notice Period
                    {errors.noticePeriod && (
                      <p className="text-red-500 text-2xl"> * </p>
                    )}
                  </label>
                  <input
                    {...register("noticePeriod", { required: true })}
                    value={noticePeriod}
                    onChange={(e) => {
                      setNoticePeriod(e.target.value);
                    }}
                    type="number"
                    placeholder="Number of days"
                    id="noticePeriod"
                    className="px-3 py-2 border rounded-md outline-none focus:ring-1"
                  />
                </div>

                {/* ----------------------------------------- */}

                <div className="flex flex-col gap-1">
                  <label htmlFor="resume" className="font-medium">
                    JD (Job Details)
                  </label>
                  <input
                    type="file"
                    placeholder="Choose CV"
                    id="resume"
                    className="hidden px-3 py-2 border max-w-md rounded-md outline-none focus:ring-1"
                    onChange={(e) => setjobDetailsFile(e.target.files[0])}
                  />
                  <label
                    htmlFor="resume"
                    className="px-3 py-2 border rounded-md flex justify-between items-center"
                  >
                    <p className="text-gray-400">
                      {jobDetailsFile
                        ? jobDetailsFile.name
                        : "Upload Job Description"}
                    </p>
                    <FiUpload className="text-[color:var(--blue)] cursor-pointer" />
                  </label>
                </div>

                {/* ----------------------------------------- */}

                <div className="flex flex-col gap-1 my-2">
                  <label htmlFor="responsibilities" className="font-medium">
                    Responsibilities
                  </label>
                  <JoditEditor
                    value={responsibilities}
                    ref={editor}
                    config={{
                      buttons: [
                        "bold",
                        "italic",
                        "link",
                        "ul",
                        "strikethrough",
                        "superscript",
                        "ol",
                      ],
                      askBeforePasteHTML: false,
                      defaultActionOnPaste: "insert_only_text",
                    }}
                    // tabIndex={1} // tabIndex of textarea
                    onBlur={(newContent) => setResponsibilities(newContent)} // preferred to use only this option to update the content for performance reasons
                  // onChange={(newContent) => setResponsibilities(newContent)}
                  />
                </div>

                {/* ----------------------------------------- */}

                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="qualifications"
                    className="font-medium flex gap-1"
                  >
                    Qualifications
                    {errors.qualification && (
                      <p className="text-red-500 text-2xl"> * </p>
                    )}
                  </label>
                  <input
                    {...register("qualification", { required: true })}
                    value={qualification}
                    onChange={(e) => {
                      setQualification(e.target.value);
                    }}
                    type="text"
                    rows={6}
                    placeholder="Your Qualifications"
                    id="qualifications"
                    className="px-3 py-2 border max-w-3xl rounded-md outline-none focus:ring-1"
                  />
                </div>

                {/* ----------------------------------------- */}

                <div className="flex flex-col gap-1 my-2">
                  <label htmlFor="benefits" className="font-medium">
                    Benefits
                  </label>
                  <JoditEditor
                    ref={editor}
                    value={benefits}
                    config={{
                      buttons: [
                        "bold",
                        "italic",
                        "link",
                        "ul",
                        "strikethrough",
                        "superscript",
                        "ol",
                      ],
                      askBeforePasteHTML: false,
                      defaultActionOnPaste: "insert_only_text",
                    }}
                    // tabIndex={1} // tabIndex of textarea
                    onBlur={(newContent) => setBenefits(newContent)} // preferred to use only this option to update the content for performance reasons
                  // onChange={(newContent) => setBenefits(newContent)}
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

                    <div className="text-white flex justify-end gap-5 mt-10">
                      <button
                        className="bg-[color:var(--blue)] px-5 lg:px-7 py-2 rounded-md font-semibold lg:text-xl"
                        type="submit"
                      >
                        Post Job
                      </button>
                    </div>
                }

              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddNewJob;
