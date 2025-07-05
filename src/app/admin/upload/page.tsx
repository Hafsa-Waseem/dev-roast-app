import { getResources } from '@/lib/resources';
import { getPosts } from '@/lib/posts';
import { AdminResourceManager } from '@/components/admin-resource-manager';
import { AdminPostManager } from '@/components/admin-post-manager';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { isFirebaseAdminConfigured, missingAdminVars } from '@/lib/firebase-admin';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

export default async function AdminPage() {
  // We check configuration status again here to ensure the latest state is used for rendering.
  const isConfigured = isFirebaseAdminConfigured;
  const resources = isConfigured ? await getResources() : [];
  const posts = isConfigured ? await getPosts() : [];
  
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4 space-y-8">
      {!isConfigured && (
        <Alert variant="destructive" className="border-2 border-amber-500/50 bg-amber-500/10 text-amber-700 dark:text-amber-300">
          <AlertTriangle className="h-4 w-4 !text-amber-500" />
          <AlertTitle className="!text-amber-600 dark:!text-amber-400">Action Required: Configure Admin Credentials</AlertTitle>
          <AlertDescription className="text-amber-700/80 dark:text-amber-300/80 space-y-2">
            <p>Your Firebase Admin panel is not working because some server settings are missing. Please add the following environment variables to your `.env` file:</p>
            <ul className="list-disc pl-5 mt-2 font-mono text-sm">
              {missingAdminVars.map(v => <li key={v}>{v}</li>)}
            </ul>
            <p className="mt-2">For `FIREBASE_SERVICE_ACCOUNT_JSON`, you need to copy the entire content of your service account JSON file and paste it as a single line.</p>
            <p>For `ADMIN_SECRET_KEY`, create a strong, random password. You will use this key to log into the admin panel.</p>
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
