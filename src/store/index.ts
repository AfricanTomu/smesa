import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { 
  User, 
  Student, 
  TrainingVideo, 
  ForumTopic, 
  Event, 
  BlogPost,
  ModuleType,
  Notification,
  DashboardStats,
  ParentRequest,
  LessonPlan,
  Assessment,
  SyncStatus,
  UserSettings
} from '@/types';

// Auth Store
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, _password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
  updateProfile: (data: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      login: async (email: string) => {
        set({ isLoading: true });
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockUser: User = {
          id: '1',
          email,
          firstName: email.includes('admin') ? 'Admin' : email.includes('parent') ? 'Parent' : 'Teacher',
          lastName: 'User',
          role: email.includes('admin') ? 'admin' : email.includes('parent') ? 'parent' : 'teacher',
          schoolId: 'school-1',
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
          createdAt: new Date(),
          isActive: true,
          phone: '+256 700 123 456',
          preferences: {
            language: 'en',
            notifications: true,
            emailAlerts: true,
            theme: 'light'
          }
        };
        
        set({ user: mockUser, isAuthenticated: true, isLoading: false });
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      updateProfile: (data) => set((state) => ({
        user: state.user ? { ...state.user, ...data } : null
      })),
    }),
    {
      name: 'smesa-auth',
    }
  )
);

// UI Store
interface UIState {
  sidebarOpen: boolean;
  notifications: Notification[];
  syncStatus: SyncStatus;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
  setSyncStatus: (status: Partial<SyncStatus>) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      notifications: [],
      syncStatus: {
        isOnline: true,
        lastSynced: new Date(),
        pendingChanges: 0,
        isSyncing: false
      },
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      addNotification: (notification) => set((state) => ({
        notifications: [{
          ...notification,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date(),
        }, ...state.notifications],
      })),
      markNotificationRead: (id) => set((state) => ({
        notifications: state.notifications.map(n => 
          n.id === id ? { ...n, isRead: true } : n
        ),
      })),
      clearNotifications: () => set({ notifications: [] }),
      setSyncStatus: (status) => set((state) => ({
        syncStatus: { ...state.syncStatus, ...status }
      })),
    }),
    {
      name: 'smesa-ui',
    }
  )
);

// Dashboard Store
interface DashboardState {
  stats: DashboardStats | null;
  isLoading: boolean;
  fetchStats: () => Promise<void>;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  stats: null,
  isLoading: false,
  fetchStats: async () => {
    set({ isLoading: true });
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockStats: DashboardStats = {
      totalStudents: 1245,
      totalTeachers: 48,
      attendanceToday: 94.2,
      pendingAssessments: 23,
      performanceTrend: 78.5,
      recentActivities: [
        { id: '1', type: 'attendance', description: 'Attendance marked for Class 5A', userId: '1', userName: 'John Doe', timestamp: new Date(Date.now() - 1000 * 60 * 30) },
        { id: '2', type: 'assessment', description: 'Math assessment submitted', userId: '2', userName: 'Jane Smith', timestamp: new Date(Date.now() - 1000 * 60 * 60) },
        { id: '3', type: 'lesson', description: 'New lesson plan created', userId: '3', userName: 'Sarah Namuli', timestamp: new Date(Date.now() - 1000 * 60 * 120) },
        { id: '4', type: 'student', description: 'New student enrolled', userId: '1', userName: 'Admin User', timestamp: new Date(Date.now() - 1000 * 60 * 180) },
      ],
      upcomingEvents: [
        { id: '1', title: 'Staff Meeting', description: 'Weekly staff meeting', type: 'meeting', startDate: new Date(Date.now() + 1000 * 60 * 60 * 24), isVirtual: true, organizerId: '1', attendees: [], createdAt: new Date() },
        { id: '2', title: 'Parent-Teacher Conference', description: 'Term 1 conferences', type: 'meeting', startDate: new Date(Date.now() + 1000 * 60 * 60 * 48), isVirtual: false, organizerId: '1', attendees: [], createdAt: new Date() },
      ],
      alerts: [
        { id: '1', type: 'warning', message: '3 students have low attendance', action: 'View', link: '/students' },
        { id: '2', type: 'info', message: 'New ICT training video available', action: 'Watch', link: '/training' },
      ]
    };
    
    set({ stats: mockStats, isLoading: false });
  },
}));

