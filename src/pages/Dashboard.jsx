import React, { useState } from "react";
import ProgressSteps from '../partials/ProgressSteps'; // Asegúrate de que la ruta sea correcta

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import WelcomeBanner from "../partials/dashboard/WelcomeBanner";
import FilterButton from "../components/DropdownFilter";
import Datepicker from "../components/Datepicker";
import DashboardCard4 from "../partials/dashboard/BadgeBarChart";
import DashboardCard05 from "../partials/dashboard/AchievementHistogram";
import DashboardCard06 from "../partials/dashboard/AchievementDoughnutChart";
import DashboardCard07 from "../partials/dashboard/RankHeatMap";
import DashboardCard08 from "../partials/dashboard/RankTree";


function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);


  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Welcome banner */}
            <WelcomeBanner />
            {/* <ProgressSteps 
      steps={['Tipo de Logro', 'Insignia', 'Estudiante de Insignia', 'Formulario de Logro', 'Logro del Estudiante']} 
      currentStep={currentStep}
    /> */}
            <DashboardCard4 />
            <DashboardCard05 />
            <DashboardCard06/>
            <DashboardCard07/>
            <DashboardCard08/>
            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Left: Avatars */}
             

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Filter button */}
                <FilterButton />
                {/* Datepicker built with flatpickr */}
                <Datepicker />
                {/* Add view button */}
                <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                  <svg
                    className="w-4 h-4 fill-current opacity-50 shrink-0"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span className="hidden xs:block ml-2">Add view</span>
                </button>
              </div>
            </div>

            {/* Cards */}
         
            <div className="grid grid-cols-12 gap-6">
              {/* Line chart (Acme Plus) */}
              {/* <DashboardCard01 />
              {/* Line chart (Acme Advanced) */}
              {/* <DashboardCard02 />
              {/* Line chart (Acme Professional) */}
              {/* <DashboardCard03 /> */}
              {/* Bar chart (Direct vs Indirect) */}
             
             
             
              {/* Doughnut chart (Top Countries) */}
            
              
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
