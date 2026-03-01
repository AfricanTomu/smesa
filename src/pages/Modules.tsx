import { useState } from 'react';
import { DashboardLayout } from '@/components/templates';
import { Card, Button, Pill } from '@/components/atoms';
import { ModuleToggle } from '@/components/molecules';
import { useModuleStore } from '@/store';
import { 
  Check, 
  Users, 
  ClipboardList, 
  BookOpen, 
  MessageSquare, 
  Video, 
  BarChart3,
  Heart,
  Trophy,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import type { ModuleType } from '@/types';

const modules: { id: ModuleType; name: string; description: string; icon: React.ReactNode; price: number }[] = [
  {
    id: 'attendance',
    name: 'Attendance & Scheduling',
    description: 'Track attendance, manage schedules, and generate reports',
    icon: <ClipboardList className="w-6 h-6" />,
    price: 5000,
  },
  {
    id: 'assessments',
    name: 'Assessments & Reports',
    description: 'Create assessments, grade students, and generate report cards',
    icon: <BookOpen className="w-6 h-6" />,
    price: 6000,
  },
  {
    id: 'parent_portal',
    name: 'Parent Portal',
    description: 'Keep parents informed with real-time updates and reports',
    icon: <Users className="w-6 h-6" />,
    price: 4000,
  },
  {
    id: 'teacher_collaboration',
    name: 'Teacher Collaboration',
    description: 'Share resources, discuss strategies, and collaborate',
    icon: <MessageSquare className="w-6 h-6" />,
    price: 3500,
  },
  {
    id: 'ict_training',
    name: 'ICT Training',
    description: 'Access video lessons and training materials for teachers',
    icon: <Video className="w-6 h-6" />,
    price: 4500,
  },
  {
    id: 'analytics',
    name: 'Analytics & Monitoring',
    description: 'Comprehensive analytics and multi-level monitoring',
    icon: <BarChart3 className="w-6 h-6" />,
    price: 7000,
  },
  {
    id: 'wellbeing',
    name: 'Wellbeing Integration',
    description: 'Track and report on student wellbeing',
    icon: <Heart className="w-6 h-6" />,
    price: 3000,
  },
  {
    id: 'skills_tracking',
    name: 'Skills Tracking',
    description: 'Monitor teacher skills and professional development',
    icon: <Trophy className="w-6 h-6" />,
    price: 3500,
  },
];

const packages: { name: string; modules: ModuleType[]; price: number; description: string; isPopular?: boolean }[] = [
  {
    name: 'Starter',
    modules: ['attendance', 'assessments'],
    price: 8000,
    description: 'Essential tools for small schools',
  },
  {
    name: 'Professional',
    modules: ['attendance', 'assessments', 'parent_portal', 'teacher_collaboration', 'ict_training'],
    price: 18000,
    description: 'Complete solution for growing schools',
    isPopular: true,
  },
  {
    name: 'Enterprise',
    modules: ['attendance', 'assessments', 'parent_portal', 'teacher_collaboration', 'ict_training', 'analytics', 'wellbeing', 'skills_tracking'],
    price: 28000,
    description: 'Full-featured for large institutions',
  },
];

export default function Modules() {
  const { selectedModules, toggleModule, calculatePrice } = useModuleStore();
  const [teacherCount, setTeacherCount] = useState(10);
  const [showQuoteDialog, setShowQuoteDialog] = useState(false);

  const monthlyPrice = calculatePrice() * teacherCount;

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Build Your Package</h1>
        <p className="text-foreground-secondary mt-1">
          Customize your SMESA experience with the modules you need
        </p>
      </div>

      {/* Pre-built Packages */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-foreground mb-4">Recommended Packages</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {packages.map((pkg) => (
            <Card 
              key={pkg.name}
              variant={pkg.isPopular ? 'default' : 'flat'}
              className={`p-6 relative ${pkg.isPopular ? 'ring-2 ring-accent' : ''}`}
            >
              {pkg.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Pill variant="accent" size="sm">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Most Popular
                  </Pill>
                </div>
              )}
              <h3 className="text-xl font-bold text-foreground">{pkg.name}</h3>
              <p className="text-sm text-foreground-secondary mt-1">{pkg.description}</p>
              <div className="mt-4">
                <span className="text-3xl font-bold text-accent">UGX {pkg.price.toLocaleString()}</span>
                <span className="text-foreground-secondary">/teacher/month</span>
              </div>
              <ul className="mt-4 space-y-2">
                {pkg.modules.map((moduleId) => {
                  const module = modules.find(m => m.id === moduleId);
                  return (
                    <li key={moduleId} className="flex items-center gap-2 text-sm text-foreground-secondary">
                      <Check className="w-4 h-4 text-green-500" />
                      {module?.name}
                    </li>
                  );
                })}
              </ul>
              <Button 
                variant={pkg.isPopular ? 'primary' : 'outline'} 
                className="w-full mt-6"
                onClick={() => {
                  pkg.modules.forEach(m => {
                    if (!selectedModules.includes(m)) toggleModule(m);
                  });
                }}
              >
                Select Package
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Custom Builder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Module Selection */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-semibold text-foreground mb-4">Or Build Your Own</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {modules.map((module) => (
              <ModuleToggle
                key={module.id}
                name={module.name}
                description={module.description}
                icon={module.icon}
                price={module.price}
                isSelected={selectedModules.includes(module.id)}
                onToggle={() => toggleModule(module.id)}
              />
            ))}
          </div>
        </div>

        {/* Price Calculator */}
        <div>
          <Card variant="default" className="p-6 sticky top-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Price Estimate</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-foreground mb-2">
                Number of Teachers
              </label>
              <input
                type="number"
                min={1}
                max={1000}
                value={teacherCount}
                onChange={(e) => setTeacherCount(parseInt(e.target.value) || 1)}
                className="w-full px-4 py-2 rounded-xl border border-[rgba(61,58,54,0.12)]"
              />
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-foreground-secondary">Base price</span>
                <span className="font-medium">UGX {calculatePrice().toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-foreground-secondary">Teachers</span>
                <span className="font-medium">× {teacherCount}</span>
              </div>
              <div className="border-t border-[rgba(61,58,54,0.08)] pt-2 mt-2">
                <div className="flex justify-between">
                  <span className="font-medium text-foreground">Monthly Total</span>
                  <span className="text-xl font-bold text-accent">
                    UGX {monthlyPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-muted rounded-xl p-4 mb-4">
              <p className="text-sm text-foreground-secondary">
                <span className="font-medium text-foreground">Selected modules:</span>{' '}
                {selectedModules.length} of {modules.length}
              </p>
              <div className="flex flex-wrap gap-1 mt-2">
                {selectedModules.map((moduleId: ModuleType) => {
                  const module = modules.find(m => m.id === moduleId);
                  return (
                    <span key={moduleId} className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">
                      {module?.name}
                    </span>
                  );
                })}
              </div>
            </div>

            <Button 
              variant="primary" 
              className="w-full"
              onClick={() => setShowQuoteDialog(true)}
            >
              Request Quote
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            <p className="text-xs text-foreground-secondary text-center mt-4">
              Prices in Ugandan Shillings (UGX). VAT not included.
            </p>
          </Card>
        </div>
      </div>

      {/* Quote Dialog */}
      {showQuoteDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card variant="default" className="w-full max-w-md p-6">
            <h3 className="text-xl font-bold text-foreground mb-4">Request a Quote</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">School Name</label>
                <input type="text" className="w-full px-4 py-2 rounded-xl border border-[rgba(61,58,54,0.12)]" placeholder="Enter school name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Contact Email</label>
                <input type="email" className="w-full px-4 py-2 rounded-xl border border-[rgba(61,58,54,0.12)]" placeholder="Enter email address" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Phone Number</label>
                <input type="tel" className="w-full px-4 py-2 rounded-xl border border-[rgba(61,58,54,0.12)]" placeholder="Enter phone number" />
              </div>
              <div className="flex gap-3 pt-4">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowQuoteDialog(false)}
                >
                  Cancel
                </Button>
                <Button 
                  variant="primary" 
                  className="flex-1"
                  onClick={() => {
                    alert('Quote request submitted! We will contact you soon.');
                    setShowQuoteDialog(false);
                  }}
                >
                  Submit Request
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
}
