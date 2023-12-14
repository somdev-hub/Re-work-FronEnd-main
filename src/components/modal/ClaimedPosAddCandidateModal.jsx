import { Modal, useMantineTheme } from '@mantine/core';
import { ref, set } from 'firebase/database';
import mongoose from 'mongoose';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { FiUpload } from 'react-icons/fi';
import { ThreeDots } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { baseUrl } from '../../baseUrl';
import { database } from '../../Firebase';
import '../../hook/ErrorValidation.css';
const ClaimedPosAddCandidateModal = ({ modelOpened, setModelOpened, data }) => {
	const theme = useMantineTheme();

	const [count, setCount] = useState(1);
	const [resume, setResume] = useState();
	const [additionalFile, setAdditionalFile] = useState();
	const [relocate, setRelocate] = useState(false);
	const [noticePeriod1, setNoticePeriod1] = useState(false);

	const [loaderBtn, setLoaderBtn] = useState(false);

	// const [experienceYear, setExperienceYear] = useState('');
	// const [experienceMonth, setExperienceMonth] = useState('');
	// const [currentWorkingMonth, setCurrentWorkingMonth] = useState('');
	// const [currentWorkingYear, setCurrentWorkingYear] = useState('');
	const nav = useNavigate();
	// const {
	// 	value: name,
	// 	hasError: nameHasError,
	// 	isValid: nameIsValid,
	// 	valueChangeHandler: nameChangeHandler,
	// 	reset: nameResetInput,
	// 	inputBlurHandler: nameInputBlurHandler,
	// } = useInput((value) => value.trim() !== '');

	// const {
	// 	value: email,
	// 	hasError: emailHasError,
	// 	isValid: emailIsValid,
	// 	valueChangeHandler: emailChangeHandler,
	// 	reset: emailResetInput,
	// 	inputBlurHandler: emailInputBlurHandler,
	// } = useInput((value) => {
	// 	if (validator.isEmail(value)) {
	// 		return true;
	// 	} else {
	// 		return false;
	// 	}
	// });

	// const {
	// 	value: phoneNumber,
	// 	hasError: phoneNumberHasError,
	// 	isValid: phoneNumberIsValid,
	// 	valueChangeHandler: phoneNumberChangeHandler,
	// 	reset: phoneNumberResetInput,
	// 	inputBlurHandler: phoneNumberInputBlurHandler,
	// } = useInput((value) => value.trim() !== '');

	// const {
	// 	value: last_or_current_ctc,
	// 	hasError: last_or_current_ctcHasError,
	// 	isValid: last_or_current_ctcIsValid,
	// 	valueChangeHandler: last_or_current_ctcChangeHandler,
	// 	reset: last_or_current_ctcResetInput,
	// 	inputBlurHandler: last_or_current_ctcInputBlurHandler,
	// } = useInput((value) => value.trim() !== '');

	// const {
	// 	value: expected_ctc,
	// 	hasError: expected_ctcHasError,
	// 	isValid: expected_ctcIsValid,
	// 	valueChangeHandler: expected_ctcChangeHandler,
	// 	reset: expected_ctcResetInput,
	// 	inputBlurHandler: expected_ctcInputBlurHandler,
	// } = useInput((value) => value.trim() !== '');

	// const {
	// 	value: noticePeriod,
	// 	hasError: noticePeriodHasError,
	// 	isValid: noticePeriodIsValid,
	// 	valueChangeHandler: noticePeriodChangeHandler,
	// 	reset: noticePeriodResetInput,
	// 	inputBlurHandler: noticePeriodInputBlurHandler,
	// } = useInput((value) => value.trim() !== '');

	// const {
	// 	value: lastWorkingDay,
	// 	hasError: lastWorkingDayHasError,
	// 	isValid: lastWorkingDayIsValid,
	// 	valueChangeHandler: lastWorkingDayChangeHandler,
	// 	reset: lastWorkingDayResetInput,
	// 	inputBlurHandler: lastWorkingDayInputBlurHandler,
	// } = useInput((value) => value.trim() !== '');

	// const {
	// 	value: currentLocation,
	// 	hasError: currentLocationHasError,
	// 	isValid: currentLocationIsValid,
	// 	valueChangeHandler: currentLocationChangeHandler,
	// 	reset: currentLocationResetInput,
	// 	inputBlurHandler: currentLocationInputBlurHandler,
	// } = useInput((value) => value.trim() !== '');

	// const {
	// 	value: remarks,
	// 	hasError: remarksHasError,
	// 	isValid: remarksIsValid,
	// 	valueChangeHandler: remarksChangeHandler,
	// 	reset: remarksResetInput,
	// 	inputBlurHandler: remarksInputBlurHandler,
	// } = useInput((value) => value.trim() !== '');

	/*----------------------------fetch users id-------------------------------------------------------------------------- */
	const postNotification = async (data) => {
		try {
			let token = localStorage.getItem('token');
			const res = await fetch(`${baseUrl}/admin/sendNotifications`, {
				method: 'post',
				headers: {
					'Content-type': 'application/json',
					Authorization: `Bearer ${token}`,
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

		let notificationTitle = 'New Candidate';
		let notificationBody = `A new candidate's application has been received by <span className= text-green-500 >${data.recruiterId}</span> for
                             <span className= text-green-500> ${data.jobTitle}</span>, 
                               requires admin approval.`;

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

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const [submitted, setSubmitted] = useState(false);

	const formHandler = async (d) => {
		// if (submitted) {
		// 	return;
		// }
		// setSubmitted(true);
		console.log('hello');

		try {
			setLoaderBtn(true);

			let experience = `${d.experienceYear}Y ${d.experienceMonth}M`;
			let currentWorking = `${d.currentWorkingYear}Y ${d.currentWorkingMonth}M`;
			const formData = new FormData();
			formData.append('name', d.name);
			formData.append('email', d.email);
			formData.append('phoneNumber', d.phoneNumber);
			formData.append('experience', experience);
			formData.append('currentWorking', currentWorking);
			formData.append('last_or_current_ctc', d.last_or_current_ctc);
			formData.append('expected_ctc', d.expected_ctc);
			formData.append('noticePeriod', d.noticePeriod);
			formData.append('lastWorkingDay', d.lastWorkingDay);
			formData.append('currentLocation', d.currentLocation);
			formData.append('readyToRelocate', relocate);
			formData.append('noticePeriodBuyoutAvailable', noticePeriod1);
			formData.append('resume', resume);
			formData.append('additionalFiles', additionalFile);
			formData.append('additionalLinks', count);
			formData.append('remarks', d.remarks);
			// const candidateData = {
			// 	name: d.name,
			// 	email: d.email,
			// 	phoneNumber: d.phoneNumber,
			// 	experience: experience,
			// 	currentWorking: currentWorking,
			// 	last_or_current_ctc: d.last_or_current_ctc,
			// 	expected_ctc: d.expected_ctc,
			// 	noticePeriod: d.noticePeriod,
			// 	lastWorkingDay: d.lastWorkingDay,
			// 	currentLocation: d.currentLocation,
			// 	remarks: d.remarks,
			// 	readyToRelocate: relocate,
			// 	noticePeriodBuyoutAvailable: noticePeriod1,
			// 	resume: resume,
			// 	additionalFiles: additionalFile,
			// 	additionalLinks: count,
			// };

			// console.log(candidateData);

			// console.log("name", name);
			let token = localStorage.getItem('token');
			const result = await fetch(
				`${baseUrl}/recruiter/addCandidate/${data._id}/${localStorage.getItem('userId')}`,
				{
					method: 'post',
					body: formData,
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			const jsonData = await result.json();
			console.log(jsonData);
			if (!result.ok) {
				setLoaderBtn(false);
				toast.error(jsonData.message);
				throw new Error(jsonData.message);
			}

			toast.success(jsonData.message);
			let newdata = {
				jobTitle: data.jobTitle,
				recruiterId: localStorage.getItem('userId'),
			};

			// setLoaderBtn(false)

			sendNotification(newdata);
			// setTimeout(() => {
			// 	setModelOpened(false);
			// 	setLoaderBtn(false)
			// 	nav('/recruiter/claimedpositions');
			// }, 2000);
			setSubmitted(false);
			setModelOpened(false);
			nav('/recruiter/claimedpositions');
			setLoaderBtn(false);
			reset();
			setResume('');
			setAdditionalFile('');
		} catch (error) {
			toast(error);
			setLoaderBtn(false);
		}
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
					onClick={() => setModelOpened(false)}>
					<AiOutlineCloseCircle className=" text-lg md:text-xl text-red-500" />
					<span className="text-sm md:font-semibold text-red-500">Close</span>
				</div>

				<h2 className="text-[color:var(--blue)] text-xl md:text-2xl font-bold pb-4">
					Add Candidate
				</h2>

				<h4 className="font-medium text-xl mb-5">Role - {data.jobTitle}</h4>

				<div className="border-2">
					<div className="flex flex-col p-5 lg:p-8 xl:px-10">
						<form className="flex flex-col gap-4" onSubmit={handleSubmit(formHandler)}>
							<div className="flex flex-col gap-1">
								<label htmlFor="name" className="font-medium">
									Name
								</label>
								<input
									// value={name}
									type="text"
									placeholder="Aman Garg"
									id="name"
									{...register('name', { required: '*Name is required.' })}
									className={`px-3 py-2 border max-w-md rounded-md outline-none   focus:border-blue-500 ${
										errors.name && 'focus:border-red-600'
									}`}
								/>
								{errors.name && <p className="error-text">{errors.name?.message}</p>}
							</div>

							<div className="flex flex-col gap-1">
								<label htmlFor="email" className="font-medium">
									Email
								</label>
								<input
									// value={email}
									type="text"
									placeholder="name@gmail.com"
									id="email"
									{...register('email', {
										required: 'Email Address is required',
										pattern: {
											value: /.+@.+\..+/i,
											message: '*Email address is invalid.',
										},
									})}
									className={`px-3 py-2 border max-w-md rounded-md outline-none   focus:border-blue-500 ${
										errors.email && 'focus:border-red-600'
									}`}
								/>
								{errors.email && <p className="error-text">{errors.email?.message}</p>}
							</div>

							<div className="flex flex-col gap-1">
								<label htmlFor="phone" className="font-medium">
									Phone Number
								</label>
								<input
									type="text"
									placeholder="1234567890"
									id="phone"
									{...register('phoneNumber', { required: '*Phone Number is required.' })}
									className={`px-3 py-2 border max-w-md rounded-md outline-none   focus:border-blue-500 ${
										errors.phoneNumber && 'focus:border-red-600'
									}`}
								/>
								{errors.phoneNumber && <p className="error-text">{errors.phoneNumber?.message}</p>}
							</div>

							<div className="flex flex-col gap-1">
								<label htmlFor="experience" className="font-medium">
									Experience
								</label>
								<div className="max-w-md grid grid-cols-1 sm:grid-cols-2 gap-4">
									<div>
										<input
											// value={experienceYear}
											{...register('experienceYear', { required: '*Experience Year is required.' })}
											className={`px-3 py-2 border max-w-md rounded-md outline-none   focus:border-blue-500 ${
												errors.experienceYear && 'focus:border-red-600'
											}`}
											type="text"
											placeholder="YY"
											id="experience"
										/>
										{errors.experienceYear && (
											<p className="error-text">{errors.experienceYear?.message}</p>
										)}
									</div>
									<div>
										<input
											type="text"
											// value={experienceMonth}
											{...register('experienceMonth', {
												required: '*Experience Month is required.',
											})}
											className={`px-3 py-2 border max-w-md rounded-md outline-none   focus:border-blue-500 ${
												errors.experienceYear && 'focus:border-red-600'
											}`}
											placeholder="MM"
											id="experience"
										/>
										{errors.experienceMonth && (
											<p className="error-text">{errors.experienceMonth?.message}</p>
										)}
									</div>
								</div>
							</div>

							<div className="flex flex-col gap-1">
								<label htmlFor="currWork" className="font-medium">
									Currently Working
								</label>
								<div className="max-w-md grid grid-cols-1 sm:grid-cols-2 gap-4">
									<div>
										<input
											type="text"
											// value={currentWorkingYear}
											{...register('currentWorkingYear', {
												required: '*Current Working Year is required.',
											})}
											placeholder="YY"
											id="currWork"
											className={`px-3 py-2 border max-w-md rounded-md outline-none   focus:border-blue-500 ${
												errors.currentWorkingYear && 'focus:border-red-600'
											}`}
										/>
										{errors.currentWorkingYear && (
											<p className="error-text">{errors.currentWorkingYear?.message}</p>
										)}
									</div>
									<div>
										<input
											type="text"
											// value={currentWorkingMonth}
											{...register('currentWorkingMonth', {
												required: '*Current Working Month is required.',
											})}
											placeholder="MM"
											id="currWork"
											className={`px-3 py-2 border max-w-md rounded-md outline-none   focus:border-blue-500 ${
												errors.currentWorkingMonth && 'focus:border-red-600'
											}`}
										/>
										{errors.currentWorkingMonth && (
											<p className="error-text">{errors.currentWorkingMonth?.message}</p>
										)}
									</div>
								</div>
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<div className="flex flex-col gap-1">
									<label htmlFor="ctc" className="font-medium">
										Last / Current CTC
									</label>
									<input
										type="text"
										{...register('last_or_current_ctc', {
											required: '*Last / Current CTC is required.',
										})}
										placeholder="CTC"
										id="ctc"
										className={`px-3 py-2 border max-w-md rounded-md outline-none   focus:border-blue-500 ${
											errors.last_or_current_ctc && 'focus:border-red-600'
										}`}
									/>
									{errors.last_or_current_ctc && (
										<p className="error-text">{errors.last_or_current_ctc?.message}</p>
									)}
								</div>
								<div className="flex flex-col gap-1">
									<label htmlFor="CTC" className="font-medium">
										Expected CTC
									</label>
									<input
										type="text"
										// value={expected_ctc}
										{...register('expected_ctc', {
											required: '*Expected CTC is required.',
										})}
										placeholder="CTC"
										id="CTC"
										className={`px-3 py-2 border max-w-md rounded-md outline-none   focus:border-blue-500 ${
											errors.expected_ctc && 'focus:border-red-600'
										}`}
									/>
									{errors.expected_ctc && (
										<p className="error-text">{errors.expected_ctc?.message}</p>
									)}
								</div>
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<div className="flex flex-col gap-1">
									<label htmlFor="noticePeriod" className="font-medium">
										Notice Period
									</label>
									<input
										type="text"
										// value={noticePeriod}
										{...register('noticePeriod', {
											required: '*Notice Period is required.',
										})}
										placeholder="Ex. 30 days"
										id="noticePeriod"
										className={`px-3 py-2 border max-w-md rounded-md outline-none   focus:border-blue-500 ${
											errors.noticePeriod && 'focus:border-red-600'
										}`}
									/>
									{errors.noticePeriod && (
										<p className="error-text">{errors.noticePeriod?.message}</p>
									)}
								</div>
								<div className="flex flex-col gap-1">
									<label htmlFor="lwd" className="font-medium">
										Last Working Day (LWD)
									</label>
									<input
										type="text"
										// value={lastWorkingDay}
										{...register('lastWorkingDay', {
											required: '*Last Working Day is required.',
										})}
										placeholder="01-11-2022"
										id="lwd"
										className={`px-3 py-2 border max-w-md rounded-md outline-none   focus:border-blue-500 ${
											errors.lastWorkingDay && 'focus:border-red-600'
										}`}
									/>
									{errors.lastWorkingDay && (
										<p className="error-text">{errors.lastWorkingDay?.message}</p>
									)}
								</div>
							</div>

							<div className="flex flex-col gap-1">
								<label htmlFor="location" className="font-medium">
									Current Location
								</label>
								<input
									type="text"
									// value={currentLocation}
									{...register('currentLocation', {
										required: '*Current Location is required.',
									})}
									placeholder="Delhi"
									id="location"
									className={`px-3 py-2 border max-w-md rounded-md outline-none   focus:border-blue-500 ${
										errors.currentLocation && 'focus:border-red-600'
									}`}
								/>
								{errors.currentLocation && (
									<p className="error-text">{errors.currentLocation?.message}</p>
								)}
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<div className="flex flex-col gap-1">
									<label htmlFor="relocation" className="font-medium">
										Ready to Relocate?
									</label>
									<div className="flex gap-5 items-center">
										<div
											className={`flex-1 px-5 py-2 border rounded-md flex justify-center items-center ${
												relocate && 'bg-[color:var(--blue)] text-white'
											} `}
											onClick={() => setRelocate(true)}>
											Yes
										</div>
										<div
											className={`flex-1 px-5 py-2 border rounded-md flex justify-center items-center ${
												!relocate && 'bg-[color:var(--blue)] text-white'
											} `}
											onClick={() => setRelocate(false)}>
											No
										</div>
									</div>
								</div>
								<div className="flex flex-col gap-1">
									<label htmlFor="npba" className="font-medium">
										Notice Period buyout available?
									</label>
									<div className="flex gap-5 items-center">
										<div
											className={`flex-1 px-5 py-2 border rounded-md flex justify-center items-center ${
												noticePeriod1 && 'bg-[color:var(--blue)] text-white'
											} `}
											onClick={() => setNoticePeriod1(true)}>
											Yes
										</div>
										<div
											className={`flex-1 px-5 py-2 border rounded-md flex justify-center items-center ${
												!noticePeriod1 && 'bg-[color:var(--blue)] text-white'
											} `}
											onClick={() => setNoticePeriod1(false)}>
											No
										</div>
									</div>
								</div>
							</div>

							<div className="flex flex-col gap-1">
								<label htmlFor="resume" className="font-medium">
									Upload Resume
								</label>
								<input
									type="file"
									placeholder="Choose CV"
									id="resume"
									{...register('resume', {
										required: '*Upload Resume is required.',
									})}
									className="hidden px-3 py-2 border max-w-md rounded-md outline-none focus:ring-1"
									onChange={(event) => setResume(event.target.files[0])}
								/>
								<label
									htmlFor="resume"
									className="px-3 py-2 border max-w-md rounded-md flex justify-between items-center">
									<p className="text-gray-400">{resume ? resume.name : 'Choose CV'}</p>
									<FiUpload className="text-[color:var(--blue)]" />
								</label>
								{errors.resume && (
									<p className="error-text">{errors.resume?.message}</p>
								)}
							</div>

							<div className="flex flex-col gap-1">
								<label htmlFor="additionalfiles" className="font-medium">
									Additional Files
								</label>
								<input
									type="file"
									placeholder="Choose Files"
									{...register('additionalFiles')}
									id="additionalfiles"
									className="hidden px-3 py-2 border max-w-md rounded-md outline-none focus:ring-1"
									onChange={(event) => setAdditionalFile(event.target.files[0])}
								/>
								<label
									htmlFor="additionalfiles"
									className="px-3 py-2 border max-w-md rounded-md flex justify-between items-center">
									<p className="text-gray-400">
										{additionalFile ? additionalFile.name : 'Choose File'}
									</p>
									<FiUpload className="text-[color:var(--blue)]" />
								</label>
							</div>

							<div className="flex flex-col gap-1">
								<label htmlFor="links" className="font-medium">
									Additional Links
								</label>

								{[...Array(count)].map((_, i) => (
									<input
										key={i}
										type="text"
										placeholder="Links"
										id="links"
										className="px-3 py-2 border max-w-md rounded-md outline-none focus:ring-1"
									/>
								))}
								<button
									onClick={(e) => {
										e.preventDefault();
										setCount(count + 1);
									}}
									className="text-[color:var(--blue)] underline max-w-md text-end">
									Add more links
								</button>
							</div>

							<div className="flex flex-col gap-1">
								<label htmlFor="remarks" className="font-medium">
									Remarks
								</label>
								<textarea
									type="text"
									// value={remarks}
									{...register('remarks')}
									className={`px-3 py-2 border max-w-md rounded-md outline-none   focus:border-blue-500 ${
										errors.remarks && 'focus:border-red-600'
									}`}
									rows={6}
									placeholder="Write remarks here..."
									id="remarks"
								/>
								{/* {errors.remarks && <p className="error-text">{errors.remarks?.message}</p>} */}
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
										className="bg-[color:var(--blue)] px-3 py-2 rounded-md font-semibold lg:text-xl"
										type="submit">
										Submit Candidate
									</button>
								)}
								{/* <button 
									className="bg-[color:var(--blue)] px-3 py-2 rounded-md 
									font-semibold lg:text-xl"
									type="submit">
									Submit Candidate
								</button> */}
							</div>
						</form>
					</div>
				</div>
			</div>
			<ToastContainer />
		</Modal>
	);
};

export default ClaimedPosAddCandidateModal;
