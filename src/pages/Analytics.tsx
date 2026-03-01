import { DashboardLayout } from '@/components/templates';
import { Card } from '@/components/atoms';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { TrendingUp, Users, GraduationCap, Award } from 'lucide-react';

const attendanceData = [
  { name: 'Mon', present: 95, absent: 5 },
  { name: 'Tue', present: 92, absent: 8 },
  { name: 'Wed', present: 96, absent: 4 },
  { name: 'Thu', present: 94, absent: 6 },
  { name: 'Fri', present: 90, absent: 10 },
];

const performanceData = [
  { name: 'Term 1', average: 72 },
  { name: 'Term 2', average: 75 },
  { name: 'Term 3', average: 78 },
];

const genderData = [
  { name: 'Boys', value: 642, color: '#3B82F6' },
  { name: 'Girls', value: 603, color: '#EC4899' },
];

const classData = [
  { name: 'P1', students: 185 },
  { name: 'P2', students: 192 },
  { name: 'P3', students: 178 },
  { name: 'P4', students: 201 },
  { name: 'P5', students: 189 },
  { name: 'P6', students: 175 },
  { name: 'P7', students: 165 },
];

export default function Analytics() {
  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Analytics Dashboard</h1>
        <p className="text-foreground-secondary mt-1">
          Comprehensive insights into school performance
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card variant="default" className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">1,245</p>
              <p className="text-sm text-foreground-secondary">Total Students</p>
            </div>
          </div>
        </Card>
        <Card variant="default" className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">94.2%</p>
              <p className="text-sm text-foreground-secondary">Avg Attendance</p>
            </div>
          </div>
        </Card>
        <Card variant="default" className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">76.5%</p>
              <p className="text-sm text-foreground-secondary">Avg Performance</p>
            </div>
          </div>
        </Card>
        <Card variant="default" className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">87%</p>
              <p className="text-sm text-foreground-secondary">Pass Rate</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Attendance Chart */}
        <Card variant="default" className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Weekly Attendance</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px'
                  }} 
                />
                <Bar dataKey="present" fill="#D9784C" radius={[4, 4, 0, 0]} />
                <Bar dataKey="absent" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Performance Trend */}
        <Card variant="default" className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Performance Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="average" 
                  stroke="#D9784C" 
                  strokeWidth={3}
                  dot={{ fill: '#D9784C', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gender Distribution */}
        <Card variant="default" className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Gender Distribution</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            {genderData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-foreground-secondary">
                  {item.name}: {item.value}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Class Distribution */}
        <Card variant="default" className="p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold text-foreground mb-4">Students by Class</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={classData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
                <XAxis type="number" stroke="#6b7280" />
                <YAxis dataKey="name" type="category" stroke="#6b7280" width={40} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px'
                  }} 
                />
                <Bar dataKey="students" fill="#D9784C" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
