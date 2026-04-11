import dotenv from "dotenv";
import sequelize from "../config/database.js";
import BankInfo from "../models/BankInfo.js";

dotenv.config();

const seedBanks = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected...");
    
    // Ensure table exists
    await sequelize.sync({ alter: true });
    console.log("Database synced...");

    const banks = [
      {
        bankName: "Attijariwafa Bank",
        accountName: "AgramBio E-commerce",
        rib: "007 010 000 7848000000000 88", // Mock RIB
        isActive: true,
      },
      {
        bankName: "CIH Bank",
        accountName: "AgramBio E-commerce",
        rib: "230 010 000 1234567890123 45", // Mock RIB
        isActive: true,
      },
    ];

    for (const bank of banks) {
      const exists = await BankInfo.findOne({ where: { rib: bank.rib } });
      if (!exists) {
        await BankInfo.create(bank);
        console.log(`Seeded bank: ${bank.bankName}`);
      } else {
        console.log(`Bank already exists: ${bank.bankName}`);
      }
    }

    console.log("Bank information seeded successfully!");
    process.exit();
  } catch (error) {
    console.error(`Error seeding banks: ${error.message}`);
    process.exit(1);
  }
};

seedBanks();
