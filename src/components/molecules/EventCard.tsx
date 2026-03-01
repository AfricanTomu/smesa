import { Card, Badge } from '@/components/atoms';
import { cn } from '@/lib/utils';
import { Calendar, MapPin, Video } from 'lucide-react';
import type { Event } from '@/types';

interface EventCardProps {
  event: Event;
  variant?: 'default' | 'compact';
  className?: string;
}

export function EventCard({ event, variant = 'default', className }: EventCardProps) {
  const eventDate = new Date(event.startDate);
  const isUpcoming = eventDate > new Date();

  if (variant === 'compact') {
    return (
      <Card variant="flat" padding="sm" className={cn('flex items-center gap-4', className)}>
        <div className="flex-shrink-0 w-14 h-14 bg-accent/10 rounded-xl flex flex-col items-center justify-center">
          <span className="text-xs text-accent font-medium uppercase">
            {eventDate.toLocaleDateString('en-US', { month: 'short' })}
          </span>
          <span className="text-lg font-bold text-foreground">
            {eventDate.getDate()}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-foreground truncate">{event.title}</h4>
          <div className="flex items-center gap-2 text-xs text-foreground-secondary mt-0.5">
            {event.isVirtual ? (
              <><Video className="w-3 h-3" /> Virtual</>
            ) : (
              <><MapPin className="w-3 h-3" /> {event.location}</>
            )}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card variant="hover" className={className}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-16 h-16 bg-accent/10 rounded-xl flex flex-col items-center justify-center">
          <span className="text-xs text-accent font-medium uppercase">
            {eventDate.toLocaleDateString('en-US', { month: 'short' })}
          </span>
          <span className="text-xl font-bold text-foreground">
            {eventDate.getDate()}
          </span>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Badge variant={isUpcoming ? 'success' : 'default'}>
              {isUpcoming ? 'Upcoming' : 'Past'}
            </Badge>
            {event.isVirtual && (
              <Badge variant="info">Virtual</Badge>
            )}
          </div>
          <h3 className="font-semibold text-foreground mt-2">{event.title}</h3>
          <p className="text-sm text-foreground-secondary mt-1 line-clamp-2">
            {event.description}
          </p>
          <div className="flex items-center gap-4 mt-3 text-sm text-foreground-secondary">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {eventDate.toLocaleDateString('en-US', { 
                weekday: 'short',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
            {!event.isVirtual && event.location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {event.location}
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
