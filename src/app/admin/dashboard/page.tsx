
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { UploadForm } from './_components/upload-form';
import { getResources } from "@/lib/resources";
import { ResourceTable } from "./_components/resource-table";

export default async function AdminDashboardPage() {
  const resources = await getResources();

  return (
    <div className="container mx-auto py-10">
      <div className="space-y-8">
        <Card className="w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Admin Dashboard</CardTitle>
            <CardDescription className="pt-2 text-base">
              Manage your site resources here.
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-1">
             <Card>
                <CardHeader>
                    <CardTitle>Add New Resource</CardTitle>
                    <CardDescription>
                        Upload a new PDF resource. It will appear on the public resources page.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <UploadForm />
                </CardContent>
             </Card>
          </div>
          <div className="md:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Manage Existing Resources</CardTitle>
                    <CardDescription>
                        Edit or delete uploaded resources.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                   <ResourceTable resources={resources} />
                </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
