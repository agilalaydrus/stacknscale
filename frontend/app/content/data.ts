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
  {
    id: '1',
    platform: 'tiktok',
    title: 'Kenapa server kamu sering down padahal bayarnya mahal?',
    description: 'Bukan soal harganya — tapi soal arsitekturnya. Di video ini kita bedah 3 kesalahan umum yang bikin server kolaps meski spek tinggi.',
    url: 'https://www.tiktok.com/@stacknscale.id',
    date: '2025-05-10',
  },
  {
    id: '2',
    platform: 'tiktok',
    title: 'Cloud Lokal vs AWS — mana yang lebih worth it untuk bisnis Indonesia?',
    description: 'Perbandingan jujur berdasarkan pengalaman langsung migrasi puluhan klien. Spoiler: jawabannya tergantung use case.',
    url: 'https://www.tiktok.com/@stacknscale.id',
    date: '2025-04-22',
  },
  {
    id: '3',
    platform: 'instagram',
    title: 'Apa itu Blue-Green Deployment? Cara kami pastikan migrasi server tanpa downtime',
    description: 'Metodologi yang kami pakai untuk memindahkan sistem klien tanpa satu transaksi pun yang gagal. Explained in 60 seconds.',
    url: 'https://www.instagram.com/stacknscale.id',
    date: '2025-05-01',
  },
  {
    id: '4',
    platform: 'instagram',
    title: '5 celah keamanan yang paling sering kami temukan saat audit sistem',
    description: 'Dari ratusan audit yang sudah kami jalankan, polanya selalu sama. Cek apakah sistem kamu masih punya salah satunya.',
    url: 'https://www.instagram.com/stacknscale.id',
    date: '2025-03-18',
  },
];
