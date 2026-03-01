import { Card } from '@/components/atoms';
import { EventCard } from '@/components/molecules';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar } from 'lucide-react';
import type { Event } from '@/types';

interface UpcomingEventsProps {
  events: Event[];
}

export function UpcomingEvents({ events }: UpcomingEventsProps) {
  return (
    <Card variant="default" className="h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-accent" />
          <h3 className="font-semibold text-foreground">Upcoming Events</h3>
        </div>
        <Button variant="ghost" size="sm" className="text-accent">
          View all
          <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
      <div className="space-y-3">
        {events.length === 0 ? (
          <p className="text-sm text-foreground-secondary text-center py-8">
            No upcoming events
          </p>
        ) : (
          events.slice(0, 3).map((event) => (
            <EventCard key={event.id} event={event} variant="compact" />
          ))
        )}
      </div>
    </Card>
  );
}
