import { Option, Select } from '@material-tailwind/react';
import { ref, set } from 'firebase/database';
import mongoose from 'mongoose';
import React, { useEffect, useState } from 'react';
import { AiOutlineFileDone } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { baseUrl } from '../../baseUrl';
import { database } from '../../Firebase';
import Loader from '../../hook/Loader';
import { counterActions } from '../../store/index-redux';
import ManageCandidateViewDetailsModal from '../modal/ManageCandidateViewDetailsModal';
import CompanyNotifications from './CompanyNotifications';

const LiveJobsViewCandidates = () => {
	const [open, setOpen] = useState();
	const location = useLocation();
	const [candidates, setCandidates] = useState([]);
	const [job, setJob] = useState();
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(true);

	const companyLiveCandidateStatusUpdateFunc = () => {
		dispatch(counterActions.companyLiveCandidateStatusUpdate());
	};
	useEffect(() => {
		let arr = [];
		let statusArr = [
			'Internal Shortlist',
			'Candidate Shortlisted',
			'Interview Process',
			'Candidate Selected',
			'Candidate Joined',
			"Payment Done"
		];
		let x = location.state;




		setJob(x);
		let y = x.candidatesId;

		y.forEach((element) => {
			if (statusArr.indexOf(element.status) !== -1) {
				arr.push(element);
			}
		});

		setCandidates(arr);
		setIsLoading(false);
	}, []);

	const handleOpen = (value) => {
		setOpen(open === value ? 0 : value);
	};
	console.log(candidates, "this is log data");
	const { id } = useParams();
	/*------------------------------------------------------------------------------------------------------------------------ */
	const sendNotification = async (data) => {
		const x = mongoose.Types.ObjectId();
		const id = x.toString();

		let notificationTitle = "Application's status";
		let notificationBody = `Application status of candidate <span className= text-green-500> ${data.name}</span> for
                             <span className= text-green-500> ${data.jobTitle}</span> has been updated to <span className= text-green-500> ${data.status}</span>.`;

		set(ref(database, 'users/' + data.recruiterId + `/${id}`), {
			title: notificationTitle,
			body: notificationBody,
			receivedAt: Date.now(),
			seen: false,
		});
	};
	/*------------------------------------------------------------------------------------------------------------------------------- */
	const formHandler = async (data, value) => {

		try {
			let token = localStorage.getItem('token');
			const result = await fetch(`${baseUrl}/recruiter/ManageProfileStatusChange/${data._id}`, {
				method: 'put',
				body: JSON.stringify({ statusDb: value }),
				headers: {
					'Content-type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			});
			const jsonData = await result.json();
			toast(`Current status is "${jsonData.status}"`);

			if (!result.ok) {
				throw new Error(jsonData.message);
			}
			let newData = {
				name: jsonData.name,
				recruiterId: jsonData.recruiterId,
				jobTitle: job.jobTitle,
				status: jsonData.status,
			};
			sendNotification(newData);
			companyLiveCandidateStatusUpdateFunc();
			// toast(jsonData.message);
		} catch (error) {
			// console.log(error);
			toast(error);
		}
	};
	const [query, setQuery] = useState('');

	return (
		<div>
			{isLoading ? (
				<div className="flex justify-center items-center h-[90vh]">
					<Loader />
				</div>
			) : (
				<>
					<div className="flex justify-between items-center">
						{job && (
							<h2 className="font-medium text-[color:var(--blue)] text-xl lg:text-2xl lg:font-semibold xl:text-3xl mt-4 mb-8">
								{`${job.jobTitle} Job Applicants`}
							</h2>
						)}
						<CompanyNotifications />
					</div>

					<div className="flex flex-col">
						<div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
							<div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
								<div>
									<table className="min-w-full">
										<thead className="border-b">
											<tr>
												<th scope="col" className="font-medium text-gray-900 px-6 py-4 text-left">
													ID
												</th>
												<th scope="col" className="font-medium text-gray-900 px-6 py-4 text-left">
													Recruiter Name
												</th>
												<th scope="col" className="font-medium text-gray-900 px-6 py-4 text-left">
													Email
												</th>

												<th scope="col" className="font-medium text-gray-900 px-6 py-4 text-left">
													CV
												</th>
												<th scope="col" className="font-medium text-gray-900 px-6 py-4 text-left">
													Details
												</th>
												<th scope="col" className="font-medium text-gray-900 px-6 py-4 text-left">
													Status
												</th>
											</tr>
										</thead>
										{candidates && (
											<tbody>
												{candidates.map((data) => (




													<tr className="border-b" key={data._id}>
														<td className="px-6 py-4 whitespace-pre-wrap text-sm font-medium text-gray-900">
															{data.CustomId}
														</td>
														<td className="px-6 py-4 whitespace-pre-wrap text-sm font-medium text-gray-900">
															{data.name}
														</td>
														<td className="text-sm font-medium px-6 py-4 whitespace-pre-wrap">
															{data.email}
														</td>

														<td className="text-sm font-medium text-gray-900 px-6 py-4 whitespace-pre-wrap">
															<a
																href={`${baseUrl}/users/getImage/${data?.resume?.filename}`}
																download={data?.resume?.filename}
																target="_blank"
																rel="noreferrer">
																<AiOutlineFileDone className="text-[color:var(--blue)] text-xl" />
															</a>
														</td>

														<td className="text-sm font-medium px-6 py-4 whitespace-pre-wrap">
															{/* {candidates
																.filter((value) => {
																	return query.toLowerCase() === ''
																		? value
																		: value.name.toLowerCase().includes(query) ||
																			query.toLowerCase() === ''
																			? value
																			: value.jobId?.companyId.companyName
																				.toLowerCase()
																				.includes(query) || query.toLowerCase() === ''
																				? value
																				: value.jobId.jobTitle.toLowerCase().includes(query) ||
																					query.toLowerCase() === ''
																					? value
																					: value.status.toLowerCase().includes(query) ||
																						query.toLowerCase() === ''
																						? value
																						: value.remarks.toLowerCase().includes(query) ||
																							query.toLowerCase() === ''
																							? value
																							: value._id.toString().includes(query);
																}) */}

															{/* .map((candidate) => { */}
															{/* return ( */}
															<MyFunction
																candidate={data}
															// modelOpened={modelOpened}
															// setModelOpened={setModelOpened}
															/>
															{/* );
																})} */}
														</td>

														<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap flex flex-col gap-5">
															<div className="relative">
																<div className="flex gap-3 items-center mb-4">
																	{/* <h6 className="font-medium">Status</h6> */}
																	{/* <div onClick={() => handleOpen(data._id)}>
                                {open === data._id ? (
                                  <AiFillCaretDown size={10} />
                                ) : (
                                  <AiFillCaretUp size={10} />
                                )}
                              </div> */}
																</div>
																{/*open === data._id && (
                            <div className="absolute z-50 h-max bg-white shadow-md top-8 right-5">
                              <div className="flex flex-col gap-2 border-2 rounded-md p-2">
                                <div className="flex justify-between items-center gap-3">
                                  <h2>Candidate shortlisted</h2>
                                  <Switch id="1" color="green" />
                                </div>
                                <div className="flex justify-between items-center gap-3">
                                  <h2>Interview Process</h2>
                                  <Switch id="2" color="green" />
                                </div>
                                <div className="flex justify-between items-center gap-3">
                                  <h2>Candidate Selected</h2>
                                  <Switch id="3" color="green" />
                                </div>
                                <div className="flex justify-between items-center gap-3">
                                  <h2>Candidate Joined</h2>
                                  <Switch id="4" color="green" />
                                </div>
                              </div>
                           </div>) */}
																<div>
																	<select
																		label={data.status}
																		value={data.status}
																		onChange={(e) => {
																			formHandler(data, e.target.value);
																		}}
																		className='px-2 py-2 border border-gray rounded-sm'>
																		<option className='py-2 my-96' value="Candidate Shortlisted">Candidate Shortlisted</option>
																		<option className='py-2 my-2' value="Interview Process">Interview Process</option>
																		<option className='py-2 my-2' value="Candidate Selected">Candidate Selected</option>
																		<option className='py-2 my-2' value="Candidate Joined">Candidate Joined</option>
																	</select>
																</div>
															</div>
														</td>
													</tr>
												))}
											</tbody>
										)}
									</table>
								</div>
							</div>
						</div>
					</div>
				</>
			)}

			<ToastContainer />
		</div>
	);
};

export default LiveJobsViewCandidates;

const MyFunction = ({ candidate }) => {
	const [modelOpened, setModelOpened] = useState(false);

	return (
		<tr className="" key={candidate?._id}>
			<td className="text-sm text-gray-900 font-light  py-4 whitespace-nowrap flex gap-5">
				<div
					className="flex gap-2 items-center font-bold bg-[color:var(--blue)] text-white p-2 rounded-md cursor-pointer"
					onClick={(e) => {
						setModelOpened(true);
					}}>
					View Details
				</div>
				{MyFunction}
				<ManageCandidateViewDetailsModal
					modelOpened={modelOpened}
					setModelOpened={setModelOpened}
					candidateData={candidate}

				// send the job data here and then fetch in JobDetailsModal
				/>
			</td>
		</tr>
	);
};
