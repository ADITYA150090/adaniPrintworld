const router = require("express").Router();
const controller = require("./head.controller");
const auth = require("../../middleware/auth.middleware");
const role = require("../../middleware/role.middleware");

router.get("/dashboard", auth, role("Head"), controller.dashboard);
router.patch("/approve/:officerId", auth, role("Head"), controller.approveOfficer);


router.patch("/reject/:officerId", auth, role("Head"), async(req, res) => {
    try {
        const officer = await Officer.findOne({ _id: req.params.officerId, headId: req.user.id });
        if (!officer) return res.status(404).json({ success: false, message: "Officer not found" });

        officer.approvedByHead = false;
        officer.isVerified = false;
        officer.rejected = true;
        await officer.save();

        res.json({ success: true, message: "Officer rejected successfully" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;