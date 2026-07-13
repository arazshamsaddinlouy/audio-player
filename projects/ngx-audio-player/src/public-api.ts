/*
 * Public API Surface of ngx-audio-player
 */

// ============ کامپوننت‌ها ============
export * from './lib/components/player-container/player-container.component';
export * from './lib/components/player-controls/player-controls.component';
export * from './lib/components/playlist/playlist.component';

// ============ سرویس‌ها ============
export * from './lib/core/services/audio-player.service';

// ============ مدل‌ها ============
export * from './lib/core/models/track.model';
export * from './lib/core/state/player-state.interface';

// ============ Utility ============
export * from './lib/utils/time-utils';
export * from './lib/utils/format-time.pipe';
