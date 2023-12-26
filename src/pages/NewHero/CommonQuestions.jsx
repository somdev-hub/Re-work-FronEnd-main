import React, { useEffect } from "react";

const CommonQuestions = () => {
  // const questions = [
  //   {
  //     question: "What is an AI Interview? How Does it Work?",
  //     answer:
  //       "Absolutely! Our platform allows assessment for any role. Specifically for technical roles, CredoHire comes with Integrated Development Environments (IDEs) and coding round option you can select at the time of job creation. The coding round comprises two Data Structure and Algorithm (DSA) questions. Candidates can choose their coding language — be it C++, Java, Python, or any preferred language, to answer or code the questions."
  //   },
  //   {
  //     question: "Can I Evaluate the Candidates for Technical roles also?",
  //     answer:
  //       "AI interviews ensure fair, consistent evaluations by analysing diverse candidate data like verbal responses and facial expressions, offering deeper insights into suitability. They expedite screening, saving time for recruiters and candidates, ultimately enhancing objectivity and assessment quality."
  //   },
  //   {
  //     question:
  //       "How can the AI interview help us in our Talent assessment Process?",
  //     answer:
  //       "Absolutely! Our platform allows assessment for any role. Specifically for technical roles, CredoHire comes with Integrated Development Environments (IDEs) and coding round option you can select at the time of job creation. The coding round comprises two Data Structure and Algorithm (DSA) questions. Candidates can choose their coding language — be it C++, Java, Python, or any preferred language, to answer or code the questions."
  //   },
  //   {
  //     question: "How do I get Paid?",
  //     answer:
  //       "AI interviews ensure fair, consistent evaluations by analysing diverse candidate data like verbal responses and facial expressions, offering deeper insights into suitability. They expedite screening, saving time for recruiters and candidates, ultimately enhancing objectivity and assessment quality."
  //   },
  //   {
  //     question: "Can I Evaluate the Candidates for Technical roles also?",
  //     answer:
  //       "Absolutely! Our platform allows assessment for any role. Specifically for technical roles, CredoHire comes with Integrated Development Environments (IDEs) and coding round option you can select at the time of job creation. The coding round comprises two Data Structure and Algorithm (DSA) questions. Candidates can choose their coding language — be it C++, Java, Python, or any preferred language, to answer or code the questions."
  //   },
  //   {
  //     question:
  //       "How can the AI interview help us in our Talent assessment Process?",
  //     answer:
  //       "AI interviews ensure fair, consistent evaluations by analysing diverse candidate data like verbal responses and facial expressions, offering deeper insights into suitability. They expedite screening, saving time for recruiters and candidates, ultimately enhancing objectivity and assessment quality."
  //   },
  //   {
  //     question: "How do I get Paid?",
  //     answer:
  //       "Absolutely! Our platform allows assessment for any role. Specifically for technical roles, CredoHire comes with Integrated Development Environments (IDEs) and coding round option you can select at the time of job creation. The coding round comprises two Data Structure and Algorithm (DSA) questions. Candidates can choose their coding language — be it C++, Java, Python, or any preferred language, to answer or code the questions."
  //   }
  // ];
  const [questions, setQuestions] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("/data/newhero/common_questions.json");
      const response = await data.json();
      setQuestions(response);
    };
    fetchData();
  }, []);

  const midIndex = Math.ceil(questions?.length / 2);

  const firstHalf = questions?.slice(0, midIndex);
  const secondHalf = questions?.slice(midIndex);

  // console.log(firstHalf);
  // console.log(secondHalf);
  const [isOpen, setIsOpen] = React.useState([]);
  return (
    <div className="px-[1.5rem] xl:px-[7.5rem] py-[3rem] lg:py-[6.62rem] bg-[#5C27C0] mt-[7rem] md:mt-[10rem]">
      <h2 className="text-[#F3F3F3] font-poppins text-[2.6rem] font-[700] leading-[3rem]">
        Common <span className="font-[400]">Questions</span>
      </h2>
      <p className="text-[#E5D7FF] text-[1.125rem] font-[400] leading-[1.3rem] mt-3">
        We have Compiled the most commonly asked question about our Platform for
        your information and to enhance your overall experience.
      </p>
      <div className="mt-[4rem] flex flex-col md:flex-row gap-10">
        <div className="flex-1">
          {firstHalf.map((item, index) => {
            const uid = `p-${index}`;
            return (
              <div
                className={`border-t-2 border-white py-[1.25rem] ${
                  index === firstHalf.length - 1 && "border-b-2"
                }`}
                key={index}
              >
                <div
                  className="cursor-pointer flex justify-between items-center"
                  onClick={() =>
                    setIsOpen((prev) =>
                      prev.includes(uid)
                        ? prev.filter((item) => item !== uid)
                        : [...prev, uid]
                    )
                  }
                >
                  <h3 className="flex-1 w-full relative text-[18px] leading-[22px] font-medium font-poppins text-white text-left inline-block">
                    {item.question}
                  </h3>
                  <h1 className="font-bold text-white text-[1.5rem]">
                    {isOpen.includes(uid) ? "-" : "+"}
                  </h1>
                </div>
                {(isOpen.includes(uid) || index === 0) && (
                  <p className="w-full relative text-[16px] leading-[22px] font-light font-poppins text-white text-left inline-block mt-3">
                    {item.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex-1">
          {secondHalf.map((item, index) => {
            const uid = `q-${index}`;
            return (
              <div
                className={`border-t-2 border-white py-[1.25rem] ${
                  index === secondHalf.length - 1 && "border-b-2"
                }`}
                key={index}
              >
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() =>
                    setIsOpen((prev) =>
                      prev.includes(uid)
                        ? prev.filter((item) => item !== uid)
                        : [...prev, uid]
                    )
                  }
                >
                  <h3 className="flex-1 w-full relative text-[18px] leading-[22px] font-medium font-poppins text-white text-left inline-block">
                    {item.question}
                  </h3>
                  <h1 className="font-bold text-white text-[1.5rem]">
                    {isOpen.includes(uid) ? "-" : "+"}
                  </h1>
                </div>
                {(isOpen.includes(uid) || index === 0) && (
                  <p className="w-full relative text-[16px] leading-[22px] font-light font-poppins text-white text-left inline-block mt-3">
                    {item.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CommonQuestions;
