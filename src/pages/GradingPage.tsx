import { 
  Award, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Check, 
  BookOpen, 
  ChevronRight,
  TrendingUp,
  Sliders,
  UserCheck
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { initialGradingSubmissions } from "../data";
import { GradingSubmission } from "../types";

export default function GradingPage() {
  const [submissions, setSubmissions] = useState<GradingSubmission[]>(initialGradingSubmissions);
  const [selectedSubId, setSelectedSubId] = useState<string>("gs-2"); // default to Sarah Jenkins
  const [postedSuccess, setPostedSuccess] = useState(false);

  // Rubric score states
  const [score1, setScore1] = useState(36); // Accuracy (max 40)
  const [score2, setScore2] = useState(38); // Calculations (max 40)
  const [score3, setScore3] = useState(18); // Formatting (max 20)
  const [feedback, setFeedback] = useState("Outstanding computational analysis of gravity dynamics. Trajectory charts are very legible!");

  const activeSub = submissions.find((s) => s.id === selectedSubId) || submissions[0];

  // Set criteria when sub changes
  useEffect(() => {
    if (activeSub) {
      if (activeSub.status === "graded") {
        setScore1(activeSub.score1 || 35);
        setScore2(activeSub.score2 || 35);
        setScore3(activeSub.score3 || 15);
        setFeedback(activeSub.feedback || "Good work.");
      } else {
        // Reset to default draft bounds
        setScore1(35);
        setScore2(35);
        setScore3(15);
        setFeedback("");
      }
    }
  }, [selectedSubId]);

  // Recalculate totals
  const totalScore = score1 + score2 + score3;
  
  const getLetterGrade = (total: number) => {
    if (total >= 93) return "A";
    if (total >= 90) return "A-";
    if (total >= 87) return "B+";
    if (total >= 83) return "B";
    if (total >= 80) return "B-";
    if (total >= 70) return "C";
    return "D / F";
  };

  const letterGrade = getLetterGrade(totalScore);

  const handlePostGrade = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update the submission status in list
    setSubmissions(prev => prev.map(s => {
      if (s.id === selectedSubId) {
        return {
          ...s,
          status: "graded",
          totalScore,
          score1,
          score2,
          score3,
          feedback
        };
      }
      return s;
    }));

    setPostedSuccess(true);
    setTimeout(() => {
      setPostedSuccess(false);
    }, 4000);
  };

  return (
    <div className="space-y-6" id="grading-evaluator-view">
      
      {/* Page header */}
      <div className="border-b border-slate-100 pb-5">
        <h1 className="font-sans text-2xl font-bold text-slate-900 tracking-tight">Grading / Evaluation System</h1>
        <p className="text-xs text-slate-500 font-light mt-1">Rubric-driven student assignment evaluation portal and transcript record updates.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Side (4 units): Student selection list */}
        <div className="lg:col-span-4">
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col h-[580px]">
            <div className="border-b border-slate-100 bg-slate-50/50 p-4">
              <h3 className="text-xs font-bold text-slate-900">Awaiting Assessment</h3>
              <p className="text-3xs text-slate-400 mt-0.5">Select a student paper below to review</p>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-slate-100" id="grading-sub-list">
              {submissions.map((sub) => {
                const isActive = sub.id === selectedSubId;
                return (
                  <button
                    key={sub.id}
                    onClick={() => setSelectedSubId(sub.id)}
                    className={`w-full text-left p-4 p-4.5 block transition-colors ${
                      isActive 
                        ? "bg-slate-100/80 border-l-4 border-blue-600" 
                        : "hover:bg-slate-50 border-l-4 border-transparent"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="text-xs font-bold text-slate-900 leading-none truncate max-w-[70%]">{sub.studentName}</h4>
                      <span className={`inline-block rounded px-1.5 py-0.2 text-[9px] font-bold uppercase tracking-wider ${
                        sub.status === "graded" ? "bg-emerald-50 text-emerald-700" :
                        sub.status === "late" ? "bg-rose-50 text-rose-700 animate-pulse" : "bg-blue-50 text-blue-700"
                      }`}>
                        {sub.status === "graded" ? "Graded" : sub.status}
                      </span>
                    </div>

                    <p className="text-3xs text-slate-500 font-medium mt-1.5 truncate">{sub.assignmentTitle}</p>
                    <div className="flex items-center justify-between text-4xs font-mono font-bold text-slate-400 mt-2.5">
                      <span>{sub.courseCode}</span>
                      {sub.status === "graded" && (
                        <span className="text-slate-900">Score: {sub.totalScore || 92} / 100</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side (8 units): Rubric Calculator evaluation */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Main Workspace Frame */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-5" id="paper-workspace">
            {/* Header info */}
            <div className="border-b border-slate-150 pb-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-slate-900">{activeSub.studentName}</h3>
                  <p className="text-xxs font-medium text-slate-500 mt-1">
                    {activeSub.assignmentTitle} • <code className="font-mono text-3xs uppercase font-bold text-blue-600 bg-blue-50 px-1 rounded">{activeSub.courseCode}</code>
                  </p>
                </div>

                <div className="text-right text-xxs font-semibold text-slate-400" id="grading-notif-meta">
                  <p>Received: {activeSub.submittedDate}</p>
                  <p className="text-3xs mt-0.5 text-emerald-600 font-bold uppercase">PLAGIARISM: PASSED ({activeSub.similarityMatch})</p>
                </div>
              </div>
            </div>

            {/* Simulated file reader box */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4.5 space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <FileText className="h-5.5 w-5.5 text-blue-600" />
                  <span className="text-xs font-bold text-slate-800 font-mono">{activeSub.avatar}</span>
                </div>
                <button 
                  onClick={() => alert("Loading complete submission calculations PDF script...")}
                  className="rounded bg-white border border-slate-200 hover:bg-slate-50 text-xxs font-semibold text-slate-700 py-1.5 px-3 shadow-sm select-auto"
                >
                  Download Manuscript
                </button>
              </div>

              <div className="bg-white p-4.5 rounded-lg border border-slate-150 text-xxs leading-relaxed font-light text-slate-700 min-h-34 space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 font-mono scale-95 origin-left block">Student Abstract comment</span>
                <p>
                  "We computed particle vector momentum by recording elapsed flight times across five target stations. The velocity values verify parabolic path friction calculations as originally proposed by kinematic trajectories."
                </p>
              </div>
            </div>

            {/* Rubrics form calculator */}
            {postedSuccess && (
              <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-4 flex items-start gap-3 text-xs text-emerald-800 animate-in fade-in" id="grading-success-box">
                <CheckCircle className="h-5.5 w-5.5 shrink-0 text-emerald-600" />
                <div>
                  <span className="font-bold">Evaluation Saved & Posted!</span>
                  <p className="text-3xs text-emerald-700 mt-1">Numerical rubric criteria logged successfully. ScholarStack GPA and course transcripts updated for student {activeSub.studentName}.</p>
                </div>
              </div>
            )}

            <form onSubmit={handlePostGrade} className="space-y-6" id="rubric-form-recalc">
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-50 pb-2">
                  <Sliders className="h-4.5 w-4.5 text-slate-400" />
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Evaluation Rubric Slider</span>
                </div>

                <div className="grid gap-5 sm:grid-cols-3">
                  
                  {/* Criteria 1 */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wide block">Accuracy (Max: 40)</label>
                    <input 
                      type="number" 
                      min={0} 
                      max={40} 
                      value={score1}
                      onChange={(e) => setScore1(Math.min(40, parseInt(e.target.value) || 0))}
                      className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-xs font-bold focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  {/* Criteria 2 */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wide block">Math Prec. (Max: 40)</label>
                    <input 
                      type="number" 
                      min={0} 
                      max={40} 
                      value={score2}
                      onChange={(e) => setScore2(Math.min(40, parseInt(e.target.value) || 0))}
                      className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-xs font-bold focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  {/* Criteria 3 */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wide block">Formatting (Max: 20)</label>
                    <input 
                      type="number" 
                      min={0} 
                      max={20} 
                      value={score3}
                      onChange={(e) => setScore3(Math.min(20, parseInt(e.target.value) || 0))}
                      className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-xs font-bold focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                </div>
              </div>

              {/* Dynamic Recalculated Score Card */}
              <div className="rounded-xl border border-blue-150 bg-blue-50/40 p-4 flex items-center justify-between" id="dynamic-score-display">
                <div>
                  <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block font-mono">Calculated Score Sum</span>
                  <span className="text-xl font-extrabold text-slate-900 mt-1 block">
                    {totalScore} <span className="text-xs text-slate-400 font-normal">/ 100 maximum value</span>
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block font-mono">Letter Grade</span>
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white font-black text-base mt-1 shadow-sm">
                    {letterGrade}
                  </div>
                </div>
              </div>

              {/* Feedback comments */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Syllabus Evaluation Feedback</label>
                <textarea 
                  rows={3} 
                  required
                  placeholder="Record formal appraisal notes..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none placeholder-slate-400"
                />
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
                <button 
                  type="button"
                  onClick={() => alert("Simulation detail: Work drafted. Scores saved locally as preview.")}
                  className="rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 font-semibold text-xs py-2 px-4 shadow-sm"
                >
                  Save Draft Score
                </button>
                <button 
                  type="submit"
                  className="rounded-lg bg-[#091426] hover:bg-slate-800 text-white font-semibold text-xs py-2 px-5 shadow transition"
                  id="evaluation-approve-grade-btn"
                >
                  Approve & Post Grade
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>

    </div>
  );
}
