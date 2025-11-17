const nameplateService = require("./nameplate.service");

class NameplateController {
    async create(req, res) {
        try {
            const nameplate = await nameplateService.create(req.body);
            res.status(201).json(nameplate);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async getAll(req, res) {
        try {
            const nameplates = await nameplateService.getAll();
            res.json(nameplates);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getById(req, res) {
        try {
            const nameplate = await nameplateService.getById(req.params.id);
            if (!nameplate) return res.status(404).json({ error: "Not found" });
            res.json(nameplate);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async approve(req, res) {
        try {
            const nameplate = await nameplateService.approve(req.params.id, req.body.approvedBy);
            res.json(nameplate);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async reject(req, res) {
        try {
            const nameplate = await nameplateService.reject(req.params.id);
            res.json(nameplate);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new NameplateController();