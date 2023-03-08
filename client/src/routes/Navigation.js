import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";

const Navigation = () => {
  return (
    <Fragment>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
