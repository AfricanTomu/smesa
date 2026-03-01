import { Card } from '@/components/atoms';
import { cn } from '@/lib/utils';
import { Clock, Eye } from 'lucide-react';
import type { BlogPost } from '@/types';

interface BlogCardProps {
  post: BlogPost;
  variant?: 'default' | 'featured' | 'compact';
  className?: string;
}

export function BlogCard({ post, variant = 'default', className }: BlogCardProps) {
  if (variant === 'featured') {
    return (
      <Card 
        variant="hover" 
        padding="none" 
        className={cn('overflow-hidden h-full', className)}
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <span className="px-3 py-1 bg-accent text-white text-xs font-medium rounded-full">
              {post.category}
            </span>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-foreground line-clamp-2">{post.title}</h3>
          <p className="text-foreground-secondary mt-2 line-clamp-2">{post.excerpt}</p>
          <div className="flex items-center justify-between mt-4 text-sm text-foreground-secondary">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime} min read
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {post.views}
              </span>
            </div>
            <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </Card>
    );
  }

  if (variant === 'compact') {
    return (
      <Card variant="flat" padding="sm" className={cn('flex gap-4', className)}>
        {post.coverImage && (
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
          />
        )}
        <div className="flex-1 min-w-0">
          <span className="px-2 py-0.5 bg-muted text-foreground-secondary text-xs rounded-full">{post.category}</span>
          <h4 className="font-medium text-foreground mt-1 line-clamp-2">{post.title}</h4>
          <p className="text-xs text-foreground-secondary mt-1">
            {new Date(post.publishedAt).toLocaleDateString()}
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card variant="hover" className={className}>
      <div className="flex gap-4">
        {post.coverImage && (
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-32 h-24 rounded-xl object-cover flex-shrink-0"
          />
        )}
        <div className="flex-1">
          <span className="px-2 py-0.5 bg-muted text-foreground-secondary text-xs rounded-full">{post.category}</span>
          <h3 className="font-semibold text-foreground mt-2 line-clamp-1">{post.title}</h3>
          <p className="text-sm text-foreground-secondary mt-1 line-clamp-2">{post.excerpt}</p>
          <div className="flex items-center gap-4 mt-3 text-xs text-foreground-secondary">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readTime} min
            </span>
            <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
