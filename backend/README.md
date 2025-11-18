# Adani Printworld Backend API

A comprehensive Node.js/Express backend API for managing nameplate printing workflows with role-based access control (RBAC). The system supports multiple user roles (Admin, Head, Officer) with authentication, authorization, and workflow management.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Authentication & Authorization](#authentication--authorization)
- [Testing](#testing)
- [Environment Variables](#environment-variables)

## ✨ Features

- **Role-Based Access Control (RBAC)**: Admin, Head, and Officer roles with granular permissions
- **Email Verification**: Mandatory email verification after registration
- **JWT Authentication**: Secure token-based authentication
- **Officer Approval Workflow**: Head role approves/rejects officers
- **Lot Management**: Officers can create and manage lots
- **Nameplate Management**: Create, approve, and reject nameplates
- **Dashboard Analytics**: Role-specific dashboards with statistics
- **Protected Routes**: Middleware-based route protection

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js 5.x
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Email**: nodemailer
- **Testing**: Jest, Supertest

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── db.js              # Database connection
│   │   └── environment.js     # Environment configuration
│   ├── middleware/
│   │   ├── auth.middleware.js # JWT authentication middleware
│   │   └── role.middleware.js # Role-based authorization middleware
│   ├── modules/
│   │   ├── auth/              # Authentication module
│   │   ├── admin/             # Admin operations
│   │   ├── head/              # Head operations
│   │   ├── officer/           # Officer operations
│   │   ├── nameplate/         # Nameplate management
│   │   ├── dashboard/         # Dashboard analytics
│   │   └── lot/               # Lot management
│   ├── tests/                 # Test files
│   │   ├── helpers/
│   │   │   └── testHelpers.js # Test utility functions
│   │   ├── setup.js           # Test setup/teardown
│   │   ├── auth.routes.test.js
│   │   ├── admin.routes.test.js
│   │   ├── head.routes.test.js
│   │   ├── officer.routes.test.js
│   │   ├── nameplate.routes.test.js
│   │   ├── dashboard.routes.test.js
│   │   └── server.test.js
│   ├── utils/
│   │   └── sendEmail.js       # Email utility
│   └── core/
├── server.js                  # Main server file
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or remote)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd adaniPrintworld/backend
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
NODE_ENV=development
PORT=10000
MONGO_URI=mongodb://localhost:27017/adaniPrintworld
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d
UPLOAD_DIR=src/uploads
```

4. Start the server
```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:10000` (or the PORT specified in .env)

## 📚 API Documentation

### Base URL
```
http://localhost:10000
```

### Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 🔐 Authentication Module (`/auth`)

### POST `/auth/signup/:type`
Register a new user (Admin, Head, or Officer).

**Parameters:**
- `type` (path): User type - `Admin`, `Head`, or `Officer`

**Request Body:**

**Admin Signup:**
```json
{
  "name": "Super Admin",
  "email": "admin@example.com",
  "password": "Admin@123"
}
```

**Head Signup:**
```json
{
  "name": "Head Name",
  "number": "1234567890",
  "email": "head@example.com",
  "district": "Mumbai",
  "pincode": "400001",
  "password": "Head@123"
}
```

**Officer Signup:**
```json
{
  "name": "Officer Name",
  "email": "officer@example.com",
  "number": "9876543210",
  "address": "123 Main St, City",
  "tseId": "TSE001",
  "password": "Officer@123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Admin registered successfully. Verify email.",
  "data": { ... }
}
```

---

### POST `/auth/login`
Login with email and password.

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "Admin@123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "...",
    "name": "Admin Name",
    "email": "admin@example.com",
    "role": "Admin"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### PATCH `/auth/verify-email`
Verify email address using verification token.

**Query Parameters:**
- `token` (required): Email verification token

**Example:**
```
PATCH /auth/verify-email?token=abc123def456
```

**Response:**
```json
{
  "success": true,
  "message": "Email Verified"
}
```

---

### PATCH `/auth/approve-officer/:officerId`
Approve an officer (Head role only).

**Headers:**
- `Authorization: Bearer <token>` (Head role required)

**Parameters:**
- `officerId` (path): Officer ID to approve

**Response:**
```json
{
  "success": true,
  "message": "Officer approved"
}
```

---

## 👨‍💼 Admin Module (`/admin`)

### GET `/admin/dashboard`
Get admin dashboard statistics.

**Headers:**
- `Authorization: Bearer <token>` (Admin role required)

**Response:**
```json
{
  "success": true,
  "data": {
    "totalHeads": 10,
    "totalOfficers": 50,
    "totalNameplates": 200,
    "pendingApprovals": 5
  }
}
```

---

### GET `/admin/heads`
Get all heads.

**Headers:**
- `Authorization: Bearer <token>` (Admin role required)

**Response:**
```json
{
  "success": true,
  "heads": [
    {
      "_id": "...",
      "name": "Head Name",
      "email": "head@example.com",
      "district": "Mumbai",
      ...
    }
  ]
}
```

---

## 👔 Head Module (`/head`)

### GET `/head/dashboard`
Get head dashboard statistics.

**Headers:**
- `Authorization: Bearer <token>` (Head role required)

**Response:**
```json
{
  "success": true,
  "data": {
    "totalOfficers": 15,
    "pendingOfficers": 3,
    "approvedOfficers": 12,
    "totalLots": 45
  }
}
```

---

### PATCH `/head/approve/:officerId`
Approve an officer under this head.

**Headers:**
- `Authorization: Bearer <token>` (Head role required)

**Parameters:**
- `officerId` (path): Officer ID to approve

**Response:**
```json
{
  "success": true,
  "message": "Officer approved successfully"
}
```

---

### PATCH `/head/reject/:officerId`
Reject an officer under this head.

**Headers:**
- `Authorization: Bearer <token>` (Head role required)

**Parameters:**
- `officerId` (path): Officer ID to reject

**Response:**
```json
{
  "success": true,
  "message": "Officer rejected successfully"
}
```

---

## 👮 Officer Module (`/officer`)

### GET `/officer/dashboard`
Get officer dashboard information.

**Headers:**
- `Authorization: Bearer <token>` (Officer role required)

**Response:**
```json
{
  "success": true,
  "data": {
    "officer": { ... },
    "totalLots": 10,
    "totalNameplates": 50,
    "pendingNameplates": 5
  }
}
```

---

### POST `/officer/lot`
Create a new lot.

**Headers:**
- `Authorization: Bearer <token>` (Officer role required)

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "lotNo": 1,
    "createdBy": "...",
    "createdAt": "2025-01-20T10:00:00.000Z"
  }
}
```

---

### GET `/officer/lot`
Get all lots created by the officer.

**Headers:**
- `Authorization: Bearer <token>` (Officer role required)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "lotNo": 1,
      "createdBy": "...",
      "createdAt": "2025-01-20T10:00:00.000Z"
    }
  ]
}
```

---

### POST `/officer/lot/:lotId/nameplate`
Create a nameplate in a specific lot.

**Headers:**
- `Authorization: Bearer <token>` (Officer role required)

**Parameters:**
- `lotId` (path): Lot ID

**Request Body:**
```json
{
  "theme": "classic",
  "name": "John Doe",
  "address": "123 Main Street",
  "houseName": "Sunshine Villa",
  "selectedImage": "image1.jpg",
  "nameStyle": {
    "color": "#000000",
    "fontSize": 24,
    "fontWeight": "bold",
    "fontStyle": "normal",
    "fontFamily": "Arial"
  },
  "addressStyle": {
    "color": "#333333",
    "fontSize": 18,
    "fontWeight": "normal",
    "fontStyle": "normal",
    "fontFamily": "Arial"
  },
  "houseStyle": {
    "color": "#666666",
    "fontSize": 20,
    "fontWeight": "normal",
    "fontStyle": "normal",
    "fontFamily": "Arial"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "lotId": "...",
    "approvalStatus": "Pending",
    ...
  }
}
```

---

### GET `/officer/lot/:lotId/nameplate`
Get all nameplates for a specific lot.

**Headers:**
- `Authorization: Bearer <token>` (Officer role required)

**Parameters:**
- `lotId` (path): Lot ID

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "lotId": "...",
      "name": "John Doe",
      "approvalStatus": "Pending",
      ...
    }
  ]
}
```

