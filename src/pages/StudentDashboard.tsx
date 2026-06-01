import { 
  Award, 
  MapPin, 
  Video, 
  Clock, 
  BookOpen, 
  Calendar as CalendarIcon, 
  BellRing, 
  ChevronLeft, 
  ChevronRight,
  TrendingUp,
  FileCheck,
  ChevronDown
} from "lucide-react";
import { useState } from "react";
import { studentSchedule, studentUpcomingAssignments, systemAnnouncements } from "../data";

interface StudentDashboardProps {
  onNavigateToSubmission: (homeworkId: string) => void;
  onNavigateToCourse: (courseId: string) => void;
}

export default function StudentDashboard({
  onNavigateToSubmission,
  onNavigateToCourse
}: StudentDashboardProps) {
  const [selectedDay, setSelectedDay] = useState(24);
  const [announcements, setAnnouncements] = useState(systemAnnouncements);

  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const calendarDates = [
    { num: 29, gray: true }, { num: 30, gray: true }, { num: 1 }, { num: 2 }, { num: 3 }, { num: 4 }, { num: 5 },
    { num: 6 }, { num: 7 }, { num: 8 }, { num: 9 }, { num: 10 }, { num: 11 }, { num: 12 },
    { num: 13 }, { num: 14 }, { num: 15 }, { num: 16 }, { num: 17 }, { num: 18 }, { num: 19 },
    { num: 20 }, { num: 21 }, { num: 22 }, { num: 23 }, { num: 24, holdsClass: true }, { num: 25 }, { num: 26 }, { num: 27 },
    { num: 28 }, { num: 29 }, { num: 30 }, { num: 31 }, { num: 1, gray: true }, { num: 2, gray: true }
  ];

  const handleDaySelect = (day: number) => {
    setSelectedDay(day);
    if (day === 24) {
      alert("Viewing schedule records for current academic target cycle: Oct 24.");
    } else {
      alert(`Simulation: Viewing calendar schedule for October ${day}. No formal active class scheduled.`);
    }
  };

  const clearAnnouncements = () => {
    setAnnouncements([]);
  };

  return (
    <div className="space-y-6" id="student-dashboard-view">
      
      {/* Welcome Banner Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h1 className="font-sans text-2xl font-bold text-slate-900 tracking-tight">Welcome back, Alex</h1>
          <p className="text-xs text-slate-500 font-light mt-1">Here's your academic overview for today, October 24.</p>
        </div>

        {/* GPA metric tile */}
        <div className="rounded-xl border border-blue-200/60 bg-blue-50/50 p-3 px-5 flex items-center gap-3.5 shrink-0 shadow-sm">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-xs" title="Verified Cumul Grade Point">
            <Award className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block font-mono">Current GPA</span>
            <span className="text-base font-extrabold text-slate-900 leading-none">3.8 <span className="text-xxs text-slate-400 font-normal">/ 4.0</span></span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column (8 units) for Schedule & Upcoming Assignments */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Today's Schedule Card */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-5">
            <div className="flex items-center gap-2 border-b border-slate-50 pb-3">
              <CalendarIcon className="h-4.5 w-4.5 text-slate-400" />
              <h3 className="text-sm font-bold text-slate-900">Today's Schedule</h3>
            </div>

            {/* Timetable visual list */}
            <div className="relative border-l-2 border-slate-150 pl-6.5 space-y-7 ml-1" id="timeline-schedule">
              {studentSchedule.map((item) => (
                <div key={item.id} className="relative group">
                  {/* Bullet */}
                  <div className="absolute -left-[32px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-blue-600 ring-2 ring-blue-100 group-hover:scale-110 transition-transform"></div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-slate-400">
                        <Clock className="h-3 w-3" />
                        {item.timeRange}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 mt-1">{item.title}</h4>
                      <p className="flex items-center gap-1 mt-1 text-slate-500 text-xxs font-medium leading-none">
                        <MapPin className="h-3.5 w-3.5 text-slate-400" />
                        {item.location}
                      </p>
                    </div>

                    <span className={`inline-block rounded-md px-2.5 py-1 text-4xs font-extrabold uppercase tracking-wide w-fit ${
                      item.type === "Lecture" ? "bg-blue-50 text-blue-700" :
                      item.type === "Seminar" ? "bg-indigo-50 text-indigo-700" : "bg-teal-50 text-teal-700"
                    }`}>
                      {item.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Assignments Panel */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-50 pb-3">
              <div className="flex items-center gap-2">
                <FileCheck className="h-4.5 w-4.5 text-slate-400" />
                <h3 className="text-sm font-bold text-slate-900">Upcoming Assignments</h3>
              </div>
              <button 
                onClick={() => onNavigateToSubmission("sa-1")}
                className="text-xxs font-semibold text-blue-600 hover:text-blue-800"
              >
                View All
              </button>
            </div>

            <div className="space-y-4">
              {studentUpcomingAssignments.map((asg) => (
                <div 
                  key={asg.id}
                  onClick={() => onNavigateToSubmission(asg.id)}
                  className="rounded-lg border border-slate-100 bg-slate-50/50 p-4 transition hover:shadow hover:border-slate-200 hover:bg-slate-50 cursor-pointer"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 leading-none">{asg.title}</h4>
                      <span className="text-3xs text-slate-400 mt-1.5 block">{asg.course}</span>
                    </div>
                    <span className={`rounded-full px-2 py-0.5 text-4xs font-bold ${
                      asg.statusColor === "rose" ? "bg-rose-50 text-rose-600" : "bg-blue-50 text-blue-600"
                    }`}>
                      {asg.statusText}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-3xs text-slate-400 font-medium">
                      <span>Completion: {asg.progress}%</span>
                      <span>Due Date: {asg.dueDate}</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${asg.statusColor === "rose" ? "bg-rose-500" : "bg-blue-500"}`} style={{ width: `${asg.progress}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (4 units) for Calendar Preview & Announcements */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Calendar Widget */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-50 pb-3">
              <span className="text-xs font-bold text-slate-800 font-sans">October 2024</span>
              <div className="flex items-center gap-1.5">
                <button className="rounded p-1 text-slate-400 hover:text-slate-600">
                  <ChevronLeft className="h-3.5 w-3.5" />
                </button>
                <button className="rounded p-1 text-slate-400 hover:text-slate-600">
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-y-2.5 text-center text-3xs font-medium">
              {daysOfWeek.map((day) => (
                <div key={day} className="text-slate-400 font-semibold">{day}</div>
              ))}
              {calendarDates.map((date, idx) => (
                <button
                  key={idx}
                  onClick={() => !date.gray && handleDaySelect(date.num)}
                  disabled={date.gray}
                  className={`mx-auto flex h-6.5 w-6.5 items-center justify-center rounded-full text-3xs relative cursor-pointer font-medium ${
                    date.gray ? "text-slate-200 cursor-not-allowed" :
                    date.num === selectedDay ? "bg-slate-900 text-white font-bold" : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {date.num}
                  {date.holdsClass && date.num !== selectedDay && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-blue-500"></span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Announcements Widget */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-50 pb-3">
              <div className="flex items-center gap-2">
                <BellRing className="h-4 w-4 text-slate-500 animate-swing" />
                <h3 className="text-sm font-bold text-[#091426]">Announcements</h3>
              </div>
              {announcements.length > 0 && (
                <button onClick={clearAnnouncements} className="text-3xs text-slate-400 hover:text-slate-600">Clear</button>
              )}
            </div>

            {announcements.length === 0 ? (
              <div className="text-center py-4 text-3xs text-slate-400">
                You have no active bulletins. Check back later!
              </div>
            ) : (
              <div className="space-y-4 max-h-[290px] overflow-y-auto" id="student-announcements-list">
                {announcements.map((ann) => (
                  <div key={ann.id} className="text-xs space-y-1.5 border-b border-slate-50 pb-3 last:border-none last:pb-0">
                    <div className="flex items-center justify-between text-3xs font-mono font-bold">
                      <span className="text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">{ann.sender}</span>
                      <span className="text-slate-400">{ann.timeAgo}</span>
                    </div>
                    <h4 className="font-bold text-slate-900 leading-snug">{ann.title}</h4>
                    <p className="text-slate-500 text-xxs leading-relaxed font-light">{ann.content}</p>
                  </div>
                ))}
              </div>
            )}

            <button 
              onClick={() => alert("Simulation detail: Pulling secondary institutional bulletin feed...")}
              className="mt-2 w-full rounded-lg border border-slate-200 bg-white hover:bg-slate-50 py-2 text-center text-xs font-semibold text-slate-700 transition"
            >
              View All Announcements
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