// Student Store
interface StudentState {
  students: Student[];
  selectedStudent: Student | null;
  isLoading: boolean;
  fetchStudents: () => Promise<void>;
  selectStudent: (id: string) => void;
  addStudent: (student: Omit<Student, 'id'>) => Promise<void>;
  updateStudent: (id: string, data: Partial<Student>) => Promise<void>;
  deleteStudent: (id: string) => Promise<void>;
}

export const useStudentStore = create<StudentState>((set, get) => ({
  students: [],
  selectedStudent: null,
  isLoading: false,
  fetchStudents: async () => {
    set({ isLoading: true });
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockStudents: Student[] = Array.from({ length: 25 }, (_, i) => ({
      id: `student-${i + 1}`,
      firstName: ['John', 'Mary', 'David', 'Sarah', 'James', 'Emma', 'Michael', 'Grace', 'Daniel', 'Patricia'][i % 10],
      lastName: ['Okello', 'Auma', 'Ochieng', 'Nakato', 'Mukasa', 'Kirabo', 'Ssempala', 'Namuli', 'Kizito', 'Nabwire'][i % 10],
      studentId: `STU2025${String(i + 1).padStart(3, '0')}`,
      classId: `class-${(i % 7) + 1}`,
      className: `Primary ${(i % 7) + 1}`,
      dateOfBirth: new Date(2010 + Math.floor(Math.random() * 8), Math.floor(Math.random() * 12), 15),
      gender: i % 2 === 0 ? 'male' : 'female',
      parentIds: [`parent-${(i % 10) + 1}`],
      enrollmentDate: new Date(2023, 0, 15),
      attendance: [],
      assessments: [],
      wellbeingReports: [],
      performanceHistory: [
        { id: `ph-${i}-1`, studentId: `student-${i + 1}`, term: 'Term 1', year: 2024, averageScore: 65 + Math.floor(Math.random() * 25) },
        { id: `ph-${i}-2`, studentId: `student-${i + 1}`, term: 'Term 2', year: 2024, averageScore: 68 + Math.floor(Math.random() * 25) },
        { id: `ph-${i}-3`, studentId: `student-${i + 1}`, term: 'Term 3', year: 2024, averageScore: 72 + Math.floor(Math.random() * 25) },
      ],
      isActive: true,
      address: 'Kampala, Uganda',
      emergencyContact: '+256 700 999 999',
    }));
    
    set({ students: mockStudents, isLoading: false });
  },
  selectStudent: (id) => {
    const student = get().students.find(s => s.id === id);
    set({ selectedStudent: student || null });
  },
  addStudent: async (studentData) => {
    const newStudent: Student = {
      ...studentData,
      id: `student-${Date.now()}`,
    };
    set((state) => ({ students: [...state.students, newStudent] }));
  },
  updateStudent: async (id, data) => {
    set((state) => ({
      students: state.students.map(s => s.id === id ? { ...s, ...data } : s),
    }));
  },
  deleteStudent: async (id) => {
    set((state) => ({
      students: state.students.filter(s => s.id !== id),
    }));
  },
}));

// Lesson Plan Store
interface LessonPlanState {
  lessonPlans: LessonPlan[];
  selectedPlan: LessonPlan | null;
  isLoading: boolean;
  fetchLessonPlans: () => Promise<void>;
  createLessonPlan: (plan: Omit<LessonPlan, 'id' | 'createdAt'>) => Promise<void>;
  updateLessonPlan: (id: string, data: Partial<LessonPlan>) => Promise<void>;
  selectPlan: (id: string) => void;
}

