import { useState } from 'react';
import { AuthLayout } from '@/components/templates';
import { Button } from '@/components/atoms';
import { Eye, EyeOff, Mail, Lock, User, School } from 'lucide-react';
import type { UserRole } from '@/types';

export default function Register() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<UserRole>('teacher');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    schoolName: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate registration
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    // Redirect would happen here
    window.location.href = '/dashboard';
  };

  const roles: { value: UserRole; label: string; description: string }[] = [
    { value: 'admin', label: 'School Administrator', description: 'Manage your school' },
    { value: 'teacher', label: 'Teacher', description: 'Manage your classes' },
    { value: 'parent', label: 'Parent', description: 'Monitor your children' },
  ];

  return (
    <AuthLayout>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground">Create your account</h2>
        <p className="text-foreground-secondary mt-2">
          Join thousands of schools using SMESA
        </p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
          step >= 1 ? 'bg-accent text-white' : 'bg-muted text-foreground-secondary'
        }`}>
          1
        </div>
        <div className={`w-12 h-0.5 ${step >= 2 ? 'bg-accent' : 'bg-muted'}`} />
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
          step >= 2 ? 'bg-accent text-white' : 'bg-muted text-foreground-secondary'
        }`}>
          2
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <p className="text-sm font-medium text-foreground mb-3">I am a...</p>
          <div className="space-y-2">
            {roles.map((r) => (
              <button
                key={r.value}
                onClick={() => setRole(r.value)}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  role === r.value
                    ? 'border-accent bg-accent/5'
                    : 'border-[rgba(61,58,54,0.08)] hover:border-accent/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{r.label}</p>
                    <p className="text-sm text-foreground-secondary">{r.description}</p>
                  </div>
                  {role === r.value && (
                    <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
          <Button
            variant="primary"
            className="w-full mt-6"
            onClick={() => setStep(2)}
          >
            Continue
          </Button>
        </div>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                First Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-secondary" />
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="John"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-[rgba(61,58,54,0.12)] bg-white text-foreground placeholder:text-foreground-secondary/60 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Last Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-secondary" />
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="Doe"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-[rgba(61,58,54,0.12)] bg-white text-foreground placeholder:text-foreground-secondary/60 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-secondary" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@school.edu"
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-[rgba(61,58,54,0.12)] bg-white text-foreground placeholder:text-foreground-secondary/60 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                required
              />
            </div>
          </div>

          {role === 'admin' && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                School Name
              </label>
              <div className="relative">
                <School className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-secondary" />
                <input
                  type="text"
                  value={formData.schoolName}
                  onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                  placeholder="St. Mary's Primary School"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-[rgba(61,58,54,0.12)] bg-white text-foreground placeholder:text-foreground-secondary/60 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-secondary" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-secondary" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-[rgba(61,58,54,0.12)] bg-white text-foreground placeholder:text-foreground-secondary/60 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-accent focus:ring-accent" required />
            <span className="text-foreground-secondary">
              I agree to the{' '}
              <a href="/terms" className="text-accent hover:underline">Terms of Service</a>
              {' '}and{' '}
              <a href="/privacy" className="text-accent hover:underline">Privacy Policy</a>
            </span>
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => setStep(1)}
            >
              Back
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="flex-1"
              isLoading={isLoading}
            >
              Create Account
            </Button>
          </div>
        </form>
      )}

      <div className="mt-6 text-center">
        <p className="text-sm text-foreground-secondary">
          Already have an account?{' '}
          <a href="/login" className="text-accent font-medium hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </AuthLayout>
  );
}
