import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Privacy Policy</CardTitle>
          <CardDescription>Last Updated: July 2024</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            We take your privacy as seriously as a semicolon in C++. Which is to say, very seriously.
          </p>
          <h3 className="font-semibold text-foreground pt-4">Information We Collect</h3>
          <p>
            We collect the name and programming battlefield you provide to generate your roast. 
            We do not store this information after the roast is generated.
          </p>
           <h3 className="font-semibold text-foreground pt-4">How We Use Information</h3>
          <p>
            The information you enter is sent to an AI model to create a roast. It is not used for any other purpose.
          </p>
          <h3 className="font-semibold text-foreground pt-4">Your Choices</h3>
          <p>
            You are not required to provide any personal information to use the main feature of our site. You can manage cookies through your browser settings.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
