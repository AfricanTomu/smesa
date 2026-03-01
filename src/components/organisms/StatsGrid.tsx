import { StatCard } from '@/components/molecules';
import { Users, UserCheck, BookOpen, TrendingUp } from 'lucide-react';

interface StatsGridProps {
  role: 'admin' | 'teacher' | 'parent';
}

const adminStats = [
  {
    title: 'Total Students',
    value: '1,245',
    change: 5.2,
    icon: <Users className="w-5 h-5 text-accent" />,
    iconBg: 'bg-accent/10',
  },
  {
    title: 'Total Teachers',
    value: '48',
    change: 2.1,
    icon: <UserCheck className="w-5 h-5 text-blue-600" />,
    iconBg: 'bg-blue-100',
  },
  {
    title: 'Today\'s Attendance',
    value: '94.2%',
    change: 1.5,
    icon: <TrendingUp className="w-5 h-5 text-green-600" />,
    iconBg: 'bg-green-100',
  },
  {
    title: 'Pending Assessments',
    value: '23',
    change: -3.2,
    icon: <BookOpen className="w-5 h-5 text-amber-600" />,
    iconBg: 'bg-amber-100',
  },
];

const teacherStats = [
  {
    title: 'My Students',
    value: '156',
    change: 0,
    icon: <Users className="w-5 h-5 text-accent" />,
    iconBg: 'bg-accent/10',
  },
  {
    title: 'Classes Today',
    value: '4',
    change: 0,
    icon: <BookOpen className="w-5 h-5 text-blue-600" />,
    iconBg: 'bg-blue-100',
  },
  {
    title: 'Attendance Marked',
    value: '92%',
    change: 2.3,
    icon: <UserCheck className="w-5 h-5 text-green-600" />,
    iconBg: 'bg-green-100',
  },
  {
    title: 'Pending Grading',
    value: '12',
    change: -5.1,
    icon: <TrendingUp className="w-5 h-5 text-amber-600" />,
    iconBg: 'bg-amber-100',
  },
];

const parentStats = [
  {
    title: 'My Children',
    value: '2',
    change: 0,
    icon: <Users className="w-5 h-5 text-accent" />,
    iconBg: 'bg-accent/10',
  },
  {
    title: 'Attendance This Term',
    value: '96%',
    change: 1.2,
    icon: <UserCheck className="w-5 h-5 text-green-600" />,
    iconBg: 'bg-green-100',
  },
  {
    title: 'Upcoming Events',
    value: '3',
    change: 0,
    icon: <BookOpen className="w-5 h-5 text-blue-600" />,
    iconBg: 'bg-blue-100',
  },
  {
    title: 'Unread Reports',
    value: '2',
    change: 0,
    icon: <TrendingUp className="w-5 h-5 text-amber-600" />,
    iconBg: 'bg-amber-100',
  },
];

export function StatsGrid({ role }: StatsGridProps) {
  const stats = role === 'admin' ? adminStats : role === 'teacher' ? teacherStats : parentStats;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          change={stat.change}
          icon={stat.icon}
          iconBg={stat.iconBg}
        />
      ))}
    </div>
  );
}
