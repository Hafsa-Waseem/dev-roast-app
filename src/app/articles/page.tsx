
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getPosts } from '@/lib/posts';

export default async function ArticlesPage() {
  const allPosts = await getPosts();
  const articles = allPosts.filter(post => post.type === 'article');

  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Fun & Educational Articles</h1>
          <p className="text-muted-foreground mt-2">Questionable wisdom and actual knowledge from the tech trenches.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {articles.map((article) => (
            <Card key={article.id} className="transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
              <CardHeader>
                <CardTitle>{article.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{article.content}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
         {articles.length === 0 && (
          <p className="text-center text-muted-foreground col-span-2 py-12">No articles found. Check back later!</p>
        )}
      </div>
    </div>
  );
}
