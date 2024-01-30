import React from "react";
import plus_icon from "../../assets/plus-icon.svg";

const FAQ = () => {
  const [currentFaq, setCurrentFaq] = React.useState(0); // [0, function
  const faqs = [
    {
      question: "How can I Get started with Rework AI?",
      answer:
        "Lorem ipsum dolor sit amet consectetur. Porta velit ultricies feugiat tortor odio. Scelerisque habitant quam pharetra adipiscing id ipsum et lectus malesuada."
    },
    {
      question: "How can I Get started with Rework AI?",
      answer:
        "Lorem ipsum dolor sit amet consectetur. Porta velit ultricies feugiat tortor odio. Scelerisque habitant quam pharetra adipiscing id ipsum et lectus malesuada."
    },
    {
      question: "How can I Get started with Rework AI?",
      answer:
        "Lorem ipsum dolor sit amet consectetur. Porta velit ultricies feugiat tortor odio. Scelerisque habitant quam pharetra adipiscing id ipsum et lectus malesuada."
    },
    {
      question: "How can I Get started with Rework AI?",
      answer:
        "Lorem ipsum dolor sit amet consectetur. Porta velit ultricies feugiat tortor odio. Scelerisque habitant quam pharetra adipiscing id ipsum et lectus malesuada."
    },
    {
      question: "How can I Get started with Rework AI?",
      answer:
        "Lorem ipsum dolor sit amet consectetur. Porta velit ultricies feugiat tortor odio. Scelerisque habitant quam pharetra adipiscing id ipsum et lectus malesuada."
    },
    {
      question: "How can I Get started with Rework AI?",
      answer:
        "Lorem ipsum dolor sit amet consectetur. Porta velit ultricies feugiat tortor odio. Scelerisque habitant quam pharetra adipiscing id ipsum et lectus malesuada."
    },
    {
      question: "How can I Get started with Rework AI?",
      answer:
        "Lorem ipsum dolor sit amet consectetur. Porta velit ultricies feugiat tortor odio. Scelerisque habitant quam pharetra adipiscing id ipsum et lectus malesuada."
    },
    {
      question: "How can I Get started with Rework AI?",
      answer:
        "Lorem ipsum dolor sit amet consectetur. Porta velit ultricies feugiat tortor odio. Scelerisque habitant quam pharetra adipiscing id ipsum et lectus malesuada."
    }
  ];
  return (
    <div className="mx-6 xl:mx-[7.5rem] my-12 xl:my-[5rem] flex flex-col items-center justify-center">
      <h1 className="text-[#5C27C0] text-[2rem] xl:text-[2.625rem] text-center">
        <span className="font-[600] font-garnett-semi-bold ">
          Frequently asked{" "}
        </span>
        <span className="font-[400] font-garnett-regular">Questions</span>
      </h1>
      <p className="text-[#1C1C1C] font-poppins text-[1rem] xl:text-[1.125rem] font-[400] text-center mt-6 xl:mt-8">
        We have Compiled the most commonly asked question about our Platform for
        your information and to enhance your overall experience.
      </p>
      <div className="mt-[5rem]">
        {faqs.map((faq, index) => (
          <div
            className="px-4 xl:px-7 py-4 xl:py-6 border-solid border-[#5C27C0] border-2 rounded-[0.625rem] mb-4 cursor-pointer  "
            onClick={() => setCurrentFaq(index)}
            key={index}
          >
            <div className="flex justify-between">
              <p className="text-[#1C1C1C] font-poppins text-[1.125rem] font-[500]">
                {faq.question}
              </p>
              <img src={plus_icon} alt="" />
            </div>
            <p
              className={`${
                currentFaq === index ? "block" : "hidden"
              } mt-6 text-[#1C1C1C] font-poppins font-[300] transition-all duration-300`}
            >
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
