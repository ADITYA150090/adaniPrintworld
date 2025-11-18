const Nameplate = require("./nameplate.model");

class NameplateService {
    async create(data) {
        const nameplate = new Nameplate(data);
        return await nameplate.save();
    }

    async getAll() {
        return await Nameplate.find();
    }

    async getById(id) {
        return await Nameplate.findById(id);
    }

    async approve(id, approvedById) {
        const nameplate = await Nameplate.findByIdAndUpdate(
            id, { approvalStatus: "Approved", approvedBy: approvedById, approvedAt: new Date() }, { new: true }
        );
        if (!nameplate) throw new Error("Nameplate not found");
        return nameplate;
    }

    async reject(id) {
        const nameplate = await Nameplate.findByIdAndUpdate(
            id, { approvalStatus: "Rejected" }, { new: true }
        );
        if (!nameplate) throw new Error("Nameplate not found");
        return nameplate;
    }
}

module.exports = new NameplateService();