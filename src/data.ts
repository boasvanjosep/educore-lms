import { 
  User, 
  Course, 
  CourseModule, 
  Assignment, 
  Submission, 
  Campaign, 
  ActivityLog, 
  ScheduleItem, 
  Announcement,
  ActiveAssignment,
  GradingSubmission,
  NotificationCampaign
} from "./types";

// Current User Context States
export const mockUsers: Record<string, User> = {
  admin: {
    id: "u-admin-1",
    name: "Eleanor Vance",
    email: "e.vance@globalacademy.edu",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    institution: "Global Academy"
  },
  teacher: {
    id: "u-teacher-1",
    name: "Dr. Sarah Jenkins",
    email: "s.jenkins@globalacademy.edu",
    role: "teacher",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    institution: "Global Academy"
  },
  student: {
    id: "u-student-1",
    name: "Alex Mercer",
    email: "alex.mercer@student.edu",
    role: "student",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    institution: "Global Academy",
    gpa: 3.8
  }
};

export const mockInstitutions = [
  "Global Academy",
  "ScholarStack University",
  "EduCore Science Institute",
  "Atlantic Tech College"
];

// Admin metrics
export const adminOverviewMetrics = {
  totalStudents: 4200,
  activeTeachers: 215,
  submissionRate: 92,
  notificationDelivery: 99.8,
  avgCourseRating: 4.7,
  platformEngagement: 85,
  storageUsed: 1.2,
  storageLimit: 5.0
};

// Enrollment Growth over the months
export const enrollmentGrowthData = [
  { month: "Jan", students: 1200 },
  { month: "Feb", students: 1600 },
  { month: "Mar", students: 1520 },
  { month: "Apr", students: 2300 },
  { month: "May", students: 2210 },
  { month: "Jun", students: 2900 },
  { month: "Jul", students: 3120 },
  { month: "Aug", students: 3500 },
  { month: "Sep", students: 3900 },
  { month: "Oct", students: 4200 }
];

export const recentActivityLogs: ActivityLog[] = [
  {
    id: "act-1",
    type: "course",
    title: "New course 'Advanced Physics' approved",
    meta: "By Dr. Sarah Jenkins",
    time: "2 hours ago"
  },
  {
    id: "act-2",
    type: "system",
    title: "Server maintenance scheduled",
    meta: "System Admin",
    time: "4 hours ago"
  },
  {
    id: "act-3",
    type: "enrollment",
    title: "Batch student import completed",
    meta: "Registrar Office",
    time: "Yesterday"
  },
  {
    id: "act-4",
    type: "grade",
    title: "Midterm grades finalized",
    meta: "Faculty Dept",
    time: "Yesterday"
  }
];

// Teacher Metrics & Deadlines
export const teacherOverviewMetrics = {
  avgQuizScore: 84.2,
  quizChange: 2.4,
  participationRate: 91,
  targetRate: 85
};

export const upcomingDeadlinesTeacher = [
  {
    id: "tdl-1",
    title: "Finalize Physics Grades",
    time: "Today, 5:00 PM",
    badge: "Grading",
    color: "rose"
  },
  {
    id: "tdl-2",
    title: "Department Meeting",
    time: "Oct 26, 9:00 AM",
    badge: "Room 402",
    color: "amber"
  },
  {
    id: "tdl-3",
    title: "Submit Course Proposals",
    time: "Oct 28, 11:59 PM",
    badge: "Curriculum",
    color: "blue"
  }
];

// Teacher Courses
export const teacherCourses: Course[] = [
  {
    id: "c-phy-101",
    code: "PHY-101",
    name: "Foundations of Physics",
    instructor: "Dr. Sarah Jenkins",
    instructorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    term: "Fall 2024",
    studentsEnrolled: 142,
    syllabusProgress: 45,
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80",
    description: "An introductory study of standard motion, thermodynamics, waves, and fundamental particle mechanics.",
    modulesCount: 6
  },
  {
    id: "c-mat-202",
    code: "MAT-202",
    name: "Advanced Calculus II",
    instructor: "Dr. Sarah Jenkins",
    instructorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    term: "Fall 2024",
    studentsEnrolled: 88,
    syllabusProgress: 62,
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80",
    description: "Advanced multi-variable limits, integrals, green's theorems, and basic differential geometry series.",
    modulesCount: 8
  }
];

