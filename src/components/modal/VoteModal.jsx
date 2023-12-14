import React from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import AuthContext from "../../store/auth-context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../baseUrl";

const VoteModal = ({ openVoteModal, setOpenVoteModal }) => {
  const theme = useMantineTheme();
  const authCtx = useContext(AuthContext);
  const navigation = useNavigate();

  const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false);

  const formHandler = (e) => {
    e.preventDefault();
  };

  const logoutHandler = (e) => {
    // e.preventDefault();
    // setOpenVoteModal(false);
    authCtx.logout();
    // navigation("/");
  };

  let a = () => {
    const id = window.localStorage.getItem('userId')
    fetch(`${baseUrl}/auth/vote/${id}`, { method: "PUT" }).then(res => res.json()).then((data) => {
      console.log(data);
    })
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
      overflow="inside"
      size="lg"
      centered
      opened={openVoteModal}
      onClose={() => setOpenVoteModal(false)}
      withCloseButton={false}
      transition="fade"
      transitionDuration={500}
      transitionTimingFunction="ease"
    >
      <div className="md:px-10">
        <div
          className="absolute top-5 right-5 cursor-pointer flex flex-col items-center"
          onClick={() => setOpenVoteModal(false)}
        >
          <AiOutlineCloseCircle className=" text-3xl text-red-500" />
          {/* <span className="font-semibold text-red-500">Close</span> */}
        </div>

        {!isSuccessfullSubmit ? (
          <div className="flex flex-col gap-2 my-10">
            <h2 className="text-xl md:text-2xl font-bold flex justify-center">
              <BsFillEmojiSmileFill className="rounded-full text-yellow-700" />
            </h2>
            <h2 className="text-[color:var(--blue)] text-xl md:text-2xl font-bold text-center">
              Hope you like our product!
            </h2>
            <p className="text-black text-xl font-semibold text-center">
              Would you mind rewarding us for our efforts?
            </p>

            <form className="flex flex-col gap-5" onSubmit={formHandler}>
              <div className="flex justify-around gap-2 mt-8">
                <button
                  type="submit"
                  onClick={() => {
                    a();
                    logoutHandler();
                    navigation("/");
                    window.open("https://www.google.com", "_blank");
                  }}
                  className="border rounded-md px-4 lg:px-14 py-1.5 bg-[color:var(--orange)] hover:bg-[color:var(--hover-orange)] text-white font-medium"
                >
                  Vote
                </button>
                <button
                  type="button"
                  onClick={() => {
                    logoutHandler();
                    navigation("/");
                  }}
                  className="border-2 border-[color:var(--blue)] hover:bg-[color:var(--blue)] text-[color:var(--blue)] hover:text-white font-medium rounded-md
                   px-4 lg:px-10 py-1.5 bg-white"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-5 my-10">
            <TiTick className=" border rounded-full p-1.5 text-5xl bg-green-500 text-white" />
            <h2 className="text-[color:var(--blue)] text-xl md:text-2xl font-bold text-center">
              Thanks for your time!
            </h2>
            <p className="text-[color:var(--blue)] text-xl md:text-2xl font-bold text-center">
              We appreciate your presence, Your support matters a lot!
            </p>
          </div>
        )}
        <ToastContainer />
      </div>
    </Modal>
  );
};

export default VoteModal;
