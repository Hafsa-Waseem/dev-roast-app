import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github, Linkedin } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Connect With Me</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
            <p className="text-muted-foreground px-4">
              I'd love to connect with you! Feel free to follow my work, send a message, or check out my projects.
            </p>
            <div className="flex justify-center items-center gap-4 pt-4">
             <Button asChild>
                <a href="https://www.linkedin.com/in/hafsa-waseem4" target="_blank" rel="noopener noreferrer">
                  <Linkedin />
                  LinkedIn
                </a>
              </Button>
              <Button asChild>
                 <a href="https://github.com/Hafsa-Waseem" target="_blank" rel="noopener noreferrer">
                  <Github />
                  GitHub
                </a>
              </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
