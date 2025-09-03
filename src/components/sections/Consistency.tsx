'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { smoothFadeIn, smoothStagger } from '@/lib/constants/smooth-animations';
import { fetchLeetCodeStats } from '@/lib/api/leetcode';
import { fetchGitHubStats, fetchGitHubContributions, fetchGitHubRepositories } from '@/lib/api/github';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, GitBranch, Star, Github } from 'lucide-react';

interface ConsistencyProps {
  leetcodeUsername: string;
  githubUsername: string;
}

export function Consistency({ leetcodeUsername, githubUsername }: ConsistencyProps) {
  const [leetcodeStats, setLeetcodeStats] = useState<any>(null);
  const [githubStats, setGithubStats] = useState<any>(null);
  const [githubContributions, setGithubContributions] = useState<any[]>([]);
  const [githubRepos, setGithubRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [leetcode, github, contributions, repos] = await Promise.all([
          fetchLeetCodeStats(leetcodeUsername),
          fetchGitHubStats(githubUsername),
          fetchGitHubContributions(githubUsername),
          fetchGitHubRepositories(githubUsername),
        ]);

        setLeetcodeStats(leetcode);
        setGithubStats(github);
        setGithubContributions(contributions);
        setGithubRepos(repos);
      } catch (err) {
        setError('Failed to fetch data. Please check your usernames and try again.');
      } finally {
        setLoading(false);
      }
    };

    if (leetcodeUsername && githubUsername) {
      fetchData();
    }
  }, [leetcodeUsername, githubUsername]);

  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-32 bg-muted rounded-lg"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-destructive mb-2">⚠️ {error}</div>
        <p className="text-muted-foreground text-sm">
          Please check your LeetCode and GitHub usernames in the configuration.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      variants={smoothStagger}
      initial="initial"
      animate="animate"
      className="space-y-8"
    >
      {/* LeetCode Section */}
      <motion.div variants={smoothFadeIn}>
        <Card className="bg-background/60 backdrop-blur-sm border-border/50 hover:bg-background/80 transition-all duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl">
              <Trophy className="h-6 w-6 text-foreground" />
              LeetCode Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            {leetcodeStats ? (
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">{leetcodeStats.totalSolved}</div>
                    <div className="text-sm text-muted-foreground">Problems Solved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">{leetcodeStats.easySolved}</div>
                    <div className="text-sm text-muted-foreground">Easy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">{leetcodeStats.mediumSolved}</div>
                    <div className="text-sm text-muted-foreground">Medium</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">{leetcodeStats.hardSolved}</div>
                    <div className="text-sm text-muted-foreground">Hard</div>
                  </div>
                </div>
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                LeetCode data unavailable
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* GitHub Section */}
      <motion.div variants={smoothFadeIn}>
        <Card className="bg-background/60 backdrop-blur-sm border-border/50 hover:bg-background/80 transition-all duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl">
              <GitBranch className="h-6 w-6 text-foreground" />
              GitHub Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            {githubStats ? (
              <div className="space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">{githubStats.publicRepos + (githubStats.privateContributions || 0)}</div>
                    <div className="text-sm text-muted-foreground">Total Repos</div>
                    {githubStats.privateContributions > 0 && (
                      <div className="text-xs text-muted-foreground">
                        {githubStats.publicRepos} public, {githubStats.privateContributions} private
                      </div>
                    )}
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">{githubStats.followers}</div>
                    <div className="text-sm text-muted-foreground">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">{githubStats.contributionsThisYear}</div>
                    <div className="text-sm text-muted-foreground">This Year</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">{githubStats.streakDays}</div>
                    <div className="text-sm text-muted-foreground">Day Streak</div>
                  </div>
                </div>

                {/* Contribution Graph */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Contribution Graph</h4>
                    <Badge variant="secondary" className="text-xs">
                      Last 365 days
                    </Badge>
                  </div>
                  <div className="grid grid-cols-53 gap-1 max-w-full overflow-x-auto">
                    {githubContributions.slice(-53).map((contribution, index) => (
                      <div
                        key={index}
                        className="w-3 h-3 rounded-sm"
                        style={{ backgroundColor: contribution.color }}
                        title={`${contribution.date}: ${contribution.contributionCount} contributions`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                GitHub data unavailable
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Repositories */}
      <motion.div variants={smoothFadeIn}>
        <Card className="bg-background/60 backdrop-blur-sm border-border/50 hover:bg-background/80 transition-all duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl">
              <Github className="h-6 w-6 text-foreground" />
              Recent Repositories
            </CardTitle>
          </CardHeader>
          <CardContent>
            {githubRepos.length > 0 ? (
              <div className="space-y-3">
                {githubRepos.slice(0, 5).map((repo) => (
                  <div
                    key={repo.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <a
                          href={repo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-foreground hover:text-primary transition-colors truncate"
                        >
                          {repo.name}
                        </a>
                        {repo.isPrivate && (
                          <Badge variant="secondary" className="text-xs bg-muted text-muted-foreground">
                            Private
                          </Badge>
                        )}
                        {repo.language && (
                          <Badge variant="outline" className="text-xs">
                            {repo.language}
                          </Badge>
                        )}
                      </div>
                      {repo.description && (
                        <p className="text-sm text-muted-foreground truncate">
                          {repo.description}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        {repo.stargazers}
                      </div>
                      <div className="flex items-center gap-1">
                        <GitBranch className="h-3 w-3" />
                        {repo.forks}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                No repositories found
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
