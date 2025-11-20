# Officer Module Documentation

This README provides documentation for the Officer Module, including routes, controllers, services, data flow, and examples.

---

## ## 📂 Project Structure (Relevant Files)

```
backend/src/modules/officer/
 ├── officer.controller.js
 ├── officer.routes.js
 ├── officer.service.js
backend/src/modules/lot/lot.model.js
backend/src/modules/nameplate/nameplate.model.js
backend/src/modules/auth/auth.model.js
```

---

# 🚀 Officer Module Overview

The Officer module handles:

* Dashboard statistics
* Lot generation and listing
* Nameplate creation and listing
* Updating nameplate status

All routes are protected with JWT Auth and role-based authorization.

---

# 🔐 Middleware Used

* `auth` → verifies token
* `authorize("Officer")` → only Officers can access these APIs

---

# 📌 API Routes

## **1️⃣ GET /officer/dashboard**

Returns all dashboard statistics for the logged-in officer.

### Response Example:

```json
{
  "success": true,
  "data": {
    "totalLots": 5,
    "totalNameplates": 20,
    "pendingNameplates": 4,
    "approvedNameplates": 10,
    "rejectedNameplates": 6
  }
}
```

---

## **2️⃣ POST /officer/lot**

Creates a new Lot for the officer.

### Lot number format:

```
LOT001, LOT002, LOT003...
```

### Also links:

* officerId
* tseId (taken from officer.tseId)

### Response Example:

```json
{
  "success": true,
  "data": {
    "lotno": "LOT006",
    "officerId": "<mongo_id>",
    "tseId": "<mongo_id>"
  }
}
```

---

## **3️⃣ GET /officer/lot**

Fetches all lots created by the officer.

### Response Example:

```json
{
  "success": true,
  "data": [
    {
      "lotno": "LOT001",
      "createdAt": "2025-11-20"
    }
  ]
}
```

---

## **4️⃣ POST /officer/lot/:lotId/nameplate**

Creates a nameplate inside a Lot.

* If Lot doesn’t exist, it will be automatically created.
* Lot ID passed is **lotno**, not MongoDB _id.
* Nameplate stores lotId = lot._id

### Request body example:

```json
{
  "name": "John Doe",
  "plateType": "Metal",
  "color": "Gold"
}
```

### Response Example:

```json
{
  "success": true,
  "data": {
    "name": "John Doe",
    "lotId": "<MongoID>",
    "status": "pending"
  }
}
```

---

## **5️⃣ GET /officer/lot/:lotId/nameplate**

Fetches all nameplates under a given Lot (using lotno).

### Response Example:

```json
{
  "success": true,
  "data": [
    {
      "name": "John Doe",
      "status": "pending"
    }
  ]
}
```

---

## **6️⃣ PATCH /officer/nameplate/:nameplateId/status**

Updates a nameplate status.

### Request Body:

```json
{ "status": "approved" }
```

### Allowed values:

```
pending, approved, rejected
```

---

# 🧠 Controller Summary

### **• dashboard()**

Calls service → fetches total lots, nameplates & status counts.

### **• createLot()**

Generates LOT number, assigns officerId + tseId.

### **• getLots()**

Fetches all lots for the logged-in officer.

### **• createNameplate()**

Creates nameplate inside lot; auto-creates lot if missing.

### **• getNameplates()**

Fetches all nameplates by lotno.

### **• updateStatus()**

Updates nameplate status.

---

# 🛠️ Services Summary

### **getDashboardStats(userId)**

Counts:

* total lots
* total nameplates
* pending/approved/rejected nameplates

### **createLot(userId, tseId)**

* fetch officer
* generate next LOT number
* create lot with officerId + tseId

### **createNameplate(lotId, data, userId)**

* find lot by `lotno`
* auto-create if not exists
* ensure officer owns lot
* create nameplate

### **getAllLots(userId)**

Returns all officer lots.

### **getNameplatesByLot(lotId)**

* find lot by lotno
* fetch all nameplates linked by lot._id

### **updateNameplateStatus(nameplateId, status)**

Validates and updates nameplate status.

---

# 🏗️ Data Models (Simplified)

## Lot Model

```
lotno: String
officerId: ObjectId
tseId: ObjectId
isDeleted: Boolean
createdAt: Date
```

## Nameplate Model

```
lotId: ObjectId
officerId: ObjectId
headId: ObjectId
name: String
status: pending | approved | rejected
isDeleted: Boolean
createdAt: Date
```

---

# ✔️ Notes

* Lot ID used in routes = **lotno**, not MongoDB _id.
* Nameplate always stores internal `lotId` (Mongo _id).
* Officer must have a valid `tseId`.

---

# 📌 Author

Generated based on Officer Module code provided.
