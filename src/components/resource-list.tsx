'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, Search, Share2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

type Resource = {
  id: string;
  title: string;
  description: string;
  href: string;
};

type ResourceListProps = {
  initialResources: Resource[];
};

export function ResourceList({ initialResources }: ResourceListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const handleShare = (resourceId: string, title: string) => {
    const shareUrl = `${window.location.origin}/resources#${resourceId}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      toast({
        title: 'Link Copied!',
        description: `A shareable link for "${title}" has been copied to your clipboard.`,
      });
    }).catch(err => {
      console.error('Failed to copy: ', err);
      toast({
        title: 'Error',
        description: 'Failed to copy link.',
        variant: 'destructive',
      });
    });
  };

  const filteredResources = useMemo(() => {
    if (!searchTerm) {
      return initialResources;
    }
    return initialResources.filter(resource =>
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, initialResources]);

  return (
    <div className="space-y-12">
      <div className="relative max-w-lg mx-auto">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search for resources..."
          className="w-full rounded-full pl-12 pr-4 py-2 h-11"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredResources.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredResources.map((resource) => {
            const isExternal = resource.href.startsWith('http');
            return (
              <Card key={resource.id} id={resource.id} className="flex flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1 scroll-mt-20">
                <CardContent className="p-6 flex flex-col flex-grow items-center text-center">
                  <div className="p-4 bg-primary/10 rounded-full mb-4">
                    <FileText className="h-10 w-10 text-primary" />
                  </div>
                  <Badge variant="secondary" className="mb-3">
                    PDF Resource
                  </Badge>
                  <h3 className="text-xl font-bold text-primary mb-2">
                    {resource.title}
                  </h3>
                  <p className="text-muted-foreground text-sm flex-grow">
                    {resource.description}
                  </p>
                </CardContent>
                <CardFooter className="p-4 mt-auto border-t border-card-foreground/10 flex items-center justify-center gap-2">
                  <Button asChild className="flex-1">
                    <a
                      href={resource.href}
                      download={!isExternal}
                      target={isExternal ? '_blank' : '_self'}
                      rel={isExternal ? 'noopener noreferrer' : ''}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleShare(resource.id, resource.title)}
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      ) : (
         <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-card-foreground/20 bg-card/20 backdrop-blur-xl shadow-lg">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">No Resources Found</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Your search for "{searchTerm}" did not match any resources. Try another term.
            </p>
         </div>
      )}
    </div>
  );
}
