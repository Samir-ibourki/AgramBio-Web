import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import sequelize from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import path from "path";
import paymentRoutes from "./routes/paymentRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import "./models/associations.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// static files
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/payments", paymentRoutes);

// error handler middleware
app.use(errorHandler);

// health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "AgramBio API is running" });
});

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database synced successfully!");
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Database sync error:", err);
  });
