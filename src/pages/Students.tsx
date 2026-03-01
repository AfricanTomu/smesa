import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/templates';
import { Card, Button } from '@/components/atoms';
import { SearchInput } from '@/components/molecules';
import { useStudentStore } from '@/store';
import { 
  Plus, 
  Filter, 
  Download, 
  Users,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function Students() {
  const { students, fetchStudents, isLoading } = useStudentStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchStudents();
  }, []);

  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = selectedClass === 'all' || student.className === selectedClass;
    return matchesSearch && matchesClass;
  });

  const classes = ['all', ...Array.from(new Set(students.map(s => s.className)))];
  
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Students</h1>
          <p className="text-foreground-secondary mt-1">
            Manage student records and information
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="primary">
              <Plus className="w-4 h-4 mr-2" />
              Add Student
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">First Name</label>
                  <input type="text" className="w-full px-4 py-2 rounded-xl border border-[rgba(61,58,54,0.12)]" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Last Name</label>
                  <input type="text" className="w-full px-4 py-2 rounded-xl border border-[rgba(61,58,54,0.12)]" placeholder="Doe" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Class</label>
                <select className="w-full px-4 py-2 rounded-xl border border-[rgba(61,58,54,0.12)]">
                  <option>Primary 1</option>
                  <option>Primary 2</option>
                  <option>Primary 3</option>
                  <option>Primary 4</option>
                  <option>Primary 5</option>
                  <option>Primary 6</option>
                  <option>Primary 7</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Parent Email</label>
                <input type="email" className="w-full px-4 py-2 rounded-xl border border-[rgba(61,58,54,0.12)]" placeholder="parent@email.com" />
              </div>
              <Button variant="primary" className="w-full">Add Student</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card variant="default" className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{students.length}</p>
              <p className="text-xs text-foreground-secondary">Total Students</p>
            </div>
          </div>
        </Card>
        <Card variant="default" className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">642</p>
              <p className="text-xs text-foreground-secondary">Boys</p>
            </div>
          </div>
        </Card>
        <Card variant="default" className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-pink-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">603</p>
              <p className="text-xs text-foreground-secondary">Girls</p>
            </div>
          </div>
        </Card>
        <Card variant="default" className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">7</p>
              <p className="text-xs text-foreground-secondary">Classes</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card variant="default" className="p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <SearchInput
              placeholder="Search students by name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-4 py-2 rounded-xl border border-[rgba(61,58,54,0.12)] bg-white text-sm"
            >
              <option value="all">All Classes</option>
              {classes.filter(c => c !== 'all').map(cls => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </Card>

      {/* Students List */}
      <Card variant="default" className="p-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-4 border-accent/30 border-t-accent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[rgba(61,58,54,0.08)]">
                    <th className="text-left py-3 text-sm font-medium text-foreground-secondary">Student</th>
                    <th className="text-left py-3 text-sm font-medium text-foreground-secondary">ID</th>
                    <th className="text-left py-3 text-sm font-medium text-foreground-secondary">Class</th>
                    <th className="text-left py-3 text-sm font-medium text-foreground-secondary">Gender</th>
                    <th className="text-left py-3 text-sm font-medium text-foreground-secondary">Status</th>
                    <th className="text-left py-3 text-sm font-medium text-foreground-secondary">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedStudents.map((student) => (
                    <tr key={student.id} className="border-b border-[rgba(61,58,54,0.04)] hover:bg-muted/30">
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-accent">
                              {student.firstName[0]}{student.lastName[0]}
                            </span>
                          </div>
                          <span className="font-medium text-foreground">
                            {student.firstName} {student.lastName}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 text-sm text-foreground-secondary">{student.studentId}</td>
                      <td className="py-3">
                        <span className="px-2 py-1 bg-muted rounded-full text-xs font-medium">{student.className}</span>
                      </td>
                      <td className="py-3 text-sm text-foreground-secondary capitalize">{student.gender}</td>
                      <td className="py-3">
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                          Active
                        </span>
                      </td>
                      <td className="py-3">
                        <Button variant="ghost" size="sm">View</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-foreground-secondary">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredStudents.length)} of {filteredStudents.length} students
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-[rgba(61,58,54,0.12)] disabled:opacity-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-sm text-foreground-secondary">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-[rgba(61,58,54,0.12)] disabled:opacity-50"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </Card>
    </DashboardLayout>
  );
}
