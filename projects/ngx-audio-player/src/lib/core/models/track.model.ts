export interface Track {
  id?: string | number;
  title: string;
  url: string;
  artist?: string;
  duration?: number; // به ثانیه
  coverArt?: string;
}
