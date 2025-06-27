import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';

export default function InteractivePage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <Card className="text-center">
        <CardHeader>
          <div className="mx-auto bg-primary/10 rounded-full w-fit p-4 mb-4">
            <Zap className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-3xl">CSS Battle Royale</CardTitle>
          <CardDescription className="text-base">The ultimate test of frontend survival.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            Can you replicate a complex design using only CSS before the timer runs out? Compete against other developers in a fast-paced, real-time arena where only one `div` can be victorious.
          </p>
          <p>
            Features include Flexbox Frenzy, Grid Gauntlet, and the dreaded `!important` Power-up.
          </p>
          <div className="flex justify-center pt-4">
            <Button size="lg" disabled>Launch Game (Compiling Shaders...)</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
