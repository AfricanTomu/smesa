import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/templates';
import { Card, Button } from '@/components/atoms';
import { useAssessmentStore, useStudentStore } from '@/store';
import { 
  Plus, 
  Search, 
  FileText, 
  Clock, 
  Users,
  Calendar,
  CheckCircle,
  MoreVertical,
  Edit,
  Trash2,
  Copy,
  Eye,
  BarChart3,
  GripVertical,
  BookOpen,
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

const subjects = ['Mathematics', 'Science', 'English', 'Social Studies'];
const classes = ['Primary 1', 'Primary 2', 'Primary 3', 'Primary 4', 'Primary 5', 'Primary 6', 'Primary 7'];
const questionTypes = [
  { value: 'multiple_choice', label: 'Multiple Choice' },
  { value: 'true_false', label: 'True/False' },
  { value: 'short_answer', label: 'Short Answer' },
  { value: 'essay', label: 'Essay' },
];

export default function Assessments() {
  const { assessments, fetchAssessments, createAssessment, selectAssessment, selectedAssessment } = useAssessmentStore();
  const { students: _students } = useStudentStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [newAssessment, setNewAssessment] = useState({
    title: '',
    description: '',
    subject: 'Mathematics',
    className: 'Primary 4',
    type: 'quiz' as const,
    maxScore: 100,
    dueDate: '',
    questions: [] as { id: string; type: 'multiple_choice' | 'true_false' | 'short_answer' | 'essay'; question: string; options?: string[]; correctAnswer?: string; points: number }[],
  });
  const [currentQuestion, setCurrentQuestion] = useState<{
    type: 'multiple_choice' | 'true_false' | 'short_answer' | 'essay';
    question: string;
    options: string[];
    correctAnswer: string;
    points: number;
  }>({
    type: 'multiple_choice',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    points: 5,
  });

  useEffect(() => {
    fetchAssessments();
  }, []);

  const filteredAssessments = assessments.filter(assessment => {
    const matchesSearch = assessment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         assessment.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'published' && assessment.status === 'published') ||
                      (activeTab === 'draft' && assessment.status === 'draft') ||
                      (activeTab === 'completed' && assessment.status === 'completed');
    return matchesSearch && matchesTab;
  });

  const handleAddQuestion = () => {
    if (!currentQuestion.question) return;
    
    const newQ = {
      id: `q-${Date.now()}`,
      ...currentQuestion,
    };
    
    setNewAssessment({
      ...newAssessment,
      questions: [...newAssessment.questions, newQ],
    });
    
    setCurrentQuestion({
      type: 'multiple_choice',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: '',
      points: 5,
    });
  };

  const handleCreateAssessment = async () => {
    await createAssessment({
      ...newAssessment,
      term: 'Term 1',
      year: 2025,
      teacherId: 'teacher-1',
      studentResults: [],
      status: 'draft',
      dueDate: newAssessment.dueDate ? new Date(newAssessment.dueDate) : undefined,
    });
    setIsCreateDialogOpen(false);
    setNewAssessment({
      title: '',
      description: '',
      subject: 'Mathematics',
      className: 'Primary 4',
      type: 'quiz',
      maxScore: 100,
      dueDate: '',
      questions: [],
    });
  };

  const handleViewAssessment = (id: string) => {
    selectAssessment(id);
    setIsViewDialogOpen(true);
  };

  const totalPoints = newAssessment.questions.reduce((sum, q) => sum + q.points, 0);

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Assessments</h1>
          <p className="text-foreground-secondary mt-1">
            Create and manage student assessments
          </p>
        </div>
        <Button variant="primary" onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Assessment
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card variant="default" className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{assessments.length}</p>
              <p className="text-xs text-foreground-secondary">Total</p>
            </div>
          </div>
        </Card>
        <Card variant="default" className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{assessments.filter(a => a.status === 'published').length}</p>
              <p className="text-xs text-foreground-secondary">Published</p>
            </div>
          </div>
        </Card>
        <Card variant="default" className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{assessments.filter(a => a.status === 'draft').length}</p>
              <p className="text-xs text-foreground-secondary">Drafts</p>
            </div>
          </div>
        </Card>
        <Card variant="default" className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{assessments.filter(a => a.status === 'completed').length}</p>
              <p className="text-xs text-foreground-secondary">Completed</p>
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
              placeholder="Search assessments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-[rgba(61,58,54,0.12)] bg-white text-foreground placeholder:text-foreground-secondary/60 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
            />
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
            <TabsList className="bg-muted">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="published">Published</TabsTrigger>
              <TabsTrigger value="draft">Drafts</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </Card>

      {/* Assessments List */}
      <div className="space-y-3">
        {filteredAssessments.map((assessment) => (
          <Card key={assessment.id} variant="hover" className="p-4 cursor-pointer" onClick={() => handleViewAssessment(assessment.id)}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    assessment.status === 'published' ? 'bg-green-100 text-green-700' :
                    assessment.status === 'draft' ? 'bg-amber-100 text-amber-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {assessment.status}
                  </span>
                  <span className="px-2 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium">
                    {assessment.type}
                  </span>
                </div>
                
                <h3 className="font-semibold text-foreground mb-1">{assessment.title}</h3>
                <p className="text-sm text-foreground-secondary mb-2">{assessment.description}</p>
                
                <div className="flex items-center gap-4 text-sm text-foreground-secondary">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {assessment.subject}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {assessment.className}
                  </span>
                  <span className="flex items-center gap-1">
                    <FileText className="w-4 h-4" />
                    {assessment.questions.length} questions
                  </span>
                  <span className="flex items-center gap-1">
                    <BarChart3 className="w-4 h-4" />
                    {assessment.maxScore} marks
                  </span>
                  {assessment.dueDate && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Due {new Date(assessment.dueDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <button className="p-2 hover:bg-muted rounded-lg">
                      <MoreVertical className="w-4 h-4 text-foreground-secondary" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem><Eye className="w-4 h-4 mr-2" /> View</DropdownMenuItem>
                    <DropdownMenuItem><Edit className="w-4 h-4 mr-2" /> Edit</DropdownMenuItem>
                    <DropdownMenuItem><Copy className="w-4 h-4 mr-2" /> Duplicate</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-500"><Trash2 className="w-4 h-4 mr-2" /> Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Create Assessment Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Assessment</DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="questions">Questions ({newAssessment.questions.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="space-y-4 py-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Assessment Title</label>
                <input
                  type="text"
                  value={newAssessment.title}
                  onChange={(e) => setNewAssessment({ ...newAssessment, title: e.target.value })}
                  placeholder="e.g., Mathematics Mid-Term Exam"
                  className="w-full px-4 py-2 rounded-xl border border-[rgba(61,58,54,0.12)]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Description</label>
                <textarea
                  value={newAssessment.description}
                  onChange={(e) => setNewAssessment({ ...newAssessment, description: e.target.value })}
                  placeholder="Brief description of the assessment"
                  rows={2}
                  className="w-full px-4 py-2 rounded-xl border border-[rgba(61,58,54,0.12)] resize-none"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Subject</label>
                  <select
                    value={newAssessment.subject}
                    onChange={(e) => setNewAssessment({ ...newAssessment, subject: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-[rgba(61,58,54,0.12)]"
                  >
                    {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Class</label>
                  <select
                    value={newAssessment.className}
                    onChange={(e) => setNewAssessment({ ...newAssessment, className: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-[rgba(61,58,54,0.12)]"
                  >
                    {classes.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Type</label>
                  <select
                    value={newAssessment.type}
                    onChange={(e) => setNewAssessment({ ...newAssessment, type: e.target.value as any })}
                    className="w-full px-4 py-2 rounded-xl border border-[rgba(61,58,54,0.12)]"
                  >
                    <option value="quiz">Quiz</option>
                    <option value="exam">Exam</option>
                    <option value="formative">Formative</option>
                    <option value="summative">Summative</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Due Date</label>
                  <input
                    type="date"
                    value={newAssessment.dueDate}
                    onChange={(e) => setNewAssessment({ ...newAssessment, dueDate: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-[rgba(61,58,54,0.12)]"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="questions" className="space-y-4 py-4">
              {/* Questions List */}
              <div className="space-y-3 mb-6">
                {newAssessment.questions.map((q, idx) => (
                  <div key={q.id} className="p-4 bg-muted rounded-xl">
                    <div className="flex items-start gap-3">
                      <GripVertical className="w-5 h-5 text-foreground-secondary mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-foreground">Question {idx + 1}</span>
                          <span className="text-sm text-accent">{q.points} pts</span>
                        </div>
                        <p className="text-foreground">{q.question}</p>
                        {q.options && (
                          <div className="mt-2 space-y-1">
                            {q.options.map((opt, i) => (
                              <div key={i} className={`text-sm ${opt === q.correctAnswer ? 'text-green-600 font-medium' : 'text-foreground-secondary'}`}>
                                {String.fromCharCode(65 + i)}. {opt} {opt === q.correctAnswer && '✓'}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <button 
                        onClick={() => setNewAssessment({ ...newAssessment, questions: newAssessment.questions.filter((_, i) => i !== idx) })}
                        className="p-1 hover:bg-red-100 rounded text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Add Question Form */}
              <div className="p-4 border border-[rgba(61,58,54,0.12)] rounded-xl">
                <h4 className="font-medium text-foreground mb-3">Add Question</h4>
                
                <div className="space-y-3">
                  <div>
                    <select
                      value={currentQuestion.type}
                      onChange={(e) => setCurrentQuestion({ ...currentQuestion, type: e.target.value as 'multiple_choice' | 'true_false' | 'short_answer' | 'essay' })}
                      className="w-full px-4 py-2 rounded-xl border border-[rgba(61,58,54,0.12)]"
                    >
                      {questionTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </select>
                  </div>
                  
                  <textarea
                    value={currentQuestion.question}
                    onChange={(e) => setCurrentQuestion({ ...currentQuestion, question: e.target.value })}
                    placeholder="Enter your question..."
                    rows={2}
                    className="w-full px-4 py-2 rounded-xl border border-[rgba(61,58,54,0.12)] resize-none"
                  />
                  
                  {currentQuestion.type === 'multiple_choice' && (
                    <div className="space-y-2">
                      {currentQuestion.options.map((opt, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="correct"
                            checked={currentQuestion.correctAnswer === opt}
                            onChange={() => setCurrentQuestion({ ...currentQuestion, correctAnswer: opt })}
                            className="w-4 h-4"
                          />
                          <input
                            type="text"
                            value={opt}
                            onChange={(e) => {
                              const opts = [...currentQuestion.options];
                              opts[idx] = e.target.value;
                              setCurrentQuestion({ ...currentQuestion, options: opts });
                            }}
                            placeholder={`Option ${String.fromCharCode(65 + idx)}`}
                            className="flex-1 px-3 py-2 rounded-lg border border-[rgba(61,58,54,0.12)]"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center gap-4">
                    <div>
                      <label className="text-sm text-foreground-secondary">Points</label>
                      <input
                        type="number"
                        value={currentQuestion.points}
                        onChange={(e) => setCurrentQuestion({ ...currentQuestion, points: parseInt(e.target.value) })}
                        className="w-20 px-3 py-2 rounded-lg border border-[rgba(61,58,54,0.12)]"
                      />
                    </div>
                    <Button variant="outline" size="sm" onClick={handleAddQuestion} className="mt-5">
                      <Plus className="w-4 h-4 mr-1" /> Add Question
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t">
                <span className="text-sm text-foreground-secondary">
                  Total: {newAssessment.questions.length} questions, {totalPoints} points
                </span>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" className="flex-1" onClick={handleCreateAssessment}>
              Save Assessment
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Assessment Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedAssessment && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    selectedAssessment.status === 'published' ? 'bg-green-100 text-green-700' :
                    selectedAssessment.status === 'draft' ? 'bg-amber-100 text-amber-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {selectedAssessment.status}
                  </span>
                  <span className="px-2 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium">
                    {selectedAssessment.type}
                  </span>
                </div>
                <DialogTitle className="text-xl">{selectedAssessment.title}</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <p className="text-foreground-secondary">{selectedAssessment.description}</p>
                
                <div className="flex items-center gap-6 text-sm text-foreground-secondary">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {selectedAssessment.subject}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {selectedAssessment.className}
                  </span>
                  <span className="flex items-center gap-1">
                    <BarChart3 className="w-4 h-4" />
                    {selectedAssessment.maxScore} marks
                  </span>
                </div>
                
                <div className="border-t border-[rgba(61,58,54,0.08)] pt-4">
                  <h4 className="font-semibold text-foreground mb-3">Questions ({selectedAssessment.questions.length})</h4>
                  <div className="space-y-4">
                    {selectedAssessment.questions.map((q, idx) => (
                      <div key={q.id} className="p-4 bg-muted rounded-xl">
                        <div className="flex items-start gap-3">
                          <span className="w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">
                            {idx + 1}
                          </span>
                          <div className="flex-1">
                            <p className="text-foreground mb-2">{q.question}</p>
                            <span className="text-sm text-accent">{q.points} points</span>
                            {q.options && (
                              <div className="mt-2 space-y-1">
                                {q.options.map((opt, i) => (
                                  <div key={i} className={`text-sm ${opt === q.correctAnswer ? 'text-green-600 font-medium' : 'text-foreground-secondary'}`}>
                                    {String.fromCharCode(65 + i)}. {opt} {opt === q.correctAnswer && '✓'}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1">
                    <Edit className="w-4 h-4 mr-2" /> Edit
                  </Button>
                  <Button variant="primary" className="flex-1">
                    <CheckCircle className="w-4 h-4 mr-2" /> Publish
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
