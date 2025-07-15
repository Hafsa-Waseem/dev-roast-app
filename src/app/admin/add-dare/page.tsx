import { AddDareForm } from '@/components/admin-add-dare-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function AddDarePage() {
  return (
    <div className="container mx-auto max-w-2xl py-12 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Add a New Dev Dare</CardTitle>
          <CardDescription>
            Create a new challenge for developers. Keep it short, funny, and challenging!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AddDareForm />
        </CardContent>
      </Card>
    </div>
  );
}
