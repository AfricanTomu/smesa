// User Types
export type UserRole = 'admin' | 'teacher' | 'parent' | 'student';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  schoolId?: string;
  regionId?: string;
  createdAt: Date;
  lastLogin?: Date;
  isActive: boolean;
  phone?: string;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  language: string;
  notifications: boolean;
  emailAlerts: boolean;
  theme: 'light' | 'dark' | 'system';
}

// School Types
export interface School {
  id: string;
  name: string;
  address: string;
  regionId: string;
  regionName: string;
  adminId: string;
  modules: ModuleType[];
  teacherCount: number;
  studentCount: number;
  createdAt: Date;
  logo?: string;
  contactEmail: string;
  contactPhone: string;
  motto?: string;
  establishedYear?: number;
}

export type ModuleType = 
  | 'attendance' 
  | 'assessments' 
  | 'parent_portal' 
  | 'teacher_collaboration' 
  | 'ict_training' 
  | 'analytics' 
  | 'wellbeing' 
  | 'skills_tracking'
  | 'lesson_planning';

export interface Module {
  id: ModuleType;
  name: string;
  description: string;
  pricePerTeacher: number;
  icon: string;
  isActive: boolean;
}

// Student Types
export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  studentId: string;
  classId: string;
  className: string;
  dateOfBirth: Date;
  gender: 'male' | 'female' | 'other';
  parentIds: string[];
  enrollmentDate: Date;
  attendance: AttendanceRecord[];
  assessments: Assessment[];
  wellbeingReports: WellbeingReport[];
  performanceHistory: PerformanceRecord[];
  photo?: string;
  isActive: boolean;
  address?: string;
  emergencyContact?: string;
  medicalNotes?: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: Date;
  status: 'present' | 'absent' | 'late' | 'excused';
  markedBy: string;
  notes?: string;
}

export interface PerformanceRecord {
  id: string;
  studentId: string;
  term: string;
  year: number;
  averageScore: number;
  rank?: number;
  teacherComments?: string;
}

// Assessment Types
export interface Assessment {
  id: string;
  title: string;
  description?: string;
  subject: string;
  className: string;
  type: 'formative' | 'summative' | 'diagnostic' | 'quiz' | 'exam';
  maxScore: number;
  term: string;
  year: number;
  teacherId: string;
  createdAt: Date;
  dueDate?: Date;
  questions: Question[];
  studentResults: StudentResult[];
  status: 'draft' | 'published' | 'completed';
}

export interface Question {
  id: string;
  type: 'multiple_choice' | 'true_false' | 'short_answer' | 'essay' | 'matching';
  question: string;
  options?: string[];
  correctAnswer?: string | string[];
  points: number;
  explanation?: string;
}

export interface StudentResult {
  studentId: string;
  score: number;
  answers: Record<string, string | string[]>;
  submittedAt?: Date;
  feedback?: string;
}

// Teacher Types
export interface Teacher {
  id: string;
  userId: string;
  employeeId: string;
  subjects: string[];
  classes: string[];
  qualifications: string[];
  joinDate: Date;
  skills: Skill[];
  ictTrainingProgress: TrainingProgress[];
  isActive: boolean;
  bio?: string;
  specialization?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: 1 | 2 | 3 | 4 | 5;
  acquiredDate?: Date;
  verifiedBy?: string;
}

// Training Types
export interface TrainingVideo {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: number;
  thumbnailUrl: string;
  videoUrl: string;
  resources: Resource[];
  createdBy: string;
  createdAt: Date;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface TrainingProgress {
  videoId: string;
  completed: boolean;
  progress: number;
  lastWatched: Date;
  notes?: string;
}

export interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'doc' | 'link' | 'video' | 'image';
  url: string;
}

// Forum Types
export interface ForumTopic {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  authorRole?: string;
  category: string;
  tags: string[];
  replies: ForumReply[];
  views: number;
  likes: number;
  isPinned: boolean;
  createdAt: Date;
  lastReplyAt?: Date;
}

export interface ForumReply {
  id: string;
  topicId: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  authorRole?: string;
  likes: number;
  createdAt: Date;
}

// Parent Types
export interface Parent {
  id: string;
  userId: string;
  childrenIds: string[];
  occupation?: string;
  emergencyContact?: string;
  preferredLanguage: string;
  address?: string;
}

