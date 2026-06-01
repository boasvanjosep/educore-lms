import { 
  Settings, 
  Plus, 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  HelpCircle, 
  CheckCircle, 
  Calendar,
  Layers,
  FileText,
  Users,
  PieChart,
  Download,
  CheckCircle2
} from "lucide-react";
import React, { useState } from "react";
import { 
  activeMathematicsCourse, 
  courseModules as initialModules, 
  enrolledStudents, 
  courseRecentActivity 
} from "../data";
import { CourseModule, ModuleItem } from "../types";

export default function CourseManagement() {
  const [activeTab, setActiveTab] = useState<"modules" | "materials" | "students" | "analytics">("modules");
  const [modules, setModules] = useState<CourseModule[]>(initialModules);
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    "mod-1": true,
    "mod-2": true
  });
  
  // Create state for adding simulated module
  const [showAddModule, setShowAddModule] = useState(false);
  const [newModuleTitle, setNewModuleTitle] = useState("");
  const [newModuleHours, setNewModuleHours] = useState("3");

  const toggleModule = (id: string) => {
    setExpandedModules(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleCreateModule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newModuleTitle.trim()) return;

    const newMod: CourseModule = {
      id: "mod-" + Date.now(),
      title: "Module " + (modules.length + 1) + ": " + newModuleTitle,
      itemsCount: 2,
      estimatedHours: parseInt(newModuleHours) || 3,
      items: [
        { id: "mi-" + Date.now() + "1", title: "Conceptual Lecture Review", type: "lecture", duration: "1 hour", isCompleted: false },
        { id: "mi-" + Date.now() + "2", title: "Comprehensive Study Problem Set", type: "assignment", duration: "Est. 2 hours", isCompleted: false }
      ]
    };

    setModules([...modules, newMod]);
    setExpandedModules(prev => ({ ...prev, [newMod.id]: true }));
    setNewModuleTitle("");
    setShowAddModule(false);
  };

  const toggleItemCompletion = (moduleId: string, itemId: string) => {
    setModules(prev => prev.map(mod => {
      if (mod.id === moduleId) {
        return {
          ...mod,
          items: mod.items.map(item => {
            if (item.id === itemId) {
              return { ...item, isCompleted: !item.isCompleted };
            }
            return item;
          })
        };
      }
      return mod;
    }));
  };

  const tabs = [
    { id: "modules", label: "Modules", icon: Layers },
    { id: "materials", label: "Learning Materials", icon: FileText },
    { id: "students", label: "Enrolled Students", icon: Users },
    { id: "analytics", label: "Course Analytics", icon: PieChart },
  ];

  return (
    <div className="space-y-6" id="course-management-view">
      
      {/* Course Banner Head */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 h-full w-1/3 opacity-5 pointer-events-none">
          <GraduationCapPattern />
        </div>

        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="rounded bg-blue-50 px-2.5 py-0.5 text-xxs font-bold text-blue-700 font-mono uppercase">Active Course</span>
              <span className="text-xxs text-slate-400 font-semibold font-mono">{activeMathematicsCourse.code} • {activeMathematicsCourse.term}</span>
            </div>

            <h1 className="font-sans text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight leading-none">
              {activeMathematicsCourse.name}
            </h1>
            <p className="text-xs text-slate-500 font-light max-w-2xl leading-relaxed">
              {activeMathematicsCourse.description}
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 self-end lg:self-start">
            <button 
              onClick={() => alert("Simulation detail: Custom setting variables for MATH-401 triggered.")}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-700 transition"
            >
              <Settings className="h-4 w-4 text-slate-400" />
              Course Settings
            </button>
            <button 
              onClick={() => setShowAddModule(true)}
              className="flex items-center gap-1.5 rounded-lg bg-[#091426] hover:bg-slate-800 px-3.5 py-2 text-xs font-semibold text-white transition shadow"
              id="course-add-module-btn"
            >
              <Plus className="h-4.5 w-4.5" />
              Add Module
            </button>
          </div>
        </div>

        {/* Tab selection rail */}
        <div className="flex gap-1.5 border-t border-slate-100 mt-6 pt-4 overflow-x-auto scrollbar-none" id="course-tab-row">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors shrink-0 ${
                  isSelected 
                    ? "bg-[#091426] text-white" 
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                }`}
                id={`course-tab-${tab.id}`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Adding Module Popup inline */}
      {showAddModule && (
        <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-4 animate-in fade-in slide-in-from-top-1">
          <form onSubmit={handleCreateModule} className="space-y-3 max-w-md">
            <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider">Configure New Course Outline Module</h4>
            <div className="flex gap-2.5">
              <input 
                type="text" 
                required
                placeholder="e.g. Module 3: Complex Analysis Integrals" 
                value={newModuleTitle}
                onChange={(e) => setNewModuleTitle(e.target.value)}
                className="flex-1 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
              <select 
                value={newModuleHours} 
                onChange={(e) => setNewModuleHours(e.target.value)}
                className="rounded-lg border border-slate-200 bg-white px-2 py-2 text-xs focus:ring-1 focus:outline-none"
              >
                <option value="2">2 hours</option>
                <option value="3">3 hours</option>
                <option value="4">4 hours</option>
                <option value="5">5 hours</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <button type="submit" className="rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xxs px-3 py-1.5">Save Outline</button>
              <button type="button" onClick={() => setShowAddModule(false)} className="rounded-md border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 font-semibold text-xxs px-3 py-1.5">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Main Container Layout */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left column (8 elements): Active Tab Content */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* TAB 1: Modules Accordions */}
          {activeTab === "modules" && (
            <div className="space-y-4" id="modules-tab-content">
              {modules.map((mod) => {
                const isExpanded = expandedModules[mod.id];
                return (
                  <div key={mod.id} className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
                    {/* Header bar */}
                    <button
                      onClick={() => toggleModule(mod.id)}
                      className="flex w-full items-center justify-between bg-slate-50/50 p-4.5 px-5 text-left font-sans text-xs font-bold text-slate-800 hover:bg-slate-50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600 font-mono text-3xs font-black">
                          ∑
                        </div>
                        <div>
                          <span className="text-slate-900 block">{mod.title}</span>
                          <span className="text-3xs text-slate-400 font-medium font-mono block mt-0.5">{mod.itemsCount} items • Est. {mod.estimatedHours} hours</span>
                        </div>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="h-4.5 w-4.5 text-slate-400 shrink-0" />
                      ) : (
                        <ChevronDown className="h-4.5 w-4.5 text-slate-400 shrink-0" />
                      )}
                    </button>

                    {/* Collapsible list */}
                    {isExpanded && (
                      <div className="divide-y divide-slate-150 py-1.5 px-5" id={`module-items-${mod.id}`}>
                        {mod.items.map((item) => (
                          <div key={item.id} className="flex items-center justify-between gap-3 py-3">
                            <div className="flex items-center gap-3">
                              <button 
                                onClick={() => toggleItemCompletion(mod.id, item.id)}
                                className={`flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded border transition ${
                                  item.isCompleted 
                                    ? "bg-emerald-500 border-emerald-500 text-white" 
                                    : "border-slate-300 hover:border-slate-400 text-transparent"
                                }`}
                              >
                                {item.isCompleted && <span className="text-3xs leading-none">✓</span>}
                              </button>
                              
                              <div>
                                <span className={`text-xs font-medium ${item.isCompleted ? 'text-slate-400 line-through' : 'text-slate-800'}`}>{item.title}</span>
                                <span className="inline-block bg-slate-100 rounded px-1 text-[9px] font-mono font-bold text-slate-500 uppercase ml-2 select-none tracking-wider">{item.type}</span>
                              </div>
                            </div>

                            <span className="text-3xs text-slate-400 font-bold font-mono">{item.duration}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 2: Materials downloads */}
          {activeTab === "materials" && (
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4" id="materials-tab-content">
              <h3 className="text-xs font-bold text-slate-900 border-b border-slate-50 pb-2">Academic Core Syllabus Documents</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between border border-slate-200/60 p-3 rounded-lg bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-rose-50 text-rose-600 rounded flex items-center justify-center font-bold text-xxs font-mono">PDF</div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 leading-tight">Calculus Syllabus Fall 2024.pdf</h4>
                      <span className="text-3xs text-slate-400">1.4 MB • Updated 12 days ago</span>
                    </div>
                  </div>
                  <button onClick={() => alert("Simulating document download")} className="p-1 px-2.5 rounded bg-white hover:bg-slate-150 border border-slate-200 text-xxs font-semibold text-slate-700 shrink-0">Download</button>
                </div>

                <div className="flex items-center justify-between border border-slate-200/60 p-3 rounded-lg bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-blue-50 text-blue-600 rounded flex items-center justify-center font-bold text-xxs font-mono">ZIP</div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 leading-tight">Advanced Mathematics Lecture Slides.zip</h4>
                      <span className="text-3xs text-slate-400">14.8 MB • Updated 2 days ago</span>
                    </div>
                  </div>
                  <button onClick={() => alert("Simulating slide-deck download")} className="p-1 px-2.5 rounded bg-white hover:bg-slate-150 border border-slate-200 text-xxs font-semibold text-slate-700 shrink-0">Download</button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Enrolled Students List */}
          {activeTab === "students" && (
            <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm" id="students-tab-content">
              <div className="border-b border-slate-200 bg-slate-50/50 p-4.5 px-5">
                <h3 className="text-xs font-bold text-[#091426]">Enrolled Class Identity Roster</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      <th className="p-4 px-5">Student Name</th>
                      <th className="p-4">Email Address</th>
                      <th className="p-4">Enrollment Date</th>
                      <th className="p-4 text-center">Formative Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {enrolledStudents.map((stud) => (
                      <tr key={stud.id} className="hover:bg-slate-50/60 font-medium">
                        <td className="p-4 px-5 text-slate-950 font-bold">{stud.name}</td>
                        <td className="p-4 text-slate-500 font-mono font-medium">{stud.email}</td>
                        <td className="p-4 text-slate-400">{stud.enrollmentDate}</td>
                        <td className="p-4 text-center">
                          <span className="rounded bg-teal-50 text-teal-700 px-2 py-0.5 text-4xs font-bold uppercase tracking-wider">Grade: {stud.grade}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: Course analytics info */}
          {activeTab === "analytics" && (
            <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm space-y-4" id="analytics-tab-content">
              <h3 className="text-xs font-bold text-slate-900 border-b border-slate-50 pb-2">Class syllabus execution analytics</h3>
              <div className="bg-slate-50 p-6 rounded-lg text-center space-y-2">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-lg">📊</div>
                <h4 className="text-xs font-bold text-slate-800">Operational Ingress Charts online</h4>
                <p className="text-xxs text-slate-400 max-w-sm mx-auto leading-relaxed">
                  Real-time synchronization aggregates indicate optimal grading delivery indices of 92% this month. Weekly active syllabus completion stands at 68%.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Right column (4 units): Course Overview & Recent Submissions notifications */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Course overview meter */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-5">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-50 pb-3 leading-none">Course Overview</h3>

            <div className="space-y-4 text-xs font-medium text-slate-700">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-slate-500">Enrolled Students</span>
                <span className="font-sans text-lg font-bold text-slate-900">{activeMathematicsCourse.studentsEnrolled}</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-3xs font-medium">
                  <span className="text-slate-500">Avg. Study Completion</span>
                  <span className="text-slate-850 font-bold">68%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-900" style={{ width: "68%" }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent submissions Activity card */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-[#091426] border-b border-slate-50 pb-3">Recent Submissions</h3>

            <div className="space-y-4" id="recent-submissions-stream">
              {courseRecentActivity.map((act) => (
                <div key={act.id} className="flex gap-2.5 text-xxs">
                  <img src={act.avatar} alt={act.user} className="h-7 w-7 rounded-full object-cover shrink-0 grayscale-20" referrerPolicy="no-referrer" />
                  <div>
                    <p className="text-slate-800 leading-tight">
                      <strong className="font-bold text-slate-900">{act.user}</strong> {act.text}
                    </p>
                    <span className="text-[10px] text-slate-400 mt-1 block">{act.time}</span>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => alert("Simulation detail: Pulling full submission logs for MATH-401...")}
              className="mt-2 w-full rounded-lg border border-slate-200 bg-white hover:bg-slate-50 py-2 text-center text-xs font-semibold text-slate-700 transition"
              id="course-view-all-asg"
            >
              View All Activity
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}

// Simple decorative SVG pattern for course banner
function GraduationCapPattern() {
  return (
    <svg width="240" height="240" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 15L15 32.5L50 50L85 32.5L50 15Z" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 36V65C22 70.5 34.5 75 50 75C65.5 75 78 70.5 78 65V36" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M85 35V65" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
