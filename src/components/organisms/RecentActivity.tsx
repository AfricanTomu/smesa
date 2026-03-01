import { Card } from '@/components/atoms';
import { ActivityItem } from '@/components/molecules';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface Activity {
  id: string;
  type: string;
  description: string;
  userName: string;
  timestamp: Date;
}

interface RecentActivityProps {
  activities: Activity[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <Card variant="default" className="h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Recent Activity</h3>
        <Button variant="ghost" size="sm" className="text-accent">
          View all
          <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
      <div className="space-y-1">
        {activities.length === 0 ? (
          <p className="text-sm text-foreground-secondary text-center py-8">
            No recent activity
          </p>
        ) : (
          activities.map((activity) => (
            <ActivityItem
              key={activity.id}
              type={activity.type}
              description={activity.description}
              userName={activity.userName}
              timestamp={activity.timestamp}
            />
          ))
        )}
      </div>
    </Card>
  );
}
