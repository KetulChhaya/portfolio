'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Music } from 'lucide-react';
import { smoothFadeIn } from '@/lib/constants/smooth-animations';

interface SpotifyPlayerProps {
  spotifyUrl: string;
  songTitle: string;
  artist: string;
  lyrics: string[];
  className?: string;
}

export function SpotifyPlayer({
  spotifyUrl,
  songTitle,
  artist,
  lyrics,
  className = '',
}: SpotifyPlayerProps) {
  // Extract Spotify track ID from URL
  const getSpotifyEmbedUrl = (url: string) => {
    const trackIdMatch = url.match(/track\/([a-zA-Z0-9]+)/);
    if (trackIdMatch) {
      return `https://open.spotify.com/embed/track/${trackIdMatch[1]}?utm_source=generator&theme=0`;
    }
    return url;
  };

  const embedUrl = getSpotifyEmbedUrl(spotifyUrl);

  return (
    <motion.div
      variants={smoothFadeIn}
      className={`bg-card/50 border-border/50 overflow-hidden rounded-2xl border backdrop-blur-md ${className}`}
    >
      {/* Spotify Embed */}
      <div className="w-full">
        <iframe
          src={embedUrl}
          width="100%"
          height="152"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="w-full"
        />
      </div>

      {/* Song Info & Lyrics */}
      <div className="p-6">
        {/* Song Info */}
        <div className="mb-6 text-center">
          <div className="mb-2 flex items-center justify-center gap-2">
            <Music size={16} className="text-green-500" />
            <h3 className="text-foreground text-lg font-semibold">
              {songTitle}
            </h3>
          </div>
          <p className="text-muted-foreground text-sm">{artist}</p>
        </div>

        {/* Lyrics Display */}
        <div className="mb-4 text-center">
          <p className="text-muted-foreground text-sm leading-relaxed italic">
            &quot;{lyrics[0] || 'Listen to the full track on Spotify...'}&quot;
          </p>
        </div>

        {/* Spotify Link */}
        <div className="text-center">
          <motion.a
            href={spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-green-500 transition-colors hover:text-green-400"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Open in Spotify</span>
            <ExternalLink size={14} />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}
