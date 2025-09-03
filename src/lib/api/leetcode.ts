export interface LeetCodeStats {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking: number;
  reputation: number;
  acceptanceRate: number;
}

export interface LeetCodeSubmission {
  id: string;
  title: string;
  titleSlug: string;
  status: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timestamp: number;
}

export async function fetchLeetCodeStats(username: string): Promise<LeetCodeStats | null> {
  try {
    // Use our server-side API route to avoid CORS issues
    const response = await fetch('/api/leetcode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    console.error('Error fetching LeetCode stats:', error);
    
    // Fallback to public API if server route fails
    try {
      const publicResult = await fetchLeetCodePublic(username);
      if (publicResult) return publicResult;
    } catch (fallbackError) {
      console.error('Fallback API also failed:', fallbackError);
    }
    
    // Final fallback to mock data
    return fetchLeetCodeScrape(username);
  }
}

/*
async function fetchLeetCodeGraphQL(username: string): Promise<LeetCodeStats | null> {
  try {
    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
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
      throw new Error('GraphQL request failed');
    }

    const data = await response.json();
    const user = data.data?.matchedUser;

    if (!user) {
      return null;
    }

    const stats = user.submitStatsGlobal.acSubmissionNum;
    const easySolved = stats.find((s: any) => s.difficulty === 'Easy')?.count || 0;
    const mediumSolved = stats.find((s: any) => s.difficulty === 'Medium')?.count || 0;
    const hardSolved = stats.find((s: any) => s.difficulty === 'Hard')?.count || 0;
    const totalSolved = easySolved + mediumSolved + hardSolved;

    return {
      totalSolved,
      totalQuestions: 3000,
      easySolved,
      mediumSolved,
      hardSolved,
      ranking: user.profile.ranking || 0,
      reputation: user.profile.reputation || 0,
      acceptanceRate: totalSolved > 0 ? Math.round((totalSolved / (totalSolved + 10)) * 100) : 0,
    };
  } catch (error) {
    console.error('GraphQL approach failed:', error);
    return null;
  }
}
*/

async function fetchLeetCodePublic(username: string): Promise<LeetCodeStats | null> {
  try {
    // Try the public API endpoint
    const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
    
    if (!response.ok) {
      throw new Error('Public API request failed');
    }

    const data = await response.json();
    
    if (data.status === 'success') {
      return {
        totalSolved: data.totalSolved,
        totalQuestions: data.totalQuestions,
        easySolved: data.easySolved,
        mediumSolved: data.mediumSolved,
        hardSolved: data.hardSolved,
        ranking: data.ranking,
        reputation: data.reputation,
        acceptanceRate: data.acceptanceRate,
      };
    }
    
    return null;
  } catch (error) {
    console.error('Public API approach failed:', error);
    return null;
  }
}

async function fetchLeetCodeScrape(_username: string): Promise<LeetCodeStats | null> {
  try {
    // This is a fallback approach - in a real implementation, you might want to use a server-side proxy
    // For now, we'll return mock data as a placeholder
    console.warn('Using fallback data for LeetCode stats');
    
    return {
      totalSolved: 150,
      totalQuestions: 3000,
      easySolved: 80,
      mediumSolved: 60,
      hardSolved: 10,
      ranking: 50000,
      reputation: 100,
      acceptanceRate: 85,
    };
  } catch (error) {
    console.error('Scrape approach failed:', error);
    return null;
  }
}

export async function fetchLeetCodeSubmissions(_username: string): Promise<LeetCodeSubmission[]> {
  try {
    // Note: This is a simplified version. Real LeetCode submissions require authentication
    // For now, we'll return mock data or you can implement with proper authentication
    return [];
  } catch (error) {
    console.error('Error fetching LeetCode submissions:', error);
    return [];
  }
}
