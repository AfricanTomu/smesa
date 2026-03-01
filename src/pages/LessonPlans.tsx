import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/templates';
import { Card, Button } from '@/components/atoms';
import { useLessonPlanStore, useAuthStore } from '@/store';
import { 
  Plus, 
  Search, 
  BookOpen, 
  Clock, 
  Users,
  Calendar,
  FileText,
  Share2,
  MoreVertical,
  ChevronRight,
  CheckCircle,
  Edit,
  Trash2,
  Copy,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const subjects = ['All', 'Mathematics', 'Science', 'English', 'Social Studies', 'Arts', 'Physical Education'];
const classes = ['All', 'Primary 1', 'Primary 2', 'Primary 3', 'Primary 4', 'Primary 5', 'Primary 6', 'Primary 7'];

export default function LessonPlans() {
  const { lessonPlans, fetchLessonPlans, createLessonPlan, selectPlan, selectedPlan } = useLessonPlanStore();
  const { user } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedClass, setSelectedClass] = useState('All');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [newPlan, setNewPlan] = useState({
    title: '',
    subject: 'Mathematics',
    className: 'Primary 4',
    duration: 60,
    objectives: [{ objective: '', successCriteria: '' }],
    introduction: '',
    mainActivities: [{ title: '', description: '', duration: 15, type: 'whole_class' as const }],
    conclusion: '',
    assessment: '',
  });

  useEffect(() => {
    fetchLessonPlans();
  }, []);

  const filteredPlans = lessonPlans.filter(plan => {
    const matchesSearch = plan.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         plan.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === 'All' || plan.subject === selectedSubject;
    const matchesClass = selectedClass === 'All' || plan.className === selectedClass;
    return matchesSearch && matchesSubject && matchesClass;
  });

  const handleViewPlan = (planId: string) => {
    selectPlan(planId);
    setIsViewDialogOpen(true);
  };

  const handleCreatePlan = async () => {
    await createLessonPlan({
      ...newPlan,
      term: 'Term 1',
      year: 2025,
      materials: [],
      differentiation: '',
      homework: '',
      references: [],
      resources: [],
      createdBy: user?.id || '',
      isShared: false,
      isTemplate: false,
      status: 'draft',
      tags: [],
      objectives: newPlan.objectives.map((obj, idx) => ({
        id: `obj-${idx}-${Date.now()}`,
        objective: obj.objective,
        successCriteria: obj.successCriteria,
      })),
      mainActivities: newPlan.mainActivities.map((act, idx) => ({
        id: `act-${idx}-${Date.now()}`,
        title: act.title,
        description: act.description,
        duration: act.duration,
        type: act.type,
      })),
    });
    setIsCreateDialogOpen(false);
    setNewPlan({
      title: '',
      subject: 'Mathematics',
      className: 'Primary 4',
      duration: 60,
      objectives: [{ objective: '', successCriteria: '' }],
      introduction: '',
      mainActivities: [{ title: '', description: '', duration: 15, type: 'whole_class' }],
      conclusion: '',
      assessment: '',
    });
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Lesson Plans</h1>
          <p className="text-foreground-secondary mt-1">
            Create and manage research-based lesson plans
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <FileText className="w-4 h-4 mr-2" />
            Templates
          </Button>
          <Button variant="primary" onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Plan
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card variant="default" className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{lessonPlans.length}</p>
              <p className="text-xs text-foreground-secondary">Total Plans</p>
            </div>
          </div>
        </Card>
        <Card variant="default" className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{lessonPlans.filter(p => p.status === 'published').length}</p>
              <p className="text-xs text-foreground-secondary">Published</p>
            </div>
          </div>
        </Card>
        <Card variant="default" className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Share2 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{lessonPlans.filter(p => p.isShared).length}</p>
              <p className="text-xs text-foreground-secondary">Shared</p>
            </div>
          </div>
        </Card>
        <Card variant="default" className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{Math.round(lessonPlans.reduce((acc, p) => acc + p.duration, 0) / (lessonPlans.length || 1))}</p>
              <p className="text-xs text-foreground-secondary">Avg Duration (min)</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card variant="default" className="p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-secondary" />
            <input
              type="text"
              placeholder="Search lesson plans..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-[rgba(61,58,54,0.12)] bg-white text-foreground placeholder:text-foreground-secondary/60 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-4 py-3 rounded-xl border border-[rgba(61,58,54,0.12)] bg-white text-sm"
            >
              {subjects.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-4 py-3 rounded-xl border border-[rgba(61,58,54,0.12)] bg-white text-sm"
            >
              {classes.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
      </Card>

      {/* Lesson Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPlans.map((plan) => (
          <Card key={plan.id} variant="hover" className="p-5 cursor-pointer" onClick={() => handleViewPlan(plan.id)}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  plan.status === 'published' ? 'bg-green-100 text-green-700' :
                  plan.status === 'draft' ? 'bg-amber-100 text-amber-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {plan.status}
                </span>
                {plan.isShared && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    Shared
                  </span>
                )}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                  <button className="p-1 hover:bg-muted rounded-lg">
                    <MoreVertical className="w-4 h-4 text-foreground-secondary" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem><Edit className="w-4 h-4 mr-2" /> Edit</DropdownMenuItem>
                  <DropdownMenuItem><Copy className="w-4 h-4 mr-2" /> Duplicate</DropdownMenuItem>
                  <DropdownMenuItem><Share2 className="w-4 h-4 mr-2" /> Share</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-500"><Trash2 className="w-4 h-4 mr-2" /> Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <h3 className="font-semibold text-foreground mb-2 line-clamp-2">{plan.title}</h3>
            
            <div className="flex items-center gap-4 text-sm text-foreground-secondary mb-3">
              <span className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                {plan.subject}
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {plan.className}
              </span>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-foreground-secondary">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {plan.duration} min
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(plan.createdAt).toLocaleDateString()}
              </span>
            </div>
            
            <div className="mt-4 pt-4 border-t border-[rgba(61,58,54,0.08)]">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground-secondary">By {plan.createdByName}</span>
                <ChevronRight className="w-4 h-4 text-accent" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Lesson Plan</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Lesson Title</label>
              <input
                type="text"
                value={newPlan.title}
                onChange={(e) => setNewPlan({ ...newPlan, title: e.target.value })}
                placeholder="e.g., Introduction to Fractions"
                className="w-full px-4 py-2 rounded-xl border border-[rgba(61,58,54,0.12)]"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Subject</label>
                <select
                  value={newPlan.subject}
                  onChange={(e) => setNewPlan({ ...newPlan, subject: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-[rgba(61,58,54,0.12)]"
                >
                  {subjects.filter(s => s !== 'All').map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Class</label>
                <select
                  value={newPlan.className}
                  onChange={(e) => setNewPlan({ ...newPlan, className: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-[rgba(61,58,54,0.12)]"
                >
                  {classes.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Duration (min)</label>
                <input
                  type="number"
                  value={newPlan.duration}
                  onChange={(e) => setNewPlan({ ...newPlan, duration: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 rounded-xl border border-[rgba(61,58,54,0.12)]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Learning Objectives</label>
              {newPlan.objectives.map((obj, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={obj.objective}
                    onChange={(e) => {
                      const objs = [...newPlan.objectives];
                      objs[idx].objective = e.target.value;
                      setNewPlan({ ...newPlan, objectives: objs });
                    }}
                    placeholder="Students will be able to..."
                    className="flex-1 px-4 py-2 rounded-xl border border-[rgba(61,58,54,0.12)]"
                  />
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => setNewPlan({ ...newPlan, objectives: [...newPlan.objectives, { objective: '', successCriteria: '' }] })}>
                <Plus className="w-4 h-4 mr-1" /> Add Objective
              </Button>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Introduction</label>
              <textarea
                value={newPlan.introduction}
                onChange={(e) => setNewPlan({ ...newPlan, introduction: e.target.value })}
                placeholder="How will you introduce the lesson?"
                rows={3}
                className="w-full px-4 py-2 rounded-xl border border-[rgba(61,58,54,0.12)] resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Main Activities</label>
              {newPlan.mainActivities.map((act, idx) => (
                <div key={idx} className="p-3 bg-muted rounded-xl mb-2">
                  <input
                    type="text"
                    value={act.title}
                    onChange={(e) => {
                      const acts = [...newPlan.mainActivities];
                      acts[idx].title = e.target.value;
                      setNewPlan({ ...newPlan, mainActivities: acts });
                    }}
                    placeholder="Activity title"
                    className="w-full px-3 py-2 rounded-lg border border-[rgba(61,58,54,0.12)] mb-2"
                  />
                  <textarea
                    value={act.description}
                    onChange={(e) => {
                      const acts = [...newPlan.mainActivities];
                      acts[idx].description = e.target.value;
                      setNewPlan({ ...newPlan, mainActivities: acts });
                    }}
                    placeholder="Activity description"
                    rows={2}
                    className="w-full px-3 py-2 rounded-lg border border-[rgba(61,58,54,0.12)] resize-none"
                  />
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => setNewPlan({ ...newPlan, mainActivities: [...newPlan.mainActivities, { title: '', description: '', duration: 15, type: 'whole_class' }] })}>
                <Plus className="w-4 h-4 mr-1" /> Add Activity
              </Button>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Conclusion</label>
              <textarea
                value={newPlan.conclusion}
                onChange={(e) => setNewPlan({ ...newPlan, conclusion: e.target.value })}
                placeholder="How will you conclude the lesson?"
                rows={2}
                className="w-full px-4 py-2 rounded-xl border border-[rgba(61,58,54,0.12)] resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Assessment</label>
              <textarea
                value={newPlan.assessment}
                onChange={(e) => setNewPlan({ ...newPlan, assessment: e.target.value })}
                placeholder="How will you assess learning?"
                rows={2}
                className="w-full px-4 py-2 rounded-xl border border-[rgba(61,58,54,0.12)] resize-none"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button variant="outline" className="flex-1" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" className="flex-1" onClick={handleCreatePlan}>
                Save Lesson Plan
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedPlan && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    selectedPlan.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {selectedPlan.status}
                  </span>
                  <span className="px-2 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium">
                    {selectedPlan.subject}
                  </span>
                </div>
                <DialogTitle className="text-xl">{selectedPlan.title}</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6 py-4">
                <div className="flex items-center gap-6 text-sm text-foreground-secondary">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {selectedPlan.className}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {selectedPlan.duration} minutes
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(selectedPlan.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Learning Objectives</h4>
                  <ul className="space-y-2">
                    {selectedPlan.objectives.map((obj, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-foreground">{obj.objective}</p>
                          {obj.successCriteria && (
                            <p className="text-sm text-foreground-secondary">Success criteria: {obj.successCriteria}</p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Introduction</h4>
                  <p className="text-foreground-secondary">{selectedPlan.introduction}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Main Activities</h4>
                  <div className="space-y-3">
                    {selectedPlan.mainActivities.map((act, idx) => (
                      <div key={idx} className="p-4 bg-muted rounded-xl">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-foreground">{act.title}</span>
                          <span className="text-sm text-foreground-secondary">{act.duration} min</span>
                        </div>
                        <p className="text-sm text-foreground-secondary">{act.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Conclusion</h4>
                  <p className="text-foreground-secondary">{selectedPlan.conclusion}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Assessment</h4>
                  <p className="text-foreground-secondary">{selectedPlan.assessment}</p>
                </div>

                {selectedPlan.references.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">References</h4>
                    <ul className="space-y-1">
                      {selectedPlan.references.map((ref, idx) => (
                        <li key={idx} className="text-sm text-foreground-secondary">
                          {ref.author} ({ref.year}). <em>{ref.title}</em>.
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1">
                    <Edit className="w-4 h-4 mr-2" /> Edit
                  </Button>
                  <Button variant="primary" className="flex-1">
                    <Share2 className="w-4 h-4 mr-2" /> Share
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
