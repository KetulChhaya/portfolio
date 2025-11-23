'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { SiGithub } from 'react-icons/si';
import { FiExternalLink, FiStar, FiLock } from 'react-icons/fi';
import { GitHubRepository } from '@/lib/types';

interface TechTooltipProps {
  repositories: GitHubRepository[];
  totalCount: number;
  privateRepoCount: number;
  isVisible: boolean;
  position: { x: number; y: number };
  placement?: 'top' | 'bottom';
  techColor?: string;
}

export function TechTooltip({
  repositories,
  totalCount,
  privateRepoCount,
  isVisible,
  position,
  placement = 'top',
  techColor = '#6366f1',
}: TechTooltipProps) {
  if (!isVisible) return null;

  const displayRepos = repositories.slice(0, 4);
  const hasMore = repositories.length > 4;

  const tooltipY = placement === 'top' 
    ? position.y - 16 // Increased gap for better spacing
    : position.y + 16;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ 
          opacity: 0, 
          scale: 0.9, 
          y: placement === 'top' ? 15 : -15,
          filter: 'blur(4px)'
        }}
        animate={{ 
          opacity: 1, 
          scale: 1, 
          y: 0,
          filter: 'blur(0px)'
        }}
        exit={{ 
          opacity: 0, 
          scale: 0.9, 
          y: placement === 'top' ? 15 : -15,
          filter: 'blur(4px)'
        }}
        transition={{ 
          duration: 0.25, 
          ease: [0.16, 1, 0.3, 1],
          filter: { duration: 0.15 }
        }}
        className="pointer-events-none fixed z-50"
        style={{
          left: position.x,
          top: tooltipY,
          transform: 'translateX(-50%)',
        }}
      >
        {/* Enhanced glassmorphism tooltip */}
        <div className="relative">
          {/* Glow effect */}
          <div 
            className="absolute inset-0 rounded-xl opacity-20 blur-xl"
            style={{ backgroundColor: techColor }}
          />
          
          {/* Main tooltip */}
          <div className="relative max-w-sm rounded-xl border border-white/10 bg-black/40 p-4 shadow-2xl backdrop-blur-2xl dark:border-white/5 dark:bg-white/5">
            {/* Subtle gradient overlay */}
            <div 
              className="absolute inset-0 rounded-xl opacity-5"
              style={{
                background: `linear-gradient(135deg, ${techColor}, transparent 70%)`,
              }}
            />
            
            {/* Arrow with enhanced styling */}
            <div 
              className={`absolute left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-white/10 bg-black/40 backdrop-blur-2xl dark:border-white/5 dark:bg-white/5 ${
                placement === 'top' 
                  ? 'top-full border-b border-r -mt-1.5' 
                  : 'bottom-full border-l border-t -mb-1.5'
              }`} 
            />
            
            <div className="relative space-y-3">
              {/* Enhanced header */}
              <div className="flex items-center gap-2 pb-1 border-b border-white/5">
                <div 
                  className="flex h-6 w-6 items-center justify-center rounded-md"
                  style={{ backgroundColor: `${techColor}20` }}
                >
                  <SiGithub 
                    className="h-3 w-3" 
                    style={{ color: techColor }}
                  />
                </div>
                <span className="text-sm font-semibold text-white/90">
                  {totalCount} {totalCount === 1 ? 'Repository' : 'Repositories'}
                </span>
              </div>

              {/* Repository List with better styling */}
              <div className="space-y-2.5">
                {displayRepos.map((repo, index) => (
                  <motion.div 
                    key={repo.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.2 }}
                    className="group flex items-start justify-between gap-3 rounded-lg bg-white/5 p-2.5 transition-all duration-200 hover:bg-white/10"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-white/90 truncate">
                          {repo.name}
                        </p>
                        {repo.isPrivate && (
                          <FiLock className="h-3 w-3 text-yellow-400/70 flex-shrink-0" />
                        )}
                      </div>
                      {repo.description && (
                        <p className="text-xs text-white/60 truncate mt-0.5">
                          {repo.description}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <div className="flex items-center gap-1 text-white/50">
                        <FiStar className="h-3 w-3" />
                        <span className="text-xs font-medium">{repo.stargazers}</span>
                      </div>
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/50 hover:text-white transition-colors pointer-events-auto opacity-0 group-hover:opacity-100"
                      >
                        <FiExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </motion.div>
                ))}
                
                {/* More repos indicator */}
                {(hasMore || privateRepoCount > 0) && (
                  <div className="flex items-center justify-between pt-1 border-t border-white/5">
                    {hasMore && (
                      <span className="text-xs text-white/50">
                        +{repositories.length - 4} more public
                      </span>
                    )}
                    {privateRepoCount > 0 && (
                      <div className="flex items-center gap-1 text-xs text-white/50">
                        <FiLock className="h-3 w-3" />
                        <span>{privateRepoCount} private</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}