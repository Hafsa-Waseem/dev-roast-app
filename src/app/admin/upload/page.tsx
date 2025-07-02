'use client';

import { useActionState, useRef, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { handleUploadResource } from '@/app/admin/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Loader2, UploadCloud, Trash2, FilePenLine } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';

const initialState = {
  message: '',
};

const initialResources = [
  {
    id: 1,
    title: 'The Ultimate Guide to React Hooks',
    description: 'A comprehensive PDF covering everything you need to know about React Hooks, from useState to custom hooks.',
    href: '/pdfs/react-hooks-guide.pdf',
  },
  {
    id: 2,
    title: 'Mastering Tailwind CSS',
    description: 'Learn how to build beautiful, custom designs with Tailwind CSS. This guide covers utility-first fundamentals, responsive design, and more.',
    href: '/pdfs/tailwind-css-guide.pdf',
  },
  {
    id: 3,
    title: 'Next.js 14 Deep Dive',
    description: 'Explore the latest features of Next.js, including the App Router, Server Actions, and advanced rendering techniques.',
    href: '/pdfs/nextjs-14-deep-dive.pdf',
  },
  {
    id: 4,
    title: 'JavaScript Essentials for Developers',
    description: 'A complete reference for modern JavaScript (ES6+), covering asynchronous programming, modules, and new syntax.',
    href: '/pdfs/javascript-essentials.pdf',
  },
];

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
  const [resources, setResources] = useState(initialResources);
  const [editingResource, setEditingResource] = useState<typeof initialResources[0] | null>(null);

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

  const handleDelete = (resourceId: number) => {
    // In a real app, you'd call a server action here.
    // For this prototype, we'll just filter the state.
    setResources(resources.filter(r => r.id !== resourceId));
    toast({
      title: 'Success',
      description: 'Resource deleted (simulated).',
    });
  };

  const handleEditSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingResource) return;

    const formData = new FormData(e.currentTarget);
    const updatedTitle = formData.get('title') as string;
    const updatedDescription = formData.get('description') as string;

    setResources(resources.map(r => 
      r.id === editingResource.id 
        ? { ...r, title: updatedTitle, description: updatedDescription } 
        : r
    ));
    
    toast({
      title: 'Success',
      description: `Resource "${updatedTitle}" updated (simulated).`,
    });
    
    // Close the dialog by resetting the editing state
    setEditingResource(null);
  };

  return (
    <div className="container mx-auto max-w-4xl py-12 px-4 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Admin Panel</CardTitle>
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

      <Card>
        <CardHeader>
          <CardTitle>Manage Existing Resources</CardTitle>
          <CardDescription>Edit or delete currently available resources.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {resources.map((resource) => (
            <div key={resource.id} className="flex items-center justify-between p-3 rounded-md border bg-secondary/30">
              <p className="font-medium flex-grow">{resource.title}</p>
              <div className="flex items-center gap-2">
                <Dialog onOpenChange={(open) => !open && setEditingResource(null)}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={() => setEditingResource(resource)}>
                      <FilePenLine className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                  </DialogTrigger>
                  {editingResource && editingResource.id === resource.id && (
                     <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Resource</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleEditSave} className="space-y-4">
                           <div className="space-y-2">
                              <Label htmlFor="edit-title">Resource Title</Label>
                              <Input id="edit-title" name="title" defaultValue={editingResource.title} required />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="edit-description">Description</Label>
                              <Textarea id="edit-description" name="description" defaultValue={editingResource.description} required />
                            </div>
                           <CardFooter className="px-0 pt-4">
                             <DialogClose asChild>
                                <Button type="submit" className="w-full">Save Changes</Button>
                             </DialogClose>
                           </CardFooter>
                        </form>
                      </DialogContent>
                  )}
                </Dialog>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the resource from public view (simulation).
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(resource.id)} className="bg-destructive hover:bg-destructive/90">
                        Yes, delete it
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
          {resources.length === 0 && (
            <p className="text-muted-foreground text-center py-4">No resources available.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
