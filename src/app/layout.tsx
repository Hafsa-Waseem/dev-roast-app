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

        {/* ✅ Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5699659351458850"
          crossOrigin="anonymous"
        />

        {/* ✅ Google Analytics */}
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

      
        <div className="my-6 flex justify-center">
          <ins
            className="adsbygoogle"
            style={{
              display: 'block',
            width: '100%', height: '100px' 
            }}
            data-ad-client="ca-pub-5699659351458850"
            data-ad-slot="2428037929"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
          <Script id="footer-display-ad" strategy="afterInteractive">
            {`(adsbygoogle = window.adsbygoogle || []).push({});`}
          </Script>
        </div>

        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
