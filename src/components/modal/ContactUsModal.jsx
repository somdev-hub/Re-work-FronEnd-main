import { Modal, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { ThreeDots } from 'react-loader-spinner';
import { toast, ToastContainer } from 'react-toastify';
import { baseUrl } from '../../baseUrl';

const ContactUsModal = ({ modelOpened, setModelOpened, data }) => {
	const theme = useMantineTheme();

	// const [email, setemail] = useState('');
	// const [name, setname] = useState('');
	// const [message, setMessage] = useState('');
	const [contactLoader, setContactLoader] = useState(false);
	const [phoneNumber, setphoneNumber] = useState("")

	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm();

	let hndlSubmit = (d) => {
		// e.preventDefault();

		const email = d.email;
		const name = d.name;
		const message = d.message;
		const phoneNumber = d.number;

		const data = { email, message, name, phoneNumber };
		// toast('submitted')
		setContactLoader(true);
		fetch(`${baseUrl}/admin/contactQurey`, {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((data) => {
				// console.log(data);

				// setemail('');
				// setname('');
				// setMessage('');
				setModelOpened(false);
				reset();
				toast.success('Successful', {
					position: 'top-right',
					autoClose: 1000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'light',
				});
				setContactLoader(false);
			});
	};

	return (
		<Modal
			overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
			overlayOpacity={0.55}
			overlayBlur={3}
			overflow="inside"
			size="920px"
			centered
			opened={modelOpened}
			onClose={() => setModelOpened(false)}
			withCloseButton={false}
			transition="fade"
			transitionDuration={500}
			transitionTimingFunction="ease">
			<div className="md:px-5">
				<div
					className="absolute top-1 right-1 cursor-pointer flex flex-col items-center"
					onClick={() => setModelOpened(false)}>
					<AiOutlineCloseCircle className=" text-3xl w-7 h-7 text-red-500" />
				</div>

				<div className="flex flex-col gap-10 md:flex-row border-orange-800">
					<div className="md:flex-1">
						<h2 className="text-center text-[#2068FF] text-lg md:text-xl lg:text-2xl font-semibold mb-3">
							Contact us
						</h2>

						<form className="mb-5 p-5 rounded-lg" onSubmit={handleSubmit(hndlSubmit)}>
							<div className=" md:flex md:gap-5 ">
								<div className="bg-white rounded md:w-[220px]">
									<label htmlFor="name">Name</label>
									<input
										// value={name}
										{...register('name', { required: 'Name  is required' })}
										// onChange={(e) => {
										// 	setname(e.target.value);
										// }}
										className=" bg-white py-1 px-3 w-full outline-none  border-2 rounded-lg "
										type="text"
										autoComplete='new-password'
										placeholder="Your name"
									// required
									/>
									{errors.name && <p className="text-red-600 text-xs">{errors.name?.message}</p>}
								</div>

								<div className="bg-white rounded mt-4 md:mt-0 md:w-[220px]">
									<label htmlFor="number">Contact Number</label>
									<input
										// value={number}
										{...register("number", { pattern: /^[1-9]{1}[0-9]{9}$/ })}
										{...register('number', { required: 'Contact Number is required' })}
										// onChange={(e) => {
										// 	setname(e.target.value);
										// }}
										onChange={(e) => [setphoneNumber(e.target.value)]}
										className=" bg-white py-1 px-3 w-full outline-none  border-2 rounded-lg "
										type="number"
										placeholder="Phone Number"
									// required
									/>
									{((phoneNumber?.length > 0 && phoneNumber?.length !== 10) || errors.number) && (
										<p className="text-red-500 text-xs">
											*Phone number must be 10 digit.
										</p>
									)}
								</div>

								<div className="bg-white rounded mt-4 md:mt-0 md:w-[320px]">
									<label htmlFor="email">Email</label>
									<input
										{...register('email', { required: 'Email Address is required' })}
										// value={email}
										// onChange={(e) => {
										// 	setemail(e.target.value);
										// }}
										className=" bg-white py-1 px-3 w-full outline-none border-2 rounded-lg"
										autoComplete='new-password'
										type="email"
										placeholder="Enter your email"
									// required
									/>
									{errors.email && <p className="text-red-600 text-xs">{errors.email?.message}</p>}
								</div>
							</div>

							<div className="bg-white my-7">
								<label htmlFor="msg">Tell us what you need help with:</label>
								<textarea
									// value={message}
									{...register('message', { required: 'Message is required' })}
									// onChange={(e) => {
									// 	setMessage(e.target.value);
									// }}
									className=" bg-white w-full p-1 h-24 md:h-36 outline-none border-2 rounded-lg"
									type="text"
									placeholder="Enter a topic like 'notifications'"
								// required
								/>
								{errors.message && <p className="text-red-600 text-xs">{errors.message?.message}</p>}
							</div>

							<div className="flex justify-center text-xs font-semibold">
								{contactLoader ? (
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
									<button className="text-[#2068FF] border-2 border-[#2068FF] py-1 px-10 btn btn-[#2068FF] btn-outline rounded-lg md:text-sm lg:text-lg">
										Get help
									</button>
								)}
							</div>
						</form>
					</div>
				</div>
				<ToastContainer />
			</div>
		</Modal>
	);
};

export default ContactUsModal;
