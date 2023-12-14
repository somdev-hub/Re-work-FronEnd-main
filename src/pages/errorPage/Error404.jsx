import React from "react";
import ErrorImg from "../../assets/404img.png";

const Error404 = () => {
  return (
    <div>
      <div className="flex flex-col gap-3 justify-center items-center h-screen">
        <img src={ErrorImg} alt="" />

        <div className="text-[color:var(--blue)] text-center text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold">
          <h6>Sorry!</h6>
          <h6>You have no Access</h6>
        </div>
      </div>
    </div>
  );
};

export default Error404;
