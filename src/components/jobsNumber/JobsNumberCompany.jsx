import React from 'react';

const JobsNumberCompany = () => {
    return (
        <div className="py-8 px-6 md:py-10 md:px-14 lg:px-20 xl:px-24 bg-gradient-to-l from-[#444DA1] to-[#2068FF]">
            <div className="text-white text-center md:text-left text-2xl flex flex-col items-center gap-10 md:flex-row md:justify-around flex-wrap py-5">
                <div>
                    <p className="font-semibold text-4xl mb-2">5k+</p>
                    <h3>Recruiters' Network</h3>
                </div>
                <div>
                    <p className="font-semibold text-4xl mb-2">100K+</p>
                    <h3> Hiring Hours Saved</h3>
                </div>
                <div> 
                    <p className="font-semibold text-4xl mb-2">80% </p>
                    <h3>TAT Reduced
                    </h3>
                </div>
                <div>
                    <p className="font-semibold text-4xl mb-2">$1M+</p>
                    <h3>Savings for Partners</h3>
                </div>
            </div>
        </div>
    );
};

export default JobsNumberCompany;