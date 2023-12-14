import React from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import "react-step-progress-bar/styles.css";
import { toast, ToastContainer } from "react-toastify";
import { baseUrl } from "../../baseUrl";

const ManageRolesDeleteUserModal = ({ modelOpened, setModelOpened, data, id, fu }) => {
  const theme = useMantineTheme();
  let hndlDelete = () => {
    // const userName = window.localStorage.getItem('userName')
    // const password =  prompt('please fill the password')
    // const data = {userName,password}
    // fetch('http://localhost:5000/auth/adminlogin',{
    //   method:"POST",
    //   headers:{"content-type":"application/json"},
    //   body:JSON.stringify(data)
    // }
    // ).then((res)=>res.json())
    // .then((data)=>{

    //   if (data.token) {

    toast("User Sucessfully deleted");
    // setModelOpened(false);
    let token = localStorage.getItem("token")
    fetch(`${baseUrl}/admin/manageRole/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((datav) => {
        // console.log(datav);
        fu()
        window.localStorage.setItem("deletedUser", data._id);
      });
    // } else {
    //   console.log(data);
    //   alert('wrong password')
    // }
    // })

    setTimeout(() => {
      setModelOpened(false);
    }, 2000);
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
      overflow="inside"
      size="xl"
      centered
      opened={modelOpened}
      onClose={() => setModelOpened(false)}
      withCloseButton={false}
      transition="fade"
      transitionDuration={500}
      transitionTimingFunction="ease"
    >
      <div className="md:px-10 lg:p-20">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold pb-4 lg:pb-10 text-center">
          Are u sure you want to <br /> delete this user?
        </h2>

        <div className="flex justify-center gap-10 text-white">
          <button
            className="bg-red-500 px-4 py-2 rounded-md font-medium text-lg"
            onClick={() => setModelOpened(false)}
          >
            Discard
          </button>
          <button
            className="bg-[color:var(--blue)] px-4 py-2 rounded-md font-medium text-lg"
            onClick={() => hndlDelete()}
          >
            Confirm
          </button>
        </div>
      </div>
      <ToastContainer />
    </Modal>
  );
};

export default ManageRolesDeleteUserModal;
