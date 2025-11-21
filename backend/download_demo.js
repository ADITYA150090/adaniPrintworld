const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const adminService = require("./src/modules/admin/admin.service");
const { Officer, Head } = require("./src/modules/auth/auth.model");
const Lot = require("./src/modules/lot/lot.model");
const Nameplate = require("./src/modules/nameplate/nameplate.model");

// Mock environment
process.env.JWT_SECRET = "testsecret";
const DB_URI = "mongodb://127.0.0.1:27017/adani_print_test_manual"; // Use IP

async function generateZip() {
    try {
        console.log("Starting script...");
        console.log(`Connecting to DB at ${DB_URI}...`);
        await mongoose.connect(DB_URI, { serverSelectionTimeoutMS: 5000 });
        console.log("DB Connected");

        // Create Dummy Data
        const tseId = new mongoose.Types.ObjectId().toString();

        let head = await Head.findOne({ email: "head_demo@test.com" });
        if (!head) {
            head = await Head.create({
                name: "Demo Head",
                email: "head_demo@test.com",
                password: "password",
                number: "1111111111",
                district: "Demo District",
                pincode: "000000",
                tseId: tseId,
                isVerified: true
            });
        }

        let officer = await Officer.findOne({ email: "officer_demo@test.com" });
        if (!officer) {
            officer = await Officer.create({
                name: "Demo Officer",
                email: "officer_demo@test.com",
                password: "password",
                number: "2222222222",
                address: "Demo Address",
                tseId: tseId,
                headId: head._id,
                approvedByHead: true,
                isVerified: true
            });
        }

        const lot = await Lot.create({
            lotno: "DEMO_LOT_" + Date.now(),
            officerId: officer._id,
            tseId: tseId,
            headId: head._id,
            isVerified: true,
            status: "Approved"
        });

        await Nameplate.create({
            lotId: lot._id,
            createdBy: officer._id,
            tseId: tseId,
            name: "Demo User",
            address: "123 Demo Lane",
            houseName: "Demo Villa",
            theme: "Classic",
            selectedImage: "img.png",
            nameStyle: {},
            addressStyle: {},
            houseStyle: {},
            status: "TSE_APPROVED"
        });

        console.log(`Created Lot: ${lot.lotno}`);

        // Mock Response Object
        const outputPath = path.join(__dirname, `adani_lot_${lot.lotno}.zip`);
        const outputStream = fs.createWriteStream(outputPath);


        const res = {
            attachment: (filename) => console.log(`Attachment: ${filename}`),
            setHeader: (key, value) => console.log(`Header: ${key}=${value}`),
            // Archiver pipes to this, which needs to be a writable stream
            // But archiver.pipe(res) expects res to be a stream.
            // In express, res IS a stream.
            // So we can pass our file stream as 'res' but add the missing methods.
        };

        // We can't easily mix the stream and the methods on the file stream directly without being careful.
        // Better approach: Pass the file stream, but attach the methods.
        outputStream.attachment = (filename) => console.log(`Attachment: ${filename}`);
        outputStream.setHeader = (key, value) => console.log(`Header: ${key}=${value}`);

        console.log(`Generating Zip to: ${outputPath}`);
        await adminService.downloadLot(lot._id, outputStream);

        // Wait for stream to finish
        outputStream.on("close", () => {
            console.log("Zip file created successfully!");
            mongoose.connection.close();
        });

    } catch (error) {
        console.error("Error:", error);
        mongoose.connection.close();
    }
}

generateZip();
