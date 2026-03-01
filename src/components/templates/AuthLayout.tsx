import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store';
import { Navigate } from 'react-router-dom';

interface AuthLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function AuthLayout({ children, className }: AuthLayoutProps) {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className={cn('min-h-screen bg-background flex', className)}>
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-accent flex-col justify-between p-12 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="white" />
            </pattern>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
              <span className="text-accent font-bold text-2xl">S</span>
            </div>
            <span className="font-bold text-2xl text-white">SMESA</span>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-md">
          <h1 className="text-4xl font-bold text-white leading-tight">
            Everything your school needs, in one calm workspace.
          </h1>
          <p className="text-white/80 mt-4 text-lg">
            Attendance, assessments, parent updates, and teacher growth—connected and offline-first.
          </p>
        </div>

        {/* Stats */}
        <div className="relative z-10 flex gap-8">
          <div>
            <p className="text-3xl font-bold text-white">50+</p>
            <p className="text-white/70 text-sm">Schools</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">2,000+</p>
            <p className="text-white/70 text-sm">Teachers</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">50,000+</p>
            <p className="text-white/70 text-sm">Students</p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">S</span>
            </div>
            <span className="font-bold text-2xl text-foreground">SMESA</span>
          </div>
          
          {children}
        </div>
      </div>
    </div>
  );
}
