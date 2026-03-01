import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/templates';
import { Card, Button } from '@/components/atoms';
import { EventCard, BlogCard } from '@/components/molecules';
import { useEventStore, useBlogStore } from '@/store';
import { 
  Plus, 
  ArrowRight,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function Events() {
  const { events, fetchEvents } = useEventStore();
  const { posts, fetchPosts } = useBlogStore();
  const [activeTab, setActiveTab] = useState<'events' | 'stories'>('events');

  useEffect(() => {
    fetchEvents();
    fetchPosts();
  }, []);

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Events & Stories</h1>
          <p className="text-foreground-secondary mt-1">
            Discover upcoming events and read success stories
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('events')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'events'
                ? 'bg-accent text-white'
                : 'bg-muted text-foreground-secondary hover:bg-muted/80'
            }`}
          >
            Events
          </button>
          <button
            onClick={() => setActiveTab('stories')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'stories'
                ? 'bg-accent text-white'
                : 'bg-muted text-foreground-secondary hover:bg-muted/80'
            }`}
          >
            Stories
          </button>
        </div>
      </div>

      {activeTab === 'events' ? (
        <>
          {/* Upcoming Events Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Upcoming Events</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Event
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Create New Event</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Event Title</label>
                      <input type="text" className="w-full px-4 py-2 rounded-xl border border-[rgba(61,58,54,0.12)]" placeholder="Enter event title" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Date</label>
                        <input type="date" className="w-full px-4 py-2 rounded-xl border border-[rgba(61,58,54,0.12)]" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Time</label>
                        <input type="time" className="w-full px-4 py-2 rounded-xl border border-[rgba(61,58,54,0.12)]" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Location</label>
                      <input type="text" className="w-full px-4 py-2 rounded-xl border border-[rgba(61,58,54,0.12)]" placeholder="Enter location or " />
                    </div>
                    <Button variant="primary" className="w-full">Create Event</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>

          {/* Calendar Preview */}
          <Card variant="default" className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">This Month</h2>
              <Button variant="ghost" size="sm" className="text-accent">
                View Full Calendar
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-xs font-medium text-foreground-secondary py-2">
                  {day}
                </div>
              ))}
              {Array.from({ length: 28 }, (_, i) => (
                <button
                  key={i}
                  className={`aspect-square rounded-xl flex items-center justify-center text-sm transition-colors ${
                    i === 14
                      ? 'bg-accent text-white'
                      : 'hover:bg-muted text-foreground'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </Card>
        </>
      ) : (
        <>
          {/* Featured Story */}
          {posts[0] && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-foreground mb-4">Featured Story</h2>
              <BlogCard post={posts[0]} variant="featured" />
            </div>
          )}

          {/* More Stories */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">More Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {posts.slice(1).map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
}
