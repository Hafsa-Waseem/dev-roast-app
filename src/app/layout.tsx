import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Script from 'next/script';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { MetaBackground } from '@/components/meta-background';

export const metadata: Metadata = {
  title: 'haas.fry | AI Roasting App for Techies',
  description: 'Get roasted by AI based on your tech battlefield! Developers, Marketers, Designers — no one is safe. Try it now.',
  keywords: ['AI Roast', 'Code Roast', 'Developer Fun', 'Tech Battlefield', 'Funny Programming Roast', 'AI Jokes', 'Developer Humor'],
  openGraph: {
    title: 'haas.fry | AI Roasting for Developers & Tech Enthusiasts',
    description: 'Pick your tech battlefield and let AI roast you. Fun for Developers, Marketers, Designers, and more.',
    url: 'https://dev-roast-app.vercel.app/',
    siteName: 'haas.fry',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    title: 'haas.fry | Fun AI Roasting',
    description: 'Let AI roast your favorite tech skill. It’s free, fun, and shareable!',
    card: 'summary',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

         {/* Google Adsense */}
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5699659351458850" crossOrigin="anonymous" />

           {/* Google Analytics */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-QB1N9YWEGY" />
        <Script id="gtag-init" dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QB1N9YWEGY');
          `,
        }} />
      </head>
      <body className="font-body antialiased flex flex-col min-h-dvh bg-background text-foreground" suppressHydrationWarning>
        <div className="fixed inset-0 -z-20 h-dvh w-dvw bg-background" />
        <Navbar />
        <main className="flex-grow relative">
          <MetaBackground />
          <div className="relative z-10">
            {children}
          </div>
        </main>
        <Footer />
        <Toaster />

       
     

        {/* Adsterra Ads */}
        <Script id="adsterra-init" dangerouslySetInnerHTML={{
          __html: `
            atOptions = {
              'key' : 'bc2c6afb4f6e29c71bbc0aa6f917fd57',
              'format' : 'iframe',
              'height' : 300,
              'width' : 900,
              'params' : {}
            };
          `,
        }} />
        <Script async src="//pierconditioner.com/bc2c6afb4f6e29c71bbc0aa6f917fd57/invoke.js" />
        <Script async src="//pierconditioner.com/ad/f9/99/adf99978c8b316ef8a2a33cc7f57f165.js" />
       <Script async data-cfasync="false" src="//pierconditioner.com/45eb9c13d55be4db1c0ad28d5e62f371/invoke.js" />
       <div id="container-45eb9c13d55be4db1c0ad28d5e62f371"></div>

      </body>
    </html>
  );
}
