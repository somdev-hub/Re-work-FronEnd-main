import { Modal } from '@mantine/core';
import { useMantineTheme } from '@mantine/styles';
import JoditEditor from 'jodit-react';
import React from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { TiTick } from 'react-icons/ti';
import { ThreeDots } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { baseUrl } from '../../baseUrl';

const AdminPaymentEditModal = ({
  modelOpened, setModelOpened, data
}) => {
  const theme = useMantineTheme();

  const [featureText, setFeatureText] = useState("");
  const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false);
  const [loaderBtn, setLoaderBtn] = useState(false);

  const editor = useRef(null);

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();

  // const onSubmit = async (data) => {
  //   //TODO
  //   try {
  //     //Make API Call here
  //     const text = featureText
  //     const type = window.localStorage.getItem('PITCH_DATA_FOR_FEATURE')
  //     const data = { text, type }
  //     const id = window.localStorage.getItem('userId')

  //     const data1 = await fetch(`${baseUrl}/admin/feature/${id}`,
  //       {
  //         method: "POST",
  //         headers: { "Content-type": "application/json" },
  //         body: JSON.stringify(data)

  //       })

  //     if (data1.status !== 201) {
  //       toast.error(" Something Went Wrong. Please Try Again Ater Some Time.")
  //     } else if (data1.status === 201) {
  //       //if api call is successfull
  //       setIsSuccessfullSubmit(true);
  //       setTimeout(() => {
  //         setModelOpened(false);
  //       }, 2500);
  //       setFeatureText("");
  //     }

  //   } catch (error) {
  //     console.log(error);
  //     setFeatureText("");
  //   }
  // };
  const [planName, setPlanName] = useState(data.planName)
  const [credites, setcredites] = useState(data.credites)
  const [previousPrice, setpreviousPrice] = useState(data.previousPrice)
  const [discount, setdiscount] = useState(data.discount)
  const [content, setContent] = useState(data.features);
  const [a, setA] = useState(false);
  const PaymentID = data._id
  const nav = useNavigate()
  const handlePackFormSubmit = async (e) => {
    e.preventDefault()

    const features = content
    console.log("features", features);
    const data = { planName, credites, previousPrice, discount, features, }
    try {
      if (a) {
        return
      }
      setA(true)
      let token = localStorage.getItem('token')
      const result = await fetch(`${baseUrl}/payment/creditesPut/${PaymentID}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      const jsonData = await result.json();
      setLoaderBtn(true)
      console.log(jsonData);
      if (!result.ok) {
        setA(false)
        setLoaderBtn(false)
        throw new Error(jsonData.message);
      }

      toast("Success fully Updated");
      // nav('/admin/payments')      
      setTimeout(() => {
        setLoaderBtn(false)
        setModelOpened(false)
      }, 1000);

    } catch (error) {
      setLoaderBtn(false)
      toast(error);
    }

  }

  return (

    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      overflow="outside"
      size="lg"
      centered
      opened={modelOpened}
      onClose={() => setModelOpened(false)}
      withCloseButton={false}
      transition="fade"
      transitionDuration={500}
      transitionTimingFunction="ease"
    >
      <div className="md:px-10">
      <div
          className="absolute top-2 right-2 cursor-pointer flex flex-col items-center"
          onClick={() => setModelOpened(false)}
        >
          <AiOutlineCloseCircle className=" text-lg md:text-xl text-red-500" />
          <span className=" text-sm md:font-semibold text-red-500">Close</span>
        </div>

        {!isSuccessfullSubmit ? (
          <div className="flex flex-col gap-5 my-10">
            <h2 className="text-[color:var(--blue)] text-xl md:text-2xl font-bold text-center">
              Edit Payment
            </h2>

            <form className="flex flex-col gap-4 md:mt-10" onSubmit={handlePackFormSubmit}>

              <div className="flex flex-col gap-1">
                <label htmlFor="PackName" className="font-medium">
                  Pack Name
                </label>
                <input
                  value={planName}
                  onChange={(e) => { setPlanName(e.target.value) }}
                  type="text"
                  name='packName'
                  placeholder="Name"
                  id="PackName"
                  className="px-3 py-2 border min-w-full rounded-md outline-none focus:ring-1"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="credits" className="font-medium">
                  Credits amount
                </label>
                <input
                  value={credites}
                  onChange={(e) => { setcredites(e.target.value) }}



                  type="text"
                  name='credits'
                  placeholder="credits"
                  id="credits"
                  className="px-3 py-2 border min-w-full rounded-md outline-none focus:ring-1"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="InitialPrice" className="font-medium">
                  Initial Price
                </label>
                <input
                  value={previousPrice}
                  onChange={(e) => { setpreviousPrice(e.target.value) }}


                  type="text"
                  name='initialPrice'
                  placeholder="Amount"
                  id="InitialPrice"
                  className="px-3 py-2 border min-w-full rounded-md outline-none focus:ring-1"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="Discount" className="font-medium">
                  Discount
                </label>
                <input
                  value={discount}
                  onChange={(e) => { setdiscount(e.target.value) }}


                  type="text"
                  name='discount'
                  placeholder="Discount %"
                  id="Discount"
                  className="px-3 py-2 border min-w-full rounded-md outline-none focus:ring-1"
                />
              </div>

              <div className="flex flex-col gap-5">
                <h6 className="font-medium">Pack Features</h6>

                <div>
                  <JoditEditor
                    ref={editor}
                    value={content}
                    name="features"
                    //config={config}
                    // tabIndex={1} // tabIndex of textarea
                    //onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                    onChange={(newContent) => setContent(newContent)}
                  />
                </div>

                {/* <div className="flex justify-end">
                        <button
                            className="bg-[color:var(--blue)] text-white rounded-lg font-medium px-3 py-2"
                        onClick={formHandler}
                        >
                            Update Page
                        </button>
                    </div> */}
              </div>
              {
                loaderBtn ? <div className="flex justify-end">
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
                  :
                  <div className='flex justify-end'>
                    <div className="flex justify-center gap-5 py-5 text-white">
                      <button
                        onClick={() => { setModelOpened(false) }}
                        className="bg-red-500 px-4 py-2 rounded-md font-medium text-lg">
                        Discard
                      </button>
                      <button type='submit'
                        className="bg-[color:var(--blue)] px-4 py-2 rounded-md font-medium text-lg">
                        Save
                      </button>
                    </div>
                  </div>
              }

            </form>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-5 my-10">
            <TiTick className=" border rounded-full p-1.5 text-5xl bg-green-500 text-white" />
            <h2 className="text-[color:var(--blue)] text-xl md:text-2xl font-bold text-center">
              Submitted successfully!
            </h2>
          </div>
        )}
        <ToastContainer />
      </div>
    </Modal>
  );
};

export default AdminPaymentEditModal;