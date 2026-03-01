import { Card } from '@/components/atoms';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface ModuleToggleProps {
  name: string;
  description: string;
  icon: React.ReactNode;
  price: number;
  isSelected: boolean;
  onToggle: () => void;
  className?: string;
}

export function ModuleToggle({
  name,
  description,
  icon,
  price,
  isSelected,
  onToggle,
  className,
}: ModuleToggleProps) {
  return (
    <Card
      variant={isSelected ? 'default' : 'flat'}
      padding="md"
      className={cn(
        'cursor-pointer transition-all duration-200',
        isSelected 
          ? 'ring-2 ring-accent shadow-lg shadow-accent/10' 
          : 'hover:shadow-md opacity-80 hover:opacity-100',
        className
      )}
      onClick={onToggle}
    >
      <div className="flex items-start gap-4">
        <div className={cn(
          'p-3 rounded-xl transition-colors',
          isSelected ? 'bg-accent text-white' : 'bg-muted text-foreground-secondary'
        )}>
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">{name}</h3>
            <div className={cn(
              'w-6 h-6 rounded-full flex items-center justify-center transition-colors',
              isSelected ? 'bg-accent text-white' : 'bg-muted'
            )}>
              {isSelected && <Check className="w-4 h-4" />}
            </div>
          </div>
          <p className="text-sm text-foreground-secondary mt-1">{description}</p>
          <p className="text-sm font-medium text-accent mt-2">
            UGX {price.toLocaleString()}/teacher
          </p>
        </div>
      </div>
    </Card>
  );
}
