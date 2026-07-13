import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerContainerComponent, Track } from '@arazshamsaddinlouy/ngx-audio-player';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PlayerContainerComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // ============ سیگنال‌ها ============

  protected readonly title = signal('🎵 Audio Player Demo');
  protected readonly currentTrackName = signal<string>('None');
  protected readonly playerStatus = signal<string>('⏸️ Paused');

  // ============ داده‌های پلی‌لیست ============

  protected playlist = signal<Track[]>([
    {
      id: 1,
      title: 'Dreamscape',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      artist: 'SoundHelix',
      duration: 30,
      coverArt: 'https://picsum.photos/seed/dream/200/200',
    },
    {
      id: 2,
      title: 'Ocean Waves',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      artist: 'SoundHelix',
      duration: 25,
      coverArt: 'https://picsum.photos/seed/ocean/200/200',
    },
    {
      id: 3,
      title: 'Mountain High',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
      artist: 'SoundHelix',
      duration: 35,
      coverArt: 'https://picsum.photos/seed/mountain/200/200',
    },
    {
      id: 4,
      title: 'City Lights',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
      artist: 'SoundHelix',
      duration: 28,
      coverArt: 'https://picsum.photos/seed/city/200/200',
    },
    {
      id: 5,
      title: 'Night Drive',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
      artist: 'SoundHelix',
      duration: 32,
      coverArt: 'https://picsum.photos/seed/night/200/200',
    },
  ]);

  // ============ متدهای رویداد ============

  onTrackChanged(track: Track): void {
    this.currentTrackName.set(track.title);
    this.playerStatus.set('▶️ Playing');
    console.log('🎵 Track changed:', track.title);
  }

  onPlayerReady(): void {
    console.log('🎵 Player is ready!');
    this.playerStatus.set('✅ Ready');
  }

  // ============ متدهای کنترل ============

  loadNewPlaylist(): void {
    const newPlaylist: Track[] = [
      {
        id: 6,
        title: 'Sunset Boulevard',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
        artist: 'SoundHelix',
        duration: 27,
        coverArt: 'https://picsum.photos/seed/sunset/200/200',
      },
      {
        id: 7,
        title: 'Morning Glory',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
        artist: 'SoundHelix',
        duration: 33,
        coverArt: 'https://picsum.photos/seed/morning/200/200',
      },
      {
        id: 8,
        title: 'Starlight',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
        artist: 'SoundHelix',
        duration: 29,
        coverArt: 'https://picsum.photos/seed/star/200/200',
      },
    ];

    this.playlist.set(newPlaylist);
    this.currentTrackName.set('None');
    this.playerStatus.set('🔄 Loaded');
    console.log('🔄 New playlist loaded!');
  }

  clearPlaylist(): void {
    this.playlist.set([]);
    this.currentTrackName.set('None');
    this.playerStatus.set('🗑️ Cleared');
    console.log('🗑️ Playlist cleared!');
  }
}
