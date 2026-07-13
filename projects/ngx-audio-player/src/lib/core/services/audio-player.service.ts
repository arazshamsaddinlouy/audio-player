import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Track } from '../models/track.model';
import { PlayerState } from '../state/player-state.interface';

const INITIAL_STATE: PlayerState = {
  currentTrack: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 1,
  repeatMode: 'none',
  isShuffled: false,
  playlist: [],
  currentTrackIndex: -1,
};

@Injectable({
  providedIn: 'root',
})
export class AudioPlayerService {
  private audioElement: HTMLAudioElement = new Audio();
  private state = new BehaviorSubject<PlayerState>(INITIAL_STATE);
  state$ = this.state.asObservable();

  constructor() {
    this.setupAudioListeners();
  }

  private setupAudioListeners(): void {
    this.audioElement.addEventListener('timeupdate', () => {
      const currentState = this.state.value;
      this.state.next({
        ...currentState,
        currentTime: this.audioElement.currentTime,
      });
    });

    this.audioElement.addEventListener('loadedmetadata', () => {
      const currentState = this.state.value;
      this.state.next({
        ...currentState,
        duration: this.audioElement.duration,
      });
    });

    this.audioElement.addEventListener('ended', () => {
      this.nextTrack();
    });

    this.audioElement.addEventListener('error', (e) => {
      console.error('Audio Error:', e);
    });
  }

  loadPlaylist(tracks: Track[], startIndex: number = 0): void {
    if (!tracks.length) return;

    const trackIndex = Math.min(startIndex, tracks.length - 1);
    this.state.next({
      ...this.state.value,
      playlist: tracks,
      currentTrackIndex: trackIndex,
      currentTrack: tracks[trackIndex],
    });
    this.loadTrack(tracks[trackIndex]);
  }

  private loadTrack(track: Track): void {
    this.audioElement.src = track.url;
    this.audioElement.load();
    this.state.next({
      ...this.state.value,
      currentTrack: track,
      currentTime: 0,
      duration: 0,
    });
  }

  play(): void {
    this.audioElement.play().catch((err) => console.error('Play error:', err));
    this.state.next({ ...this.state.value, isPlaying: true });
  }

  pause(): void {
    this.audioElement.pause();
    this.state.next({ ...this.state.value, isPlaying: false });
  }

  togglePlay(): void {
    this.state.value.isPlaying ? this.pause() : this.play();
  }

  seekTo(time: number): void {
    const clamped = Math.max(0, Math.min(this.state.value.duration, time));
    this.audioElement.currentTime = clamped;
  }

  setVolume(volume: number): void {
    const clamped = Math.max(0, Math.min(1, volume));
    this.audioElement.volume = clamped;
    this.state.next({ ...this.state.value, volume: clamped });
  }

  selectTrack(index: number): void {
    const { playlist } = this.state.value;
    if (index < 0 || index >= playlist.length) return;

    this.state.next({
      ...this.state.value,
      currentTrackIndex: index,
      currentTrack: playlist[index],
    });
    this.loadTrack(playlist[index]);
    this.play();
  }

  nextTrack(): void {
    const { playlist, currentTrackIndex, repeatMode } = this.state.value;
    if (!playlist.length) return;

    let nextIndex = currentTrackIndex + 1;
    if (nextIndex >= playlist.length) {
      if (repeatMode === 'all') {
        nextIndex = 0;
      } else {
        return;
      }
    }

    this.state.next({
      ...this.state.value,
      currentTrackIndex: nextIndex,
      currentTrack: playlist[nextIndex],
    });
    this.loadTrack(playlist[nextIndex]);
    this.play();
  }

  previousTrack(): void {
    const { playlist, currentTrackIndex } = this.state.value;
    if (!playlist.length) return;

    let prevIndex = currentTrackIndex - 1;
    if (prevIndex < 0) {
      prevIndex = playlist.length - 1;
    }

    this.state.next({
      ...this.state.value,
      currentTrackIndex: prevIndex,
      currentTrack: playlist[prevIndex],
    });
    this.loadTrack(playlist[prevIndex]);
    this.play();
  }

  toggleRepeatMode(): void {
    const modes: Array<'none' | 'all' | 'one'> = ['none', 'all', 'one'];
    const current = this.state.value.repeatMode;
    const currentIndex = modes.indexOf(current);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    this.state.next({ ...this.state.value, repeatMode: nextMode });
  }

  toggleShuffle(): void {
    this.state.next({ ...this.state.value, isShuffled: !this.state.value.isShuffled });
  }
  // اضافه کردن به انتهای کلاس AudioPlayerService

  getCurrentTrack(): Track | null {
    return this.state.value.currentTrack;
  }

  getRepeatMode(): 'none' | 'all' | 'one' {
    return this.state.value.repeatMode;
  }

  getIsShuffled(): boolean {
    return this.state.value.isShuffled;
  }

  getCurrentState(): PlayerState {
    return this.state.value;
  }

  clearPlaylist(): void {
    this.state.next({
      ...this.state.value,
      playlist: [],
      currentTrack: null,
      currentTrackIndex: -1,
    });
    this.audioElement.pause();
    this.audioElement.src = '';
    this.audioElement.load();
  }

  // متدهای toggle را قبلاً داریم، فقط مطمئن شوید که وجود دارند
  destroy(): void {
    this.audioElement.pause();
    this.audioElement.src = '';
    this.audioElement.load();
  }
}
