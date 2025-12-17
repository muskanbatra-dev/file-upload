import express from "express";

import authRoutes from "./routes/authe.route.js";
import fileRoutes from "./routes/file.route.js";

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/files", fileRoutes);

export default app;
