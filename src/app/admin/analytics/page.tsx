// src/app/admin/analytics/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users, FileDown, Eye, LineChart, ArrowLeft, AlertTriangle } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// --- Helper Functions for Data Simulation ---
const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export default function AnalyticsPage() {
  const [activeUsers, setActiveUsers] = useState(0);
  const [topPages, setTopPages] = useState([]);
  const [topDownloads, setTopDownloads] = useState([]);

  useEffect(() => {
    // Set initial random values on mount to avoid hydration mismatch
    setActiveUsers(getRandomInt(5, 20));
    setTopPages([
      { name: '/roast', views: getRandomInt(80, 200) },
      { name: '/resources', views: getRandomInt(60, 180) },
      { name: '/interactive', views: getRandomInt(50, 150) },
      { name: '/memes', views: getRandomInt(40, 120) },
      { name: '/blogs', views: getRandomInt(30, 100) },
    ]);
    setTopDownloads([
      { name: 'ChatGPT Prompts', downloads: getRandomInt(40, 100) },
      { name: 'React Cheatsheet', downloads: getRandomInt(30, 90) },
      { name: 'CSS Guide', downloads: getRandomInt(20, 80) },
    ]);

    const interval = setInterval(() => {
      // Simulate active users fluctuation
      setActiveUsers(prev => Math.max(0, prev + getRandomInt(-2, 2)));

      // Simulate page views increasing
      setTopPages(pages => pages.map(p => ({ ...p, views: p.views + getRandomInt(0, 3) })).sort((a,b) => b.views - a.views));
      
      // Simulate downloads increasing
      setTopDownloads(downloads => downloads.map(d => ({ ...d, downloads: d.downloads + getRandomInt(0, 1) })).sort((a,b) => b.downloads - a.downloads));

    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const chartConfig = {
    views: { label: "Views", color: "hsl(var(--primary))" },
    downloads: { label: "Downloads", color: "hsl(var(--accent-foreground))" }
  };

  return (
    <div className="container mx-auto max-w-7xl py-12 px-4">
        <div className="flex justify-between items-center mb-8">
            <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tight text-primary">Analytics Dashboard</h1>
                <p className="text-lg text-muted-foreground">A real-time overview of your website's activity.</p>
            </div>
            <Button asChild variant="outline">
                <Link href="/admin/upload">
                    <ArrowLeft className="mr-2"/>
                    Back to Admin
                </Link>
            </Button>
        </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <Card className="transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{activeUsers}</div>
            <p className="text-xs text-muted-foreground">Currently on the site</p>
          </CardContent>
        </Card>
        <Card className="transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Page</CardTitle>
            <Eye className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold truncate">{topPages[0]?.name || 'N/A'}</div>
            <p className="text-xs text-muted-foreground">{topPages[0]?.views || 0} views</p>
          </CardContent>
        </Card>
        <Card className="transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Download</CardTitle>
            <FileDown className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold truncate">{topDownloads[0]?.name || 'N/A'}</div>
            <p className="text-xs text-muted-foreground">{topDownloads[0]?.downloads || 0} downloads</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        <Card className="lg:col-span-1 transition-shadow duration-300 hover:shadow-2xl">
          <CardHeader>
            <CardTitle>Most Visited Pages</CardTitle>
            <CardDescription>Top 5 pages by page views.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
                <BarChart data={topPages} layout="vertical" margin={{ left: 10, right: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={80} tick={{fontSize: 12}} />
                    <Tooltip
                        cursor={{fill: 'hsl(var(--muted))'}}
                        content={<ChartTooltipContent />}
                    />
                    <Legend />
                    <Bar dataKey="views" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-1 transition-shadow duration-300 hover:shadow-2xl">
          <CardHeader>
            <CardTitle>Top Resource Downloads</CardTitle>
            <CardDescription>Most popular PDF downloads.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
                <BarChart data={topDownloads} layout="vertical" margin={{ left: 10, right: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={110} tick={{fontSize: 12}} />
                    <Tooltip
                        cursor={{fill: 'hsl(var(--muted))'}}
                        content={<ChartTooltipContent />}
                    />
                    <Legend />
                    <Bar dataKey="downloads" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
       <Card className="mt-6 border-destructive bg-destructive/5">
          <CardHeader>
              <CardTitle className="text-destructive flex items-center gap-2"><AlertTriangle /> Important: Using Simulated Data</CardTitle>
          </CardHeader>
          <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                The Google Analytics script in your app is correctly <span className="font-semibold text-foreground">sending</span> data to Google. You can view your real data on the official Google Analytics website.
                <br /><br />
                Displaying that data back here in this dashboard is a more complex task. It requires setting up Google's Data API with special credentials from your Google Cloud account. Since I don't have access to that, this dashboard currently shows <span className="font-semibold text-foreground">simulated data</span> for demonstration purposes.
              </p>
          </CardContent>
       </Card>
    </div>
  );
}
