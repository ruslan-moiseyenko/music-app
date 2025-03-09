import { useState, useEffect, useCallback } from "react";
import { Song } from "../types/song.types";
import songService from "../services/song.service";

interface UseSongSearchResult {
  songs: Song[];
  searchTerm: string;
  isLoading: boolean;
  error: string | null;
  setSearchTerm: (term: string) => void;
  searchSongs: (term?: string) => Promise<void>;
}

export const useSongSearch = (
  initialTerm: string = "",
  debounceMs: number = 500
): UseSongSearchResult => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(initialTerm);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const searchSongs = useCallback(
    async (term?: string): Promise<void> => {
      const query = term !== undefined ? term : searchTerm;
      setIsLoading(true);
      setError(null);

      try {
        const result = await songService.searchSongs({ query });
        setSongs(result);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to search songs"
        );
        setSongs([]);
      } finally {
        setIsLoading(false);
      }
    },
    [searchTerm]
  );

  useEffect(() => {
    const loadAllSongs = async () => {
      setIsLoading(true);
      try {
        const allSongs = await songService.getAllSongs();
        setSongs(allSongs);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to load songs"
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadAllSongs();
  }, []);

  useEffect(() => {
    if (searchTerm === initialTerm) return;

    const handler = setTimeout(() => {
      searchSongs();
    }, debounceMs);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, searchSongs, debounceMs, initialTerm]);

  return {
    songs,
    searchTerm,
    isLoading,
    error,
    setSearchTerm,
    searchSongs
  };
};
