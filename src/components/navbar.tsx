
'use client';

import Link from 'next/link';
import { Code2, Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from './ui/button';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/roast', label: 'Roast Me' },
  { href: '/resources', label: 'Resources' },
  { href: '/interactive', label: 'Quiz' },
  { href: '/memes', label: 'Memes' },
  { href: '/blogs', label: 'Blogs' },
  { href: '/articles', label: 'Articles' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="container flex h-14 items-center px-4">
        <div className="mr-4 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <Code2 className="h-6 w-6 text-primary" />
            <span className="font-bold">haas.fry</span>
          </Link>
        </div>
        <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
          {navLinks.map(link => (
            <Link key={link.label} href={link.href} className="text-foreground transition-all duration-300 hover:text-primary hover:scale-110 transform">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2 md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px]">
              <div className="flex flex-col p-6">
              <Link href="/" className="mb-8 flex items-center gap-2" onClick={() => setIsOpen(false)}>
                <Code2 className="h-6 w-6 text-primary" />
                <span className="font-bold">haas.fry</span>
              </Link>
                <nav className="flex flex-col space-y-4">
                  {navLinks.map(link => (
                    <Link key={link.label} href={link.href} className="text-lg font-medium transition-all duration-300 hover:text-primary hover:translate-x-2" onClick={() => setIsOpen(false)}>
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
