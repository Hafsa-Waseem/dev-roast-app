// src/app/admin/login/page.tsx
'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Admin Access</CardTitle>
          <CardDescription>
            Admin functionality is enabled. Please proceed to the dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <Alert>
                <AlertDescription>
                    The admin area is currently open for access. No login is required.
                </AlertDescription>
            </Alert>
          <Button asChild className="w-full">
            <Link href="/admin/dashboard">Go to Dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
