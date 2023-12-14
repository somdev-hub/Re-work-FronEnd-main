import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AboutImg from '../../assets/aboutuspage.png';

const About = () => {
	useEffect(() => {
		const toTop = () => {
			window.scrollTo(0, 0);
		};
		return () => {
			toTop();
		};
	}, []);

	return (
		<div>
			<div className="py-4 px-6 md:py-3 md:px-14 lg:px-20 xl:px-24">
				<div className="py-2">
					<h2 className="text-[color:var(--blue)]"> <Link to={'/'} className='hover:underline'>Home</Link> / About us</h2>
				</div>

				<div className="flex flex-col  md:flex-row md:justify-between md:items-center md:gap-10 lg:gap-20">
					<div className="lg:w-2/4">
						<h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold max-w-xl tracking-wide py-4 lg:py-8">
							There has to be a <span className="text-[color:var(--blue)]">better</span> way.
							<br />
							So we <span className="text-[color:var(--blue)]">built</span> it.
						</h1>
						<p className="md:text-lg">
							Welcome to Rework, the revolutionary hiring platform that helps employers supercharge
							their hiring process with the help of cutting-edge A.I. technology. We believe in
							making the hiring process easier, faster, and more cost-effective. At the same time,
							we help recruiters earn good money by providing employers with the best candidate
							leads.
						</p>
						<p className="md:text-lg">
							We also provide a variety of features to help employers get the most out of the
							recruitment process. From detailed candidate profiles to automated messaging and
							interview scheduling, we have all the tools you need to ensure a smooth and successful
							hiring process. Our team of experts is always available to provide personalized
							support and advice, and to ensure you get the most out of our platform.
						</p>
					</div>

					<div className="lg:w-2/4">
						<img src={AboutImg} alt="" />
					</div>
				</div>

				<div className="flex flex-col gap-6 md:gap-10 lg:gap-20 py-8 lg:py-14">
					<div className="flex flex-col sm:flex-row">
						<div className="flex-1 relative">
							<h2 className="font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl md:px-10">
								Who we are?
							</h2>
							<h2 className="hidden md:inline-flex absolute -top-7 -left-7 text-[color:var(--lightest-blue)] font-bold text-9xl -z-10 opacity-20">
								WHO
							</h2>
						</div>
						<p className="flex-1 tracking-wider leading-7 md:px-6 lg:px-20 sm:text-lg">
							We are Rework, a team dedicated to supercharging the hiring process through our
							cutting-edge A.I. technology. We make the process of hiring easier and less expensive
							for companies, as well as enabling recruiters to earn more through providing the best
							employer leads. Our goal is to revolutionize the hiring industry and make it easier
							for businesses to find and hire the best talent. We strive to make sure that the
							hiring process is more efficient and cost-effective, while giving recruiters the
							opportunity to make more money. Our mission is to create a better and more efficient
							hiring process with the help of A.I. technology.
						</p>
					</div>

					<div className="flex flex-col sm:flex-row">
						<div className="flex-1 relative">
							<h2 className="font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl md:px-10">
								What we do best?
							</h2>
							<h2 className="hidden md:inline-flex absolute -top-7 -left-7 text-[color:var(--lightest-blue)] font-bold text-9xl -z-10 opacity-20">
								WHAT
							</h2>
						</div>
						<p className="flex-1 tracking-wider leading-7 md:px-6 lg:px-20 sm:text-lg">
							At Rework, we are committed to making the recruitment process easier and more
							efficient. We strive to provide the highest quality of service and the best possible
							customer experience. We look forward to helping you supercharge your hiring process
							and find the best candidates for your roles.
						</p>
					</div>
				</div>
			</div>

			<div className="py-8 text-white bg-[color:var(--blue)]">
				<div className="py-4 px-6 md:py-3 md:px-14 lg:px-20 xl:px-24">
					<div>
						<h3 className="text-xl md:text-2xl lg:text-4xl font-semibold py-3">
							How rework helps you?
						</h3>
					</div>

					<div className="flex flex-col md:flex-row md:items-center">
						<div className="md:flex-[2]">
							<h4 className="text-lg md:text-xl lg:text-2xl font-semibold">Best of rework</h4>
							<p className="max-w-xl md:tracking-wider py-4">
								Our A.I. powered platform is designed to streamline the entire recruitment process,
								from searching for candidates to onboarding them. With our advanced search engine
								and intuitive interface, employers can quickly and easily find the perfect
								candidates for their roles. Our advanced A.I. algorithms take into account a range
								of factors, including skills, experience, and culture fit, to ensure that employers
								only receive the best and most relevant candidate leads.
							</p>
						</div>

						<div className="md:flex-1 p-5">
							<img src={AboutImg} alt="" />
						</div>
					</div>
				</div>
			</div>

			<div className="py-4 px-6 md:py-3 md:px-14 lg:px-20 xl:px-24">
				<div className="py-8 lg:py-14">
					<div className="text-center pb-3 md:pb-5 lg:pb-10 xl:pb-12">
						<h3 className="font-semibold text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl py-2 lg:py-4">
							Our Core <span className="text-[color:var(--blue)]">Values</span>
						</h3>
						<p className="max-w-lg lg:max-w-2xl xl:max-w-3xl mx-auto md:font-medium sm:text-lg md:text-xl">
							We’re enthusiastic learners and seasoned inventors. Together, we can create solutions
							that serve not just technology but the humans behind it.
						</p>
					</div>

					<div className="flex flex-col md:flex-row md:gap-10 lg:gap-20 xl:gap-24">
						<div className="text-center py-6 max-w-lg mx-auto flex flex-col gap-4">
							<h3 className="text-[color:var(--lightest-blue)] font-bold text-7xl lg:text-8xl opacity-40">
								01
							</h3>
							<div className="flex flex-col gap-2">
								<h2 className="text-lg font-semibold sm:text-xl">Ensure-impactful innovations</h2>
								<p>
									An unwavering commitment to drive maximum customer satisfaction, infused with
									integrity and passion.
								</p>
							</div>
						</div>
						<div className="text-center py-6 max-w-lg mx-auto flex flex-col gap-4">
							<h3 className="text-[color:var(--lightest-blue)] font-bold text-7xl lg:text-8xl opacity-40">
								02
							</h3>
							<div className="flex flex-col gap-2">
								<h2 className="text-lg font-semibold sm:text-xl">Focus on self-development</h2>
								<p>
									Training and mentorship programs, interactive sessions and community meetups to
									drive personal growth.
								</p>
							</div>
						</div>
						<div className="text-center py-6 max-w-lg mx-auto flex flex-col gap-4">
							<h3 className="text-[color:var(--lightest-blue)] font-bold text-7xl lg:text-8xl opacity-40">
								03
							</h3>
							<div className="flex flex-col gap-2">
								<h2 className="text-lg font-semibold sm:text-xl">Integrate work-life balance</h2>
								<p>
									Latest infrastructure and flexible working hours along with many other privileges
									that inculcate healthy lifestyle choices.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default About;