export const useLessonPlanStore = create<LessonPlanState>((set, get) => ({
  lessonPlans: [],
  selectedPlan: null,
  isLoading: false,
  fetchLessonPlans: async () => {
    set({ isLoading: true });
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockPlans: LessonPlan[] = [
      {
        id: 'lp-1',
        title: 'Introduction to Fractions',
        subject: 'Mathematics',
        className: 'Primary 4',
        term: 'Term 1',
        year: 2025,
        duration: 60,
        objectives: [
          { id: 'obj-1', objective: 'Understand what fractions represent', successCriteria: 'Students can identify numerator and denominator' },
          { id: 'obj-2', objective: 'Compare simple fractions', successCriteria: 'Students can determine which fraction is larger' },
        ],
        materials: ['Fraction cards', 'Whiteboard', 'Markers', 'Worksheets'],
        introduction: 'Begin by asking students about sharing food equally. Introduce the concept of parts and wholes.',
        mainActivities: [
          { id: 'act-1', title: 'Fraction Demonstration', description: 'Use fraction cards to show different fractions', duration: 15, type: 'whole_class' },
          { id: 'act-2', title: 'Group Practice', description: 'Students work in groups to compare fractions', duration: 20, type: 'group_work' },
          { id: 'act-3', title: 'Individual Work', description: 'Complete worksheet exercises', duration: 15, type: 'individual' },
        ],
        conclusion: 'Review key concepts and ask students to share one thing they learned.',
        assessment: 'Worksheet completion and oral questioning',
        differentiation: 'Provide visual aids for struggling students; extension problems for advanced learners',
        homework: 'Practice problems from textbook page 45',
        references: [
          { id: 'ref-1', title: 'Primary Mathematics 4', author: 'Uganda Ministry of Education', year: 2020, type: 'book' },
        ],
        resources: [],
        createdBy: 'teacher-1',
        createdByName: 'Sarah Namuli',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
        isShared: true,
        isTemplate: false,
        status: 'published',
        tags: ['fractions', 'mathematics', 'primary'],
      },
      {
        id: 'lp-2',
        title: 'The Water Cycle',
        subject: 'Science',
        className: 'Primary 5',
        term: 'Term 1',
        year: 2025,
        duration: 45,
        objectives: [
          { id: 'obj-1', objective: 'Describe the stages of the water cycle', successCriteria: 'Students can name evaporation, condensation, and precipitation' },
        ],
        materials: ['Diagram poster', 'Water cycle model', 'Video clip'],
        introduction: 'Ask students where rain comes from and where it goes.',
        mainActivities: [
          { id: 'act-1', title: 'Video Observation', description: 'Watch water cycle video', duration: 10, type: 'whole_class' },
          { id: 'act-2', title: 'Diagram Labeling', description: 'Label water cycle diagram', duration: 20, type: 'individual' },
          { id: 'act-3', title: 'Class Discussion', description: 'Discuss real-world examples', duration: 10, type: 'discussion' },
        ],
        conclusion: 'Summarize the water cycle stages and their importance.',
        assessment: 'Diagram labeling accuracy',
        homework: 'Draw and label the water cycle at home',
        references: [
          { id: 'ref-1', title: 'Primary Science 5', author: 'National Curriculum Development Centre', year: 2021, type: 'book' },
        ],
        resources: [],
        createdBy: 'teacher-2',
        createdByName: 'John Okello',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
        isShared: true,
        isTemplate: false,
        status: 'published',
        tags: ['science', 'water-cycle', 'environment'],
      },
    ];
    
    set({ lessonPlans: mockPlans, isLoading: false });
  },
  createLessonPlan: async (planData) => {
    const newPlan: LessonPlan = {
      ...planData,
      id: `lp-${Date.now()}`,
      createdAt: new Date(),
    };
    set((state) => ({ lessonPlans: [newPlan, ...state.lessonPlans] }));
  },
  updateLessonPlan: async (id, data) => {
    set((state) => ({
      lessonPlans: state.lessonPlans.map(p => p.id === id ? { ...p, ...data, updatedAt: new Date() } : p),
    }));
  },
  selectPlan: (id) => {
    const plan = get().lessonPlans.find(p => p.id === id);
    set({ selectedPlan: plan || null });
  },
}));

// Assessment Store
interface AssessmentState {
  assessments: Assessment[];
  selectedAssessment: Assessment | null;
  isLoading: boolean;
  fetchAssessments: () => Promise<void>;
  createAssessment: (assessment: Omit<Assessment, 'id' | 'createdAt'>) => Promise<void>;
  updateAssessment: (id: string, data: Partial<Assessment>) => Promise<void>;
  selectAssessment: (id: string) => void;
}

