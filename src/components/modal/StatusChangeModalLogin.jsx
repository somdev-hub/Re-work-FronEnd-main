import React, { useCallback } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import { baseUrl } from "../../baseUrl";
import { useSelector, useDispatch } from 'react-redux';
import { counterActions } from '../../store/index-redux';
import { useReducer } from "react";

const StatusChangeModalLogin = ({ modelOpened, setModelOpened, data }) => {
  const theme = useMantineTheme();
  const dispatch = useDispatch();

  const statusChangePageRenderHandler = () => {
    dispatch(counterActions.recruiterStatusChanged());
  };
  const statusChangeHandler = useCallback(async (userId) => {

    try {
      // let userId = data._id ;
      let token = localStorage.getItem("token")
      const result = await fetch(`${baseUrl}/admin/changeStatusOfUser/${userId}`
        , {
          method: "put",
          headers: {
            'Content-type': "application/json",
            "Authorization":`Bearer ${token}`
          }
        });
      const jsonData = await result.json();
      if (!result.ok) {
        throw new Error(jsonData.message);
      }
      console.log(jsonData);
      setModelOpened(false);
      statusChangePageRenderHandler();
    } catch (error) {
      console.log(error);
    }
  }, []);

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
      Modal centered
      size="lg"
      opened={modelOpened}
      //   onClose={() => setModelOpened(false)}
      withCloseButton={false}
      transition="fade"
      transitionDuration={500}
      transitionTimingFunction="ease"
    >
      <div className="md:px-10 lg:p-20">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold pb-4 lg:pb-10 text-center">
          Are u sure you want to <br /> change the status?
        </h2>

        <div className="flex justify-center gap-10 text-white">
          <button
            className="bg-red-500 px-4 py-2 rounded-md font-medium text-lg"
            onClick={() => setModelOpened(false)}
          >
            Discard
          </button>
          <button className="bg-[color:var(--blue)] px-4 py-2 rounded-md font-medium text-lg" onClick={(e) => { statusChangeHandler(data._id) }}>
            Confirm
          </button>

        </div>
      </div>
    </Modal>
  );
};

export default StatusChangeModalLogin;