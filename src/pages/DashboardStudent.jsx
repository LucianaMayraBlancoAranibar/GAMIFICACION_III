import React, { useState } from "react";

import SidebarStudent from "../partials/SiderbarStudent";
import Header from "../partials/Header";
import WelcomeBannerStudent from "../partials/dashboard/WelcomeBannerStudent";
import StudentRankView from "../pages/StudentRankView";


function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <SidebarStudent sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Welcome banner */}
            <WelcomeBannerStudent />

            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
           <StudentRankView  />
       
            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">
            
              
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
