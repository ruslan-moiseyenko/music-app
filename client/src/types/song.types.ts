export interface Song {
  id: string;
  title: string;
  artist: string;
  album?: string;
  year?: number;
  genre?: string;
}

export interface SearchHistory {
  userId: string;
  query: string;
  timestamp: Date;
}

export interface Favorite {
  userId: string;
  songId: string;
  addedAt: Date;
}

export type SortDirection = "asc" | "desc";

export interface SortConfig {
  key: keyof Song;
  direction: SortDirection;
}

export interface FilterConfig {
  key: keyof Song;
  value: string;
}

export interface Column {
  id: keyof Song;
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
  format?: (value: unknown) => string;
}
