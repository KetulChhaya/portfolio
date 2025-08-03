'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';
import { smoothFadeIn } from '@/lib/constants/smooth-animations';
import { parseLRC, getCurrentLyric } from '@/lib/utils';

// Wavy effect component
function WaveEffect() {
  return (
    <div className="ml-3 flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="from-foreground/60 to-foreground/30 h-4 w-1 rounded-full bg-gradient-to-t"
          animate={{
            height: [8, 16, 8],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  );
}

interface MiniMusicPlayerProps {
  spotifyUrl: string;
  songTitle: string;
  artist: string;
  lrcContent?: string;
  fallbackLyrics?: string[];
  className?: string;
}

// Wrapper component that loads LRC file
interface MusicPlayerWithLRCProps {
  audioUrl: string;
  lrcUrl: string;
  songTitle: string;
  artist: string;
  fallbackLyrics?: string[];
  className?: string;
}

export function MusicPlayerWithLRC({
  audioUrl,
  lrcUrl,
  songTitle,
  artist,
  fallbackLyrics = [],
  className,
}: MusicPlayerWithLRCProps) {
  const [lrcContent, setLrcContent] = useState<string>('');

  useEffect(() => {
    // Load LRC file content
    fetch(lrcUrl)
      .then((response) => response.text())
      .then((content) => setLrcContent(content))
      .catch((error) => {
        console.log('Failed to load LRC file:', error);
        setLrcContent('');
      });
  }, [lrcUrl]);

  return (
    <MiniMusicPlayer
      spotifyUrl={audioUrl}
      songTitle={songTitle}
      artist={artist}
      lrcContent={lrcContent}
      fallbackLyrics={fallbackLyrics}
      className={className}
    />
  );
}

export function MiniMusicPlayer({
  spotifyUrl,
  lrcContent,
  fallbackLyrics = [],
}: MiniMusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentLyric, setCurrentLyric] = useState('');
  const [parsedLyrics, setParsedLyrics] = useState<
    Array<{ time: number; text: string }>
  >([]);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Parse LRC content on component mount
  useEffect(() => {
    if (lrcContent) {
      const lyrics = parseLRC(lrcContent);
      setParsedLyrics(lyrics);
    }
  }, [lrcContent]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, []);

  // Update lyrics based on current time
  useEffect(() => {
    if (parsedLyrics.length > 0) {
      const lyric = getCurrentLyric(parsedLyrics, currentTime);
      setCurrentLyric(lyric);
    } else if (fallbackLyrics.length > 0) {
      // Fallback to cycling through static lyrics
      const lyricInterval = 6;
      const newIndex = Math.floor(currentTime / lyricInterval);
      const index = Math.min(newIndex, fallbackLyrics.length - 1);
      setCurrentLyric(fallbackLyrics[index] || '');
    }
  }, [currentTime, parsedLyrics, fallbackLyrics]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      // Try to play, but handle errors gracefully
      audio.play().catch((error) => {
        console.log('Audio playback failed:', error);
        // For demo purposes, simulate playing
        setIsPlaying(true);
        // Simulate progress for demo
        const interval = setInterval(() => {
          setCurrentTime((prev) => {
            if (prev >= 30) {
              // 30 second demo
              clearInterval(interval);
              setIsPlaying(false);
              return 0;
            }
            return prev + 1;
          });
        }, 1000);
      });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.div
      variants={smoothFadeIn}
      // className={`flex flex-col items-center gap-3 relative ${className}`}
    >
      <audio
        ref={audioRef}
        src={spotifyUrl}
        preload="metadata"
        onError={() => console.log('Audio file not found, using demo mode')}
      />

      {/* Music Controls */}
      <div className="relative z-10 flex w-full max-w-md items-center gap-4">
        {/* Play/Pause Button */}
        <motion.button
          onClick={togglePlay}
          className="bg-foreground text-background hover:bg-foreground/90 relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}

          {/* Button sparkles when playing */}
          {isPlaying && (
            <>
              <motion.div
                className="absolute inset-0 rounded-full bg-purple-400/20 dark:bg-purple-300/20"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <motion.div
                className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-400/30 to-purple-300/30 dark:from-purple-300/30 dark:to-purple-300/30"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5,
                }}
              />
            </>
          )}
        </motion.button>

        {/* Current Lyric with Wave Effect */}
        <div className="flex flex-1 items-center">
          <motion.div
            key={currentLyric}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 flex-1 text-left"
          >
            <p className="text-muted-foreground text-sm italic">
              &quot;{currentLyric || 'Listen to the music...'}&quot;
            </p>
          </motion.div>

          {/* Wavy effect - only visible when playing */}
          {isPlaying && <WaveEffect />}
        </div>
      </div>
    </motion.div>
  );
}
