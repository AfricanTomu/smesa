import { Card, Avatar, Badge } from '@/components/atoms';
import { cn } from '@/lib/utils';
import type { Student } from '@/types';

interface StudentListItemProps {
  student: Student;
  className?: string;
  onClick?: () => void;
  showAttendance?: boolean;
}

export function StudentListItem({ 
  student, 
  className, 
  onClick,
  showAttendance = false 
}: StudentListItemProps) {
  return (
    <Card 
      variant="flat" 
      padding="sm" 
      className={cn('flex items-center gap-4 cursor-pointer hover:bg-muted/50 transition-colors', className)}
      onClick={onClick}
    >
      <Avatar 
        src={student.photo} 
        name={`${student.firstName} ${student.lastName}`}
        size="md"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-foreground truncate">
            {student.firstName} {student.lastName}
          </h4>
          <span className="text-xs text-foreground-secondary">{student.studentId}</span>
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <Badge variant="default" size="sm">{student.className}</Badge>
          <span className="text-xs text-foreground-secondary capitalize">{student.gender}</span>
        </div>
      </div>
      {showAttendance && (
        <div className="flex items-center gap-1">
          <button className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center hover:bg-green-200 transition-colors">
            ✓
          </button>
          <button className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-200 transition-colors">
            ✕
          </button>
        </div>
      )}
    </Card>
  );
}
