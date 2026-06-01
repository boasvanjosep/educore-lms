import { 
  Upload, 
  FileText, 
  X, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  Info,
  Calendar
} from "lucide-react";
import React, { useState, useRef } from "react";

interface SubmissionProps {
  assignmentId?: string;
  onPostSubmissionSuccess?: () => void;
}

export default function AssignmentSubmission({ assignmentId, onPostSubmissionSuccess }: SubmissionProps) {
  const [dragActive, setDragActive] = useState(false);
  const [attachedFile, setAttachedFile] = useState<{ name: string; size: string } | null>(null);
  const [comment, setComment] = useState("");
  const [plagiarismStatus, setPlagiarismStatus] = useState<"idle" | "scanning" | "passed">("idle");
  const [submissionCompleted, setSubmissionCompleted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Drag and drop listeners
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      attachSimulatedFile(file.name, file.size);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      attachSimulatedFile(file.name, file.size);
    }
  };

  const attachSimulatedFile = (name: string, rawSize: number) => {
    const sizeStr = (rawSize / (1024 * 1024)).toFixed(2) + " MB";
    setAttachedFile({ name, size: sizeStr });
    
    // Auto-trigger simulated plagiarism scanner animation
    setPlagiarismStatus("scanning");
    setTimeout(() => {
      setPlagiarismStatus("passed");
    }, 2500);
  };

  const removeAttachment = () => {
    setAttachedFile(null);
    setPlagiarismStatus("idle");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!attachedFile) {
      alert("Please attach at least one document framework before transmitting.");
      return;
    }

    setSubmissionCompleted(true);
    if (onPostSubmissionSuccess) {
      setTimeout(() => {
        onPostSubmissionSuccess();
      }, 3000);
    }
  };

  const triggerUploadClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  return (
    <div className="space-y-6" id="assignment-submission-view">
      
      {/* Header section */}
      <div className="border-b border-slate-100 pb-5">
        <h1 className="font-sans text-2xl font-bold text-slate-900 tracking-tight">Assignment Submission Area</h1>
        <p className="text-xs text-slate-500 font-light mt-1">Transmit secure electronic deliverables directly to faculty evaluation queues.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left column (7 units) Upload controls */}
        <div className="lg:col-span-7">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-5">
            <div>
              <div className="flex wrap items-center gap-2 mb-1.5">
                <span className="rounded bg-rose-50 text-rose-700 px-2 py-0.5 text-4xs font-bold uppercase tracking-wider">CRITICAL HOMEWORK</span>
                <span className="text-xxs text-slate-400 font-semibold font-mono">PHY-101 • FALL 2024</span>
              </div>
              <h3 className="font-sans text-lg font-bold text-slate-900">Kinematics Analysis Lab Report</h3>
              <p className="text-xs text-slate-500 font-light mt-1.5 leading-relaxed">
                Submit your final laboratory calculations of particle trajectory velocity. Include a vector force scatterplot and complete answer tables.
              </p>
            </div>

            {submissionCompleted ? (
              <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-6 text-center space-y-4" id="submission-completed-screen">
                <CheckCircle className="mx-auto h-12 w-12 text-emerald-500 animate-bounce" />
                <div>
                  <h4 className="text-base font-bold text-emerald-900">Syllabus Deliverables Submitted!</h4>
                  <p className="text-xs text-emerald-700 max-w-md mx-auto leading-relaxed mt-1">
                    Your lab calculations was cataloged. Automated plagiarism validation scans passed (98% original citation match). Instructor Dr. Sarah Jenkins has been updated.
                  </p>
                </div>
                {attachedFile && (
                  <div className="inline-flex items-center gap-2 rounded bg-white border border-emerald-200 px-3 py-1.5 text-xxs font-mono text-emerald-800">
                    <FileText className="h-4 w-4 text-emerald-500" />
                    <span>{attachedFile.name}</span>
                  </div>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" id="student-submission-form">
                
                {/* Upload Dotted Area */}
                <div 
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  onClick={triggerUploadClick}
                  className={`border-2 border-dashed rounded-xl p-8 py-10 text-center cursor-pointer transition ${
                    dragActive 
                      ? "border-blue-500 bg-blue-50/20" 
                      : attachedFile ? "border-slate-300 bg-slate-50" : "border-slate-200 hover:border-slate-300"
                  }`}
                  id="dropbox-upload-element"
                >
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    className="hidden" 
                    accept=".pdf,.docx,.zip"
                  />

                  <div className="space-y-3.5">
                    <div className="mx-auto h-10 w-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Upload className="h-5.5 w-5.5" />
                    </div>

                    <div>
                      <p className="text-xs font-bold text-slate-800">
                        {attachedFile ? "Change attached artifact document" : "Drag & drop PDF report files here"}
                      </p>
                      <span className="text-3xs text-slate-400 mt-1 block font-medium">
                        or click to browse local computer storage files
                      </span>
                    </div>

                    <span className="text-4xs text-slate-400 font-semibold font-mono block uppercase tracking-wider">
                      Accepts: PDF, DOCX, ZIP (Up to 10 MB)
                    </span>
                  </div>
                </div>

                {/* Attached File Visualizer */}
                {attachedFile && (
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3.5 flex items-center justify-between" id="attached-file-box">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 bg-blue-50 text-blue-600 rounded flex items-center justify-center">
                        <FileText className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900 truncate max-w-sm">{attachedFile.name}</p>
                        <span className="text-3xs text-slate-400 font-mono">{attachedFile.size}</span>
                      </div>
                    </div>
                    <button 
                      type="button" 
                      onClick={removeAttachment}
                      className="p-1 rounded hover:bg-slate-200 text-slate-400 hover:text-slate-700 shrink-0"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}

                {/* Comment area */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Add comment for evaluation</label>
                  <textarea 
                    rows={3} 
                    maxLength={200}
                    placeholder="Provide notes or outline calculations parameters..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none placeholder-slate-400"
                  />
                  <div className="text-right text-[9px] text-slate-400 mt-1 font-mono">
                    {comment.length} / 200 characters limit
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full rounded-lg bg-[#091426] hover:bg-slate-800 text-white font-semibold text-xs py-2.5 transition shrink-0 cursor-pointer text-center"
                >
                  Submit Deliverables to Queue
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right column (5 units) Submission current log info */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Submission status milestones */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-5">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-50 pb-3 leading-none">Submission Status</h3>

            <div className="space-y-5">
              
              {/* Submission status check */}
              <div className="flex gap-3 text-xs leading-tight">
                <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full mt-0.5 ${
                  submissionCompleted ? "bg-emerald-500 text-white" : "bg-amber-100 text-amber-600"
                }`}>
                  <span className="text-[10px] font-bold">{submissionCompleted ? "✓" : "!"}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">System status</span>
                  <span className="text-xxs text-slate-400 mt-1 block">
                    {submissionCompleted ? "Transmitted Successfully" : "Pending Document Upload"}
                  </span>
                </div>
              </div>

              {/* Deadline countdown */}
              <div className="flex gap-3 text-xs leading-tight">
                <Clock className="h-5 w-5 shrink-0 text-slate-400 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">Limit Time</span>
                  <span className="text-xxs font-semibold text-slate-500 mt-1 block">
                    October 28, 11:59 PM <span className="text-rose-600 font-bold">(4 days remaining)</span>
                  </span>
                </div>
              </div>

              {/* Plagiarism analysis status */}
              <div className="flex gap-3 text-xs leading-tight border-t border-slate-50 pt-4">
                <ShieldCheck className={`h-5 w-5 shrink-0 mt-0.5 ${
                  plagiarismStatus === "idle" ? "text-slate-300" :
                  plagiarismStatus === "scanning" ? "text-blue-500 animate-spin" : "text-emerald-500"
                }`} />
                <div>
                  <span className="font-bold text-slate-900 block">Automated Plagiarism Check</span>
                  <span className="text-xxs text-slate-500 mt-1 block">
                    {plagiarismStatus === "idle" && "Attach a report to queue scanner checks"}
                    {plagiarismStatus === "scanning" && "Securing and scanning bibliography databases..."}
                    {plagiarismStatus === "passed" && "Passed: 98% Originality citations match."}
                  </span>
                </div>
              </div>

              {/* Grading evaluator */}
              <div className="flex gap-3 text-xs leading-tight border-t border-slate-50 pt-4">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-400 font-mono text-3xs font-black mt-0.5">
                  A
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">Scoring Grade Awarded</span>
                  <span className="text-xxs text-slate-400 mt-1 block">
                    {submissionCompleted ? "Awaiting teacher eval assessment" : "Upload paper first"}
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
