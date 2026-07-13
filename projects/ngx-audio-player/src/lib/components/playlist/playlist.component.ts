import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { AudioPlayerService } from '../../core/services/audio-player.service';
import { PlayerState } from '../../core/state/player-state.interface';
import { Track } from '../../core/models/track.model';

import { FormatTimePipe } from '../../utils/format-time.pipe';

import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { featherMusic, featherPlay } from '@ng-icons/feather-icons';

@Component({
  selector: 'ngx-audio-player-playlist',
  standalone: true,
  imports: [CommonModule, FormatTimePipe, NgIconComponent],
  providers: [
    provideIcons({
      featherMusic,
      featherPlay,
    }),
  ],
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaylistComponent {
  readonly playerState$: Observable<PlayerState>;

  constructor(private readonly audioPlayerService: AudioPlayerService) {
    this.playerState$ = this.audioPlayerService.state$;
  }

  selectTrack(track: Track, index: number): void {
    this.audioPlayerService.selectTrack(index);
  }
}
