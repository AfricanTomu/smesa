import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/templates';
import { Card, Button } from '@/components/atoms';
import { ForumTopicCard } from '@/components/molecules';
import { useForumStore } from '@/store';
import { 
  Plus, 
  Search, 
  TrendingUp,
  MessageSquare,
  Users,
  ThumbsUp,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const categories = ['All', 'Teaching Strategies', 'Classroom Management', 'ICT Integration', 'General Discussion'];

export default function Community() {
  const { topics, fetchTopics, createTopic } = useForumStore();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newTopic, setNewTopic] = useState({ title: '', content: '', category: 'General Discussion' });

  useEffect(() => {
    fetchTopics();
  }, []);

  const filteredTopics = topics.filter(topic => {
    const matchesCategory = selectedCategory === 'All' || topic.category === selectedCategory;
    const matchesSearch = topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         topic.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCreateTopic = async () => {
    await createTopic({
      title: newTopic.title,
      content: newTopic.content,
      authorId: 'current-user',
      authorName: 'Current User',
      category: newTopic.category,
      tags: [],
      isPinned: false,
    });
    setIsCreateDialogOpen(false);
    setNewTopic({ title: '', content: '', category: 'General Discussion' });
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Teacher Community</h1>
          <p className="text-foreground-secondary mt-1">
            Connect, share, and learn from educators across schools
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="primary">
              <Plus className="w-4 h-4 mr-2" />
              New Discussion
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Start a New Discussion</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Title</label>
                <input
                  type="text"
                  value={newTopic.title}
                  onChange={(e) => setNewTopic({ ...newTopic, title: e.target.value })}
                  placeholder="What's on your mind?"
                  className="w-full px-4 py-2 rounded-xl border border-[rgba(61,58,54,0.12)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Category</label>
                <select
                  value={newTopic.category}
                  onChange={(e) => setNewTopic({ ...newTopic, category: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-[rgba(61,58,54,0.12)]"
                >
                  {categories.filter(c => c !== 'All').map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Content</label>
                <textarea
                  value={newTopic.content}
                  onChange={(e) => setNewTopic({ ...newTopic, content: e.target.value })}
                  placeholder="Share your thoughts, questions, or ideas..."
                  rows={4}
                  className="w-full px-4 py-2 rounded-xl border border-[rgba(61,58,54,0.12)] resize-none"
                />
              </div>
              <Button variant="primary" className="w-full" onClick={handleCreateTopic}>
                Post Discussion
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card variant="default" className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{topics.length}</p>
              <p className="text-xs text-foreground-secondary">Discussions</p>
            </div>
          </div>
        </Card>
        <Card variant="default" className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">156</p>
              <p className="text-xs text-foreground-secondary">Members</p>
            </div>
          </div>
        </Card>
        <Card variant="default" className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">24</p>
              <p className="text-xs text-foreground-secondary">This Week</p>
            </div>
          </div>
        </Card>
        <Card variant="default" className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
              <ThumbsUp className="w-5 h-5 text-pink-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">1.2k</p>
              <p className="text-xs text-foreground-secondary">Total Likes</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card variant="default" className="p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-secondary" />
            <input
              type="text"
              placeholder="Search discussions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-[rgba(61,58,54,0.12)] bg-white text-foreground placeholder:text-foreground-secondary/60 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'bg-accent text-white'
                    : 'bg-muted text-foreground-secondary hover:bg-muted/80'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Topics List */}
      <div className="space-y-4">
        {filteredTopics.length === 0 ? (
          <Card variant="default" className="p-12 text-center">
            <MessageSquare className="w-12 h-12 text-foreground-secondary mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground">No discussions yet</h3>
            <p className="text-foreground-secondary mt-1">Be the first to start a discussion!</p>
            <Button variant="primary" className="mt-4" onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Start Discussion
            </Button>
          </Card>
        ) : (
          filteredTopics.map((topic) => (
            <ForumTopicCard key={topic.id} topic={topic} />
          ))
        )}
      </div>
    </DashboardLayout>
  );
}
