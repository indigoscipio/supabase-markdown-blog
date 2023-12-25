import React from "react";
import Link from "next/link";

const DashboardNavLink = () => {
  return (
    <nav className="flex space-x-4">
      <Link href="/dashboard">
        <p className="text-blue-500 hover:underline">💻 Dashboard</p>
      </Link>
      <Link href="/dashboard/user">
        <p className="text-blue-500 hover:underline">😊 User</p>
      </Link>
    </nav>
  );
};

export default DashboardNavLink;
