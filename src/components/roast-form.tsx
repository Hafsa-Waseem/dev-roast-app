'use client';

import { useEffect, useRef, useState, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { handleGenerateRoast } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RoastCard } from './roast-card';
import { Loader2, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const initialState = {
  message: null,
  roast: null,
  errors: null,
};

const programmingLanguages = [
  'JavaScript',
  'Python',
  'Java',
  'C++',
  'TypeScript',
  'Rust',
  'Go',
  'PHP',
  'C#',
  'Swift',
];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Roasting...
        </>
      ) : (
        <>
          <Wand2 className="mr-2 h-4 w-4" />
          Roast Me
        </>
      )}
    </Button>
  );
}

export function RoastForm() {
  const [state, formAction] = useActionState(handleGenerateRoast, initialState);
  const [language, setLanguage] = useState(programmingLanguages[0]);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message === 'An unexpected error occurred.') {
      toast({
        title: 'Error',
        description: 'Failed to generate roast. Please try again.',
        variant: 'destructive',
      });
    }
  }, [state, toast]);

  return (
    <div className="space-y-6">
      <form action={formAction} ref={formRef} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Your Name</Label>
          <Input id="name" name="name" placeholder="e.g., Ada Lovelace" required />
          {state.errors?.name && <p className="text-sm font-medium text-destructive">{state.errors.name[0]}</p>}
        </div>
        <div className="space-y-2">
          <Label>Favorite Programming Language</Label>
          <Select name="programmingLanguage" value={language} onValueChange={setLanguage}>
            <SelectTrigger>
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              {programmingLanguages.map((lang) => (
                <SelectItem key={lang} value={lang}>
                  {lang}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <SubmitButton />
      </form>

      {state.roast && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <RoastCard roast={state.roast} />
        </div>
      )}
    </div>
  );
}
