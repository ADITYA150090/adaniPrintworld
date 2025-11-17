🔐 RBAC Authentication + Email Verification + Dashboard API (Admin, Head, Officer)

A complete role-based authentication workflow built using Node.js, Express, MongoDB, JWT & Middleware-based Access Control.
Supports Admin, Head & Officer role flows with email verification, officer approval, and protected dashboards.

📌 Features
Feature	Description
🔑 Signup	Register Admin, Head or Officer
📧 Email Verification	Mandatory before login
🪪 Role Based JWT	Admin / Head / Officer
🎯 Officer Approval	Head must approve newly registered officers
🔒 Protected Routes	Middleware restricts dashboards
📊 Role Dashboards	Custom data based on role
🔍 Reports	Only Admin + Head
🏗 Project Structure
/project
│
├── controllers/
│   └── auth.controller.js
│
├── services/
│   └── auth.service.js
│
├── models/
│   └── auth.model.js
│
├── middleware/
│   └── auth.middleware.js
│
├── routes/
│   └── auth.routes.js
│
├── .env
└── server.js

🔄 System Flow (Mermaid Diagram)
flowchart TB
A[User Signup] --> B[Email Sent with Token]
B --> C[Click Verify Link]
C --> D[Email Verified]
D --> E[Login]
E --> F[JWT Issued]
F --> G{Role?}
G -->|Admin| H[Admin Dashboard]
G -->|Head| I[Head Dashboard]
G -->|Officer| J[Officer Dashboard]
I --> K[Approve Officers]

🧪 API Testing Guide (Postman Workflow)
Step	Method	Endpoint	Body
1	POST	/auth/signup/admin	JSON
2	POST	/auth/signup/head	JSON
3	POST	/auth/signup/officer	JSON
4	PATCH	/auth/verify-email?token=xyz	none
5	POST	/auth/login	JSON
6	PATCH	/auth/approve-officer/:id	Header Bearer Token
7	GET	/auth/{role}/dashboard	Header Bearer Token
📥 Sample JSON Request Bodies
1️⃣ Admin Signup
POST /auth/signup/admin
{
  "name": "Super Admin",
  "email": "admin@mail.com",
  "password": "Admin@123"
}

2️⃣ Head Signup
POST /auth/signup/head
{
  "name": "Head One",
  "number": "9999999999",
  "email": "head@mail.com",
  "district": "Pune",
  "pincode": "411001",
  "password": "Head@123"
}

3️⃣ Officer Signup
POST /auth/signup/officer
{
  "name": "Officer A",
  "email": "officer@mail.com",
  "number": "8888888888",
  "address": "Nagpur, India",
  "tseId": "TSE001",
  "password": "Officer@123"
}

🎟 After Signup → Verify Email
PATCH /auth/verify-email?token=123456abcdef


You will receive token via email (or DB for testing).

🔐 Login
POST /auth/login
{
  "email": "admin@mail.com",
  "password": "Admin@123"
}


Response

{
  "success": true,
  "token": "JWT_TOKEN_HERE",
  "user": { "name": "Super Admin", "type": "Admin" }
}


Copy token and use in protected routes:

Authorization: Bearer JWT_TOKEN_HERE

🧩 Protected Dashboard APIs
Role	Endpoint	Allowed
Admin	/auth/admin/dashboard	✅
Head	/auth/head/dashboard	❌ Admin, Officer
Officer	/auth/officer/dashboard	❌ Admin, Head
📊 Reports API
Endpoint	Accessible By
/auth/reports	Admin + Head
🛡 Frontend Workflow
Login → Store token (localStorage/sessionStorage)
→ Decode role → Redirect:

Admin → /dashboard/admin
Head  → /dashboard/head
Officer → /dashboard/officer

// Example check in frontend (React)
const token = localStorage.getItem("token");
const decoded = JSON.parse(atob(token.split(".")[1]));

if (decoded.type === "Admin") navigate("/admin");
if (decoded.type === "Head") navigate("/head");
if (decoded.type === "Officer") navigate("/officer");

🚧 Security Notes

✔ Always store JWT in HTTP-only cookie
✔ Use HTTPS on production
✔ Add refresh token for long sessions
✔ Add rate-limiting to login

❤️ Contribution

Feel free to fork this repo and raise PRs.

git clone https://github.com/YOUR_REPO.git

📄 License

MIT © 2025