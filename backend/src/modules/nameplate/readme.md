Create Nameplate (POST /api/nameplate)

Request Body Example:

{
  "lotId": "656d8e5f1c4a3b0012abcd34",
  "officerId": "656d8e5f1c4a3b0012abcd01",
  "headId": "656d8e5f1c4a3b0012abcd10",
  "name": "John Doe",
  "address": "123 Main Street, City",
  "houseName": "Sunset Villa",
  "theme": "Ambuja",
  "selectedImage": "/ambuja/d1.webp",
  "nameStyle": {
    "color": "rgb(255, 215, 0)",
    "fontSize": 32,
    "fontWeight": "bold",
    "fontStyle": "normal",
    "fontFamily": "Inter"
  },
  "addressStyle": {
    "color": "rgb(255, 255, 255)",
    "fontSize": 18,
    "fontWeight": "normal",
    "fontStyle": "italic",
    "fontFamily": "Roboto"
  },
  "houseStyle": {
    "color": "rgb(204, 0, 26)",
    "fontSize": 20,
    "fontWeight": "600",
    "fontStyle": "normal",
    "fontFamily": "Lato"
  },
  "status": "unverified"
}


Response Example (201 Created):

{
  "_id": "656d8f6a1c4a3b0012abcd55",
  "lotId": "656d8e5f1c4a3b0012abcd34",
  "officerId": "656d8e5f1c4a3b0012abcd01",
  "headId": "656d8e5f1c4a3b0012abcd10",
  "name": "John Doe",
  "address": "123 Main Street, City",
  "houseName": "Sunset Villa",
  "theme": "Ambuja",
  "selectedImage": "/ambuja/d1.webp",
  "nameStyle": {
    "color": "rgb(255, 215, 0)",
    "fontSize": 32,
    "fontWeight": "bold",
    "fontStyle": "normal",
    "fontFamily": "Inter"
  },
  "addressStyle": {
    "color": "rgb(255, 255, 255)",
    "fontSize": 18,
    "fontWeight": "normal",
    "fontStyle": "italic",
    "fontFamily": "Roboto"
  },
  "houseStyle": {
    "color": "rgb(204, 0, 26)",
    "fontSize": 20,
    "fontWeight": "600",
    "fontStyle": "normal",
    "fontFamily": "Lato"
  },
  "status": "unverified",
  "isDeleted": false,
  "createdAt": 1700377600,
  "updatedAt": 1700377600
}

2️⃣ Get All Nameplates (GET /api/nameplate)

Response Example:

[
  {
    "_id": "656d8f6a1c4a3b0012abcd55",
    "lotId": "656d8e5f1c4a3b0012abcd34",
    "officerId": "656d8e5f1c4a3b0012abcd01",
    "headId": "656d8e5f1c4a3b0012abcd10",
    "name": "John Doe",
    "address": "123 Main Street, City",
    "houseName": "Sunset Villa",
    "theme": "Ambuja",
    "selectedImage": "/ambuja/d1.webp",
    "nameStyle": { "color": "rgb(255, 215, 0)", "fontSize": 32, "fontWeight": "bold", "fontStyle": "normal", "fontFamily": "Inter" },
    "addressStyle": { "color": "rgb(255, 255, 255)", "fontSize": 18, "fontWeight": "normal", "fontStyle": "italic", "fontFamily": "Roboto" },
    "houseStyle": { "color": "rgb(204, 0, 26)", "fontSize": 20, "fontWeight": "600", "fontStyle": "normal", "fontFamily": "Lato" },
    "status": "unverified",
    "approvalStatus": "Pending",
    "isDeleted": false,
    "createdAt": 1700377600,
    "updatedAt": 1700377600
  },
  {
    "_id": "656d8f6a1c4a3b0012abcd56",
    "lotId": "656d8e5f1c4a3b0012abcd35",
    "officerId": "656d8e5f1c4a3b0012abcd02",
    "headId": "656d8e5f1c4a3b0012abcd11",
    "name": "Jane Smith",
    "address": "456 Elm Street, City",
    "houseName": "Green Cottage",
    "theme": "ACC",
    "selectedImage": "/acc/d2.webp",
    "nameStyle": { "color": "rgb(255, 0, 0)", "fontSize": 30, "fontWeight": "bold", "fontStyle": "italic", "fontFamily": "Montserrat" },
    "addressStyle": { "color": "rgb(0, 0, 0)", "fontSize": 16, "fontWeight": "normal", "fontStyle": "normal", "fontFamily": "Open Sans" },
    "houseStyle": { "color": "rgb(255, 255, 255)", "fontSize": 18, "fontWeight": "600", "fontStyle": "normal", "fontFamily": "Lato" },
    "status": "unverified",
    "approvalStatus": "Pending",
    "isDeleted": false,
    "createdAt": 1700377600,
    "updatedAt": 1700377600
  }
]

