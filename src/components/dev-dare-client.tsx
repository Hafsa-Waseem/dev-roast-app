'use client';

import { useState, useTransition, useActionState, useEffect } from 'react';
import { getRandomDare, handleCompleteDare } from '@/app/devdare/actions';
import { Button } from '@/components/ui/button';
import { Loader2, Dice5, PartyPopper, AlertTriangle, User } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

type Dare = {
  id: string;
  text: string;
};

const initialCompletionState = { success: false, error: null, message: '' };

function getDeviceId() {
  if (typeof window === 'undefined') return 'server';
  let deviceId = localStorage.getItem('deviceId');
  if (!deviceId) {
    deviceId = crypto.randomUUID();
    localStorage.setItem('deviceId', deviceId);
  }
  return deviceId;
}

export function DevDareClient() {
  const [dare, setDare] = useState<Dare | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [completionState, completeAction, isCompleting] = useActionState(handleCompleteDare, initialCompletionState);
  const [name, setName] = useState('');
  const [showCompletionForm, setShowCompletionForm] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (completionState.success) {
      toast({ title: 'Success!', description: completionState.message });
      setDare(null);
      setShowCompletionForm(false);
      setName('');
    } else if (completionState.error) {
      toast({ title: 'Oops!', description: completionState.error, variant: 'destructive' });
    }
  }, [completionState, toast]);

  const fetchDare = () => {
    startTransition(async () => {
      setError(null);
      setDare(null);
      setShowCompletionForm(false);
      const result = await getRandomDare();
      if (result.error) {
        setError(result.error);
      } else if (result.dare) {
        setDare(result.dare);
      }
    });
  };
  
  const deviceId = getDeviceId();

  return (
    <div className="space-y-6">
      {!dare && (
        <Button onClick={fetchDare} disabled={isPending} size="lg" className="w-full">
          {isPending ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Dice5 className="mr-2 h-5 w-5" />}
          {isPending ? 'Summoning a Dare...' : 'Give Me a Dare'}
        </Button>
      )}

      {error && (
        <div className="flex items-center justify-center gap-2 text-destructive">
          <AlertTriangle className="h-5 w-5" />
          <p>{error}</p>
        </div>
      )}

      {dare && (
        <div className="animate-in fade-in-50">
          <Card className="bg-secondary/50 border-dashed">
            <CardHeader>
              <p className="text-2xl text-center font-bold leading-relaxed text-primary">
                {dare.text}
              </p>
            </CardHeader>
            <CardContent>
              {showCompletionForm ? (
                <form action={completeAction} className="space-y-4">
                  <input type="hidden" name="dareId" value={dare.id} />
                  <input type="hidden" name="deviceId" value={deviceId} />
                  <div className="space-y-2 text-left">
                    <Label htmlFor="name">Your Name (Optional)</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        name="name"
                        placeholder="AnonymousDev"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                  </div>
                  <Button type="submit" disabled={isCompleting} className="w-full">
                    {isCompleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Confirm Completion!
                  </Button>
                </form>
              ) : (
                <Button onClick={() => setShowCompletionForm(true)} className="w-full" size="lg">
                  <PartyPopper className="mr-2 h-5 w-5" />
                  I Completed This!
                </Button>
              )}
            </CardContent>
             <CardFooter>
                <Button onClick={fetchDare} disabled={isPending} variant="link" className="mx-auto">
                    Give me another one
                </Button>
             </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}
