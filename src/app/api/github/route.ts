import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { username, type } = await request.json();

    if (!username || !type) {
      return NextResponse.json({ error: 'Username and type are required' }, { status: 400 });
    }

    const githubToken = process.env.GITHUB_TOKEN;

    if (type === 'stats') {
      return await fetchGitHubStats(username, githubToken);
    } else if (type === 'contributions') {
      return await fetchGitHubContributions(username, githubToken);
    } else if (type === 'repositories') {
      return await fetchGitHubRepositories(username, githubToken);
    } else {
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }
  } catch (error) {
    console.error('GitHub API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub data' },
      { status: 500 }
    );
  }
}

async function fetchGitHubStats(username: string, token?: string) {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: `
          query($username: String!) {
            user(login: $username) {
              login
              name
              avatarUrl
              bio
              repositories(first: 100, privacy: ALL) {
                totalCount
                nodes {
                  name
                  description
                  primaryLanguage {
                    name
                  }
                  stargazerCount
                  forkCount
                  updatedAt
                  url
                  isPrivate
                }
              }
              followers {
                totalCount
              }
              following {
                totalCount
              }
              contributionsCollection {
                totalCommitContributions
                totalIssueContributions
                totalPullRequestContributions
                totalPullRequestReviewContributions
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      contributionCount
                      date
                    }
                  }
                }
              }
            }
          }
        `,
        variables: { username },
      }),
    });

    if (!response.ok) {
      throw new Error(`GitHub API responded with status: ${response.status}`);
    }

    const data = await response.json();
    const user = data.data?.user;

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Calculate total contributions including private repos
    const totalContributions = user.contributionsCollection.totalCommitContributions +
                              user.contributionsCollection.totalIssueContributions +
                              user.contributionsCollection.totalPullRequestContributions +
                              user.contributionsCollection.totalPullRequestReviewContributions;

    // Get contribution calendar data
    const contributionWeeks = user.contributionsCollection.contributionCalendar.weeks;
    const allContributions = contributionWeeks.flatMap((week: any) => 
      week.contributionDays.map((day: any) => ({
        date: day.date,
        contributionCount: day.contributionCount
      }))
    );

    // Calculate this year's contributions
    const currentYear = new Date().getFullYear();
    const contributionsThisYear = allContributions.filter((day: any) => {
      const year = new Date(day.date).getFullYear();
      return year === currentYear && day.contributionCount > 0;
    }).reduce((sum: number, day: any) => sum + day.contributionCount, 0);

    // Calculate streak
    const streakDays = calculateStreakFromCalendar(allContributions);

    const result = {
      username: user.login,
      name: user.name || user.login,
      avatarUrl: user.avatarUrl,
      bio: user.bio || '',
      publicRepos: user.repositories.nodes.filter((repo: any) => !repo.isPrivate).length,
      followers: user.followers.totalCount,
      following: user.following.totalCount,
      totalContributions,
      contributionsThisYear,
      streakDays,
      privateContributions: user.repositories.nodes.filter((repo: any) => repo.isPrivate).length,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    throw error;
  }
}

async function fetchGitHubContributions(username: string, token?: string) {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: `
          query($username: String!) {
            user(login: $username) {
              contributionsCollection {
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      contributionCount
                      date
                    }
                  }
                }
              }
            }
          }
        `,
        variables: { username },
      }),
    });

    if (!response.ok) {
      throw new Error(`GitHub API responded with status: ${response.status}`);
    }

    const data = await response.json();
    const user = data.data?.user;

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const contributionWeeks = user.contributionsCollection.contributionCalendar.weeks;
    const contributions: any[] = [];

    contributionWeeks.forEach((week: any) => {
      week.contributionDays.forEach((day: any) => {
        contributions.push({
          date: day.date,
          contributionCount: day.contributionCount,
          color: getContributionColor(day.contributionCount),
        });
      });
    });

    return NextResponse.json(contributions);
  } catch (error) {
    console.error('Error fetching GitHub contributions:', error);
    throw error;
  }
}

async function fetchGitHubRepositories(username: string, token?: string) {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: `
          query($username: String!) {
            user(login: $username) {
              repositories(first: 10, orderBy: {field: UPDATED_AT, direction: DESC}, privacy: ALL) {
                nodes {
                  id
                  name
                  description
                  primaryLanguage {
                    name
                  }
                  stargazerCount
                  forkCount
                  updatedAt
                  url
                  isPrivate
                }
              }
            }
          }
        `,
        variables: { username },
      }),
    });

    if (!response.ok) {
      throw new Error(`GitHub API responded with status: ${response.status}`);
    }

    const data = await response.json();
    const user = data.data?.user;

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const repos = user.repositories.nodes.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description || '',
      language: repo.primaryLanguage?.name || 'Unknown',
      stargazers: repo.stargazerCount,
      forks: repo.forkCount,
      updatedAt: repo.updatedAt,
      url: repo.url,
      isPrivate: repo.isPrivate,
    }));

    return NextResponse.json(repos);
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error);
    throw error;
  }
}

function calculateStreakFromCalendar(contributions: any[]): number {
  let currentStreak = 0;
  const today = new Date();
  
  for (let i = 0; i < 365; i++) {
    const checkDate = new Date(today);
    checkDate.setDate(checkDate.getDate() - i);
    const dateStr = checkDate.toISOString().split('T')[0];
    
    const dayContributions = contributions.find(c => c.date === dateStr);
    
    if (dayContributions && dayContributions.contributionCount > 0) {
      currentStreak++;
    } else {
      break;
    }
  }
  
  return currentStreak;
}

function getContributionColor(count: number): string {
  if (count === 0) return '#ebedf0';
  if (count <= 3) return '#9be9a8';
  if (count <= 6) return '#40c463';
  if (count <= 9) return '#30a14e';
  return '#216e39';
}
