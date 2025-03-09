import { Response } from "express";
import { SongService } from "../services/song.service";
import { SearchHistoryService } from "../services/search-history.service";
import { AuthRequest } from "../middlewares/auth.middleware";

export class SearchController {
  private songService: SongService;
  private searchHistoryService: SearchHistoryService;

  constructor() {
    this.songService = new SongService();
    this.searchHistoryService = new SearchHistoryService();
  }

  search = async (req: AuthRequest, res: Response) => {
    const { query } = req.query;

    if (query === undefined) {
      const allSongs = this.songService.getAllSongs();
      res.json(allSongs);
      return;
    }

    if (typeof query !== "string") {
      return res
        .status(400)
        .json({ message: "Query parameter must be a string" });
    }

    const songs = this.songService.searchSongs(query);

    if (req.user) {
      this.searchHistoryService.addSearchHistory(req.user.id, query);
    }

    res.json(songs);
  };

  getSearchHistory = (req: AuthRequest, res: Response) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const history = this.searchHistoryService.getUserSearchHistory(req.user.id);
    res.json(history);
  };
}
