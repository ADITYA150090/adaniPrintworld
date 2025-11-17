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
        return await Nameplate.findByIdAndUpdate(
            id, { approvalStatus: "Approved", approvedBy: approvedById, approvedAt: new Date() }, { new: true }
        );
    }

    async reject(id) {
        return await Nameplate.findByIdAndUpdate(
            id, { approvalStatus: "Rejected" }, { new: true }
        );
    }
}

module.exports = new NameplateService();