import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};


