import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const resources = [
  {
    title: 'The Ultimate Guide to React Hooks',
    description: 'A comprehensive PDF covering everything you need to know about React Hooks, from useState to custom hooks.',
    href: '/pdfs/react-hooks-guide.pdf', // Placeholder link
  },
  {
    title: 'Mastering Tailwind CSS',
    description: 'Learn how to build beautiful, custom designs with Tailwind CSS. This guide covers utility-first fundamentals, responsive design, and more.',
    href: '/pdfs/tailwind-css-guide.pdf',
  },
  {
    title: 'Next.js 14 Deep Dive',
    description: 'Explore the latest features of Next.js, including the App Router, Server Actions, and advanced rendering techniques.',
    href: '/pdfs/nextjs-14-deep-dive.pdf',
  },
  {
    title: 'JavaScript Essentials for Developers',
    description: 'A complete reference for modern JavaScript (ES6+), covering asynchronous programming, modules, and new syntax.',
    href: '/pdfs/javascript-essentials.pdf',
  },
];

export default function ResourcesPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Developer Resources</h1>
          <p className="text-muted-foreground mt-2">Download our hand-picked guides and cheat sheets to level up your skills.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {resources.map((resource, index) => (
            <Card key={index} className="flex flex-col transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
              <CardHeader>
                <CardTitle>{resource.title}</CardTitle>
                <CardDescription>{resource.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow"></CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <a href={resource.href} download>
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
