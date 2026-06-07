export type Platform = 'tiktok' | 'instagram' | 'youtube';

export interface ContentItem {
  id: string;
  platform: Platform;
  title: string;
  description?: string;
  url: string;
  thumbnail?: string;
  date?: string;
}

export const contentItems: ContentItem[] = [
  // TikTok
  {
    id: '1',
    platform: 'tiktok',
    title: 'Contoh Konten TikTok',
    description: 'Deskripsi singkat tentang konten ini.',
    url: 'https://www.tiktok.com/@stacknscale.id',
    date: '2024-01-01',
  },
  // Instagram Reels
  {
    id: '2',
    platform: 'instagram',
    title: 'Contoh Reels Instagram',
    description: 'Deskripsi singkat tentang konten ini.',
    url: 'https://www.instagram.com/stacknscale.id',
    date: '2024-01-01',
  },
];
