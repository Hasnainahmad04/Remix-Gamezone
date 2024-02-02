export interface Game {
  id: number;
  slug: string;
  name: string;
  released: string;
  background_image: string;
  rating: number;
  ratings: Rating[];
  genres: Genre[];
  short_screenshots?: PreviewScreenShot[];
  esrb_rating: esrbRating;
  tags: Tag[];
  added?: number;
  description?: string;
  platforms?: Platforms[];
}

export type PreviewScreenShot = {
  id: number;
  image: string;
};

interface Rating {
  id: number;
  title: string;
  count: number;
  percent: number;
}

export interface Genre {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
  games?: Pick<Game, "id" | "name" | "slug" | "added">[];
  description?: string;
}

interface Tag extends Genre {
  language: string;
}

interface Platforms {
  platform: {
    id: number;
    name: string;
    slug: string;
    image_background: string;
    games_count: number;
  };
}

interface esrbRating {
  id: number;
  name: string;
  slug: string;
}

export interface GameResponse {
  count: number;
  results: Game[];
}

export interface GenreResponse {
  count: number;
  results: Genre[];
}

export interface ScreenshotResponse {
  count: number;
  results: PreviewScreenShot[];
}
