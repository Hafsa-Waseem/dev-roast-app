import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const blogPosts = [
  {
    title: 'Why Your Code Doesn\'t Work: It\'s Probably DNS',
    author: 'A Frustrated SysAdmin',
    date: 'July 20, 2024',
    excerpt: 'It\'s never not DNS. In this post, we explore the five stages of debugging grief, from denial ("It\'s can\'t be DNS") to acceptance ("It was DNS").',
  },
  {
    title: 'The Art of Naming Variables: From `x` to `totalRevenueInUSDAfterTaxesAndFees`',
    author: 'Captain Obvious',
    date: 'July 15, 2024',
    excerpt: 'Join us on a journey through the evolution of a developer\'s variable naming strategy, a tale of despair, clarity, and eventual carpal tunnel syndrome.',
  },
  {
    title: '10 Signs You Might Be a JavaScript Developer',
    author: 'Framework Fanatic',
    date: 'July 10, 2024',
    excerpt: 'If you\'ve ever debated the merits of 5 different ways to write a for-loop or believe `[] + {}` is a valid form of artistic expression, this post is for you.',
  },
  {
    title: 'How to Explain APIs to Your Parents',
    author: 'Family Tech Support',
    date: 'July 5, 2024',
    excerpt: 'A practical guide to using metaphors like "magic restaurant waiters" to explain complex technical concepts to your loved ones, so you can finally enjoy a holiday meal in peace.',
  },
  {
    title: 'The Singleton Pattern: A Lonely Dev\'s Guide to Global State',
    author: 'Archie Tect',
    date: 'July 2, 2024',
    excerpt: 'Exploring the most misunderstood design pattern. Is it a powerful tool for managing state, or a glorified global variable in a trench coat? Let\'s find out.',
  },
  {
    title: 'Code Comments: Lies, Damn Lies, and Outdated Documentation',
    author: 'Cynical Coder',
    date: 'June 28, 2024',
    excerpt: 'A deep dive into the art of writing comments that are more confusing than the code itself. We analyze famous examples like `// This is a hack, I know.`',
  },
  {
    title: 'Surviving Your First Code Review Without Crying',
    author: 'The Intern',
    date: 'June 25, 2024',
    excerpt: 'A junior developer\'s guide to navigating the perilous waters of code reviews. Learn how to interpret feedback like "This is... interesting" and "Could you explain your thought process here?"',
  },
  {
    title: 'A Deep Dive into `useMemo` and `useCallback`: A Love Story',
    author: 'React Romantic',
    date: 'June 20, 2024',
    excerpt: 'Unravel the mysteries of React performance optimization. This post explains when to use `useMemo` and `useCallback`, and when you\'re just prematurely optimizing.',
  },
  {
    title: 'Regex: Mastering the Dark Arts of String Manipulation',
    author: 'Pattern Whisperer',
    date: 'June 18, 2024',
    excerpt: 'A beginner-friendly introduction to Regular Expressions. By the end of this post, you\'ll be able to write cryptic patterns that even you won\'t understand in a week.',
  },
  {
    title: 'The Imposter\'s Guide to Sounding Smart in Tech Meetings',
    author: 'Corporate Chameleon',
    date: 'June 15, 2024',
    excerpt: 'Learn key phrases like "Does it scale?", "What about the user experience?", and "Let\'s take this offline" to sound like a seasoned professional.',
  },
  {
    title: 'Why Agile Isn\'t Working For You: You\'re Probably Doing It Wrong',
    author: 'Scrum Master Supreme',
    date: 'June 12, 2024',
    excerpt: 'A tough-love look at common Agile anti-patterns. Are your daily stand-ups actually daily sitting-down-for-an-hour-meetings? This post is for you.',
  },
  {
    title: 'How I Explained End-to-End Encryption to My Goldfish',
    author: 'Paranoid Polly',
    date: 'June 10, 2024',
    excerpt: 'A story of patience, perseverance, and a very confused goldfish. Security concepts explained in the simplest terms possible.',
  },
];

export default function BlogsPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Developer Blogs</h1>
          <p className="text-muted-foreground mt-2">Insights and ramblings from our team of code monkeys.</p>
        </div>
        <div className="space-y-6">
          {blogPosts.map((post, index) => (
            <Card key={index} className="transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>By {post.author} on {post.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{post.excerpt}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
