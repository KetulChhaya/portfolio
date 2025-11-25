import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  let username = '';
  let type = '';
  try {
    const requestData = await request.json();
    username = requestData.username;
    type = requestData.type;
    const excludedRepos = requestData.excludedRepos;

    if (!username || !type) {
      return NextResponse.json({ error: 'Username and type are required' }, { status: 400 });
    }

    // Check for token - prefer GITHUB_TOKEN (server-side only) over NEXT_PUBLIC_GITHUB_TOKEN (exposed to client)
    const githubToken = process.env.GITHUB_TOKEN || process.env.NEXT_PUBLIC_GITHUB_TOKEN;
    
    // Debug: Log token availability (without exposing the actual token)
    console.log('Environment check:', {
      hasGitHubToken: !!process.env.GITHUB_TOKEN,
      hasPublicGitHubToken: !!process.env.NEXT_PUBLIC_GITHUB_TOKEN,
      tokenAvailable: !!githubToken,
      tokenLength: githubToken ? githubToken.length : 0,
      requestType: type,
      username: username
    });

    if (type === 'stats') {
      return await fetchGitHubStats(username, githubToken);
    } else if (type === 'contributions') {
      return await fetchGitHubContributions(username, githubToken);
    } else if (type === 'repositories') {
      return await fetchGitHubRepositories(username, githubToken);
    } else if (type === 'repositories-with-dependencies') {
      return await fetchGitHubRepositoriesWithDependencies(username, githubToken, excludedRepos);
    } else {
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }
  } catch (error) {
    console.error('GitHub API error:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      type: typeof error,
      requestType: type,
      username: username
    });
    return NextResponse.json(
      { 
        error: 'Failed to fetch GitHub data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
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

    // GitHub GraphQL only accepts PUBLIC or PRIVATE, not ALL
    // If we have a token, we'll query both separately and combine
    const privacyLevel = 'PUBLIC';
    
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: `
          query($username: String!, $privacy: RepositoryPrivacy!) {
            user(login: $username) {
              login
              name
              avatarUrl
              bio
              repositories(first: 100, privacy: $privacy) {
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
        variables: { username, privacy: privacyLevel },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('GitHub API error response:', errorText);
      throw new Error(`GitHub API responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    // Check for GraphQL errors (GitHub returns errors in data.errors even with 200 status)
    if (data.errors) {
      const errorMessage = data.errors[0]?.message || 'Unknown GraphQL error';
      console.error('GitHub GraphQL errors:', data.errors);
      
      // If it's an authentication/authorization error, provide helpful message
      if (errorMessage.includes('requires authentication') || errorMessage.includes('Resource not accessible')) {
        return NextResponse.json(
          { 
            error: 'GitHub API requires authentication. Please set GITHUB_TOKEN or NEXT_PUBLIC_GITHUB_TOKEN environment variable. For private repos, you need a Personal Access Token with appropriate permissions.',
            details: errorMessage
          },
          { status: 401 }
        );
      }
      
      return NextResponse.json(
        { error: errorMessage, details: data.errors },
        { status: 400 }
      );
    }
    
    const user = data.data?.user;

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const publicRepos = user.repositories.nodes;
    let privateRepos: typeof publicRepos = [];

    // If token is available, also fetch private repositories
    if (token) {
      try {
        const privateResponse = await fetch('https://api.github.com/graphql', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            query: `
              query($username: String!) {
                user(login: $username) {
                  repositories(first: 100, privacy: PRIVATE) {
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
                }
              }
            `,
            variables: { username },
          }),
        });

        if (privateResponse.ok) {
          const privateData = await privateResponse.json();
          if (privateData.data?.user && !privateData.errors) {
            privateRepos = privateData.data.user.repositories.nodes;
          }
        }
      } catch (err) {
        console.warn('Failed to fetch private repositories:', err);
        // Continue with public repos only
      }
    }

    // Combine public and private repositories
    const allRepos = [...publicRepos, ...privateRepos];

    // Calculate total contributions including private repos
    const totalContributions = user.contributionsCollection.totalCommitContributions +
                              user.contributionsCollection.totalIssueContributions +
                              user.contributionsCollection.totalPullRequestContributions +
                              user.contributionsCollection.totalPullRequestReviewContributions;

    // Get contribution calendar data
    const contributionWeeks = user.contributionsCollection.contributionCalendar.weeks;
    const allContributions = contributionWeeks.flatMap((week: { contributionDays: Array<{ date: string; contributionCount: number }> }) => 
      week.contributionDays.map((day: { date: string; contributionCount: number }) => ({
        date: day.date,
        contributionCount: day.contributionCount
      }))
    );

    // Calculate this year's contributions
    const currentYear = new Date().getFullYear();
    const contributionsThisYear = allContributions.filter((day: { date: string; contributionCount: number }) => {
      const year = new Date(day.date).getFullYear();
      return year === currentYear && day.contributionCount > 0;
    }).reduce((sum: number, day: { contributionCount: number }) => sum + day.contributionCount, 0);

    // Filter to only count actual programming languages (exclude CSS, HTML, frameworks, etc.)
    const programmingLanguages = new Set([
      'JavaScript', 'TypeScript', 'Python', 'Java', 'C', 'C++', 'C#', 'Go', 'Rust',
      'Ruby', 'PHP', 'Swift', 'Kotlin', 'Scala', 'R', 'Dart', 'Elixir', 'Erlang',
      'Haskell', 'Clojure', 'Lua', 'Perl', 'Shell', 'PowerShell', 'Objective-C',
      'MATLAB', 'Julia', 'Groovy', 'F#', 'OCaml', 'Racket', 'Scheme', 'Fortran',
      'COBOL', 'Assembly', 'VHDL', 'Verilog', 'Tcl', 'Prolog', 'Smalltalk'
    ]);

    const languages = new Set<string>();
    allRepos.forEach((repo: { primaryLanguage: { name: string } | null }) => {
      const langName = repo.primaryLanguage?.name;
      // Only count if it's a recognized programming language
      if (langName && programmingLanguages.has(langName)) {
        languages.add(langName);
      }
    });
    const totalLanguages = languages.size;

    // Calculate total stars and forks across all repositories (keeping for potential future use)
    const totalStars = allRepos.reduce((sum: number, repo: { stargazerCount: number }) => 
      sum + (repo.stargazerCount || 0), 0
    );
    const totalForks = allRepos.reduce((sum: number, repo: { forkCount: number }) => 
      sum + (repo.forkCount || 0), 0
    );

    // Fetch and count dependencies/frameworks from package.json files
    // Limit to most recent 30 repos to avoid too many API calls
    const reposToCheck = allRepos
      .sort((a: { updatedAt: string }, b: { updatedAt: string }) => 
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      )
      .slice(0, 30);

    const { totalDependencies, totalFrameworks } = await fetchDependenciesFromRepos(
      reposToCheck,
      username,
      token
    );

    const result = {
      username: user.login,
      name: user.name || user.login,
      avatarUrl: user.avatarUrl,
      bio: user.bio || '',
      publicRepos: publicRepos.length,
      followers: user.followers.totalCount,
      following: user.following.totalCount,
      totalContributions,
      contributionsThisYear,
      totalLanguages,
      totalDependencies,
      totalFrameworks,
      totalStars, // Keeping for potential future use
      totalForks, // Keeping for potential future use
      privateContributions: privateRepos.length,
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
      const errorText = await response.text();
      console.error('GitHub API error response:', errorText);
      throw new Error(`GitHub API responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    // Check for GraphQL errors
    if (data.errors) {
      const errorMessage = data.errors[0]?.message || 'Unknown GraphQL error';
      console.error('GitHub GraphQL errors:', data.errors);
      
      if (errorMessage.includes('requires authentication') || errorMessage.includes('Resource not accessible')) {
        return NextResponse.json(
          { 
            error: 'GitHub API requires authentication. Please set GITHUB_TOKEN or NEXT_PUBLIC_GITHUB_TOKEN environment variable.',
            details: errorMessage
          },
          { status: 401 }
        );
      }
      
      return NextResponse.json(
        { error: errorMessage, details: data.errors },
        { status: 400 }
      );
    }
    
    const user = data.data?.user;

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const contributionWeeks = user.contributionsCollection.contributionCalendar.weeks;
    const contributions: Array<{ date: string; contributionCount: number; color: string }> = [];

    contributionWeeks.forEach((week: { contributionDays: Array<{ date: string; contributionCount: number }> }) => {
      week.contributionDays.forEach((day: { date: string; contributionCount: number }) => {
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

    // GitHub GraphQL only accepts PUBLIC or PRIVATE, not ALL
    // Query PUBLIC repositories first
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: `
          query($username: String!) {
            user(login: $username) {
              repositories(first: 10, orderBy: {field: UPDATED_AT, direction: DESC}, privacy: PUBLIC) {
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
      const errorText = await response.text();
      console.error('GitHub API error response:', errorText);
      throw new Error(`GitHub API responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    // Check for GraphQL errors
    if (data.errors) {
      const errorMessage = data.errors[0]?.message || 'Unknown GraphQL error';
      console.error('GitHub GraphQL errors:', data.errors);
      
      if (errorMessage.includes('requires authentication') || errorMessage.includes('Resource not accessible')) {
        return NextResponse.json(
          { 
            error: 'GitHub API requires authentication. Please set GITHUB_TOKEN or NEXT_PUBLIC_GITHUB_TOKEN environment variable.',
            details: errorMessage
          },
          { status: 401 }
        );
      }
      
      return NextResponse.json(
        { error: errorMessage, details: data.errors },
        { status: 400 }
      );
    }
    
    const user = data.data?.user;

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const publicRepos = user.repositories.nodes;
    let privateRepos: typeof publicRepos = [];

    // If token is available, also fetch private repositories
    if (token) {
      try {
        const privateResponse = await fetch('https://api.github.com/graphql', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            query: `
              query($username: String!) {
                user(login: $username) {
                  repositories(first: 10, orderBy: {field: UPDATED_AT, direction: DESC}, privacy: PRIVATE) {
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

        if (privateResponse.ok) {
          const privateData = await privateResponse.json();
          if (privateData.data?.user && !privateData.errors) {
            privateRepos = privateData.data.user.repositories.nodes;
          }
        }
      } catch (err) {
        console.warn('Failed to fetch private repositories:', err);
        // Continue with public repos only
      }
    }

    // Combine and sort all repos by updated date
    const allRepos = [...publicRepos, ...privateRepos].sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    ).slice(0, 3); // Take top 3 most recent

    const repos = allRepos.map((repo: { 
      id: string; 
      name: string; 
      description: string | null; 
      primaryLanguage: { name: string } | null; 
      stargazerCount: number; 
      forkCount: number; 
      updatedAt: string; 
      url: string; 
      isPrivate: boolean; 
    }) => ({
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

async function fetchDependenciesFromRepos(
  repos: Array<{ name: string; isPrivate: boolean }>,
  username: string,
  token?: string
): Promise<{ totalDependencies: number; totalFrameworks: number }> {
  const allDependencies = new Set<string>();
  const frameworks = new Set<string>();

  // Common frameworks/libraries to identify
  const frameworkKeywords = [
    'react', 'vue', 'angular', 'svelte', 'next', 'nuxt', 'gatsby', 'remix',
    'express', 'fastify', 'koa', 'nestjs', 'django', 'flask', 'fastapi', 'rails',
    'spring', 'laravel', 'symfony', 'aspnet', 'dotnet',
    'mongodb', 'mongoose', 'prisma', 'sequelize', 'typeorm', 'drizzle',
    'firebase', 'supabase', 'aws-sdk', 'azure', 'gcp',
    'jest', 'vitest', 'mocha', 'cypress', 'playwright', 'pytest',
    'webpack', 'vite', 'rollup', 'parcel', 'turbopack',
    'tailwind', 'bootstrap', 'material-ui', 'chakra', 'antd',
    'redux', 'zustand', 'mobx', 'recoil', 'jotai',
    'graphql', 'apollo', 'relay', 'urql',
    'socket.io', 'ws', 'pusher',
    'redis', 'rabbitmq', 'kafka'
  ];

  // Fetch package.json from each repo (limit concurrent requests)
  const batchSize = 5;
  for (let i = 0; i < repos.length; i += batchSize) {
    const batch = repos.slice(i, i + batchSize);
    await Promise.all(
      batch.map(async (repo) => {
        try {
          const headers: Record<string, string> = {
            'Accept': 'application/vnd.github.v3.raw',
          };
          if (token) {
            headers['Authorization'] = `Bearer ${token}`;
          }

          // Try to fetch package.json
          const response = await fetch(
            `https://api.github.com/repos/${username}/${repo.name}/contents/package.json`,
            { headers }
          );

          if (response.ok) {
            const text = await response.text();
            try {
              const packageJson = JSON.parse(text);
              
              // Collect all dependencies
              const deps = {
                ...(packageJson.dependencies || {}),
                ...(packageJson.devDependencies || {}),
                ...(packageJson.peerDependencies || {}),
              };

              Object.keys(deps).forEach((dep) => {
                allDependencies.add(dep.toLowerCase());
                
                // Check if it's a framework
                const depLower = dep.toLowerCase();
                if (frameworkKeywords.some(keyword => depLower.includes(keyword))) {
                  frameworks.add(dep);
                }
              });
            } catch (parseError) {
              // Invalid JSON, skip
            }
          }
        } catch (error) {
          // Failed to fetch, continue with next repo
        }
      })
    );
  }

  return {
    totalDependencies: allDependencies.size,
    totalFrameworks: frameworks.size,
  };
}

async function fetchGitHubRepositoriesWithDependencies(username: string, token?: string, excludedRepos: string[] = []) {
  try {
    console.log('fetchGitHubRepositoriesWithDependencies called:', {
      username,
      hasToken: !!token,
      tokenLength: token ? token.length : 0,
      excludedReposCount: excludedRepos.length
    });

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // First get all repositories
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: `
          query($username: String!) {
            user(login: $username) {
              repositories(first: 100, orderBy: {field: UPDATED_AT, direction: DESC}) {
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
      const errorText = await response.text();
      console.error('GitHub API error response:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      throw new Error(`GitHub API responded with status: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    
    if (data.errors) {
      console.error('GitHub GraphQL errors:', data.errors);
      return NextResponse.json(
        { error: data.errors[0]?.message || 'Unknown GraphQL error', details: data.errors },
        { status: 400 }
      );
    }
    
    const user = data.data?.user;
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const repositories = user.repositories.nodes;

    // Filter out excluded repositories
    const filteredRepositories = repositories.filter((repo: { name: string }) => 
      !excludedRepos.includes(repo.name)
    );

    // Now fetch package.json for each repository
    const reposWithDependencies = await Promise.all(
       filteredRepositories.map(async (repo: { 
         id: string; 
         name: string; 
         description: string | null; 
         primaryLanguage: { name: string } | null; 
         stargazerCount: number; 
         forkCount: number; 
         updatedAt: string; 
         url: string; 
         isPrivate: boolean; 
       }) => {
        let dependencies = null;
        
        try {
          const packageResponse = await fetch(
            `https://api.github.com/repos/${username}/${repo.name}/contents/package.json`,
            {
              headers: {
                'Accept': 'application/vnd.github.v3.raw',
                ...(token && { 'Authorization': `Bearer ${token}` }),
              },
            }
          );

          if (packageResponse.ok) {
            const packageText = await packageResponse.text();
            try {
              const packageJson = JSON.parse(packageText);
              dependencies = {
                dependencies: packageJson.dependencies || {},
                devDependencies: packageJson.devDependencies || {},
                peerDependencies: packageJson.peerDependencies || {},
              };
            } catch (parseError) {
              // Invalid JSON, skip
            }
          }
        } catch (error) {
          // Failed to fetch package.json, continue without dependencies
        }

        return {
          id: repo.id,
          name: repo.name,
          description: repo.description || '',
          language: repo.primaryLanguage?.name || 'Unknown',
          stargazers: repo.stargazerCount,
          forks: repo.forkCount,
          updatedAt: repo.updatedAt,
          url: repo.url,
          isPrivate: repo.isPrivate,
          dependencies,
        };
      })
    );

    return NextResponse.json(reposWithDependencies);
  } catch (error) {
    console.error('Error fetching GitHub repositories with dependencies:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      username,
      hasToken: !!token
    });
    throw error;
  }
}

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

function getContributionColor(count: number): string {
  if (count === 0) return '#ebedf0';
  if (count <= 3) return '#9be9a8';
  if (count <= 6) return '#40c463';
  if (count <= 9) return '#30a14e';
  return '#216e39';
}
