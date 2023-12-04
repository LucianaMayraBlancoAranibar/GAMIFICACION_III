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
            {/* <DashboardCard08/> */}
          
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
