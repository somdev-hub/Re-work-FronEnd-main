import { Modal, useMantineTheme } from '@mantine/core';
import { Option, Select } from '@material-tailwind/react';
import { ref, set } from 'firebase/database';
import JoditEditor from 'jodit-react';
import mongoose from 'mongoose';
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { FiUpload } from 'react-icons/fi';
import { ThreeDots } from 'react-loader-spinner';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { baseUrl } from '../../baseUrl';
import { database } from '../../Firebase';
import { counterActions } from '../../store/index-redux';

const PendingApprovalEdit = ({ modelOpened, setModelOpened, data }) => {
	const theme = useMantineTheme();
	const nav = useNavigate();
	const editor = useRef(null);
	const [jobDetailsFile, setjobDetailsFile] = useState();
	const [skills, setSkills] = useState([]);
	const [value, setValue] = useState();
	const [jobTitle, setjobTitle] = useState();
	const [jobType, setJobType] = useState();
	const [experienceYear, setExperienceYEAR] = useState();
	const [experienceMonth, setExperienceMONTH] = useState();
	const [packageMinimum, setPackageMINIMUM] = useState();
	const [packageMaximum, setPackageMAXIMUM] = useState();
	const [earnPerClosure, setearnPerClosure] = useState();
	const [noticePeriod, setNoticePeriod] = useState();
	const [location, setLocation] = useState();
	const [communication, setCommunication] = useState();
	const [qualifications, setQualification] = useState();
	const [status] = useState('company_addJobs_fress');
	const [rewardType, setRewardType] = useState();
	const [responsibilities, setResponsibilities] = useState();
	const [benefits, setBenefits] = useState();
	const [Tech, setTech] = useState();
	const [Currency, setCurrency] = useState();
	const [format, setformat] = useState();
	const [companyid, setcompanyid] = useState();
	const [loaderBtn, setLoaderBtn] = useState(false);
	const dispatch = useDispatch();

	const pendingJobEditRenderFunc = () => {
		dispatch(counterActions.companyPendingJobEdit());
	};

	useEffect(() => {
		if (data) {
			setjobDetailsFile(data.jobDetailsFile);
			setSkills(data.skills);
			setValue(data.value);
			setjobTitle(data.jobTitle);
			setJobType(data.jobType);

			let ab = data.experience;
			function splitMulti(str, tokens) {
				var tempChar = tokens[0];
				for (var i = 1; i < tokens.length; i++) {
					str = str.split(tokens[i]).join(tempChar);
				}
				str = str.split(tempChar);
				return str;
			}

			let ba = splitMulti(ab, ['Y', 'M', ' ']);
			// console.log(ba);

			setExperienceYEAR(ba[0]);
			setExperienceMONTH(ba[2]);

			let a = data.package;
			let b = a.split('-');

			setPackageMINIMUM(b[0]);
			setPackageMAXIMUM(b[1]);

			// setExperienceYEAR(data.experienceYear);
			// setExperienceMONTH(data.experienceMonth);

			// setPackageMINIMUM(data.packageMinimum);
			// setPackageMAXIMUM(data.packageMaximum);

			setearnPerClosure(data.earnPerClosure);
			setNoticePeriod(data.noticePeriod);
			setLocation(data.location);
			setCommunication(data.communication);
			setQualification(data.qualifications);
			setRewardType(data.rewardType);
			setResponsibilities(data.responsibilities);
			setBenefits(data.benefits);
			setTech(data.Tech);
			setCurrency(data.Currency);
			setformat(data.format);
			setcompanyid(data._id);
		}
	}, [data]);

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
		setValue('');
	};
	const handleRemoveSkill = (e, index) => {
		e.preventDefault();

		const copySkills = [...skills];
		copySkills.splice(index, 1);
		setSkills(copySkills);
	};

	let token = localStorage.getItem('token');
	const postNotification = async (data) => {
		try {
			const res = await fetch(`${baseUrl}/admin/sendNotifications`, {
				method: 'post',
				headers: {
					'Content-type': 'application/json',
					Authrization: `Bearer ${token}`,
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

		let notificationTitle = ' Updated Job';
		let notificationBody = `A <span className= text-green-500> ${data.jobTitle}</span> job at <span className= text-green-500 >${data.companyName}</span> has been updated and requires administrative approval.`;

		const arr = await postNotification({ clientType: 'Admin' });
		// console.log(arr);
		arr?.forEach((element) => {
			set(ref(database, 'users/' + element + `/${id}`), {
				title: notificationTitle,
				body: notificationBody,
				receivedAt: Date.now(),
				seen: false,
			});
		});
	};
	let handleSubmit = (e) => {
		e.preventDefault();
		let experience = `${experienceYear}Y ${experienceMonth}M`;
		let packages = `${packageMinimum}-${packageMaximum}`;
		let formData = new FormData();
		formData.append('jobTitle', jobTitle);
		formData.append('jobType', jobType);
		// formData.append("skills", skills);
		skills.forEach((skill) => formData.append('skills[]', skill));
		formData.append('experience', experience);
		formData.append('package', packages);
		formData.append('rewardType', rewardType);
		formData.append('earnPerClosure', earnPerClosure);
		formData.append('communication', communication);
		formData.append('location', location);
		formData.append('noticePeriod', noticePeriod);
		formData.append('jobDetailsFile', jobDetailsFile);
		formData.append('responsibilities', responsibilities);
		formData.append('qualifications', qualifications);
		formData.append('benefits', benefits);
		formData.append('status', status);
		formData.append('Tech', Tech);
		formData.append('Currency', Currency);
		formData.append('format', format);

		setLoaderBtn(true);

		fetch(`${baseUrl}/company/postJobUpdate/${companyid}`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: formData,
		})
			.then((res) => res.json())
			.then((data) => {
				pendingJobEditRenderFunc();
				// toast(data.message);
				let newData = {
					companyName: localStorage.getItem('companyName'),
					jobTitle: data.jobTitle,
				};
				sendNotification(newData);

				setTimeout(async () => {
					await setModelOpened(false);
					toast.success('Successfully Updated');
				}, 2000);

				setTimeout(() => {
					nav('/company/pendingapproval');
				}, 1000);
				setLoaderBtn(false);
			});
	};

	return (
		<Modal
			overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
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
			transitionTimingFunction="ease">
			<div className="md:px-10">
				<div
					className="absolute top-2 right-2 cursor-pointer flex flex-col items-center"
					onClick={() => setModelOpened(false)}
				>
					<AiOutlineCloseCircle className=" text-lg md:text-xl text-red-500" />
					<span className=" text-sm md:font-semibold text-red-500">Close</span>
				</div>

				<h2 className="text-[color:var(--blue)] text-xl md:text-2xl font-bold pb-4">Edit Job</h2>

				{/* <h4 className="font-medium text-xl mb-5">Role - job title</h4> */}

				<div className="border-2">
					<div className="flex flex-col p-5 lg:p-8 xl:px-10">
						<div>
							<div className="flex flex-col">
								<form
									enctype="multipart/form-data"
									className="flex flex-col gap-4"
									onSubmit={(e) => {
										handleSubmit(e);
									}}>
									<div className="flex flex-col gap-1">
										<label htmlFor="jobTitle" className="font-medium">
											Job Title
										</label>
										<input
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

									<div className="flex flex-col gap-2">
										<label className="font-medium">Job Type</label>
										<Select label="Job Type" value={jobType} onChange={handleChangeJOBTYPE}>
											<Option value="Full Time">Full Time</Option>
											<Option value="Part Time">Part Time</Option>
											<Option value="Internship">Internship</Option>
										</Select>
									</div>

									{/* ----------------------------------------- */}

									<div className="flex flex-col gap-2">
										<label className="font-medium">Job Tech</label>
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
													key={i}>
													{skill}
													<AiOutlineCloseCircle
														className="cursor-pointer text-red-500"
														onClick={(e) => handleRemoveSkill(e, i)}
													/>
												</div>
											))}
										</div>
									</div>

									<div className="flex flex-col gap-1">
										<label htmlFor="experience" className="font-medium">
											Experience
										</label>
										<div className="max-w-md grid grid-cols-1 sm:grid-cols-2 gap-4">
											<input
												value={experienceYear}
												onChange={(e) => {
													setExperienceYEAR(e.target.value);
												}}
												type="text"
												placeholder="Year"
												id="experience"
												className="px-3 py-2 border max-w-sm rounded-md outline-none focus:ring-1"
											/>
											<input
												value={experienceMonth}
												onChange={(e) => {
													setExperienceMONTH(e.target.value);
												}}
												type="text"
												placeholder="Month"
												id="experience"
												className="px-3 py-2 border max-w-sm rounded-md outline-none focus:ring-1"
											/>
										</div>
									</div>

									{/* ----------------------------------------- */}

									<div className="flex flex-col gap-2">
										<label className="font-medium">Currency</label>
										<Select label="Currency" value={Currency} onChange={handleChangeCurrency}>
											<Option value="₹">₹ Rupees</Option>
											<Option value="$">$ Dollars</Option>
											<Option value="€">€ Euros</Option>
										</Select>
									</div>

									{/* ----------------------------------------- */}

									<div className="flex flex-col gap-2">
										<label className="font-medium">Currency Format</label>
										<Select label="Currency format" value={format} onChange={handleChangeformat}>
											<Option value="k">Thousands</Option>
											<Option value="Lacs">Lacks</Option>
											<Option value="M">Millons</Option>
											<Option value="Cr.">Crores</Option>
										</Select>
									</div>

									{/* ----------------------------------------- */}

									<div className="flex flex-col gap-1">
										<label htmlFor="currWork" className="font-medium">
											Package
											{/* <span className="text-[color:var(--blue)]">(₹)</span> */}
										</label>
										<div className="max-w-md grid grid-cols-1 sm:grid-cols-2 gap-4">
											<input
												value={packageMinimum}
												onChange={(e) => {
													setPackageMINIMUM(e.target.value);
												}}
												type="text"
												placeholder="minimum"
												id="currWork"
												className="px-3 py-2 border max-w-sm rounded-md outline-none focus:ring-1"
											/>
											<input
												value={packageMaximum}
												onChange={(e) => {
													setPackageMAXIMUM(e.target.value);
												}}
												type="text"
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
										<label className="font-medium">Reward Loyalty Type</label>
										<Select label="reward type" value={rewardType} onChange={handleChangeReward}>
											<Option value="Percentage">Percentage</Option>
											<Option value="Money">Money</Option>
										</Select>
									</div>

									<div className="flex flex-col gap-1">
										<label htmlFor="closure" className="font-medium">
											Earn Per Closure
										</label>
										<input
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

									<div className="flex flex-col gap-2">
										<label className="font-medium">Communication</label>
										<Select
											label="communication medium"
											value={communication}
											onChange={handleChangeCommunication}>
											<Option value="Beginner">Beginner</Option>
											<Option value="Intermediate">Intermediate</Option>
											<Option value="Advanced">Advanced</Option>
										</Select>
									</div>

									<div className="flex flex-col gap-1">
										<label htmlFor="location" className="font-medium">
											Location
										</label>
										<input
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

									<div className="flex flex-col gap-1">
										<label htmlFor="noticePeriod" className="font-medium">
											Notice Period
										</label>
										<input
											value={noticePeriod}
											onChange={(e) => {
												setNoticePeriod(e.target.value);
											}}
											type="text"
											placeholder="Number of days"
											id="noticePeriod"
											className="px-3 py-2 border rounded-md outline-none focus:ring-1"
										/>
									</div>

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
											className="px-3 py-2 border rounded-md flex justify-between items-center">
											<p className="text-gray-400">
												{jobDetailsFile ? jobDetailsFile.name : 'Upload Job Description'}
											</p>
											<FiUpload className="text-[color:var(--blue)] cursor-pointer" />
										</label>
									</div>

									<div className="flex flex-col gap-1 my-2">
										<label htmlFor="qualifications" className="font-medium">
											Responsibilities
										</label>
										<JoditEditor
											ref={editor}
											value={responsibilities}
											config={{
												buttons: [
													'bold',
													'italic',
													'link',
													'ul',
													'strikethrough',
													'superscript',
													'ol',
												],
												askBeforePasteHTML: false,
												defaultActionOnPaste: 'insert_only_text',
											}}
											// tabIndex={1} // tabIndex of textarea
											onBlur={(newContent) => setResponsibilities(newContent)} // preferred to use only this option to update the content for performance reasons
										// onChange={(newContent) => setResponsibilities(newContent)}
										/>
									</div>

									<div className="flex flex-col gap-1">
										<label htmlFor="qualifications" className="font-medium">
											qualifications
										</label>
										<input
											value={qualifications}
											onChange={(e) => {
												setQualification(e.target.value);
											}}
											type="text"
											rows={6}
											placeholder="Your qualifications"
											id="qualifications"
											className="px-3 py-2 border max-w-3xl rounded-md outline-none focus:ring-1"
										/>
									</div>

									<div className="flex flex-col gap-1 my-2">
										<label htmlFor="benefits" className="font-medium">
											Benefits
										</label>
										<JoditEditor
											ref={editor}
											value={benefits}
											config={{
												buttons: [
													'bold',
													'italic',
													'link',
													'ul',
													'strikethrough',
													'superscript',
													'ol',
												],
												askBeforePasteHTML: false,
												defaultActionOnPaste: 'insert_only_text',
											}}
											// tabIndex={1} // tabIndex of textarea
											onBlur={(newContent) => setBenefits(newContent)} // preferred to use only this option to update the content for performance reasons
										// onChange={(newContent) => setBenefits(newContent)}
										/>
									</div>

									<div className="text-white flex justify-end gap-5 mt-10">
										{loaderBtn ? (
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
										) : (
											<button
												className="bg-[color:var(--blue)] px-5 lg:px-7 py-2 rounded-md font-semibold lg:text-xl"
												type="submit">
												Update Job
											</button>
										)}
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
				<ToastContainer />
			</div>
		</Modal>
	);
};

export default PendingApprovalEdit;
