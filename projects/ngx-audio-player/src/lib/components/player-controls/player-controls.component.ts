import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  featherPlay,
  featherPause,
  featherSkipForward,
  featherSkipBack,
  featherRepeat,
  featherShuffle,
  featherVolume2,
  featherVolumeX,
} from '@ng-icons/feather-icons';

import { AudioPlayerService } from '../../core/services/audio-player.service';
import { FormatTimePipe } from '../../utils/format-time.pipe';
import { PlayerState } from '../../../public-api';

@Component({
  selector: 'ngx-audio-player-controls',
  standalone: true,
  imports: [CommonModule, NgIconComponent, FormatTimePipe],
  providers: [
    provideIcons({
      featherPlay,
      featherPause,
      featherSkipForward,
      featherSkipBack,
      featherRepeat,
      featherShuffle,
      featherVolume2,
      featherVolumeX,
    }),
  ],
  templateUrl: './player-controls.component.html',
  styleUrls: ['./player-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerControlsComponent {
  Math = Math;

  readonly playerState$: Observable<PlayerState>;

  isMuted = false;

  private previousVolume = 1;

  constructor(private readonly audioPlayerService: AudioPlayerService) {
    this.playerState$ = this.audioPlayerService.state$;
  }

  // ==========================
  // Playback
  // ==========================

  onPlayPause(): void {
    this.audioPlayerService.togglePlay();
  }

  onNext(): void {
    this.audioPlayerService.nextTrack();
  }

  onPrevious(): void {
    this.audioPlayerService.previousTrack();
  }

  onSeek(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.audioPlayerService.seekTo(+input.value);
  }

  // ==========================
  // Volume
  // ==========================

  onVolumeChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const volume = +input.value;

    this.audioPlayerService.setVolume(volume);

    this.isMuted = volume === 0;
  }

  toggleMute(): void {
    const state = this.audioPlayerService.getCurrentState();

    if (this.isMuted) {
      this.audioPlayerService.setVolume(this.previousVolume || 0.5);
      this.isMuted = false;
      return;
    }

    this.previousVolume = state.volume;
    this.audioPlayerService.setVolume(0);
    this.isMuted = true;
  }

  // ==========================
  // Playback Modes
  // ==========================

  onRepeat(): void {
    this.audioPlayerService.toggleRepeatMode();
  }

  onShuffle(): void {
    this.audioPlayerService.toggleShuffle();
  }
}
