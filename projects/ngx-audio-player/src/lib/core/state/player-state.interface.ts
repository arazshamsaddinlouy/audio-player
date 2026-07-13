import { Track } from '../models/track.model';

export interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  repeatMode: 'none' | 'all' | 'one';
  isShuffled: boolean;
  playlist: Track[];
  currentTrackIndex: number;
}
