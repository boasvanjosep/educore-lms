import { 
  ClipboardList, 
  Plus, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  ChevronRight,
  BookOpen,
  Calendar,
  Sparkles
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { initialActiveAssignments } from "../data";
import { ActiveAssignment } from "../types";

const assignmentSchema = z.object({
  title: z.string().min(3, "Assignment title must be at least 3 characters"),
  courseCode: z.string().min(1, "Please select an active course"),
  description: z.string().min(5, "Include an evaluation rubric description"),
  dueDate: z.string().min(1, "Enter a valid due date")
});

type AssignmentFormData = z.infer<typeof assignmentSchema>;

interface AssignmentProps {
  onNavigateToSubmission?: (id: string) => void;
}

export default function AssignmentManagement({ onNavigateToSubmission }: AssignmentProps) {
  const [assignments, setAssignments] = useState<ActiveAssignment[]>(initialActiveAssignments);
  const [publishedSuccess, setPublishedSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<AssignmentFormData>({
    resolver: zodResolver(assignmentSchema),
    defaultValues: {
      title: "",
      courseCode: "MATH-401",
      description: "",
      dueDate: "2026-11-14"
    }
  });

  const onSubmit = (data: AssignmentFormData) => {
    const newAsg: ActiveAssignment = {
      id: "asg-" + Date.now(),
      title: data.title,
      courseCode: data.courseCode,
      submittedCount: 0,
      totalCount: 142,
      dueDate: data.dueDate,
      status: "active"
    };

    setAssignments([newAsg, ...assignments]);
    setPublishedSuccess(true);
    reset();

    setTimeout(() => {
      setPublishedSuccess(false);
    }, 4000);
  };

  return (
    <div className="space-y-6" id="assignment-management-view">
      
      {/* Header section */}
      <div className="border-b border-slate-100 pb-5">
        <h1 className="font-sans text-2xl font-bold text-slate-900 tracking-tight">Coursework Assignments</h1>
        <p className="text-xs text-slate-500 font-light mt-1">Syllabus curriculum distribution center and student completion audit matrices.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left column (5 cells) Creator Form */}
        <div className="lg:col-span-5">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-5">
            <h3 className="text-sm font-bold text-[#091426] border-b border-slate-50 pb-3 leading-none">
              Create New Homework Assignment
            </h3>

            {publishedSuccess && (
              <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3.5 flex items-start gap-2.5 text-xs text-emerald-800 animate-in fade-in">
                <CheckCircle className="h-5 w-5 shrink-0 text-emerald-600" />
                <div>
                  <span className="font-bold">Assignment Published!</span>
                  <p className="text-3xs text-emerald-700 mt-0.5">Faculty course materials, grading templates, and student email alerts are queued instantly.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" id="assignment-creation-form">
              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Assignment Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Kinematics Force Lab Outlines"
                  {...register("title")}
                  className={`w-full rounded-lg border px-3.5 py-2 text-xs focus:outline-none focus:ring-1 ${errors.title ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 focus:ring-blue-500'}`}
                />
                {errors.title && <span className="text-[10px] text-rose-500 mt-1 block">{errors.title.message}</span>}
              </div>

              {/* Course Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Course Code Target</label>
                <select 
                  {...register("courseCode")}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none cursor-pointer"
                >
                  <option value="MATH-401">MATH-401 Advanced Mathematics</option>
                  <option value="PHY-101">PHY-101 Foundations of Physics</option>
                  <option value="ENG-204">ENG-204 Literature & Criticism</option>
                </select>
                {errors.courseCode && <span className="text-[10px] text-rose-500 mt-1 block">{errors.courseCode.message}</span>}
              </div>

              {/* Description & prompts */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Details, Prompts & Rubrics</label>
                <textarea 
                  rows={4} 
                  placeholder="Explain requirements. e.g. Submit PDF lab outlines, write 3 paragraphs evaluating vector kinematics. Rubrics: Mechanics (40pt), Calculations (40pt)..."
                  {...register("description")}
                  className={`w-full rounded-lg border px-3.5 py-2 text-xs focus:outline-none focus:ring-1 ${errors.description ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 focus:ring-blue-500'}`}
                />
                {errors.description && <span className="text-[10px] text-rose-500 mt-1 block">{errors.description.message}</span>}
              </div>

              {/* Due date */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Due Date Limit</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
                  <input 
                    type="date"
                    {...register("dueDate")}
                    className={`w-full rounded-lg border pl-9.5 pr-3 px-3 py-2 text-xs focus:outline-none focus:ring-1 ${errors.dueDate ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 focus:ring-blue-500'}`}
                  />
                </div>
                {errors.dueDate && <span className="text-[10px] text-rose-500 mt-1 block">{errors.dueDate.message}</span>}
              </div>

              <button 
                type="submit"
                className="w-full rounded-lg bg-[#091426] hover:bg-slate-800 text-white font-semibold text-xs py-2.5 shadow transition cursor-pointer text-center"
              >
                Publish Assignment
              </button>
            </form>
          </div>
        </div>

        {/* Right column (7 cells) Active Assignments list with completion trackers */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Active Syllabus Assignments ({assignments.length})</h3>
            <span className="text-3xs text-slate-500 font-medium font-mono uppercase tracking-widest bg-slate-100 rounded px-2 py-0.5">Faculty dashboard</span>
          </div>

          <div className="space-y-4" id="assignments-list">
            {assignments.map((asg) => {
              const submissionRate = asg.totalCount > 0 ? Math.round((asg.submittedCount / asg.totalCount) * 100) : 0;
              return (
                <div 
                  key={asg.id}
                  className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md hover:border-slate-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 border-b border-slate-50 pb-3 mb-3">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 leading-none">{asg.title}</h4>
                      <code className="font-mono text-[10px] text-blue-600 font-bold bg-blue-50 px-1 rounded inline-block mt-1.5 uppercase">{asg.courseCode}</code>
                    </div>

                    <div className="flex items-center gap-1.5 text-slate-400 text-3xs font-mono font-bold shrink-0">
                      <Clock className="h-3 w-3" />
                      <span>DUE: {asg.dueDate}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-3xs text-slate-500 font-medium">
                        <span>Submission Tracker</span>
                        <span className="font-bold text-slate-800">{asg.submittedCount} of {asg.totalCount} ({submissionRate}%)</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: `${submissionRate}%` }}></div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2.5">
                      <button 
                        onClick={() => alert(`Reviewing syllabus compliance stats for ${asg.title}`)}
                        className="rounded border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 font-semibold text-3xs px-3 py-1.5"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => onNavigateToSubmission && onNavigateToSubmission(asg.id)}
                        className="rounded bg-slate-900 hover:bg-slate-800 text-slate-100 font-semibold text-3xs px-3 py-1.5"
                      >
                        View Submissions
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
}
