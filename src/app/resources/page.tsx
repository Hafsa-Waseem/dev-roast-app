import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';
import { getResources } from '@/lib/resources';

export default async function ResourcesPage() {
  const resources = await getResources();

  return (
    <div className="bg-secondary/20">
      <div className="container mx-auto max-w-5xl py-12 px-4 sm:py-16 lg:py-20">
        <div className="space-y-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">Developer's Toolkit</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Hand-picked guides and cheat sheets to level up your skills. Ready for download.
            </p>
          </div>

          {resources.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {resources.map((resource) => (
                <Card key={resource.id} className="flex flex-col overflow-hidden rounded-lg shadow-xl transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1">
                  <div className="flex-shrink-0 bg-primary/10 p-6 flex items-center justify-center">
                     <FileText className="h-16 w-16 text-primary" />
                  </div>
                  <div className="flex flex-1 flex-col justify-between bg-card p-6">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-card-foreground">
                        {resource.title}
                      </h3>
                      <p className="mt-3 text-base text-muted-foreground">
                        {resource.description}
                      </p>
                    </div>
                    <div className="mt-6">
                       <Button asChild className="w-full">
                        <a href={resource.href} download>
                          <Download className="mr-2 h-4 w-4" />
                          Download PDF
                        </a>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
             <div className="text-center py-16 px-4 border-2 border-dashed rounded-lg">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No Resources Yet</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Looks like the admin is brewing something special. Check back later!
                </p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
