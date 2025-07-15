'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Medal } from 'lucide-react';

type LeaderboardEntry = {
  rank: number;
  name: string;
  count: number;
};

type LeaderboardClientProps = {
  initialData: LeaderboardEntry[];
};

export function LeaderboardClient({ initialData }: LeaderboardClientProps) {
  const getMedal = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return rank;
  };
  
  if (initialData.length === 0) {
    return (
         <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-card-foreground/20 bg-card/20 backdrop-blur-xl shadow-lg">
            <Medal className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">The Race Hasn't Started!</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              No dares have been completed yet. Be the first to get on the leaderboard!
            </p>
         </div>
    )
  }

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-center">Rank</TableHead>
            <TableHead>Developer</TableHead>
            <TableHead className="text-right">Dares Completed</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {initialData.map((entry) => (
            <TableRow key={entry.name} className="font-medium">
              <TableCell className="text-center text-xl">{getMedal(entry.rank)}</TableCell>
              <TableCell>{entry.name}</TableCell>
              <TableCell className="text-right text-lg">{entry.count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
