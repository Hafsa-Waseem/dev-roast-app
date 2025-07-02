'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { handleAdminLogin } from '@/app/admin/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { KeyRound, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const initialState = { message: '' };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <KeyRound className="mr-2 h-4 w-4" />}
      {pending ? 'Verifying...' : 'Unlock Admin Panel'}
    </Button>
  );
}

export function AdminLoginForm() {
  const [state, formAction] = useActionState(handleAdminLogin, initialState);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Admin Access</CardTitle>
        <CardDescription>Enter the secret key to manage content.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="secretKey">Secret Key</Label>
            <Input id="secretKey" name="secretKey" type="password" placeholder="••••••••••••" required />
          </div>
          {state?.message && (
             <Alert variant="destructive">
                <AlertDescription>{state.message}</AlertDescription>
             </Alert>
          )}
          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}
