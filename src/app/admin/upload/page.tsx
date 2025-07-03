import { getResources } from '@/lib/resources';
import { getPosts } from '@/lib/posts';
import { AdminResourceManager } from '@/components/admin-resource-manager';
import { AdminPostManager } from '@/components/admin-post-manager';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default async function AdminPage() {
  const resources = await getResources();
  const posts = await getPosts();
  
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4 space-y-8">
      <Card>
        <CardHeader>
            <div>
                <CardTitle className="text-3xl">Admin Dashboard</CardTitle>
                <CardDescription>Manage your website's content.</CardDescription>
            </div>
        </CardHeader>
      </Card>

      <AdminPostManager initialPosts={posts} />
      <AdminResourceManager initialResources={resources} />
    </div>
  );
}
