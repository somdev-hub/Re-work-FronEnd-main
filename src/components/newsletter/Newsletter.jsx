import React from "react";
import { FiMail } from "react-icons/fi";

const Newsletter = () => {
  return (
    <div className="bg-[color:var(--blue)] text-white">
      <div className="border-2 p-5 lg:py-14 bg-[color:var(--blue)] flex flex-col gap-4">
        <h2 className="text-white font-bold text-center text-2xl md:text-3xl lg:text-5xl">
          Subscribe to our Newsletter
        </h2>
        <p className="text-white text-center md:text-lg lg:text-xl ">
          Get extra benefits, fast updated emails.
        </p>

        <form>
          <div className="w-full gap-4 flex justify-center flex-wrap items-center">
            <div className="md:mb-6">
              <input
                type="text"
                className="
              form-control
              block
              w-full
              px-3
              py-1.5
              text-base
              font-normal
              text-gray-700
              bg-white bg-clip-padding
              border border-solid border-gray-300
              rounded
              transition
              ease-in-out
              m-0
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
            "
                id="email"
                placeholder="Email address"
              />
            </div>

            <div className="md:mb-6">
              <button
                type="button"
                className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                Subscribe
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
