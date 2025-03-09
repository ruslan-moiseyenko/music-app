import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../middlewares/auth.middleware";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  login = (req: Request, res: Response, next: NextFunction): void => {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ message: "Username and password are required" });
      return;
    }

    const user = this.userService.validateUser(username, password);

    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  };

  register = (req: Request, res: Response, next: NextFunction): void => {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ message: "Username and password are required" });
      return;
    }

    try {
      const user = this.userService.createUser(username, password);

      const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.status(201).json({ token });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  };
}
