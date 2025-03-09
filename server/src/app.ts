import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import searchRoutes from "./routes/search.routes";
import favoriteRoutes from "./routes/favorite.routes";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/favorites", favoriteRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
