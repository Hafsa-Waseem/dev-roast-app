import { Bot } from 'lucide-react';

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
        It’s not just about roasting. It’s about learning, having fun, and grabbing some free resources along the way.
        <br /><br />
        <span className="font-medium text-foreground">💻 AI Roasts | 📚 Tech Quizzes | 📂 Handy PDF Tools</span>
        <br /><br />
        If you’re into tech, love exploring, or just here to have some fun try it out. You might learn something or end up roasted! 😄
      </p>
    </div>
  );
}
