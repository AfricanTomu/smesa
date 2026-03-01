import { Card } from '@/components/atoms';
import { cn } from '@/lib/utils';
import { Play, Clock, BookOpen } from 'lucide-react';
import type { TrainingVideo } from '@/types';

interface VideoCardProps {
  video: TrainingVideo;
  progress?: number;
  className?: string;
  onClick?: () => void;
}

export function VideoCard({ video, progress = 0, className, onClick }: VideoCardProps) {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const hrs = Math.floor(mins / 60);
    if (hrs > 0) {
      return `${hrs}h ${mins % 60}m`;
    }
    return `${mins}m`;
  };

  const difficultyColors = {
    beginner: 'bg-green-100 text-green-700',
    intermediate: 'bg-amber-100 text-amber-700',
    advanced: 'bg-red-100 text-red-700',
  };

  return (
    <Card 
      variant="hover" 
      padding="none" 
      className={cn('overflow-hidden cursor-pointer group', className)}
      onClick={onClick}
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center">
            <Play className="w-6 h-6 text-accent ml-1" fill="currentColor" />
          </div>
        </div>
        {progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
            <div 
              className="h-full bg-accent"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span className={cn(
            'px-2 py-1 rounded-full text-xs font-medium',
            difficultyColors[video.difficulty]
          )}>
            {video.difficulty}
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 text-xs text-foreground-secondary">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {formatDuration(video.duration)}
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="w-3 h-3" />
            {video.category}
          </span>
        </div>
        <h3 className="font-semibold text-foreground mt-2 line-clamp-2">{video.title}</h3>
        <p className="text-sm text-foreground-secondary mt-1 line-clamp-2">
          {video.description}
        </p>
        {progress > 0 && (
          <div className="mt-3 flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-accent rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs font-medium text-accent">{progress}%</span>
          </div>
        )}
      </div>
    </Card>
  );
}
