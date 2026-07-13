import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ElementRef,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioPlayerService } from '../../core/services/audio-player.service';
import { Track } from '../../core/models/track.model';
import { PlaylistComponent } from '../playlist/playlist.component';
import { Subscription } from 'rxjs';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  featherShuffle,
  featherRepeat,
  featherTrash2,
  featherBookOpen,
  featherBook,
  featherLoader,
  featherMusic,
  featherPause,
  featherPlay,
  featherSkipBack,
  featherSkipForward,
} from '@ng-icons/feather-icons';
import { FormatTimePipe } from '../../utils/format-time.pipe';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'ngx-audio-player-container',
  standalone: true,
  imports: [CommonModule, PlaylistComponent, NgIconComponent, FormatTimePipe],
  providers: [
    provideIcons({
      featherShuffle,
      featherRepeat,
      featherTrash2,
      featherBookOpen,
      featherBook,
      featherLoader,
      featherMusic,
      featherPause,
      featherPlay,
      featherSkipBack,
      featherSkipForward,
    }),
  ],
  templateUrl: './player-container.component.html',
  styleUrls: ['./player-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerContainerComponent implements OnInit, OnDestroy, AfterViewInit {
  // ============ ورودی‌ها ============
  @Input() title = 'Audio Player';
  @Input() playlist: Track[] = [];
  @Input() theme: 'light' | 'dark' | 'minimal' | 'compact' = 'light';
  @Input() showHeader = true;
  @Input() showFooter = true;
  @Input() showActions = true;
  @Input() showCover = true;
  @Input() showClearButton = false;
  @Input() autoPlay = false;
  @Input() startIndex = 0;

  // ============ خروجی‌ها ============
  @Output() trackChanged = new EventEmitter<Track>();
  @Output() playlistCleared = new EventEmitter<void>();
  @Output() playerReady = new EventEmitter<void>();

  // ============ ViewChild ============
  @ViewChild('container') containerRef!: ElementRef<HTMLDivElement>;

  // ============ متغیرها ============
  isLoading = false;
  isPlaylistExpanded = true;
  isPlaying = false;
  currentTime = 0;
  duration = 0;
  backgroundImage: SafeStyle = 'none';
  private subscriptions = new Subscription();

  // ============ Getters ============
  get currentTrack(): Track | null {
    return this.audioPlayerService.getCurrentTrack();
  }

  get repeatMode(): 'none' | 'all' | 'one' {
    return this.audioPlayerService.getRepeatMode();
  }

  get isShuffled(): boolean {
    return this.audioPlayerService.getIsShuffled();
  }

  get themeClass(): string {
    return `theme-${this.theme}`;
  }

  // ============ سازنده ============
  constructor(
    private audioPlayerService: AudioPlayerService,
    private sanitizer: DomSanitizer,
  ) {}

  // ============ چرخه زندگی ============
  ngOnInit(): void {
    this.loadPlaylist();
    this.subscribeToPlayerState();
  }

  ngAfterViewInit(): void {
    this.playerReady.emit();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.audioPlayerService.destroy();
  }

  // ============ متدهای خصوصی ============
  private loadPlaylist(): void {
    if (this.playlist.length > 0) {
      this.isLoading = true;
      this.audioPlayerService.loadPlaylist(this.playlist, this.startIndex);

      if (this.autoPlay) {
        setTimeout(() => {
          this.audioPlayerService.play();
          this.isLoading = false;
        }, 500);
      } else {
        this.isLoading = false;
      }
    }
  }

  private subscribeToPlayerState(): void {
    this.subscriptions.add(
      this.audioPlayerService.state$.subscribe((state) => {
        if (state.currentTrack) {
          this.trackChanged.emit(state.currentTrack);
          // به‌روزرسانی پس‌زمینه بلور با کاور آهنگ
          this.updateBackground(state.currentTrack.coverArt);
        }
        this.isLoading = false;
        this.isPlaying = state.isPlaying;
        this.currentTime = state.currentTime;
        this.duration = state.duration;
      }),
    );
  }

  private updateBackground(coverArt?: string): void {
    if (coverArt) {
      this.backgroundImage = this.sanitizer.bypassSecurityTrustStyle(`url(${coverArt})`);
    } else {
      this.backgroundImage = 'none';
    }
  }

  // ============ متدهای عمومی ============
  togglePlay(): void {
    this.audioPlayerService.togglePlay();
  }

  nextTrack(): void {
    this.audioPlayerService.nextTrack();
  }

  previousTrack(): void {
    this.audioPlayerService.previousTrack();
  }

  onSeek(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.audioPlayerService.seekTo(parseFloat(input.value));
  }

  onShuffleToggle(): void {
    this.audioPlayerService.toggleShuffle();
  }

  onRepeatToggle(): void {
    this.audioPlayerService.toggleRepeatMode();
  }

  onClearPlaylist(): void {
    this.audioPlayerService.clearPlaylist();
    this.playlistCleared.emit();
  }

  onExpandCollapse(): void {
    this.isPlaylistExpanded = !this.isPlaylistExpanded;
  }

  reloadPlaylist(tracks: Track[]): void {
    this.playlist = tracks;
    this.loadPlaylist();
  }

  getPlayerState() {
    return this.audioPlayerService.getCurrentState();
  }
}