// Student Schedule & Announcements
export const studentSchedule: ScheduleItem[] = [
  {
    id: "sch-1",
    timeRange: "09:00 AM - 10:30 AM",
    title: "Advanced Data Structures",
    location: "Room 402, Science Building",
    type: "Lecture"
  },
  {
    id: "sch-2",
    timeRange: "11:00 AM - 12:30 PM",
    title: "Software Engineering Ethics",
    location: "Online Meeting (Zoom)",
    type: "Seminar"
  },
  {
    id: "sch-3",
    timeRange: "02:00 PM - 04:00 PM",
    title: "Physics Lab: Mechanics",
    location: "Lab 3, Engineering Block",
    type: "Lab"
  }
];

export const studentUpcomingAssignments = [
  {
    id: "sa-1",
    title: "Final Project Proposal",
    course: "Software Engineering CS-401",
    progress: 85,
    dueDate: "Oct 25, 11:59 PM",
    statusText: "Due Tomorrow",
    statusColor: "rose"
  },
  {
    id: "sa-2",
    title: "Algorithm Analysis Problem Set",
    course: "Advanced Data Structures CS-305",
    progress: 30,
    dueDate: "Oct 28, 5:00 PM",
    statusText: "Due in 3 days",
    statusColor: "blue"
  }
];

export const systemAnnouncements: Announcement[] = [
  {
    id: "ann-1",
    sender: "Dr. Smith",
    timeAgo: "2 hrs ago",
    title: "Midterm Exam Location Change",
    content: "Please note that tomorrow's midterm for CS-401 has been moved to Room 512, Administration Block."
  },
  {
    id: "ann-2",
    sender: "Admin Hub",
    timeAgo: "Yesterday",
    title: "Library Holiday Hours",
    content: "The central library will operate on restricted hours during the Thanksgiving weekend. Check Portal for details."
  }
];

// Course management module details
export const activeMathematicsCourse: Course = {
  id: "c-math-401",
  code: "MATH-401",
  name: "Advanced Mathematics",
  instructor: "Dr. Sarah Jenkins",
  instructorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  term: "Fall 2024",
  studentsEnrolled: 142,
  syllabusProgress: 68,
  image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80",
  description: "Exploration of multi-variable calculus, differential equations, and complex analysis. Designed for engineering and physics majors.",
  modulesCount: 4
};

export const courseModules: CourseModule[] = [
  {
    id: "mod-1",
    title: "Module 1: Multi-variable Calculus",
    itemsCount: 3,
    estimatedHours: 4,
    items: [
      { id: "mi-1", title: "Double Integrals over Rectangular Regions", type: "lecture", duration: "45 mins", isCompleted: true },
      { id: "mi-2", title: "Surface Area & Stokes' Theorem", type: "lecture", duration: "1 hour", isCompleted: true },
      { id: "mi-3", title: "Calculus Homework Phase 1 Submission", type: "assignment", duration: "Est. 2 hours", isCompleted: false }
    ]
  },
  {
    id: "mod-2",
    title: "Module 2: Differential Equations",
    itemsCount: 2,
    estimatedHours: 3,
    items: [
      { id: "mi-4", title: "First-Order Linear Homogeneous ODEs", type: "lecture", duration: "1 hour", isCompleted: false },
      { id: "mi-5", title: "Quiz 1: Partial Derivatives & ODEs", type: "quiz", duration: "30 mins", isCompleted: false }
    ]
  }
];

export const enrolledStudents = [
  { id: "s-1", name: "Alice Smith", email: "alice.smith@student.edu", enrollmentDate: "Sep 01, 2024", grade: "A" },
  { id: "s-2", name: "Brian Johnson", email: "brian.j@student.edu", enrollmentDate: "Sep 02, 2024", grade: "B+" },
  { id: "s-3", name: "Chloe Lee", email: "chloe.lee@student.edu", enrollmentDate: "Sep 01, 2024", grade: "A-" },
  { id: "s-4", name: "David Chen", email: "david.c@student.edu", enrollmentDate: "Sep 05, 2024", grade: "B" },
  { id: "s-5", name: "Sarah Jenkins", email: "sarah.j@student.edu", enrollmentDate: "Sep 02, 2024", grade: "A+" }
];

