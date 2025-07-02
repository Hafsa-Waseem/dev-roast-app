'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

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
          {filteredResources.map((resource) => (
            <Card key={resource.id} className="bg-card text-card-foreground rounded-lg shadow-lg flex flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1">
              <CardContent className="p-6 flex flex-col flex-grow items-center text-center">
                <div className="p-4 bg-secondary rounded-full mb-4">
                  <FileText className="h-10 w-10 text-primary" />
                </div>
                <Badge variant="secondary" className="mb-3">
                  PDF Resource
                </Badge>
                <h3 className="text-xl font-bold text-primary mb-2">
                  {resource.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-3 flex-grow">
                  {resource.description}
                </p>
              </CardContent>
              <CardFooter className="p-4 mt-auto border-t">
                 <Button asChild className="w-full">
                  <a href={resource.href} download>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
         <div className="text-center py-16 px-4 border-2 border-dashed rounded-lg">
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