---

### PATCH `/officer/nameplate/:nameplateId/status`
Update nameplate status.

**Headers:**
- `Authorization: Bearer <token>` (Officer role required)

**Parameters:**
- `nameplateId` (path): Nameplate ID

**Request Body:**
```json
{
  "status": "Completed"
}
```

**Response:**
```json
{
  "success": true,
  "data": { ... }
}
```

---

## 🏷 Nameplate Module (`/api/nameplate`)

### POST `/api/nameplate`
Create a new nameplate (public endpoint).

**Request Body:** (Same as officer nameplate creation)

**Response:**
```json
{
  "_id": "...",
  "lotId": "...",
  "approvalStatus": "Pending",
  "createdAt": "2025-01-20T10:00:00.000Z",
  ...
}
```

---

### GET `/api/nameplate`
Get all nameplates.

**Response:**
```json
[
  {
    "_id": "...",
    "lotId": "...",
    "name": "John Doe",
    "approvalStatus": "Pending",
    ...
  }
]
```

---

### GET `/api/nameplate/:id`
Get a specific nameplate by ID.

**Parameters:**
- `id` (path): Nameplate ID

**Response:**
```json
{
  "_id": "...",
  "lotId": "...",
  "name": "John Doe",
  "approvalStatus": "Pending",
  ...
}
```

