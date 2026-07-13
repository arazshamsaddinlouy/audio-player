# 🎵 ngx-audio-player

A modern, minimal, and customizable audio player for Angular with playlist support, multiple themes, and a complete set of playback controls.

[![npm version](https://img.shields.io/badge/npm-v0.0.1-blue.svg)](https://www.npmjs.com/package/ngx-audio-player)
[![Angular](https://img.shields.io/badge/Angular-17+-red.svg)](https://angular.io/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

---

## ✨ Features

- 🎵 **Playlist Support** – Play and manage a collection of audio tracks.
- 🎨 **Multiple Themes** – Choose between Light, Dark, Minimal, and Compact themes.
- 🔊 **Complete Playback Controls** – Play/Pause, Previous/Next, Shuffle, Repeat, and Volume control.
- 🖼️ **Album Cover Display** – Beautiful album artwork with a blurred background effect.
- 📱 **Responsive Design** – Optimized for desktop, tablet, and mobile devices.
- 🚀 **Standalone Components** – No `NgModule` required.
- 🎯 **Interactive Progress Bar** – Seek through tracks with accurate playback timing.
- 🎨 **Vector Icons** – Powered by Feather Icons.
- 🌙 **Professional Dark Theme** – Carefully crafted high-contrast color palette.

---

# 📦 Installation

## 1. Install the library

```bash
npm install ngx-audio-player
```

## 2. Install icon dependencies (Required)

This library uses `@ng-icons` for icons.

```bash
npm install @ng-icons/core @ng-icons/feather-icons
```

---

# 🚀 Quick Start

## 1. Import the component

**app.component.ts**

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerContainerComponent, Track } from 'ngx-audio-player';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PlayerContainerComponent],
  template: `
    <div style="padding:40px">
      <ngx-audio-player-container
        [playlist]="playlist"
        title="My Playlist"
        [theme]="'light'"
        [showCover]="true"
        [autoPlay]="false"
        (trackChanged)="onTrackChanged($event)"
      >
      </ngx-audio-player-container>
    </div>
  `,
})
export class AppComponent {
  playlist: Track[] = [
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
  ];

  onTrackChanged(track: Track): void {
    console.log('🎵 Now Playing:', track.title);
  }
}
```

## 2. Bootstrap your application

**main.ts**

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent).catch(console.error);
```

---

# 📖 Usage

## `PlayerContainerComponent`

The main audio player component that encapsulates all player features.

### Inputs

| Input             | Type                                          | Default          | Description                  |
| ----------------- | --------------------------------------------- | ---------------- | ---------------------------- |
| `playlist`        | `Track[]`                                     | `[]`             | List of audio tracks         |
| `title`           | `string`                                      | `"Audio Player"` | Player title                 |
| `theme`           | `"light" \| "dark" \| "minimal" \| "compact"` | `"light"`        | Player theme                 |
| `showHeader`      | `boolean`                                     | `true`           | Show header                  |
| `showFooter`      | `boolean`                                     | `true`           | Show footer                  |
| `showActions`     | `boolean`                                     | `true`           | Show action buttons          |
| `showCover`       | `boolean`                                     | `true`           | Display album artwork        |
| `showClearButton` | `boolean`                                     | `false`          | Show clear playlist button   |
| `autoPlay`        | `boolean`                                     | `false`          | Automatically start playback |
| `startIndex`      | `number`                                      | `0`              | Initial track index          |

### Outputs

| Output            | Type                  | Description                          |
| ----------------- | --------------------- | ------------------------------------ |
| `trackChanged`    | `EventEmitter<Track>` | Fired when the current track changes |
| `playlistCleared` | `EventEmitter<void>`  | Fired when the playlist is cleared   |
| `playerReady`     | `EventEmitter<void>`  | Fired when the player is initialized |

---

## Track Model

```typescript
interface Track {
  id?: string | number;
  title: string;
  url: string;
  artist?: string;
  duration?: number;
  coverArt?: string;
}
```

---

## Public Methods

The `PlayerContainerComponent` exposes the following methods:

```typescript
// Play / Pause
togglePlay(): void;

// Next track
nextTrack(): void;

// Previous track
previousTrack(): void;

// Toggle shuffle mode
onShuffleToggle(): void;

// Toggle repeat mode
onRepeatToggle(): void;

// Clear playlist
onClearPlaylist(): void;

// Get current player state
getPlayerState(): PlayerState;
```

---

# 🎨 Themes

## Light

```html
<ngx-audio-player-container [theme]="'light'"> </ngx-audio-player-container>
```

## Dark

```html
<ngx-audio-player-container [theme]="'dark'"> </ngx-audio-player-container>
```

## Minimal

```html
<ngx-audio-player-container [theme]="'minimal'"> </ngx-audio-player-container>
```

## Compact

```html
<ngx-audio-player-container [theme]="'compact'"> </ngx-audio-player-container>
```

---

# 📱 Responsive Design

The player is fully responsive.

- **Desktop** – Album artwork on the left, controls on the right.
- **Mobile** – Album artwork on top, controls below.

---

# 🔧 Development

## Build the library

```bash
ng build ngx-audio-player
```

## Watch mode

```bash
ng build ngx-audio-player --watch
```

## Run the demo application

```bash
ng serve demo
```

## Publish to npm

```bash
cd dist/ngx-audio-player
npm publish
```

---

# 📂 Project Structure

```text
ngx-audio-player/
├── src/
│   ├── lib/
│   │   ├── core/
│   │   │   ├── models/
│   │   │   ├── services/
│   │   │   └── state/
│   │   ├── components/
│   │   │   ├── player-container/
│   │   │   ├── player-controls/
│   │   │   └── playlist/
│   │   ├── utils/
│   │   └── public-api.ts
│   └── ...
├── package.json
└── README.md
```

---

# 🤝 Contributing

Contributions are welcome!

If you'd like to improve this project:

1. Fork the repository.
2. Create a feature branch.

```bash
git checkout -b feature/amazing-feature
```

3. Commit your changes.

```bash
git commit -m "Add amazing feature"
```

4. Push to your branch.

```bash
git push origin feature/amazing-feature
```

5. Open a Pull Request.

---

# 📄 License

This project is licensed under the **MIT License**.

See the [LICENSE](LICENSE) file for details.

---

# 🙏 Acknowledgements

- **Angular** — The modern web application framework.
- **Feather Icons** — Beautiful open-source icons.
- **@ng-icons** — Icon library for Angular.

---

# 📬 Author

**GitHub:** https://github.com/arazshamsaddinlouy

---

## ⭐ Support

If you find this project useful, consider giving it a **⭐ Star** on GitHub. It helps the project grow and encourages future development.
