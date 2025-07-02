import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Bot } from 'lucide-react';

export default function Home() {
  return (
    <div className="container flex flex-col items-center justify-center flex-grow text-center px-4 py-12 md:py-24">
      <div className="animate-in fade-in-0 slide-in-from-top-12 duration-1000 ease-in-out">
        <div className="inline-block rounded-full p-3 bg-primary/10 mb-6 ring-4 ring-primary/5 animate-bounce-slow">
          <Bot className="h-12 w-12 text-primary" />
        </div>
      </div>
      <h1 
        className="text-4xl md:text-6xl font-extrabold tracking-tighter text-foreground mb-4
                   animate-in fade-in-0 slide-in-from-bottom-6 duration-700 ease-out delay-300"
      >
        Welcome to <span className="text-primary">haas.fry</span>
      </h1>
      <p 
        className="max-w-2xl mx-auto text-lg text-muted-foreground mb-8
                   animate-in fade-in-0 slide-in-from-bottom-8 duration-700 ease-out delay-500"
      >
        The only place where code gets a sense of humor. My AI is trained to dish out witty, sarcastic, and sometimes brutally honest roasts based on your tech stack. It's all in good fun... probably.
      </p>
      <div 
        className="animate-in fade-in-0 zoom-in-75 duration-700 ease-out delay-700"
      >
        <Button asChild size="lg" className="shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-shadow">
          <Link href="/roast">
            Let's Get Roasted <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
