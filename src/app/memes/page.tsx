import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

const memes = [
  {
    src: 'https://placehold.co/600x400/3498db/3498db.png',
    alt: 'Meme about debugging',
    hint: 'debugging programming',
    caption: 'That feeling when you fix one bug and two new ones appear.',
  },
  {
    src: 'https://placehold.co/600x400/e74c3c/e74c3c.png',
    alt: 'Meme about Stack Overflow',
    hint: 'stack overflow',
    caption: 'Me after copying and pasting code from Stack Overflow without understanding it.',
  },
  {
    src: 'https://placehold.co/600x400/f1c40f/f1c40f.png',
    alt: 'Meme about project managers',
    hint: 'project manager',
    caption: '"It\'s a simple feature, should only take an hour." - Famous last words.',
  },
  {
    src: 'https://placehold.co/600x400/9b59b6/9b59b6.png',
    alt: 'Meme about JavaScript frameworks',
    hint: 'javascript framework',
    caption: 'Another day, another new JavaScript framework to learn.',
  },
  {
    src: 'https://placehold.co/600x400/1abc9c/1abc9c.png',
    alt: 'Meme about "works on my machine"',
    hint: 'developer computer',
    caption: 'The classic developer excuse that is technically true and completely useless.',
  },
  {
    src: 'https://placehold.co/600x400/34495e/34495e.png',
    alt: 'Meme about legacy code',
    hint: 'programmer code',
    caption: 'Trying to understand code written by someone who left the company 5 years ago.',
  },
];

export default function MemesPage() {
  return (
    <div className="container mx-auto max-w-5xl py-12 px-4">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Freshly Compiled Memes</h1>
          <p className="text-muted-foreground mt-2">For your procrastination pleasure. Guaranteed to be 100% relatable.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {memes.map((meme, index) => (
            <Card key={index}>
              <CardContent className="p-0">
                <Image
                  src={meme.src}
                  alt={meme.alt}
                  width={600}
                  height={400}
                  data-ai-hint={meme.hint}
                  className="rounded-t-lg w-full object-cover"
                />
                 <div className="p-4">
                  <p className="text-center text-muted-foreground font-medium">{meme.caption}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
