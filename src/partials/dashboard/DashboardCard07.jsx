
import FacultadTable from "../../pages/FacultyTable";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import React, { useState, useEffect } from "react";
import axios from "axios";

function DashboardCard07() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg ">
          <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
            <h2 className="font-semibold text-slate-800 dark:text-slate-100">
              Lista Facultades
            </h2>
          </header>
          <div className="p-3">
            {/* Agrega la tabla de facultades aquí */}
            <FacultadTable />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard07;
