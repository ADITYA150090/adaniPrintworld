Authentication & User Verification System (Admin, Head, Officer)

This backend module handles user registration, email verification, login, and officer approval workflow for three user types:

Admin

Head

Officer

Built using Node.js, Express.js, MongoDB (Mongoose), bcrypt, JWT & Crypto.

📌 Features

✔ Register different user roles
✔ Email verification using token
✔ Auto-generate TSE ID for verified Heads
✔ Officer must match verified Head’s TSE ID
✔ Officer needs approval from Head
✔ Secure password hashing and JWT-based authentication

🚀 Available Routes
Method	Endpoint	Description
POST	/api/auth/signup/:type	Register Admin / Head / Officer
PATCH	/api/auth/verify-email?token=	Verify email using token
POST	/api/auth/login	Login and receive JWT
PATCH	/api/auth/approve-officer/:officerId	Approve Officer (Only Head/Admin use)
🧱 User Types
Type	Verified By	Special Rules
Admin	Email Only	No special link
Head	Email → Auto TSE ID assigned	TSE ID unique
Officer	Email + Head Approval	Must use valid verified Head TSE ID
🗂 Sample Signup Request Bodies (Postman)
1️⃣ Head Signup

POST → /api/auth/signup/head

{
  "name": "John Doe",
  "number": "9999999999",
  "email": "head@gmail.com",
  "district": "Nagpur",
  "pincode": "440001",
  "password": "123456"
}

2️⃣ Verify Email (Head)

PATCH
/api/auth/verify-email?token=PASTE_TOKEN_FROM_DATABASE

📌 After verification, Head receives a unique tseId like TSE001

3️⃣ Officer Signup

POST → /api/auth/signup/officer

{
  "name": "Officer A",
  "email": "officer@gmail.com",
  "number": "8888888888",
  "address": "Nagpur",
  "tseId": "TSE001",
  "password": "123456"
}


🛈 Valid only if:

TSE ID exists

Belongs to a verified Head

4️⃣ Verify Email (Officer)
PATCH /api/auth/verify-email?token=OFFICER_TOKEN


Officer is now email verified but still needs Head approval.

5️⃣ Approve Officer

PATCH → /api/auth/approve-officer/:officerId

Example:

/api/auth/approve-officer/679bfe4cbc76f2fb196b32c1


After successful approval:

approvedByHead = true
isVerified = true

🔐 Login

POST → /api/auth/login

{
  "email": "officer@gmail.com",
  "password": "123456"
}


Returns JWT Token:

{
  "success": true,
  "token": "xxxx.yyyy.zzzz",
  "user": { ... }
}

📎 Folder Structure
/auth
 ├── auth.controller.js
 ├── auth.service.js
 ├── auth.model.js
 └── auth.routes.js

🛡 Security Notes

Always store passwords hashed (bcrypt)

Tokens are time-limited

Officer cannot log in without approval

JWT required for protected routes