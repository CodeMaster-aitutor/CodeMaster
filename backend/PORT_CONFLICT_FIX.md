# Port 5000 Conflict - Solution

## Problem
Port 5000 is already in use on Windows, causing the error:
```
An attempt was made to access a socket in a way forbidden by its access permissions
```

## Solution Applied
Changed the default port from **5000** to **5001** to avoid conflicts.

## Changes Made

### Backend (`run.py`)
- Default port changed from `5000` to `5001`
- Host changed from `0.0.0.0` to `127.0.0.1` (localhost) to avoid Windows permission issues

### Frontend (`src/lib/api.ts`)
- API base URL updated to use port `5001`

## How to Use

### Option 1: Use Default Port 5001 (Recommended)
Just run the server:
```bash
python run.py
```
Server will start on: `http://127.0.0.1:5001`

### Option 2: Use Custom Port via Environment Variable
Set `PORT` environment variable:
```bash
# Windows PowerShell
$env:PORT=8000
python run.py

# Or in .env file
PORT=8000
```

### Option 3: Free Up Port 5000
If you want to use port 5000, you need to:
1. Find what's using port 5000:
   ```powershell
   netstat -ano | findstr :5000
   ```
2. Kill the process (replace PID with actual process ID):
   ```powershell
   taskkill /PID <PID> /F
   ```
3. Then run Flask on port 5000

## Testing

After starting the server on port 5001:
- Backend: http://127.0.0.1:5001/api/health
- Frontend should automatically connect to port 5001

## Note
If you change the port, make sure:
1. Backend `run.py` uses the new port
2. Frontend `.env` or `api.ts` points to the new port
3. CORS settings allow the new port (if needed)
