import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import './css/style.css';
import './charts/ChartjsConfig';
import Dashboard from './pages/Dashboard';
import FacultadForm from './pages/FacultadForm'
import SucursalForm from './pages/SucursalForm'
import ManagerForm from './pages/ManagerForm'
import ManagerEdit from './pages/ManagerEdit'
import ManagerTable from './pages/ManagerTable'
import SanctionForm from './pages/SanctionForm'
import SanctionEdit from './pages/SanctionEdit'
import SanctionTable from './pages/SanctionTable'
import RegisterTypeArchivement from './pages/RegisterTypeArchivement'
import EditTypeArchivement from './pages/EditTypeArchivement'
import TypeAchievementForm from './pages/TypeAchievementForm'
import AchievementForm from './pages/AchievementForm'
import BadgeForm from './pages/BadgeForm'
import ViewTypeArchivement from './pages/ViewTypeArchivement'
import FacultadTable from "./pages/FacultadTable";
import FacultadEdit from "./pages/FacultadEdit";
import SucursalTable from "./pages/SucursalTable";
import SucursalEdit from "./pages/SucursalEdit";
import DepartamentoTable from "./pages/DepartamentoTable";
import DepartamentoForm from "./pages/DepartamentoForm";
import DepartamentoEdit from "./pages/DepartamentoEdit";
import EstudianteTable from './pages/EstudianteTable';
import EstudianteForm from './pages/EstudianteForm';
import EstudianteEdit from './pages/EstudianteEdit';
import EstudianteChangePassword from './pages/EstudianteChangePassword';
import CarreraTable from './pages/CarreraTable';
import CareerEdit from './pages/CareerEdit';
import CareerForm from './pages/careerForm';
import Login from './pages/Login';
import CarouselComponent from './pages/Carrusel';
import NavbarCarrusel from './pages/navbarCarrusel';



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
        <Route path="/SucursalForm" element={<SucursalForm />} />
        <Route path="/ManagerForm" element={<ManagerForm />} />
        <Route path="/ManagerEdit/:id" element={<ManagerEdit />} />
        <Route path="/ManagerTable" element={<ManagerTable />} />
        <Route path="/SanctionForm" element={<SanctionForm />} />
        <Route path="/SanctionEdit/:id" element={<SanctionEdit />} />
        <Route path="/SanctionTable" element={<SanctionTable />} />
        <Route path="/RegisterTypeArchivement" element={<RegisterTypeArchivement />} />
        <Route path="/EditTypeArchivement" element={<EditTypeArchivement />} />
        <Route path="/ViewTypeArchivement" element={<ViewTypeArchivement />} />
        <Route path="/TypeAchievementForm" element={<TypeAchievementForm />} />
        <Route path="/AchievementForm" element={<AchievementForm />} />
        <Route path="/BadgeForm" element={<BadgeForm />} />
        <Route path="/FacultadTable" element={<FacultadTable />} />
        <Route path="/FacultadEdit/:id" element={<FacultadEdit />} />
        <Route path="/SucursalTable" element={<SucursalTable />} />
        <Route path="/SucursalEdit/:id" element={<SucursalEdit />} />
        <Route path="/DepartamentoTable" element={<DepartamentoTable />} />
        <Route path="/DepartamentoForm" element={<DepartamentoForm />} />
        <Route path="/DepartamentoEdit/:id" element={<DepartamentoEdit />} />
        <Route path="/EstudianteTable" element={<EstudianteTable />} />
        <Route path="/EstudianteForm" element={<EstudianteForm />} />
        <Route path="/EstudianteEdit/:id" element={<EstudianteEdit />} />
        <Route path="/EstudianteChangePassword/:id" element={<EstudianteChangePassword/>}/> 
        <Route path="/CarreraTable" element={<CarreraTable />} />
        <Route path="/CareerEdit/:id" element={<CareerEdit />} />
        <Route path="/CareerForm" element={<CareerForm />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Carrusel" element={<CarouselComponent/>} />
        <Route path="/navbarCarrusel" element={<NavbarCarrusel/>} />

      </Routes>
    </Router>
  );
}

export default App;
