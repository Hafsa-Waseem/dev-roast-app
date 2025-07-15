import { DevDareClient } from '@/components/dev-dare-client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dice5 } from 'lucide-react';

export default function DevDarePage() {
  return (
    <div className="container mx-auto max-w-2xl py-12 px-4 flex flex-col items-center justify-center min-h-[70vh]">
      <Card className="w-full text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-primary/10 rounded-full">
                <Dice5 className="h-10 w-10 text-primary" />
            </div>
          </div>
          <CardTitle className="text-3xl">Developer Dares</CardTitle>
          <CardDescription>
            Are you brave enough to take on a random coding challenge?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DevDareClient />
        </CardContent>
      </Card>
    </div>
  );
}