export interface ParentRequest {
  id: string;
  parentId: string;
  studentId: string;
  type: 'meeting' | 'report' | 'inquiry' | 'absence';
  status: 'pending' | 'approved' | 'completed' | 'cancelled';
  message: string;
  requestedDate?: Date;
  createdAt: Date;
  teacherResponse?: string;
  teacherId?: string;
}

// Wellbeing Types
export interface WellbeingReport {
  id: string;
  studentId: string;
  date: Date;
  category: 'academic' | 'social' | 'emotional' | 'physical' | 'behavioral';
  rating: 1 | 2 | 3 | 4 | 5;
  observations: string;
  recommendations?: string;
  reportedBy: string;
  isSharedWithParent: boolean;
}

// Event Types
export interface Event {
  id: string;
  title: string;
  description: string;
  type: 'training' | 'meeting' | 'celebration' | 'workshop' | 'announcement' | 'holiday';
  startDate: Date;
  endDate?: Date;
  location?: string;
  isVirtual: boolean;
  meetingLink?: string;
  organizerId: string;
  organizerName?: string;
  attendees: string[];
  coverImage?: string;
  createdAt: Date;
}

// Blog Types
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  authorRole?: string;
  coverImage?: string;
  category: string;
  tags: string[];
  publishedAt: Date;
  readTime: number;
  views: number;
  likes: number;
  isFeatured?: boolean;
}

// Lesson Plan Types
export interface LessonPlan {
  id: string;
  title: string;
  subject: string;
  className: string;
  term: string;
  year: number;
  duration: number; // in minutes
  objectives: LearningObjective[];
  materials: string[];
  introduction: string;
  mainActivities: LessonActivity[];
  conclusion: string;
  assessment: string;
  differentiation?: string;
  homework?: string;
  references: Reference[];
  resources: Resource[];
  createdBy: string;
  createdByName?: string;
  createdAt: Date;
  updatedAt?: Date;
  isShared: boolean;
  isTemplate: boolean;
  status: 'draft' | 'published' | 'archived';
  tags: string[];
}

export interface LearningObjective {
  id: string;
  objective: string;
  successCriteria?: string;
}

export interface LessonActivity {
  id: string;
  title: string;
  description: string;
  duration: number;
  type: 'whole_class' | 'group_work' | 'individual' | 'discussion' | 'demonstration';
  resources?: string[];
}

export interface Reference {
  id: string;
  title: string;
  author: string;
  year: number;
  url?: string;
  type: 'book' | 'article' | 'website' | 'journal';
}

// Monitoring Types
export interface MonitoringData {
  regionId: string;
  regionName: string;
  schools: SchoolSummary[];
  metrics: RegionalMetrics;
}

export interface SchoolSummary {
  schoolId: string;
  schoolName: string;
  teacherCount: number;
  studentCount: number;
  attendanceRate: number;
  averageScore: number;
}

export interface RegionalMetrics {
  totalSchools: number;
  totalTeachers: number;
  totalStudents: number;
  averageAttendance: number;
  averagePerformance: number;
  term: string;
  year: number;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  link?: string;
  createdAt: Date;
}

// Dashboard Types
export interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  attendanceToday: number;
  pendingAssessments: number;
  recentActivities: Activity[];
  upcomingEvents: Event[];
  performanceTrend?: number;
  alerts?: Alert[];
}

export interface Activity {
  id: string;
  type: string;
  description: string;
  userId: string;
  userName: string;
  timestamp: Date;
  icon?: string;
}

export interface Alert {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  message: string;
  action?: string;
  link?: string;
}

// Settings Types
export interface UserSettings {
  profile: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    avatar?: string;
    bio?: string;
  };
  preferences: {
    language: string;
    timezone: string;
    dateFormat: string;
    theme: 'light' | 'dark' | 'system';
  };
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
    attendanceAlerts: boolean;
    assessmentReminders: boolean;
    eventNotifications: boolean;
    communityMentions: boolean;
  };
  privacy: {
    profileVisible: boolean;
    showEmail: boolean;
    showPhone: boolean;
  };
}

// Offline Sync Types
export interface SyncStatus {
  isOnline: boolean;
  lastSynced?: Date;
  pendingChanges: number;
  isSyncing: boolean;
}

// Pricing Types
export interface PricingPackage {
  id: string;
  name: string;
  description: string;
  modules: ModuleType[];
  basePrice: number;
  pricePerTeacher: number;
  isPopular?: boolean;
}

// Auth Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  schoolName?: string;
  phone?: string;
}
