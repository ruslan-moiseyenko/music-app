import { Response } from "express";
import { FavoriteService } from "../services/favorite.service";
import { AuthRequest } from "../middlewares/auth.middleware";

export class FavoriteController {
  private favoriteService: FavoriteService;

  constructor() {
    this.favoriteService = new FavoriteService();
  }

  getUserFavorites = (req: AuthRequest, res: Response) => {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const favorites = this.favoriteService.getUserFavoriteSongs(req.user.id);
    res.json(favorites);
    return;
  };

  addFavorite = (req: AuthRequest, res: Response) => {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const { songId } = req.body;

    if (!songId) {
      res.status(400).json({ message: "Song ID is required" });
      return;
    }

    const favorite = this.favoriteService.addFavorite(req.user.id, songId);

    if (!favorite) {
      res
        .status(400)
        .json({ message: "Song not found or already in favorites" });
      return;
    }

    res.status(201).json(favorite);
  };

  removeFavorite = (req: AuthRequest, res: Response) => {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const { songId } = req.params;

    if (!songId) {
      res.status(400).json({ message: "Song ID is required" });
      return;
    }

    const success = this.favoriteService.removeFavorite(req.user.id, songId);

    if (!success) {
      res.status(404).json({ message: "Favorite not found" });
      return;
    }

    res.json({ message: "Favorite removed successfully" });
  };
}
