
'use client';

import type { Post } from '@/lib/posts';
import { useActionState, useRef, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { handleAddPost, handleUpdatePost, handleDeletePost } from '@/app/admin/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Loader2, PlusCircle, Trash2, FilePenLine } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


const initialAddState = { message: '', errors: null };
const initialEditState = { message: '', errors: null };
const initialDeleteState = { message: '' };

type AdminPostManagerProps = {
  initialPosts: Post[];
};

function SubmitButton({ text, pendingText }: { text: string; pendingText: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <PlusCircle className="mr-2 h-4 w-4" />}
      {pending ? pendingText : text}
    </Button>
  );
}

export function AdminPostManager({ initialPosts }: AdminPostManagerProps) {
  const [addState, addAction] = useActionState(handleAddPost, initialAddState);
  const { toast } = useToast();
  const addFormRef = useRef<HTMLFormElement>(null);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [postType, setPostType] = useState<'blog' | 'article' | 'meme'>('blog');

  useEffect(() => {
    if (addState?.message) {
      toast({
        title: 'Action Status',
        description: addState.message,
        variant: addState.errors ? 'destructive' : 'default',
      });
      if (!addState.errors) {
        addFormRef.current?.reset();
        setPostType('blog'); // Reset select
      }
    }
  }, [addState, toast]);

  const postsByType = {
    blogs: initialPosts.filter(p => p.type === 'blog'),
    articles: initialPosts.filter(p => p.type === 'article'),
    memes: initialPosts.filter(p => p.type === 'meme'),
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Manage Posts</CardTitle>
          <CardDescription>Add new blogs, articles, or memes.</CardDescription>
        </CardHeader>
        <CardContent>
          <form ref={addFormRef} action={addAction} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="type">Post Type</Label>
              <Select name="type" value={postType} onValueChange={(v) => setPostType(v as any)} required>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select post type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="blog">Blog</SelectItem>
                  <SelectItem value="article">Article</SelectItem>
                  <SelectItem value="meme">Meme</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(postType === 'blog' || postType === 'article') && (
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" placeholder="Post title" />
                {addState.errors?.title && <p className="text-destructive text-sm">{addState.errors.title[0]}</p>}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea id="content" name="content" placeholder={postType === 'meme' ? 'Meme caption...' : 'Post content or excerpt...'} required />
              {addState.errors?.content && <p className="text-destructive text-sm">{addState.errors.content[0]}</p>}
            </div>

            {postType === 'blog' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Input id="author" name="author" placeholder="Author's name" />
                  {addState.errors?.author && <p className="text-destructive text-sm">{addState.errors.author[0]}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" name="date" placeholder="e.g., June 20, 2025" />
                  {addState.errors?.date && <p className="text-destructive text-sm">{addState.errors.date[0]}</p>}
                </div>
              </div>
            )}
            
            <SubmitButton text="Add Post" pendingText="Adding..." />
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Manage Existing Posts</CardTitle>
          <CardDescription>Edit or delete currently available content.</CardDescription>
        </CardHeader>
        <CardContent>
            <Tabs defaultValue="blogs">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="blogs">Blogs ({postsByType.blogs.length})</TabsTrigger>
                <TabsTrigger value="articles">Articles ({postsByType.articles.length})</TabsTrigger>
                <TabsTrigger value="memes">Memes ({postsByType.memes.length})</TabsTrigger>
              </TabsList>
              <TabsContent value="blogs" className="space-y-4 pt-4">
                {postsByType.blogs.map(post => <PostListItem key={post.id} post={post} onEdit={() => setEditingPost(post)} />)}
                {postsByType.blogs.length === 0 && <p className="text-muted-foreground text-center py-4">No blogs available.</p>}
              </TabsContent>
              <TabsContent value="articles" className="space-y-4 pt-4">
                {postsByType.articles.map(post => <PostListItem key={post.id} post={post} onEdit={() => setEditingPost(post)} />)}
                 {postsByType.articles.length === 0 && <p className="text-muted-foreground text-center py-4">No articles available.</p>}
              </TabsContent>
              <TabsContent value="memes" className="space-y-4 pt-4">
                {postsByType.memes.map(post => <PostListItem key={post.id} post={post} onEdit={() => setEditingPost(post)} />)}
                 {postsByType.memes.length === 0 && <p className="text-muted-foreground text-center py-4">No memes available.</p>}
              </TabsContent>
            </Tabs>
        </CardContent>
      </Card>

      <EditPostDialog 
        post={editingPost}
        isOpen={!!editingPost}
        onOpenChange={(isOpen) => !isOpen && setEditingPost(null)}
      />
    </>
  );
}

function PostListItem({ post, onEdit }: { post: Post, onEdit: () => void }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-md border bg-secondary/30">
      <div className="flex-grow overflow-hidden">
        <p className="font-medium truncate">{post.title || post.content}</p>
        <p className="text-xs text-muted-foreground">{post.type.charAt(0).toUpperCase() + post.type.slice(1)}</p>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <Button variant="ghost" size="icon" onClick={onEdit}>
          <FilePenLine className="h-4 w-4" />
          <span className="sr-only">Edit</span>
        </Button>
        <DeletePostButton postId={post.id} />
      </div>
    </div>
  );
}


function EditPostDialog({ post, isOpen, onOpenChange }: { post: Post | null, isOpen: boolean, onOpenChange: (open: boolean) => void }) {
  const [editState, editAction] = useActionState(handleUpdatePost, initialEditState);
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
  
  useEffect(() => {
    if (!isOpen) {
      if(editState) {
        editState.errors = null;
        editState.message = '';
      }
    }
  }, [isOpen, editState]);

  if (!post) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit {post.type}</DialogTitle>
        </DialogHeader>
        <form action={editAction} ref={formRef} className="space-y-4">
          <input type="hidden" name="id" value={post.id} />
          <input type="hidden" name="type" value={post.type} />
          
          {(post.type === 'blog' || post.type === 'article') && (
            <div className="space-y-2">
              <Label htmlFor="edit-title">Title</Label>
              <Input id="edit-title" name="title" defaultValue={post.title} required />
               {editState.errors?.title && <p className="text-destructive text-sm">{editState.errors.title[0]}</p>}
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="edit-content">Content</Label>
            <Textarea id="edit-content" name="content" defaultValue={post.content} required />
            {editState.errors?.content && <p className="text-destructive text-sm">{editState.errors.content[0]}</p>}
          </div>

          {post.type === 'blog' && (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-author">Author</Label>
                  <Input id="edit-author" name="author" defaultValue={post.author} />
                  {editState.errors?.author && <p className="text-destructive text-sm">{editState.errors.author[0]}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-date">Date</Label>
                  <Input id="edit-date" name="date" defaultValue={post.date} />
                  {editState.errors?.date && <p className="text-destructive text-sm">{editState.errors.date[0]}</p>}
                </div>
              </div>
          )}

          <CardFooter className="px-0 pt-4">
            <Button type="submit" className="w-full" disabled={useFormStatus().pending}>
                {useFormStatus().pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Save Changes
            </Button>
          </CardFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function DeletePostSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="bg-destructive hover:bg-destructive/90" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Yes, delete it
    </Button>
  );
}

function DeletePostButton({ postId }: { postId: string }) {
  const [deleteState, deleteAction] = useActionState(handleDeletePost, initialDeleteState);
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
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10">
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form action={deleteAction}>
          <input type="hidden" name="id" value={postId} />
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this post.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <DeletePostSubmitButton />
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
