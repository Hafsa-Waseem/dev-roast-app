import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export default function MemesPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Tech Memes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center text-muted-foreground">
          <p>
            Our meme conveyor belt is currently being debugged. Please stand by for a fresh batch of high-quality, compiler-approved memes.
          </p>
          <div className="flex justify-center">
            <Image 
              src="https://placehold.co/600x400.png"
              alt="Funny meme placeholder"
              width={600}
              height={400}
              data-ai-hint="programming humor"
              className="rounded-lg"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
