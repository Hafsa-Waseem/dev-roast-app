import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function InteractivePage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Interactive Fun</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center text-muted-foreground">
          <p>
            Interactive experiences are being coded as we speak! Soon you'll be able to play games like "CSS Battle Royale" or "Bug Hunt Safari."
          </p>
          <div className="flex justify-center">
            <Button disabled>Coming Soon!</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
