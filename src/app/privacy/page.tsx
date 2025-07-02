import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Privacy Policy</CardTitle>
          <CardDescription>Last Updated: June 2025</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            I take your privacy as seriously as a semicolon in C++. Which is to say, very seriously.
          </p>
          <h3 className="font-semibold text-foreground pt-4">Information I Collect</h3>
          <p>
            I collect the name and programming battlefield you provide to generate your roast. This information is not stored after the roast is generated. This site also uses standard analytics tools (like Google Analytics) and ads (Google AdSense, Adsterra) which may use cookies and collect anonymous data about your visit.
          </p>
           <h3 className="font-semibold text-foreground pt-4">How Information Is Used</h3>
          <p>
            The information you enter is sent to an AI model to create a roast. It is not used for any other purpose. Analytics data helps me understand site traffic. Ad providers use data to show relevant ads.
          </p>
          <h3 className="font-semibold text-foreground pt-4">Your Choices</h3>
          <p>
            You are not required to provide any personal information to use the main feature of this site. You can manage cookies through your browser settings.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
