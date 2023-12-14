import React from "react";

const JobsNumbers = () => {
  return (
    <div className="py-8 px-6 md:py-10 md:px-14 lg:px-20 xl:px-24 bg-gradient-to-l
     from-[#444DA1] to-[#2068FF]">
      <div className="text-white text-center md:text-left text-2xl flex flex-col items-center gap-10
       md:flex-row md:justify-around flex-wrap py-5">
        <div>
          <p className="font-semibold text-4xl mb-2">10+</p>
          <h3>Startups</h3>
        </div>
        <div>
          <p className="font-semibold text-4xl mb-2">30+</p>
          <h3>Open Positions</h3>
        </div> 
        <div>
          <p className="font-semibold text-4xl mb-2">$100K+</p>
          <h3>Earned by Recruiters
          </h3>
        </div>
        <div>
          <p className="font-semibold text-4xl mb-2">20+</p>
          <h3>MNCs
          </h3>
        </div>
      </div>
    </div>
  );
};

export default JobsNumbers;
