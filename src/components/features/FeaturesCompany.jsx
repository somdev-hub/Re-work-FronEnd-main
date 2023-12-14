import React from 'react';

import faster from '../../assets/fast.svg';
import savings from '../../assets/savings.svg';
import diamond from '../../assets/diamond.svg';

const FeaturesCompany = () => {
	return (
		<div className="py-8 px-6 md:py-10 md:px-14 lg:px-20 xl:px-24">
			<h2 className="text-center text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold my-8">
				AMAZING FEATURES
			</h2>

			<div className="flex flex-col gap-6 md:flex-row">
				<div className="border-2 px-3 py-4 sm:px-10 sm:py-10 rounded-lg flex flex-col gap-6 shadow-md hover:shadow-lg md:flex-1">
					<div className="flex flex-col justify-center items-center gap-5">
						<img src={faster} alt="" />
						{/* <img src={Sales} alt="" className="h-40 lg:h-48 object-cover" /> */}
						<h4 className="text-lg lg:text-xl font-semibold">80% Faster Hiring</h4>
					</div>
					<p className="text-center">
						Reduce your recruitment TAT by 80% with the access to a wider talent pool on the
						platform
					</p>
				</div>

				<div className="border-2 px-3 py-4 sm:px-10 sm:py-10 rounded-lg flex flex-col gap-6 shadow-md hover:shadow-lg md:flex-1">
					<div className="flex flex-col justify-center items-center gap-5">
						<img src={savings} className='w-[50px]' alt="" />
						<h4 className="text-lg lg:text-xl font-semibold">50% Savings</h4>
					</div>
					<p className="text-center">
						Streamline your budgeting and save money while finding the top candidates
					</p>
				</div>

				<div className="border-2 px-3 py-4 sm:px-10 sm:py-10 rounded-lg flex flex-col gap-6 shadow-md hover:shadow-lg md:flex-1">
					<div className="flex flex-col justify-center items-center gap-5">
						<img src={diamond} alt="" />
						<h4 className="text-lg lg:text-xl font-semibold">Higher shortlist ratio</h4>
					</div>
					<p className="text-center">
						Leverage the expertise of our network of over 10K certified sourcing partners
					</p>
				</div>
			</div>
		</div>
	);
};

export default FeaturesCompany;
