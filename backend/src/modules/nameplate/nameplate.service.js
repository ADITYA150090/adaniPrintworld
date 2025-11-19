const Nameplate = require("./nameplate.model");

class NameplateService {
    async create(data) {
        const nameplate = new Nameplate(data);
        return await nameplate.save();
    }

    async getAll() {
        return await Nameplate.find()
            .populate("lotId", "lotno")
            .populate("officerId", "name email")
            .populate("headId", "name email")
            .populate("approvedBy", "name email");
    }

    async getById(id) {
        return await Nameplate.findById(id)
            .populate("lotId", "lotno")
            .populate("officerId", "name email")
            .populate("headId", "name email")
            .populate("approvedBy", "name email");
    }

    async approve(id, approvedById) {
        const nameplate = await Nameplate.findByIdAndUpdate(
            id, { approvalStatus: "Approved", approvedBy: approvedById, approvedAt: Date.now() }, { new: true }
        );
        if (!nameplate) throw new Error("Nameplate not found");
        return nameplate;
    }

    async reject(id, rejectedById) {
        const nameplate = await Nameplate.findByIdAndUpdate(
            id, { approvalStatus: "Rejected", approvedBy: rejectedById, approvedAt: Date.now() }, { new: true }
        );
        if (!nameplate) throw new Error("Nameplate not found");
        return nameplate;
    }
}

module.exports = new NameplateService();