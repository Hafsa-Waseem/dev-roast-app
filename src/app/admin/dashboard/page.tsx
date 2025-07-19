// src/app/admin/dashboard/page.tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { UploadForm } from './_components/upload-form';

export default function AdminDashboardPage() {
  return (
    <div className="flex w-full flex-col items-center justify-center p-4 py-12 md:py-24">
      <Card className="w-full max-w-lg z-10">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Admin Dashboard</CardTitle>
          <CardDescription className="pt-2 text-base">
            Upload new PDF resources here. They will appear on the public resources page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UploadForm />
        </CardContent>
      </Card>
    </div>
  );
}