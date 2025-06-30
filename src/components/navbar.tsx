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
  { href: '/blogs', label: 'Blogs' },
  { href: '/articles', label: 'Articles' },
  { href: '/memes', label: 'Memes' },
  { href: '/interactive', label: 'Interactive' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-card-foreground/10 bg-card/20 backdrop-blur-xl">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <Code2 className="h-6 w-6 text-primary" />
            <span className="font-bold">Roast-My-Code</span>
          </Link>
        </div>
        <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-foreground/80 text-foreground">
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
                <span className="font-bold">Roast-My-Code</span>
              </Link>
                <nav className="flex flex-col space-y-4">
                  {navLinks.map(link => (
                    <Link key={link.href} href={link.href} className="text-lg font-medium" onClick={() => setIsOpen(false)}>
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
