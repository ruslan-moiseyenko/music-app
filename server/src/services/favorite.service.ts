import { Favorite } from "../models/favorite.model";
import { Song } from "../models/song.model";
import { FileUtils } from "../utils/file.utils";
import { SongService } from "./song.service";

export class FavoriteService {
  private readonly fileName = "favorites.json";
  private songService: SongService;

  constructor() {
    this.songService = new SongService();
  }

  getAllFavorites(): Favorite[] {
    return FileUtils.readJsonFile<Favorite>(this.fileName);
  }

  getUserFavorites(userId: string): Favorite[] {
    const favorites = this.getAllFavorites();
    return favorites.filter((fav) => fav.userId === userId);
  }

  getUserFavoriteSongs(userId: string): Song[] {
    const favorites = this.getUserFavorites(userId);
    return favorites
      .map((fav) => this.songService.getSongById(fav.songId))
      .filter((song): song is Song => song !== undefined);
  }

  addFavorite(userId: string, songId: string): Favorite | null {
    const favorites = this.getAllFavorites();

    //check if song exists
    const song = this.songService.getSongById(songId);

    if (!song) {
      return null;
    }

    // check if the song is already in user's favorite
    if (
      favorites.some((fav) => fav.userId === userId && fav.songId === songId)
    ) {
      return null;
    }

    const newFavorite: Favorite = {
      userId,
      songId,
      addedAt: new Date()
    };

    favorites.push(newFavorite);
    FileUtils.writeJsonFile<Favorite>(this.fileName, favorites);

    return newFavorite;
  }

  removeFavorite(userId: string, songId: string): boolean {
    const favorites = this.getAllFavorites();
    const initialLength = favorites.length;

    const updatedFavorites = favorites.filter(
      (fav) => !(fav.userId === userId && fav.songId === songId)
    );

    if (updatedFavorites.length !== initialLength) {
      FileUtils.writeJsonFile<Favorite>(this.fileName, updatedFavorites);
      return true;
    }

    return false;
  }
}
