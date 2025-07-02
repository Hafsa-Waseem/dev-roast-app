
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getPosts } from '@/lib/posts';

export default async function BlogsPage() {
  const allPosts = await getPosts();
  const blogPosts = allPosts.filter(post => post.type === 'blog');

  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Developer Blogs</h1>
          <p className="text-muted-foreground mt-2">Insights and ramblings from the developer behind this app.</p>
        </div>
        <div className="space-y-6">
          {blogPosts.map((post) => (
            <Card key={post.id} className="transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>By {post.author} on {post.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{post.content}</p>
              </CardContent>
            </Card>
          ))}
          {blogPosts.length === 0 && (
            <p className="text-center text-muted-foreground py-12">No blog posts found. Check back later!</p>
          )}
        </div>
      </div>
    </div>
  );
}
