import { getResources } from '@/lib/resources';
import { AdminResourceManager } from '@/components/admin-resource-manager';

export default async function AdminUploadPage() {
  const resources = await getResources();
  
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4 space-y-8">
      <AdminResourceManager initialResources={resources} />
    </div>
  );
}
