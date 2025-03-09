import * as fs from "fs";
import * as path from "path";

export class FileUtils {
  static readJsonFile<T>(filename: string): T[] {
    const filePath = path.join(__dirname, "../data", filename);

    try {
      if (!fs.existsSync(filePath)) {
        return [];
      }
      const data = fs.readFileSync(filePath, "utf8");

      if (!data || data.trim() === "") {
        return [];
      }

      return JSON.parse(data);
    } catch (error) {
      console.error(`Error reading file ${filename}:`, error);
      return [];
    }
  }

  static writeJsonFile<T>(filename: string, data: T[]): void {
    const filePath = path.join(__dirname, "../data", filename);
    const dirPath = path.dirname(filePath);

    try {
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
    } catch (error) {
      console.error(`Error writing file ${filename}:`, error);
    }
  }
}
