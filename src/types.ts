export type UserRole = "guest" | "admin" | "teacher" | "student";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  institution: string;
  gpa?: number;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  instructor: string;
  instructorAvatar: string;
  term: string;
  studentsEnrolled: number;
  syllabusProgress: number; // percentage (0-100)
  image: string;
  description: string;
  modulesCount: number;
}

export interface ModuleItem {
  id: string;
  title: string;
  type: "lecture" | "assignment" | "quiz" | "resource";
  duration: string;
  isCompleted?: boolean;
}

export interface CourseModule {
  id: string;
  title: string;
  itemsCount: number;
  estimatedHours: number;
  items: ModuleItem[];
}

export interface Assignment {
  id: string;
  title: string;
  courseId: string;
  courseName: string;
  courseCode: string;
  moduleName: string;
  dueDate: string;
  dueTime: string;
  points: number;
  submissionsCount: number;
  totalEnrolled: number;
  status: "Published" | "Draft";
  submissionType: "File Upload" | "Code Submission" | "Multiple Choice";
  instructions: string;
  rubric: RubricItem[];
}

export interface RubricItem {
  id: string;
  criterion: string;
  points: number;
  description: string;
  scoredPoints?: number;
}

export interface Submission {
  id: string;
  assignmentId: string;
  assignmentTitle: string;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  courseName: string;
  courseCode: string;
  submittedAt: string;
  status: "Graded" | "Pending" | "Late";
  grade?: number;
  feedback?: string;
  fileUrl: string;
  fileName: string;
  fileSize: string;
  rubricScores?: Record<string, number>;
}

export interface Campaign {
  id: string;
  templateName: string;
  channel: Array<"email" | "push">;
  scheduledTime: string;
  readRate?: number; // percentage e.g. 82
  status: "Completed" | "Scheduled" | "Draft";
}

export interface ActivityLog {
  id: string;
  type: "course" | "system" | "enrollment" | "grade";
  title: string;
  meta: string;
  time: string;
}

export interface ScheduleItem {
  id: string;
  timeRange: string;
  title: string;
  location: string;
  type: "Lecture" | "Seminar" | "Lab";
}

export interface Announcement {
  id: string;
  sender: string;
  timeAgo: string;
  title: string;
  content: string;
}

export interface ActiveAssignment {
  id: string;
  title: string;
  courseCode: string;
  submittedCount: number;
  totalCount: number;
  dueDate: string;
  status: "active" | "completed";
}

export interface GradingSubmission {
  id: string;
  studentName: string;
  studentAvatar: string;
  assignmentTitle: string;
  courseCode: string;
  status: "graded" | "late" | "submitted";
  submittedDate: string;
  avatar: string; // filename
  similarityMatch: string; // plagiarism percent
  totalScore?: number;
  score1?: number;
  score2?: number;
  score3?: number;
  feedback?: string;
}

export interface NotificationCampaign {
  id: string;
  title: string;
  audience: string;
  dispatchedAt: string;
  priority: "high" | "normal";
  deliveryRate: number;
  status: "dispatched" | "draft";
}

