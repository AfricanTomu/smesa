import { useEffect, useState } from 'react';
import { Button, Card, Pill } from '@/components/atoms';
import { 
  ArrowRight, 
  Check, 
  Users, 
  BookOpen, 
  BarChart3, 
  MessageSquare,
  Video,
  Heart,
  WifiOff,
  Shield,
  Zap,
  Menu,
  X,
  ClipboardList,
  FileText,
} from 'lucide-react';

const features = [
  {
    icon: <ClipboardList className="w-6 h-6" />,
    title: 'Attendance & Scheduling',
    description: 'Mark attendance in seconds with offline-first registers that sync automatically.',
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: 'Lesson Planning',
    description: 'Research-backed templates with proper citations and references.',
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: 'Assessments',
    description: 'Create, grade, and generate reports with AI-powered tools.',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Parent Portal',
    description: 'Keep parents informed with clear, jargon-free reports.',
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: 'Teacher Community',
    description: 'Collaborate and share ideas with educators across schools.',
  },
  {
    icon: <Video className="w-6 h-6" />,
    title: 'ICT Training',
    description: 'Video lessons designed for low-bandwidth environments.',
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: 'Analytics & Monitoring',
    description: 'Multi-level monitoring from school to national level.',
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'Wellbeing Integration',
    description: 'Track and support student wellbeing holistically.',
  },
];

const benefits = [
  'Works offline - sync when connected',
  'Lower cost than competitors',
  'Designed for African schools',
  'Multi-language support',
  'Secure and private',
  '24/7 support',
];

const testimonials = [
  {
    name: 'Mrs. Sarah Namuli',
    role: 'Head Teacher',
    school: 'St. Francis Primary School',
    content: 'SMESA has transformed how we manage our school. Attendance tracking is now effortless, and parents love the real-time updates.',
    avatar: 'SN',
  },
  {
    name: 'Mr. John Okello',
    role: 'Teacher',
    school: 'Kampala Junior Academy',
    content: 'The ICT training videos have been a game-changer for me. I can now confidently use digital tools in my classroom.',
    avatar: 'JO',
  },
  {
    name: 'Mrs. Grace Auma',
    role: 'School Administrator',
    school: 'Bright Future School',
    content: 'The analytics dashboard gives us insights we never had before. We can now make data-driven decisions.',
    avatar: 'GA',
  },
];

