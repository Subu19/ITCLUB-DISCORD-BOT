interface AnimeTitle {
  romaji: string;
  english: string;
  native: string;
  userPreferred: string;
}

interface DateObject {
  year: number | null;
  month: number | null;
  day: number | null;
}

interface CoverImage {
  medium: string;
}

interface NextAiringEpisode {
  airingAt: number;
  episode: number;
}

interface AnimeMedia {
  id: number;
  type: string;
  description: string;
  title: AnimeTitle;
  startDate: DateObject;
  endDate: DateObject;
  status: string;
  coverImage: CoverImage;
  bannerImage: string;
  episodes: number | null;
  nextAiringEpisode: NextAiringEpisode | null;
}

interface PageData {
  media: AnimeMedia[];
}
export interface AnimeMediaType {
  data: {
    Media: AnimeMedia;
  };
}
export interface AnimeListType {
  data: {
    Page: {
      media?: AnimeMedia[];
    };
  };
}
