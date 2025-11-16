const jwt = require("jsonwebtoken");
const { Head } = require("../modules/auth/auth.model");

module.exports = (role) => {
    return async(req, res, next) => {
        try {
            const token = req.headers.authorization.split(" ")[1];
            if (!token) return res.status(401).json({ error: "Unauthorized" });

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            if (role === "Head" && decoded.type !== "Head")
                return res.status(403).json({ error: "Access denied" });

            req.user = decoded;
            next();
        } catch (err) {
            res.status(401).json({ error: "Invalid or expired token" });
        }
    };
};