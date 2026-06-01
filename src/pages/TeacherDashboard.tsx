import { 
  BarChart, 
  Settings, 
  Plus, 
  Download, 
  GraduationCap, 
  MapPin, 
  Calendar, 
  ChevronRight,
  TrendingUp,
  Sliders,
  CheckCircle,
  Eye
} from "lucide-react";
import { useState } from "react";
import { teacherOverviewMetrics, upcomingDeadlinesTeacher, teacherCourses, pendingGradingSubmissions } from "../data";
import { Course, Submission } from "../types";

interface TeacherDashboardProps {
  onNavigateToCourse: (courseId: string) => void;
  onNavigateToGrading: (submissionId: string) => void;
  onNavigateToCreateAssignment: () => void;
}

export default function TeacherDashboard({
  onNavigateToCourse,
  onNavigateToGrading,
  onNavigateToCreateAssignment
}: TeacherDashboardProps) {
  // Toggle states
  const [lateSubAlert, setLateSubAlert] = useState(true);
  const [dailyDigest, setDailyDigest] = useState(true);
  const [studentPush, setStudentPush] = useState(false);

  const [submissions, setSubmissions] = useState<Submission[]>(pendingGradingSubmissions);

  const handleExport = () => {
    alert("Triggering excel export for fallback gradebooks. Report downloading automatically.");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300" id="teacher-dashboard-view">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h1 className="font-sans text-2xl font-bold text-slate-900 tracking-tight">Overview</h1>
          <p className="text-xs text-slate-500 font-light mt-1">Here's what's happening in your classes today.</p>
        </div>
        <div className="flex items-center gap-2.5 shrink-0">
          <button 
            onClick={handleExport}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-700 transition"
          >
            <Download className="h-4 w-4 text-slate-400" />
            Export Report
          </button>
          <button 
            onClick={onNavigateToCreateAssignment}
            className="flex items-center gap-1.5 rounded-lg bg-[#091426] hover:bg-slate-800 px-3.5 py-2 text-xs font-semibold text-white transition shadow"
            id="create-assignment-trigger"
          >
            <Plus className="h-4.5 w-4.5" />
            New Assignment
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left 8 Columns: Metrics & Courses & Pending Grading */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Top Indicators */}
          <div className="grid gap-5 sm:grid-cols-2">
            
            {/* Average quiz scores */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Average Quiz Scores</span>
                <div className="p-1 rounded bg-blue-50 text-blue-600">
                  <BarChart className="h-4.5 w-4.5" />
                </div>
              </div>
              <div className="mt-3">
                <span className="font-sans text-3xl font-extrabold text-slate-900">
                  {teacherOverviewMetrics.avgQuizScore}%
                </span>
              </div>
              <div className="mt-2.5 flex items-center gap-1 text-emerald-600 font-semibold text-xxs">
                <TrendingUp className="h-3 w-3" />
                <span>~{teacherOverviewMetrics.quizChange}% vs last month</span>
              </div>
            </div>

            {/* Participation rate */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Participation Rate</span>
                <div className="p-1 rounded bg-indigo-50 text-indigo-600">
                  <GraduationCap className="h-4.5 w-4.5" />
                </div>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-sans text-3xl font-extrabold text-slate-900">
                  {teacherOverviewMetrics.participationRate}%
                </span>
                <span className="text-3xs text-slate-400 font-medium font-mono">Target: {teacherOverviewMetrics.targetRate}%</span>
              </div>
              <div className="mt-3.5 flex items-center justify-between text-2xs text-slate-500">
                <div className="h-2 w-full max-w-[70%] bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: `${teacherOverviewMetrics.participationRate}%` }}></div>
                </div>
                <span className="font-semibold text-blue-600">On Track</span>
              </div>
            </div>

          </div>

          {/* Your Courses Grid */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">Your Courses</h3>
            
            <div className="grid gap-5 sm:grid-cols-2">
              {teacherCourses.map((course) => (
                <div 
                  key={course.id}
                  onClick={() => onNavigateToCourse(course.id)}
                  className="group rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden cursor-pointer transition hover:shadow-lg hover:border-blue-200"
                >
                  <div className="h-28 w-full relative overflow-hidden bg-slate-100">
                    <img 
                      src={course.image} 
                      alt={course.name} 
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <span className="inline-block rounded bg-blue-600 px-1.5 py-0.5 text-4xs font-bold text-white uppercase tracking-wider">{course.code}</span>
                      <h4 className="text-sm font-bold text-white mt-1 truncate">{course.name}</h4>
                    </div>
                  </div>

                  <div className="p-4 space-y-4">
                    <div className="flex items-center justify-between text-3xs text-slate-500 font-medium">
                      <span>{course.term}</span>
                      <span>{course.studentsEnrolled} Students enrolled</span>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-3xs">
                        <span className="text-slate-400 font-medium">Syllabus Progress</span>
                        <span className="text-slate-800 font-semibold">{course.syllabusProgress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: `${course.syllabusProgress}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Grading Panel */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-50 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Pending Grading</h3>
                <p className="text-3xs text-slate-400">Classwork awaiting rubric scoring confirmation</p>
              </div>
              <button 
                onClick={() => onNavigateToGrading("sub-12")}
                className="text-xxs font-semibold text-blue-600 hover:text-blue-800"
              >
                View All
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {submissions.map((sub) => (
                <div key={sub.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3.5 first:pt-0 last:pb-0">
                  <div className="flex items-start gap-3">
                    <img src={sub.studentAvatar} alt={sub.studentName} className="h-9 w-9 rounded-full object-cover grayscale-20 shrink-0" referrerPolicy="no-referrer" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 leading-none">{sub.studentName}</h4>
                      <p className="text-xxs font-medium text-slate-500 mt-1">{sub.assignmentTitle} • <code className="font-mono text-3xs uppercase text-blue-600 font-bold bg-slate-50 px-1 rounded">{sub.courseCode}</code></p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                    <div className="text-right">
                      <span className="text-[10px] font-bold text-slate-400 block tracking-wider uppercase">DUE DATE</span>
                      <span className="text-xxs font-semibold text-rose-600 mt-0.5 block">{sub.submittedAt.includes("Today") ? "Today, 11:59 PM" : "Tomorrow"}</span>
                    </div>
                    <button 
                      onClick={() => onNavigateToGrading(sub.id)}
                      className="rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-2xs px-4 py-2 transition"
                    >
                      Grade
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (4 cells): Upcoming Deadlines & Notification Management */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Upcoming Deadlines Widget */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-[#091426] border-b border-slate-50 pb-3">Upcoming Deadlines</h3>
            
            <div className="relative border-l-2 border-slate-100 pl-4.5 space-y-6 py-2 ml-1" id="timeline-teacher-deadlines">
              {upcomingDeadlinesTeacher.map((dl) => (
                <div key={dl.id} className="relative">
                  <div className={`absolute -left-[27px] top-1.5 h-3 w-3 rounded-full border-2 border-white ring-2 ${
                    dl.color === "rose" ? "bg-rose-500 ring-rose-300/40" :
                    dl.color === "amber" ? "bg-amber-500 ring-amber-300/40" : "bg-blue-500 ring-blue-300/40"
                  }`}></div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 block">{dl.time}</span>
                    <h4 className="text-xs font-bold text-slate-900 mt-0.5">{dl.title}</h4>
                    <span className="inline-block rounded bg-slate-100 px-1.5 py-0.5 text-4xs font-bold text-slate-500 mt-1 uppercase tracking-wider">{dl.badge}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Notification Management Panel */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-50 pb-3">
              <Sliders className="h-4.5 w-4.5 text-slate-500" />
              <div>
                <h3 className="text-sm font-bold text-[#091426] leading-none">Notification Center</h3>
                <p className="text-3xs text-slate-400 mt-0.5">Preferences</p>
              </div>
            </div>

            <div className="space-y-4 text-xs font-medium text-slate-700">
              {/* Option 1 */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-slate-900 block leading-tight">Late Submissions</span>
                  <span className="text-3xs text-slate-400 mt-0.5 block">Alert me instantly</span>
                </div>
                <button 
                  onClick={() => setLateSubAlert(!lateSubAlert)}
                  className={`relative inline-flex h-5.5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${lateSubAlert ? 'bg-slate-900' : 'bg-slate-200'}`}
                >
                  <span className={`pointer-events-none inline-block h-4.5 w-4.5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${lateSubAlert ? 'translate-x-3.5' : 'translate-x-0'}`}></span>
                </button>
              </div>

              {/* Option 2 */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-slate-900 block leading-tight">Daily Digest</span>
                  <span className="text-3xs text-slate-400 mt-0.5 block">Summary at 8:00 AM</span>
                </div>
                <button 
                  onClick={() => setDailyDigest(!dailyDigest)}
                  className={`relative inline-flex h-5.5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${dailyDigest ? 'bg-slate-900' : 'bg-slate-200'}`}
                >
                  <span className={`pointer-events-none inline-block h-4.5 w-4.5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${dailyDigest ? 'translate-x-3.5' : 'translate-x-0'}`}></span>
                </button>
              </div>

              {/* Option 3 */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-slate-900 block leading-tight">Student Messages</span>
                  <span className="text-3xs text-slate-400 mt-0.5 block">Push notifications</span>
                </div>
                <button 
                  onClick={() => setStudentPush(!studentPush)}
                  className={`relative inline-flex h-5.5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${studentPush ? 'bg-slate-900' : 'bg-slate-200'}`}
                >
                  <span className={`pointer-events-none inline-block h-4.5 w-4.5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${studentPush ? 'translate-x-3.5' : 'translate-x-0'}`}></span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
