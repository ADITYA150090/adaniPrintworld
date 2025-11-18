const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Admin, Head, Officer } = require("./auth.model");

function getModel(type) {
    if (type === "admin") return Admin;
    if (type === "head") return Head;
    if (type === "officer") return Officer;
    throw new Error("Invalid user role type");
}

// ----------------- REGISTER -----------------
exports.signup = async(type, data) => {
    const Model = getModel(type.toLowerCase());

    // Check for duplicate email across all user models
    const allModels = [Admin, Head, Officer];
    for (const checkModel of allModels) {
        const existingUser = await checkModel.findOne({ email: data.email });
        if (existingUser) {
            throw new Error("Email already exists");
        }
    }

    const token = crypto.randomBytes(32).toString("hex");
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Special validation for officer
    if (type === "officer") {
        const head = await Head.findOne({ tseId: data.tseId, isVerified: true });
        if (!head) throw new Error("Invalid or unverified TSE ID");

        data.headId = head._id;
        data.approvedByHead = false;
        data.isVerified = false;
    }

    const user = await Model.create({
        ...data,
        password: hashedPassword,
        verifyToken: token,
        verifyTokenExpiry: Date.now() + 30 * 60 * 1000,
    });

    return user;
};

// ----------------- VERIFY EMAIL -----------------
exports.verifyEmail = async(token) => {
    const models = [Admin, Head, Officer];

    for (const Model of models) {
        const user = await Model.findOne({ verifyToken: token });

        if (!user) continue;

        if (user.verifyTokenExpiry < Date.now()) {
            throw new Error("Verification link expired");
        }

        user.isVerified = true;

        if (Model === Head && !user.tseId) {
            const count = await Head.countDocuments({ tseId: { $ne: null } });
            user.tseId = "TSE" + String(count + 1).padStart(3, "0");
        }

        user.verifyToken = null;
        user.verifyTokenExpiry = null;
        await user.save();

        return user;
    }

    throw new Error("Invalid verification token");
};

// ----------------- LOGIN -----------------
exports.login = async(email, password) => {
    const models = [Admin, Head, Officer];

    for (const Model of models) {
        const user = await Model.findOne({ email });
        if (!user) continue;

        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new Error("Incorrect password");
        if (!user.isVerified) throw new Error("Email not verified");

        const token = jwt.sign({ id: user._id, role: Model.modelName },
            process.env.JWT_SECRET, { expiresIn: "1d" }
        );

        return { user, token };
    }

    throw new Error("User not found");
};