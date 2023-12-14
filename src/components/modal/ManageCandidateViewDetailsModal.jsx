import { Modal, useMantineTheme } from '@mantine/core';
import React from 'react';
import { AiOutlineCloseCircle, AiOutlineFileText, AiOutlineUserAdd } from 'react-icons/ai';
import { BiBuildings, BiSelectMultiple } from 'react-icons/bi';
import { FaRegMoneyBillAlt, FaUserCheck, FaUsers } from 'react-icons/fa';
import { ProgressBar, Step } from 'react-step-progress-bar';
import 'react-step-progress-bar/styles.css';

const steps = [
	{
		status: 'Submitted',
		icon: <AiOutlineFileText />,
	},
	{
		status: 'Internal Shortlist',
		icon: <BiSelectMultiple />,
	},
	{
		status: 'Company Shortlist',
		icon: <BiBuildings />,
	},
	{
		status: 'Interview Process',
		icon: <FaUsers />,
	},
	{
		status: 'Candidate Selected',
		icon: <FaUserCheck />,
	},
	{
		status: 'Candidate Joined',
		icon: <AiOutlineUserAdd />,
	},
	{
		status: 'Payment Done',
		icon: <FaRegMoneyBillAlt />,
	},
];

const ManageCandidateViewDetailsModal = ({ modelOpened, setModelOpened, candidateData }) => {
	const theme = useMantineTheme();
	// console.log(candidateData);

	let transfer;

	if (candidateData.status !== 'undefined') {
		transfer = {
			status: candidateData.status, // change transfer status to progress bar
		};
	} else {
		transfer = {
			status: 'null', // change transfer status to progress bar
		};
	}

	const getStepPosition = (transferStatus) => {
		return steps.findIndex(({ status }) => status === transferStatus) + 1;
	};

	// console.log(candidateData);
	return (
		<Modal
			overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
			overlayOpacity={0.55}
			overlayBlur={3}
			overflow="outside"
			size="auto"
			centered
			opened={modelOpened}
			onClose={() => setModelOpened(false)}
			withCloseButton={false}
			transition="fade"
			transitionDuration={500}
			transitionTimingFunction="ease">
			<div className="md:px-10 max-w-[18rem] sm:max-w-md md:max-w-2xl lg:max-w-3xl">
				<div
					className="absolute top-2 right-2 cursor-pointer flex flex-col items-center"
					onClick={() => setModelOpened(false)}>
					<AiOutlineCloseCircle className=" text-lg md:text-xl text-red-500" />
					<span className=" text-sm md:font-semibold text-red-500">Close</span>
				</div>

				<h2 className="text-[color:var(--blue)] text-xl md:text-2xl font-bold pb-4">
					Candidate Profile
				</h2>

				<div key={candidateData?._id} className="flex flex-col justify-start gap-3 sm:flex-row">
					<div className="flex-1 flex flex-col gap-5">
						<div>
							<span className="text-lg font-medium">Name</span>
							<h3>{candidateData?.name}</h3>
						</div>

						<div>
							<span className="text-lg font-medium">Email</span>
							<h3>{candidateData?.email} </h3>
						</div>

						<div>
							<span className="text-lg font-medium">Contact Number</span>
							<h3>{candidateData?.phoneNumber}</h3>
						</div>

						<div>
							<span className="text-lg font-medium">Current CTC</span>
							<h3>{candidateData?.last_or_current_ctc}</h3>
						</div>

						<div>
							<span className="text-lg font-medium">Notice Period</span>
							<h3>{candidateData?.noticePeriod}</h3>
						</div>
					</div>

					<div className="flex-1 flex flex-col gap-5">
						<div>
							<span className="text-lg font-medium">Experience</span>
							<h3>{candidateData?.experience}</h3>
						</div>

						<div>
							<span className="text-lg font-medium">Location</span>
							<h3>{candidateData?.currentLocation}</h3>
						</div>

						<div>
							<span className="text-lg font-medium">Expected CTC</span>
							<h3>{candidateData?.expected_ctc}</h3>
						</div>
					</div>
				</div>

				<div className="py-6 flex flex-col gap-5">
					<h4 className="text-[color:var(--blue)] text-xl font-semibold">Company Details</h4>

					{candidateData?.jobId?.companyId && (
						<div>
							<h5 className="text-lg font-medium">Company Name</h5>
							<p>{candidateData.jobId.companyId.companyName}</p>
						</div>
					)}
					{candidateData?.jobId?.companyId && (
						<div>
							<h5 className="text-lg font-medium">About us</h5>
							<p>{candidateData.jobId.companyId.aboutUs}</p>
						</div>
					)}

					<div>
						<h5 className="text-lg font-medium">Job Role</h5>
						<p>{candidateData?.jobId?.jobTitle}</p>
					</div>

					<div className="overflow-x-auto flex-flex-col">
						<div style={{ margin: '100px 50px' }}>
							<ProgressBar
								width={800}
								percent={100 * (getStepPosition(transfer.status) / steps.length)}
								filledBackground="linear-gradient(to right, #fefb72, green)">
								{steps.map((step, index, arr) => {
									return (
										<Step
											position={100 * (index / arr.length)}
											transition="scale"
											children={({ accomplished }) => (
												<div
													style={{
														display: 'flex',
														alignItems: 'center',
														justifyContent: 'center',
														borderRadius: '50%',
														textAlign: 'center',
														fontSize: '30px',
														width: 80,
														height: 80,
														color: 'white',
														backgroundColor: accomplished ? '#0055f2' : '#777',
													}}>
													{step.icon}
												</div>
											)}
										/>
									);
								})}
							</ProgressBar>

							<div className="mb-20"></div>

							<ProgressBar width={800} filledBackground="white" unfilledBackground="white">
								{steps.map((step, index, arr) => {
									return (
										<Step
											transition="scale"
											children={() => (
												<div
													style={{
														textAlign: 'center',
														width: 100,
														color: 'black',
													}}>
													{step.status}
												</div>
											)}
										/>
									);
								})}
							</ProgressBar>
						</div>
					</div>

					<div>
						<div className="text-lg font-medium">Remark</div>
						<span>{candidateData?.remarks}</span>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default ManageCandidateViewDetailsModal;
