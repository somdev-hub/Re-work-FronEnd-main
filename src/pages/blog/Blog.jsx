import React, { useEffect } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const Blog = () => {
	useEffect(() => {
		const toTop = () => {
			window.scrollTo(0, 0);
		};
		return () => {
			toTop();
		};
	}, []);

	const blog1 = [
		{
			heading: 'Tips for streamlining the hiring process',
			date: '03 September 2022',
			readingTime:'4 minutes',
			image:
				'https://giant-kryptops-a8d.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Feac8efe8-181d-4953-a396-69e7a6dc9403%2Fpexels-kampus-production-8636626.jpg?id=636050fb-e139-442b-9aec-f0835930d21b&table=block&spaceId=0ad61581-97b0-4338-9dd4-c86a52ecf20b&width=2000&userId=&cache=v2',
			para1:
				'Hiring the right people for your team is critical to success, but the process of finding and onboarding new employees can be time-consuming and costly. Fortunately, there are several ways to streamline and improve the hiring process. We will go over some tips and best practises for streamlining the hiring process in this blog post.',
			para2:
				'First and foremost, you must have a thorough understanding of the job for which you are hiring. You should write a detailed job description that outlines the positions duties, responsibilities, and qualifications. This will allow you to quickly and easily evaluate potential candidates to ensure they have the necessary skills and experience to succeed in the role.',
			para3:
				'Once you have  created a job description, you will need to figure out how to find candidates. You can use a variety of techniques, including online job boards, referrals, and even headhunting. Once you have identified potential candidates, set up an efficient screening process to quickly identify the best fit for the job.',
			para4:
				'When interviewing potential candidates, try to learn as much as you can about their skills and abilities. Ask probing questions, such as how they handle difficult situations or how they have handled similar responsibilities in the past. This will allow you to quickly determine which candidate is a good fit.',

			para5:
				'You should also have a clear timeline for the hiring process. Send out job offers as soon as possible to avoid losing out on the best candidates. A timeline will also assist in ensuring that the process runs smoothly and that the right person is hired on time.',

			para6:
				'Finally, you should think about using a variety of tools and technologies to make the hiring process more efficient. Automation software can assist you in quickly reviewing resumes and sorting through candidates, whereas applicant tracking systems can assist you in keeping track of the entire process. Furthermore, video interviewing software can be used to conduct interviews remotely, saving time and money.',

			para7:
				'By following these suggestions, you can make the hiring process more efficient and effective. You can ensure that you hire the right people for the job in a timely and cost-effective manner by investing time and resources into streamlining the process.',
		},
	];
	const blog2 = [
		{
			heading: 'How to make the most of your recruitment budget',
			date: '15 September 2022',
			readingTime:'3 minutes',
			image:
				'https://giant-kryptops-a8d.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F5efe9c44-e488-4331-8ecb-bcf495760c64%2Fpexels-tima-miroshnichenko-6694543.jpg?id=8d73ecce-629b-4067-9948-44e99d8ee8b1&table=block&spaceId=0ad61581-97b0-4338-9dd4-c86a52ecf20b&width=2000&userId=&cache=v2',
			para1:
				'Recruiting new employees is one of the most important investments any company can make, but it can also be one of the most expensive. As a result, it is critical for businesses to maximise their recruitment budget and ensure the best return on investment. Here are some pointers to help businesses maximise their recruitment budget.',
			para2:
				'First and foremost, it is critical that businesses understand the recruitment process. This includes understanding the roles and responsibilities of each team member involved in the recruitment process, as well as the timeline and budget. A thorough understanding of the recruitment process will assist businesses in avoiding potential pitfalls or any delays in the hiring process.',
			para3:
				'Second, companies should think about using technology to streamline the hiring process. AI-powered recruitment tools can be used to automate and streamline certain aspects of the recruitment process. Furthermore, businesses should use the numerous job boards and social media platforms to post job openings and reach a wider range of applicants.',
			para4:
				'Third, companies should consider using data to inform their hiring decisions. Using analytics tools, for example, to analyse candidate resumes and identify the best candidates for the job can help businesses make more informed hiring decisions. Furthermore, businesses should consider using data to gain insights into their hiring process and identify areas for improvement.',

			para5:
				'Fourth, companies should think about using outside recruitment services. External recruitment services can help businesses save time and money by giving them access to a large pool of qualified candidates. Furthermore, external recruitment services can frequently provide businesses with insights into recruitment market trends as well as advice on how to best optimise their recruitment process.',

			para6:
				'Finally, businesses should think about using employee referrals. Employee referrals can be a great way for businesses to find qualified and experienced candidates because they provide access to a network of potential applicants. Furthermore, referrals are frequently more cost-effective than other recruitment strategies because they reduce the time and money spent on the recruitment process.',

			para7:
				'Finally, businesses must make the most of their recruitment budget in order to maximise their return on investment. Businesses can optimise their recruitment process and ensure they find the best candidates for the job by understanding the recruitment process, leveraging technology and data, considering external recruitment services, and leveraging employee referrals.',
		},
	];

	const blog3 = [
		{
			heading: 'Best practices for recruiting with AI technology',
			date: '30 September 2022',
			readingTime:'4 minutes',
			image:
				'https://giant-kryptops-a8d.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F3f3e1576-d41a-4b50-9e21-30aa6a1b7009%2Fpexels-antoni-shkraba-4348404.jpg?id=e5e814b6-d5ea-4e43-a780-e4bc86902618&table=block&spaceId=0ad61581-97b0-4338-9dd4-c86a52ecf20b&width=2000&userId=&cache=v2',
			para1:
				'Recruiting with AI technology is becoming more popular as companies seek to use the power of Artificial Intelligence (AI) to streamline their hiring process and find the best candidates for their job openings. However, there are numerous best practises that businesses should follow when employing AI technologies for recruiting.',
			para2:
				'First and foremost, businesses should ensure that they are using AI technology responsibly and in a way that respects the rights of job applicants. This includes being transparent about the way AI is being used in the hiring process and allowing applicants to opt-out if they wish. It is also important to ensure that AI technology is not being used to discriminate against any particular group of people or to make decisions based on personal characteristics such as age, gender, race, or religion. Businesses should also strive to ensure that their AI-driven recruitment processes are fair, ethical, and legal.',
			para3:
				'Second, businesses should ensure that their AI technology is up-to-date and properly trained. AI technology is constantly evolving and improving, so businesses should make sure that their AI is regularly updated and trained on the latest technology and best practices. This will ensure that the AI is able to accurately identify the best candidates for the job.',
			para4:
				'Third, businesses should strive to use AI technology in a way that is beneficial to both employers and applicants. For example, businesses should use AI technology to make the recruitment process more efficient and reduce the amount of time and effort required to find the right candidate. However, they should also be mindful of the applicant experience and ensure that the AI technology is not used in a way that is intrusive or overwhelming.',

			para5:
				'Fourth, companies should think about using outside recruitment services. External recruitment services can help businesses save time and money by giving them access to a large pool of qualified candidates. Furthermore, external recruitment services can frequently provide businesses with insights into recruitment market trends as well as advice on how to best optimize their recruitment process.',

			para6:
				'Finally, businesses should consider the implications of using AI technology to automate certain aspects of the recruitment process. Automation can be a great way to streamline the recruitment process and reduce the amount of time and effort required to find the right candidate. However, businesses should be aware of the potential risks associated with automation, such as data privacy and security concerns, as well as potential legal implications.',

			para7:
				'In conclusion, businesses should be mindful of the practices for recruiting with AI technologies for safest and best outcomes.',
		},
	];

	const blog4 = [
		{
			heading: 'How recruiters can make more money with AI-driven employer leads',
			date: '12 October 2022',
			readingTime:'2 minutes',
			image: 'https://giant-kryptops-a8d.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fee4ed37b-c47e-4118-b1e7-e9c6b3b403e5%2Fpexels-cottonbro-studio-5990030.jpg?id=b72fa913-fcfa-4629-996e-fb09c18ecdd4&table=block&spaceId=0ad61581-97b0-4338-9dd4-c86a52ecf20b&width=2000&userId=&cache=v2',
			para1:
				'Recruiters are constantly looking for ways to increase their earnings and stay ahead of the competition. Recruiters now have access to powerful tools that can help them identify and close more deals, thanks to the rise of Artificial Intelligence (AI). AI-driven employer leads can help recruiters increase their income and find the best candidates for their clients. Data analysis and machine learning algorithms search through millions of job postings, resumes, and profiles to find the best matches for recruiters to generate AI-driven employer leads. Using AI-driven employer leads, recruiters can quickly identify the best candidates while saving time and money.',
			para2:
				"AI-driven employer leads can also be used by recruiters to target specific job seekers and increase their chances of success. AI-powered employer leads can provide recruiters with detailed insights into potential candidates' skills and experience, allowing them to identify the best matches for their clients. Furthermore, AI-powered employer leads can be used to find the best job opportunities for recruiters and their clients, allowing them to close more deals.",
			para3:
				'AI-driven employer leads can also assist recruiters in developing relationships with their clients and improving their industry reputation. Recruiters can demonstrate their expertise and ability to find the best candidates for the job by providing their clients with more accurate and relevant leads. This can lead to more referrals and more business opportunities for recruiters.',
			para4:
				'Overall, AI-powered employer leads can help recruiters earn more money and stay ahead of the competition. Recruiters can quickly identify the best candidates and increase their chances of success by leveraging AI-driven employer leads. Furthermore, they can develop relationships with their clients and demonstrate their expertise, which leads to more referrals and business opportunities. Recruiters can be confident that they are getting the best candidates for the job in less time and at a lower cost when they use AI-driven employer leads.',


		},
	];

	const blog5 = [
		{
			heading: 'Benefits of using AI to improve hiring experience',
			date: '20 October 2022',
			readingTime:'3 minutes',
			image: 'https://giant-kryptops-a8d.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F67f34ec4-869a-42f2-b7af-a2f45c40c50d%2Fpexels-alex-knight-2599244.jpg?id=7e55b541-779e-4c5b-ae9a-84b8b9af9754&table=block&spaceId=0ad61581-97b0-4338-9dd4-c86a52ecf20b&width=2000&userId=&cache=v2',
			para1:
				"The use of artificial intelligence (AI) in the hiring process is changing the way businesses recruit and hire new employees. AI-powered technologies are changing the way recruiters interact with potential employees and making it easier for businesses to find top talent. With AI, businesses can quickly find the best candidates for their open positions, guaranteeing that they hire the best people. In this blog, we'll look at the various advantages of using AI to improve the hiring process.",
			para2:
				"To begin with, using AI in the hiring process makes it easier to find the right candidates. Artificial intelligence-powered technologies can quickly analyze data such as resumes, skills, and experience to determine who is best suited for a specific job. This ensures that recruiters can identify the best candidates and move them quickly through the hiring process.",
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
			image: 'https://giant-kryptops-a8d.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fa10ef1c8-8e47-404d-93e2-3d426868598e%2Fpexels-pixabay-373543.jpg?id=9bb5ddd1-fc46-46a4-ba49-b6ffe2bdedf3&table=block&spaceId=0ad61581-97b0-4338-9dd4-c86a52ecf20b&width=2000&userId=&cache=v2',
			para1:
				"Many businesses and industries, including hiring, are being transformed by artificial intelligence (AI). AI-powered tools are being used to streamline and optimise the recruitment process, allowing businesses to find the best candidates for any job quickly and accurately. In this blog post, we'll look at how AI is transforming the hiring process and why it's critical to consider investing in AI-powered recruitment solutions.",
			para2:
				"AI-powered tools are transforming how businesses search for and identify potential candidates. AI-powered solutions can quickly scan resumes and other job applications for important information, such as relevant experience and qualifications. This process is much faster than manual reviews and enables businesses to quickly identify the most qualified candidates for any job.",
			para3:
				'AI-powered recruitment solutions can also go beyond simple resume scanning to provide more in-depth insights into potential candidates. These solutions can use data from previous jobs, personality traits, and cultural fit to provide a more complete picture of a candidate. This enables businesses to make more informed decisions when selecting the best candidate.',
			para4:
				'Furthermore, AI-powered recruitment solutions can automate many of the time-consuming and tedious tasks associated with the hiring process. This includes tasks like scheduling interviews, arranging assessments, and distributing job offers. Companies can reduce the amount of time and resources spent on recruitment by automating these processes and focusing more on finding the right candidate for the job.',

			para5:
				"Finally, AI-powered recruitment solutions can provide useful insights into the hiring process. AI-driven solutions can provide companies with valuable insights into their recruitment process by analysing data, such as where they are most likely to find the best candidates or which channels are most effective for sourcing talent. This information can assist businesses in streamlining their hiring processes and making more informed hiring decisions.",

			para6:
				'Finally, AI-driven recruitment solutions are changing the way businesses find and hire new employees. These solutions can identify the most qualified candidates for any job quickly and accurately, as well as provide valuable insights into the recruitment process. Companies can reduce the time and resources spent on recruitment while improving the quality of their hires by investing in AI-driven recruitment solutions.',

		},
	];

	return (
		<div>
			<div className="bg-[color:var(--blue)]">
				<div className="py-8 px-6 md:py-10 md:px-14 lg:px-20 xl:px-24">
					<h2 className="text-white text-xl md:text-3xl lg:text-4xl font-bold">Blogs</h2>
				</div>
			</div>

			<div className="py-8 px-6 md:py-10 md:px-14 lg:px-20 xl:px-24 flex flex-col gap-10">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mt-3">
					<Link to="/singleblog/1" state={blog1}>
						<div className="border rounded-lg overflow-hidden group cursor-pointer bg-white h-max">
							<img
								src="https://giant-kryptops-a8d.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Feac8efe8-181d-4953-a396-69e7a6dc9403%2Fpexels-kampus-production-8636626.jpg?id=636050fb-e139-442b-9aec-f0835930d21b&table=block&spaceId=0ad61581-97b0-4338-9dd4-c86a52ecf20b&width=2000&userId=&cache=v2"
								alt=""
								className=" w-full object-fill sm:object-cover md:object-fill sm:h-60 xl:h-80 group-hover:scale-105 transition-transform duration-200 ease-in-out "
							/>
							<div className="flex flex-col gap-2 justify-between p-5 bg-white sm:h-[calc(100%-15rem)] ">
								<p className="text-lg font-bold">Tips for streamlining the hiring <br /> process</p>
								<p className="text-xs">03 September 2022</p>
								<p className="text-xs text-gray-700 mb-3 ">
									Hiring the right people for your team is critical to success,
									but the process of finding and onboarding new employees can be ...
								</p>

								<button className="flex items-center gap-2 text-[color:var(--blue)]">
									Read more
									<BsArrowRight />
								</button>
							</div>
						</div>
					</Link>
					<Link to="/singleblog/2" state={blog2}>
						<div className="border rounded-lg overflow-hidden group cursor-pointer bg-white h-max">
							<img
								src="https://giant-kryptops-a8d.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F5efe9c44-e488-4331-8ecb-bcf495760c64%2Fpexels-tima-miroshnichenko-6694543.jpg?id=8d73ecce-629b-4067-9948-44e99d8ee8b1&table=block&spaceId=0ad61581-97b0-4338-9dd4-c86a52ecf20b&width=2000&userId=&cache=v2"
								alt=""
								className=" w-full object-fill sm:object-cover md:object-fill sm:h-60 xl:h-80 group-hover:scale-105 transition-transform duration-200 ease-in-out "
							/>
							<div className="flex flex-col gap-2 justify-between p-5 bg-white sm:h-[calc(100%-15rem)] ">
								<p className="text-lg font-bold">How to make the most of your recruitment budget</p>
								<p className="text-xs">15 September 2022</p>
								<p className="text-xs text-gray-700 mb-3 ">
									Recruiting new employees is one of the most important investments any company can make,
									but it can also be one of the most ...
								</p>

								<button className="flex items-center gap-2 text-[color:var(--blue)]">
									Read more
									<BsArrowRight />
								</button>
							</div>
						</div>
					</Link>
					<Link to="/singleblog/3" state={blog3}>
						<div className="border rounded-lg overflow-hidden group cursor-pointer bg-white h-max">
							<img
								src="https://giant-kryptops-a8d.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F3f3e1576-d41a-4b50-9e21-30aa6a1b7009%2Fpexels-antoni-shkraba-4348404.jpg?id=e5e814b6-d5ea-4e43-a780-e4bc86902618&table=block&spaceId=0ad61581-97b0-4338-9dd4-c86a52ecf20b&width=2000&userId=&cache=v2"
								alt=""
								className=" w-full object-fill sm:object-cover md:object-fill sm:h-60 xl:h-80 group-hover:scale-105 transition-transform duration-200 ease-in-out "
							/>
							<div className="flex flex-col gap-2 justify-between p-5 bg-white sm:h-[calc(100%-15rem)] ">
								<p className="text-lg font-bold">Best practices for recruiting with AI technology</p>
								<p className="text-xs">30 September 2022</p>
								<p className="text-xs text-gray-700 mb-3 ">
									Recruiting with AI technology is becoming more popular as companies seek to use the power
									of Artificial Intelligence ...
								</p>

								<button className="flex items-center gap-2 text-[color:var(--blue)]">
									Read more
									<BsArrowRight />
								</button>
							</div>
						</div>
					</Link>
					<Link to="/singleblog/4" state={blog4}>
						<div className="border rounded-lg overflow-hidden group cursor-pointer bg-white h-max">
							<img
								src="https://giant-kryptops-a8d.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fee4ed37b-c47e-4118-b1e7-e9c6b3b403e5%2Fpexels-cottonbro-studio-5990030.jpg?id=b72fa913-fcfa-4629-996e-fb09c18ecdd4&table=block&spaceId=0ad61581-97b0-4338-9dd4-c86a52ecf20b&width=2000&userId=&cache=v2"
								alt=""
								className=" w-full object-fill sm:object-cover md:object-fill sm:h-60 xl:h-80 group-hover:scale-105 transition-transform duration-200 ease-in-out "
							/>
							<div className="flex flex-col gap-2 justify-between p-5 bg-white sm:h-[calc(100%-15rem)] ">
								<p className="text-lg font-bold">How recruiters can make more money with AI-driven employer leads</p>
								<p className="text-xs">12 October 2022</p>
								<p className="text-xs text-gray-700 mb-3 ">
									Recruiters are constantly looking for ways to increase their earnings and
									stay ahead of the competition. Recruiters now have access to ...
								</p>

								<button className="flex items-center gap-2 text-[color:var(--blue)]">
									Read more
									<BsArrowRight />
								</button>
							</div>
						</div>
					</Link>
					<Link to="/singleblog/5" state={blog5}>
						<div className="border rounded-lg overflow-hidden group cursor-pointer bg-white h-max">
							<img
								src="https://giant-kryptops-a8d.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F67f34ec4-869a-42f2-b7af-a2f45c40c50d%2Fpexels-alex-knight-2599244.jpg?id=7e55b541-779e-4c5b-ae9a-84b8b9af9754&table=block&spaceId=0ad61581-97b0-4338-9dd4-c86a52ecf20b&width=2000&userId=&cache=v2"
								alt=""
								className=" w-full object-fill sm:object-cover md:object-fill sm:h-60 xl:h-80 group-hover:scale-105 transition-transform duration-200 ease-in-out "
							/>
							<div className="flex flex-col gap-2 justify-between p-5 bg-white sm:h-[calc(100%-15rem)] ">
								<p className="text-lg font-bold">Benefits of using AI to improve hiring experience</p>
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

			{/* <Newsletter /> */}
		</div>
	);
};

export default Blog;