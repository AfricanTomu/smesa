import { cn } from '@/lib/utils';
import { useAuthStore, useUIStore } from '@/store';
import { Sidebar, Header } from '@/components/organisms';
import { OfflineSync } from '@/components/molecules/OfflineSync';
import { Navigate } from 'react-router-dom';

interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function DashboardLayout({ children, className }: DashboardLayoutProps) {
  const { isAuthenticated, isLoading } = useAuthStore();
  const { sidebarOpen } = useUIStore();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-accent/30 border-t-accent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div 
        className={cn(
          'transition-all duration-300',
          sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'
        )}
      >
        <Header />
        <main className={cn('p-4 lg:p-6', className)}>
          {children}
        </main>
      </div>
      <OfflineSync />
    </div>
  );
}
