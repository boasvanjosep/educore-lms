import { 
  Users, 
  UserCheck, 
  CheckCircle2, 
  Send, 
  BookOpen, 
  TrendingUp, 
  Info, 
  Database, 
  Star,
  Plus,
  RefreshCw,
  MoreVertical,
  Activity,
  Award
} from "lucide-react";
import { useState } from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from "recharts";
import { adminOverviewMetrics, enrollmentGrowthData, recentActivityLogs } from "../data";
import { ActivityLog } from "../types";

export default function AdminDashboard() {
  const [activities, setActivities] = useState<ActivityLog[]>(recentActivityLogs);
  const [logsUpdated, setLogsUpdated] = useState(false);
  const [storageUsed, setStorageUsed] = useState(adminOverviewMetrics.storageUsed);

  // Quick activity adder to support simulated interaction
  const triggerSimulatedAction = (actionType: "import" | "maintenance" | "course") => {
    let newLog: ActivityLog;
    if (actionType === "import") {
      newLog = {
        id: "act-" + Date.now(),
        type: "enrollment",
        title: "Manual CSV class ingress completed",
        meta: "Registrar Dept (Dr. Jenkins request)",
        time: "Just now"
      };
    } else if (actionType === "maintenance") {
      newLog = {
        id: "act-" + Date.now(),
        type: "system",
        title: "Global CDN asset verification",
        meta: "DevOps Automated Worker",
        time: "Just now"
      };
    } else {
      newLog = {
        id: "act-" + Date.now(),
        type: "course",
        title: "Syllabus revision proposal drafted",
        meta: "Prof. Arthur Pendelton",
        time: "Just now"
      };
    }

    setActivities([newLog, ...activities]);
    setLogsUpdated(true);
    setTimeout(() => setLogsUpdated(false), 2000);
  };

  const increaseStorage = () => {
    if (storageUsed < adminOverviewMetrics.storageLimit - 0.2) {
      setStorageUsed(prev => parseFloat((prev + 0.4).toFixed(1)));
    } else {
      alert("Storage limit peak reached. Please write to ScholarStack team to expand hardware volume.");
    }
  };

  return (
    <div className="space-y-6" id="admin-dashboard-view">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h1 className="font-sans text-2xl font-bold text-slate-900 tracking-tight">Institution Overview</h1>
          <p className="text-xs text-slate-500 font-light mt-1">High-level metrics and recent operational activity for Global Academy campus.</p>
        </div>
        <div className="flex items-center gap-2.5">
          <button 
            onClick={() => triggerSimulatedAction("import")}
            className="rounded-lg border border-slate-200 bg-white hover:bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-700 transition"
            id="admin-import-action"
          >
            Import Student Batch
          </button>
          <button 
            onClick={() => triggerSimulatedAction("maintenance")}
            className="flex items-center gap-1.5 rounded-lg bg-[#091426] hover:bg-slate-800 px-3.5 py-2 text-xs font-semibold text-white transition shadow"
            id="admin-maintenance-action"
          >
            <Plus className="h-4 w-4" />
            Maintenance Trigger
          </button>
        </div>
      </div>

      {/* Metric Tiles Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" id="admin-summary-tiles">
        
        {/* Total Students */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium text-slate-500">Total Students</span>
            <Users className="h-4.5 w-4.5 text-slate-400" />
          </div>
          <div className="mt-2.5">
            <span className="font-sans text-3xl font-extrabold text-slate-900">
              {adminOverviewMetrics.totalStudents.toLocaleString()}
            </span>
          </div>
          <div className="mt-2 flex items-center gap-1 text-emerald-600 font-semibold text-2xs">
            <TrendingUp className="h-3 w-3" />
            <span>+5% this term</span>
          </div>
        </div>

        {/* Active Teachers */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium text-slate-500">Active Teachers</span>
            <UserCheck className="h-4.5 w-4.5 text-slate-400" />
          </div>
          <div className="mt-2.5">
            <span className="font-sans text-3xl font-extrabold text-slate-900">
              {adminOverviewMetrics.activeTeachers}
            </span>
          </div>
          <div className="mt-2 text-slate-400 text-2xs font-medium">
            <span>Steady</span>
          </div>
        </div>

        {/* Submission Rate */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium text-slate-500">Submission Rate</span>
            <CheckCircle2 className="h-4.5 w-4.5 text-slate-400" />
          </div>
          <div className="mt-2.5">
            <span className="font-sans text-3xl font-extrabold text-slate-900">
              {adminOverviewMetrics.submissionRate}%
            </span>
          </div>
          <div className="mt-3.5">
            <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full bg-brand-primary rounded-full" style={{ width: `${adminOverviewMetrics.submissionRate}%` }}></div>
            </div>
          </div>
        </div>

        {/* Notification Delivery */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium text-slate-500">Notification Delivery</span>
            <Send className="h-4.5 w-4.5 text-slate-400" />
          </div>
          <div className="mt-2.5">
            <span className="font-sans text-3xl font-extrabold text-slate-900">
              {adminOverviewMetrics.notificationDelivery}%
            </span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-emerald-600 font-semibold text-2xs">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>Optimal</span>
          </div>
        </div>

      </div>

      {/* Row: Enrollment Growth Recharts & Recent Activities */}
      <div className="grid gap-6 lg:grid-cols-12" id="admin-charts-section">
        
        {/* Enrollment Recharts Container */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-8 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-50 pb-4 mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Enrollment Growth</h3>
              <p className="text-3xs text-slate-400">Chronological student ingress values over seasons</p>
            </div>
            <select className="rounded border border-slate-200 bg-white px-2 py-1 text-xxs font-semibold text-slate-600">
              <option>This Year</option>
              <option>Prior Academic Year</option>
            </select>
          </div>

          <div className="h-64 w-full" id="enrollment-chart-element">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={enrollmentGrowthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#091426', borderRadius: '8px', border: 'none' }}
                  labelStyle={{ color: '#ffffff', fontWeight: 'bold', fontSize: '11px' }}
                  itemStyle={{ color: '#38bdf8', fontSize: '11px' }}
                />
                <Bar dataKey="students" radius={[4, 4, 0, 0]}>
                  {enrollmentGrowthData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={index === enrollmentGrowthData.length - 1 ? "#091426" : "#bcc7de"} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity List widget */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-50 pb-4 mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Recent Activity</h3>
                <p className="text-3xs text-slate-400">Live operational execution stream</p>
              </div>
              <button className="rounded p-1 text-slate-400 hover:text-slate-600">
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3.5 pr-1 max-h-68 overflow-y-auto" id="recent-activities-list">
              {activities.map((log) => (
                <div key={log.id} className="flex gap-3 text-xs leading-normal">
                  <div className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                    log.type === "course" ? "bg-blue-50 text-blue-600" :
                    log.type === "system" ? "bg-rose-50 text-rose-600" :
                    log.type === "enrollment" ? "bg-indigo-50 text-indigo-600" : "bg-emerald-50 text-emerald-600"
                  }`}>
                    {log.type === "course" ? <BookOpen className="h-4 w-4" /> :
                     log.type === "system" ? <Activity className="h-4 w-4" /> :
                     log.type === "enrollment" ? <Users className="h-4 w-4" /> : <Award className="h-4 w-4" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-800">{log.title}</p>
                    <div className="flex items-center gap-1.5 mt-0.5 text-slate-400 text-3xs font-medium">
                      <span>{log.meta}</span>
                      <span>•</span>
                      <span>{log.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={() => triggerSimulatedAction("course")}
            className="mt-4 w-full rounded-lg border border-slate-200 bg-white hover:bg-slate-50 py-2 text-center text-xs font-semibold text-slate-700 transition"
          >
            View All Activity
          </button>
        </div>

      </div>

      {/* Institutional Performance row */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm" id="institutional-performance">
        <h3 className="text-sm font-bold text-[#091426] border-b border-slate-50 pb-3 mb-4">
          Institutional Performance Summary
        </h3>
        
        <div className="grid gap-5 sm:grid-cols-3">
          
          {/* Rating */}
          <div className="rounded-lg bg-slate-50 p-4 border border-slate-100">
            <span className="text-3xs font-bold text-slate-400 uppercase tracking-wider block">Average Course Rating</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-extrabold text-slate-900">{adminOverviewMetrics.avgCourseRating}</span>
              <span className="text-xs font-medium text-slate-400">/ 5.0</span>
            </div>
            <div className="flex items-center gap-0.5 mt-2 text-slate-400" id="course-rating-stars">
              {[1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-blue-500 stroke-blue-500" />
              ))}
              <Star className="h-3.5 w-3.5 fill-blue-200 stroke-blue-200" />
            </div>
          </div>

          {/* Engagement */}
          <div className="rounded-lg bg-slate-50 p-4 border border-slate-100 flex flex-col justify-between">
            <div>
              <span className="text-3xs font-bold text-slate-400 uppercase tracking-wider block">Platform Engagement</span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-2xl font-extrabold text-slate-900">{adminOverviewMetrics.platformEngagement}%</span>
                <span className="text-xxs font-medium text-slate-500">Daily Active Users</span>
              </div>
            </div>
            <div className="h-1.5 w-full bg-slate-200 rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-slate-900 rounded-full" style={{ width: `${adminOverviewMetrics.platformEngagement}%` }}></div>
            </div>
          </div>

          {/* Storage Volume */}
          <div className="rounded-lg bg-slate-50 p-4 border border-slate-100 flex flex-col justify-between">
            <div>
              <span className="text-3xs font-bold text-slate-400 uppercase tracking-wider block">Storage Usage</span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-2xl font-extrabold text-slate-900">{storageUsed} TB</span>
                <span className="text-xxs font-medium text-slate-500">of {adminOverviewMetrics.storageLimit} TB total</span>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <div className="h-1.5 w-2/3 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full transition-all duration-300" style={{ width: `${(storageUsed / adminOverviewMetrics.storageLimit) * 100}%` }}></div>
              </div>
              <button 
                onClick={increaseStorage}
                className="text-xxs font-bold text-blue-600 hover:text-blue-800"
                id="admin-manage-storage"
              >
                Manage Storage
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
