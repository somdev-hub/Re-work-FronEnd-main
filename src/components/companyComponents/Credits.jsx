import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import CompanyNotifications from './CompanyNotifications';
import { GrFormNext } from "react-icons/gr";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination, Autoplay } from "swiper";
import { useState } from 'react';
import { baseUrl } from '../../baseUrl';
import parse from 'html-react-parser';
import logo from '../../assets/logo.png'
import { ThreeDots } from 'react-loader-spinner';
import Loader from '../../hook/Loader';
// import "./styles.css"

import { loadStripe } from '@stripe/stripe-js';




const Credits = () => {
  const [plans, setPlans] = useState([]);
  const [companyDetails, setCompanyDetails] = useState();

  const [isDisabled, setIsDisabled] = useState(false);
  const [loaderBtn, setLoaderBtn] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // let verifyPayment = `${baseUrl}/payment/verifyPayment`
  const companyId = window.localStorage.getItem("userId");
  let token = localStorage.getItem("token");
  const companyData = async () => {
    try {
      const result = await fetch(
        `${baseUrl}/company/getCompanyById/${companyId}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }
      );
      const jsonData = await result.json();
      if (!result.ok) {
        throw new Error(jsonData.message);
      }
      setCompanyDetails(jsonData.posts);
      // console.log(jsonData);
    } catch (error) {
      console.log(error);
    }


  }
  const loadDataFromBackend = () => {
    let token = localStorage.getItem('token')
    fetch(`${baseUrl}/payment/creditesGetWithStatus`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then((res) => {
      //first check the status code

      if (res.status === 200) {
        //then extract the json data
        res.json().then((data) => {
          setPlans(data);
          setIsLoading(false)
        });
      }
    });
  };
  useEffect(() => {
    companyData();
    loadDataFromBackend();
  }, []);

  const [submitted, setSubmitted] = useState(false);







  let purchaseHandler = async (plan, Plan_id, planName) => {
    setLoaderBtn(plan);
    console.log({ plan, Plan_id });
    try {

      // const stripe = await loadStripe("pk_test_51NPIZSSCCjfn8eaHPPmHCIkzz85qzvtU2iXllW2VU23p0oESi8LfmJDyQhpqgqn44wF55wZnxAFbuzZ6snIyos4y00GF0uC78J");
      const stripe = await loadStripe("pk_live_51NPIZSSCCjfn8eaHGOWEvE1MLynpLw6KbmET1pCJIRKgYxyOU9ruIzMCCflGL9fLF41hoz6Zdd6vlLV9iBYsuein00LENaBzxd");


      const bodyData = {
        amount: Number(plan),
        Plan_id,
        companyId: localStorage.getItem('userId'),
        planName
      }
      let tokenP = window.localStorage.getItem('token')
      const result = await fetch(`${baseUrl}/payment/checkout`, {
        method: "post",
        headers: {
          'Authorization': `Bearer ${tokenP}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });

      const jsonData = await result.json();

      if (!result.ok) {
        setLoaderBtn(null)
        console.log(jsonData.message);
        throw new Error(jsonData.message);
      }

      const resultS = stripe.redirectToCheckout({
        sessionId: jsonData?.data?.id
      });

      console.log(resultS)



      let paymentIntentD = jsonData?.data?.paymentIntent

      localStorage.setItem('paymentIntentD', JSON.stringify(paymentIntentD))
      localStorage.setItem('Plan_id', Plan_id)

      setLoaderBtn(null)

    } catch (error) {
      setLoaderBtn(null)

      console.log(error);
    }
  }




  // for razor pay

  // const purchaseHandler = async (plan) => {
  //   console.log("clicked", plan);

  //   setLoaderBtn(plan);

  //   try {


  //     const bodyData = {
  //       plan,
  //       companyId
  //     }
  //     let token = window.localStorage.getItem('token')
  //     const result = await fetch(`${baseUrl}/payment/checkout`, {
  //       method: "post",
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //         "content-type": "application/json",
  //       },
  //       body: JSON.stringify(bodyData),
  //     });

  //     const jsonData = await result.json();

  //     if (!result.ok) {

  //       throw new Error(jsonData.message);
  //     }
  //     let order = jsonData.order;

  //     console.log(order);

  //     var options = {
  //       key: "rzp_live_B0C6PQuQMJlnBt", // Enter the Key ID generated from the Dashboard
  //       amount: order?.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
  //       currency: "INR",
  //       name: "Rework",
  //       description: "Live Transaction",
  //       image: logo,
  //       order_id: order?.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
  //       callback_url: verifyPayment,
  //       notes: {
  //         address: "Razorpay Corporate Office",
  //       },
  //       theme: {
  //         color: "#1f3dd1",
  //       },
  //     };
  //     var rzp1 = new window.Razorpay(options);

  //     rzp1.open();
  //     setLoaderBtn(null)

  //   } catch (error) {
  //     console.log(error);
  //   }
  // }


  return (
    <div className="w-11/12 mx-auto">
      {

        isLoading ? <div className="flex justify-center items-center h-[90vh]">
          <Loader />
        </div>

          :
          <>
            {/* <Navbar /> */}

            {/* FIRST PART */}
            <div className="bg-white shadow-xl flex flex-col md:flex-row items-center justify-evenly gap-5 md:gap-20 border py-8 my-5  mx-auto rounded-xl text-[#444444] font-semibold text-xl">
              <div>
                <h1 className=" ">
                  Current status:{" "}
                  {companyDetails?.totalcredites ? <span
                    className={
                      companyDetails?.totalcredites > 0
                        ? "text-[#4CD42A]"
                        : "text-[#e63e3e]"
                    }
                  >
                    {companyDetails?.totalcredites > 0 ? "Active" : "Inactive"}
                  </span> : <span>...</span>}
                </h1>
              </div>
              <div>
                <h1>Credits: {companyDetails?.totalcredites}</h1>
              </div>
              <Link to={"/company/credits/history"}>
                <button className="rounded-lg border-[3px] border-[#2068FF] block mx-auto md:mx-0 px-10 py-2 hover:text-white text-[#2068FF] hover:bg-[#2068FF] ">
                  <span className="block rounded-[7.28px] text-lg font-semibold">
                    History
                  </span>
                </button>
              </Link>
            </div>

            {/* sECOND pART */}

            <div class="flex flex-col md:flex-row  items-center py-4 my-10">
              <div class="flex-grow mr-5 h-1 bg-gradient-to-r from-[#2068FF] to-[#444DA1]"></div>

              <span class="flex-shrink text-2xl text-[#444444] font-semibold px-4">
                Low on Credits?
              </span>

              <div class="flex-grow ml-5 h-1 bg-gradient-to-r from-[#2068FF] to-[#444DA1]"></div>
            </div>

            {/* Third Section */}

            {/* swipper  */}

            <Swiper
              breakpoints={
                {
                  // when window width is >= 320px
                  320: {
                    width: 320,
                    slidesPerView: 1,
                  },

                  // when window width is >= 640px
                  640: {
                    width: 620,
                    slidesPerView: 2,
                  },
                  // when window width is >= 768px
                  768: {
                    width: 768,
                    slidesPerView: 2,
                  },
                  // when window width is >= 1024px
                  1024: {
                    width: 1024,
                    slidesPerView: 3,
                  },
                }
              }

              slidesPerView={3}
              spaceBetween={30}
              autoplay
              freeMode={true}
              pagination={{
                clickable: true,
              }}
              modules={[Autoplay, FreeMode, Pagination]}
              className="mySwiper"
            >
              {plans.map((plan) => (
                <SwiperSlide key={plan._id}>
                  <div className="flex flex-col justify-between px-8 py-10  transition-shadow duration-300 bg-white border border-[#DBDBDB] rounded-xl shadow-sm sm:items-center hover:shadow">
                    <div className="text-center">
                      <div className="text-xl font-bold mb-8 text-[#444444]">
                        {plan.planName}
                      </div>
                    </div>
                    <div className=" mb-8">{parse(plan.features)}</div>
                    <div className="flex items-center gap-x-2 mb-8 text-start">
                      <div>
                        <del className="text-[#A9A9A9] font-medium text-[16px]">
                          {plan.previousPrice}/-
                        </del>
                        <h2 className="text-xl font-semibold">{plan.newPrice}/-</h2>
                      </div>
                      <div>
                        <h2 className="font-medium text-[#2068FF]">
                          {plan.discount}% OFF
                        </h2>
                      </div>
                    </div>
                    <div
                    >

                      {loaderBtn === plan.newPrice ? (
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
                      ) : (
                        <>
                          {/* <Stripe
                          stripeKey='pk_live_51NPIZSSCCjfn8eaHGOWEvE1MLynpLw6KbmET1pCJIRKgYxyOU9ruIzMCCflGL9fLF41hoz6Zdd6vlLV9iBYsuein00LENaBzxd'
                          token={tokenHandler}
                        > */}
                          <button
                            className="rounded-lg border-[3px] border-[#2068FF] block mx-auto md:mx-0 px-4 py-2 hover:text-white text-[#2068FF] hover:bg-[#2068FF]"
                            onClick={() => {
                              purchaseHandler(Number(plan?.newPrice), plan?._id, plan.planName)
                            }}
                          >
                            <span className="block rounded-[7.28px]  text-lg font-semibold">
                              Purchase
                            </span>
                          </button>
                          {/* </Stripe> */}
                        </>
                      )}





                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </>
      }
    </div>
  );
};

export default Credits;
