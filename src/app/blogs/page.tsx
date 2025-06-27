import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function BlogsPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Developer Blogs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            Our blog section is currently under construction. We're busy brewing up some insightful and humorous articles about the developer life.
          </p>
          <p>
            Check back soon for posts on topics like "Why Your Code Doesn't Work (It's Probably DNS)", "The Art of Naming Variables", and "10 Signs You Might Be a JavaScript Developer."
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
