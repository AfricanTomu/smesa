import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'hover' | 'flat';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', padding = 'md', children, ...props }, ref) => {
    const variants = {
      default: 'bg-white border border-[rgba(61,58,54,0.08)] shadow-[0_18px_40px_rgba(61,58,54,0.10)]',
      hover: 'bg-white border border-[rgba(61,58,54,0.08)] shadow-[0_18px_40px_rgba(61,58,54,0.10)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(61,58,54,0.14)]',
      flat: 'bg-white border border-[rgba(61,58,54,0.08)]',
    };

    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-[2rem]',
          variants[variant],
          paddings[padding],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export { Card };
