import apiClient from "../utils/axios-config";
import { Song, SearchHistory } from "../types/song.types";
import { SearchParams, AddFavoriteRequest } from "../types/api.types";

class SongService {
  async searchSongs(params: SearchParams = {}): Promise<Song[]> {
    const response = await apiClient.get<Song[]>("/search", { params });
    return response.data;
  }

  async getAllSongs(): Promise<Song[]> {
    return this.searchSongs();
  }

  async getSongById(id: string): Promise<Song> {
    const songs = await this.getAllSongs();
    const song = songs.find((song) => song.id === id);

    if (!song) {
      throw new Error("Song not found");
    }

    return song;
  }

  async getSearchHistory(): Promise<SearchHistory[]> {
    const response = await apiClient.get<SearchHistory[]>("/search/history");
    return response.data;
  }

  async getFavorites(): Promise<Song[]> {
    const response = await apiClient.get<Song[]>("/favorites");
    return response.data;
  }

  async addToFavorites(songId: string): Promise<void> {
    const request: AddFavoriteRequest = { songId };
    await apiClient.post("/favorites", request);
  }

  async removeFromFavorites(songId: string): Promise<void> {
    await apiClient.delete(`/favorites/${songId}`);
  }
}

export default new SongService();
