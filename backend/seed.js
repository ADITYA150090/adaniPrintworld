const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Admin, Head, Officer } = require("./src/modules/auth/auth.model");
require("dotenv").config();

async function seedDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/adaniPrintworld");

        // Clear existing data
        await Admin.deleteMany({});
        await Head.deleteMany({});
        await Officer.deleteMany({});

        // Hash password
        const hashedPassword = await bcrypt.hash("password123", 10);

        // Create Admin
        const admin = await Admin.create({
            name: "Super Admin",
            email: "admin@example.com",
            password: hashedPassword,
            isVerified: true,
        });

        // Create Head
        const head = await Head.create({
            name: "John Doe",
            number: "1234567890",
            email: "head@example.com",
            tseId: "TSE001",
            district: "Mumbai",
            pincode: "400001",
            password: hashedPassword,
            isVerified: true,
        });

        // Create Officer
        const officer = await Officer.create({
            name: "Jane Smith",
            email: "officer@example.com",
            number: "0987654321",
            address: "123 Main St, Mumbai",
            tseId: "TSE001",
            headId: head._id,
            password: hashedPassword,
            approvedByHead: true,
            isVerified: true,
        });

        console.log("Dummy data seeded successfully!");
        console.log("Admin: admin@example.com / password123");
        console.log("Head: head@example.com / password123");
        console.log("Officer: officer@example.com / password123");

        process.exit(0);
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
}

seedDatabase();