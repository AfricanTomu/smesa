import { cn } from '@/lib/utils';
import { useAuthStore, useUIStore } from '@/store';
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  BookOpen,
  MessageSquare,
  Video,
  Calendar,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Heart,
  Trophy,
  FileText,
  Newspaper,
  Layers,
} from 'lucide-react';
import type { UserRole } from '@/types';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
  roles: UserRole[];
}

const navItems: NavItem[] = [
  { label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, href: '/dashboard', roles: ['admin', 'teacher', 'parent'] },
  { label: 'Students', icon: <Users className="w-5 h-5" />, href: '/students', roles: ['admin', 'teacher'] },
  { label: 'Attendance', icon: <ClipboardList className="w-5 h-5" />, href: '/attendance', roles: ['admin', 'teacher'] },
  { label: 'Lesson Plans', icon: <BookOpen className="w-5 h-5" />, href: '/lessons', roles: ['admin', 'teacher'] },
  { label: 'Assessments', icon: <FileText className="w-5 h-5" />, href: '/assessments', roles: ['admin', 'teacher'] },
  { label: 'ICT Training', icon: <Video className="w-5 h-5" />, href: '/training', roles: ['admin', 'teacher'] },
  { label: 'Community', icon: <MessageSquare className="w-5 h-5" />, href: '/community', roles: ['admin', 'teacher'] },
  { label: 'Events', icon: <Calendar className="w-5 h-5" />, href: '/events', roles: ['admin', 'teacher', 'parent'] },
  { label: 'Blog', icon: <Newspaper className="w-5 h-5" />, href: '/blog', roles: ['admin', 'teacher', 'parent'] },
  { label: 'Analytics', icon: <BarChart3 className="w-5 h-5" />, href: '/analytics', roles: ['admin'] },
  { label: 'Modules', icon: <Layers className="w-5 h-5" />, href: '/modules', roles: ['admin'] },
  { label: 'Wellbeing', icon: <Heart className="w-5 h-5" />, href: '/wellbeing', roles: ['admin', 'teacher', 'parent'] },
  { label: 'Skills', icon: <Trophy className="w-5 h-5" />, href: '/skills', roles: ['admin', 'teacher'] },
  { label: 'My Children', icon: <GraduationCap className="w-5 h-5" />, href: '/children', roles: ['parent'] },
];

export function Sidebar() {
  const { sidebarOpen, toggleSidebar } = useUIStore();
  const { user, logout } = useAuthStore();

  const filteredNavItems = navItems.filter(item => 
    user?.role && item.roles.includes(user.role)
  );

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 h-screen bg-white border-r border-[rgba(61,58,54,0.08)] z-40',
        'transition-all duration-300 ease-in-out',
        sidebarOpen ? 'w-64' : 'w-20'
      )}
    >
      <div className="h-full flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-[rgba(61,58,54,0.08)]">
          <div className={cn(
            'flex items-center gap-3 transition-opacity',
            sidebarOpen ? 'opacity-100' : 'opacity-0'
          )}>
            <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="font-bold text-xl text-foreground">SMESA</span>
          </div>
          {!sidebarOpen && (
            <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center mx-auto">
              <span className="text-white font-bold text-lg">S</span>
            </div>
          )}
        </div>

        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-20 w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#c66a3f] transition-colors"
        >
          {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 scrollbar-hide">
          <ul className="space-y-1">
            {filteredNavItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-xl text-foreground-secondary hover:bg-muted hover:text-foreground transition-colors',
                    'group'
                  )}
                >
                  <span className="text-foreground-secondary group-hover:text-accent transition-colors">
                    {item.icon}
                  </span>
                  <span className={cn(
                    'font-medium transition-all duration-200',
                    sidebarOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'
                  )}>
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom Actions */}
        <div className="p-3 border-t border-[rgba(61,58,54,0.08)]">
          <a
            href="/settings"
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-xl text-foreground-secondary hover:bg-muted hover:text-foreground transition-colors',
              'group'
            )}
          >
            <Settings className="w-5 h-5" />
            <span className={cn(
              'font-medium transition-all duration-200',
              sidebarOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'
            )}>
              Settings
            </span>
          </a>
          <a
            href="/help"
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-xl text-foreground-secondary hover:bg-muted hover:text-foreground transition-colors',
              'group mt-1'
            )}
          >
            <HelpCircle className="w-5 h-5" />
            <span className={cn(
              'font-medium transition-all duration-200',
              sidebarOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'
            )}>
              Help
            </span>
          </a>
          <button
            onClick={logout}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-50 transition-colors mt-1'
            )}
          >
            <LogOut className="w-5 h-5" />
            <span className={cn(
              'font-medium transition-all duration-200',
              sidebarOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'
            )}>
              Logout
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
}
