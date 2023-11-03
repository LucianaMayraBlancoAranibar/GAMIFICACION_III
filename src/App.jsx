import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./css/style.css";
import "./charts/ChartjsConfig";
import Dashboard from "./pages/Dashboard";
import FacultadForm from "./pages/FacultyForm";
import SucursalForm from "./pages/SucursalForm";
import TypeAchievementForm from "./pages/TypeAchievementForm";
import TypeAchievementEdit from "./pages/TypeAchievementEdit";
import AchievementForm from "./pages/AchievementForm";
import BadgeForm from "./pages/BadgeForm";
import FacultadTable from "./pages/FacultyTable";
import FacultadEdit from "./pages/FacultyEdit";
import TypeAchievementTable from "./pages/TypeAchievementTable";
import AchievementTable from "./pages/AchievementTable";
import AchievementEdit from "./pages/AchievementEdit";
import RankForm from "./pages/RankForm";
import RankTable from "./pages/RankTable";
import StudentAchievement from "./pages/StudentAchievement";
import SanctionForm from "./pages/SanctionForm";
import SanctionTable from "./pages/SanctionTable";
import LoginPage from "./pages/LoginPage";
import ProtectedElement from "./ProtectedElement";
import NavigationGuard from "./utils/NavigationGuard";
import { AuthProvider } from "./AuthContext";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Login from "./pages/login";
import BadgeTable from "./pages/BadgeTable";

function ScrollToTopOnRouteChange() {
  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo(0, 0);
    };

    // Agregar un evento para manejar el cambio de ruta
    window.addEventListener("routeChange", handleRouteChange);

    // Limpia el evento cuando el componente se desmonta
    return () => {
      window.removeEventListener("routeChange", handleRouteChange);
    };
  }, []);

  return null;
}
function PreventCache() {
  useEffect(() => {
    document.head.appendChild(
      Object.assign(document.createElement("meta"), {
        name: "Pragma",
        content: "no-cache",
      })
    );
    document.head.appendChild(
      Object.assign(document.createElement("meta"), {
        name: "Cache-Control",
        content:
          "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
      })
    );
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
          <Route path="/" element={ <ProtectedElement allowedRoles={[1,2]} element={<Dashboard />} />} />
          <Route path="/SucursalForm" element={<ProtectedElement allowedRoles={[1]} element={<SucursalForm />} />} />
          <Route path="/TypeAchievementForm" element={<ProtectedElement allowedRoles={[1]} element={<TypeAchievementForm />} />}
          />
          <Route path="/AchievementForm" element={<ProtectedElement allowedRoles={[1,2]} element={<AchievementForm/>} />} />
          <Route path="/FacultadForm" element={<ProtectedElement allowedRoles={[1]} element={<FacultadForm />} />}/>
          <Route path="/FacultadTable" element={<ProtectedElement allowedRoles={[1]} element={<FacultadTable />} />}/>
          <Route path="/SanctionForm" element={<ProtectedElement allowedRoles={[1, 2]} element={<SanctionForm />}/>}/>
          <Route path="/SanctionTable" element={<ProtectedElement allowedRoles={[1, 2]} element={<SanctionTable/>}/>}/>
          {/* <Route path="/BadgeForm" element={<BadgeForm />} /> */}
          {/* <Route path="/FacultadTable" element={<FacultadTable />} /> */}
          <Route path="/FacultadEdit/:id" element={ <ProtectedElement allowedRoles={[1]} element={<FacultadEdit />} />} />
          <Route path="/TypeAchievementTable" element={<ProtectedElement allowedRoles={[1]} element={<TypeAchievementTable />} />}
          />
          <Route path="/AchievementTable" element={<AchievementTable />} />
          <Route path="/AchievementEdit/:id" element={<AchievementEdit />} />
          <Route
            path="/TypeAchievementEdit/:id"
            element={<ProtectedElement allowedRoles={[1]} element={<TypeAchievementEdit />} />}
          />
          <Route path="/RankForm" element={<ProtectedElement allowedRoles={[1]} element={<RankForm />} />} />
          <Route path="/RankTable" element={<ProtectedElement allowedRoles={[1]} element={<RankTable />} />} />
          <Route path="/BadgeForm" element={<ProtectedElement allowedRoles={[1]} element={<BadgeForm />} />} />
          <Route path="/BadgeTable" element={<BadgeTable />} />
          <Route path="/StudentAchievement" element={<ProtectedElement allowedRoles={[1,2]} element={<StudentAchievement />} />} />

          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/Login" element={<Login/>} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
