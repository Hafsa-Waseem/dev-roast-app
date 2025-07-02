'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

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
    <div className="space-y-8">
      <div className="relative max-w-lg mx-auto">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search for guides, cheat sheets..."
          className="w-full rounded-full pl-12 pr-4 py-2 h-11"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredResources.length > 0 ? (
        <div className="space-y-8">
          {filteredResources.map((resource) => (
            <Card key={resource.id} className="overflow-hidden shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1 md:grid md:grid-cols-12 md:items-center">
              <div className="md:col-span-2 flex items-center justify-center p-6 bg-primary/10">
                 <FileText className="h-16 w-16 text-primary" />
              </div>
              <div className="p-6 md:col-span-7">
                <h3 className="text-2xl font-semibold text-card-foreground">
                  {resource.title}
                </h3>
                <p className="mt-3 text-base text-muted-foreground line-clamp-3">
                  {resource.description}
                </p>
              </div>
              <div className="px-6 pb-6 md:p-6 md:col-span-3">
                 <Button asChild className="w-full">
                  <a href={resource.href} download>
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </a>
                </Button>
              </div>
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
