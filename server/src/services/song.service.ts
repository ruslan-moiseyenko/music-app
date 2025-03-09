import { Song } from "../models/song.model";
import { FileUtils } from "../utils/file.utils";
import { SONGS } from "./songs.data";

export class SongService {
  private readonly fileName = "songs.json";

  constructor() {
    const songs = this.getAllSongs();

    // initialize songs in case DB is empty
    if (songs.length === 0) {
      this.initializeSongs();
    }
  }

  getAllSongs(): Song[] {
    return FileUtils.readJsonFile<Song>(this.fileName);
  }

  searchSongs(query: string): Song[] {
    const songs = this.getAllSongs();
    if (!query) return songs;

    const lowercaseQuery = query.toLowerCase();
    return songs.filter(
      (song) =>
        song.title.toLowerCase().includes(lowercaseQuery) ||
        song.artist.toLowerCase().includes(lowercaseQuery) ||
        (song.album && song.album.toLowerCase().includes(lowercaseQuery)) ||
        (song.genre && song.genre.toLowerCase().includes(lowercaseQuery))
    );
  }

  getSongById(id: string): Song | undefined {
    const songs = this.getAllSongs();
    return songs.find((song) => song.id === id);
  }

  private initializeSongs(): void {
    FileUtils.writeJsonFile<Song>(this.fileName, SONGS);
  }
}
