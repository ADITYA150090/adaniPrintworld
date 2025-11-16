const authService = require("./auth.service");
const { Admin, Head, Officer } = require("./auth.model");


// ----------- REGISTER -----------
exports.register = async(req, res) => {
    try {
        const { type } = req.params;

        if (!["admin", "head", "officer"].includes(type)) {
            return res.status(400).json({ message: "Invalid user type" });
        }

        const user = await authService.signup(type, req.body);

        res.status(201).json({
            success: true,
            message: `${type} registered successfully. Verify your email.`,
            data: user,
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// ----------- EMAIL VERIFY -----------
exports.verifyEmail = async(req, res) => {
    try {
        await authService.verifyEmail(req.query.token);

        res.json({ success: true, message: "Email verified successfully" });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// ----------- LOGIN -----------
exports.login = async(req, res) => {
    try {
        const { user, token } = await authService.login(
            req.body.email,
            req.body.password
        );

        res.json({
            success: true,
            message: "Login successful",
            token,
            user,
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};


exports.approveOfficer = async(req, res) => {
    try {
        const officer = await Officer.findById(req.params.officerId);
        if (!officer) return res.status(404).json({ error: "Officer not found" });

        officer.approvedByHead = true;
        officer.isVerified = true;
        await officer.save();

        res.json({ success: true, message: "Officer approved successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};