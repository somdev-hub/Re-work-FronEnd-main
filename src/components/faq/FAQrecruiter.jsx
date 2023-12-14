import { Fragment, useState } from 'react';
import { Accordion, AccordionHeader, AccordionBody } from '@material-tailwind/react';

function Icon({ id, open }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className={`${id === open ? 'rotate-180' : ''} h-5 w-5 transition-transform`}
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeWidth={2}>
			<path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
		</svg>
	);
}

const FAQrecruiter = () => {
	const [open, setOpen] = useState(1);

	const handleOpen = (value) => {
		setOpen(open === value ? 0 : value);
	};

	const data = [
		{
			id: 1,
			title: 'How do I claim a role?',
			desc: 'Just login to the recruiter section. You will have a page containing all the roles posted by the partner companies. You can then claim the role that you think will work best for your network.',
		},
		{
			id: 2,
			title: 'What should I do to get started?',
			desc: 'Just sign up with us and you’ll get access to all the positions by some of the great companies. It’s that simple.',
		},
		{
			id: 3,
			title: 'How much days would it take to redeem the money I earn?',
			desc: '45-60 Days depending on the roles you’re working. Money will be sent only when the selected candidate joins the company.',
		},
		{
			id: 4,
			title: 'How much can I earn through this platform as a recruiter?',
			desc: 'You can earn as much as you can. Ideal recruiters earn around 5-7% of Candidate’s Annual CTC',
		},

	];

	return (
		<div
			className="py-8 px-6 md:py-10 md:px-14 lg:px-20 xl:px-24 flex flex-col md:flex-row justify-center items-center xl:pt-20"
			id="recruiterFAQ">
			<div className="flex flex-col gap-5 sm:px-10">
				<h2 className="text-xl font-semibold my-2 md:text-3xl lg:text-6xl text-[#444444]">
					Frequently Asked{' '}
					<span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2068FF] to-[#444DA1]">
						Questions
					</span>
				</h2>

				<p className="max-w-sm">
					Couldn’t find what you were looking for? write to us at{" "}
					<a href='https://mail.google.com/mail/?view=cm&to=hello@rework.club'
						className='text-[#2068FF] hover:underline cursor-pointer' target={0}> hello@rework.club</a>
				</p>
				{/* <p className="max-w-sm">
					Couldn’t find what you were looking for? write to us at{" "}
					<span className='text-[#2068FF] hover:underline cursor-pointer' 
					onClick={() => window.location = 'mailto:hello@rework.club'} >hello@rework.club</span>
				</p> */}

			</div>

			<div className="py-8">
				<Fragment>
					{data.map((d) => (
						<Accordion key={d.id} open={open === d.id} icon={<Icon id={d.id} open={open} />}>
							<AccordionHeader onClick={() => handleOpen(d.id)}>{d.title}</AccordionHeader>
							<div className=" py-1 "></div>
							<AccordionBody>{d.desc}</AccordionBody>
						</Accordion>
					))}
				</Fragment>
			</div>
		</div>
	);
};

export default FAQrecruiter;
