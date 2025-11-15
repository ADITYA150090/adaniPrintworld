const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Admin, Head, Officer } = require("./auth.model");

function getModel(type) {
    if (type === "admin") return Admin;
    if (type === "head") return Head;
    return Officer;
}

// ------------------- SIGNUP -------------------
async function signup(type, data) {
    const Model = getModel(type);

    const token = crypto.randomBytes(32).toString("hex");
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await Model.create({
        ...data,
        password: hashedPassword,
        verifyToken: token,
        verifyTokenExpiry: Date.now() + 30 * 60 * 1000, // 30 min
    });

    // TODO send email (nodemailer)
    // sendVerificationEmail(user.email, token);

    return user;
}

// ------------------- VERIFY EMAIL -------------------
async function verifyEmail(token) {
    const models = [Admin, Head, Officer];

    for (const Model of models) {
        const user = await Model.findOne({ verifyToken: token });

        if (user) {
            if (user.verifyTokenExpiry < Date.now()) {
                throw new Error("Verification link expired");
            }

            user.isVerified = true;
            user.verifyToken = null;
            user.verifyTokenExpiry = null;
            await user.save();
            return user;
        }
    }

    throw new Error("Invalid verification token");
}

// ------------------- LOGIN -------------------
async function login(email, password) {
    const models = [Admin, Head, Officer];

    for (const Model of models) {
        const user = await Model.findOne({ email });

        if (user) {
            const match = await bcrypt.compare(password, user.password);
            if (!match) throw new Error("Invalid password");
            if (!user.isVerified) throw new Error("Email not verified");

            const token = jwt.sign({ id: user._id, type: Model.modelName },
                process.env.JWT_SECRET, { expiresIn: "1d" }
            );

            return { user, token };
        }
    }

    throw new Error("User not found");
}

module.exports = {
    signup,
    verifyEmail,
    login,
};