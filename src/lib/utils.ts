import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Parse LRC file content and extract timed lyrics
export function parseLRC(
  lrcContent: string
): Array<{ time: number; text: string }> {
  const lines = lrcContent.split('\n');
  const lyrics: Array<{ time: number; text: string }> = [];

  for (const line of lines) {
    // Match timestamp format [mm:ss.xx]
    const timestampMatch = line.match(/\[(\d{2}):(\d{2})\.(\d{2})\]/);
    if (timestampMatch) {
      const minutes = parseInt(timestampMatch[1]);
      const seconds = parseInt(timestampMatch[2]);
      const centiseconds = parseInt(timestampMatch[3]);

      // Convert to seconds
      const timeInSeconds = minutes * 60 + seconds + centiseconds / 100;

      // Extract text after timestamp
      const text = line.replace(/\[.*?\]/g, '').trim();

      if (text && text.length > 0) {
        lyrics.push({ time: timeInSeconds, text });
      }
    }
  }

  return lyrics.sort((a, b) => a.time - b.time);
}

// Get current lyric based on time
export function getCurrentLyric(
  lyrics: Array<{ time: number; text: string }>,
  currentTime: number
): string {
  if (lyrics.length === 0) return '';

  // Find the last lyric that should be displayed at current time
  let currentLyric = '';
  for (const lyric of lyrics) {
    if (currentTime >= lyric.time) {
      currentLyric = lyric.text;
    } else {
      break;
    }
  }

  return currentLyric;
}
