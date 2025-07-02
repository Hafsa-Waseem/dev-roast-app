import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">About haas.fry</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            Welcome to haas.fry, the only corner of the internet where your code's feelings are not a priority. My mission is to inject a lethal dose of humor into the caffeine-fueled, sleep-deprived world of software development.
          </p>
          <p>
            Born from a syntax error at 3 AM and a questionable life choice, this platform uses a highly sophisticated (and sarcastic) AI to craft witty roasts based on your chosen programming battlefield. It's all in good fun, of course... unless the AI is right.
          </p>
          <p>
            I believe that a good laugh can be the best debugger. Whether you're a Senior Dev who still googles how to center a div, or a Junior who thinks 'merge conflict' is a type of sandwich, my AI has a special roast simmering just for you.
          </p>
          <p>
            Thanks for stopping by. Now go on, feed my AI your details. I promise it'll only hurt your ego.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
