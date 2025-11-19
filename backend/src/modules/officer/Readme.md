{
  "project": "Adani Printworld - Officer → Lot → Nameplate Workflow",
  "version": "1.0.0",

  "description": "This backend module manages Officer Login, Lot Creation, Nameplate Creation, and Status Approval/Rejection flows.",

  "auth": {
    "middleware": {
      "auth": "Validates JWT token",
      "authorize": "Allows route access only for specific roles: Officer, Head, Admin"
    }
  },

  "models": {
    "Lot": {
      "lotno": "String (auto-increment per officer)",
      "officerId": "ObjectId → Officer",
      "headId": "ObjectId → Head (auto-filled from Officer)",
      "isDeleted": "Boolean",
      "timestamp": "createdAt, updatedAt"
    },
    "Nameplate": {
      "lotId": "ObjectId → Lot",
      "officerId": "ObjectId → Officer",
      "headId": "ObjectId → Head",
      "fields": "Nameplate data sent in request body",
      "status": "pending | approved | rejected"
    }
  },

  "routes": {
    "GET /officer/dashboard": {
      "role": "Officer",
      "description": "Returns statistics for officer dashboard",
      "returns": {
        "totalLots": "Number",
        "pendingNameplates": "Number",
        "approvedNameplates": "Number"
      }
    },

    "POST /officer/lot": {
      "role": "Officer",
      "description": "Creates a new lot for the logged-in officer",
      "request_body": "None",
      "response": {
        "lot": {
          "_id": "ObjectId",
          "lotno": "Auto-increment value as string",
          "officerId": "ObjectId",
          "headId": "ObjectId"
        }
      }
    },

    "GET /officer/lot": {
      "role": "Officer",
      "description": "Get all lots belonging to the officer",
      "response": "Array of lots"
    },

    "POST /officer/lot/:lotId/nameplate": {
      "role": "Officer",
      "description": "Creates a nameplate under a specific lot",
      "params": {
        "lotId": "string (this is lotno, not ObjectId)"
      },
      "request_body": {
        "example": {
          "name": "String",
          "designation": "String",
          "building": "String",
          "dept": "String"
        }
      },
      "response": {
        "nameplate": {
          "_id": "ObjectId",
          "lotId": "ObjectId",
          "officerId": "ObjectId",
          "headId": "ObjectId",
          "...data": "All nameplate fields"
        }
      }
    },

    "GET /officer/lot/:lotId/nameplate": {
      "role": "Officer",
      "description": "Get all nameplates for a lot",
      "params": {
        "lotId": "string (lotno)"
      },
      "response": "Array of nameplates"
    },

    "PATCH /officer/nameplate/:nameplateId/status": {
      "role": "Officer",
      "description": "Officer updates nameplate status (mainly used by Head in future)",
      "params": {
        "nameplateId": "ObjectId"
      },
      "request_body": {
        "status": "approved | rejected | pending"
      },
      "response": {
        "_id": "ObjectId",
        "status": "Updated status"
      }
    }
  },

  "logic_corrections": {
    "1": "createNameplate should use Lot._id and not create lot automatically unless intentionally allowed.",
    "2": "createLot was incorrectly defined twice, corrected the second one.",
    "3": "createLot should NOT use lotno as numeric increment of lotno; better suffix like LOT-001.",
    "4": "lotId in nameplate APIs is lotno, not _id — make this consistent.",
    "5": "Officer's headId must always be auto-filled in lot and nameplate."
  },

  "workflow": {
    "1": "Officer signs up → headId assigned by admin/head",
    "2": "Officer logs in → gets JWT token",
    "3": "Officer creates lot → generates lot number",
    "4": "Officer creates multiple nameplates inside the lot",
    "5": "Head views lots and approves/rejects",
    "6": "Approved nameplates go to print"
  }
}
