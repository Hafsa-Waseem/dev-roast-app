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
];

export default function ArticlesPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Fun Tech Articles</h1>
          <p className="text-muted-foreground mt-2">Questionable wisdom from the tech trenches.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {articles.map((article, index) => (
            <Card key={index}>
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
