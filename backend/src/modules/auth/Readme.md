# 🔐 Authentication & User Verification System
**Roles:** Admin | Head | Officer  
**Tech:** Node.js, Express.js, MongoDB, Mongoose, Bcrypt, JWT, Crypto

This backend module manages **authentication, email verification, and Officer approval flow**, including **role-based access** and **Head-specific officer visibility**.

---

## 📌 Key Features

✔ User signup by role (Admin, Head, Officer)  
✔ Email verification using token  
✔ Auto-generate **TSE ID** for verified Heads (example: `TSE001`)  
✔ Officers must use valid verified Head **TSE ID**  
✔ Officer must be approved by assigned Head (or Admin)  
✔ Password hashing using `bcrypt`  
✔ JWT based authentication & authorization  
✔ Head can view only **their own Officers**  
✔ Admin can view **all officers**

---

## 🧱 Roles & Rules

| Role     | Verification | Special Restriction |
|----------|-------------|---------------------|
| Admin    | Email       | No dependency |
| Head     | Email       | Gets auto TSE ID, must be unique |
| Officer  | Email + Head Approval | Must signup using valid verified Head TSE ID |

---

## 🧩 API Routes

| Method | Endpoint | Protected | Description |
|--------|----------|-----------|-------------|
| POST | `/api/auth/signup/:type` | ❌ | Register Admin / Head / Officer |
| PATCH | `/api/auth/verify-email?token=` | ❌ | Verify user email |
| POST | `/api/auth/login` | ❌ | Login and receive JWT token |
| PATCH | `/api/auth/approve-officer/:officerId` | ✔ (Head/Admin) | Approve Officer |
| GET | `/api/auth/officers/` | ✔ (Head/Admin) | Head → Only their officers<br>Admin → All officers |

---

## 🗂 Sample Requests

### 1️⃣ **Head Registration**
POST /api/auth/signup/head
{
"name": "John Doe",
"number": "9999999999",
"email": "head@gmail.com",
"district": "Nagpur",
"pincode": "440001",
"password": "123456"
}

markdown
Copy code

### 2️⃣ **Verify Email**
PATCH /api/auth/verify-email?token=PASTE_TOKEN_HERE

yaml
Copy code

After verification → Head gets unique **TSE ID**, example: `TSE001`

---

### 3️⃣ **Officer Registration**
POST /api/auth/signup/officer
{
"name": "Officer A",
"email": "officer@gmail.com",
"number": "8888888888",
"address": "Nagpur",
"tseId": "TSE001",
"password": "123456"
}

yaml
Copy code

📌 Signup is only valid if:

✔ TSE exists  
✔ Belongs to a **verified** Head  

---

### 4️⃣ **Officer Email Verification**
PATCH /api/auth/verify-email?token=OFFICER_TOKEN

yaml
Copy code

Officer becomes **email verified**, but still not approved for login.

---

### 5️⃣ **Approve Officer** (Head/Admin only)
PATCH /api/auth/approve-officer/:officerId

makefile
Copy code

Example:
/api/auth/approve-officer/679bfe4cbc76f2fb196b32c1

yaml
Copy code

After success:  
approvedByHead = true
isVerified = true

yaml
Copy code

---

### 6️⃣ **Login**
POST /api/auth/login
{
"email": "officer@gmail.com",
"password": "123456"
}

makefile
Copy code

Response:
{
"success": true,
"token": "xxxx.yyyy.zzzz",
"user": { ... }
}

yaml
Copy code

---

## 👁 Role-Based Officer Listing

GET /api/auth/officers

yaml
Copy code

| Role | Result |
|------|---------|
| Head | Only officers assigned to their TSE ID |
| Admin | All officers |

---

## 📁 Folder Structure

/src
├── modules
│ └── auth
│ ├── auth.controller.js
│ ├── auth.service.js
│ ├── auth.model.js
│ └── auth.routes.js
└── middleware
└── auth.middleware.js

yaml
Copy code

---

## 🔐 Security Notes

✔ Use environment variables  
✔ Hash passwords using `bcrypt`  
✔ Never store tokens in DB without expiry  
✔ Protect sensitive routes using `auth(role)`  
✔ Officer cannot login unless BOTH `emailVerified === true` AND `approvedByHead === true`  

---

## 📞 Support or Contribution
Open to collaboration — feel free to contact or create feature request.

---

Would you like me to **add Swagger API docs** or **Postman Collection JSON 