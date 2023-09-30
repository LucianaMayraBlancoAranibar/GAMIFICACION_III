import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import './css/style.css';
import './charts/ChartjsConfig';
import Dashboard from './pages/Dashboard';
import FacultadForm from './pages/FacultadForm'
import SucursalForm from './pages/SucursalForm'
import RegisterManager from './pages/RegisterManager'
import EditManager from './pages/EditManager'
import RegisterSanction from './pages/RegisterSanction'
import EditSanction from './pages/EditSanction'
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
        <Route path="/RegisterManager" element={<RegisterManager />} />
        <Route path="/EditManager" element={<EditManager />} />
        <Route path="/RegisterSanction" element={<RegisterSanction />} />
        <Route path="/EditSanction" element={<EditSanction />} />
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
      </Routes>
    </Router>
  );
}

export default App;
