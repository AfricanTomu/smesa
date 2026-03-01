import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Wifi, WifiOff, RefreshCw, CheckCircle, X } from 'lucide-react';
import { Button } from '@/components/atoms';

type SyncStatus = 'online' | 'offline' | 'syncing' | 'synced';

interface OfflineSyncProps {
  className?: string;
}

export function OfflineSync({ className }: OfflineSyncProps) {
  const [status, setStatus] = useState<SyncStatus>('online');
  const [isVisible, setIsVisible] = useState(false);
  const [pendingChanges, setPendingChanges] = useState(0);

  useEffect(() => {
    // Check initial online status
    setStatus(navigator.onLine ? 'online' : 'offline');
    setIsVisible(!navigator.onLine);

    const handleOnline = () => {
      setStatus('online');
      setIsVisible(true);
      // Auto-hide after 3 seconds when coming back online
      setTimeout(() => setIsVisible(false), 3000);
    };

    const handleOffline = () => {
      setStatus('offline');
      setIsVisible(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Simulate pending changes for demo
    const interval = setInterval(() => {
      if (!navigator.onLine) {
        setPendingChanges(prev => prev + 1);
      }
    }, 30000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
    };
  }, []);

  const handleSync = async () => {
    setStatus('syncing');
    // Simulate sync
    await new Promise(resolve => setTimeout(resolve, 2000));
    setStatus('synced');
    setPendingChanges(0);
    setTimeout(() => {
      setStatus('online');
      setIsVisible(false);
    }, 2000);
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const statusConfig = {
    online: {
      icon: <Wifi className="w-5 h-5" />,
      title: 'Back Online',
      message: 'Your connection has been restored.',
      bgColor: 'bg-green-500',
      textColor: 'text-white',
    },
    offline: {
      icon: <WifiOff className="w-5 h-5" />,
      title: 'You\'re Offline',
      message: pendingChanges > 0 
        ? `${pendingChanges} changes will sync when you're back online.`
        : 'Changes will be saved locally and synced later.',
      bgColor: 'bg-amber-500',
      textColor: 'text-white',
    },
    syncing: {
      icon: <RefreshCw className="w-5 h-5 animate-spin" />,
      title: 'Syncing...',
      message: 'Uploading your changes to the server.',
      bgColor: 'bg-blue-500',
      textColor: 'text-white',
    },
    synced: {
      icon: <CheckCircle className="w-5 h-5" />,
      title: 'Sync Complete',
      message: 'All your changes have been saved.',
      bgColor: 'bg-green-500',
      textColor: 'text-white',
    },
  };

  const config = statusConfig[status];

  return (
    <div
      className={cn(
        'fixed bottom-4 right-4 z-50 max-w-md w-full mx-4',
        'animate-in slide-in-from-bottom-4 fade-in duration-300',
        className
      )}
    >
      <div className={cn(
        'rounded-xl shadow-lg p-4 flex items-start gap-3',
        config.bgColor,
        config.textColor
      )}>
        <div className="flex-shrink-0 mt-0.5">{config.icon}</div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm">{config.title}</h4>
          <p className="text-sm opacity-90 mt-0.5">{config.message}</p>
          
          {status === 'offline' && pendingChanges > 0 && (
            <div className="mt-3 flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSync}
                className="bg-white/20 hover:bg-white/30 text-white border-0"
              >
                <RefreshCw className="w-4 h-4 mr-1" />
                Sync Now
              </Button>
            </div>
          )}
        </div>
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 p-1 hover:bg-white/20 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// Hook to track online/offline status
export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}
