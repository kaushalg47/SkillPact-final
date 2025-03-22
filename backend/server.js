import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import badgeRoutes from "./routes/badgeRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import courseRoutes from "./routes/course.route.js";
import courseProgress from "./routes/courseProgress.route.js";
import jobRoutes from "./routes/jobRoutes.js";
import notificationRoutes from "./routes/notification.routes.js";
import coursePurchaseRoutes from "./routes/purchaseCourse.route.js";
import userRoutes from "./routes/userRoutes.js";
dotenv.config();
const port = process.env.PORT || 8000;

connectDB();

const app = express();

// Extra DEV MIDDLEWARE FOR API TESTING
app.use((req, res, next) => {
	console.log(req.method, req.originalUrl);
	next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/progress/course", courseProgress);
app.use("/api/course-purchase", coursePurchaseRoutes);
app.use("/api/badges", badgeRoutes);
app.use("/api/notifications", notificationRoutes);

if (process.env.NODE_ENV === "production") {
	const __dirname = path.resolve();
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html")));
} else {
	app.get("/", (req, res) => {
		res.send("API is running....");
	});
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
