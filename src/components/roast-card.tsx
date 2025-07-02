'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Separator } from './ui/separator';

type RoastCardProps = {
  roast: string;
};

export function RoastCard({ roast }: RoastCardProps) {
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(roast)
      .then(() => {
        toast({
          title: 'Copied!',
          description: 'The roast has been copied to your clipboard.',
        });
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        toast({
          title: 'Error',
          description: 'Failed to copy roast.',
          variant: 'destructive',
        });
      });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'haas.fry',
          text: roast,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      handleCopy();
      toast({
        title: 'Share not available',
        description: "Your browser doesn't support sharing. Roast copied to clipboard instead!",
      });
    }
  };

  return (
    <Card className="bg-secondary/50 border-dashed">
      <CardContent className="p-6">
        <p className="text-lg text-center font-medium leading-relaxed mb-4">{roast}</p>
        <Separator className="my-4" />
        <div className="flex justify-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleCopy} aria-label="Copy roast">
            <Copy className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleShare} aria-label="Share roast">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
