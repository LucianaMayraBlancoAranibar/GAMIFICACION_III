import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import './css/style.css';
import './charts/ChartjsConfig';
import Dashboard from './pages/Dashboard';
import FacultadForm from './pages/FacultyForm'
import SucursalForm from './pages/SucursalForm'
import SucursalTable from './pages/SucursalTable'
import SucursalEdit from './pages/SucursalEdit'
import TypeAchievementForm from './pages/TypeAchievementForm'
import TypeAchievementEdit from './pages/TypeAchievementEdit'
import AchievementForm from './pages/AchievementForm'
import BadgeForm from './pages/BadgeForm'
import FacultadTable from "./pages/FacultyTable";
import FacultadEdit from "./pages/FacultyEdit";
import TypeAchievementTable from "./pages/TypeAchievementTable";
import AchievementTable from "./pages/AchievementTable";
import AchievementEdit from "./pages/AchievementEdit";
import ManagerForm from './pages/ManagerForm'
import ManagerEdit from './pages/ManagerEdit'
import ManagerTable from './pages/ManagerTable'
import SanctionForm from './pages/SanctionForm'
import SanctionEdit from './pages/SanctionEdit'
import SanctionTable from './pages/SanctionTable'
import DepartamentoTable from "./pages/DepartamentoTable";
import DepartamentoForm from "./pages/DepartamentoForm";
import DepartamentoEdit from "./pages/DepartamentoEdit";
import EstudianteTable from './pages/EstudianteTable';
import EstudianteForm from './pages/EstudianteForm';
import EstudianteEdit from './pages/EstudianteEdit';

import CareerTable from './pages/CareerTable';
import CareerEdit from './pages/CareerEdit';
import CareerForm from './pages/CareerForm';

import RegisterTypeArchivement from './pages/RegisterTypeArchivement'
import EditTypeArchivement from './pages/EditTypeArchivement'
import BadgeTable from "./pages/BadgeTable";
import BadgeEdit from "./pages/BadgeEdit";
import ViewTypeArchivement from './pages/ViewTypeArchivement'
import Main from "./pages/Main";
import UserBadges from "./pages/UserBadges";
import UserSanction from "./pages/UserSanction";

import StudentTable from "./pages/StudentTable";
import StudentForm from "./pages/StudentForm";
import StudentEdit from "./pages/StudentEdit";


function ScrollToTopOnRouteChange() {
  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo(0, 0);
    };

    // Agregar un evento para manejar el cambio de ruta
    window.addEventListener('routeChange', handleRouteChange);

    // Limpia el evento cuando el componente se desmonta
    return () => {
      window.removeEventListener('routeChange', handleRouteChange);
    };
  }, []);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTopOnRouteChange />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/FacultadForm" element={<FacultadForm />} />
        <Route path="/FacultadTable" element={<FacultadTable />} />
        <Route path="/FacultadEdit/:id" element={<FacultadEdit />} />
        <Route path="/SucursalForm" element={<SucursalForm />} />
        <Route path="/SucursalTable" element={<SucursalTable />} />
        <Route path="/SucursalEdit/:id" element={<SucursalEdit />} />
        <Route path="/TypeAchievementForm" element={<TypeAchievementForm />} />
        <Route path="/AchievementForm" element={<AchievementForm />} />
        <Route path="/BadgeForm" element={<BadgeForm />} />
        <Route path="/TypeAchievementTable" element={<TypeAchievementTable />} />
        <Route path="/AchievementTable" element={<AchievementTable />} />
        <Route path="/AchievementEdit/:id" element={<AchievementEdit />} />
        <Route path="/TypeAchievementEdit/:id" element={<TypeAchievementEdit />} />
        <Route path="/ManagerForm" element={<ManagerForm />} />
        <Route path="/ManagerEdit/:id" element={<ManagerEdit />} />
        <Route path="/ManagerTable" element={<ManagerTable />} />
        <Route path="/SanctionForm" element={<SanctionForm />} />
        <Route path="/SanctionEdit/:id" element={<SanctionEdit />} />
        <Route path="/SanctionTable" element={<SanctionTable />} />
        <Route path="/DepartamentoTable" element={<DepartamentoTable />} />
        <Route path="/DepartamentoForm" element={<DepartamentoForm />} />
        <Route path="/DepartamentoEdit/:id" element={<DepartamentoEdit />} />
        <Route path="/EstudianteTable" element={<EstudianteTable />} />
        <Route path="/EstudianteForm" element={<EstudianteForm />} />
        <Route path="/EstudianteEdit/ :id" element={<EstudianteEdit />} />
        <Route path="/CareerTable" element={<CareerTable />} />
        <Route path="/CareerEdit/:id" element={<CareerEdit />} />
        <Route path="/CareerForm" element={<CareerForm />} />
        <Route path="/Main" element={<Main />} />
        <Route path="/UserBadges" element={<UserBadges />} />
        <Route path="/UserSanction" element={<UserSanction />} />
        <Route path="/RegisterTypeArchivement" element={<RegisterTypeArchivement />} />
        <Route path="/EditTypeArchivement" element={<EditTypeArchivement />} />
        <Route path="/ViewTypeArchivement" element={<ViewTypeArchivement />} />
        <Route path="/BadgeTable" element={<BadgeTable />} />
        <Route path="/BadgeEdit/:id" element={<BadgeEdit />} />

        <Route path="/StudentTable" element={<StudentTable />} />
        <Route path="/StudentForm" element={<StudentForm />} />
        <Route path="/StudentEdit/:id" element={<StudentEdit />} />

      </Routes>
    </Router>
  );
}

export default App;
