import { getLeaderboard } from '@/app/devdare/actions';
import { LeaderboardClient } from '@/components/leaderboard-client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Trophy } from 'lucide-react';

export default async function LeaderboardPage() {
  const leaderboardData = await getLeaderboard();

  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <div className="flex justify-center mb-6">
            <Trophy className="h-16 w-16 text-primary" />
      </div>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">Dare Leaderboard</h1>
        <p className="text-muted-foreground mt-2">See who is rising to the challenge!</p>
      </div>
      <LeaderboardClient initialData={leaderboardData} />
    </div>
  );
}
