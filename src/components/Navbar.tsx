import { 
  Search, 
  Settings, 
  Menu, 
  Sparkles,
  ChevronDown,
  UserCheck,
  Globe,
  Lock,
  LogOut,
  Bell
} from "lucide-react";
import { useState } from "react";
import { User, UserRole } from "../types";
import { mockUsers } from "../data";

interface NavbarProps {
  user: User;
  onRoleChange: (role: UserRole) => void;
  activePage: string;
  setActivePage: (page: string) => void;
  onLogout: () => void;
  setSidebarOpen: (open: boolean) => void;
}

export default function Navbar({
  user,
  onRoleChange,
  activePage,
  setActivePage,
  onLogout,
  setSidebarOpen
}: NavbarProps) {
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);

  // Quick simulation roles
  const rolesList: Array<{ role: UserRole; label: string; desc: string }> = [
    { role: "admin", label: "Institution Admin", desc: "Global metrics & system-wide operations" },
    { role: "teacher", label: "Dr. Jenkins (Teacher)", desc: "Grading queue, class assignments & syllabus progress" },
    { role: "student", label: "Alex Mercer (Student)", desc: "Daily schedule, upcoming homework & course progress" }
  ];

  const handleRoleSelect = (role: UserRole) => {
    onRoleChange(role);
    setShowRoleDropdown(false);
    // Auto-navigate to correct dashboard overview
    if (role === "admin") setActivePage("admin");
    else if (role === "teacher") setActivePage("teacher");
    else if (role === "student") setActivePage("student");
  };

  const getPageTitle = () => {
    switch(activePage) {
      case "admin": return "Institution Overview";
      case "teacher": return "Teacher Workspace";
      case "student": return "Student Deck";
      case "courses": return "Academic Courses";
      case "assignments": return "Coursework Assignments";
      case "submission": return "Assignment Submission Area";
      case "grading": return "Grading Evaluator";
      case "notifications": return "Notification Management Center";
      case "subscription": return "SaaS Platform Subscription";
      default: return "EduCore Dashboard";
    }
  };

  return (
    <header 
      className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-4 md:px-8"
      id="top-navbar"
    >
      {/* Left items: Mobile Menu & Current Route Label */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(true)}
          className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 md:hidden"
          aria-label="Toggle Sidebar"
          id="navbar-hamburger"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Dynamic Title (hidden on small screens if search is fully populated) */}
        <div className="hidden sm:block">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-widest block font-mono">
            {user.role === "admin" ? "PORTAL: ADMIN" : user.role === "teacher" ? "PORTAL: TEACHER" : "PORTAL: STUDENT"}
          </span>
          <h2 className="text-sm font-bold text-slate-800 leading-none mt-0.5">{getPageTitle()}</h2>
        </div>
      </div>

      {/* Middle Item: Deep Search Database Bar */}
      <div className="mx-4 flex max-w-md flex-1 relative rounded-full bg-slate-100 text-slate-500 focus-within:ring-2 focus-within:ring-blue-500/20 lg:mx-8">
        <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
        <input 
          type="search"
          placeholder={
            user.role === "student" 
              ? "Search courses, grades..." 
              : "Search records, assignments..."
          }
          className="w-full bg-transparent py-2 pl-10 pr-4 text-xs font-normal text-slate-800 placeholder-slate-400 focus:outline-none"
          id="search-input"
        />
      </div>

      {/* Right Items: Simulation Hub + Settings + Profile */}
      <div className="flex items-center gap-2.5 md:gap-4 shrink-0">
        
        {/* Simulation Agent Quick Controller */}
        <div className="relative">
          <button
            onClick={() => setShowRoleDropdown(!showRoleDropdown)}
            className="flex items-center gap-1.5 rounded-full bg-slate-100 hover:bg-slate-200 px-3 py-1.5 text-xs font-medium text-slate-800 transition-all"
            id="simulation-role-toggle"
            title="Switch User Persona Simulation"
          >
            <Sparkles className="h-3.5 w-3.5 text-blue-600 animate-pulse" />
            <span className="hidden lg:inline">Persona: {user.name.split(" ")[0]}</span>
            <ChevronDown className="h-3 w-3 shrink-0" />
          </button>

          {showRoleDropdown && (
            <div 
              className="absolute right-0 mt-2.5 w-76 origin-top-right rounded-xl border border-slate-200 bg-white p-2.5 shadow-xl ring-1 ring-black/5 z-50 animate-in fade-in slide-in-from-top-1"
              id="role-dropdown-menu"
            >
              <div className="px-2 py-1.5 text-xxs font-bold text-slate-400 uppercase tracking-widest font-mono">
                Interactive Persona Suite
              </div>
              <div className="space-y-1">
                {rolesList.map((item) => (
                  <button
                    key={item.role}
                    onClick={() => handleRoleSelect(item.role)}
                    className={`flex w-full items-start gap-2.5 rounded-lg p-2 text-left transition-colors ${
                      user.role === item.role 
                        ? "bg-blue-50 text-blue-900 border border-blue-200" 
                        : "hover:bg-slate-50 text-slate-700 border border-transparent"
                    }`}
                  >
                    <UserCheck className={`h-4.5 w-4.5 shrink-0 mt-0.5 ${user.role === item.role ? 'text-blue-600' : 'text-slate-400'}`} />
                    <div>
                      <div className="text-xs font-bold">{item.label}</div>
                      <div className="text-xxs text-slate-500 leading-tight mt-0.5">{item.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Global Notifications Panel Trigger */}
        <div className="relative">
          <button 
            onClick={() => {
              setActivePage("notifications");
              setShowNotifMenu(!showNotifMenu);
            }} 
            className="relative rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
            id="navbar-bell-btn"
          >
            <span className="absolute right-1 top-1 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <Bell className="h-5 w-5" />
          </button>
        </div>

        {/* Separator */}
        <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>

        {/* User Identity Profile Menu */}
        <div className="relative shrink-0">
          <button
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className="flex items-center gap-2 rounded-full p-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="user-profile-button"
          >
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="h-8.5 w-8.5 rounded-full object-cover ring-2 ring-slate-100" 
              referrerPolicy="no-referrer"
            />
            <div className="hidden text-left xl:block">
              <div className="text-xs font-bold text-slate-900 leading-none">{user.name}</div>
              <div className="text-xxs font-medium text-slate-500 mt-0.5">{user.email}</div>
            </div>
          </button>

          {showProfileDropdown && (
            <div 
              className="absolute right-0 mt-3 w-56 origin-top-right rounded-xl border border-slate-200 bg-white p-2 shadow-xl ring-1 ring-black/5 z-50"
              id="user-profile-menu"
            >
              <div className="px-3 py-2.5 border-b border-slate-100">
                <span className="text-xxs font-bold text-blue-600 uppercase tracking-widest font-mono">My Account</span>
                <p className="text-xs font-bold text-slate-800 truncate">{user.name}</p>
                <p className="text-xxs text-slate-500 truncate mt-0.5">{user.email}</p>
              </div>
              <div className="p-1 space-y-0.5">
                <button 
                  onClick={() => { setActivePage(user.role === "admin" ? "admin" : user.role === "teacher" ? "teacher" : "student"); setShowProfileDropdown(false); }}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs font-medium text-slate-700 hover:bg-slate-50"
                >
                  <UserCheck className="h-4 w-4 text-slate-400" />
                  My Dashboard
                </button>
                <button 
                  onClick={() => { onLogout(); setShowProfileDropdown(false); }}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs font-semibold text-rose-600 hover:bg-rose-50"
                >
                  <LogOut className="h-4 w-4 text-rose-500" />
                  Sign Out Portal
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
