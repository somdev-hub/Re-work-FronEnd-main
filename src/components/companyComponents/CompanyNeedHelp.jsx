import React, { useEffect, useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { FaTelegramPlane } from 'react-icons/fa';
import { ThreeDots } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import FLowerPotImg from '../../assets/flowerPotImg.png';
import NeedHelpImg from '../../assets/needHelpImg.png';
import { baseUrl } from '../../baseUrl';
const CompanyNeedHelp = () => {
	const nav = useNavigate();
	const [email, setemail] = useState('');
	const [company, setCompany] = useState('');
	const [message, setMessage] = useState('');
	const [getHelpLoader, setGetHelpLoader] = useState(false);

	useEffect(() => {
		fetch(`${baseUrl}/users/getUserById/${localStorage.getItem('userId')}`)
			.then((res) => res.json())
			.then((data) => {
				// console.log(data.posts);
				setCompany(data.posts.companyName);
				setemail(data.posts.email);
			});
	}, []);

	const [submitted, setSubmitted] = useState(false);

	let hndlSubmit = (e) => {
		e.preventDefault();
		// if (submitted) {
		//   return;
		// }
		// setSubmitted(true);

		const data = { email, company, message, companyId: localStorage.getItem('userId') };
		let token = localStorage.getItem('token');
		setGetHelpLoader(true);
		fetch(`${baseUrl}/company/needHelpCompany`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((data) => {
				// console.log(data);
				toast('submitted');

				setTimeout(() => {
					nav('/company');
				}, 2000);
				setGetHelpLoader(false);
			});
	};

	return (
		<div>
			<div className="m-5 sm:p-10 md:px-20 lg:px-40">
				<Link to="/company">
					<p className="flex items-center gap-2  ">
						<BiArrowBack className="text-[color:var(--blue)]" />
						Go back
					</p>
				</Link>
				<strong className="text-[color:var(--blue)] text-xl lg:text-2xl xl:text-3xl flex justify-center items-center gap-4 mt-5 sm:mt-0 mb-5">
					Need Some help? <FaTelegramPlane className="text-xl lg:text-2xl xl:text-4xl" />
				</strong>

				<div className="border-2 border-gray-500 rounded-3xl p-10 lg:px-40 relative">
					<form
						onSubmit={(e) => {
							hndlSubmit(e);
						}}>
						<div className="flex flex-col gap-5">
							<div className="flex flex-col sm:flex-row gap-5 lg:gap-10">
								<div className="flex-1 flex flex-col">
									<label htmlFor="ID" className="font-medium">
										Company Name
									</label>
									<input
										value={company}
										readOnly
										type="text"
										id="ID"
										placeholder="47832574"
										className="border border-gray-300 outline-none focus:ring-1 px-3 py-2 rounded-md"
									/>
								</div>
								<div className="flex-1 flex flex-col">
									<label htmlFor="email" className="font-medium">
										Email
									</label>
									<input
										value={email}
										readOnly
										type="email"
										id="email"
										placeholder="name@gmail.com"
										className="border border-gray-300 outline-none focus:ring-1 px-3 py-2 rounded-md"
									/>
								</div>
							</div>

							<div className="flex flex-col z-10">
								<label htmlFor="help" className="font-medium">
									Tell us what you need help with:
								</label>
								<textarea
									value={message}
									onChange={(e) => {
										setMessage(e.target.value);
									}}
									id="help"
									placeholder="Type your query"
									rows={10}
									className="border border-gray-300 outline-none px-3 py-2 focus:ring-1 rounded-md"
									required
								>
									{message}
								</textarea>
							</div>
							<div className="flex justify-end">
								{getHelpLoader ? (
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
									<button className="bg-[color:var(--blue)] text-white w-max px-5 py-2 text-lg rounded-md font-semibold hover:bg-blue-700 ">
										Get Help
									</button>
								)}
							</div>
						</div>
					</form>

					<img
						src={FLowerPotImg}
						alt=""
						className="hidden md:inline absolute bottom-0 right-0 max-h-52"
					/>
					<img
						src={NeedHelpImg}
						alt=""
						className="hidden md:inline absolute bottom-0 -left-28 max-h-96"
					/>
				</div>
			</div>
			<ToastContainer />
		</div>
	);
};
export default CompanyNeedHelp;
