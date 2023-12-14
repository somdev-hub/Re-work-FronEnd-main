import { Modal } from '@mantine/core';
import { useMantineTheme } from '@mantine/styles';
import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { TiTick } from 'react-icons/ti';
import { ThreeDots } from 'react-loader-spinner';
import { toast, ToastContainer } from 'react-toastify';
import { baseUrl } from '../../baseUrl';

const CompanyCreditsEditModal = ({
  modelOpened, setModelOpened, data, forceupdate
}) => {
  const theme = useMantineTheme();
  const [featureText, setFeatureText] = useState(data?.totalcredites);
  const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false);
  const [loaderBtn, setLoaderBtn] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const id = data?._id
  const companyName = data.companyName
  const onSubmit = async (data) => {
    console.log(data);
    try {

      let token = localStorage.getItem('token')
      const data1 = await fetch(`${baseUrl}/company/creaditsupdate/${id}`,
        {
          method: "PUT",
          headers: { "Content-type": "application/json", "Authorization": `Bearer ${token}` },
          body: JSON.stringify(data)

        })
        setLoaderBtn(true)
      if (data1.status !== 201) {
        toast.error(" Something Went Wrong. Please Try Again Ater Some Time.")
        setLoaderBtn(false)
      } else if (data1.status === 201) {
        toast.success(`${companyName} credits Changed`)
        forceupdate()
        setTimeout(() => {
          setModelOpened(false);
          setLoaderBtn(false)
        }, 1000);
      }

    } catch (error) {
      console.log(error);
      setFeatureText("");
    }
  };

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
              Credits
            </h2>

            <form
              className="flex flex-col gap-5"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-1 w-3/4 mx-auto">
                <input
                  {...register("totalcredites", { required: true })}
                  rows="6"
                  id="text"
                  placeholder="Input Credits"
                  value={featureText}
                  className="px-2 py-3 ring-1 focus:ring-2 outline-none rounded-md mx-1"
                  onChange={(e) => setFeatureText(e.target.value)}
                />
                {errors.text && (
                  <p className="text-red-500 text-right text-sm">
                    *Please provide valid text.
                  </p>
                )}
              </div>

              {
                loaderBtn ? <div className="flex justify-center">
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
                  <div className="flex justify-center gap-2">
                    <button
                      type="submit"
                      className="border rounded-md px-4 lg:px-10 py-1.5 bg-[color:var(--orange)] hover:bg-[color:var(--hover-orange)] text-white font-medium"
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      onClick={() => setModelOpened(false)}
                      className="border-2 border-[color:var(--blue)] hover:bg-[color:var(--blue)] text-[color:var(--blue)] hover:text-white font-medium rounded-md px-4 lg:px-10 py-1.5 bg-white hover:"
                    >
                      Cancel
                    </button>
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

export default CompanyCreditsEditModal;