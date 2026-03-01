import { Card } from '@/components/atoms';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: React.ReactNode;
  iconBg?: string;
  className?: string;
}

export function StatCard({
  title,
  value,
  change,
  changeLabel = 'vs last term',
  icon,
  iconBg = 'bg-accent/10',
  className,
}: StatCardProps) {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <Card variant="hover" className={cn('h-full', className)}>
      <div className="flex items-start justify-between">
        <div className={cn('p-3 rounded-xl', iconBg)}>
          {icon}
        </div>
        {change !== undefined && (
          <div className={cn(
            'flex items-center text-sm font-medium',
            isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : 'text-foreground-secondary'
          )}>
            {isPositive && <TrendingUp className="w-4 h-4 mr-1" />}
            {isNegative && <TrendingDown className="w-4 h-4 mr-1" />}
            {Math.abs(change)}%
          </div>
        )}
      </div>
      <div className="mt-4">
        <p className="text-foreground-secondary text-sm">{title}</p>
        <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
        {change !== undefined && (
          <p className="text-xs text-foreground-secondary mt-1">{changeLabel}</p>
        )}
      </div>
    </Card>
  );
}
