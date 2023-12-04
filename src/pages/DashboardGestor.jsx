import React, { useState } from "react";

import SidebarGestor from "../partials/SidebarGestor";
import Header from "../partials/Header";
import WelcomeBannerGestor from "../partials/dashboard/WelcomeBannerGestor";
import DashboardCard05 from "../partials/dashboard/AchievementHistogram";
import DashboardCard06 from "../partials/dashboard/AchievementDoughnutChart";
import FilterButton from "../components/DropdownFilter";


function DashboardGestor() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <SidebarGestor sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Welcome banner */}
            <WelcomeBannerGestor />
            <DashboardCard05 />
            <DashboardCard06/>
            {/* Dashboard actions */}
           
          

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">
              {/* Line chart (Acme Plus) */}
              {/* <DashboardCard01 />
              {/* Line chart (Acme Advanced) */}
              {/* <DashboardCard02 />
              {/* Line chart (Acme Professional) */}
              {/* <DashboardCard03 /> */}
              {/* Bar chart (Direct vs Indirect) */}
        
              
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardGestor;
