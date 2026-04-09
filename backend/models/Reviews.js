import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const Reviews = sequelize.define("reviews", {
  rating: {},
  comment: {
    type: DataTypes.STRING,
  },
});
