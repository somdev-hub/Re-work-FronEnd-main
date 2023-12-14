import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { baseUrl } from "../../baseUrl";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";

const StrategicCommunity = () => {
  const [fullName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [company, setcompany] = useState("");
  const [message, setMessage] = useState("");

  const [isCheck, setIsCheck] = useState(false);
  const [error, setError] = useState("");

  const [investLoader, setInvestLoader] = useState(false);

  useEffect(() => {
    const toTop = () => {
      window.scrollTo(0, 0);
    };
    return () => {
      toTop();
    };
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = async (e) => {
    // e.preventDefault();

    setInvestLoader(true);
    if (isCheck) {
      const data = { fullName, email, phoneNumber, company, message };
      fetch(`${baseUrl}/admin/InvestQurey`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data)
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          toast("Form submitted!");
          setName("");
          setEmail("");
          setphoneNumber("");
          setcompany("");
          setMessage("");
          setInvestLoader(false);
          reset();
        });
    } else {
      setInvestLoader(false);
      setError("Please accept our conditions!");
      throw new Error("Please check this first!");
    }
  };

  return (
    <div className="bg-[#5C27C0] px-[1.3rem] lg:px-[6.25rem] py-10 sm:py-[5rem] flex lg:flex-row flex-col gap-[3rem] sm:gap-[7rem]">
      <div className="flex-1">
        <h1 className="font-[400] text-[2rem] leading-normal sm:text-[4rem] text-center sm:text-left font-gilroy-medium sm:leading-[4rem] text-white">
          we are on the search for strategic community investors
        </h1>
        <p className="font-400] text-[1.1rem] sm:text-[1.25rem] text-center sm:text-left font-quicksand text-white mt-8">
          We want to encompass voices and resources from leading organizations
          that are supporting remote workers and leaders as we pursue the
          mission of creating the most thriving community of remote
          professionals in the world.
        </p>
        <p className="font-[400] text-[1.1rem] sm:text-[1.25rem] text-center sm:text-left font-quicksand text-white mt-4">
          Selected partners will have the opportunity to offer offer exclusive
          offers and resources to our community, generating pipeline and
          positioning your organization as a thought leader, alongside the work
          we are doing at Remote.
        </p>
        <h3 className="font-[400] text-[1.3rem] text-center sm:text-left sm:text-[2rem] font-gilroy-light text-white mt-[4rem]">
          If you are interested in being a part of our company,{" "}
          <span className="font-gilroy-medium">apply today!</span>
        </h3>
      </div>
      <div className="flex-1 text-black py-8 ">
        <div className="max-w-lg mx-auto md:ml-auto md:mr-0 bg-white rounded-lg p-4">
          <h6 className="text-2xl font-medium text-center py-5">
            Get Information
          </h6>

          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              {...register("fullName", { required: true })}
              value={fullName}
              onChange={(e) => [setName(e.target.value)]}
              type="text"
              placeholder="Full Name"
              className="border-b outline-none mx-4 px-3 py-2"
            />
            {errors.fullName && (
              <p className="text-red-500 text-right text-sm">
                *Name is required.
              </p>
            )}
            <input
              {...register("email", { required: true })}
              value={email}
              onChange={(e) => [setEmail(e.target.value)]}
              type="text"
              placeholder="Email"
              className="border-b outline-none mx-4 px-3 py-2"
            />
            {errors.email && (
              <p className="text-red-500 text-right text-sm">
                *Email is required.
              </p>
            )}
            <input
              {...register("phoneNumber", {
                pattern: /^[1-9]{1}[0-9]{9}$/
              })}
              {...register("phoneNumber", { required: true })}
              value={phoneNumber}
              onChange={(e) => [setphoneNumber(e.target.value)]}
              type="number"
              placeholder="Phone Number"
              className="border-b outline-none mx-4 px-3 py-2"
            />
            {((phoneNumber?.length > 0 && phoneNumber?.length !== 10) ||
              errors.phoneNumber) && (
              <p className="text-red-500 text-right text-xs">
                *Phone number must contain 10 digit.
              </p>
            )}
            <input
              value={company}
              {...register("company", { required: true })}
              onChange={(e) => [setcompany(e.target.value)]}
              type="text"
              placeholder="Company Name"
              className="border-b outline-none mx-4 px-3 py-2"
            />
            {errors.company && (
              <p className="text-red-500 text-right text-sm">
                *Company Name is required.
              </p>
            )}
            <input
              {...register("message", { required: true })}
              value={message}
              onChange={(e) => [setMessage(e.target.value)]}
              type="text"
              placeholder="Anything else we should know?"
              className="border-b outline-none mx-4 px-3 py-2"
            />
            {errors.message && (
              <p className="text-red-500 text-right text-sm">
                *Message is required.
              </p>
            )}

            <h5 className="mx-4 text-red-500">{error}</h5>
            <div htmlFor="" className="flex items-start mx-4 ">
              <input
                type="checkbox"
                className="m-2 text-xl"
                checked={isCheck}
                onClick={(e) => {
                  setIsCheck(!isCheck);
                }}
              />
              <p className="text-sm">
                Allow Rework to use the information you provide to contact you
                about their products and services. You can unsubscribe from
                communications from Remote at any time. For more information,
                check out Remote's Privacy Policy.
              </p>
            </div>

            {investLoader ? (
              <div className="flex justify-center ">
                <ThreeDots
                  height="50"
                  width="50"
                  radius="9"
                  color="#4287f5"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                />
              </div>
            ) : (
              <button className="bg-[color:var(--blue)] py-2 px-5 rounded-md text-white text-lg font-semibold mx-auto my-4">
                Submit
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default StrategicCommunity;
