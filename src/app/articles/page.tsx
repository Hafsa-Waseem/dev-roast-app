import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ArticlesPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Fun Tech Articles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            This section is coming soon! We're gathering the most entertaining and bizarre stories from the world of tech.
          </p>
          <p>
            Prepare for deep dives into the history of the `<blink>` tag, the programmer who automated his job, and much more.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
