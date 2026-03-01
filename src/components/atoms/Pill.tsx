import { cn } from '@/lib/utils';

interface PillProps {
  children: React.ReactNode;
  variant?: 'accent' | 'outline' | 'ghost';
  size?: 'sm' | 'md';
  className?: string;
  icon?: React.ReactNode;
}

export function Pill({ 
  children, 
  variant = 'outline', 
  size = 'md',
  className,
  icon 
}: PillProps) {
  const variants = {
    accent: 'bg-accent text-white',
    outline: 'bg-white text-foreground border border-[rgba(61,58,54,0.12)]',
    ghost: 'bg-transparent text-foreground-secondary',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {icon && <span className="mr-1.5">{icon}</span>}
      {children}
    </span>
  );
}
