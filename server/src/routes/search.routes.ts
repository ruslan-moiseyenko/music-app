import { Router, RequestHandler } from "express";
import { SearchController } from "../controllers/search.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();
const searchController = new SearchController();

router.get(
  "/",
  authMiddleware as RequestHandler,
  searchController.search as RequestHandler
);

router.get(
  "/history",
  authMiddleware as RequestHandler,
  searchController.getSearchHistory as RequestHandler
);

export default router;
