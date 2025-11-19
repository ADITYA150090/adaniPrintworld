const axios = require('axios');

// Config
const BASE_URL = 'http://localhost:10000';
const FRONTEND_URL = 'http://localhost:5174';

// Test users
const testUsers = {
    admin: { email: "admin@example.com", password: "password123" },
    head: { email: "head@example.com", password: "password123" },
    officer: { email: "officer@example.com", password: "password123" }
};

let tokens = {};

async function request(method, endpoint, data = null, token = null) {
    try {
        const config = {
            method,
            url: BASE_URL + endpoint,
            data,
            headers: {}
        };

        if (token) config.headers.Authorization = `Bearer ${token}`;

        const res = await axios(config);

        return { success: true, status: res.status, data: res.data };
    } catch (err) {
        return {
            success: false,
            status: err.response.status,
            error: err.response.data || err.message
        };
    }
}

// 🔐 Login Test
async function testLogin() {
    console.log("\n🔐 Testing Login");

    for (const [role, creds] of Object.entries(testUsers)) {
        const result = await request("POST", "/auth/login", creds);
        console.log(role, result.success ? "✅ OK" : "❌ FAIL");

        if (result.success) {
            tokens[role] = result.data.token;
        }
    }
}

// 👑 Admin API Tests
async function testAdmin() {
    console.log("\n👑 Admin API Tests");

    if (!tokens.admin) return console.log("❌ Admin login failed, skipping admin tests");

    console.log("Dashboard:", (await request("GET", "/admin/dashboard", null, tokens.admin)).success ? "✅" : "❌");
    console.log("Heads:", (await request("GET", "/admin/heads", null, tokens.admin)).success ? "✅" : "❌");
}

// 🎯 Head API Tests
async function testHead() {
    console.log("\n🎯 Head API Tests");

    if (!tokens.head) return console.log("❌ Head login failed, skipping head tests");

    const dash = await request("GET", "/head/dashboard", null, tokens.head);

    console.log("Dashboard:", dash.success ? "✅" : "❌");
}

// 👮 Officer API Tests
async function testOfficer() {
    console.log("\n👮 Officer API Tests");

    if (!tokens.officer) return console.log("❌ Officer login failed, skipping officer tests");

    console.log("Dashboard:", (await request("GET", "/officer/dashboard", null, tokens.officer)).success ? "✅" : "❌");

    const lots = await request("GET", "/officer/lot", null, tokens.officer);
    console.log("Get Lots:", lots.success ? "✅" : "❌");

    if (lots.success && lots.data.data.length > 0) {
        const lotId = lots.data.data[0].lotno;

        const nameplates = await request("GET", `/officer/lot/${lotId}/nameplate`, null, tokens.officer);

        console.log("Get Nameplates:", nameplates.success ? "✅" : "❌");
    }
}

// 🌐 Frontend Test
async function testFrontend() {
    console.log("\n🌐 Testing Frontend Server");

    try {
        const res = await axios.get(FRONTEND_URL);
        console.log("Frontend:", res.status === 200 ? "✅ Running" : "❌");
    } catch {
        console.log("Frontend: ❌ Not running");
    }
}

// Run all tests
async function run() {
    console.log("\n🚀 STARTING TESTS");

    await testLogin();
    await testAdmin();
    await testHead();
    await testOfficer();
    await testFrontend();

    console.log("\n🏁 TESTS COMPLETED");
}

run();