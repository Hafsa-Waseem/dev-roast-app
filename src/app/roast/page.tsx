import { RoastForm } from '@/components/roast-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Flame } from 'lucide-react';

export default function RoastPage() {
  return (
    <div className="flex w-full flex-col items-center justify-center p-4 py-12 md:py-24">
      <Card className="w-full max-w-lg z-10">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="p-3 bg-primary/10 rounded-full">
              <Flame className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold font-headline">haas.fry</CardTitle>
          <CardDescription className="pt-2 text-base">
            Enter your name and battlefield. Prepare to be humbled by my AI.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RoastForm />
        </CardContent>
      </Card>
    </div>
  );
}
