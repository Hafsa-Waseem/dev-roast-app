import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Bot } from 'lucide-react';

export default function Home() {
  return (
    <div className="container flex flex-col items-center justify-center flex-grow text-center px-4">
      <div className="animate-in fade-in-up duration-1000 ease-in-out">
        <div className="inline-block rounded-full p-3 bg-primary/10 mb-4 ring-4 ring-primary/5">
          <Bot className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-foreground mb-4">
          Welcome to <span className="text-primary">Roast-My-Code</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-8">
          The only place where code gets a sense of humor. Our AI is trained to dish out witty, sarcastic, and sometimes brutally honest roasts based on your tech stack. It's all in good fun... probably.
        </p>
        <div className="flex justify-center gap-4">
           <Button asChild size="lg" className="shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-shadow">
            <Link href="/roast">
              Let's Get Roasted <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
