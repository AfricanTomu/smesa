import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/templates';
import { Card, Button } from '@/components/atoms';
import { VideoCard } from '@/components/molecules';
import { useTrainingStore } from '@/store';
import { 
  Search, 
  Play,
  BookOpen,
  Clock,
  Award,
  CheckCircle,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const categories = ['All', 'ICT Basics', 'Lesson Design', 'Assessment', 'Classroom Management', 'Digital Tools'];

export default function Training() {
  const { videos, progress, fetchVideos } = useTrainingStore();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<typeof videos[0] | null>(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const filteredVideos = videos.filter(video => {
    const matchesCategory = selectedCategory === 'All' || video.category === selectedCategory;
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const completedVideos = Object.values(progress).filter(p => p === 100).length;
  const totalProgress = videos.length > 0 ? (completedVideos / videos.length) * 100 : 0;

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">ICT Training</h1>
          <p className="text-foreground-secondary mt-1">
            Learn essential digital skills for modern teaching
          </p>
        </div>
      </div>

      {/* Progress Overview */}
      <Card variant="default" className="p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center">
              <Award className="w-8 h-8 text-accent" />
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">{Math.round(totalProgress)}%</p>
              <p className="text-sm text-foreground-secondary">Overall Progress</p>
            </div>
          </div>
          <div className="flex-1">
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-accent rounded-full transition-all duration-500"
                style={{ width: `${totalProgress}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-sm text-foreground-secondary">
              <span>{completedVideos} completed</span>
              <span>{videos.length} total courses</span>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{completedVideos}</p>
              <p className="text-xs text-foreground-secondary">Completed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{videos.length - completedVideos}</p>
              <p className="text-xs text-foreground-secondary">In Progress</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Search and Filter */}
      <Card variant="default" className="p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-secondary" />
            <input
              type="text"
              placeholder="Search courses..."
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

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            progress={progress[video.id] || 0}
            onClick={() => setSelectedVideo(video)}
          />
        ))}
      </div>

      {/* Video Player Dialog */}
      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          {selectedVideo && (
            <>
              <div className="aspect-video bg-black flex items-center justify-center">
                <div className="text-center text-white">
                  <Play className="w-16 h-16 mx-auto mb-4 opacity-80" />
                  <p className="text-lg">{selectedVideo.title}</p>
                  <p className="text-sm opacity-60">Click to play video</p>
                </div>
              </div>
              <div className="p-6">
                <DialogHeader>
                  <DialogTitle>{selectedVideo.title}</DialogTitle>
                </DialogHeader>
                <div className="flex items-center gap-4 mt-4 text-sm text-foreground-secondary">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {Math.floor(selectedVideo.duration / 60)} minutes
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {selectedVideo.category}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    selectedVideo.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                    selectedVideo.difficulty === 'intermediate' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {selectedVideo.difficulty}
                  </span>
                </div>
                <p className="mt-4 text-foreground-secondary">
                  {selectedVideo.description}
                </p>
                {selectedVideo.resources.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-medium text-foreground mb-2">Resources</h4>
                    <div className="space-y-2">
                      {selectedVideo.resources.map((resource) => (
                        <a
                          key={resource.id}
                          href={resource.url}
                          className="flex items-center gap-2 p-3 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
                        >
                          <BookOpen className="w-4 h-4 text-accent" />
                          <span className="text-sm">{resource.title}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                <div className="mt-6 flex gap-3">
                  <Button variant="primary" className="flex-1">
                    <Play className="w-4 h-4 mr-2" />
                    Start Learning
                  </Button>
                  <Button variant="outline">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark Complete
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
