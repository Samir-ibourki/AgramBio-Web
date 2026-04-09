import express from "express";
import cors from "cors";
import sequelize from "./config/database.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

sequelize
  .sync({ alter: true })
  .then(() => console.log("Database synced successfully!"))
  .catch((err) => console.log("Error DB", err));

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
