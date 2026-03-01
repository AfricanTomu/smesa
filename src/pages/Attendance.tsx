import { useState } from 'react';
import { DashboardLayout } from '@/components/templates';
import { Card, Button } from '@/components/atoms';
import { Check, X, Minus, Clock, Users } from 'lucide-react';

interface AttendanceRecord {
  studentId: string;
  name: string;
  status: 'present' | 'absent' | 'late' | 'excused' | null;
}

const mockStudents: AttendanceRecord[] = [
  { studentId: 'STU001', name: 'John Okello', status: null },
  { studentId: 'STU002', name: 'Mary Auma', status: null },
  { studentId: 'STU003', name: 'David Ochieng', status: null },
  { studentId: 'STU004', name: 'Sarah Nakato', status: null },
  { studentId: 'STU005', name: 'James Mukasa', status: null },
  { studentId: 'STU006', name: 'Emma Kirabo', status: null },
  { studentId: 'STU007', name: 'Michael Ssempala', status: null },
  { studentId: 'STU008', name: 'Grace Namuli', status: null },
];

export default function Attendance() {
  const [selectedClass, setSelectedClass] = useState('Primary 5A');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(mockStudents);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateStatus = (studentId: string, status: AttendanceRecord['status']) => {
    setAttendance(prev => 
      prev.map(student => 
        student.studentId === studentId ? { ...student, status } : student
      )
    );
  };

  const markAll = (status: AttendanceRecord['status']) => {
    setAttendance(prev => 
      prev.map(student => ({ ...student, status }))
    );
  };

  const submitAttendance = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    alert('Attendance saved successfully!');
  };

  const stats = {
    present: attendance.filter(s => s.status === 'present').length,
    absent: attendance.filter(s => s.status === 'absent').length,
    late: attendance.filter(s => s.status === 'late').length,
    excused: attendance.filter(s => s.status === 'excused').length,
    unmarked: attendance.filter(s => s.status === null).length,
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Attendance</h1>
          <p className="text-foreground-secondary mt-1">
            Mark daily attendance for your class
          </p>
        </div>
        <div className="flex gap-2">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-4 py-2 rounded-xl border border-[rgba(61,58,54,0.12)] bg-white text-sm"
          >
            <option>Primary 1A</option>
            <option>Primary 2A</option>
            <option>Primary 3A</option>
            <option>Primary 4A</option>
            <option>Primary 5A</option>
            <option>Primary 6A</option>
            <option>Primary 7A</option>
          </select>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 rounded-xl border border-[rgba(61,58,54,0.12)] bg-white text-sm"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <Card variant="default" className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Check className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.present}</p>
              <p className="text-xs text-foreground-secondary">Present</p>
            </div>
          </div>
        </Card>
        <Card variant="default" className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <X className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.absent}</p>
              <p className="text-xs text-foreground-secondary">Absent</p>
            </div>
          </div>
        </Card>
        <Card variant="default" className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.late}</p>
              <p className="text-xs text-foreground-secondary">Late</p>
            </div>
          </div>
        </Card>
        <Card variant="default" className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Minus className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.excused}</p>
              <p className="text-xs text-foreground-secondary">Excused</p>
            </div>
          </div>
        </Card>
        <Card variant="default" className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.unmarked}</p>
              <p className="text-xs text-foreground-secondary">Unmarked</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card variant="default" className="p-4 mb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-foreground-secondary mr-2">Mark all as:</span>
          <Button variant="outline" size="sm" onClick={() => markAll('present')}>
            <Check className="w-4 h-4 mr-1" />
            Present
          </Button>
          <Button variant="outline" size="sm" onClick={() => markAll('absent')}>
            <X className="w-4 h-4 mr-1" />
            Absent
          </Button>
          <Button variant="outline" size="sm" onClick={() => markAll('late')}>
            <Clock className="w-4 h-4 mr-1" />
            Late
          </Button>
        </div>
      </Card>

      {/* Attendance List */}
      <Card variant="default" className="p-6">
        <div className="space-y-2">
          {attendance.map((student) => (
            <div
              key={student.studentId}
              className="flex items-center justify-between p-4 rounded-xl hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-accent">
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-foreground">{student.name}</p>
                  <p className="text-sm text-foreground-secondary">{student.studentId}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateStatus(student.studentId, 'present')}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                    student.status === 'present'
                      ? 'bg-green-500 text-white'
                      : 'bg-green-100 text-green-600 hover:bg-green-200'
                  }`}
                >
                  <Check className="w-5 h-5" />
                </button>
                <button
                  onClick={() => updateStatus(student.studentId, 'absent')}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                    student.status === 'absent'
                      ? 'bg-red-500 text-white'
                      : 'bg-red-100 text-red-600 hover:bg-red-200'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
                <button
                  onClick={() => updateStatus(student.studentId, 'late')}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                    student.status === 'late'
                      ? 'bg-amber-500 text-white'
                      : 'bg-amber-100 text-amber-600 hover:bg-amber-200'
                  }`}
                >
                  <Clock className="w-5 h-5" />
                </button>
                <button
                  onClick={() => updateStatus(student.studentId, 'excused')}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                    student.status === 'excused'
                      ? 'bg-blue-500 text-white'
                      : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                  }`}
                >
                  <Minus className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="mt-6 pt-6 border-t border-[rgba(61,58,54,0.08)]">
          <Button
            variant="primary"
            className="w-full"
            isLoading={isSubmitting}
            onClick={submitAttendance}
          >
            Save Attendance
          </Button>
        </div>
      </Card>
    </DashboardLayout>
  );
}
