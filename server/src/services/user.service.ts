import { User } from "../models/user.model";
import { FileUtils } from "../utils/file.utils";
import { v4 as uuidv4 } from "uuid";

export class UserService {
  private readonly fileName = "users.json";

  getAllUsers(): User[] {
    return FileUtils.readJsonFile<User>(this.fileName);
  }

  getUserById(id: string): User | undefined {
    const users = this.getAllUsers();
    return users.find((user) => user.id === id);
  }

  getUserByUsername(username: string): User | undefined {
    const users = this.getAllUsers();
    return users.find((user) => user.username === username);
  }

  createUser(username: string, password: string): User {
    const users = this.getAllUsers();

    if (users.some((user) => user.username === username)) {
      throw new Error("User already exists");
    }

    const newUser: User = {
      id: uuidv4(),
      username,
      password
    };

    users.push(newUser);
    FileUtils.writeJsonFile<User>(this.fileName, users);

    return newUser;
  }

  validateUser(username: string, password: string): User | undefined {
    const user = this.getUserByUsername(username);

    if (user && user.password === password) {
      return user;
    }

    return undefined;
  }
}
