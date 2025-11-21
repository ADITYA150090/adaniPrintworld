const request = require("supertest");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const app = require("../server");
const { Officer, Head, Admin } = require("../src/modules/auth/auth.model");
const Lot = require("../src/modules/lot/lot.model");
const Nameplate = require("../src/modules/nameplate/nameplate.model");

// Mock environment variables
process.env.JWT_SECRET = "testsecret";
process.env.NODE_ENV = "test";

const TEST_DB_URI = "mongodb://localhost:27017/adani_print_test_manual";

async function run() {
    try {
        console.log("Connecting to DB...");
        await mongoose.connect(TEST_DB_URI);
        await mongoose.connection.db.dropDatabase();
        console.log("DB Connected and Dropped");

        // Create Users
        const tseId = new mongoose.Types.ObjectId().toString();

        const head = await Head.create({
            name: "Head User",
            email: "head@test.com",
            password: "password",
            number: "1234567890",
            district: "Test District",
            pincode: "123456",
            tseId: tseId,
            isVerified: true
        });
        const headToken = jwt.sign({ _id: head._id, role: "Head", tseId }, process.env.JWT_SECRET);

        const officer = await Officer.create({
            name: "Officer User",
            email: "officer@test.com",
            password: "password",
            number: "0987654321",
            address: "Test Address",
            tseId: tseId,
            headId: head._id,
            approvedByHead: true,
            isVerified: true
        });
        const officerToken = jwt.sign({ _id: officer._id, role: "Officer", tseId }, process.env.JWT_SECRET);

        const admin = await Admin.create({
            name: "Admin User",
            email: "admin@test.com",
            password: "password"
        });
        const adminToken = jwt.sign({ _id: admin._id, role: "Admin" }, process.env.JWT_SECRET);

        console.log("Users Created");

        // 1. Officer creates Lot
        console.log("Creating Lot...");
        let res = await request(app)
            .post("/lot")
            .set("Authorization", `Bearer ${officerToken}`)
            .send({
                lotno: "LOT001",
                headId: head._id
            });

        if (res.status !== 201) throw new Error(`Create Lot Failed: ${res.status} ${JSON.stringify(res.body)}`);
        const lotId = res.body._id;
        console.log("Lot Created:", lotId);

        // 2. Officer creates Nameplate
        console.log("Creating Nameplate...");
        res = await request(app)
            .post("/officer/nameplate")
            .set("Authorization", `Bearer ${officerToken}`)
            .send({
                lotId: lotId,
                name: "John Doe",
                address: "123 Main St",
                houseName: "Doe House",
                theme: "Theme1",
                selectedImage: "img1.png",
                nameStyle: { font: "Arial" },
                addressStyle: { font: "Arial" },
                houseStyle: { font: "Arial" }
            });

        if (res.status !== 201) throw new Error(`Create Nameplate Failed: ${res.status} ${JSON.stringify(res.body)}`);
        const nameplateId = res.body._id;
        console.log("Nameplate Created:", nameplateId);

        // 3. Head verifies Nameplate
        console.log("Verifying Nameplate...");
        res = await request(app)
            .patch(`/head/nameplate/${nameplateId}/verify`)
            .set("Authorization", `Bearer ${headToken}`)
            .send({ status: "TSE_APPROVED" });

        if (res.status !== 200) throw new Error(`Verify Nameplate Failed: ${res.status} ${JSON.stringify(res.body)}`);
        console.log("Nameplate Verified");

        // 4. Head verifies Lot
        console.log("Verifying Lot...");
        res = await request(app)
            .patch(`/head/lot/${lotId}/verify`)
            .set("Authorization", `Bearer ${headToken}`)
            .send({ status: "APPROVED" });

        if (res.status !== 200) throw new Error(`Verify Lot Failed: ${res.status} ${JSON.stringify(res.body)}`);
        console.log("Lot Verified");

        // 5. Admin downloads Lot
        console.log("Downloading Lot...");
        res = await request(app)
            .get(`/admin/lot/${lotId}/download`)
            .set("Authorization", `Bearer ${adminToken}`)
            .responseType("blob");

        if (res.status !== 200) throw new Error(`Download Lot Failed: ${res.status}`);
        console.log("Lot Downloaded. Content-Type:", res.headers["content-type"]);

        console.log("ALL TESTS PASSED");
        fs.writeFileSync("test_result.txt", "SUCCESS");

    } catch (error) {
        console.error("TEST FAILED:", error);
        fs.writeFileSync("test_result.txt", `FAILED: ${error.message}`);
    } finally {
        await mongoose.connection.close();
    }
}


run();
