// src/app/admin/dashboard/_components/upload-form.tsx
'use client';

import { useActionState, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, UploadCloud } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { handleAddResource } from '@/app/actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const initialState = {
  success: false,
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

export function UploadForm() {
  const [state, formAction, isPending] = useActionState(handleAddResource, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  if (state.success && !isPending) {
      toast({
          title: 'Success!',
          description: 'The resource has been uploaded successfully.',
      });
      state.success = false; // Reset for next submission
      state.message = '';
      formRef.current?.reset();
  } else if (state.message && !isPending) {
       toast({
          title: 'Error',
          description: state.message,
          variant: 'destructive',
       });
       state.message = ''; // Reset for next submission
  }

  return (
    <form ref={formRef} action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Resource Title</Label>
        <Input id="title" name="title" placeholder="e.g., React Cheat Sheet" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="A brief description of the resource."
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="pdfFile">PDF File</Label>
        <Input id="pdfFile" name="pdfFile" type="file" accept=".pdf" required />
      </div>

      <SubmitButton />
    </form>
  );
}