export const useAssessmentStore = create<AssessmentState>((set, get) => ({
  assessments: [],
  selectedAssessment: null,
  isLoading: false,
  fetchAssessments: async () => {
    set({ isLoading: true });
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockAssessments: Assessment[] = [
      {
        id: 'assess-1',
        title: 'Mathematics Mid-Term Exam',
        description: 'Comprehensive assessment covering Term 1 topics',
        subject: 'Mathematics',
        className: 'Primary 5',
        type: 'exam',
        maxScore: 100,
        term: 'Term 1',
        year: 2025,
        teacherId: 'teacher-1',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
        dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
        questions: [
          { id: 'q-1', type: 'multiple_choice', question: 'What is 3/4 of 20?', options: ['10', '15', '12', '5'], correctAnswer: '15', points: 5 },
          { id: 'q-2', type: 'short_answer', question: 'Solve: 45 + 67', points: 5 },
          { id: 'q-3', type: 'essay', question: 'Explain how to find the area of a rectangle', points: 10 },
        ],
        studentResults: [],
        status: 'published',
      },
      {
        id: 'assess-2',
        title: 'Science Quiz - Plants',
        description: 'Quick assessment on plant parts and functions',
        subject: 'Science',
        className: 'Primary 4',
        type: 'quiz',
        maxScore: 20,
        term: 'Term 1',
        year: 2025,
        teacherId: 'teacher-2',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
        questions: [
          { id: 'q-1', type: 'multiple_choice', question: 'Which part of the plant absorbs water?', options: ['Leaves', 'Roots', 'Stem', 'Flowers'], correctAnswer: 'Roots', points: 2 },
          { id: 'q-2', type: 'true_false', question: 'Plants need sunlight to make food', correctAnswer: 'true', points: 2 },
        ],
        studentResults: [],
        status: 'draft',
      },
    ];
    
    set({ assessments: mockAssessments, isLoading: false });
  },
  createAssessment: async (assessmentData) => {
    const newAssessment: Assessment = {
      ...assessmentData,
      id: `assess-${Date.now()}`,
      createdAt: new Date(),
    };
    set((state) => ({ assessments: [newAssessment, ...state.assessments] }));
  },
  updateAssessment: async (id, data) => {
    set((state) => ({
      assessments: state.assessments.map(a => a.id === id ? { ...a, ...data } : a),
    }));
  },
  selectAssessment: (id) => {
    const assessment = get().assessments.find(a => a.id === id);
    set({ selectedAssessment: assessment || null });
  },
}));

// Training Store
interface TrainingState {
  videos: TrainingVideo[];
  progress: Record<string, number>;
  isLoading: boolean;
  fetchVideos: () => Promise<void>;
  updateProgress: (videoId: string, progress: number) => void;
}

export const useTrainingStore = create<TrainingState>((set) => ({
  videos: [],
  progress: {},
  isLoading: false,
  fetchVideos: async () => {
    set({ isLoading: true });
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockVideos: TrainingVideo[] = [
      {
        id: '1',
        title: 'Introduction to Digital Tools',
        description: 'Learn the basics of using digital tools in the classroom',
        category: 'ICT Basics',
        duration: 1200,
        thumbnailUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400',
        videoUrl: '#',
        resources: [{ id: '1', title: 'Getting Started Guide', type: 'pdf', url: '#' }],
        createdBy: 'Admin',
        createdAt: new Date(),
        difficulty: 'beginner',
      },
      {
        id: '2',
        title: 'Creating Interactive Lessons',
        description: 'Master the art of creating engaging interactive lessons',
        category: 'Lesson Design',
        duration: 1800,
        thumbnailUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400',
        videoUrl: '#',
        resources: [],
        createdBy: 'Admin',
        createdAt: new Date(),
        difficulty: 'intermediate',
      },
      {
        id: '3',
        title: 'Student Assessment Tools',
        description: 'Learn to use digital assessment tools effectively',
        category: 'Assessment',
        duration: 1500,
        thumbnailUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400',
        videoUrl: '#',
        resources: [],
        createdBy: 'Admin',
        createdAt: new Date(),
        difficulty: 'intermediate',
      },
      {
        id: '4',
        title: 'Classroom Management Strategies',
        description: 'Effective techniques for managing large classrooms',
        category: 'Classroom Management',
        duration: 2100,
        thumbnailUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400',
        videoUrl: '#',
        resources: [{ id: '2', title: 'Management Checklist', type: 'pdf', url: '#' }],
        createdBy: 'Admin',
        createdAt: new Date(),
        difficulty: 'beginner',
      },
    ];
    
    set({ videos: mockVideos, isLoading: false });
  },
  updateProgress: (videoId, progress) => {
    set((state) => ({
      progress: { ...state.progress, [videoId]: progress },
    }));
  },
}));

