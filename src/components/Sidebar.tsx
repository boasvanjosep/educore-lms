import { 
  LayoutDashboard, 
  BookOpen, 
  ClipboardList, 
  Award, 
  BarChart3, 
  Bell, 
  CreditCard, 
  ChevronUp, 
  ChevronDown,
  School,
  Building2,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import { UserRole } from "../types";
import { mockInstitutions } from "../data";

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  role: UserRole;
  setRole: (role: UserRole) => void;
  institution: string;
  setInstitution: (inst: string) => void;
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
}

export default function Sidebar({
  activePage,
  setActivePage,
  role,
  setRole,
  institution,
  setInstitution,
  isOpen = true,
  setIsOpen
}: SidebarProps) {
  const [showInstDropdown, setShowInstDropdown] = useState(false);

  // Define sidebar menu options
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "courses", label: "Courses", icon: BookOpen },
    { id: "assignments", label: "Assignments", icon: ClipboardList },
    { id: "grading", label: "Grading", icon: Award },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  const handleNavClick = (id: string) => {
    // Navigate appropriately based on current role context
    if (id === "dashboard") {
      if (role === "admin") setActivePage("admin");
      else if (role === "teacher") setActivePage("teacher");
      else if (role === "student") setActivePage("student");
    } else {
      setActivePage(id);
    }
    if (setIsOpen) setIsOpen(false); // close on mobile
  };

  const getIsActive = (id: string): boolean => {
    if (id === "dashboard") {
      return activePage === "admin" || activePage === "teacher" || activePage === "student";
    }
    return activePage === id;
  };

  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-40 flex w-70 flex-col border-r border-slate-800 bg-slate-900 pt-5 pb-4 transition-transform duration-300 md:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      id="sidebar-container"
    >
      {/* Brand Header */}
      <div className="px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-lg">
            E
          </div>
          <div>
            <h1 className="font-sans text-sm font-bold text-white tracking-tight leading-none">EduCore LMS</h1>
            <span className="text-[11px] text-slate-400 font-medium">{institution}</span>
          </div>
        </div>

        {setIsOpen && (
          <button 
            onClick={() => setIsOpen(false)}
            className="rounded p-1 text-slate-400 hover:bg-slate-800 hover:text-white md:hidden"
            id="mobile-sidebar-close"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Main Navigation */}
      <nav className="mt-8 flex-1 space-y-1 px-4" id="sidebar-nav">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = getIsActive(item.id);
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`flex w-full items-center gap-3 px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                isActive 
                  ? "bg-slate-800 text-white" 
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
              id={`nav-link-${item.id}`}
            >
              <IconComponent className={`h-4.5 w-4.5 ${isActive ? "text-blue-500" : "text-slate-450"}`} />
              {item.label}
            </button>
          );
        })}

        {/* Subscription Tab */}
        <button
          onClick={() => {
            setActivePage("subscription");
            if (setIsOpen) setIsOpen(false);
          }}
          className={`flex w-full items-center gap-3 px-3 py-2 text-sm font-medium transition-colors rounded-md ${
            activePage === "subscription" 
              ? "bg-slate-800 text-white" 
              : "text-slate-400 hover:text-white hover:bg-slate-800"
          }`}
          id="nav-link-subscription"
        >
          <CreditCard className={`h-4.5 w-4.5 ${activePage === "subscription" ? "text-blue-500" : "text-slate-450"}`} />
          Subscription
        </button>
      </nav>

      {/* Bottom Institution Selector */}
      <div className="relative px-4" id="sidebar-footer">
        <div className="border-t border-slate-800 pt-4">
          <button
            onClick={() => setShowInstDropdown(!showInstDropdown)}
            className="flex w-full items-center justify-between rounded-lg border border-slate-800 bg-slate-800/60 px-3.5 py-2 text-left text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            id="institution-selector-btn"
          >
            <div className="flex items-center gap-2.5 truncate">
              <School className="h-4 w-4 text-slate-400 shrink-0" />
              <span className="truncate">{institution}</span>
            </div>
            {showInstDropdown ? (
              <ChevronDown className="h-3.5 w-3.5 text-slate-500 shrink-0" />
            ) : (
              <ChevronUp className="h-3.5 w-3.5 text-slate-500 shrink-0" />
            )}
          </button>

          {showInstDropdown && (
            <div 
              className="absolute bottom-full left-4 right-4 mb-2 z-50 rounded-lg border border-slate-800 bg-slate-900 p-1.5 shadow-lg max-h-48 overflow-y-auto"
              id="institution-selector-dropdown"
            >
              <div className="px-2 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                Switch Campus
              </div>
              {mockInstitutions.map((inst) => (
                <button
                  key={inst}
                  onClick={() => {
                    setInstitution(inst);
                    setShowInstDropdown(false);
                  }}
                  className={`flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-left text-xs transition-colors ${
                    institution === inst 
                      ? "bg-slate-800 text-white font-medium" 
                      : "text-slate-450 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <Building2 className="h-3.5 w-3.5 text-slate-500" />
                  <span className="truncate">{inst}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
