import { Router, Request, Response, NextFunction } from "express";
import { UserController } from "../controllers/user.controller";

const router = Router();
const userController = new UserController();

router.post("/login", (req: Request, res: Response, next: NextFunction) =>
  userController.login(req, res, next)
);
router.post("/register", (req: Request, res: Response, next: NextFunction) =>
  userController.register(req, res, next)
);

export default router;
