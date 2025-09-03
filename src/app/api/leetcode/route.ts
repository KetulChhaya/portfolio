import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { username } = await request.json();

    if (!username) {
      return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }

    // Fetch LeetCode data server-side (no CORS issues)
    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query userPublicProfile($username: String!) {
            matchedUser(username: $username) {
              username
              profile {
                ranking
                reputation
                userAvatar
              }
              submitStatsGlobal {
                acSubmissionNum {
                  difficulty
                  count
                  submissions
                }
              }
            }
          }
        `,
        variables: { username },
      }),
    });

    if (!response.ok) {
      throw new Error(`LeetCode API responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    // Check if user exists
    if (!data.data?.matchedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const user = data.data.matchedUser;
    const stats = user.submitStatsGlobal.acSubmissionNum;
    
    // Parse the stats
    const easySolved = stats.find((s: { difficulty: string; count: number }) => s.difficulty === 'Easy')?.count || 0;
    const mediumSolved = stats.find((s: { difficulty: string; count: number }) => s.difficulty === 'Medium')?.count || 0;
    const hardSolved = stats.find((s: { difficulty: string; count: number }) => s.difficulty === 'Hard')?.count || 0;
    const totalSolved = easySolved + mediumSolved + hardSolved;

    const result = {
      totalSolved,
      totalQuestions: 3000,
      easySolved,
      mediumSolved,
      hardSolved,
      ranking: user.profile.ranking || 0,
      reputation: user.profile.reputation || 0,
      acceptanceRate: totalSolved > 0 ? Math.round((totalSolved / (totalSolved + 10)) * 100) : 0,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('LeetCode API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch LeetCode data' },
      { status: 500 }
    );
  }
}
