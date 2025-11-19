# Frontend API Documentation

This folder contains all API integration files for connecting to the backend services.

## 📁 File Structure

```
src/api/
├── axiosInstance.js    # Configured axios instance with interceptors
├── auth.js            # Authentication endpoints
├── admin.js           # Admin-specific endpoints
├── head.js            # Head-specific endpoints
├── officer.js         # Officer-specific endpoints
├── nameplate.js       # Nameplate management endpoints
├── dashboard.js       # Dashboard statistics endpoints
├── index.js           # Central export file
└── README.md          # This file
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the frontend root directory:

```env
VITE_API_URL=http://localhost:10000
```

### Axios Instance

The `axiosInstance.js` file provides:
- Automatic JWT token attachment from localStorage
- Global error handling (401 redirects to login)
- Base URL configuration from environment variables

## 📚 Available APIs

### Authentication (`auth.js`)

```javascript
import { login, signup, signupAdmin, signupHead, signupOfficer, verifyEmail, approveOfficerByHead, logout } from '@/api';

// Generic signup
signup('Admin', { name, email, password });
signup('Head', { name, email, number, district, pincode, password });
signup('Officer', { name, email, number, address, tseId, password });

// Specific signups
signupAdmin({ name, email, password });
signupHead({ name, email, number, district, pincode, password });
signupOfficer({ name, email, number, address, tseId, password });

// Login
login({ email, password });

// Verify email
verifyEmail(token);

// Approve officer (Head only)
approveOfficerByHead(officerId);

// Logout
logout();
```

### Admin APIs (`admin.js`)

```javascript
import { getAdminDashboard, getAllHeads, getDashboardAdmin } from '@/api';

// Get admin dashboard statistics
getAdminDashboard();

// Get all heads
getAllHeads();

// Alternative dashboard endpoint
getDashboardAdmin();
```

### Head APIs (`head.js`)

```javascript
import { getHeadDashboard, getDashboardHead, approveOfficer, rejectOfficer } from '@/api';

// Get head dashboard
getHeadDashboard();

// Alternative dashboard endpoint
getDashboardHead();

// Approve officer
approveOfficer(officerId);

// Reject officer
rejectOfficer(officerId);
```

### Officer APIs (`officer.js`)

```javascript
import { 
    getOfficerDashboard, 
    getDashboardOfficer,
    createLot, 
    getLots, 
    createNameplate, 
    getNameplates, 
    updateNameplateStatus 
} from '@/api';

// Get officer dashboard
getOfficerDashboard();

// Alternative dashboard endpoint
getDashboardOfficer();

// Lot management
createLot(data);
getLots();

// Nameplate management within lots
createNameplate(lotId, {
    theme: "classic",
    name: "John Doe",
    address: "123 Main Street",
    houseName: "Sunshine Villa",
    selectedImage: "image1.jpg",
    nameStyle: { color, fontSize, fontWeight, fontStyle, fontFamily },
    addressStyle: { color, fontSize, fontWeight, fontStyle, fontFamily },
    houseStyle: { color, fontSize, fontWeight, fontStyle, fontFamily }
});

getNameplates(lotId);

// Update nameplate status
updateNameplateStatus(nameplateId, { status: "Completed" });
```

### Nameplate APIs (`nameplate.js`)

```javascript
import { 
    createNameplate,
    createNameplateFromAdmin,
    getAllNameplates, 
    getNameplateById, 
    approveNameplate, 
    rejectNameplate 
} from '@/api';

// Create nameplate (public)
createNameplate(data);

// Create nameplate from admin
createNameplateFromAdmin(data);

// Get all nameplates
getAllNameplates();

// Get specific nameplate
getNameplateById(id);

// Approve nameplate
approveNameplate(id, { approvedBy: userId });

// Reject nameplate
rejectNameplate(id);
```

### Dashboard APIs (`dashboard.js`)

```javascript
import { getAdminDashboard, getHeadDashboard, getOfficerDashboard } from '@/api';

// Get role-specific dashboards
getAdminDashboard();
getHeadDashboard();
getOfficerDashboard();
```

## 🎯 Usage Examples

### Example 1: Login Flow

```javascript
import { login } from '@/api';