export default function Landing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="font-bold text-xl text-foreground">SMESA</span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-foreground-secondary hover:text-foreground transition-colors">Features</a>
              <a href="#modules" className="text-foreground-secondary hover:text-foreground transition-colors">Modules</a>
              <a href="#pricing" className="text-foreground-secondary hover:text-foreground transition-colors">Pricing</a>
              <a href="#stories" className="text-foreground-secondary hover:text-foreground transition-colors">Stories</a>
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <a href="/login" className="text-foreground-secondary hover:text-foreground transition-colors">
                Log in
              </a>
              <a href="/register">
                <Button variant="primary">Get started</Button>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-[rgba(61,58,54,0.08)]">
            <div className="px-4 py-4 space-y-3">
              <a href="#features" className="block py-2 text-foreground-secondary">Features</a>
              <a href="#modules" className="block py-2 text-foreground-secondary">Modules</a>
              <a href="#pricing" className="block py-2 text-foreground-secondary">Pricing</a>
              <a href="#stories" className="block py-2 text-foreground-secondary">Stories</a>
              <hr className="border-[rgba(61,58,54,0.08)]" />
              <a href="/login" className="block py-2 text-foreground-secondary">Log in</a>
              <a href="/register" className="block py-2">
                <Button variant="primary" className="w-full">Get started</Button>
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Pill variant="accent" className="mb-6">
                Now available in Uganda
              </Pill>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Everything your school needs, in one{' '}
                <span className="text-accent">calm workspace</span>
              </h1>
              <p className="mt-6 text-lg text-foreground-secondary max-w-lg">
                Attendance, assessments, parent updates, and teacher growth—connected and offline-first. Built for African schools.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="/register">
                  <Button variant="primary" size="lg">
                    Get started free
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </a>
                <a href="/demo">
                  <Button variant="outline" size="lg">
                    Request a demo
                  </Button>
                </a>
              </div>
              <div className="mt-8 flex items-center gap-6 text-sm text-foreground-secondary">
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  No credit card required
                </span>
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  Free 14-day trial
                </span>
              </div>
            </div>
            <div className="relative">
              <Card variant="default" className="p-6 relative z-10">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-foreground-secondary">Today&apos;s Attendance</p>
                      <p className="text-2xl font-bold text-foreground">94.2%</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '94.2%' }} />
                  </div>
                  <div className="grid grid-cols-3 gap-4 pt-4">
                    <div className="text-center">
                      <p className="text-lg font-bold text-foreground">1,172</p>
                      <p className="text-xs text-foreground-secondary">Present</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-foreground">45</p>
                      <p className="text-xs text-foreground-secondary">Absent</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-foreground">28</p>
                      <p className="text-xs text-foreground-secondary">Late</p>
                    </div>
                  </div>
                </div>
              </Card>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Everything you need to run your school
            </h2>
            <p className="mt-4 text-lg text-foreground-secondary max-w-2xl mx-auto">
              From attendance to analytics, SMESA provides all the tools you need in one integrated platform.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} variant="hover" className="p-6">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-accent">{feature.icon}</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-foreground-secondary">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Built for African schools
              </h2>
              <p className="text-lg text-foreground-secondary mb-8">
                We understand the unique challenges faced by schools in Africa. That&apos;s why SMESA is designed to work reliably in any environment.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card variant="default" className="p-6 text-center">
                <WifiOff className="w-8 h-8 text-accent mx-auto mb-3" />
                <h3 className="font-semibold text-foreground">Offline First</h3>
                <p className="text-sm text-foreground-secondary mt-1">Works without internet</p>
              </Card>
              <Card variant="default" className="p-6 text-center">
                <Shield className="w-8 h-8 text-accent mx-auto mb-3" />
                <h3 className="font-semibold text-foreground">Secure</h3>
                <p className="text-sm text-foreground-secondary mt-1">Enterprise-grade security</p>
              </Card>
              <Card variant="default" className="p-6 text-center">
                <Zap className="w-8 h-8 text-accent mx-auto mb-3" />
                <h3 className="font-semibold text-foreground">Fast</h3>
                <p className="text-sm text-foreground-secondary mt-1">Optimized for any device</p>
              </Card>
              <Card variant="default" className="p-6 text-center">
                <Users className="w-8 h-8 text-accent mx-auto mb-3" />
                <h3 className="font-semibold text-foreground">Collaborative</h3>
                <p className="text-sm text-foreground-secondary mt-1">Share and learn together</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="stories" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Loved by educators
            </h2>
            <p className="mt-4 text-lg text-foreground-secondary">
              See what teachers and administrators are saying about SMESA
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} variant="default" className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <span className="font-bold text-accent">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-foreground-secondary">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-foreground-secondary">&ldquo;{testimonial.content}&rdquo;</p>
                <p className="text-sm text-accent mt-4">{testimonial.school}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Card variant="default" className="p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Ready to simplify your school?
              </h2>
              <p className="text-lg text-foreground-secondary mb-8 max-w-xl mx-auto">
                Join thousands of schools using SMESA to save time, reduce paperwork, and keep everyone connected.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="/register">
                  <Button variant="primary" size="lg">
                    Get started free
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </a>
                <a href="/demo">
                  <Button variant="outline" size="lg">
                    Request a demo
                  </Button>
                </a>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-[rgba(61,58,54,0.08)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">S</span>
                </div>
                <span className="font-bold text-lg text-foreground">SMESA</span>
              </div>
              <p className="text-sm text-foreground-secondary">
                Everything your school needs, in one calm workspace.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-foreground-secondary">
                <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-foreground-secondary">
                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-foreground-secondary">
                <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-[rgba(61,58,54,0.08)] text-center text-sm text-foreground-secondary">
            © 2025 SMESA. All rights reserved. Made with ❤️ in Uganda.
          </div>
        </div>
      </footer>
    </div>
  );
}
