'use client';

import { useActionState, useRef, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { handleAddDare } from '@/app/devdare/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const initialState = { message: '', errors: null };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <PlusCircle className="mr-2 h-4 w-4" />}
      {pending ? 'Adding Dare...' : 'Add Dare'}
    </Button>
  );
}

export function AddDareForm() {
  const [state, formAction] = useActionState(handleAddDare, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.message) {
      toast({
        title: state.errors ? 'Error' : 'Success',
        description: state.message,
        variant: state.errors ? 'destructive' : 'default',
      });
      if (!state.errors && state.message.includes('successfully')) {
        formRef.current?.reset();
      }
    }
  }, [state, toast]);

  return (
    <form ref={formRef} action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="dareText">Dare Text</Label>
        <Textarea
          id="dareText"
          name="dareText"
          placeholder="e.g., Rewrite a function using only ternary operators."
          required
          rows={4}
        />
        {state?.errors?.dareText && (
          <p className="text-sm font-medium text-destructive">{state.errors.dareText[0]}</p>
        )}
      </div>
      <SubmitButton />
    </form>
  );
}
