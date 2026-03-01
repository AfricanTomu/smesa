import { useEffect } from 'react';
import { DashboardLayout } from '@/components/templates';
import { StatsGrid, RecentActivity, UpcomingEvents } from '@/components/organisms';
import { Card, Button, Avatar } from '@/components/atoms';
import { useAuthStore, useDashboardStore } from '@/store';
import { 
  Users, 
  BookOpen, 
  Calendar, 
  TrendingUp,
  ArrowRight,
  Plus,
  GraduationCap,
  ClipboardList,
  FileText,
  Heart,
  MessageSquare,
  Video,
  BarChart3,
  Bell,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuthStore();
  const { stats, fetchStats } = useDashboardStore();

  useEffect(() => {
    fetchStats();
  }, []);

  const role = user?.role || 'teacher';

  // Role-specific quick actions
  const getQuickActions = () => {
    const commonActions = [
      { icon: Calendar, label: 'View Events', color: 'bg-green-100 text-green-600', href: '/events' },
      { icon: BookOpen, label: 'Read Blog', color: 'bg-purple-100 text-purple-600', href: '/blog' },
    ];

    switch (role) {
      case 'admin':
        return [
          { icon: Users, label: 'Add Student', color: 'bg-accent/10 text-accent', href: '/students' },
          { icon: ClipboardList, label: 'Mark Attendance', color: 'bg-blue-100 text-blue-600', href: '/attendance' },
          { icon: FileText, label: 'Create Assessment', color: 'bg-amber-100 text-amber-600', href: '/assessments' },
          { icon: BarChart3, label: 'View Analytics', color: 'bg-pink-100 text-pink-600', href: '/analytics' },
          ...commonActions,
        ];
      case 'teacher':
        return [
          { icon: ClipboardList, label: 'Mark Attendance', color: 'bg-accent/10 text-accent', href: '/attendance' },
          { icon: BookOpen, label: 'Lesson Plans', color: 'bg-blue-100 text-blue-600', href: '/lessons' },
          { icon: FileText, label: 'Add Assessment', color: 'bg-amber-100 text-amber-600', href: '/assessments' },
          { icon: Video, label: 'ICT Training', color: 'bg-green-100 text-green-600', href: '/training' },
          ...commonActions,
        ];
      case 'parent':
        return [
          { icon: GraduationCap, label: 'My Children', color: 'bg-accent/10 text-accent', href: '/children' },
          { icon: TrendingUp, label: 'Progress', color: 'bg-blue-100 text-blue-600', href: '/analytics' },
          { icon: Heart, label: 'Wellbeing', color: 'bg-pink-100 text-pink-600', href: '/wellbeing' },
          { icon: MessageSquare, label: 'Messages', color: 'bg-amber-100 text-amber-600', href: '/community' },
          ...commonActions,
        ];
      default:
        return commonActions;
    }
  };

  // Role-specific welcome message
  const getWelcomeMessage = () => {
    switch (role) {
      case 'admin':
        return "Here's an overview of your school's performance today.";
      case 'teacher':
        return "Here's what's happening in your classes today.";
      case 'parent':
        return "Here's an update on your children's progress.";
      default:
        return "Here's what's happening at your school today.";
    }
  };

  const quickActions = getQuickActions();

  return (
    <DashboardLayout>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">
          Welcome back, {user?.firstName}! 👋
        </h1>
        <p className="text-foreground-secondary mt-1">
          {getWelcomeMessage()}
        </p>
      </div>

      {/* Stats Grid */}
      <StatsGrid role={role as 'admin' | 'teacher' | 'parent'} />

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickActions.map((action, index) => (
            <a key={index} href={action.href}>
              <Card variant="hover" className="p-4 cursor-pointer h-full">
                <div className="flex flex-col items-center text-center">
                  <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center mb-3`}>
                    <action.icon className="w-6 h-6" />
                  </div>
                  <span className="font-medium text-foreground text-sm">{action.label}</span>
                </div>
              </Card>
            </a>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <RecentActivity activities={stats?.recentActivities || []} />
        </div>

        {/* Upcoming Events */}
        <div>
          <UpcomingEvents events={stats?.upcomingEvents || []} />
        </div>
      </div>

      {/* Admin-Specific Sections */}
      {role === 'admin' && (
        <>
          {/* School Overview */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">School Overview</h2>
              <Button variant="outline" size="sm">
                View Details
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card variant="default" className="p-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">24</p>
                    <p className="text-sm text-foreground-secondary">Classes</p>
                  </div>
                </div>
              </Card>
              <Card variant="default" className="p-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">156</p>
                    <p className="text-sm text-foreground-secondary">New Enrollments</p>
                  </div>
                </div>
              </Card>
              <Card variant="default" className="p-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">87%</p>
                    <p className="text-sm text-foreground-secondary">Pass Rate</p>
                  </div>
                </div>
              </Card>
              <Card variant="default" className="p-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                    <Bell className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">12</p>
                    <p className="text-sm text-foreground-secondary">Pending Tasks</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Recent Enrollments & Alerts */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Enrollments */}
            <Card variant="default" className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Recent Enrollments</h2>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Student
                </Button>
              </div>
              <div className="space-y-3">
                {[
                  { name: 'John Okello', class: 'Primary 5', date: '2025-02-28', status: 'Active', avatar: '' },
                  { name: 'Mary Auma', class: 'Primary 3', date: '2025-02-27', status: 'Active', avatar: '' },
                  { name: 'David Ochieng', class: 'Primary 6', date: '2025-02-26', status: 'Pending', avatar: '' },
                  { name: 'Sarah Nakato', class: 'Primary 4', date: '2025-02-25', status: 'Active', avatar: '' },
                ].map((student, i) => (
                  <div key={i} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <Avatar name={student.name} size="sm" />
                      <div>
                        <p className="font-medium text-foreground text-sm">{student.name}</p>
                        <p className="text-xs text-foreground-secondary">{student.class}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-foreground-secondary">{student.date}</span>
                      <span className={`
                        px-2 py-0.5 rounded-full text-xs font-medium
                        ${student.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}
                      `}>
                        {student.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* System Alerts */}
            <Card variant="default" className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">System Alerts</h2>
                <Button variant="ghost" size="sm">View All</Button>
              </div>
              <div className="space-y-3">
                {[
                  { message: 'Attendance not marked for Primary 4', type: 'warning', time: '2 hours ago' },
                  { message: 'New assessment created by Mr. Okot', type: 'info', time: '4 hours ago' },
                  { message: 'System backup completed successfully', type: 'success', time: '6 hours ago' },
                  { message: 'Parent-teacher meeting scheduled', type: 'info', time: '1 day ago' },
                ].map((alert, i) => (
                  <div key={i} className="flex items-start gap-3 py-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      alert.type === 'warning' ? 'bg-amber-100' :
                      alert.type === 'success' ? 'bg-green-100' : 'bg-blue-100'
                    }`}>
                      {alert.type === 'warning' ? <AlertCircle className="w-4 h-4 text-amber-600" /> :
                       alert.type === 'success' ? <CheckCircle className="w-4 h-4 text-green-600" /> :
                       <Bell className="w-4 h-4 text-blue-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground">{alert.message}</p>
                      <p className="text-xs text-foreground-secondary">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </>
      )}

      {/* Teacher-Specific Sections */}
      {role === 'teacher' && (
        <>
          {/* Today's Schedule */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Today's Schedule</h2>
              <Button variant="outline" size="sm">
                View Full Schedule
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { subject: 'Mathematics', class: 'Primary 5', time: '08:00 - 09:00', room: 'Room 12', status: 'completed' },
                { subject: 'Mathematics', class: 'Primary 6', time: '09:30 - 10:30', room: 'Room 14', status: 'current' },
                { subject: 'Science', class: 'Primary 5', time: '11:00 - 12:00', room: 'Lab 2', status: 'upcoming' },
                { subject: 'Science', class: 'Primary 4', time: '14:00 - 15:00', room: 'Lab 1', status: 'upcoming' },
              ].map((session, i) => (
                <Card 
                  key={i} 
                  variant="default" 
                  className={`p-4 ${session.status === 'current' ? 'ring-2 ring-accent' : ''}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      session.status === 'completed' ? 'bg-green-100 text-green-700' :
                      session.status === 'current' ? 'bg-accent text-white' :
                      'bg-muted text-foreground-secondary'
                    }`}>
                      {session.status === 'completed' ? 'Done' :
                       session.status === 'current' ? 'Now' : 'Upcoming'}
                    </span>
                    <span className="text-xs text-foreground-secondary">{session.room}</span>
                  </div>
                  <h4 className="font-semibold text-foreground">{session.subject}</h4>
                  <p className="text-sm text-foreground-secondary">{session.class}</p>
                  <p className="text-xs text-foreground-secondary mt-2">{session.time}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Pending Tasks & Student Performance */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pending Tasks */}
            <Card variant="default" className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Pending Tasks</h2>
                <Button variant="ghost" size="sm">View All</Button>
              </div>
              <div className="space-y-3">
                {[
                  { task: 'Grade Primary 5 Math Quiz', deadline: 'Today', priority: 'high' },
                  { task: 'Submit Lesson Plan for Week 8', deadline: 'Tomorrow', priority: 'medium' },
                  { task: 'Parent Meeting - John Okello', deadline: 'Feb 28', priority: 'medium' },
                  { task: 'Update Attendance Records', deadline: 'Today', priority: 'high' },
                ].map((task, i) => (
                  <div key={i} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        task.priority === 'high' ? 'bg-red-500' : 'bg-amber-500'
                      }`} />
                      <span className="text-sm text-foreground">{task.task}</span>
                    </div>
                    <span className={`text-xs ${
                      task.deadline === 'Today' ? 'text-red-500 font-medium' : 'text-foreground-secondary'
                    }`}>
                      {task.deadline}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Class Performance */}
            <Card variant="default" className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Class Performance</h2>
                <Button variant="ghost" size="sm">View Details</Button>
              </div>
              <div className="space-y-4">
                {[
                  { class: 'Primary 5', average: 78, trend: 'up', students: 42 },
                  { class: 'Primary 6', average: 82, trend: 'up', students: 38 },
                  { class: 'Primary 4', average: 71, trend: 'down', students: 45 },
                ].map((cls, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground text-sm">{cls.class}</p>
                      <p className="text-xs text-foreground-secondary">{cls.students} students</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${cls.average >= 80 ? 'bg-green-500' : cls.average >= 70 ? 'bg-amber-500' : 'bg-red-500'}`}
                          style={{ width: `${cls.average}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-foreground w-8">{cls.average}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </>
      )}

      {/* Parent-Specific Sections */}
      {role === 'parent' && (
        <>
          {/* My Children */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">My Children</h2>
              <Button variant="outline" size="sm">
                View All Details
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: 'Emma Nakato', class: 'Primary 5', attendance: '95%', average: 84, teacher: 'Mr. Okot' },
                { name: 'Daniel Okello', class: 'Primary 3', attendance: '92%', average: 78, teacher: 'Mrs. Auma' },
              ].map((child, i) => (
                <Card key={i} variant="default" className="p-5">
                  <div className="flex items-start gap-4">
                    <Avatar name={child.name} size="lg" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{child.name}</h4>
                      <p className="text-sm text-foreground-secondary">{child.class}</p>
                      <p className="text-xs text-foreground-secondary">Teacher: {child.teacher}</p>
                      <div className="flex items-center gap-4 mt-3">
                        <div className="text-center">
                          <p className="text-lg font-bold text-foreground">{child.attendance}</p>
                          <p className="text-xs text-foreground-secondary">Attendance</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold text-foreground">{child.average}%</p>
                          <p className="text-xs text-foreground-secondary">Average</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Assessments & Upcoming Events */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Assessments */}
            <Card variant="default" className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Recent Assessments</h2>
                <Button variant="ghost" size="sm">View All</Button>
              </div>
              <div className="space-y-3">
                {[
                  { subject: 'Mathematics', child: 'Emma Nakato', score: 85, total: 100, date: 'Feb 25' },
                  { subject: 'Science', child: 'Emma Nakato', score: 78, total: 100, date: 'Feb 24' },
                  { subject: 'English', child: 'Daniel Okello', score: 82, total: 100, date: 'Feb 23' },
                  { subject: 'Social Studies', child: 'Daniel Okello', score: 75, total: 100, date: 'Feb 22' },
                ].map((assessment, i) => (
                  <div key={i} className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium text-foreground text-sm">{assessment.subject}</p>
                      <p className="text-xs text-foreground-secondary">{assessment.child} • {assessment.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-medium ${
                        (assessment.score / assessment.total) >= 0.8 ? 'text-green-600' :
                        (assessment.score / assessment.total) >= 0.6 ? 'text-amber-600' : 'text-red-600'
                      }`}>
                        {assessment.score}/{assessment.total}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* School Announcements */}
            <Card variant="default" className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">School Announcements</h2>
                <Button variant="ghost" size="sm">View All</Button>
              </div>
              <div className="space-y-4">
                {[
                  { title: 'Parent-Teacher Meeting', date: 'March 5, 2025', type: 'meeting' },
                  { title: 'Sports Day Registration Open', date: 'March 10, 2025', type: 'event' },
                  { title: 'Mid-Term Reports Available', date: 'March 15, 2025', type: 'academic' },
                  { title: 'School Fees Payment Reminder', date: 'March 1, 2025', type: 'admin' },
                ].map((announcement, i) => (
                  <div key={i} className="flex items-start gap-3 py-1">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      announcement.type === 'meeting' ? 'bg-blue-100' :
                      announcement.type === 'event' ? 'bg-green-100' :
                      announcement.type === 'academic' ? 'bg-purple-100' : 'bg-amber-100'
                    }`}>
                      <Bell className={`w-4 h-4 ${
                        announcement.type === 'meeting' ? 'text-blue-600' :
                        announcement.type === 'event' ? 'text-green-600' :
                        announcement.type === 'academic' ? 'text-purple-600' : 'text-amber-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{announcement.title}</p>
                      <p className="text-xs text-foreground-secondary">{announcement.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </>
      )}
    </DashboardLayout>
  );
}
