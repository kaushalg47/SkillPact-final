import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import courseRoutes from "./routes/course.route.js";
import courseProgress from "./routes/courseProgress.route.js";
import jobRoutes from "./routes/jobRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import coursePurchaseRoutes from "./routes/purchaseCourse.route.js";
import notificationRoutes from "./routes/notification.routes.js";
import badgeRoutes from "./routes/badgeRoutes.js";
import cors from "cors";

dotenv.config();
const port = process.env.PORT || 8000;

connectDB();

const app = express();

// CORS Setup (uncomment if needed)
app.use(
  cors({
    origin: ["http://localhost:3000", "https://skill-pact-final.vercel.app/"],
    credentials: true,
  })
);

// Dev Middleware to log requests
app.use((req, res, next) => {
  console.log(req.method, req.originalUrl);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ API Routes
app.use("/api/users", userRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/apply", applicationRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/course-progress", courseProgress);
app.use("/api/course-purchase", coursePurchaseRoutes);
app.use("/api/badges", badgeRoutes);

// ✅ Serve Frontend
const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  // 🔥 Catch-All Route must come BEFORE error handling
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

// ✅ Error handling middleware
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
