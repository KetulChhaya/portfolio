'use client';

import { motion } from 'framer-motion';
import { SpotifyPlayer } from '@/components/ui/music-player';
import { smoothFadeIn, smoothStagger } from '@/lib/constants/smooth-animations';

export function MusicSection() {
  // 📝 UPDATE: Replace with your actual Spotify song details
  const musicData = {
    spotifyUrl: 'https://open.spotify.com/track/your-track-id', // Your Spotify track URL
    songTitle: 'Your Favorite Song',
    artist: 'Artist Name',
    lyrics: [
      'First line of lyrics...',
      'Second line of lyrics...',
      'Third line of lyrics...',
      'Fourth line of lyrics...',
      'Fifth line of lyrics...',
      // Add your favorite lyrics from the song
    ],
  };

  return (
    <section className="section-padding">
      <div className="container-responsive">
        <motion.div
          variants={smoothStagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
          className="mx-auto max-w-2xl"
        >
          {/* Section Header */}
          <motion.div
            variants={smoothFadeIn}
            className="mb-10 text-center lg:mb-12"
          >
            <h2 className="text-responsive-lg mb-4 font-bold lg:mb-6">
              <span className="text-muted-foreground/60 mr-3 font-mono text-base lg:mr-4 lg:text-lg">
                ♪
              </span>
              Currently Playing
            </h2>
            <p className="text-muted-foreground text-base lg:text-lg">
              One of my favorites that keeps me inspired while coding
            </p>
          </motion.div>

          {/* Spotify Player */}
          <motion.div variants={smoothFadeIn}>
            <SpotifyPlayer
              spotifyUrl={musicData.spotifyUrl}
              songTitle={musicData.songTitle}
              artist={musicData.artist}
              lyrics={musicData.lyrics}
              className="mx-auto max-w-lg"
            />
          </motion.div>

          {/* Optional: Music taste description */}
          <motion.div
            variants={smoothFadeIn}
            className="mt-6 text-center lg:mt-8"
          >
            <p className="text-muted-foreground/80 text-sm lg:text-base">
              Music fuels my creativity and keeps me focused during long coding
              sessions
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
