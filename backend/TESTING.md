# Testing the Backend

## Quick Start Test

### 1. Install Dependencies

```bash
cd CodeMaster\backend
pip install -r requirements-windows.txt
```

### 2. Initialize Database (First Time Only)

```bash
python flask_bootstrap.py
```

This will:
- Create all database tables
- Create an admin user (email: admin@CodeMaster.com, password: admin123)

### 3. Start the Server

```bash
python run.py
```

Server will start at `http://localhost:5000`

### 4. Test Health Check

```bash
# Using PowerShell
Invoke-RestMethod -Uri "http://localhost:5000/api/health" -Method Get

# Or use curl
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "service": "CodeMaster Backend"
}
```

### 5. Test Registration

```powershell
$body = @{
    email = "test@example.com"
    username = "testuser"
    password = "Test1234"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" -Method Post -Body $body -ContentType "application/json"
```

### 6. Test Login

```powershell
$body = @{
    email = "test@example.com"
    password = "Test1234"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method Post -Body $body -ContentType "application/json"
$token = $response.access_token
```

### 7. Test Protected Endpoint

```powershell
$headers = @{
    "Authorization" = "Bearer $token"
}

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/me" -Method Get -Headers $headers
```

## API Endpoints Status

| Endpoint | Status | Description |
|----------|--------|-------------|
| `GET /api/health` | ✅ Ready | Health check |
| `POST /api/auth/register` | ✅ Ready | User registration |
| `POST /api/auth/login` | ✅ Ready | User login |
| `POST /api/auth/refresh` | ✅ Ready | Refresh JWT token |
| `GET /api/auth/me` | ✅ Ready | Get current user |
| `POST /api/auth/logout` | ✅ Ready | Logout |
| `POST /api/compiler/execute` | ⏳ Pending | Java code execution |
| `POST /api/generator/generate` | ⏳ Pending | AI code generation |
| `POST /api/explainer/explain` | ⏳ Pending | Code explanation |
| `POST /api/assessment/*` | ⏳ Pending | Assessment endpoints |
| `GET /api/analytics/*` | ⏳ Pending | Analytics endpoints |
| `GET /api/dashboard/*` | ⏳ Pending | Dashboard endpoints |

## Using Postman or Insomnia

1. Import collection (create manually):
   - Base URL: `http://localhost:5000`
   - Health Check: `GET /api/health`
   - Register: `POST /api/auth/register`
   - Login: `POST /api/auth/login`
   - Get Me: `GET /api/auth/me` (requires Bearer token)

2. Set Authorization:
   - Type: Bearer Token
   - Token: From login response

## Troubleshooting

### Database not created?
Run: `python flask_bootstrap.py`

### Port already in use?
Change port in `run.py` or set `PORT` environment variable:
```bash
$env:PORT=5001
python run.py
```

### Import errors?
Make sure you're in the `backend` directory when running commands:
```bash
cd CodeMaster\backend
python run.py
```