---

### PATCH `/api/nameplate/:id/approve`
Approve a nameplate.

**Parameters:**
- `id` (path): Nameplate ID

**Request Body:**
```json
{
  "approvedBy": "user_id_here"
}
```

**Response:**
```json
{
  "_id": "...",
  "approvalStatus": "Approved",
  "approvedBy": "...",
  "approvedAt": "2025-01-20T10:00:00.000Z",
  ...
}
```

---

### PATCH `/api/nameplate/:id/reject`
Reject a nameplate.

**Parameters:**
- `id` (path): Nameplate ID

**Response:**
```json
{
  "_id": "...",
  "approvalStatus": "Rejected",
  ...
}
```

---

## 📊 Dashboard Module (`/dashboard`)

### GET `/dashboard/admin`
Get admin dashboard (same as `/admin/dashboard`).

**Headers:**
- `Authorization: Bearer <token>` (Admin role required)

---

### GET `/dashboard/head`
Get head dashboard (same as `/head/dashboard`).

**Headers:**
- `Authorization: Bearer <token>` (Head role required)

---

### GET `/dashboard/officer`
Get officer dashboard information.

**Headers:**
- `Authorization: Bearer <token>` (Officer role required)

**Response:**
```json
{
  "success": true,
  "data": {
    "officer": { ... },
    "stats": { ... }
  }
}
```

---

## 🔒 Authentication & Authorization

### JWT Token Structure
The JWT token contains the following payload:
```json
{
  "id": "user_id",
  "email": "user@example.com",
  "role": "Admin" | "Head" | "Officer"
}
```

### Role Permissions

| Route | Admin | Head | Officer | Public |
|-------|-------|------|---------|--------|
| `/auth/*` (signup, login) | ✅ | ✅ | ✅ | ✅ |
| `/auth/approve-officer` | ❌ | ✅ | ❌ | ❌ |
| `/admin/*` | ✅ | ❌ | ❌ | ❌ |
| `/head/*` | ❌ | ✅ | ❌ | ❌ |
| `/officer/*` | ❌ | ❌ | ✅ | ❌ |
| `/api/nameplate` | ✅ | ✅ | ✅ | ✅ |
| `/dashboard/*` | ✅ | ✅ | ✅ | ❌ |

### Error Responses

