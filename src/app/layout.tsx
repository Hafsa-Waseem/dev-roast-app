import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Roast-My-Code',
  description: 'Get roasted by an AI based on your favorite programming language.',
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
      </head>
      <body className="font-body antialiased">
        
        {children}
        <Toaster />

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

        {/* Adsterra Ads */}
        <Script id="adsterra-init" dangerouslySetInnerHTML={{
          __html: `
            atOptions = {
              'key' : 'bc2c6afb4f6e29c71bbc0aa6f917fd57',
              'format' : 'iframe',
              'height' : 300,
              'width' : 160,
              'params' : {}
            };
          `,
        }} />
        <Script async src="//pierconditioner.com/bc2c6afb4f6e29c71bbc0aa6f917fd57/invoke.js" />
        <Script async src="//pierconditioner.com/ad/f9/99/adf99978c8b316ef8a2a33cc7f57f165.js" />
        <script async="async" data-cfasync="false" src="//pierconditioner.com/45eb9c13d55be4db1c0ad28d5e62f371/invoke.js"></script>
<div id="container-45eb9c13d55be4db1c0ad28d5e62f371"></div>

      </body>
    </html>
  );
}
