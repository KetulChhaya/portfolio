export interface GitHubStats {
  username: string;
  name: string;
  avatarUrl: string;
  bio: string;
  publicRepos: number;
  followers: number;
  following: number;
  totalContributions: number;
  contributionsThisYear: number;
  totalLanguages: number;
  totalDependencies?: number; // Optional - not displayed in UI
  totalFrameworks: number;
  totalStars?: number; // Optional for backward compatibility
  totalForks?: number; // Optional for backward compatibility
  privateContributions: number;
}

export interface GitHubContribution {
  date: string;
  contributionCount: number;
  color: string;
}

export interface GitHubRepository {
  id: string;
  name: string;
  description: string;
  language: string;
  stargazers: number;
  forks: number;
  updatedAt: string;
  url: string;
  isPrivate: boolean;
  dependencies?: {
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
    peerDependencies?: Record<string, string>;
  };
}

// GitHub Personal Access Token - you'll need to create one
// const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN || '';

export async function fetchGitHubStats(username: string): Promise<GitHubStats | null> {
  try {
    // Use our server-side API route to avoid CORS and handle private data securely
    const response = await fetch('/api/github', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, type: 'stats' }),
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
    console.error('Error fetching GitHub stats:', error);
    // Fallback to public API if server route fails
    return await fetchGitHubStatsPublic(username);
  }
}

async function fetchGitHubStatsPublic(username: string): Promise<GitHubStats | null> {
  try {
    const profileResponse = await fetch(`https://api.github.com/users/${username}`);
    if (!profileResponse.ok) {
      throw new Error('Failed to fetch GitHub profile');
    }
    const profile = await profileResponse.json();

    const eventsResponse = await fetch(`https://api.github.com/users/${username}/events`);
    if (!eventsResponse.ok) {
      throw new Error('Failed to fetch GitHub events');
    }
    const events = await eventsResponse.json();

    const totalContributions = events.filter((event: { type: string }) => 
      ['PushEvent', 'CreateEvent', 'IssuesEvent', 'PullRequestEvent'].includes(event.type)
    ).length;

    const currentYear = new Date().getFullYear();
    const contributionsThisYear = events.filter((event: { type: string; created_at: string }) => {
      const eventDate = new Date(event.created_at);
      return eventDate.getFullYear() === currentYear && 
             ['PushEvent', 'CreateEvent', 'IssuesEvent', 'PullRequestEvent'].includes(event.type);
    }).length;

    // For fallback, we'll need to fetch repos to get stars/forks
    // For now, set to 0 - the main API route will provide accurate data
    return {
      username: profile.login,
      name: profile.name || profile.login,
      avatarUrl: profile.avatar_url,
      bio: profile.bio || '',
      publicRepos: profile.public_repos,
      followers: profile.followers,
      following: profile.following,
      totalContributions,
      contributionsThisYear,
      totalLanguages: 0, // Will be calculated by main API route
      totalDependencies: 0, // Will be calculated by main API route
      totalFrameworks: 0, // Will be calculated by main API route
      privateContributions: 0, // Can't access private data without token
    };
  } catch (error) {
    console.error('Error fetching GitHub public stats:', error);
    return null;
  }
}

export async function fetchGitHubContributions(username: string): Promise<GitHubContribution[]> {
  try {
    // Use our server-side API route
    const response = await fetch('/api/github', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, type: 'contributions' }),
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
    console.error('Error fetching GitHub contributions:', error);
    // Fallback to mock data if server route fails
    return generateMockContributions();
  }
}

export async function fetchGitHubRepositories(username: string): Promise<GitHubRepository[]> {
  try {
    // Use our server-side API route
    const response = await fetch('/api/github', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, type: 'repositories' }),
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
    console.error('Error fetching GitHub repositories:', error);
    // Fallback to public API if server route fails
    try {
      const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`);
      if (!response.ok) {
        throw new Error('Failed to fetch GitHub repositories');
      }
      
      const repos = await response.json();
      return repos.map((repo: {
        id: number;
        name: string;
        description: string | null;
        language: string | null;
        stargazers_count: number;
        forks_count: number;
        updated_at: string;
        html_url: string;
        private: boolean;
      }) => ({
        id: repo.id.toString(),
        name: repo.name,
        description: repo.description || '',
        language: repo.language || 'Unknown',
        stargazers: repo.stargazers_count,
        forks: repo.forks_count,
        updatedAt: repo.updated_at,
        url: repo.html_url,
        isPrivate: repo.private,
      }));
    } catch (fallbackError) {
      console.error('Fallback API also failed:', fallbackError);
      return [];
    }
  }
}

// New function to fetch repositories with dependencies
// Note: The included repositories list is secured on the backend
export async function fetchGitHubRepositoriesWithDependencies(
  username: string
): Promise<GitHubRepository[]> {
  try {
    const response = await fetch('/api/github', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        username, 
        type: 'repositories-with-dependencies'
      }),
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
    console.error('Error fetching GitHub repositories with dependencies:', error);
    return [];
  }
}

/*
function calculateStreakFromCalendar(contributions: Array<{ date: string; contributionCount: number }>): number {
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
*/

function calculateStreak(events: Array<{ type: string; created_at: string }>): number {
  let currentStreak = 0;
  const today = new Date();
  
  for (let i = 0; i < 365; i++) {
    const checkDate = new Date(today);
    checkDate.setDate(checkDate.getDate() - i);
    
    const hasContributions = events.some((event: { type: string; created_at: string }) => {
      const eventDate = new Date(event.created_at);
      return eventDate.toDateString() === checkDate.toDateString() &&
             ['PushEvent', 'CreateEvent', 'IssuesEvent', 'PullRequestEvent'].includes(event.type);
    });
    
    if (hasContributions) {
      currentStreak++;
    } else {
      break;
    }
  }
  
  return currentStreak;
}

function generateMockContributions(): GitHubContribution[] {
  const today = new Date();
  const contributions: GitHubContribution[] = [];
  
  for (let i = 0; i < 365; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    let contributionCount = 0;
    if (Math.random() > 0.3) {
      contributionCount = Math.floor(Math.random() * 10) + 1;
    }
    
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      contributionCount = Math.floor(contributionCount * 0.7);
    }
    
    contributions.push({
      date: date.toISOString().split('T')[0],
      contributionCount,
      color: getContributionColor(contributionCount),
    });
  }
  
  return contributions.reverse();
}

function getContributionColor(count: number): string {
  if (count === 0) return '#ebedf0';
  if (count <= 3) return '#9be9a8';
  if (count <= 6) return '#40c463';
  if (count <= 9) return '#30a14e';
  return '#216e39';
}