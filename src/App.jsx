import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './css/style.css';
import './charts/ChartjsConfig';
import Dashboard from './pages/Dashboard';
import FacultadForm from './pages/FacultyForm'
import SucursalForm from './pages/SucursalForm'
import TypeAchievementForm from './pages/TypeAchievementForm'
import TypeAchievementEdit from './pages/TypeAchievementEdit'
import AchievementForm from './pages/AchievementForm'
import BadgeForm from './pages/BadgeForm'
import FacultadTable from "./pages/FacultyTable";
import FacultadEdit from "./pages/FacultyEdit";
import TypeAchievementTable from "./pages/TypeAchievementTable";
import AchievementTable from "./pages/AchievementTable";
import AchievementEdit from "./pages/AchievementEdit";
import RankForm from "./pages/RankForm";
import RankTable from "./pages/RankTable";
import StudentAchievement from "./pages/StudentAchievement";
import SanctionForm from "./pages/SanctionForm";
import LoginPage from "./pages/LoginPage";
import ProtectedElement from './ProtectedElement';
import NavigationGuard from './utils/NavigationGuard'
import { AuthProvider } from './AuthContext';

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
function PreventCache() {
  useEffect(() => {
    document.head.appendChild(Object.assign(
      document.createElement("meta"), {
        name: "Pragma",
        content: "no-cache",
    }));
    document.head.appendChild(Object.assign(
      document.createElement("meta"), {
        name: "Cache-Control",
        content: "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
    }));
  }, []);

  return null; // Este componente no renderiza nada
}

function App() {
  
  return (
    <AuthProvider>
    <Router>
      <ScrollToTopOnRouteChange />
      <NavigationGuard />
      <PreventCache />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* <Route path="/FacultadForm" element={<FacultadForm />} /> */}
        <Route path="/SucursalForm" element={<SucursalForm />} />
        <Route path="/TypeAchievementForm" element={<TypeAchievementForm />} />
        <Route path="/AchievementForm" element={<AchievementForm />} />
        <Route path="/FacultadForm" element={
          <ProtectedElement 
            allowedRoles={[1]} 
            element={<FacultadForm />} 
          />} 
        />
       <Route path="/SanctionForm" element={
    <ProtectedElement 
        allowedRoles={[1, 2]} // Permitir acceso a los roles 1 y 2
        element={<SanctionForm />} 
    />} 
/>

        {/* <Route path="/BadgeForm" element={<BadgeForm />} /> */}
        {/* <Route path="/FacultadTable" element={<FacultadTable />} /> */}
        <Route path="/FacultadEdit/:id" element={<FacultadEdit />} />
        <Route path="/TypeAchievementTable" element={<TypeAchievementTable />} />
        <Route path="/AchievementTable" element={<AchievementTable />} />
        <Route path="/AchievementEdit/:id" element={<AchievementEdit />} />
        <Route path="/TypeAchievementEdit/:id" element={<TypeAchievementEdit />} />
        <Route path="/RankForm" element={<RankForm />} />
        <Route path="/RankTable" element={<RankTable />} />
        <Route path="/StudentAchievement" element={<StudentAchievement />} />
      
        <Route path="/LoginPage" element={<LoginPage />} />
      </Routes>
     
    </Router>
    </AuthProvider>
  );
}

export default App;
