'use client';

import { useActionState, useRef, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { handleUploadResource, handleEditResource, handleDeleteResource } from '@/app/admin/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Loader2, UploadCloud, Trash2, FilePenLine } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';

const initialUploadState = { message: '', errors: null };
const initialEditState = { message: '', errors: null };
const initialDeleteState = { message: '' };

type Resource = {
  id: string;
  title: string;
  description: string;
  href: string;
};

type AdminResourceManagerProps = {
  initialResources: Resource[];
};

function UploadSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UploadCloud className="mr-2 h-4 w-4" />}
      {pending ? 'Uploading...' : 'Upload Resource'}
    </Button>
  );
}

function EditSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Save Changes
    </Button>
  );
}

export function AdminResourceManager({ initialResources }: AdminResourceManagerProps) {
  const [uploadState, uploadAction] = useActionState(handleUploadResource, initialUploadState);
  const { toast } = useToast();
  const uploadFormRef = useRef<HTMLFormElement>(null);

  const [editingResource, setEditingResource] = useState<Resource | null>(null);

  // Effect for upload notifications
  useEffect(() => {
    if (uploadState?.message) {
      toast({
        title: 'Upload Status',
        description: uploadState.message,
        variant: uploadState.errors ? 'destructive' : 'default',
      });
      if (!uploadState.errors) {
        uploadFormRef.current?.reset();
      }
    }
  }, [uploadState, toast]);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Admin Panel</CardTitle>
          <CardDescription>Upload a new PDF resource for users to download.</CardDescription>
        </CardHeader>
        <CardContent>
          <form ref={uploadFormRef} action={uploadAction} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Resource Title</Label>
              <Input id="title" name="title" placeholder="e.g., Mastering Next.js" required />
              {uploadState.errors?.title && <p className="text-destructive text-sm">{uploadState.errors.title[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" placeholder="A short description of the resource." required />
              {uploadState.errors?.description && <p className="text-destructive text-sm">{uploadState.errors.description[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="pdf">PDF File</Label>
              <Input id="pdf" name="pdf" type="file" accept=".pdf" required />
              {uploadState.errors?.pdf && <p className="text-destructive text-sm">{uploadState.errors.pdf[0]}</p>}
            </div>
            <UploadSubmitButton />
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Manage Existing Resources</CardTitle>
          <CardDescription>Edit or delete currently available resources.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {initialResources.map((resource) => (
            <div key={resource.id} className="flex items-center justify-between p-3 rounded-md border bg-secondary/30">
              <p className="font-medium flex-grow">{resource.title}</p>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => setEditingResource(resource)}>
                  <FilePenLine className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
                <DeleteResourceButton resourceId={resource.id} />
              </div>
            </div>
          ))}
          {initialResources.length === 0 && (
            <p className="text-muted-foreground text-center py-4">No resources available.</p>
          )}
        </CardContent>
      </Card>

      <EditResourceDialog 
        resource={editingResource}
        isOpen={!!editingResource}
        onOpenChange={(isOpen) => !isOpen && setEditingResource(null)}
      />
    </>
  );
}

function EditResourceDialog({ resource, isOpen, onOpenChange }: { resource: Resource | null, isOpen: boolean, onOpenChange: (open: boolean) => void }) {
  const [editState, editAction] = useActionState(handleEditResource, initialEditState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  
  useEffect(() => {
    if(editState?.message) {
      toast({
        title: 'Edit Status',
        description: editState.message,
        variant: editState.errors ? 'destructive' : 'default',
      });
      if (!editState.errors) {
        onOpenChange(false);
      }
    }
  }, [editState, toast, onOpenChange]);
  
  // Reset form state when dialog opens for a new resource
  useEffect(() => {
    if (isOpen) {
      formRef.current?.reset();
    }
  }, [isOpen]);

  if (!resource) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Resource</DialogTitle>
        </DialogHeader>
        <form action={editAction} ref={formRef} className="space-y-4">
          <input type="hidden" name="id" value={resource.id} />
          <div className="space-y-2">
            <Label htmlFor="edit-title">Resource Title</Label>
            <Input id="edit-title" name="title" defaultValue={resource.title} required />
             {editState.errors?.title && <p className="text-destructive text-sm">{editState.errors.title[0]}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-description">Description</Label>
            <Textarea id="edit-description" name="description" defaultValue={resource.description} required />
            {editState.errors?.description && <p className="text-destructive text-sm">{editState.errors.description[0]}</p>}
          </div>
          <CardFooter className="px-0 pt-4">
            <EditSubmitButton />
          </CardFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function DeleteResourceButton({ resourceId }: { resourceId: string }) {
  const [deleteState, deleteAction] = useActionState(handleDeleteResource, initialDeleteState);
  const { toast } = useToast();

  useEffect(() => {
    if (deleteState?.message) {
      toast({
        title: 'Delete Status',
        description: deleteState.message,
      });
    }
  }, [deleteState, toast]);

  return (
    <form action={deleteAction}>
        <input type="hidden" name="id" value={resourceId} />
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
                        This action cannot be undone. This will permanently delete the resource.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Button type="submit" className="bg-destructive hover:bg-destructive/90">
                            Yes, delete it
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </form>
  );
}
