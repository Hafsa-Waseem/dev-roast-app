import { Card, CardContent } from '@/components/ui/card';

const memes = [
  { caption: 'That feeling when you fix one bug and two new ones appear.' },
  { caption: 'The holy scriptures of programming: Stack Overflow.' },
  { caption: '"It\'s a simple feature, should only take an hour." - Famous last words.' },
  { caption: 'Another day, another new JavaScript framework to learn.' },
  { caption: 'The classic developer excuse: "It works on my machine!"' },
  { caption: 'Trying to understand code written by someone who left the company 5 years ago.' },
  { caption: 'Me trying to center a div in CSS.' },
  { caption: 'When you get a senior dev role but still feel like you have no idea what you\'re doing.' },
  { caption: '`git push --force`: How I assert dominance in a group project.' },
  { caption: 'A developer\'s eternal struggle: Exiting Vim.' },
  { caption: 'When your code compiles on the first try without any errors.' },
  { caption: 'My face when I see 100+ file changes in a single pull request.' },
];

export default function MemesPage() {
  return (
    <div className="container mx-auto max-w-6xl py-12 px-4">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Freshly Compiled Memes</h1>
          <p className="text-muted-foreground mt-2">For your procrastination pleasure. Guaranteed to be 100% relatable.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {memes.map((meme, index) => (
            <Card key={index} className="flex items-center justify-center transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl h-48">
              <CardContent className="p-6">
                 <p className="text-center text-card-foreground/90 font-medium text-lg">{meme.caption}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
