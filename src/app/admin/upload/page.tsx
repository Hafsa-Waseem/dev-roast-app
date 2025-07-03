

import { getResources } from '@/lib/resources';
import { getPosts } from '@/lib/posts';
import { AdminResourceManager } from '@/components/admin-resource-manager';
import { AdminPostManager } from '@/components/admin-post-manager';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LineChart } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default async function AdminPage() {
  const resources = await getResources();
  const posts = await getPosts();
  
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4 space-y-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle className="text-3xl">Admin Dashboard</CardTitle>
                <CardDescription>Manage your website's content and view analytics.</CardDescription>
            </div>
            <Button asChild>
                <Link href="/admin/analytics">
                    <LineChart className="mr-2" />
                    View Analytics
                </Link>
            </Button>
        </CardHeader>
      </Card>

      <AdminPostManager initialPosts={posts} />
      <AdminResourceManager initialResources={resources} />
    </div>
  );
}
