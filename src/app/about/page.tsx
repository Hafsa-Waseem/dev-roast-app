import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">About Us</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            Welcome to Roast-My-Code, the premier destination for developers who don't take themselves too seriously. Our mission is to inject a bit of humor and humility into the often-intense world of software development.
          </p>
          <p>
            Born from a late-night coding session and fueled by too much coffee, this platform uses cutting-edge AI to generate witty and sarcastic roasts based on your favorite programming languages, frameworks, and tools. It's all in good fun, of course!
          </p>
          <p>
            We believe that a good laugh can be the best way to de-stress and bond with fellow developers. Whether you're a seasoned pro who remembers debugging with print statements or a bootcamp grad who thinks Git is just a fancy save button, there's a roast here for you.
          </p>
          <p>
            Thanks for stopping by. Now go on, see what our AI has to say about your "battlefield." We promise it'll be (mostly) painless.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