export const courseRecentActivity = [
  { id: "cact-1", user: "Sarah Jenkins", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", text: "submitted Quiz 1", time: "10 minutes ago" },
  { id: "cact-2", user: "David Chen", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", text: "asked a question in Q&A", time: "1 hour ago" }
];

// All school assignments
export const mockAssignments: Assignment[] = [
  {
    id: "asg-1",
    title: "Binary Tree Implementation",
    courseId: "c-phy-101",
    courseName: "Foundations of Physics",
    courseCode: "PHY-101",
    moduleName: "Data Structures",
    dueDate: "Oct 24",
    dueTime: "11:59 PM",
    points: 100,
    submissionsCount: 42,
    totalEnrolled: 45,
    status: "Published",
    submissionType: "Code Submission",
    instructions: "Write a complete implementation of a Binary Search Tree (BST) in TypeScript or Java. Include methods for insert, find, delete, and inorder traversal. You must write test cases demonstrating correctness.",
    rubric: [
      { id: "r-1", criterion: "Correctness & Search Function", points: 40, description: "Tree elements are inserted and searched without errors." },
      { id: "r-2", criterion: "Efficiency of Traversal", points: 30, description: "In-order traversal is implemented efficiently in O(n) space-time." },
      { id: "r-3", criterion: "Clean Code & Testing", points: 30, description: "Proper variable names and comprehensive tests are provided." }
    ]
  },
  {
    id: "asg-2",
    title: "Midterm Review Quiz",
    courseId: "c-mat-202",
    courseName: "Advanced Calculus II",
    courseCode: "MAT-202",
    moduleName: "Algorithms",
    dueDate: "Oct 28",
    dueTime: "5:00 PM",
    points: 50,
    submissionsCount: 0,
    totalEnrolled: 88,
    status: "Draft",
    submissionType: "Multiple Choice",
    instructions: "A series of 25 conceptual multiple choice questions to prepare you for the upcoming Calculus midterm.",
    rubric: []
  },
  {
    id: "asg-3",
    title: "Project Proposal Phase 1",
    courseId: "c-math-401",
    courseName: "Advanced Mathematics",
    courseCode: "MATH-401",
    moduleName: "Machine Learning",
    dueDate: "Oct 22",
    dueTime: "11:59 PM",
    points: 200,
    submissionsCount: 12,
    totalEnrolled: 45,
    status: "Published",
    submissionType: "File Upload",
    instructions: "Identify a medical modeling challenge. Outline your proposed machine learning dataset, standard regression variables, and predicted healthcare impacts.",
    rubric: [
      { id: "r-4", criterion: "Problem Definition & Scope", points: 30, description: "Clear articulation of the design problem, target audience, and project boundaries." },
      { id: "r-5", criterion: "Research Methodology", points: 40, description: "Appropriate selection of research methods and detailed plan for user testing." },
      { id: "r-6", criterion: "Presentation & Formatting", points: 30, description: "Professional formatting, clarity of writing, and inclusion of required visual assets." }
    ]
  }
];

// Single assignment submission viewer content
export const singleAssignmentSubmissionDetail = {
  courseName: "Advanced UI/UX Design",
  courseCode: "DES-401",
  assignmentTitle: "Final Project Proposal",
  dueDate: "Oct 24, 2024 - 11:59 PM",
  instructions: "Submit a comprehensive proposal for your final design project. Your proposal should clearly outline the problem space, target audience, and proposed solution. It must adhere to the formatting guidelines provided in the syllabus.",
  rubric: [
    { id: "rub-1", criterion: "Problem Definition & Scope", points: 30, description: "Clear articulation of the design problem, target audience, and project boundaries." },
    { id: "rub-2", criterion: "Research Methodology", points: 40, description: "Appropriate selection of research methods and detailed plan for user testing." },
    { id: "rub-3", criterion: "Presentation & Formatting", points: 30, description: "Professional formatting, clarity of writing, and inclusion of required visual assets." }
  ],
  status: "Not Submitted",
  dueDelta: "Overdue by 2 days",
  attemptsAllowed: "1 / 3"
};

// Submissions lists for grading page
export const pendingGradingSubmissions: Submission[] = [
  {
    id: "sub-12",
    assignmentId: "asg-3",
    assignmentTitle: "Final Project Proposal (Machine Learning)",
    studentId: "s-sarah",
    studentName: "Sarah Jenkins",
    studentAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    courseName: "Machine Learning",
    courseCode: "CS401",
    submittedAt: "Oct 22, 5:14 PM",
    status: "Pending",
    fileUrl: "#",
    fileName: "Final_Project_Submission.pdf",
    fileSize: "2.4 MB",
    rubricScores: {
      "r-4": 25,
      "r-5": 35,
      "r-6": 28
    },
    grade: 88,
    feedback: "Solid analysis, Sarah. Your application of CNNs was well reasoned. Please review my notes on adding baseline SVM comparisons for a more robust conclusion."
  },
  {
    id: "sub-1",
    assignmentId: "asg-1",
    assignmentTitle: "Kinematics Lab Report",
    studentId: "s-1",
    studentName: "Alice Smith",
    studentAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    courseName: "Foundations of Physics",
    courseCode: "PHY-101",
    submittedAt: "Oct 24, 4:10 PM",
    status: "Pending",
    fileUrl: "#",
    fileName: "Kinematics_Report_Alice.pdf",
    fileSize: "1.8 MB"
  },
  {
    id: "sub-2",
    assignmentId: "asg-2",
    assignmentTitle: "Calculus Midterm Part 1",
    studentId: "s-2",
    studentName: "Brian Johnson",
    studentAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    courseName: "Advanced Calculus II",
    courseCode: "MAT-202",
    submittedAt: "Oct 24, 11:02 PM",
    status: "Pending",
    fileUrl: "#",
    fileName: "Calculus_Answers_VJ.pdf",
    fileSize: "3.1 MB"
  },
  {
    id: "sub-3",
    assignmentId: "asg-1",
    assignmentTitle: "Kinematics Lab Report",
    studentId: "s-3",
    studentName: "Chloe Lee",
    studentAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    courseName: "Foundations of Physics",
    courseCode: "PHY-101",
    submittedAt: "Oct 23, 11:20 AM",
    status: "Pending",
    fileUrl: "#",
    fileName: "Physics_Lab_Submission.pdf",
    fileSize: "2.1 MB"
  }
];

// Campaigns data
export const recentCampaigns: Campaign[] = [
  {
    id: "cmp-1",
    templateName: "Fall Semester Welcome",
    channel: ["email", "push"],
    scheduledTime: "Sep 01, 2024 • 08:00 AM",
    readRate: 82,
    status: "Completed"
  },
  {
    id: "cmp-2",
    templateName: "System Maintenance Alert",
    channel: ["push"],
    scheduledTime: "Oct 15, 2024 • 11:00 PM",
    status: "Scheduled"
  },
  {
    id: "cmp-3",
    templateName: "Midterm Grade Publishing",
    channel: ["email"],
    scheduledTime: "Nov 02, 2024 • 09:00 AM",
    status: "Draft"
  }
];

export const initialActiveAssignments: ActiveAssignment[] = [
  {
    id: "asg-mock-1",
    title: "Physics Quiz 1 - Dynamics & Vectors",
    courseCode: "PHY-101",
    submittedCount: 118,
    totalCount: 142,
    dueDate: "2026-10-30",
    status: "active"
  },
  {
    id: "asg-mock-2",
    title: "Motion Mechanics Lab Project outline",
    courseCode: "PHY-101",
    submittedCount: 142,
    totalCount: 142,
    dueDate: "2026-10-24",
    status: "completed"
  },
  {
    id: "asg-mock-3",
    title: "Advanced ODE Integration Homework Set",
    courseCode: "MATH-401",
    submittedCount: 88,
    totalCount: 142,
    dueDate: "2026-11-04",
    status: "active"
  }
];

export const initialGradingSubmissions: GradingSubmission[] = [
  {
    id: "gs-1",
    studentName: "Alex Mercer",
    studentAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    assignmentTitle: "Kinematics Lab Report calculations",
    courseCode: "PHY-101",
    status: "late",
    submittedDate: "Oct 24, 05:40 PM",
    avatar: "alex_mercer_trajectory_report.pdf",
    similarityMatch: "12%"
  },
  {
    id: "gs-2",
    studentName: "Sarah Jenkins",
    studentAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    assignmentTitle: "Physics Force Outlines project",
    courseCode: "PHY-101",
    status: "submitted",
    submittedDate: "Oct 20, 11:15 AM",
    avatar: "particle_force_dynamics_submission.pdf",
    similarityMatch: "2%"
  },
  {
    id: "gs-3",
    studentName: "Beatrice Vance",
    studentAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    assignmentTitle: "Calculus Homework Phase 1",
    courseCode: "MATH-401",
    status: "submitted",
    submittedDate: "Oct 21, 09:30 AM",
    avatar: "beatrice_double_integrals_final_v1.pdf",
    similarityMatch: "8%"
  }
];

export const initialCampaigns: NotificationCampaign[] = [
  {
    id: "cmp-mock-1",
    title: "Academic Term Grade Freeze Deadline",
    audience: "All Students on Campus",
    dispatchedAt: "Oct 19, 2026",
    priority: "high",
    deliveryRate: 99.8,
    status: "dispatched"
  },
  {
    id: "cmp-mock-2",
    title: "Security Updates & Institutional Server Sync",
    audience: "All Personnel Admins",
    dispatchedAt: "Oct 14, 2026",
    priority: "normal",
    deliveryRate: 100.0,
    status: "dispatched"
  },
  {
    id: "cmp-mock-3",
    title: "Collegiate Sports Day Schedule Adjustments",
    audience: "All Faculty Teachers & Students",
    dispatchedAt: "Oct 10, 2026",
    priority: "normal",
    deliveryRate: 99.4,
    status: "dispatched"
  }
];

