import dotenv from "dotenv";
import bcrypt from "bcrypt";
import sequelize from "../config/database.js";
import Admin from "../models/Admin.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected...");

    const email = process.env.INIT_ADMIN_EMAIL;
    const name = process.env.INIT_ADMIN_NAME;
    const password = process.env.INIT_ADMIN_PASSWORD;

    if (!email || !password || !name) {
      console.error(
        "Please provide INIT_ADMIN_NAME, INIT_ADMIN_EMAIL and INIT_ADMIN_PASSWORD in .env"
      );
      process.exit(1);
    }

    // check if admin exists
    const adminExists = await Admin.findOne({ where: { email } });

    if (adminExists) {
      console.log("Admin already exists!");
      process.exit();
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    await Admin.create({
      name,
      email,
      password: hashedPassword,
    });

    console.log("Admin user created successfully!");
    process.exit();
  } catch (error) {
    console.error(`Error seeding admin: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();
