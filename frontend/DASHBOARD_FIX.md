# Dashboard API Fix

## Issue
The dashboard was showing "Failed to load dashboard - Failed to fetch" error.

## Root Causes

1. **API Endpoint Mismatch**: 
   - Frontend was calling `/dashboard/activity`
   - Backend has `/dashboard/recent`

2. **Response Structure Mismatch**:
   - Backend returns nested structure: `{ user: {...}, stats: {...} }`
   - Frontend expected flat structure: `{ current_level, total_points, ... }`

3. **Activity Response Structure**:
   - Backend returns: `{ activities: [...] }`
   - Frontend expected: `[...]` (direct array)

## Fixes Applied

### 1. Updated `src/lib/api.ts`
- Changed `/dashboard/activity` to `/dashboard/recent`
- Added response transformation to flatten nested structure
- Map `activities` array to expected format

### 2. Updated `src/pages/Dashboard/Dashboard.tsx`
- Use `streak` from API response
- Use `weekly_goal` and `weekly_progress` from API response

## Testing

1. **Check Backend is Running**:
   ```bash
   cd CodeMaster/backend
   python run.py
   ```

2. **Check API Endpoints**:
   - `GET /api/dashboard/stats` - Should return user stats
   - `GET /api/dashboard/recent` - Should return recent activities

3. **Check Authentication**:
   - User must be logged in
   - Token must be in localStorage

4. **Check CORS**:
   - Backend CORS must allow frontend origin
   - Check `app/config.py` for `CORS_ORIGINS`

## Common Issues

### "Failed to fetch"
- Backend server not running
- Wrong API URL (check `VITE_API_BASE_URL`)
- CORS issue
- Network connectivity

### "Unauthorized" (401)
- User not logged in
- Token expired
- Invalid token

### Empty data
- No submissions/assessments in database
- User has no activity yet