// Forum Store
interface ForumState {
  topics: ForumTopic[];
  selectedTopic: ForumTopic | null;
  isLoading: boolean;
  fetchTopics: () => Promise<void>;
  createTopic: (topic: Omit<ForumTopic, 'id' | 'createdAt' | 'replies' | 'views' | 'likes'>) => Promise<void>;
  addReply: (topicId: string, content: string) => Promise<void>;
}

export const useForumStore = create<ForumState>((set) => ({
  topics: [],
  selectedTopic: null,
  isLoading: false,
  fetchTopics: async () => {
    set({ isLoading: true });
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockTopics: ForumTopic[] = [
      {
        id: '1',
        title: 'Best practices for teaching mathematics in primary',
        content: 'I would love to hear how other teachers approach math lessons, especially for students who struggle with abstract concepts. What manipulatives do you use? How do you differentiate instruction?',
        authorId: '1',
        authorName: 'Sarah Namuli',
        authorRole: 'Teacher',
        category: 'Teaching Strategies',
        tags: ['mathematics', 'primary', 'strategies', 'differentiation'],
        replies: [
          { id: '1', topicId: '1', content: 'I use manipulatives and real-world examples. Fraction bars and counters work great!', authorId: '2', authorName: 'John Okello', authorRole: 'Teacher', likes: 5, createdAt: new Date() },
          { id: '2', topicId: '1', content: 'Group work helps students learn from each other. I pair stronger students with those who need support.', authorId: '3', authorName: 'Mary Auma', authorRole: 'Teacher', likes: 8, createdAt: new Date() },
        ],
        views: 145,
        likes: 12,
        isPinned: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
        lastReplyAt: new Date(),
      },
      {
        id: '2',
        title: 'Managing large class sizes (60+ students)',
        content: 'What strategies work for classes with 60+ students? I am struggling to give individual attention and maintain discipline.',
        authorId: '2',
        authorName: 'David Ochieng',
        authorRole: 'Teacher',
        category: 'Classroom Management',
        tags: ['classroom', 'management', 'large-classes', 'discipline'],
        replies: [
          { id: '3', topicId: '2', content: 'Class monitors are essential. Train responsible students to help with distribution and collection.', authorId: '4', authorName: 'Grace Namuli', authorRole: 'Senior Teacher', likes: 12, createdAt: new Date() },
        ],
        views: 232,
        likes: 18,
        isPinned: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
        lastReplyAt: new Date(),
      },
      {
        id: '3',
        title: 'Using SMESA for parent communication',
        content: 'Has anyone had success using the parent portal? I want to improve communication with parents about their children\'s progress.',
        authorId: '3',
        authorName: 'Emma Kirabo',
        authorRole: 'Teacher',
        category: 'ICT Integration',
        tags: ['parent-portal', 'communication', 'technology'],
        replies: [],
        views: 89,
        likes: 6,
        isPinned: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
      },
    ];
    
    set({ topics: mockTopics, isLoading: false });
  },
  createTopic: async (topicData) => {
    const newTopic: ForumTopic = {
      ...topicData,
      id: `topic-${Date.now()}`,
      replies: [],
      views: 0,
      likes: 0,
      createdAt: new Date(),
    };
    set((state) => ({ topics: [newTopic, ...state.topics] }));
  },
  addReply: async (topicId, content) => {
    const newReply = {
      id: `reply-${Date.now()}`,
      topicId,
      content,
      authorId: 'current-user',
      authorName: 'Current User',
      authorRole: 'Teacher',
      likes: 0,
      createdAt: new Date(),
    };
    set((state) => ({
      topics: state.topics.map(t => 
        t.id === topicId 
          ? { ...t, replies: [...t.replies, newReply], lastReplyAt: new Date() }
          : t
      ),
    }));
  },
}));

// Event Store
interface EventState {
  events: Event[];
  isLoading: boolean;
  fetchEvents: () => Promise<void>;
  createEvent: (event: Omit<Event, 'id' | 'createdAt'>) => Promise<void>;
}

