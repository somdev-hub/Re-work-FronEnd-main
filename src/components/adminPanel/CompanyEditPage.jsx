import { Option, Select } from '@material-tailwind/react';
import React, { useEffect, useReducer, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { ThreeDots } from 'react-loader-spinner';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { baseUrl } from '../../baseUrl';
import ProfileCard from './ProfileCard';

const CompanyEditPage = () => {
	const navigation = useNavigate();
	const location = useLocation();

	const [company, setcompany] = useState();

	const [companyName, setcompanyName] = useState();
	const [companyNameError, setcompanyNameError] = useState('');

	const [companyWebsite, setcompanyWebsite] = useState();
	const [companyWebsiteError, setcompanyWebsiteError] = useState('');

	const [industry, setindustry] = useState();
	const [industryError, setindustryError] = useState('');

	const [contactNum1, setcontactNum1] = useState();
	const [contactNum1Error, setcontactNum1Error] = useState('');

	const [contactNum2, setcontactNum2] = useState();
	const [contactNum2Error, setcontactNum2Error] = useState('');

	const [headquarter, setheadquarter] = useState();
	const [headquarterError, setheadquarterError] = useState('');

	const [companySize, setcompanySize] = useState();

	const [aboutUs, setaboutUs] = useState();
	const [aboutUsError, setaboutUsError] = useState('');

	const [contactPerson, setcontactPerson] = useState();
	const [contactPersonError, setcontactPersonError] = useState('');

	const [contactPersonEmail, setcontactPersonEmail] = useState();
	const [contactPersonEmailError, setcontactPersonEmailError] = useState('');

	const [contactPersonMobNo, setcontactPersonMobNo] = useState();
	const [contactPersonMobNoError, setcontactPersonMobNoError] = useState('');

	const [companyAddress, setcompanyAddress] = useState();
	const [companyAddressError, setcompanyAddressError] = useState('');

	const [_PAN, set_PAN] = useState();
	const [_PANError, set_PANError] = useState('');

	const [_CIN, set_CIN] = useState();
	const [_CINError, set_CINError] = useState('');

	const [_TAN, set_TAN] = useState();
	const [_TANError, set_TANError] = useState('');

	const [_GST, set_GST] = useState();
	const [_GSTError, set_GSTError] = useState('');

	const [incorporationDate, setincorporationDate] = useState();
	const [incorporationDateError, setincorporationDateError] = useState('');

	const [linkedIn, setlinkedIn] = useState();
	const [linkedInError, setlinkedInError] = useState('');

	const [facebook, setfacebook] = useState();
	const [facebookError, setfacebookError] = useState('');

	const [twitter, settwitter] = useState();
	const [twitterError, settwitterError] = useState('');

	const [instagram, setinstagram] = useState();
	const [instagramError, setinstagramError] = useState('');

	const [reducerValue, forceUpdata] = useReducer((x) => x + 1, 0);
	const [loaderBtn, setLoaderBtn] = useState(false);

	useEffect(() => {
		setcompany(location.state);
		forceUpdata();
	}, []);

	useEffect(() => {
		if (company) {
			if (company.companyId) {
				let x = company.companyId;
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
				let date = new Date(x?.incorporationDate)?.toISOString();
				let adjDate = date?.split('T')[0];

				setincorporationDate(adjDate);
				// setincorporationDate(x.incorporationDate);
				setlinkedIn(x.linkedIn);
				setfacebook(x.facebook);
				settwitter(x.twitter);
				setinstagram(x.instagram);
			} else {
				setcompanyName(company.companyName);
			}
		}
	}, [reducerValue]);
	// console.log(company);

	const [submitted, setSubmitted] = useState(false);

	const formHandler = async (e) => {
		e.preventDefault();

		if (!incorporationDate) {
			setincorporationDateError('Incorporate is required');
		} else {
			setincorporationDateError('');
		}

		console.log('Check    ');
		if (incorporationDate) {
			console.log('Check    ');
			try {
				const data = {
					companyName,
					companyWebsite,
					industry,
					contactNum1,
					contactNum2,
					headquarter,
					companySize,
					aboutUs,
					contactPerson,
					contactPersonEmail,
					contactPersonMobNo,
					companyAddress,
					_PAN,
					_CIN,
					_TAN,
					_GST,
					incorporationDate,
					linkedIn,
					facebook,
					twitter,
					instagram,
				};
				console.log(data);
				let token = localStorage.getItem('token');
				const result = await fetch(`${baseUrl}/admin/editCompany/${company._id}`, {
					method: 'PUT',
					body: JSON.stringify(data),
					headers: {
						'Content-type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				});
				const jsonData = await result.json();
				setLoaderBtn(true);
				if (!result.ok) {
					setSubmitted(false);
					setLoaderBtn(false);
					throw new Error(jsonData.message);
				}
				toast('Company data updated!');
				setTimeout(() => {
					navigation('/admin/companies');
					setLoaderBtn(false);
				}, 1000);
			} catch (error) {
				console.log('Check    ', error);
				toast(error);
				setLoaderBtn(false);
			}
		}
	};
	return (
		<div>
			<div className="flex justify-end gap-5 flex-wrap pb-4 border-b-2 border-black group">
				<div>
					<ProfileCard />
				</div>
			</div>

			<h2 className="text-[color:var(--blue)] font-medium text-xl lg:text-2xl lg:font-semibold xl:text-3xl mt-4 mb-8">
				Company Details
			</h2>

			<div className="border-2">
				<div className="flex flex-col p-5 lg:p-8 xl:px-10">
					<form className="flex flex-col gap-4" onSubmit={formHandler}>
						<div className="flex flex-col gap-1">
							<label htmlFor="companyName" className="font-medium">
								Company Name
							</label>
							<input
								type="text"
								value={companyName}
								onChange={(e) => {
									setcompanyName(e.target.value);
								}}
								placeholder="Your company name"
								id="companyName"
								readOnly
								className="px-3 py-2 border max-w-lg rounded-md outline-none focus:ring-1"
							/>
							{/* {companyNameError && (
                <p className="text-red-600">{companyNameError}</p>
              )} */}
						</div>

						<div className="flex flex-col gap-1">
							<label htmlFor="companyWeb" className="font-medium">
								Company Website
							</label>
							<input
								type="text"
								value={companyWebsite}
								onChange={(e) => {
									setcompanyWebsite(e.target.value);
								}}
								placeholder="http://abcd.info"
								id="companyWeb"
								className="px-3 py-2 border max-w-lg rounded-md outline-none focus:ring-1"
							/>
							{companyWebsiteError && <p className="text-red-600">{companyWebsiteError}</p>}
						</div>

						<div className="flex flex-col gap-1">
							<label htmlFor="industry" className="font-medium">
								Industry
							</label>
							{/* <select
                className="form-select appearance-none max-w-lg px-3 py-2  
                bg-no-repeat border border-solid rounded transition ease-in-out m-0 focus:ring-1"
                id="industry"
                value={industry}
                onChange={(e) => {
                  setindustry(e.target.value);
                }}
              >
                <option value="IT">IT</option>
                <option value="CSE">CSE</option>
                <option value="Mecahnical">Mechanical</option>
              </select> */}

							<div className="max-w-lg">
								<Select
									label="Industry"
									value={industry}
									onChange={(value) => {
										setindustry(value);
									}}>
									<Option defaultValue="IT">IT</Option>
									<Option value="CSE">CSE</Option>
									<Option value="Mecahnical">Mecahnical</Option>
								</Select>
							</div>

							{industryError && <p className="text-red-600">{industryError}</p>}
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div className="flex flex-col gap-1">
								<label htmlFor="phone1" className="font-medium">
									Contact No.
								</label>
								<input
									type="text"
									value={contactNum1}
									onChange={(e) => {
										setcontactNum1(e.target.value);
									}}
									placeholder="1234567890"
									id="phone1"
									className="px-3 py-2 border max-w-lg rounded-md outline-none focus:ring-1"
								/>
								{contactNum1Error && <p className="text-red-600">{contactNum1Error}</p>}
							</div>
							<div className="flex flex-col gap-1">
								<label htmlFor="phone2" className="font-medium">
									Contact No. 2
								</label>
								<input
									type="text"
									value={contactNum2}
									onChange={(e) => {
										setcontactNum2(e.target.value);
									}}
									placeholder="9876543210"
									id="phone2"
									className="px-3 py-2 border max-w-lg rounded-md outline-none focus:ring-1"
								/>
								{contactNum2Error && <p className="text-red-600">{contactNum2Error}</p>}
							</div>
						</div>

						<div className="flex flex-col gap-1">
							<label htmlFor="headquaters" className="font-medium">
								Headquarter
							</label>
							<input
								type="text"
								value={headquarter}
								onChange={(e) => {
									setheadquarter(e.target.value);
								}}
								placeholder="19801 Senger Lake"
								id="headquaters"
								className="px-3 py-2 border max-w-lg rounded-md outline-none focus:ring-1"
							/>
							{headquarterError && <p className="text-red-600">{headquarterError}</p>}
						</div>

						<div className="flex flex-col gap-1">
							<label htmlFor="companySize" className="font-medium">
								Comapany Size
							</label>
							<div className="max-w-lg">
								<Select
									label="size"
									value={companySize}
									onChange={(value) => {
										setcompanySize(value);
									}}>
									<Option defaultValue="0-10">0-10</Option>
									<Option value="11-50">11-50</Option>
									<Option value="51-100">51-100</Option>
									<Option value="101-500">101-500</Option>
									<Option value="501-1000">501-1000</Option>
									<Option value="1001-10000">1001-10000</Option>
									<Option value="10001-100000">10001-100000</Option>
								</Select>
							</div>
						</div>

						<div className="flex flex-col gap-1">
							<label htmlFor="aboutus" className="font-medium">
								About Us
							</label>
							<textarea
								type="text"
								value={aboutUs}
								onChange={(e) => {
									setaboutUs(e.target.value);
								}}
								rows={6}
								placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto incidunt suscipit vel, inventore velit consequuntur dolorem aut? Cupiditate commodi perspiciatis, tempore error id veritatis, quia ullam in quo soluta quibusdam sunt non? Tenetur necessitatibus aliquam atque aspernatur sed architecto officia!"
								id="aboutus"
								className="px-3 py-2 border max-w-3xl rounded-md outline-none focus:ring-1"
							/>
							{aboutUsError && <p className="text-red-600">{aboutUsError}</p>}
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div className="flex flex-col gap-1">
								<label htmlFor="contactPerson" className="font-medium">
									Contact Person
								</label>
								<input
									type="text"
									value={contactPerson}
									onChange={(e) => {
										setcontactPerson(e.target.value);
									}}
									placeholder="1234567890"
									id="contactPerson"
									className="px-3 py-2 border max-w-lg rounded-md outline-none focus:ring-1"
								/>
								{contactPersonError && <p className="text-red-600">{contactPersonError}</p>}
							</div>
							<div className="flex flex-col gap-1">
								<label htmlFor="personEmail" className="font-medium">
									Contact Person Email
								</label>
								<input
									type="text"
									value={contactPersonEmail}
									onChange={(e) => {
										setcontactPersonEmail(e.target.value);
									}}
									placeholder="aman@gmail.com"
									id="personEmail"
									className="px-3 py-2 border max-w-lg rounded-md outline-none focus:ring-1"
								/>
								{contactPersonEmailError && (
									<p className="text-red-600">{contactPersonEmailError}</p>
								)}
							</div>
						</div>

						<div className="flex flex-col gap-1">
							<label htmlFor="contactNum" className="font-medium">
								Contact Number
							</label>
							<input
								type="text"
								value={contactPersonMobNo}
								onChange={(e) => {
									setcontactPersonMobNo(e.target.value);
								}}
								placeholder="564894494"
								id="contactNum"
								className="px-3 py-2 border max-w-lg rounded-md outline-none focus:ring-1"
							/>
							{contactPersonMobNoError && <p className="text-red-600">{contactPersonMobNoError}</p>}
						</div>

						<div className="flex flex-col gap-1">
							<label htmlFor="companyAddress" className="font-medium">
								Company Address
							</label>
							<input
								type="text"
								value={companyAddress}
								onChange={(e) => {
									setcompanyAddress(e.target.value);
								}}
								placeholder="Delhi"
								id="companyAddress"
								className="px-3 py-2 border max-w-lg rounded-md outline-none focus:ring-1"
							/>
							{companyAddressError && <p className="text-red-600">{companyAddressError}</p>}
						</div>

						<div className="flex flex-col gap-1">
							<label htmlFor="pan" className="font-medium">
								PAN
							</label>
							<input
								type="text"
								value={_PAN}
								onChange={(e) => {
									set_PAN(e.target.value);
								}}
								placeholder="NH1234UCG"
								id="pan"
								className="px-3 py-2 border max-w-lg rounded-md outline-none focus:ring-1"
							/>
							{_PANError && <p className="text-red-600">{_PANError}</p>}
						</div>

						<div className="flex flex-col gap-1">
							<label htmlFor="cin" className="font-medium">
								CIN
							</label>
							<input
								type="text"
								value={_CIN}
								onChange={(e) => {
									set_CIN(e.target.value);
								}}
								placeholder="NH1234UCG"
								id="cin"
								className="px-3 py-2 border max-w-lg rounded-md outline-none focus:ring-1"
							/>
							{_CINError && <p className="text-red-600">{_CINError}</p>}
						</div>

						<div className="flex flex-col gap-1">
							<label htmlFor="tan" className="font-medium">
								TAN
							</label>
							<input
								type="text"
								value={_TAN}
								onChange={(e) => {
									set_TAN(e.target.value);
								}}
								placeholder="NH1234UCG"
								id="tan"
								className="px-3 py-2 border max-w-lg rounded-md outline-none focus:ring-1"
							/>
							{_TANError && <p className="text-red-600">{_TANError}</p>}
						</div>

						<div className="flex flex-col gap-1">
							<label htmlFor="gst" className="font-medium">
								GST
							</label>
							<input
								type="text"
								value={_GST}
								onChange={(e) => {
									set_GST(e.target.value);
								}}
								placeholder="YNH1234UCGTU67"
								id="gst"
								className="px-3 py-2 border max-w-lg rounded-md outline-none focus:ring-1"
							/>
							{_GSTError && <p className="text-red-600">{_GSTError}</p>}
						</div>

						<div className="flex flex-col gap-1">
							<label htmlFor="incorporationDate" className="font-medium">
								Incorporation Date
							</label>
							<input
								type="date"
								value={incorporationDate}
								onChange={(e) => {
									setincorporationDate(e.target.value);
								}}
								placeholder="10 May, 2020"
								id="incorporationDate"
								className="px-3 py-2 border max-w-lg rounded-md outline-none focus:ring-1"
							/>
							{incorporationDateError && <p className="text-red-600">{incorporationDateError}</p>}
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div className="flex flex-col gap-1">
								<label htmlFor="linkedin" className="font-medium">
									Linkedin
								</label>
								<input
									type="text"
									value={linkedIn}
									onChange={(e) => {
										setlinkedIn(e.target.value);
									}}
									placeholder="abcd"
									id="linkedin"
									className="px-3 py-2 border max-w-lg rounded-md outline-none focus:ring-1"
								/>
								{linkedInError && <p className="text-red-600">{linkedInError}</p>}
							</div>
							<div className="flex flex-col gap-1">
								<label htmlFor="facebook" className="font-medium">
									Facebook
								</label>
								<input
									type="text"
									value={facebook}
									onChange={(e) => {
										setfacebook(e.target.value);
									}}
									placeholder="abcd"
									id="facebook"
									className="px-3 py-2 border max-w-lg rounded-md outline-none focus:ring-1"
								/>
								{facebookError && <p className="text-red-600">{facebookError}</p>}
							</div>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div className="flex flex-col gap-1">
								<label htmlFor="twitter" className="font-medium">
									Twitter
								</label>
								<input
									type="text"
									value={twitter}
									onChange={(e) => {
										settwitter(e.target.value);
									}}
									placeholder="abcd"
									id="twitter"
									className="px-3 py-2 border max-w-lg rounded-md outline-none focus:ring-1"
								/>
								{twitterError && <p className="text-red-600">{twitterError}</p>}
							</div>
							<div className="flex flex-col gap-1">
								<label htmlFor="insta" className="font-medium">
									Instagram
								</label>
								<input
									type="text"
									value={instagram}
									onChange={(e) => {
										setinstagram(e.target.value);
									}}
									placeholder="abcd"
									id="insta"
									className="px-3 py-2 border max-w-lg rounded-md outline-none focus:ring-1"
								/>
								{instagramError && <p className="text-red-600">{instagramError}</p>}
							</div>
						</div>

						{loaderBtn ? (
							<div className="flex justify-end">
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
						) : (
							<div className="text-white flex justify-end gap-5 mt-10 font-medium">
								<button
									onClick={() => {
										navigation('/admin/companies');
									}}
									className="bg-red-500 px-4 py-2 rounded-md flex gap-1.5 items-center"
									type="button">
									<AiOutlineDelete />
									Discard
								</button>

								<button className="bg-[color:var(--blue)] px-4 py-2 rounded-md" type="submit">
									Save
								</button>
							</div>
						)}
					</form>
				</div>
			</div>
			<ToastContainer />
		</div>
	);
};

export default CompanyEditPage;
