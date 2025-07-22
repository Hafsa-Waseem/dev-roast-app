'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, Search, Share2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

type Resource = {
  id: string;
  title: string;
  description: string;
  href: string;
};

type ResourceListProps = {
  initialResources: Resource[];
};

export function ResourceList({ initialResources }: ResourceListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const handleShare = (resourceId: string, title: string) => {
    const shareUrl = `${window.location.origin}/resources#${resourceId}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      toast({
        title: 'Link Copied!',
        description: `A shareable link for "${title}" has been copied to your clipboard.`,
      });
    }).catch(err => {
      console.error('Failed to copy: ', err);
      toast({
        title: 'Error',
        description: 'Failed to copy link.',
        variant: 'destructive',
      });
    });
  };

  const getAdsterraDirectLink = (resourceDownloadUrl: string) => {
    const adsterraBaseUrl = 'https://pierconditioner.com/36/e7/9b/36e79b63a5d334a6a26fe2cfda672d66.js';
    // This is a common pattern for smart links, but might need adjustment
    // based on Adsterra's specific documentation for Smart Direct Links.
    // We encode the final destination URL to be passed to the ad server.
    const encodedUrl = encodeURIComponent(window.location.origin + resourceDownloadUrl);
    // This is a hypothetical structure. The actual implementation might differ.
    // For now, we will assume the script handles the click and redirects.
    // A more direct approach is to wrap the download link in their smart link URL.
    // The provided script is an interstitial, not a direct link wrapper.
    // A typical direct link would be something like:
    // 'https://ad-network.com/smart-link-key?destination=ENCODED_URL'
    // Since we only have the script, we will re-implement the script injection logic
    // but without the problematic timeout. The script itself should handle showing the ad
    // and then allowing the user to proceed.
    return resourceDownloadUrl; // Returning the original for now, logic is in the button.
  };

  const handleDownloadClick = (e: React.MouseEvent<HTMLAnchorElement>, resource: Resource) => {
    // This function will now be responsible for triggering the ad.
    // The download will happen on the ad network's terms (e.g., after a timer or ad close).
    // This approach is more robust than a blind setTimeout.
    const adScriptUrl = '//pierconditioner.com/36/e7/9b/36e79b63a5d334a6a26fe2cfda672d66.js';
    
    // Check if script already exists to avoid duplicates
    if (!document.querySelector(`script[src='${adScriptUrl}']`)) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = adScriptUrl;
      document.head.appendChild(script);
    }
  };

  const filteredResources = useMemo(() => {
    if (!searchTerm) {
      return initialResources;
    }
    return initialResources.filter(resource =>
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, initialResources]);

  return (
    <div className="space-y-12">
      <div className="relative max-w-lg mx-auto">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search for resources..."
          className="w-full rounded-full pl-12 pr-4 py-2 h-11"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredResources.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredResources.map((resource) => {
              // This is the Adsterra Smart Direct Link format.
              // It requires a unique key and the destination URL.
              const adsterraSmartLink = `https://disputecater.com/vq6p1p1x?key=2ea015cb84244f781a5db125b03511f5&sub_id1=${encodeURIComponent(resource.id)}`;

              return (
              <Card key={resource.id} id={resource.id} className="flex flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1 scroll-mt-20">
                <CardContent className="p-6 flex flex-col flex-grow items-center text-center">
                  <div className="p-4 bg-primary/10 rounded-full mb-4">
                    <FileText className="h-10 w-10 text-primary" />
                  </div>
                  <Badge variant="secondary" className="mb-3">
                    PDF Resource
                  </Badge>
                  <h3 className="text-xl font-bold text-primary mb-2">
                    {resource.title}
                  </h3>
                  <p className="text-muted-foreground text-sm flex-grow">
                    {resource.description}
                  </p>
                </CardContent>
                <CardFooter className="p-4 mt-auto border-t border-card-foreground/10 flex items-center justify-center gap-2">
                   <Button asChild className="flex-1">
                      <a 
                        href={adsterraSmartLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={() => {
                          // After the ad link is opened, we redirect the original page to the actual file.
                          // This provides a fallback. The target='_blank' should open the ad in a new tab.
                          setTimeout(() => {
                            window.location.href = resource.href;
                          }, 500); // Small delay
                        }}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleShare(resource.id, resource.title)}
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      ) : (
         <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-card-foreground/20 bg-card/20 backdrop-blur-xl shadow-lg">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">No Resources Found</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Your search for "{searchTerm}" did not match any resources. Try another term.
            </p>
         </div>
      )}
    </div>
  );
}