export const useEventStore = create<EventState>((set) => ({
  events: [],
  isLoading: false,
  fetchEvents: async () => {
    set({ isLoading: true });
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockEvents: Event[] = [
      {
        id: '1',
        title: 'ICT Training Week',
        description: 'Comprehensive training on digital tools for all teachers. Learn to use SMESA effectively and discover new teaching technologies.',
        type: 'training',
        startDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 11),
        location: 'School Main Hall',
        isVirtual: false,
        organizerId: '1',
        organizerName: 'Admin Office',
        attendees: [],
        createdAt: new Date(),
      },
      {
        id: '2',
        title: 'Kampala School Leaders Meetup',
        description: 'Monthly meetup for school administrators to share best practices and discuss challenges.',
        type: 'meeting',
        startDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
        location: 'Kampala Conference Center',
        isVirtual: false,
        organizerId: '1',
        organizerName: 'Regional Education Office',
        attendees: [],
        createdAt: new Date(),
      },
      {
        id: '3',
        title: 'Parent-Teacher Conference',
        description: 'Term 1 parent-teacher meetings to discuss student progress and set goals.',
        type: 'meeting',
        startDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
        endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 6),
        location: 'School Classrooms',
        isVirtual: false,
        organizerId: '1',
        organizerName: 'School Administration',
        attendees: [],
        createdAt: new Date(),
      },
      {
        id: '4',
        title: 'Sports Day',
        description: 'Annual inter-house sports competition. All students and parents welcome!',
        type: 'celebration',
        startDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 21),
        location: 'School Sports Ground',
        isVirtual: false,
        organizerId: '1',
        organizerName: 'Sports Department',
        attendees: [],
        createdAt: new Date(),
      },
    ];
    
    set({ events: mockEvents, isLoading: false });
  },
  createEvent: async (eventData) => {
    const newEvent: Event = {
      ...eventData,
      id: `event-${Date.now()}`,
      createdAt: new Date(),
    };
    set((state) => ({ events: [...state.events, newEvent] }));
  },
}));

// Blog Store
interface BlogState {
  posts: BlogPost[];
  selectedPost: BlogPost | null;
  isLoading: boolean;
  fetchPosts: () => Promise<void>;
  selectPost: (id: string) => void;
}

