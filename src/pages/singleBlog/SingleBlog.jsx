import React, { useEffect } from 'react';
import { AiFillTwitterCircle } from 'react-icons/ai';
import { BsArrowRight, BsFacebook } from 'react-icons/bs';
import { Link, useLocation, useParams } from 'react-router-dom';
import Newsletter from '../../components/newsletter/Newsletter';

const SingleBlog = () => {
	const params = useParams(); //it has blog id

	const location = useLocation();
	console.log(location.state[0]);

	useEffect(() => {
		const toTop = () => {
			window.scrollTo(0, 0);
		};
		return () => {
			toTop();
		};
	}, [params]);

	const blog5 = [
		{
			heading: 'Benefits of using AI to improve hiring experience',
			date: '20 October 2022',
			readingTime:'3 minutes',
			image:
				'https://giant-kryptops-a8d.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F67f34ec4-869a-42f2-b7af-a2f45c40c50d%2Fpexels-alex-knight-2599244.jpg?id=7e55b541-779e-4c5b-ae9a-84b8b9af9754&table=block&spaceId=0ad61581-97b0-4338-9dd4-c86a52ecf20b&width=2000&userId=&cache=v2',
			para1:
				"The use of artificial intelligence (AI) in the hiring process is changing the way businesses recruit and hire new employees. AI-powered technologies are changing the way recruiters interact with potential employees and making it easier for businesses to find top talent. With AI, businesses can quickly find the best candidates for their open positions, guaranteeing that they hire the best people. In this blog, we'll look at the various advantages of using AI to improve the hiring process.",
			para2:
				'To begin with, using AI in the hiring process makes it easier to find the right candidates. Artificial intelligence-powered technologies can quickly analyze data such as resumes, skills, and experience to determine who is best suited for a specific job. This ensures that recruiters can identify the best candidates and move them quickly through the hiring process.',
			para3:
				'AI can also be used to streamline the hiring process. AI-powered technologies can quickly sift through large volumes of resumes to find the best candidates. Recruiters will be able to spend less time sifting through applications and more time engaging with potential candidates as a result.',
			para4:
				'AI can be used to improve the candidate experience in addition to making it easier to identify the right candidates. AI-powered technologies can be used to personalize the recruitment process, ensuring that potential employees have the best experience possible. AI-powered technologies, for example, can be used to identify the best job opportunities for a specific candidate and provide personalized feedback to ensure they get the most out of the recruitment process.',

			para5:
				"Finally, using AI in the hiring process can help businesses save time and money. Companies can reduce the amount of time spent on recruitment by automating the process, resulting in cost savings. Furthermore, AI-driven technologies can quickly assess new hires' skills and abilities and provide them with the resources they need to quickly become productive members of the team, reducing the amount of time spent on onboarding and training.",

			para6:
				'To summarize, the use of AI in the hiring process is transforming how businesses recruit and hire new employees. AI-powered technologies are making it easier to find the right candidates and improve the candidate experience, all while saving businesses time and money. Businesses will be able to reap even more benefits and improve their recruitment processes as AI-driven technologies continue to evolve.',
		},
	];

	const blog6 = [
		{
			heading: 'How AI is revolutionizing the hiring process',
			date: '02 November 2022',
			readingTime:'3 minutes',
			image:
				'https://giant-kryptops-a8d.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fa10ef1c8-8e47-404d-93e2-3d426868598e%2Fpexels-pixabay-373543.jpg?id=9bb5ddd1-fc46-46a4-ba49-b6ffe2bdedf3&table=block&spaceId=0ad61581-97b0-4338-9dd4-c86a52ecf20b&width=2000&userId=&cache=v2',
			para1:
				"Many businesses and industries, including hiring, are being transformed by artificial intelligence (AI). AI-powered tools are being used to streamline and optimise the recruitment process, allowing businesses to find the best candidates for any job quickly and accurately. In this blog post, we'll look at how AI is transforming the hiring process and why it's critical to consider investing in AI-powered recruitment solutions.",
			para2:
				'AI-powered tools are transforming how businesses search for and identify potential candidates. AI-powered solutions can quickly scan resumes and other job applications for important information, such as relevant experience and qualifications. This process is much faster than manual reviews and enables businesses to quickly identify the most qualified candidates for any job.',
			para3:
				'AI-powered recruitment solutions can also go beyond simple resume scanning to provide more in-depth insights into potential candidates. These solutions can use data from previous jobs, personality traits, and cultural fit to provide a more complete picture of a candidate. This enables businesses to make more informed decisions when selecting the best candidate.',
			para4:
				'Furthermore, AI-powered recruitment solutions can automate many of the time-consuming and tedious tasks associated with the hiring process. This includes tasks like scheduling interviews, arranging assessments, and distributing job offers. Companies can reduce the amount of time and resources spent on recruitment by automating these processes and focusing more on finding the right candidate for the job.',

			para5:
				'Finally, AI-powered recruitment solutions can provide useful insights into the hiring process. AI-driven solutions can provide companies with valuable insights into their recruitment process by analysing data, such as where they are most likely to find the best candidates or which channels are most effective for sourcing talent. This information can assist businesses in streamlining their hiring processes and making more informed hiring decisions.',

			para6:
				'Finally, AI-driven recruitment solutions are changing the way businesses find and hire new employees. These solutions can identify the most qualified candidates for any job quickly and accurately, as well as provide valuable insights into the recruitment process. Companies can reduce the time and resources spent on recruitment while improving the quality of their hires by investing in AI-driven recruitment solutions.',
		},
	];

	return (
		<div>
			<div>
				<main className="py-5">
					<div className="w-full mx-auto">
						<div className="max-w-4xl mx-auto">
							<img
								src={location.state[0].image}
								className="w-full sm:h-60 sm:object-fill md:h-72 lg:h-80 xl:h-96 2xl:h-[28rem] object-cover rounded-lg"
								alt=""
							/>
						</div>
					</div>

					<article className="max-w-4xl mx-auto p-5 bg-white">
						<h2 className="text-3xl mt-10 mb-3">{location.state[0].heading}</h2>

						<div className="flex items-center space-x-2">
							<p className="text-sm font-light ">— Published on {location.state[0].date}</p>
						</div>

						<div className="flex items-center space-x-2">
							<p className="text-sm font-light ">— Reading TIme: {location.state[0].readingTime}</p>
						</div>

						<div className="max-w-lg h-[0.15rem] my-5 mx-auto bg-[color:var(--blue)]"></div>

						<div className="mt-10">{location.state[0].para1}</div>
						<div className="mt-10">{location.state[0].para2}</div>
						<div className="mt-10">{location.state[0].para3}</div>
						<div className="mt-10">{location.state[0].para4}</div>
						<div className="mt-10">{location.state[0].para5 ? location.state[0].para5 : ''}</div>
						<div className="mt-10">{location.state[0].para6 ? location.state[0].para6 : ''}</div>
						<div className="mt-10">{location.state[0].para7 ? location.state[0].para7 : ''}</div>

						{/* <div className="flex items-center gap-5 py-7">
							<h6>Share this: </h6>

							<AiFillTwitterCircle className="text-[color:var(--blue)] text-4xl" />
							<BsFacebook className="text-[color:var(--blue)] text-3xl" />
						</div> */}
						<div className="max-w-lg h-[0.15rem] my-10 mx-auto bg-[color:var(--blue)]"></div>
					</article>
				</main>

				<div className="max-w-4xl mx-auto p-5 bg-white">
					<h5>Related Blogs</h5>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 mt-3">
						<Link to="/singleblog/5" state={blog5}>
							<div className="border rounded-lg overflow-hidden group cursor-pointer bg-white h-max">
								<img
									src="https://giant-kryptops-a8d.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F67f34ec4-869a-42f2-b7af-a2f45c40c50d%2Fpexels-alex-knight-2599244.jpg?id=7e55b541-779e-4c5b-ae9a-84b8b9af9754&table=block&spaceId=0ad61581-97b0-4338-9dd4-c86a52ecf20b&width=2000&userId=&cache=v2"
									alt=""
									className=" w-full object-fill sm:object-cover md:object-fill sm:h-60 xl:h-80 group-hover:scale-105 transition-transform duration-200 ease-in-out "
								/>
								<div className="flex flex-col gap-2 justify-between p-5 bg-white sm:h-[calc(100%-15rem)] ">
									<p className="text-lg font-bold">
										Benefits of using AI to improve hiring experience
									</p>
									<p className="text-xs">20 October 2022</p>
									<p className="text-xs text-gray-700 mb-3 ">
										The use of artificial intelligence (AI) in the hiring process is
										changing the way businesses recruit and hire new employees. AI-powered ...
									</p>

									<button className="flex items-center gap-2 text-[color:var(--blue)]">
										Read more
										<BsArrowRight />
									</button>
								</div>
							</div>
						</Link>
						<Link to="/singleblog/6" state={blog6}>
							<div className="border rounded-lg overflow-hidden group cursor-pointer bg-white h-max">
								<img
									src="https://giant-kryptops-a8d.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fa10ef1c8-8e47-404d-93e2-3d426868598e%2Fpexels-pixabay-373543.jpg?id=9bb5ddd1-fc46-46a4-ba49-b6ffe2bdedf3&table=block&spaceId=0ad61581-97b0-4338-9dd4-c86a52ecf20b&width=2000&userId=&cache=v2"
									alt=""
									className=" w-full object-fill sm:object-cover md:object-fill sm:h-60 xl:h-80 group-hover:scale-105 transition-transform duration-200 ease-in-out "
								/>
								<div className="flex flex-col gap-2 justify-between p-5 bg-white sm:h-[calc(100%-15rem)] ">
									<p className="text-lg font-bold">How AI is revolutionizing the hiring process</p>
									<p className="text-xs">02 November 2022</p>
									<p className="text-xs text-gray-700 mb-3 ">
										Many businesses and industries, including hiring, are being transformed by
										artificial intelligence (AI). AI-powered tools are being used to ...
									</p>

									<button className="flex items-center gap-2 text-[color:var(--blue)]">
										Read more
										<BsArrowRight />
									</button>
								</div>
							</div>
						</Link>
					</div>
				</div>
			</div>

			{/* <Newsletter /> */}
		</div>
	);
};

export default SingleBlog;