import React from "react";

import Header from "./header/header";
import Sidebar from "./sidebar/Sidebar";
import Employee from "./body/Employee/Employee";
import Footer from "./footer/Footer";

const StaffManager = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <Employee />
      <Footer />
    </div>
  );
};

export default StaffManager;
