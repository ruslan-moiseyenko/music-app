import { SearchHistory } from "../models/search-history.model";
import { FileUtils } from "../utils/file.utils";

export class SearchHistoryService {
  private readonly fileName = "search-history.json";

  getAllSearchHistory(): SearchHistory[] {
    return FileUtils.readJsonFile<SearchHistory>(this.fileName);
  }

  getUserSearchHistory(userId: string): SearchHistory[] {
    const history = this.getAllSearchHistory();
    return history
      .filter((item) => item.userId === userId)
      .sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
  }

  addSearchHistory(userId: string, query: string): SearchHistory {
    const history = this.getAllSearchHistory();

    const newSearchItem: SearchHistory = {
      userId,
      query,
      timestamp: new Date()
    };

    history.push(newSearchItem);
    FileUtils.writeJsonFile<SearchHistory>(this.fileName, history);

    return newSearchItem;
  }
}