const handleLogin = async (email, password) => {
    try {
        const response = await login({ email, password });
        
        // Store token and user data
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Redirect based on role
        const role = response.data.user.role;
        if (role === 'Admin') navigate('/admin/dashboard');
        else if (role === 'Head') navigate('/head/dashboard');
        else if (role === 'Officer') navigate('/officer/dashboard');
    } catch (error) {
        console.error('Login failed:', error.response?.data?.error);
    }
};
```

### Example 2: Fetch Dashboard Data

```javascript
import { getOfficerDashboard } from '@/api';
import { useEffect, useState } from 'react';

const OfficerDashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);
    
    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const response = await getOfficerDashboard();
                setDashboardData(response.data.data);
            } catch (error) {
                console.error('Failed to fetch dashboard:', error);
            }
        };
        
        fetchDashboard();
    }, []);
    
    return (
        <div>
            {dashboardData && (
                <>
                    <h1>Total Lots: {dashboardData.totalLots}</h1>
                    <h2>Total Nameplates: {dashboardData.totalNameplates}</h2>
                </>
            )}
        </div>
    );
};
```

### Example 3: Create Lot and Nameplate

```javascript
import { createLot, createNameplate } from '@/api';

const handleCreateLotWithNameplate = async () => {
    try {
        // Create lot first
        const lotResponse = await createLot({});
        const lotId = lotResponse.data.data._id;
        
        // Create nameplate in the lot
        const nameplateData = {
            theme: "classic",
            name: "John Doe",
            address: "123 Main St",
            houseName: "Villa",
            selectedImage: "image1.jpg",
            nameStyle: {
                color: "#000000",
                fontSize: 24,
                fontWeight: "bold",
                fontStyle: "normal",
                fontFamily: "Arial"
            },
            addressStyle: {
                color: "#333333",
                fontSize: 18,
                fontWeight: "normal",
                fontStyle: "normal",
                fontFamily: "Arial"
            },
            houseStyle: {
                color: "#666666",
                fontSize: 20,
                fontWeight: "normal",
                fontStyle: "normal",
                fontFamily: "Arial"
            }
        };
        
        const nameplateResponse = await createNameplate(lotId, nameplateData);
        console.log('Nameplate created:', nameplateResponse.data);
    } catch (error) {
        console.error('Error:', error.response?.data?.error);
    }
};
```

### Example 4: Approve/Reject Officers (Head)

```javascript
import { approveOfficer, rejectOfficer } from '@/api';

const handleApproveOfficer = async (officerId) => {
    try {
        await approveOfficer(officerId);
        alert('Officer approved successfully');
        // Refresh officer list
    } catch (error) {
        console.error('Failed to approve officer:', error);
    }
};

const handleRejectOfficer = async (officerId) => {
    try {
        await rejectOfficer(officerId);
        alert('Officer rejected');
        // Refresh officer list
    } catch (error) {
        console.error('Failed to reject officer:', error);
    }
};
```

## 🔐 Authentication

All protected endpoints automatically include the JWT token from localStorage. The token is attached via the axios interceptor in `axiosInstance.js`.

### Token Storage

```javascript
// After successful login
localStorage.setItem('token', token);

// Token is automatically attached to all requests
// Authorization: Bearer <token>
```

### Automatic Logout on 401

If any API returns a 401 status, the user is automatically redirected to `/login` and the token is cleared.

## 🚨 Error Handling

All API calls should be wrapped in try-catch blocks:

```javascript
try {
    const response = await someApiCall();
    // Handle success
} catch (error) {
    if (error.response) {
        // Server responded with error
        console.error('Error:', error.response.data.error);
        console.error('Status:', error.response.status);
    } else if (error.request) {
        // Request made but no response
        console.error('No response from server');
    } else {
        // Something else happened
        console.error('Error:', error.message);
    }
}
```

## 📝 Response Format

### Success Response

```javascript
{
    success: true,
    message: "Operation successful",
    data: { ... },
    token: "..." // (for login)
}
```

### Error Response

```javascript
{
    success: false,
    error: "Error message here"
}
```

## 🔄 Migration from Old API Files

If you have existing code using the old `api.js` file, update imports:

```javascript
// Old
import api from '@/api/api';
const response = await api.get('/endpoint');

// New
import { specificApiFunction } from '@/api';
const response = await specificApiFunction();
```

## 📞 Support

For issues or questions about the API integration, refer to:
- Backend API Documentation: `backend/README.md`
- Backend Server: `http://localhost:10000`

## 🔗 Related Files

- Backend API Routes: `backend/src/modules/*/`
- Frontend Components: `frontend/src/components/`
- Frontend Pages: `frontend/src/pages/`
