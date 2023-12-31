import React from "react";
import DashboardNavLink from "@/components/DashboardNavLink";

export const metadata = {
  title: "Dashboard",
  description: "Generated by create next app",
};

const DashboardLayout = ({ children }) => {
  return (
    <div className="py-8 container mx-auto">
      <DashboardNavLink />
      {children}
    </div>
  );
};

export default DashboardLayout;
