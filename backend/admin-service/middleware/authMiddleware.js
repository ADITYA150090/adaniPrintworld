const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ msg: "No token, access denied" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin")
      return res.status(403).json({ msg: "Access denied: Admin only" });

    req.user = decoded; // token data store
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid or expired token" });
  }
};
