import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

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

        {/* Google Adsense */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5699659351458850" crossOrigin="anonymous"></script>

        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-QB1N9YWEGY"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QB1N9YWEGY');
          `,
        }} />

       <script type="text/javascript">
	atOptions = {
		'key' : 'bc2c6afb4f6e29c71bbc0aa6f917fd57',
		'format' : 'iframe',
		'height' : 300,
		'width' : 160,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//pierconditioner.com/bc2c6afb4f6e29c71bbc0aa6f917fd57/invoke.js"></script>

        <script type='text/javascript' src='//pierconditioner.com/ad/f9/99/adf99978c8b316ef8a2a33cc7f57f165.js'></script>

      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
         <script async src="//pierconditioner.com/ad/f9/99/adf99978c8b316ef8a2a33cc7f57f165.js"></script>
      </body>
    </html>
  );
}
