import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, Alert } from "@mui/material";
import { useSongSearch } from "../hooks/useSongSearch";
import { useAuth } from "../hooks/useAuth";
import { Song, Column, SearchHistory } from "../types/song.types";
import { SearchInput } from "../components/common/SearchInput";
import { SmartTable } from "../components/common/SmartTable";
import songService from "../services/song.service";

export const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);
  const [error, setError] = useState<string | null>(null);

  const { songs, searchTerm, isLoading, setSearchTerm, searchSongs } =
    useSongSearch();

  const columns: Column[] = [
    { id: "title", label: "Title", minWidth: 170 },
    { id: "artist", label: "Artist", minWidth: 100 },
    { id: "album", label: "Album", minWidth: 100 },
    { id: "year", label: "Year", minWidth: 70, align: "right" },
    { id: "genre", label: "Genre", minWidth: 100 }
  ];

  useEffect(() => {
    if (isAuthenticated) {
      const fetchFavorites = async () => {
        try {
          const favorites = await songService.getFavorites();
          setFavoriteIds(favorites.map((fav) => fav.id));
        } catch (err) {
          console.error("Failed to fetch favorites:", err);
        }
      };

      const fetchSearchHistory = async () => {
        try {
          const history = await songService.getSearchHistory();
          setSearchHistory(history);
        } catch (err) {
          console.error("Failed to fetch search history:", err);
        }
      };

      fetchFavorites();
      fetchSearchHistory();
    }
  }, [isAuthenticated]);

  const handleFavoriteToggle = async (songId: string, isFavorite: boolean) => {
    try {
      if (isFavorite) {
        await songService.addToFavorites(songId);
        setFavoriteIds((prev) => [...prev, songId]);
      } else {
        await songService.removeFromFavorites(songId);
        setFavoriteIds((prev) => prev.filter((id) => id !== songId));
      }
    } catch (err) {
      setError("Failed to update favorites. Please try again.");
      setTimeout(() => setError(null), 3000);
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Music Search
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ p: 2, mb: 3 }}>
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          onSearch={() => searchSongs()}
          isLoading={isLoading}
          searchHistory={searchHistory}
        />
      </Paper>

      <SmartTable
        data={songs}
        columns={columns}
        title="Search Results"
        isLoading={isLoading}
        showFavorites={isAuthenticated}
        favoriteIds={favoriteIds}
        onFavoriteToggle={handleFavoriteToggle}
      />
    </Box>
  );
};