3️⃣ Get Nameplate by ID (GET /api/nameplate/:id)

Response Example:

{
  "_id": "656d8f6a1c4a3b0012abcd55",
  "lotId": "656d8e5f1c4a3b0012abcd34",
  "officerId": "656d8e5f1c4a3b0012abcd01",
  "headId": "656d8e5f1c4a3b0012abcd10",
  "name": "John Doe",
  "address": "123 Main Street, City",
  "houseName": "Sunset Villa",
  "theme": "Ambuja",
  "selectedImage": "/ambuja/d1.webp",
  "nameStyle": { "color": "rgb(255, 215, 0)", "fontSize": 32, "fontWeight": "bold", "fontStyle": "normal", "fontFamily": "Inter" },
  "addressStyle": { "color": "rgb(255, 255, 255)", "fontSize": 18, "fontWeight": "normal", "fontStyle": "italic", "fontFamily": "Roboto" },
  "houseStyle": { "color": "rgb(204, 0, 26)", "fontSize": 20, "fontWeight": "600", "fontStyle": "normal", "fontFamily": "Lato" },
  "status": "unverified",
  "approvalStatus": "Pending",
  "isDeleted": false,
  "createdAt": 1700377600,
  "updatedAt": 1700377600
}

4️⃣ Approve Nameplate (PATCH /api/nameplate/:id/approve)

Request Body Example:

{
  "approvedBy": "656d8e5f1c4a3b0012abcd01"
}


Response Example:

{
  "_id": "656d8f6a1c4a3b0012abcd55",
  "lotId": "656d8e5f1c4a3b0012abcd34",
  "officerId": "656d8e5f1c4a3b0012abcd01",
  "headId": "656d8e5f1c4a3b0012abcd10",
  "name": "John Doe",
  "address": "123 Main Street, City",
  "houseName": "Sunset Villa",
  "theme": "Ambuja",
  "selectedImage": "/ambuja/d1.webp",
  "nameStyle": { "color": "rgb(255, 215, 0)", "fontSize": 32, "fontWeight": "bold", "fontStyle": "normal", "fontFamily": "Inter" },
  "addressStyle": { "color": "rgb(255, 255, 255)", "fontSize": 18, "fontWeight": "normal", "fontStyle": "italic", "fontFamily": "Roboto" },
  "houseStyle": { "color": "rgb(204, 0, 26)", "fontSize": 20, "fontWeight": "600", "fontStyle": "normal", "fontFamily": "Lato" },
  "status": "verified",
  "approvalStatus": "Approved",
  "approvedBy": "656d8e5f1c4a3b0012abcd01",
  "approvedAt": 1700377600,
  "isDeleted": false
}

5️⃣ Reject Nameplate (PATCH /api/nameplate/:id/reject)

Request Body: (empty)

Response Example:

{
  "_id": "656d8f6a1c4a3b0012abcd55",
  "lotId": "656d8e5f1c4a3b0012abcd34",
  "officerId": "656d8e5f1c4a3b0012abcd01",
  "headId": "656d8e5f1c4a3b0012abcd10",
  "name": "John Doe",
  "address": "123 Main Street, City",
  "houseName": "Sunset Villa",
  "theme": "Ambuja",
  "selectedImage": "/ambuja/d1.webp",
  "nameStyle": { "color": "rgb(255, 215, 0)", "fontSize": 32, "fontWeight": "bold", "fontStyle": "normal", "fontFamily": "Inter" },
  "addressStyle": { "color": "rgb(255, 255, 255)", "fontSize": 18, "fontWeight": "normal", "fontStyle": "italic", "fontFamily": "Roboto" },
  "houseStyle": { "color": "rgb(204, 0, 26)", "fontSize": 20, "fontWeight": "600", "fontStyle": "normal", "fontFamily": "Lato" },
  "status": "unverified",
  "approvalStatus": "Rejected",
  "isDeleted": false
}