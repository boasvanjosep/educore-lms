import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import CourseManagement from "./pages/CourseManagement";
import AssignmentManagement from "./pages/AssignmentManagement";
import AssignmentSubmission from "./pages/AssignmentSubmission";
import GradingPage from "./pages/GradingPage";
import NotificationCenter from "./pages/NotificationCenter";
import SubscriptionPage from "./pages/SubscriptionPage";
import { User, UserRole } from "./types";
import { mockUsers } from "./data";

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>("landing"); // "landing", "login", "admin", "teacher", "student", etc.
  const [activeRole, setActiveRole] = useState<UserRole>("student");
  const [institution, setInstitution] = useState<string>("Global Academy");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  // Active simulated user mapping
  const activeUser: User = mockUsers[activeRole];

  // Manual sign out function
  const handleSignOut = () => {
    setCurrentPage("landing");
  };

  // Simulated login page submit
  const handleLoginSuccess = (email: string, selectedInst: string) => {
    setInstitution(selectedInst);
    
    // Auto map credentials to persona role
    if (email.includes("jenkins") || email.includes("teacher")) {
      setActiveRole("teacher");
      setCurrentPage("teacher");
    } else if (email.includes("admin")) {
      setActiveRole("admin");
      setCurrentPage("admin");
    } else {
      setActiveRole("student");
      setCurrentPage("student");
    }
  };

  const handleSandboxEnter = () => {
    // Instantly log in as active role to speed up sandbox exploration
    setCurrentPage(activeRole);
  };

  const onRoleChange = (newRole: UserRole) => {
    setActiveRole(newRole);
  };

  // Render correct page
  const renderPage = () => {
    switch (currentPage) {
      case "admin":
        return <AdminDashboard />;
      case "teacher":
        return (
          <TeacherDashboard 
            onNavigateToCourse={() => setCurrentPage("courses")}
            onNavigateToGrading={() => setCurrentPage("grading")}
            onNavigateToCreateAssignment={() => setCurrentPage("assignments")}
          />
        );
      case "student":
        return (
          <StudentDashboard 
            onNavigateToSubmission={() => setCurrentPage("submission")}
            onNavigateToCourse={() => setCurrentPage("courses")}
          />
        );
      case "courses":
        return <CourseManagement />;
      case "assignments":
        return <AssignmentManagement onNavigateToSubmission={() => setCurrentPage("submission")} />;
      case "submission":
        return (
          <AssignmentSubmission 
            onPostSubmissionSuccess={() => {
              setTimeout(() => {
                // Auto-route back to dashboard
                setCurrentPage(activeRole);
              }, 3000);
            }} 
          />
        );
      case "grading":
        return <GradingPage />;
      case "notifications":
        return <NotificationCenter />;
      case "subscription":
        return <SubscriptionPage />;
      default:
        return <StudentDashboard onNavigateToSubmission={() => setCurrentPage("submission")} onNavigateToCourse={() => setCurrentPage("courses")} />;
    }
  };

  // Render Landing Page first before log in
  if (currentPage === "landing") {
    return (
      <LandingPage 
        onEnterApp={handleSandboxEnter}
        onEnterLogin={() => setCurrentPage("login")}
      />
    );
  }

  // Render Login state
  if (currentPage === "login") {
    return (
      <LoginPage 
        onLoginSuccess={handleLoginSuccess}
        onBackToLanding={() => setCurrentPage("landing")}
      />
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50 antialiased font-sans" id="scholarstack-application-shell">
      
      {/* 1. Left Navigation Sidebar */}
      <Sidebar 
        activePage={currentPage}
        setActivePage={setCurrentPage}
        role={activeRole}
        setRole={setActiveRole}
        institution={institution}
        setInstitution={setInstitution}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* Mobile backdrop shade overlay */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-xs md:hidden"
          id="mobile-sidebar-backdrop"
        />
      )}

      {/* 2. Main Content Wrapper */}
      <div className="flex flex-1 flex-col md:pl-70">
        
        {/* Top bar with quick user settings & simulation selector */}
        <Navbar 
          user={activeUser}
          onRoleChange={onRoleChange}
          activePage={currentPage}
          setActivePage={setCurrentPage}
          onLogout={handleSignOut}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Dynamic Canvas Area */}
        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto" id="main-content-canvas">
          <div className="animate-in fade-in slide-in-from-bottom-1 duration-300">
            {renderPage()}
          </div>
        </main>
      </div>
    </div>
  );
}
