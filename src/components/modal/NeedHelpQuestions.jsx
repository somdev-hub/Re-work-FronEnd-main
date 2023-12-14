import React from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import { AiOutlineCloseCircle } from "react-icons/ai";

const NeedHelpQuestions = ({ modelOpened, setModelOpened, data }) => {
  const theme = useMantineTheme();

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
      <div className="md:px-10">
      <div
          className="absolute top-2 right-2 cursor-pointer flex flex-col items-center"
          onClick={() => setModelOpened(false)}
        >
          <AiOutlineCloseCircle className=" text-lg md:text-xl text-red-500" />
          <span className=" text-sm md:font-semibold text-red-500">Close</span>
        </div>

        <div className="flex flex-col gap-5 my-10">
          <h2 className="text-[color:var(--blue)] text-xl md:text-2xl font-bold">
            Questions
          </h2>

          <div className="flex flex-col gap-5">
            <h2 className="font-medium pb-5">{data}</h2>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default NeedHelpQuestions;
