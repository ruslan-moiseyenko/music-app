import React, { useState, useEffect } from "react";
import { Box, Typography, Alert, CircularProgress } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import { Song, Column } from "../types/song.types";
import { SmartTable } from "../components/common/SmartTable";
import songService from "../services/song.service";

export const FavoritesPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [favorites, setFavorites] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const columns: Column[] = [
    { id: "title", label: "Title", minWidth: 170 },
    { id: "artist", label: "Artist", minWidth: 100 },
    { id: "album", label: "Album", minWidth: 100 },
    { id: "year", label: "Year", minWidth: 70, align: "right" },
    { id: "genre", label: "Genre", minWidth: 100 }
  ];

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!isAuthenticated) return;

      setIsLoading(true);
      setError(null);

      try {
        const favoriteSongs = await songService.getFavorites();
        setFavorites(favoriteSongs);
      } catch (err) {
        console.error("Failed to fetch favorites:", err);
        setError("Failed to load your favorite songs. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, [isAuthenticated]);

  const handleRemoveFromFavorites = async (songId: string) => {
    try {
      await songService.removeFromFavorites(songId);
      setFavorites((prev) => prev.filter((song) => song.id !== songId));
    } catch (err) {
      setError("Failed to remove from favorites. Please try again.");
      setTimeout(() => setError(null), 3000);
    }
  };

  if (!isAuthenticated) {
    return (
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          Favorites
        </Typography>
        <Alert severity="info">
          Please log in to view your favorite songs.
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        My Favorite Songs
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {isLoading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : (
        <SmartTable
          data={favorites}
          columns={columns}
          title={`${favorites.length} Favorite Songs`}
          isLoading={isLoading}
          showFavorites={true}
          favoriteIds={favorites.map((song) => song.id)}
          onFavoriteToggle={(songId) => handleRemoveFromFavorites(songId)}
        />
      )}
    </Box>
  );
};
