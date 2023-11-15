import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./css/style.css";
import "./charts/ChartjsConfig";
import Dashboard from "./pages/Dashboard";
import DashboardStudent from "./pages/DashboardStudent"
import DashboardGestor from "./pages/DashboardGestor"
import Menu from "./pages/Menu";
import FacultadForm from "./pages/FacultyForm";
import SucursalForm from "./pages/SucursalForm";
import SucursalTable from "./pages/SucursalTable";
import SucursalEdit from "./pages/SucursalEdit";
import TypeAchievementForm from "./pages/TypeAchievementForm";
import TypeAchievementEdit from "./pages/TypeAchievementEdit";
import AchievementForm from "./pages/AchievementForm";
import BadgeForm from "./pages/BadgeForm";
import BadgesTable from "./pages/BadgeTable";
import FacultadTable from "./pages/FacultyTable";
import FacultadEdit from "./pages/FacultyEdit";
import TypeAchievementTable from "./pages/TypeAchievementTable";
import AchievementTable from "./pages/AchievementTable";
import AchievementEdit from "./pages/AchievementEdit";
import RankForm from "./pages/RankForm";
import RankTable from "./pages/RankTable";
import StudentAchievement from "./pages/StudentAchievement";
import AssignmentTable from "./pages/AssignmentTable";
import AssigmentEdit from "./pages/AssigmentEdit";
import SanctionForm from "./pages/SanctionForm";
import SanctionTable from "./pages/SanctionTable";
import LoginPage from "./pages/LoginPage";
import ProtectedElement from "./ProtectedElement";
import NavigationGuard from "./utils/NavigationGuard";
import { AuthProvider } from "./AuthContext";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import StudentView from "./pages/StudentView";
import StudentRankView from "./pages/StudentRankView ";
import ChangePasswordForm from "./pages/ChangePasswordForm ";
import BadgeTable from "./pages/BadgeTable";
import BadgeStudent from "./pages/BadgeStudent";
import BadgeAssignmentsTable from "./pages/BadgeAssignmentsTable";
import BadgeAssignmentsEdit from "./pages/BadgeAssignmentsEdit"
import DepartamentoEdit from "./pages/DepartamentoEdit";
import DepartamentoForm from "./pages/DepartamentoForm";
import DepartamentoTable from "./pages/DepartamentoTable";
//import CarreraEdit from "./pages/CarreraEdit"
import CarreraForm from "./pages/CarreraForm"
import CarreraTable from "./pages/CarreraTable"
import CarreraEdit from "./pages/CarreraEdit"
import StudentForm from "./pages/StudentForm"
import StudentTable from "./pages/StudentTable"
import StudentEdit from "./pages/StudentEdit"
import StudentPortfolioView from "./pages/StudentPortfolioView";
import StudentAchievementsView from "./pages/StudentAchievementsView ";
import StudentSanctionsView from "./pages/StudentSanctionsView";
import StudentBadgesView from "./pages/StudentBadgesView";
import ManagerForm from "./pages/ManagerForm"
import ManagerTable from "./pages/ManagerTable"
import ManagerEdit from "./pages/ManagerEdit"
import UserManager from "./pages/UserManager"
import InfoMain from "./pages/InfoMain"
import Main from "./pages/Main"
import TypeAchievementTableG from "./pages/TypeAchievementTableG";
import AchievementTableG from "./pages/AchievementTableG";
import BadgeTableG from "./pages/BadgeTableG";
import SanctionTableG from "./pages/SanctionTableG";
import StudentAchievementG from "./pages/StudentAchievementG";
import AssignmentTableG from "./pages/AssignmentTableG";


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
          <Route path="/DashboardStudent" element={ <ProtectedElement allowedRoles={[3]} element={<DashboardStudent />} />} />
          <Route path="/DashboardGestor" element={ <ProtectedElement allowedRoles={[2]} element={<DashboardGestor />} />} />
          <Route path="/SucursalForm" element={<ProtectedElement allowedRoles={[1]} element={<SucursalForm />} />} />
          <Route path="/SucursalTable" element={<ProtectedElement allowedRoles={[1]} element={<SucursalTable />} />} />
          <Route path="/SucursaEdit/:id" element={<ProtectedElement allowedRoles={[1]} element={<SucursalEdit />} />} />
          <Route path="/TypeAchievementForm" element={<ProtectedElement allowedRoles={[1]} element={<TypeAchievementForm />} />}
          />
          <Route path="/AchievementForm" element={<ProtectedElement allowedRoles={[1,2]} element={<AchievementForm/>} />} />
          <Route path="/FacultadForm" element={<ProtectedElement allowedRoles={[1]} element={<FacultadForm />} />}/>
          <Route path="/FacultadTable" element={<ProtectedElement allowedRoles={[1]} element={<FacultadTable />} />}/>
          <Route path="/SanctionForm" element={<ProtectedElement allowedRoles={[1]} element={<SanctionForm />}/>}/>
          <Route path="/SanctionTable" element={<ProtectedElement allowedRoles={[1]} element={<SanctionTable/>}/>}/>
          <Route path="/SanctionTableG" element={<ProtectedElement allowedRoles={[2]} element={<SanctionTableG/>}/>}/>
          <Route path="/FacultadEdit/:id" element={ <ProtectedElement allowedRoles={[1]} element={<FacultadEdit />} />} />
          <Route path="/TypeAchievementTable" element={<ProtectedElement allowedRoles={[1]} element={<TypeAchievementTable />} />}
          />
            <Route path="/TypeAchievementTableG" element={<ProtectedElement allowedRoles={[2]} element={<TypeAchievementTableG />} />}
          />
          <Route path="/AchievementTable" element={<ProtectedElement allowedRoles={[1,2]} element={<AchievementTable />} />} />

          <Route path="/AchievementTableG" element={<ProtectedElement allowedRoles={[2]} element={<AchievementTableG />} />} />
          <Route path="/AchievementEdit/:id" element={<AchievementEdit />} />
          <Route
            path="/TypeAchievementEdit/:id"
            element={<ProtectedElement allowedRoles={[1]} element={<TypeAchievementEdit />} />}
          />
          <Route path="/DepartamentoForm" element={<ProtectedElement allowedRoles={[1]} element={<DepartamentoForm />} />} />
          <Route path="/DepartamentoEdit" element={<ProtectedElement allowedRoles={[1]} element={<DepartamentoEdit />} />} />
          <Route path="/DepartamentoTable" element={<ProtectedElement allowedRoles={[1]} element={<DepartamentoTable/>} />} />

          <Route path="/CarreraForm" element={<ProtectedElement allowedRoles={[1]} element={<CarreraForm />} />} />
          <Route path="/CarreraEdit" element={<ProtectedElement allowedRoles={[1]} element={<CarreraEdit />} />} />
          <Route path="/CarreraTable" element={<ProtectedElement allowedRoles={[1]} element={<CarreraTable/>} />} />

          <Route path="/RankForm" element={<ProtectedElement allowedRoles={[1]} element={<DepartamentoTable />} />} />
          <Route path="/RankTable" element={<ProtectedElement allowedRoles={[1]} element={<RankTable/>} />} />
          <Route path="/BadgeForm" element={<ProtectedElement allowedRoles={[1]} element={<BadgeForm />} />} />
          <Route path="/BadgeStudent" element={<ProtectedElement allowedRoles={[1]} element={<BadgeStudent />} />} />
          <Route path="/BadgeAssignmentsTable" element={<ProtectedElement allowedRoles={[1]} element={<BadgeAssignmentsTable />} />} />
          <Route path="/BadgeAssignmentsEdit/:assignmentId" element={<ProtectedElement allowedRoles={[1]} element={<BadgeAssignmentsEdit />} />} />

          <Route path="/BadgeTable" element={<ProtectedElement allowedRoles={[1]} element={<BadgeTable />} />} />
          <Route path="/BadgeTableG" element={<ProtectedElement allowedRoles={[2]} element={<BadgeTableG/>} />} />
          <Route path="/StudentAchievement" element={<ProtectedElement allowedRoles={[1]} element={<StudentAchievement />} />} />
          <Route path="/StudentAchievementG" element={<ProtectedElement allowedRoles={[2]} element={<StudentAchievementG />} />} />
          <Route path="/AssignmentTableG" element={<ProtectedElement allowedRoles={[2]} element={<AssignmentTableG />} />} />
          <Route path="/AssignmentTable" element={<ProtectedElement allowedRoles={[1]} element={<AssignmentTable />} />} />
          <Route path="/AssigmentEdit/:id" element={<ProtectedElement allowedRoles={[1]} element={<AssigmentEdit />} />} />
          <Route path="/StudentView" element={<ProtectedElement allowedRoles={[3]} element={<StudentView />} />} />
          <Route path="/StudentRankView" element={<ProtectedElement allowedRoles={[3]} element={<StudentRankView />} />} />
          <Route path="/StudentPortfolioView" element={<ProtectedElement allowedRoles={[3]} element={<StudentPortfolioView/>} />} />
          <Route path="/StudentAchievementsView" element={<ProtectedElement allowedRoles={[3]} element={<StudentAchievementsView/>} />} />
          <Route path="/StudentSanctionsView" element={<ProtectedElement allowedRoles={[3]} element={<StudentSanctionsView/>} />} />
          <Route path="/StudentBadgesView" element={<ProtectedElement allowedRoles={[3]} element={<StudentBadgesView/>} />} />
          <Route path="/StudentForm" element={<ProtectedElement allowedRoles={[1]} element={<StudentForm />} />} />
          <Route path="/StudentEdit/:id" element={<ProtectedElement allowedRoles={[1]} element={<StudentEdit />} />} />
          <Route path="/StudentTable" element={<ProtectedElement allowedRoles={[1]} element={<StudentTable/>} />} />
          <Route path="/ManagerForm" element={<ProtectedElement allowedRoles={[1]} element={<ManagerForm />} />} />
          <Route path="/ManagerEdit/:id" element={<ProtectedElement allowedRoles={[1]} element={<ManagerEdit />} />} />
          <Route path="/ManagerTable" element={<ProtectedElement allowedRoles={[1]} element={<ManagerTable/>} />} />
          <Route path="/UserManager" element={<ProtectedElement allowedRoles={[1]} element={<UserManager />} />} />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/Menu" element={<Menu />} />
          <Route path="/ChangePasswordForm" element={<ProtectedElement allowedRoles={[1, 2,3]} element={<ChangePasswordForm />}/>}/>
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />
          <Route path="/Main" element={<Main />} />
          <Route path="/InfoMain" element={<InfoMain />} />
         
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
