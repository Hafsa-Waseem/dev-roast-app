
import { Card, CardContent } from '@/components/ui/card';
import { getPosts } from '@/lib/posts';

export default async function MemesPage() {
  const allPosts = await getPosts();
  const memes = allPosts.filter(post => post.type === 'meme');

  return (
    <div className="container mx-auto max-w-6xl py-12 px-4">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Freshly Compiled Memes</h1>
          <p className="text-muted-foreground mt-2">For your procrastination pleasure. Guaranteed to be 100% relatable.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {memes.map((meme) => (
            <Card key={meme.id} className="flex items-center justify-center transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl h-48">
              <CardContent className="p-6">
                 <p className="text-center text-card-foreground/90 font-medium text-lg">{meme.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        {memes.length === 0 && (
            <p className="text-center text-muted-foreground col-span-full py-12">No memes found. Check back later!</p>
        )}
      </div>
    </div>
  );
}
