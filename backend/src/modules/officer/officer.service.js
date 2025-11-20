const Lot = require("../lot/lot.model");
const Nameplate = require("../nameplate/nameplate.model");

exports.getDashboardStats = async(userId) => {
    try {
        // Get total lots created by officer
        const totalLots = await Lot.countDocuments({ 
            officerId: userId, 
            isDeleted: false 
        });

        // Get total nameplates created by officer
        const totalNameplates = await Nameplate.countDocuments({ 
            officerId: userId, 
            isDeleted: false 
        });

        // Get nameplates by status
        const pendingNameplates = await Nameplate.countDocuments({ 
            officerId: userId, 
            status: "pending",
            isDeleted: false 
        });

        const approvedNameplates = await Nameplate.countDocuments({ 
            officerId: userId, 
            status: "approved",
            isDeleted: false 
        });

        const rejectedNameplates = await Nameplate.countDocuments({ 
            officerId: userId, 
            status: "rejected",
            isDeleted: false 
        });

        return {
            totalLots,
            totalNameplates,
            pendingNameplates,
            approvedNameplates,
            rejectedNameplates
        };
    } catch (error) {
        console.error("Error in getDashboardStats:", error);
        throw new Error("Failed to fetch dashboard stats");
    }
};

exports.createLot = async(userId) => {
    try {
        const OfficerModel = require("../auth/auth.model").Officer;
        const officer = await OfficerModel.findById(userId);

        if (!officer) throw new Error("Officer not found");

        // Find the last lot created by this officer
        const lastLot = await Lot.findOne({ officerId: userId })
            .sort({ createdAt: -1 });

        let nextNumber = 1;

        if (lastLot) {
            // Extract number from lotno (e.g., "LOT001" -> 1)
            const num = parseInt(lastLot.lotno.replace("LOT", ""));
            nextNumber = num + 1;
        }

        // Generate new lot number with padding (e.g., LOT001, LOT002)
   const newLotNo = "LOT" + officer.id.substring(0, 4).toUpperCase() + String(nextNumber).padStart(3, "0");

// Example output: LOT-ABCD001

        // Create new lot
        const lot = await Lot.create({
            lotno: newLotNo,
            officerId: userId,
            headId: officer.headId
        });

        // Convert to plain object to ensure all fields are properly serialized
        const lotObject = lot.toObject();
        
        return lotObject;
    } catch (error) {
        console.error("Error in createLot:", error);
        throw error;
    }
};

exports.getAllLots = async(userId) => {
    try {
        // Get all lots for the officer, sorted by newest first
        const lots = await Lot.find({ 
            officerId: userId,
            isDeleted: false 
        })
        .sort({ createdAt: -1 });
        
        return lots;
    } catch (error) {
        console.error("Error in getAllLots:", error);
        throw new Error("Failed to fetch lots");
    }
};

exports.createNameplate = async(lotId, data, userId) => {
    try {
        console.log("Service createNameplate - lotId:", lotId, "userId:", userId, "data:", data);
        
        // Validate lotId
        if (!lotId) {
            throw new Error("Lot ID is required");
        }

        // Check if lot exists by lotno
        let lot = await Lot.findOne({ lotno: lotId, isDeleted: false });
        console.log("Lot found:", lot);
        
        if (!lot) {
            // If lot doesn't exist, create it
            const OfficerModel = require("../auth/auth.model").Officer;
            const officer = await OfficerModel.findById(userId);
            console.log("Officer found:", officer);
            
            if (!officer) {
                throw new Error("Officer not found");
            }
            
            lot = new Lot({
                lotno: lotId,
                officerId: userId,
                headId: officer.headId
            });
            await lot.save();
            console.log("Lot created:", lot);
        }

        // Verify lot belongs to the officer
        if (lot.officerId.toString() !== userId.toString()) {
            throw new Error("Unauthorized: Lot does not belong to this officer");
        }

        // Get officer details for headId
        const OfficerModel = require("../auth/auth.model").Officer;
        const officer = await OfficerModel.findById(userId);
        if (!officer) {
            throw new Error("Officer not found");
        }

        // Create nameplate with lot's _id (not lotno)
        const nameplate = new Nameplate({
            lotId: lot._id,  // Use the MongoDB _id of the lot
            officerId: userId,
            headId: officer.headId,
            ...data
        });
        console.log("Creating nameplate:", nameplate);

        await nameplate.save();
        console.log("Nameplate saved:", nameplate);
        
        return nameplate;
    } catch (error) {
        console.error("Error in createNameplate:", error);
        throw error;
    }
};

exports.getNameplatesByLot = async(lotId) => {
    try {
        // Validate lotId
        if (!lotId) {
            throw new Error("Lot ID is required");
        }

        // Find lot by lotno
        const lot = await Lot.findOne({ lotno: lotId, isDeleted: false });
        if (!lot) {
            throw new Error("Lot not found");
        }

        // Get nameplates for the lot using lot's _id
        const nameplates = await Nameplate.find({ 
            lotId: lot._id,
            isDeleted: false 
        })
        .sort({ createdAt: -1 });
        
        return nameplates;
    } catch (error) {
        console.error("Error in getNameplatesByLot:", error);
        throw error;
    }
};

exports.updateNameplateStatus = async(nameplateId, status) => {
    try {
        // Validate inputs
        if (!nameplateId) {
            throw new Error("Nameplate ID is required");
        }
        if (!status) {
            throw new Error("Status is required");
        }

        // Validate status value
        const validStatuses = ["pending", "approved", "rejected"];
        if (!validStatuses.includes(status)) {
            throw new Error(`Invalid status. Must be one of: ${validStatuses.join(", ")}`);
        }

        // Find and update nameplate
        const nameplate = await Nameplate.findOneAndUpdate(
            { _id: nameplateId, isDeleted: false },
            { 
                status,
                updatedAt: Date.now() / 1000
            },
            { new: true }
        );

        if (!nameplate) {
            throw new Error("Nameplate not found");
        }

        return nameplate;
    } catch (error) {
        console.error("Error in updateNameplateStatus:", error);
        throw error;
    }
};