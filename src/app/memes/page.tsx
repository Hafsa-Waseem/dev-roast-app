import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

const memes = [
  {
    width: 600,
    height: 400,
    alt: 'Meme about debugging',
    hint: 'debugging programming',
    caption: 'That feeling when you fix one bug and two new ones appear.',
  },
  {
    width: 500,
    height: 650,
    alt: 'Meme about Stack Overflow',
    hint: 'stack overflow',
    caption: 'The holy scriptures of programming.',
  },
  {
    width: 600,
    height: 450,
    alt: 'Meme about project managers',
    hint: 'project manager',
    caption: '"It\'s a simple feature, should only take an hour." - Famous last words.',
  },
  {
    width: 500,
    height: 500,
    alt: 'Meme about JavaScript frameworks',
    hint: 'javascript framework',
    caption: 'Another day, another new JavaScript framework to learn.',
  },
  {
    width: 600,
    height: 400,
    alt: 'Meme about works on my machine',
    hint: 'developer computer',
    caption: 'The classic developer excuse that is technically true and completely useless.',
  },
  {
    width: 600,
    height: 700,
    alt: 'Meme about legacy code',
    hint: 'programmer code',
    caption: 'Trying to understand code written by someone who left the company 5 years ago.',
  },
  {
    width: 600,
    height: 420,
    alt: 'Meme about CSS',
    hint: 'css coding',
    caption: 'Me trying to center a div.',
  },
  {
    width: 550,
    height: 650,
    alt: 'Meme about imposter syndrome',
    hint: 'imposter developer',
    caption: 'When you get a senior dev role but still feel like you have no idea what you\'re doing.',
  },
  {
    width: 600,
    height: 500,
    alt: 'Meme about git push force',
    hint: 'git version control',
    caption: '`git push --force`: How I assert dominance in a group project.',
  },
  {
    width: 600,
    height: 600,
    alt: 'Meme about exiting Vim',
    hint: 'vim editor',
    caption: 'A developer\'s eternal struggle.',
  },
  {
    width: 580,
    height: 450,
    alt: 'Code compiling without errors',
    hint: 'programmer happy',
    caption: 'When your code compiles on the first try.',
  },
  {
    width: 600,
    height: 550,
    alt: 'Meme about merging branches',
    hint: 'git branch',
    caption: 'My face when I see 100+ file changes in a pull request.',
  },
];

export default function MemesPage() {
  return (
    <div className="container mx-auto max-w-6xl py-12 px-4">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Freshly Compiled Memes</h1>
          <p className="text-muted-foreground mt-2">For your procrastination pleasure. Guaranteed to be 100% relatable.</p>
        </div>
        <div className="md:columns-2 lg:columns-3 gap-6 space-y-6">
          {memes.map((meme, index) => (
            <div key={index} className="break-inside-avoid">
              <Card className="overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
                <CardContent className="p-0">
                  <Image
                    src={`https://placehold.co/${meme.width}x${meme.height}.png`}
                    alt={meme.alt}
                    width={meme.width}
                    height={meme.height}
                    data-ai-hint={meme.hint}
                    className="w-full h-auto object-cover"
                  />
                   <div className="p-4 bg-card/50">
                    <p className="text-center text-card-foreground/80 font-medium">{meme.caption}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