export const useBlogStore = create<BlogState>((set, get) => ({
  posts: [],
  selectedPost: null,
  isLoading: false,
  fetchPosts: async () => {
    set({ isLoading: true });
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockPosts: BlogPost[] = [
      {
        id: '1',
        title: 'How St. Francis Primary School Improved Attendance by 30% in One Term',
        excerpt: 'Discover the strategies that transformed attendance rates at St. Francis Primary School, from daily tracking to parent engagement.',
        content: `
          <p>St. Francis Primary School faced a significant challenge with student attendance, with rates hovering around 65% at the beginning of the term. Through a combination of technology, community engagement, and policy changes, they achieved a remarkable 30% improvement.</p>
          
          <h3>Key Strategies Implemented</h3>
          
          <p><strong>1. Daily Digital Tracking</strong></p>
          <p>Teachers began using SMESA to mark attendance in real-time, allowing administrators to identify patterns quickly. Parents received automatic notifications when their children were absent.</p>
          
          <p><strong>2. Parent Engagement Program</strong></p>
          <p>The school organized monthly parent meetings to discuss the importance of regular attendance. They shared data showing the correlation between attendance and academic performance.</p>
          
          <p><strong>3. Incentive System</strong></p>
          <p>Classes with the best attendance rates received recognition at assembly. Individual students with perfect attendance were celebrated monthly.</p>
          
          <p><strong>4. Addressing Barriers</strong></p>
          <p>The school identified students with chronic absenteeism and worked with families to understand and address underlying issues, such as transportation or health challenges.</p>
          
          <h3>Results</h3>
          <p>By the end of the term, attendance had improved from 65% to 95%. Academic performance also improved, with average test scores increasing by 15%.</p>
          
          <p><em>"SMESA made it easy to track attendance and communicate with parents. The automatic notifications saved us hours of manual work."</em> - Head Teacher, St. Francis Primary</p>
        `,
        authorId: '1',
        authorName: 'Admin Team',
        authorRole: 'Administrator',
        coverImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
        category: 'Success Stories',
        tags: ['attendance', 'success', 'primary', 'parent-engagement'],
        publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
        readTime: 5,
        views: 534,
        likes: 42,
        isFeatured: true,
      },
      {
        id: '2',
        title: 'Research-Based Lesson Planning: A Complete Guide',
        excerpt: 'Learn how to incorporate research-backed strategies into your lesson planning for better student outcomes.',
        content: `
          <p>Effective lesson planning is the foundation of quality education. This guide explores evidence-based strategies that can transform your classroom practice.</p>
          
          <h3>Understanding Learning Objectives</h3>
          
          <p>Every lesson should begin with clear, measurable learning objectives. Use Bloom's Taxonomy to ensure your objectives cover different cognitive levels:</p>
          
          <ul>
            <li><strong>Remember:</strong> Students recall facts and basic concepts</li>
            <li><strong>Understand:</strong> Students explain ideas and concepts</li>
            <li><strong>Apply:</strong> Students use information in new situations</li>
            <li><strong>Analyze:</strong> Students draw connections among ideas</li>
            <li><strong>Evaluate:</strong> Students justify a stand or decision</li>
            <li><strong>Create:</strong> Students produce new or original work</li>
          </ul>
          
          <h3>The Structure of an Effective Lesson</h3>
          
          <p><strong>Introduction (10-15% of time)</strong></p>
          <p>Hook students' attention and connect to prior knowledge. Use questions, stories, or demonstrations to engage learners.</p>
          
          <p><strong>Main Activities (60-70% of time)</strong></p>
          <p>Present new content through varied activities. Include whole-class instruction, group work, and individual practice.</p>
          
          <p><strong>Conclusion (10-15% of time)</strong></p>
          <p>Summarize key points and check for understanding. Connect learning to real-world applications.</p>
          
          <h3>Differentiation Strategies</h3>
          
          <p>Every classroom has diverse learners. Plan for differentiation by:</p>
          <ul>
            <li>Providing multiple ways to access content</li>
            <li>Offering choices in how students demonstrate learning</li>
            <li>Adjusting the complexity of tasks</li>
            <li>Using flexible grouping</li>
          </ul>
          
          <h3>Using SMESA for Lesson Planning</h3>
          
          <p>SMESA's lesson planning module helps you organize your lessons with research-based templates. You can:</p>
          <ul>
            <li>Set clear learning objectives with success criteria</li>
            <li>Plan differentiated activities</li>
            <li>Include proper academic references</li>
            <li>Share plans with colleagues</li>
            <li>Track which lessons work best</li>
          </ul>
        `,
        authorId: '2',
        authorName: 'Education Team',
        authorRole: 'Curriculum Specialist',
        coverImage: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800',
        category: 'Teaching Tips',
        tags: ['lesson-planning', 'research', 'strategies', 'differentiation'],
        publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14),
        readTime: 8,
        views: 389,
        likes: 28,
      },
      {
        id: '3',
        title: 'ICT Skills Every Teacher Should Master',
        excerpt: 'From basic digital literacy to advanced classroom technology, here are the essential ICT skills for modern educators.',
        content: `
          <p>Technology has become an integral part of education. This article outlines the ICT skills that can enhance your teaching and improve student learning outcomes.</p>
          
          <h3>Basic Digital Literacy</h3>
          
          <p>Every teacher should be comfortable with:</p>
          <ul>
            <li>Using word processors and spreadsheets</li>
            <li>Creating and managing email</li>
            <li>Navigating the internet safely</li>
            <li>Using presentation software</li>
            <li>Managing files and folders</li>
          </ul>
          
          <h3>Classroom Technology</h3>
          
          <p><strong>Interactive Whiteboards</strong></p>
          <p>Learn to create engaging lessons with interactive elements, multimedia, and real-time collaboration.</p>
          
          <p><strong>Learning Management Systems</strong></p>
          <p>Platforms like SMESA help you organize content, track progress, and communicate with students and parents.</p>
          
          <p><strong>Educational Apps</strong></p>
          <p>Discover apps for assessment, collaboration, creativity, and subject-specific learning.</p>
          
          <h3>Digital Assessment Tools</h3>
          
          <p>Modern assessment goes beyond paper and pencil:</p>
          <ul>
            <li>Online quizzes with instant feedback</li>
            <li>Digital portfolios for student work</li>
            <li>Peer assessment platforms</li>
            <li>Data analysis for tracking progress</li>
          </ul>
          
          <h3>Online Safety and Ethics</h3>
          
          <p>Teach students to:</p>
          <ul>
            <li>Protect their personal information</li>
            <li>Recognize reliable sources</li>
            <li>Practice digital citizenship</li>
            <li>Understand copyright and fair use</li>
          </ul>
          
          <h3>SMESA Training Resources</h3>
          
          <p>Access our comprehensive ICT training videos designed specifically for teachers. From beginner to advanced, there's something for everyone.</p>
        `,
        authorId: '3',
        authorName: 'Tech Team',
        authorRole: 'ICT Specialist',
        coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
        category: 'Professional Development',
        tags: ['ict', 'technology', 'professional-development', 'digital-skills'],
        publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
        readTime: 6,
        views: 267,
        likes: 19,
      },
    ];
    
    set({ posts: mockPosts, isLoading: false });
  },
  selectPost: (id) => {
    const post = get().posts.find(p => p.id === id);
    set({ selectedPost: post || null });
  },
}));

