import { Router, RequestHandler } from "express";
import { FavoriteController } from "../controllers/favorite.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();
const favoriteController = new FavoriteController();

router.get(
  "/",
  authMiddleware as RequestHandler,
  favoriteController.getUserFavorites
);
router.post(
  "/",
  authMiddleware as RequestHandler,
  favoriteController.addFavorite
);
router.delete(
  "/:songId",
  authMiddleware as RequestHandler,
  favoriteController.removeFavorite
);

export default router;
