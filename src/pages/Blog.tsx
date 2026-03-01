import { useState } from 'react';
import { DashboardLayout } from '@/components/templates';
import { Card, Button, Avatar } from '@/components/atoms';
import { 
  Search, 
  Calendar,
  Clock,
  User,
  ArrowRight,
  ChevronLeft,
  Tag,
  Share2,
  Bookmark,
  Heart,
  MessageSquare,
  TrendingUp,
  Eye,
} from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
    role: string;
  };
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: number;
  image?: string;
  featured: boolean;
  views: number;
  likes: number;
  comments: number;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'SMESA Launches New ICT Training Module for Rural Schools',
    excerpt: 'We are excited to announce the rollout of our comprehensive ICT training program designed specifically for teachers in rural Uganda, bringing digital literacy to every classroom.',
    content: `SMESA is proud to announce the launch of our new ICT Training Module, a comprehensive program designed to bridge the digital divide in Ugandan education. This initiative focuses on equipping teachers in rural areas with essential digital skills and tools to enhance their teaching methods.

The program includes:
- Basic computer literacy training
- Integration of digital tools in lesson planning
- Online resource utilization
- Student assessment through digital platforms
- Virtual collaboration techniques

Our pilot program has already shown remarkable results, with participating teachers reporting a 40% increase in student engagement when using digital teaching methods. We believe this is just the beginning of a transformative journey for education in Uganda.

The training is structured in progressive modules, allowing teachers to learn at their own pace while receiving continuous support from our expert trainers. Schools can now register for the program through their SMESA dashboard.`,
    author: {
      name: 'Dr. Sarah Namukasa',
      role: 'Education Director',
    },
    category: 'Announcements',
    tags: ['ICT Training', 'Digital Literacy', 'Rural Education'],
    publishedAt: '2025-02-28',
    readTime: 5,
    featured: true,
    views: 1245,
    likes: 89,
    comments: 23,
  },
  {
    id: '2',
    title: '2025 National Education Conference: Key Takeaways',
    excerpt: 'The annual National Education Conference brought together over 500 educators to discuss the future of learning in Uganda. Here are the main highlights.',
    content: `The 2025 National Education Conference, held in Kampala, was a resounding success with over 500 educators, policymakers, and stakeholders in attendance. The three-day event focused on "Transforming Education Through Technology and Innovation."

Key takeaways include:
1. The government's commitment to increasing ICT infrastructure in schools by 60% over the next two years.
2. New curriculum guidelines emphasizing practical skills and digital literacy.
3. Launch of the National Teacher Excellence Awards to recognize outstanding educators.
4. Partnership announcements between SMESA and major tech companies to provide affordable devices to schools.

The conference also featured workshops on inclusive education, mental health in schools, and innovative teaching methodologies. Participants left with actionable insights and renewed motivation to drive positive change in their institutions.`,
    author: {
      name: 'James Okello',
      role: 'Communications Lead',
    },
    category: 'Events',
    tags: ['Conference', 'Policy', 'Innovation'],
    publishedAt: '2025-02-25',
    readTime: 8,
    featured: false,
    views: 892,
    likes: 67,
    comments: 15,
  },
  {
    id: '3',
    title: 'Teacher Spotlight: How Maria Transformed Her Classroom',
    excerpt: 'Meet Maria Auma, a primary school teacher from Gulu who has revolutionized her teaching approach using SMESA tools and methodologies.',
    content: `Maria Auma, a dedicated Primary 5 teacher from St. Mary's Primary School in Gulu, has become an inspiration for educators across the region. Through her innovative use of SMESA's lesson planning tools and assessment features, she has transformed her classroom into a hub of active learning.

"Before SMESA, I struggled with keeping track of student progress and creating engaging lesson plans," Maria shares. "Now, I can easily monitor each student's performance and tailor my teaching to their needs."

Her results speak for themselves:
- 35% improvement in student test scores
- 90% student attendance rate
- Increased parent engagement through the SMESA parent portal
- Recognition as "Teacher of the Year" in her district

Maria now leads training sessions for other teachers in her region, sharing her expertise and helping build a community of innovative educators.`,
    author: {
      name: 'Grace Akello',
      role: 'Content Writer',
    },
    category: 'Success Stories',
    tags: ['Teacher Spotlight', 'Transformation', 'Best Practices'],
    publishedAt: '2025-02-20',
    readTime: 6,
    featured: false,
    views: 756,
    likes: 124,
    comments: 31,
  },
  {
    id: '4',
    title: 'New Assessment Features: Streamlining Student Evaluation',
    excerpt: 'SMESA introduces powerful new assessment tools to help teachers create, distribute, and grade student evaluations more efficiently.',
    content: `We are thrilled to introduce our enhanced Assessment Builder, designed to make student evaluation more efficient and insightful than ever before. This update comes directly from feedback provided by our dedicated community of educators.

New features include:
- Multiple question types (multiple choice, true/false, short answer, essay)
- Automatic grading for objective questions
- Detailed analytics and performance reports
- Question banks for easy quiz creation
- Time-limited assessments
- Anti-cheating measures

These tools not only save teachers valuable time but also provide deeper insights into student learning patterns. Early adopters have reported spending 50% less time on grading while gaining better understanding of student needs.

The assessment module is now available to all SMESA subscribers at no additional cost.`,
    author: {
      name: 'David Mukasa',
      role: 'Product Manager',
    },
    category: 'Product Updates',
    tags: ['Assessment', 'New Features', 'Productivity'],
    publishedAt: '2025-02-15',
    readTime: 4,
    featured: false,
    views: 1103,
    likes: 95,
    comments: 42,
  },
  {
    id: '5',
    title: 'Well-being in Schools: A Holistic Approach to Education',
    excerpt: 'Understanding the importance of mental health and well-being in creating a conducive learning environment for students and teachers alike.',
    content: `Mental health and well-being have become central topics in education discussions worldwide, and Uganda is no exception. SMESA is committed to supporting schools in creating environments where both students and teachers can thrive.

Our well-being initiative focuses on:
- Mental health awareness and resources
- Stress management techniques for teachers
- Student counseling support systems
- Work-life balance strategies
- Creating positive school cultures

Research shows that schools prioritizing well-being see:
- Higher academic achievement
- Reduced absenteeism
- Improved teacher retention
- Better student behavior
- Enhanced community relationships

SMESA has partnered with mental health professionals to provide resources and training for schools. Our well-being module, launching next month, will include tools for tracking mood, accessing support resources, and implementing wellness programs.`,
    author: {
      name: 'Dr. Patricia Nalwoga',
      role: 'Wellness Advisor',
    },
    category: 'Well-being',
    tags: ['Mental Health', 'Wellness', 'School Culture'],
    publishedAt: '2025-02-10',
    readTime: 7,
    featured: false,
    views: 678,
    likes: 156,
    comments: 28,
  },
  {
    id: '6',
    title: 'Regional Collaboration: Northern Uganda Schools Network',
    excerpt: 'A new network of schools in Northern Uganda is leveraging SMESA to share resources, collaborate on projects, and raise educational standards together.',
    content: `The Northern Uganda Schools Network (NUSN) has emerged as a shining example of how collaboration can drive educational excellence. Formed just six months ago, the network now includes 45 schools across the region.

Through SMESA's community features, member schools are:
- Sharing lesson plans and teaching resources
- Collaborating on joint student projects
- Organizing inter-school competitions and events
- Providing peer support and mentorship
- Pooling resources for professional development

"The network has been transformative," says Head Teacher John Ojok. "We no longer feel isolated. We learn from each other and our students benefit immensely from the expanded opportunities."

Key achievements of NUSN:
- 30% improvement in regional exam results
- Successful regional science fair with 500+ student participants
- Shared procurement reducing costs by 20%
- Teacher exchange program benefiting 120 educators

SMESA is now working with other regions to establish similar networks, believing that collaboration is key to raising educational standards nationwide.`,
    author: {
      name: 'Emmanuel Otim',
      role: 'Regional Coordinator',
    },
    category: 'Community',
    tags: ['Collaboration', 'Regional Network', 'Resource Sharing'],
    publishedAt: '2025-02-05',
    readTime: 6,
    featured: false,
    views: 534,
    likes: 78,
    comments: 19,
  },
];

