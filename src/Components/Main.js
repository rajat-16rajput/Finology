import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div className="main">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Main;
