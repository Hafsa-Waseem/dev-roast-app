import { getResources } from '@/lib/resources';
import { getPosts } from '@/lib/posts';
import { AdminResourceManager } from '@/components/admin-resource-manager';
import { AdminPostManager } from '@/components/admin-post-manager';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { isFirebaseAdminConfigured } from '@/lib/firebase-admin';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

export default async function AdminPage() {
  const resources = await getResources();
  const posts = await getPosts();
  const isConfigured = isFirebaseAdminConfigured;
  
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4 space-y-8">
      {!isConfigured && (
        <Alert variant="destructive" className="border-2 border-amber-500/50 bg-amber-500/10 text-amber-700 dark:text-amber-300">
          <AlertTriangle className="h-4 w-4 !text-amber-500" />
          <AlertTitle className="!text-amber-600 dark:!text-amber-400">Action Required: Configure Admin Credentials</AlertTitle>
          <AlertDescription className="text-amber-700/80 dark:text-amber-300/80">
            Your Firebase <b>Admin</b> credentials are not configured on the server. The admin panel is in a "read-only" mode. To enable adding, editing, or deleting content, please set up your Firebase project and add the `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, and `FIREBASE_PRIVATE_KEY` to your environment variables.
          </AlertDescription>
        </Alert>
      )}
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
