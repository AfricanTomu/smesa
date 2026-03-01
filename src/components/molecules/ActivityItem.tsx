import { cn } from '@/lib/utils';
import { formatDistanceToNow } from '@/lib/utils';

interface ActivityItemProps {
  type: string;
  description: string;
  userName: string;
  timestamp: Date;
  className?: string;
}

const typeIcons: Record<string, string> = {
  attendance: '👥',
  assessment: '📝',
  event: '📅',
  message: '💬',
  student: '👤',
  default: '•',
};

export function ActivityItem({
  type,
  description,
  userName,
  timestamp,
  className,
}: ActivityItemProps) {
  const icon = typeIcons[type] || typeIcons.default;

  return (
    <div className={cn('flex items-start gap-3 py-3', className)}>
      <span className="text-lg">{icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-foreground">
          <span className="font-medium">{userName}</span>{' '}
          <span className="text-foreground-secondary">{description}</span>
        </p>
        <p className="text-xs text-foreground-secondary mt-0.5">
          {formatDistanceToNow(timestamp)}
        </p>
      </div>
    </div>
  );
}
