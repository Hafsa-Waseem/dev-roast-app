'use client';

import { useActionState, useRef, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { handleUploadResource } from '@/app/admin/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, UploadCloud } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const initialState = {
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Uploading...
        </>
      ) : (
        <>
          <UploadCloud className="mr-2 h-4 w-4" />
          Upload Resource
        </>
      )}
    </Button>
  );
}

export default function AdminUploadPage() {
  const [state, formAction] = useActionState(handleUploadResource, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.message) {
      toast({
        title: 'Upload Status',
        description: state.message,
      });
      if(state.message.includes("successfully")) {
        formRef.current?.reset();
      }
    }
  }, [state, toast]);

  return (
    <div className="container mx-auto max-w-2xl py-12 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Admin Upload</CardTitle>
          <CardDescription>Upload a new PDF resource for users to download.</CardDescription>
        </CardHeader>
        <CardContent>
          <form ref={formRef} action={formAction} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Resource Title</Label>
              <Input id="title" name="title" placeholder="e.g., Mastering Next.js" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" placeholder="A short description of the resource." required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pdf">PDF File</Label>
              <Input id="pdf" name="pdf" type="file" accept=".pdf" required />
            </div>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