const categories = ['All', 'Announcements', 'Events', 'Success Stories', 'Product Updates', 'Well-being', 'Community'];

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [savedPosts, setSavedPosts] = useState<string[]>([]);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);

  const featuredPost = blogPosts.find(p => p.featured);
  const regularPosts = blogPosts.filter(p => !p.featured);

  const filteredPosts = regularPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleSave = (postId: string) => {
    setSavedPosts(prev => 
      prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]
    );
  };

  const toggleLike = (postId: string) => {
    setLikedPosts(prev => 
      prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]
    );
  };

  if (selectedPost) {
    return (
      <DashboardLayout>
        {/* Back Button */}
        <button
          onClick={() => setSelectedPost(null)}
          className="flex items-center gap-2 text-foreground-secondary hover:text-accent transition-colors mb-6"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Blog
        </button>

        {/* Article Header */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">
              {selectedPost.category}
            </span>
            <span className="flex items-center gap-1 text-sm text-foreground-secondary">
              <Clock className="w-4 h-4" />
              {selectedPost.readTime} min read
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {selectedPost.title}
          </h1>

          <p className="text-lg text-foreground-secondary mb-6">
            {selectedPost.excerpt}
          </p>

          <div className="flex items-center justify-between py-4 border-y border-[rgba(61,58,54,0.08)] mb-8">
            <div className="flex items-center gap-3">
              <Avatar name={selectedPost.author.name} size="md" />
              <div>
                <p className="font-medium text-foreground">{selectedPost.author.name}</p>
                <p className="text-sm text-foreground-secondary">{selectedPost.author.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-foreground-secondary">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(selectedPost.publishedAt).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </span>
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-8">
            {selectedPost.content.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="text-foreground-secondary leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {selectedPost.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-muted rounded-full text-sm text-foreground-secondary flex items-center gap-1">
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>

          {/* Engagement */}
          <div className="flex items-center justify-between py-4 border-t border-[rgba(61,58,54,0.08)]">
            <div className="flex items-center gap-6">
              <button 
                onClick={() => toggleLike(selectedPost.id)}
                className={`flex items-center gap-2 transition-colors ${likedPosts.includes(selectedPost.id) ? 'text-red-500' : 'text-foreground-secondary hover:text-red-500'}`}
              >
                <Heart className={`w-5 h-5 ${likedPosts.includes(selectedPost.id) ? 'fill-current' : ''}`} />
                <span>{selectedPost.likes + (likedPosts.includes(selectedPost.id) ? 1 : 0)}</span>
              </button>
              <button className="flex items-center gap-2 text-foreground-secondary hover:text-accent transition-colors">
                <MessageSquare className="w-5 h-5" />
                <span>{selectedPost.comments}</span>
              </button>
              <span className="flex items-center gap-2 text-foreground-secondary">
                <Eye className="w-5 h-5" />
                <span>{selectedPost.views}</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => toggleSave(selectedPost.id)}
                className={`p-2 rounded-lg transition-colors ${savedPosts.includes(selectedPost.id) ? 'bg-accent/10 text-accent' : 'hover:bg-muted text-foreground-secondary'}`}
              >
                <Bookmark className={`w-5 h-5 ${savedPosts.includes(selectedPost.id) ? 'fill-current' : ''}`} />
              </button>
              <button className="p-2 hover:bg-muted rounded-lg text-foreground-secondary transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Related Articles */}
          <div className="mt-12">
            <h3 className="text-xl font-bold text-foreground mb-4">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {blogPosts
                .filter(p => p.id !== selectedPost.id && p.category === selectedPost.category)
                .slice(0, 2)
                .map(post => (
                  <Card key={post.id} variant="hover" className="p-4 cursor-pointer" onClick={() => setSelectedPost(post)}>
                    <span className="text-xs text-accent font-medium">{post.category}</span>
                    <h4 className="font-semibold text-foreground mt-1 line-clamp-2">{post.title}</h4>
                    <p className="text-sm text-foreground-secondary mt-2 line-clamp-2">{post.excerpt}</p>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">SMESA Blog</h1>
        <p className="text-foreground-secondary mt-1">
          Stay updated with the latest news, events, and stories from our community
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-secondary" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-[rgba(61,58,54,0.12)] bg-white text-foreground placeholder:text-foreground-secondary/60 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-accent text-white'
                  : 'bg-muted text-foreground-secondary hover:bg-muted/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Post */}
      {featuredPost && selectedCategory === 'All' && !searchQuery && (
        <Card 
          variant="hover" 
          className="mb-8 overflow-hidden cursor-pointer"
          onClick={() => setSelectedPost(featuredPost)}
        >
          <div className="grid md:grid-cols-2 gap-0">
            <div className="h-64 md:h-auto bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-20 h-20 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-10 h-10 text-accent" />
                </div>
                <span className="px-3 py-1 bg-accent text-white rounded-full text-sm font-medium">
                  Featured
                </span>
              </div>
            </div>
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-2 py-1 bg-accent/10 text-accent rounded text-xs font-medium">
                  {featuredPost.category}
                </span>
                <span className="text-sm text-foreground-secondary flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {featuredPost.readTime} min read
                </span>
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-3">{featuredPost.title}</h2>
              <p className="text-foreground-secondary mb-4">{featuredPost.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar name={featuredPost.author.name} size="sm" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{featuredPost.author.name}</p>
                    <p className="text-xs text-foreground-secondary">{featuredPost.author.role}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Read More <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map(post => (
          <Card 
            key={post.id} 
            variant="hover" 
            className="overflow-hidden cursor-pointer flex flex-col"
            onClick={() => setSelectedPost(post)}
          >
            <div className="h-40 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
              <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center">
                <User className="w-8 h-8 text-accent/50" />
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-accent/10 text-accent rounded text-xs font-medium">
                  {post.category}
                </span>
                <span className="text-xs text-foreground-secondary flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.readTime} min
                </span>
              </div>
              <h3 className="font-semibold text-foreground mb-2 line-clamp-2 flex-1">{post.title}</h3>
              <p className="text-sm text-foreground-secondary line-clamp-2 mb-4">{post.excerpt}</p>
              <div className="flex items-center justify-between pt-4 border-t border-[rgba(61,58,54,0.08)]">
                <div className="flex items-center gap-2">
                  <Avatar name={post.author.name} size="xs" />
                  <span className="text-xs text-foreground-secondary">{post.author.name}</span>
                </div>
                <span className="text-xs text-foreground-secondary">
                  {new Date(post.publishedAt).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-foreground-secondary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No articles found</h3>
          <p className="text-foreground-secondary">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </DashboardLayout>
  );
}
