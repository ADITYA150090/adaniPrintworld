const request = require("supertest");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const app = require("../server");
const { Officer, Head, Admin } = require("../src/modules/auth/auth.model");
const Lot = require("../src/modules/lot/lot.model");
const Nameplate = require("../src/modules/nameplate/nameplate.model");
const fs = require("fs");
const path = require("path");

// Mock environment variables
process.env.JWT_SECRET = "testsecret";
process.env.NODE_ENV = "test";

const TEST_DB_URI = "mongodb://localhost:27017/adani_print_test";

let officerToken, headToken, adminToken;
let officerId, headId, adminId, tseId;
let lotId, nameplateId;

beforeAll(async () => {
    await mongoose.connect(TEST_DB_URI);
    await mongoose.connection.db.dropDatabase();

    // Create Users
    tseId = new mongoose.Types.ObjectId().toString();

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
    headId = head._id;
    headToken = jwt.sign({ _id: head._id, role: "Head", tseId }, process.env.JWT_SECRET);

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
    officerId = officer._id;
    officerToken = jwt.sign({ _id: officer._id, role: "Officer", tseId }, process.env.JWT_SECRET);

    const admin = await Admin.create({
        name: "Admin User",
        email: "admin@test.com",
        password: "password"
    });
    adminId = admin._id;
    adminToken = jwt.sign({ _id: admin._id, role: "Admin" }, process.env.JWT_SECRET);
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("Workflow Test", () => {
    test("Officer should create a Lot", async () => {
        const res = await request(app)
            .post("/lot")
            .set("Authorization", `Bearer ${officerToken}`)
            .send({
                lotno: "LOT001",
                headId: headId
            });

        expect(res.status).toBe(201);
        expect(res.body.lotno).toBe("LOT001");
        lotId = res.body._id;
    });

    test("Officer should create a Nameplate in Lot", async () => {
        const res = await request(app)
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

        expect(res.status).toBe(201);
        expect(res.body.name).toBe("John Doe");
        nameplateId = res.body._id;
    });

    test("Head should see unverified Lots", async () => {
        const res = await request(app)
            .get("/head/lots/unverified")
            .set("Authorization", `Bearer ${headToken}`);

        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body[0]._id).toBe(lotId);
    });

    test("Head should verify Nameplate", async () => {
        const res = await request(app)
            .patch(`/head/nameplate/${nameplateId}/verify`)
            .set("Authorization", `Bearer ${headToken}`)
            .send({ status: "TSE_APPROVED" });

        expect(res.status).toBe(200);
        expect(res.body.status).toBe("TSE_APPROVED");
    });

    test("Head should verify Lot", async () => {
        const res = await request(app)
            .patch(`/head/lot/${lotId}/verify`)
            .set("Authorization", `Bearer ${headToken}`)
            .send({ status: "APPROVED" });

        expect(res.status).toBe(200);
        expect(res.body.isVerified).toBe(true);
    });

    test("Admin should see verified Lots", async () => {
        const res = await request(app)
            .get("/admin/lots/verified")
            .set("Authorization", `Bearer ${adminToken}`);

        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body[0]._id).toBe(lotId);
    });

    test("Admin should download Lot Zip", async () => {
        const res = await request(app)
            .get(`/admin/lot/${lotId}/download`)
            .set("Authorization", `Bearer ${adminToken}`)
            .responseType("blob");

        expect(res.status).toBe(200);
        expect(res.headers["content-type"]).toContain("zip");
    });
});