**401 Unauthorized:**
```json
{
  "message": "Unauthorized: No token provided"
}
```
or
```json
{
  "message": "Invalid or expired token"
}
```

**403 Forbidden:**
```json
{
  "message": "Access denied"
}
```

**400 Bad Request:**
```json
{
  "success": false,
  "error": "Error message here"
}
```

**404 Not Found:**
```json
{
  "success": false,
  "error": "Resource not found"
}
```

---

## 🧪 Testing

The project includes comprehensive test coverage for all API routes using **Jest** and **Supertest**.

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm test -- --coverage
```

### Test Structure

Tests are organized by module:

- **`auth.routes.test.js`** - Authentication and authorization
  - User signup (Admin, Head, Officer)
  - Email verification
  - Login functionality
  - Officer approval by Head

- **`admin.routes.test.js`** - Admin operations
  - Dashboard statistics
  - Get all heads
  - Role-based access control

- **`head.routes.test.js`** - Head operations
  - Dashboard statistics
  - Approve/reject officers
  - Head-specific officer management

- **`officer.routes.test.js`** - Officer operations
  - Dashboard information
  - Lot creation and management
  - Nameplate creation and status updates

- **`nameplate.routes.test.js`** - Nameplate operations
  - CRUD operations
  - Approval/rejection workflow
  - Status management

- **`dashboard.routes.test.js`** - Dashboard endpoints
  - Role-specific dashboards
  - Statistics retrieval

- **`server.test.js`** - Server configuration
  - API health check
  - CORS configuration

### Test Helpers

The `tests/helpers/testHelpers.js` file provides utility functions:
- `generateToken()` - Create JWT tokens for testing
- `createTestAdmin()` - Create test admin users
- `createTestHead()` - Create test head users
- `createTestOfficer()` - Create test officer users
- `getAuthHeader()` - Generate Authorization headers

### Test Database

Tests use a separate test database (configured in `tests/setup.js`):
- Database is automatically cleaned after each test
- Uses isolated test environment (`NODE_ENV=test`)
- Collections are cleared between tests to ensure test isolation
- Test database name defaults to `test_db` (configurable via `MONGO_URI_TEST`)

### Test Coverage

The test suite covers:
- ✅ All API endpoints
- ✅ Authentication and authorization
- ✅ Error handling (400, 401, 403, 404)
- ✅ Role-based access control
- ✅ Input validation
- ✅ Database operations

### Writing New Tests

When adding new routes, follow the existing test patterns:

1. Use test helpers from `testHelpers.js`
2. Test both success and error cases
3. Verify proper status codes and response formats
4. Test authentication and authorization
5. Clean up test data (handled automatically by `afterEach`)

Example test structure:
```javascript
describe('New Route', () => {
    it('should handle successful request', async () => {
        const response = await request(app)
            .get('/new-route')
            .set(getAuthHeader(token));
        
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
    });

    it('should return 401 without token', async () => {
        const response = await request(app)
            .get('/new-route');
        
        expect(response.status).toBe(401);
    });
});
```

---

## ⚙️ Environment Variables

Create a `.env` file in the backend directory:

```env
# Server Configuration
NODE_ENV=development
PORT=10000

# Database
MONGO_URI=mongodb://localhost:27017/adaniPrintworld
MONGO_URI_TEST=mongodb://localhost:27017/test_db

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRES_IN=7d

# Upload Directory
UPLOAD_DIR=src/uploads

# Email Configuration (if using email service)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

---

## 📝 Default Route

### GET `/api`
Check if API is running.

**Response:**
```
API is running...
```

---

## 🔐 Security Notes

- Always use HTTPS in production
- Store JWT_SECRET securely (use environment variables)
- Use strong passwords for database access
- Implement rate limiting for login endpoints
- Consider using HTTP-only cookies for token storage
- Validate and sanitize all user inputs
- Use prepared statements to prevent SQL injection (though MongoDB is NoSQL, still validate inputs)

---

## 📄 License

MIT © 2025

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📞 Support

For issues and questions, please open an issue on the GitHub repository.
