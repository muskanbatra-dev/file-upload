import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

import app from "./app.js";
import { connectDB } from "./config/db.js";
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
