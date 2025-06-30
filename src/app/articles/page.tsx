import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const articles = [
  {
    title: 'The History of the <blink> Tag: A Tragic Tale of Web Design',
    description: 'A deep dive into the most beloved and hated HTML tag of all time. We explore its rise to infamy and its eventual, merciful demise. A must-read for digital historians and anyone who enjoys visual chaos.',
  },
  {
    title: 'CSS is Awesome: 10 Reasons Why (and 100 Reasons Why It\'s Not)',
    description: 'A balanced and totally unbiased look at the love-hate relationship every developer has with Cascading Style Sheets. We cover everything from `!important` abuse to the existential dread of centering elements.',
  },
  {
    title: 'I Automated My Job and Told No One: A 3-Year Experiment',
    description: 'An anonymous developer shares their story of writing a script that does their entire job, leaving them with 8 hours of free time a day. Learn what they did with their newfound freedom (spoiler: mostly video games).',
  },
  {
    title: 'The Programmer Who Replaced Himself with a Rubber Duck',
    description: 'In a stunning feat of management, one tech lead found that a simple rubber duck was more effective at solving problems than his senior engineer. We interview the duck.',
  },
  {
    title: 'Demystifying the Event Loop: How JavaScript Keeps Its Cool',
    description: 'Ever wondered how JavaScript handles asynchronous tasks without breaking a sweat? This educational piece breaks down the event loop, callback queue, and call stack in simple terms.',
  },
  {
    title: 'Git Gud: Beyond `commit`, `push`, and `pray`',
    description: 'Learn to wield Git like a pro. We cover interactive rebasing, cherry-picking, and how to fix that commit you just pushed to the main branch by mistake. Your coworkers will thank you.',
  },
  {
    title: 'Why Is My Laptop Fan Spinning? A Chrome Tab\'s Autobiography',
    description: 'A harrowing first-person account from a single Chrome tab that has consumed 8GB of RAM. A story of ambition, memory leaks, and the eternal struggle to stay open.',
  },
  {
    title: 'A Beginner\'s Guide to Impostor Syndrome in Tech',
    description: 'Feeling like a fraud? You\'re not alone. This article explores why so many developers feel like impostors and offers practical tips for building confidence and recognizing your own expertise.',
  },
  {
    title: 'Debugging with `console.log()`: An Advanced Guide',
    description: 'Explore the nuanced art of sprinkling `console.log("here")`, `console.log("here2")`, and `console.log("wtf")` throughout your codebase to find that one elusive bug.',
  },
  {
    title: 'The Great Semicolon Debate: To Use or Not to Use?',
    description: 'A philosophical exploration into one of programming\'s most divisive topics. We interview developers from both sides of the aisle. Tensions run high.',
  },
  {
    title: 'How to Center a Div: The Final, Ultimate, No-Seriously-This-Time Guide',
    description: 'We\'ve tried everything, from Flexbox to Grid to ancient CSS hacks involving tables. This guide promises to be the last one you\'ll ever need. Maybe.',
  },
  {
    title: 'API Documentation: A Guide to Writing Something People Will Actually Read',
    description: 'Learn how to write API docs that are clear, concise, and don\'t require a degree in archaeology to decipher. Your fellow developers will thank you.',
  },
];


export default function ArticlesPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Fun & Educational Articles</h1>
          <p className="text-muted-foreground mt-2">Questionable wisdom and actual knowledge from the tech trenches.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {articles.map((article, index) => (
            <Card key={index} className="transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
              <CardHeader>
                <CardTitle>{article.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{article.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
