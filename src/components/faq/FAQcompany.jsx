import { Fragment, useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${id === open ? "rotate-180" : ""
        } h-5 w-5 transition-transform`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

const FAQcompany = () => {
  const [open, setOpen] = useState(1);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const data = [
    {
      id: 1,
      title: "How do I claim a role?",
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
    },
    {
      id: 2,
      title: "When should I start submitting candidate profiles?",
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
    },
    {
      id: 3,
      title: "Is there a limit on the number of open roles I can claim?",
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
    },
    {
      id: 4,
      title: "What happens if my claim expires?",
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
    },
    {
      id: 5,
      title: "What to build to get selected in my dream company?",
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
    },
  ];

  return (
    <div
      className="py-8 px-6 md:py-10 md:px-14 lg:px-20 xl:px-24 flex flex-col md:flex-row justify-center items-center xl:pt-20"
      id="companyFAQ"
    >
      <div className="flex flex-col gap-5 sm:px-10">
        <div className="text-sm bg-[color:var(--blue)] text-white py-2 px-3 rounded-md w-fit">
          FOR COMPANY
        </div>
        <h2 className="text-xl font-semibold my-2 md:text-3xl lg:text-6xl">
          Frequently Asked{" "}
          <span className="text-[color:var(--blue)]">Questions</span>
        </h2>

        <p className="max-w-sm">
          Couldn’t find what you were looking for? write to us at{" "}
          <span className='text-[#2068FF] hover:underline cursor-pointer'
            onClick={() => window.location = 'mailto:hello@rework.club'} >hello@rework.club</span>
        </p>

      </div>

      <div className="py-8 sm:px-10">
        <Fragment>
          {data.map((d) => (
            <Accordion
              key={d.id}
              open={open === d.id}
              icon={<Icon id={d.id} open={open} />}
            >
              <AccordionHeader onClick={() => handleOpen(d.id)}>
                {d.title}
              </AccordionHeader>
              <div className=" py-1 "></div>
              <AccordionBody>{d.desc}</AccordionBody>
            </Accordion>
          ))}
        </Fragment>
      </div>
    </div>
  );
};

export default FAQcompany;
