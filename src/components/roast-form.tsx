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

const jobRoles = [
  'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'DevOps Engineer', 'Data Scientist',
  'Project Manager', 'QA Engineer', 'UI/UX Designer', 'Intern', 'Tech Lead', 'Cybersecurity Analyst',
  'Database Administrator', 'Cloud Engineer', 'Mobile Developer', 'Student'
];

const programmingBattlefields = [
  '.NET', 'ActionScript', 'Ada', 'Angular', 'APL', 'Assembly', 'AWK', 'Babel', 'Bash', 'Bootstrap',
  'C', 'C#', 'C++', 'Chapel', 'Clojure', 'COBOL', 'CoffeeScript', 'Common Lisp', 'Crystal', 'CSS',
  'D', 'Dart', 'Delphi', 'Django', 'Docker', 'Dylan', 'Eiffel', 'Elixir', 'Elm', 'Erlang', 'Excel',
  'Express.js', 'F#', 'Factor', 'Flask', 'Forth', 'Fortran', 'Git', 'Go', 'Groovy', 'Haskell',
  'Haxe', 'HTML', 'Idris', 'J', 'Java', 'JavaScript', 'Jira', 'jQuery', 'Julia', 'Kotlin', 'Kubernetes',
  'LabVIEW', 'Laravel', 'Lisp', 'Logo', 'Lua', 'MATLAB', 'ML', 'Modula-2', 'Next.js', 'Nim', 'Node.js',
  'NPM', 'NumPy', 'Objective-C', 'OCaml', 'OpenCL', 'Pandas', 'Pascal', 'Perl', 'PHP', 'PL/I',
  'PostScript', 'PowerShell', 'Prolog', 'Puppet', 'PureScript', 'Python', 'PyTorch', 'Q', 'R', 'Racket',
  'React', 'Reason', 'Rexx', 'Ring', 'Ruby', 'Ruby on Rails', 'Rust', 'S-PLUS', 'SAS', 'Scala', 'Scheme',
  'Scratch', 'Simula', 'Smalltalk', 'SQL', 'Spring Boot', 'Svelte', 'Swift', 'Tailwind CSS', 'Tcl',
  'TensorFlow', 'TypeScript', 'VBScript', 'Verilog', 'VHDL', 'Vim', 'Visual Basic', 'Vue.js', 'Webpack',
  'WordPress', 'Z shell'
];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Brewing Roast...
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
  const [battlefield, setBattlefield] = useState('');
  const [role, setRole] = useState(jobRoles[0]);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    // Set a random battlefield only on the client-side after hydration to avoid mismatch
    setBattlefield(programmingBattlefields[Math.floor(Math.random() * programmingBattlefields.length)]);
  }, []);

  useEffect(() => {
    if (state.message === 'An unexpected error occurred.') {
      toast({
        title: 'Error',
        description: 'Failed to generate roast. The AI might be on a coffee break. Please try again.',
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
          <Label>Your Job Role</Label>
          <Select name="jobRole" value={role} onValueChange={setRole}>
            <SelectTrigger>
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              {jobRoles.map((r) => (
                <SelectItem key={r} value={r}>
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Choose your Battlefield</Label>
          <Select key={battlefield} name="programmingBattlefield" value={battlefield} onValueChange={setBattlefield}>
            <SelectTrigger>
              <SelectValue placeholder="Select a battlefield" />
            </SelectTrigger>
            <SelectContent>
              {programmingBattlefields.map((bf) => (
                <SelectItem key={bf} value={bf}>
                  {bf}
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
