import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  isLoading?: boolean;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, icon, isLoading, ...props }, ref) => {
    return (
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground-secondary">
          {icon || <Search className="w-5 h-5" />}
        </div>
        <input
          ref={ref}
          type="text"
          className={cn(
            'w-full pl-11 pr-4 py-3 rounded-xl',
            'bg-white border border-[rgba(61,58,54,0.12)]',
            'text-foreground placeholder:text-foreground-secondary/60',
            'focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent',
            'transition-all duration-200',
            className
          )}
          {...props}
        />
        {isLoading && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
          </div>
        )}
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';

export { SearchInput };
