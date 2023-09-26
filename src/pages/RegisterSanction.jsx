import React, { useState } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
import DashboardAvatars from '../partials/dashboard/DashboardAvatars';
import FilterButton from '../components/DropdownFilter';
import Datepicker from '../components/Datepicker';

function RegisterSanction() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleSubmit = async (event) => {
      event.preventDefault();
    };

  return (
   
   <div className="flex h-screen overflow-hidden">

    {/* Sidebar */}
    <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
    
    <div className="relative p-4 sm:p-6 rounded-sm overflow-hidden mb-8 w-1/2">
    <div className="relative">
        <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold mb-1">Registrar Sanción </h1>
      
      </div>
      
      <form className="relative p-4 sm:p-6 rounded-sm overflow-hidden mb-50">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Descripción:</label>
          <input
            type="text"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Sanción:
          </label>
          <input
            type="number"
          
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Registrar
        </button>
      </form>
    </div>
    
    </div>
  
  );
}

export default RegisterSanction;