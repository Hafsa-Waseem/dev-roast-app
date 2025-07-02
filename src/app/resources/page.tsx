import { getResources } from '@/lib/resources';
import { ResourceList } from '@/components/resource-list';

export default async function ResourcesPage() {
  const resources = await getResources();

  return (
    <div className="bg-background">
      <div className="container mx-auto max-w-7xl py-12 px-4 sm:py-16 lg:py-20">
        <div className="space-y-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl lg:text-6xl">Resources</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              A collection of hand-picked guides and cheat sheets to help you on your development journey.
            </p>
          </div>

          <ResourceList initialResources={resources} />
        </div>
      </div>
    </div>
  );
}
