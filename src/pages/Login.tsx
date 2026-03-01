import { useState } from 'react';
import { AuthLayout } from '@/components/templates';
import { Button } from '@/components/atoms';
import { useAuthStore } from '@/store';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <AuthLayout>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground">Welcome back</h2>
        <p className="text-foreground-secondary mt-2">
          Sign in to your SMESA account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-secondary" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@school.edu"
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-[rgba(61,58,54,0.12)] bg-white text-foreground placeholder:text-foreground-secondary/60 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-secondary" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-12 pr-12 py-3 rounded-xl border border-[rgba(61,58,54,0.12)] bg-white text-foreground placeholder:text-foreground-secondary/60 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground-secondary hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-accent focus:ring-accent" />
            <span className="text-foreground-secondary">Remember me</span>
          </label>
          <a href="/forgot-password" className="text-accent hover:underline">
            Forgot password?
          </a>
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          isLoading={isLoading}
        >
          Sign In
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-foreground-secondary">
          Don&apos;t have an account?{' '}
          <a href="/register" className="text-accent font-medium hover:underline">
            Get started
          </a>
        </p>
      </div>

      {/* Demo Credentials */}
      <div className="mt-8 p-4 bg-muted rounded-xl">
        <p className="text-xs font-medium text-foreground-secondary mb-2">Demo Credentials:</p>
        <div className="space-y-1 text-xs text-foreground-secondary">
          <p><span className="font-medium">Admin:</span> admin@school.edu / password</p>
          <p><span className="font-medium">Teacher:</span> teacher@school.edu / password</p>
          <p><span className="font-medium">Parent:</span> parent@school.edu / password</p>
        </div>
      </div>
    </AuthLayout>
  );
}
