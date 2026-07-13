# 🎵 ngx-audio-player

یک پخش‌کننده صوتی مدرن، مینیمال و حرفه‌ای برای Angular با پشتیبانی از لیست پخش، تم تاریک، و کنترل‌های کامل.

[![npm version](https://img.shields.io/badge/npm-v0.0.1-blue.svg)](https://www.npmjs.com/package/ngx-audio-player)
[![Angular](https://img.shields.io/badge/Angular-17+-red.svg)](https://angular.io/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

---

## ✨ ویژگی‌ها

- 🎵 **پخش صوتی با لیست پخش** - پخش آهنگ‌ها با مدیریت لیست پخش
- 🎨 **تم‌های متنوع** - تم روشن، تاریک، مینیمال و جمع‌وجور
- 🔊 **کنترل‌های کامل** - پخش/مکث، قبلی/بعدی، شافل، تکرار، کنترل صدا
- 🖼️ **نمایش کاور** - نمایش کاور آهنگ با افکت بلور در پس‌زمینه
- 📱 **واکنش‌گرا** - طراحی کاملاً واکنش‌گرا برای همه دستگاه‌ها
- 🚀 **Standalone** - بدون نیاز به NgModule، کامپوننت‌های مستقل
- 🎯 **نوار پیشرفت** - نمایش دقیق زمان پخش با قابلیت جابجایی
- 🎨 **آیکون‌های وکتوری** - استفاده از Feather Icons برای ظاهری زیبا
- 🌙 **تم تاریک حرفه‌ای** - پالت رنگی اختصاصی با کنتراست بالا

---

## 📦 نصب

### ۱. نصب کتابخانه اصلی

```bash
npm install ngx-audio-player
```

### ۲. نصب وابستگی‌های آیکون (ضروری)

این کتابخانه از `@ng-icons` برای آیکون‌ها استفاده می‌کند:

```bash
npm install @ng-icons/core @ng-icons/feather-icons
```

---

## 🚀 شروع سریع

### ۱. ایمپورت کامپوننت در اپلیکیشن

**`app.component.ts`**:

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerContainerComponent, Track } from 'ngx-audio-player';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PlayerContainerComponent],
  template: `
    <div style="padding: 40px;">
      <ngx-audio-player-container
        [playlist]="playlist"
        title="My Playlist"
        [theme]="'light'"
        [showCover]="true"
        [autoPlay]="false"
        (trackChanged)="onTrackChanged($event)"
      ></ngx-audio-player-container>
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
    console.log('🎵 Now playing:', track.title);
  }
}
```

### ۲. بوت‌استرپ اپلیکیشن

**`main.ts`**:

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent).catch((err) => console.error(err));
```

---

## 📖 راهنمای استفاده

### کامپوننت `PlayerContainerComponent`

کامپوننت اصلی پخش‌کننده که همه بخش‌ها را در خود جای می‌دهد.

#### ورودی‌ها (Inputs)

| ورودی             | نوع                                           | پیش‌فرض          | توضیح               |
| ----------------- | --------------------------------------------- | ---------------- | ------------------- |
| `playlist`        | `Track[]`                                     | `[]`             | لیست آهنگ‌ها        |
| `title`           | `string`                                      | `'Audio Player'` | عنوان پلیر          |
| `theme`           | `'light' \| 'dark' \| 'minimal' \| 'compact'` | `'light'`        | تم پلیر             |
| `showHeader`      | `boolean`                                     | `true`           | نمایش هدر           |
| `showFooter`      | `boolean`                                     | `true`           | نمایش فوتر          |
| `showActions`     | `boolean`                                     | `true`           | نمایش دکمه‌های اکشن |
| `showCover`       | `boolean`                                     | `true`           | نمایش کاور          |
| `showClearButton` | `boolean`                                     | `false`          | نمایش دکمه پاک کردن |
| `autoPlay`        | `boolean`                                     | `false`          | پخش خودکار          |
| `startIndex`      | `number`                                      | `0`              | شاخص شروع           |

#### خروجی‌ها (Outputs)

| خروجی             | نوع                   | توضیح                    |
| ----------------- | --------------------- | ------------------------ |
| `trackChanged`    | `EventEmitter<Track>` | وقتی آهنگ تغییر می‌کند   |
| `playlistCleared` | `EventEmitter<void>`  | وقتی لیست پخش پاک می‌شود |
| `playerReady`     | `EventEmitter<void>`  | وقتی پلیر آماده شد       |

---

### مدل `Track`

```typescript
interface Track {
  id?: string | number; // شناسه یکتا
  title: string; // عنوان آهنگ (اجباری)
  url: string; // آدرس فایل صوتی (اجباری)
  artist?: string; // نام هنرمند
  duration?: number; // مدت زمان (ثانیه)
  coverArt?: string; // آدرس کاور
}
```

---

### متدهای عمومی

کامپوننت `PlayerContainerComponent` متدهای زیر را در اختیار شما قرار می‌دهد:

```typescript
// پخش/مکث
togglePlay(): void;

// آهنگ بعدی
nextTrack(): void;

// آهنگ قبلی
previousTrack(): void;

// تغییر وضعیت شافل
onShuffleToggle(): void;

// تغییر وضعیت تکرار
onRepeatToggle(): void;

// پاک کردن لیست پخش
onClearPlaylist(): void;

// دریافت وضعیت فعلی
getPlayerState(): PlayerState;
```

---

## 🎨 تم‌ها

### تم روشن (Light)

```html
<ngx-audio-player-container [theme]="'light'" ...></ngx-audio-player-container>
```

### تم تاریک (Dark)

```html
<ngx-audio-player-container [theme]="'dark'" ...></ngx-audio-player-container>
```

### تم مینیمال (Minimal)

```html
<ngx-audio-player-container [theme]="'minimal'" ...></ngx-audio-player-container>
```

### تم جمع‌وجور (Compact)

```html
<ngx-audio-player-container [theme]="'compact'" ...></ngx-audio-player-container>
```

---

## 📱 واکنش‌گرایی

پلیر به طور کامل واکنش‌گرا طراحی شده است:

- **دسکتاپ**: نمایش کاور در سمت چپ و کنترل‌ها در سمت راست
- **موبایل**: نمایش کاور در بالا و کنترل‌ها در پایین

---

## 🔧 توسعه و بیلد

### بیلد کتابخانه

```bash
ng build ngx-audio-player
```

### بیلد با watch mode

```bash
ng build ngx-audio-player --watch
```

### اجرای دمو

```bash
ng serve demo
```

### انتشار در npm

```bash
cd dist/ngx-audio-player
npm publish
```

---

## 📂 ساختار پروژه

```
ngx-audio-player/
├── src/
│   ├── lib/
│   │   ├── core/
│   │   │   ├── models/
│   │   │   │   └── track.model.ts
│   │   │   ├── services/
│   │   │   │   └── audio-player.service.ts
│   │   │   └── state/
│   │   │       └── player-state.interface.ts
│   │   ├── components/
│   │   │   ├── player-container/
│   │   │   ├── player-controls/
│   │   │   └── playlist/
│   │   ├── utils/
│   │   │   ├── time-utils.ts
│   │   │   └── format-time.pipe.ts
│   │   └── public-api.ts
│   └── ...
├── package.json
└── README.md
```

---

## 🤝 مشارکت

مشارکت‌های شما خوش‌آمد است! لطفاً برای گزارش باگ یا پیشنهاد ویژگی، یک Issue ایجاد کنید.

1. Fork کنید
2. Branch جدید بسازید (`git checkout -b feature/amazing-feature`)
3. Commit کنید (`git commit -m 'Add some amazing feature'`)
4. Push کنید (`git push origin feature/amazing-feature`)
5. Pull Request باز کنید

---

## 📄 لایسنس

این پروژه تحت لایسنس MIT منتشر شده است. برای اطلاعات بیشتر فایل [LICENSE](LICENSE) را ببینید.

---

## 🙏 سپاس‌گزاری

- [Angular](https://angular.io/) - فریمورک قدرتمند
- [Feather Icons](https://feathericons.com/) - آیکون‌های زیبا
- [@ng-icons](https://ng-icons.github.io/ng-icons/) - پکیج آیکون برای Angular

---

## 📞 ارتباط با توسعه‌دهنده

- **گیت‌هاب**: [arazshamsaddinlouy](https://github.com/arazshamsaddinlouy)

---

⭐ اگر از این کتابخانه خوشتان آمد، به آن Star دهید!
