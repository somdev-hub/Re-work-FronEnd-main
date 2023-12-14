import React, { useState } from 'react';
import HeroImg from '../../assets/company-banner.svg';
import Register from '../../pages/register/Register';

const HeroCompany = () => {
	const [openRegisterModal, setOpenRegisterModal] = useState(false);

	return (
		<div id="company" className="md:pt-14">
			<section className="text-gray-600 body-font">
				<div className="container mx-auto flex px-6 md:px-4 pt-14 md:pt-20 md:pb-20 md:flex-row flex-col-reverse items-center xl:px-32 xl:pt-20">
					<div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex gap-3 flex-col mb-16 md:mb-0 ">
						<h1 className="title-font text-3xl sm:text-4xl md:text-4xl lg:text-5xl mb-3 font-semibold text-gray-900">
							Securing the best candidates for your company
						</h1>
						<p className="mb-8 leading-relaxed md:text-lg">
							Enhancing your hiring process with the help of AI Powered tools and resources Ensuring
							that you get the best out of the hiring process
						</p>
						<div className="flex w-full flex-wrap gap-2 justify-between lg:justify-start lg:gap-4 text-xs font-semibold text-white">
							<button
								onClick={() => setOpenRegisterModal(true)}
								className="flex-1 w-full lg:flex-none lg:w-fit bg-[#F5A74A] hover:bg-[#f5a33e] border-0 py-3 px-6 focus:outline-none rounded md:text-sm lg:text-base">
								START HIRING
							</button>
							<Register
								openRegisterModal={openRegisterModal}
								setOpenRegisterModal={setOpenRegisterModal}
								activeState="company"
							/>
							{/* <a href="#companyFAQ">
								<button className="flex-1 w-full lg:flex-none lg:w-fit text-[#2068FF] border-2 border-[#2068FF] py-3 px-6 focus:outline-none rounded md:text-sm lg:text-base">
									FAQs
								</button>
							</a> */}
						</div>
					</div>
					<div className="lg:max-w-xl lg:w-full md:w-1/2 w-5/6">
						<img
							className="object-cover object-center rounded mb-10 md:mb-0 bg-transparent w-[350px]  mx-auto"
							alt="hero"
							src={HeroImg}
						/>
					</div>
				</div>
			</section>
		</div>
	);
};

export default HeroCompany;
