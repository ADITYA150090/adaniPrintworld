Authentication Module Documentation

This module provides email-based authentication for three different user types:

Admin

Head

Officer

No role-based authorization is implemented — only userType identification.

The system includes:

✔ Signup
✔ Email Verification (via PATCH link)
✔ Login
✔ JWT Authentication
✔ Modular MVC + Services Structure

📁 Folder Structure
/src
 ├── config
 │     └── db.js
 ├── modules
 │     └── auth
 │          ├── auth.routes.js
 │          ├── controller
 │          │     └── auth.controller.js
 │          ├── model
 │          │     └── user.model.js
 │          └── service
 │                └── auth.service.js
 ├── utils
 │     └── sendEmail.js
 └── server.js

🚀 Base URL Example
http://localhost:5000/api/auth

🔐 Endpoints
1️⃣ User Signup

Register a new user (admin, head, officer)

Endpoint

POST /signup


Request Body

{
  "name": "Aditya",
  "email": "aditya@example.com",
  "password": "123456",
  "userType": "officer"
}


Success Response

{
  "status": true,
  "message": "Signup successful. Check email to verify account."
}

2️⃣ Email Verification

A clickable URL is sent to the user.
User must verify account before login.

Endpoint

PATCH /verify/:token


Success Response

{
  "status": true,
  "message": "Account verified successfully"
}

3️⃣ Login (common for all users)

Endpoint

POST /login


Request Body

{
  "email": "aditya@example.com",
  "password": "123456"
}


Success Response

{
  "status": true,
  "message": "Login successful",
  "token": "jwt_token_here",
  "data": {
    "_id": "user_id",
    "name": "Aditya",
    "email": "aditya@example.com",
    "userType": "officer"
  }
}

🔑 Auth Token (Frontend Usage)

Send token in header:

Authorization: Bearer <jwt_token_here>

🧪 Testing Steps (Postman / Thunder Client)
Step	Action
1	Send POST /signup with JSON body
2	Check email inbox for verification link
3	Click or PATCH verification route
4	Send POST /login
5	Store token in LocalStorage or Cookie
6	Use token for protected routes
🔁 Optional Endpoints (Not Included by Default)
Feature	Method	Route
Resend verification email	POST	/resend-verification
Forgot password	POST	/forgot-password
Reset password	PATCH	/reset/:token