# Authentication Integration Guide

## Overview

This project implements a production-ready authentication architecture that separates concerns between UI components and API integration. The design allows seamless migration from mock/development API to production API with minimal code changes.

## Architecture

```
src/
├── services/
│   └── authService.js       # Authentication API calls (MODIFY FOR PRODUCTION)
├── context/
│   └── AuthContext.jsx      # Global auth state management
├── routes/
│   └── ProtectedRoute.jsx   # Route protection component
├── pages/
│   ├── Login.jsx            # Login page
│   └── Dashboard.jsx        # Protected dashboard
├── components/
│   └── LoginForm.jsx        # Login form with validation
└── utils/
    └── api.js               # API configuration (MODIFY FOR PRODUCTION)
```

## Current Implementation (Mock/Development)

### Mock Credentials
- **Email:** `demo@portfolio.com`
- **Password:** `Portfolio@123`

### Mock API Response
```javascript
{
  success: true,
  token: "mock-jwt-token-{timestamp}",
  user: {
    id: 1,
    name: "Demo User",
    email: "demo@portfolio.com"
  }
}
```

## Production Integration (3-Step Process)

When the client provides the real API, follow these steps:

### Step 1: Update Environment Variables

Edit `.env`:
```env
VITE_API_BASE_URL=https://client-production-api.com
VITE_API_KEY=actual_client_api_key_here
```

### Step 2: Update authService.js

Open `src/services/authService.js` and:

1. **Comment out the mock implementation** (lines 69-97)
2. **Uncomment the production implementation** (lines 99-121)

The production code is already written:
```javascript
const response = await axios.post(
  buildApiUrl('/auth/login'),
  { email, password },
  { 
    headers: getDefaultHeaders(),
    timeout: 10000,
  }
);

if (response.data && response.data.success) {
  return {
    success: true,
    token: response.data.token,
    user: response.data.user,
    error: null,
  };
}
```

3. **Adjust endpoint path if needed**
   - If client API uses `/api/auth/login` instead of `/auth/login`, change:
   ```javascript
   buildApiUrl('/api/auth/login')
   ```

4. **Adjust response structure if needed**
   - If client API returns different field names, map them:
   ```javascript
   return {
     success: true,
     token: response.data.accessToken,  // If client uses 'accessToken'
     user: {
       id: response.data.userId,        // Map client fields
       name: response.data.userName,
       email: response.data.userEmail,
     },
     error: null,
   };
   ```

### Step 3: Update api.js (if needed)

Only modify `src/utils/api.js` if the client requires:
- Different header format
- Additional headers
- Different authentication header name

Example modifications:
```javascript
export const getDefaultHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${API_KEY}`,  // If client uses Bearer token
  // Add any other required headers
});
```

## NO UI CODE CHANGES NEEDED

The following components **DO NOT** need modification:
- ✅ `LoginForm.jsx` - Already integrated
- ✅ `Login.jsx` - Already set up
- ✅ `Dashboard.jsx` - Already protected
- ✅ `AuthContext.jsx` - Already managing state
- ✅ `ProtectedRoute.jsx` - Already protecting routes
- ✅ `App.jsx` - Already configured routing

## Features Implemented

### 1. Authentication Flow
- ✅ Email/password validation
- ✅ Loading states during authentication
- ✅ Error handling with user-friendly messages
- ✅ Token storage in localStorage
- ✅ User data persistence
- ✅ Automatic redirect on success

### 2. Protected Routes
- ✅ Dashboard accessible only when authenticated
- ✅ Automatic redirect to login if not authenticated
- ✅ Preserves attempted URL for post-login redirect
- ✅ Loading state while checking authentication

### 3. Global State Management
- ✅ React Context API for auth state
- ✅ `useAuth()` hook available in any component
- ✅ Automatic re-render on auth state changes
- ✅ State persists across page refreshes

### 4. Error Handling
- ✅ Invalid email format
- ✅ Empty password
- ✅ Incorrect credentials (401)
- ✅ Server errors (500/503)
- ✅ Network errors/timeout
- ✅ Error messages clear on user input

### 5. Security Features
- ✅ Password visibility toggle
- ✅ Input field validation
- ✅ Form disabled during submission
- ✅ Token stored securely in localStorage
- ✅ Input length restrictions (email: 254, password: 128)

## Testing

### Test Mock Login
1. Navigate to http://localhost:5174/login
2. Enter credentials:
   - Email: `demo@portfolio.com`
   - Password: `Portfolio@123`
3. Click "Sign In"
4. Should redirect to `/dashboard`

### Test Protected Route
1. Navigate directly to http://localhost:5174/dashboard
2. If not logged in, should redirect to `/login`
3. After login, should show dashboard

### Test Logout
1. On dashboard, click "Logout" button
2. Should clear auth state
3. Should redirect to `/login`
4. Attempting to access `/dashboard` should redirect back to `/login`

### Test Error Handling
1. Try empty email → "Email is required"
2. Try invalid email (no @) → "Invalid email format"
3. Try empty password → "Password is required"
4. Try wrong credentials → "Invalid email or password"

## API Requirements Documentation

When communicating with the client about API requirements, share this:

### Expected Endpoint
```
POST /auth/login
```

### Request Format
```json
{
  "email": "string",
  "password": "string"
}
```

### Request Headers
```
Content-Type: application/json
x-api-key: {API_KEY}
```

### Success Response (200)
```json
{
  "success": true,
  "token": "jwt_token_string",
  "user": {
    "id": "number|string",
    "name": "string",
    "email": "string"
  }
}
```

### Error Response (401)
```json
{
  "success": false,
  "error": "Invalid email or password"
}
```

### Error Response (500/503)
```json
{
  "success": false,
  "error": "Service error message"
}
```

## Troubleshooting

### Issue: "CORS Error"
**Solution:** Client API must enable CORS for your domain

### Issue: "Network Error"
**Solution:** Check `VITE_API_BASE_URL` in `.env` is correct and API is reachable

### Issue: "401 Unauthorized" with correct credentials
**Solution:** Verify `VITE_API_KEY` in `.env` matches client's expected API key format

### Issue: Login succeeds but dashboard shows error
**Solution:** Check that API response includes all required fields (success, token, user)

## Additional Notes

- Environment variables must start with `VITE_` prefix in Vite
- Restart dev server after changing `.env` file
- The `.env` file is gitignored - use `.env.example` as template
- All API calls use 10-second timeout
- Token format is expected to be JWT-compatible string

## Support

For issues during production integration:
1. Check browser console for detailed error messages
2. Verify API endpoint URL and structure
3. Test API directly using Postman/curl
4. Review `authService.js` response mapping
5. Confirm API headers match client requirements
