import { Card, Avatar, Badge } from '@/components/atoms';
import { cn } from '@/lib/utils';
import { MessageCircle, Eye, ThumbsUp, Clock } from 'lucide-react';
import type { ForumTopic } from '@/types';

interface ForumTopicCardProps {
  topic: ForumTopic;
  className?: string;
  onClick?: () => void;
}

export function ForumTopicCard({ topic, className, onClick }: ForumTopicCardProps) {
  return (
    <Card 
      variant="hover" 
      className={cn('cursor-pointer', className)}
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        <Avatar 
          src={topic.authorAvatar} 
          name={topic.authorName}
          size="md"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            {topic.isPinned && (
              <Badge variant="warning">Pinned</Badge>
            )}
            <Badge variant="default">{topic.category}</Badge>
          </div>
          <h3 className="font-semibold text-foreground mt-2 line-clamp-1">{topic.title}</h3>
          <p className="text-sm text-foreground-secondary mt-1 line-clamp-2">
            {topic.content}
          </p>
          <div className="flex items-center gap-4 mt-3 text-xs text-foreground-secondary">
            <span className="flex items-center gap-1">
              <MessageCircle className="w-3.5 h-3.5" />
              {topic.replies.length} replies
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              {topic.views} views
            </span>
            <span className="flex items-center gap-1">
              <ThumbsUp className="w-3.5 h-3.5" />
              {topic.likes}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {new Date(topic.createdAt).toLocaleDateString()}
            </span>
          </div>
          {topic.tags.length > 0 && (
            <div className="flex items-center gap-1 mt-3 flex-wrap">
              {topic.tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-2 py-0.5 bg-muted rounded-full text-xs text-foreground-secondary"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
