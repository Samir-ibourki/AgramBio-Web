import dotenv from "dotenv";
import sequelize from "../config/database.js";
import { Category, Product, Page } from "../models/associations.js";

dotenv.config();

const seedData = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });

    const categories = await Category.bulkCreate([
      {
        name: { ar: "عسل طبيعي", fr: "Miel Naturel" },
        slug: "miel-naturel",
        description: { ar: "تشكيلة من أفضل أنواع العسل المغربي", fr: "Une sélection des meilleurs miels marocains." }
      },
      {
        name: { ar: "زيوت طبيعية", fr: "Huiles Naturelles" },
        slug: "huiles-naturelles",
        description: { ar: "زيوت معصورة على البارد للحفاظ على جودتها", fr: "Huiles pressées à froid pour préserver leur qualité." }
      },
      {
        name: { ar: "أملو", fr: "Amlou" },
        slug: "amlou",
        description: { ar: "أملو تقليدي مصنوع من اللوز وأركان", fr: "Amlou traditionnel fait à base d'amandes et d'argan." }
      }
    ]);

    await Product.bulkCreate([
      {
        categoryId: categories[0].id,
        name: { ar: "عسل الدغموس", fr: "Miel de Dghmous" },
        slug: "miel-de-dghmous",
        description: { ar: "عسل الدغموس الحر من منطقة سوس", fr: "Miel de Dghmous pur de la région du Souss." },
        price: 300,
        originalPrice: 350,
        images: ["/uploads/dghmous.jpg"],
        isFeatured: true
      },
      {
        categoryId: categories[0].id,
        name: { ar: "عسل الزعتر", fr: "Miel de Thym" },
        slug: "miel-de-thym",
        description: { ar: "عسل الزعتر الطبيعي المعروف بفوائده الصحية", fr: "Miel de thym naturel connu pour ses bienfaits." },
        price: 250,
        images: ["/uploads/thym.jpg"]
      },
      {
        categoryId: categories[1].id,
        name: { ar: "زيت أركان للأكل", fr: "Huile d'Argan Alimentaire" },
        slug: "huile-dargan-alimentaire",
        description: { ar: "زيت أركان طبيعي 100% معصور بالطريقة التقليدية", fr: "Huile d'argan 100% naturelle pressée traditionnellement." },
        price: 400,
        originalPrice: 450,
        images: ["/uploads/argan.jpg"],
        isFeatured: true
      }
    ]);

    await Page.create({
      title: { ar: "الرئيسية", fr: "Accueil" },
      slug: "home-hero",
      content: {
        heroTitle: { ar: "المحتضن الرسمي للسعادة", fr: "Le sponsor officiel du bonheur" },
        heroSubtitle: { ar: "على طريق السعادة، نحن في انتظاركم... استنشق جوهر منتجاتنا واشعر بالحياة...", fr: "Sur la route du bonheur, nous vous attendons... Respirez l'essence de nos produits et ressentez la vie..." },
        heroButton: { ar: "اشترِ الآن", fr: "Acheter maintenant" }
      }
    });

    console.log("Master data seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedData();