// Module/Pricing Store
const modulePrices: Record<ModuleType, number> = {
  attendance: 5000,
  assessments: 6000,
  parent_portal: 4000,
  teacher_collaboration: 3500,
  ict_training: 4500,
  analytics: 7000,
  wellbeing: 3000,
  skills_tracking: 3500,
  lesson_planning: 4000,
};

interface ModuleState {
  selectedModules: ModuleType[];
  toggleModule: (module: ModuleType) => void;
  calculatePrice: () => number;
}

export const useModuleStore = create<ModuleState>((set, get) => ({
  selectedModules: ['attendance', 'assessments', 'parent_portal', 'lesson_planning'],
  toggleModule: (module) => {
    set((state) => ({
      selectedModules: state.selectedModules.includes(module)
        ? state.selectedModules.filter(m => m !== module)
        : [...state.selectedModules, module],
    }));
  },
  calculatePrice: (): number => {
    const state = get();
    return state.selectedModules.reduce((total: number, mod: ModuleType) => total + modulePrices[mod], 0);
  },
}));

// Settings Store
interface SettingsState {
  settings: UserSettings | null;
  isLoading: boolean;
  fetchSettings: () => Promise<void>;
  updateSettings: (data: Partial<UserSettings>) => Promise<void>;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  settings: null,
  isLoading: false,
  fetchSettings: async () => {
    set({ isLoading: true });
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockSettings: UserSettings = {
      profile: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'teacher@school.edu',
        phone: '+256 700 123 456',
        bio: 'Passionate educator with 5 years of experience teaching primary mathematics and science.',
      },
      preferences: {
        language: 'en',
        timezone: 'Africa/Kampala',
        dateFormat: 'DD/MM/YYYY',
        theme: 'light',
      },
      notifications: {
        email: true,
        push: true,
        sms: false,
        attendanceAlerts: true,
        assessmentReminders: true,
        eventNotifications: true,
        communityMentions: true,
      },
      privacy: {
        profileVisible: true,
        showEmail: false,
        showPhone: false,
      },
    };
    
    set({ settings: mockSettings, isLoading: false });
  },
  updateSettings: async (data) => {
    set((state) => ({
      settings: state.settings ? { ...state.settings, ...data } : null,
    }));
  },
}));

// Parent Store
interface ParentState {
  children: Student[];
  requests: ParentRequest[];
  isLoading: boolean;
  fetchChildren: () => Promise<void>;
  createRequest: (request: Omit<ParentRequest, 'id' | 'createdAt' | 'status'>) => Promise<void>;
}

export const useParentStore = create<ParentState>((set) => ({
  children: [],
  requests: [],
  isLoading: false,
  fetchChildren: async () => {
    set({ isLoading: true });
    await new Promise(resolve => setTimeout(resolve, 500));
    set({ isLoading: false });
  },
  createRequest: async (requestData) => {
    const newRequest: ParentRequest = {
      ...requestData,
      id: `request-${Date.now()}`,
      status: 'pending',
      createdAt: new Date(),
    };
    set((state) => ({ requests: [newRequest, ...state.requests] }));
  },
}));
