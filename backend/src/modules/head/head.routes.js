const router = require("express").Router();
const controller = require("./head.controller");
const { auth, authorize } = require("../../middleware/auth.middleware");
const { Officer } = require("../auth/auth.model");

// Dashboard (only Head)
router.get("/dashboard", auth, authorize("Head"), controller.dashboard);

// Approve Officer
router.patch("/approve/:officerId", auth, authorize("Head"), controller.approveOfficer);

// Reject Officer
router.patch("/reject/:officerId", auth, authorize("Head"), async(req, res) => {
    try {
        const officer = await Officer.findOne({
            _id: req.params.officerId,
            headId: req.user.id,
        });

        if (!officer) {
            return res.status(404).json({ success: false, message: "Officer not found" });
        }

        officer.approvedByHead = false;
        officer.isVerified = false;

        await officer.save();

        res.json({ success: true, message: "Officer rejected successfully" });
    } catch (err) {
        console.error("Reject Error:", err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;