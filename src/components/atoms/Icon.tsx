import { cn } from '@/lib/utils';
import * as LucideIcons from 'lucide-react';

type IconName = keyof typeof LucideIcons;

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
  color?: string;
}

export function Icon({ name, size = 20, className, color }: IconProps) {
  const LucideIcon = LucideIcons[name] as React.ComponentType<{ size?: number; className?: string; color?: string }>;
  
  if (!LucideIcon) {
    console.warn(`Icon "${name}" not found in Lucide icons`);
    return null;
  }

  return (
    <LucideIcon 
      size={size} 
      className={cn('flex-shrink-0', className)} 
      color={color}
    />
  );
}
