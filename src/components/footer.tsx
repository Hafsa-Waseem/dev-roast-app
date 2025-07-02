import Link from "next/link";

export function Footer() {
  const footerLinks = [
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact Us' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms & Conditions' },
    { href: '/disclaimer', label: 'Disclaimer' },
  ];

  return (
    <footer className="w-full border-t border-border bg-background/80 backdrop-blur-lg">
      <div className="container flex flex-col items-center justify-center gap-4 py-8 md:flex-row md:justify-between">
        <p className="text-sm text-foreground">
          © {new Date().getFullYear()} haas.fry. All rights reserved.
        </p>
        <nav className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          {footerLinks.map(link => (
            <Link key={link.href} href={link.href} className="text-sm text-foreground transition-all duration-300 hover:text-primary hover:underline underline-offset-4">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
