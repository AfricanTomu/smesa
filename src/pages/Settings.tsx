import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/templates';
import { Card, Button, Avatar } from '@/components/atoms';
import { useSettingsStore, useAuthStore } from '@/store';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Smartphone,
  Mail,
  Camera,
  Save,
  CheckCircle,
} from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

export default function Settings() {
  const { settings, fetchSettings, updateSettings: _updateSettings } = useSettingsStore();
  const { user, updateProfile: _updateProfile } = useAuthStore();
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-foreground-secondary mt-1">
          Manage your account and preferences
        </p>
      </div>

      {showSuccess && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-xl flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          Settings saved successfully!
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-muted mb-6 flex-wrap h-auto">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="w-4 h-4" /> Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="w-4 h-4" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Palette className="w-4 h-4" /> Preferences
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center gap-2">
            <Shield className="w-4 h-4" /> Privacy
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card variant="default" className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Profile Information</h3>
            
            <div className="flex items-center gap-6 mb-6">
              <div className="relative">
                <Avatar 
                  src={user?.avatar} 
                  name={`${user?.firstName} ${user?.lastName}`}
                  size="xl"
                />
                <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#c66a3f] transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div>
                <p className="font-medium text-foreground">Profile Photo</p>
                <p className="text-sm text-foreground-secondary">JPG, PNG or GIF. Max 2MB.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">First Name</label>
                <input
                  type="text"
                  defaultValue={user?.firstName}
                  className="w-full px-4 py-3 rounded-xl border border-[rgba(61,58,54,0.12)] bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Last Name</label>
                <input
                  type="text"
                  defaultValue={user?.lastName}
                  className="w-full px-4 py-3 rounded-xl border border-[rgba(61,58,54,0.12)] bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Email Address</label>
                <input
                  type="email"
                  defaultValue={user?.email}
                  className="w-full px-4 py-3 rounded-xl border border-[rgba(61,58,54,0.12)] bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  defaultValue={user?.phone}
                  placeholder="+256 700 123 456"
                  className="w-full px-4 py-3 rounded-xl border border-[rgba(61,58,54,0.12)] bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-foreground mb-1.5">Bio</label>
              <textarea
                rows={4}
                placeholder="Tell us about yourself..."
                defaultValue={settings?.profile.bio}
                className="w-full px-4 py-3 rounded-xl border border-[rgba(61,58,54,0.12)] bg-white text-foreground placeholder:text-foreground-secondary/60 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all resize-none"
              />
            </div>
          </Card>

          <Card variant="default" className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Professional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Employee ID</label>
                <input
                  type="text"
                  placeholder="EMP001"
                  className="w-full px-4 py-3 rounded-xl border border-[rgba(61,58,54,0.12)] bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Department</label>
                <select className="w-full px-4 py-3 rounded-xl border border-[rgba(61,58,54,0.12)] bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all">
                  <option>Mathematics</option>
                  <option>Science</option>
                  <option>English</option>
                  <option>Social Studies</option>
                  <option>Administration</option>
                </select>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card variant="default" className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Notification Preferences</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-[rgba(61,58,54,0.08)]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Email Notifications</p>
                    <p className="text-sm text-foreground-secondary">Receive updates via email</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                </label>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-[rgba(61,58,54,0.08)]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Push Notifications</p>
                    <p className="text-sm text-foreground-secondary">Receive push notifications on your device</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                </label>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-[rgba(61,58,54,0.08)]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Bell className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Attendance Alerts</p>
                    <p className="text-sm text-foreground-secondary">Get notified about attendance issues</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                </label>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-[rgba(61,58,54,0.08)]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Assessment Reminders</p>
                    <p className="text-sm text-foreground-secondary">Reminders for upcoming assessments</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                </label>
              </div>

              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                    <Globe className="w-5 h-5 text-pink-600" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Community Mentions</p>
                    <p className="text-sm text-foreground-secondary">When someone mentions you in the community</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                </label>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-6">
          <Card variant="default" className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Display Preferences</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Language</label>
                <select 
                  defaultValue={settings?.preferences.language}
                  className="w-full px-4 py-3 rounded-xl border border-[rgba(61,58,54,0.12)] bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                >
                  <option value="en">English</option>
                  <option value="sw">Swahili</option>
                  <option value="lg">Luganda</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Timezone</label>
                <select 
                  defaultValue={settings?.preferences.timezone}
                  className="w-full px-4 py-3 rounded-xl border border-[rgba(61,58,54,0.12)] bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                >
                  <option value="Africa/Kampala">Kampala (EAT)</option>
                  <option value="Africa/Nairobi">Nairobi (EAT)</option>
                  <option value="Africa/Lagos">Lagos (WAT)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Date Format</label>
                <select 
                  defaultValue={settings?.preferences.dateFormat}
                  className="w-full px-4 py-3 rounded-xl border border-[rgba(61,58,54,0.12)] bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                >
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Theme</label>
                <div className="grid grid-cols-3 gap-3">
                  <button className="p-4 border-2 border-accent bg-white rounded-xl text-center">
                    <div className="w-8 h-8 bg-white border border-gray-200 rounded-lg mx-auto mb-2"></div>
                    <span className="text-sm font-medium">Light</span>
                  </button>
                  <button className="p-4 border border-[rgba(61,58,54,0.12)] bg-gray-900 rounded-xl text-center">
                    <div className="w-8 h-8 bg-gray-800 rounded-lg mx-auto mb-2"></div>
                    <span className="text-sm font-medium text-white">Dark</span>
                  </button>
                  <button className="p-4 border border-[rgba(61,58,54,0.12)] bg-gradient-to-br from-white to-gray-900 rounded-xl text-center">
                    <div className="w-8 h-8 bg-gradient-to-br from-white to-gray-800 rounded-lg mx-auto mb-2"></div>
                    <span className="text-sm font-medium">System</span>
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Privacy Tab */}
        <TabsContent value="privacy" className="space-y-6">
          <Card variant="default" className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Privacy Settings</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-[rgba(61,58,54,0.08)]">
                <div>
                  <p className="font-medium text-foreground">Profile Visibility</p>
                  <p className="text-sm text-foreground-secondary">Make your profile visible to other users</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                </label>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-[rgba(61,58,54,0.08)]">
                <div>
                  <p className="font-medium text-foreground">Show Email</p>
                  <p className="text-sm text-foreground-secondary">Display your email on your profile</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                </label>
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium text-foreground">Show Phone</p>
                  <p className="text-sm text-foreground-secondary">Display your phone number on your profile</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                </label>
              </div>
            </div>
          </Card>

          <Card variant="default" className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Security</h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Shield className="w-4 h-4 mr-2" />
                Change Password
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Smartphone className="w-4 h-4 mr-2" />
                Two-Factor Authentication
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="mt-6 flex justify-end">
        <Button variant="primary" isLoading={isSaving} onClick={handleSave}>
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </DashboardLayout>
  );
}
