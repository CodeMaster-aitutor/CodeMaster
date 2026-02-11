# Google OAuth Setup Guide

This guide will help you set up Google OAuth authentication for CodeMaster.

## Prerequisites

1. A Google Cloud Platform (GCP) account
2. Access to Google Cloud Console

## Step 1: Create OAuth 2.0 Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services** > **Credentials**
4. Click **Create Credentials** > **OAuth client ID**
5. If prompted, configure the OAuth consent screen:
   - Choose **External** (unless you have a Google Workspace)
   - Fill in the required information (App name, User support email, etc.)
   - Add your email to **Test users** (if in testing mode)
   - Click **Save and Continue** through the scopes and test users screens

## Step 2: Configure OAuth Client

1. Select **Web application** as the application type
2. Give it a name (e.g., "CodeMaster Web Client")
3. Add **Authorized JavaScript origins**:
   ```
   http://localhost:5173
   http://localhost:8080
   ```
   (Add your production domain when deploying)

4. Add **Authorized redirect URIs**:
   ```
   http://localhost:5173/auth/google/callback
   http://localhost:8080/auth/google/callback
   ```
   (Add your production callback URL when deploying)

5. Click **Create**
6. Copy the **Client ID** and **Client Secret**

## Step 3: Configure Environment Variables

1. Open your `.env` file in the backend directory
2. Add the following variables:

```env
# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here
GOOGLE_REDIRECT_URI=http://localhost:5173/auth/google/callback
```

**Important Notes:**
- Replace `your-google-client-id-here` with your actual Client ID
- Replace `your-google-client-secret-here` with your actual Client Secret
- The `GOOGLE_REDIRECT_URI` should match your frontend URL and callback route
- For production, update all URLs to your production domain

## Step 4: Install Backend Dependencies

The Google OAuth libraries are already in `requirements.txt`. Install them:

```bash
cd CodeMaster/backend
pip install -r requirements.txt
```

Or install manually:
```bash
pip install google-auth google-auth-oauthlib google-auth-httplib2
```

## Step 5: Database Migration

Since we added a `google_id` field to the User model, you need to create a migration:

```bash
cd CodeMaster/backend
flask db migrate -m "Add google_id to User model"
flask db upgrade
```

Or if you're starting fresh, the database will be created with the new schema automatically.

## Step 6: Test the Integration

1. Start the backend server:
   ```bash
   cd CodeMaster/backend
   python run.py
   ```

2. Start the frontend server:
   ```bash
   cd CodeMaster/frontend
   npm run dev
   ```

3. Navigate to the login or signup page
4. Click **"Sign in with Google"** or **"Sign up with Google"**
5. You should be redirected to Google's authentication page
6. After authorizing, you'll be redirected back to the callback page
7. If successful, you'll be logged in and redirected to the dashboard

## Troubleshooting

### Error: "redirect_uri_mismatch"
- Make sure the redirect URI in your `.env` file exactly matches the one in Google Cloud Console
- Check that you added the correct URL to **Authorized redirect URIs** in Google Cloud Console

### Error: "invalid_client"
- Verify that `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are correct in your `.env` file
- Make sure there are no extra spaces or quotes around the values

### Error: "access_denied"
- The user cancelled the OAuth flow
- This is expected behavior if the user clicks "Cancel" on the Google consent screen

### User not created or logged in
- Check the backend logs for errors
- Verify that the database migration was run successfully
- Ensure the `google_id` field exists in the users table

### CORS Errors
- Make sure `CORS_ORIGINS` in your `.env` includes your frontend URL
- Restart the backend server after changing CORS settings

## Security Considerations

1. **Never commit your `.env` file** with real credentials to version control
2. **Use different OAuth credentials** for development and production
3. **Keep your Client Secret secure** - it should never be exposed to the frontend
4. **Use HTTPS in production** - OAuth requires secure connections in production
5. **Regularly rotate** your OAuth credentials if compromised

## Production Deployment

When deploying to production:

1. Update the OAuth consent screen with your production app details
2. Add your production domain to **Authorized JavaScript origins**
3. Add your production callback URL to **Authorized redirect URIs**
4. Update the `.env` file with production URLs:
   ```env
   GOOGLE_REDIRECT_URI=https://yourdomain.com/auth/google/callback
   CORS_ORIGINS=https://yourdomain.com
   ```
5. Ensure your production server uses HTTPS

## API Endpoints

The following endpoints are available:

- `GET /api/auth/google/url` - Get Google OAuth URL
- `POST /api/auth/google/callback` - Handle OAuth callback and create/login user

## How It Works

1. User clicks "Sign in with Google" button
2. Frontend requests OAuth URL from backend
3. Backend generates Google OAuth URL with state token
4. Frontend redirects user to Google's authentication page
5. User authorizes the application
6. Google redirects back to `/auth/google/callback` with authorization code
7. Frontend sends code to backend `/api/auth/google/callback`
8. Backend exchanges code for access token with Google
9. Backend fetches user info from Google
10. Backend creates user (if new) or logs in existing user
11. Backend returns JWT tokens to frontend
12. Frontend stores tokens and redirects to dashboard
