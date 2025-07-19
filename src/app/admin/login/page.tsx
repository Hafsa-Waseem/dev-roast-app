// src/app/admin/login/page.tsx
'use client';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { handleAdminLogin } from '@/app/actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const initialState = {
    success: false,
    message: ''
};

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button className="w-full" type="submit" disabled={pending}>
             {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Login
        </Button>
    )
}

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(handleAdminLogin, initialState);

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>
            Enter your credentials to access the admin dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>
             {state?.message && !state.success && (
              <Alert variant="destructive">
                <AlertDescription>{state.message}</AlertDescription>
              </Alert>
            )}
            <SubmitButton />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}