
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getPosts } from '@/lib/posts';
import Script from 'next/script';

export default async function ArticlesPage() {
  const allPosts = await getPosts();
  const articles = allPosts.filter(post => post.type === 'article');

  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Fun & Educational Articles</h1>
          <p className="text-muted-foreground mt-2">Questionable wisdom and actual knowledge from the tech trenches.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {articles.map((article) => (
            <Card key={article.id} className="transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
              <CardHeader>
                <CardTitle>{article.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{article.content}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
         {articles.length === 0 && (
          <p className="text-center text-muted-foreground col-span-2 py-12">No articles found. Check back later!</p>
        )}

        {/* In-article Ad */}
        <div className="my-8">
            <ins className="adsbygoogle"
                style={{display:'block', textAlign:'center'}}
                data-ad-layout="in-article"
                data-ad-format="fluid"
                data-ad-client="ca-pub-5699659351458850"
                data-ad-slot="5817554378"></ins>
            <Script id="in-article-ad-articles" strategy="lazyOnload">
                {`(adsbygoogle = window.adsbygoogle || []).push({});`}
            </Script>
        </div>
      </div>
    </div>
  );
}
