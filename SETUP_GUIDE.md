# CodeMaster - Complete Setup Guide for Beginners

Welcome! This guide will help you set up the CodeMaster project from scratch, step by step.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Project Structure](#project-structure)
3. [Backend Setup](#backend-setup)
4. [Frontend Setup](#frontend-setup)
5. [Running the Application](#running-the-application)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, make sure you have the following installed:

### Required Software

1. **Python 3.8 or higher**
   - Download from: https://www.python.org/downloads/
   - During installation, check "Add Python to PATH"
   - Verify installation:
     ```bash
     python --version
     ```

2. **Node.js 16 or higher** (for frontend)
   - Download from: https://nodejs.org/
   - This also installs npm (Node Package Manager)
   - Verify installation:
     ```bash
     node --version
     npm --version
     ```

3. **Git** (if cloning from GitHub)
   - Download from: https://git-scm.com/downloads
   - Verify installation:
     ```bash
     git --version
     ```

### Optional (for Production)

- **PostgreSQL** (optional - SQLite is used by default for development)
- **pgAdmin** (optional - for managing PostgreSQL database)

---

## Project Structure

```
CodeMaster/
├── backend/          # Flask backend API
│   ├── app/         # Application code
│   ├── .env         # Environment variables (create this)
│   ├── run.py       # Server entry point
│   └── ...
├── frontend/        # React frontend
│   ├── src/         # Source code
│   ├── package.json # Dependencies
│   └── ...
└── README.md
```

---

## Backend Setup

### Step 1: Navigate to Backend Directory

Open your terminal (PowerShell on Windows, Terminal on Mac/Linux) and navigate to the backend folder:

```bash
cd CodeMaster/backend
```

### Step 2: Create Virtual Environment (Recommended)

A virtual environment isolates your project dependencies:

**Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**Mac/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

You should see `(venv)` at the beginning of your command prompt.

### Step 3: Install Backend Dependencies

**For Windows:**
```bash
pip install -r requirements-windows.txt
```

**For Mac/Linux:**
```bash
pip install -r requirements.txt
```

This will install all required Python packages (Flask, SQLAlchemy, etc.).

### Step 4: Create Environment File (.env)

1. Copy the example environment file:
   ```bash
   # Windows
   copy env.example .env
   
   # Mac/Linux
   cp env.example .env
   ```

2. Open `.env` file in a text editor and configure it:

   **For SQLite (Default - No setup needed):**
   ```env
   # Leave DATABASE_URL empty or unset to use SQLite
   DATABASE_URL=
   ```

   **For PostgreSQL (Optional):**
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/CodeMaster
   ```

3. **Generate Secret Keys:**
   
   Run the secret key generator:
   ```bash
   python generate_secrets.py
   ```
   
   Copy the output and paste into your `.env` file:
   ```env
   SECRET_KEY=your-generated-secret-key-here
   JWT_SECRET_KEY=your-generated-jwt-secret-key-here
   ```

4. **Complete .env file example:**
   ```env
   # Flask Configuration
   FLASK_APP=app
   FLASK_ENV=development
   SECRET_KEY=your-generated-secret-key-here
   
   # Database Configuration (SQLite - default)
   DATABASE_URL=
   
   # JWT Configuration
   JWT_SECRET_KEY=your-generated-jwt-secret-key-here
   JWT_ACCESS_TOKEN_EXPIRES=3600
   JWT_REFRESH_TOKEN_EXPIRES=86400
   
   # CORS Configuration
   CORS_ORIGINS=http://localhost:8080,http://localhost:5173
   
   # AI Service Configuration (Optional)
   AI_SERVICE=ollama
   OLLAMA_BASE_URL=http://localhost:11434
   
   # Google OAuth (Optional - leave empty if not using)
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=
   GOOGLE_REDIRECT_URI=http://localhost:5173/auth/google/callback
   ```

### Step 5: Initialize Database

This creates the database tables:

```bash
# Initialize Flask-Migrate (first time only)
flask db init

# Create migration
flask db migrate -m "Initial migration"

# Apply migration (creates tables)
flask db upgrade
```

**Expected output:**
- Creates `migrations/` folder
- Creates database file `CodeMaster.db` (for SQLite)
- Creates all tables (users, questions, assessments, etc.)

### Step 6: Seed Database with Questions

This adds 20 Java assessment questions to the database:

```bash
python seed_questions.py
```

**Expected output:**
```
✓ Successfully seeded 20 Java questions into database
  - Beginner: 7
  - Intermediate: 8
  - Advanced: 5
```

---

## Frontend Setup

### Step 1: Navigate to Frontend Directory

Open a **new terminal window** (keep backend terminal running) and navigate to frontend:

```bash
cd CodeMaster/frontend
```

### Step 2: Install Frontend Dependencies

This will install all React and UI dependencies:

```bash
npm install
```

**Note:** This may take a few minutes. Wait for it to complete.

### Step 3: Configure Frontend (Optional)

The frontend is already configured to connect to `http://localhost:5001/api` by default.

If you need to change the backend URL, create a `.env` file in the frontend directory:

```bash
# Create .env file in frontend directory
echo "VITE_API_BASE_URL=http://localhost:5001/api" > .env
```

---

## Running the Application

### Step 1: Start Backend Server

In your **backend terminal** (with virtual environment activated):

```bash
cd CodeMaster/backend
python run.py
```

**Expected output:**
```
Starting CodeMaster Backend on http://127.0.0.1:5001
Health check: http://127.0.0.1:5001/api/health
 * Serving Flask app 'app'
 * Debug mode: on
 * Running on http://127.0.0.1:5001
Press CTRL+C to quit
```

**✅ Backend is running!** Keep this terminal open.

### Step 2: Start Frontend Server

In your **frontend terminal** (new window):

```bash
cd CodeMaster/frontend
npm run dev
```

**Expected output:**
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

**✅ Frontend is running!**

### Step 3: Access the Application

1. Open your web browser
2. Navigate to: **http://localhost:5173**
3. You should see the CodeMaster landing page!

---

## Quick Start Commands Summary

### Backend (First Time Setup)
```bash
cd CodeMaster/backend
python -m venv venv
venv\Scripts\activate                    # Windows
# source venv/bin/activate               # Mac/Linux
pip install -r requirements-windows.txt  # Windows
# pip install -r requirements.txt       # Mac/Linux
copy env.example .env                    # Windows
# cp env.example .env                    # Mac/Linux
python generate_secrets.py               # Generate keys, add to .env
flask db init
flask db migrate -m "Initial migration"
flask db upgrade
python seed_questions.py
```

### Backend (Daily Use)
```bash
cd CodeMaster/backend
venv\Scripts\activate                    # Windows
# source venv/bin/activate               # Mac/Linux
python run.py
```

### Frontend (First Time Setup)
```bash
cd CodeMaster/frontend
npm install
```

### Frontend (Daily Use)
```bash
cd CodeMaster/frontend
npm run dev
```

---

## Testing the Setup

### Test Backend Health

Open a new terminal and run:

**Windows PowerShell:**
```powershell
Invoke-RestMethod -Uri "http://127.0.0.1:5001/api/health" -Method Get
```

**Mac/Linux or Git Bash:**
```bash
curl http://127.0.0.1:5001/api/health
```

**Expected response:**
```json
{
  "status": "healthy",
  "service": "CodeMaster Backend"
}
```

### Test Frontend

1. Open browser: http://localhost:5173
2. You should see the CodeMaster landing page
3. Try clicking "Sign Up" or "Login"

---

## Troubleshooting

### Backend Issues

#### Port Already in Use
**Error:** `An attempt was made to access a socket in a way forbidden by its access permissions`

**Solution:** The default port (5001) is already in use. Change it in `run.py` or set environment variable:
```bash
$env:PORT=8000
python run.py
```

#### Database Migration Errors
**Error:** `Target database is not up to date`

**Solution:**
```bash
flask db upgrade
```

#### Module Not Found
**Error:** `ModuleNotFoundError: No module named 'flask'`

**Solution:** Make sure virtual environment is activated and dependencies are installed:
```bash
venv\Scripts\activate
pip install -r requirements-windows.txt
```

#### Secret Key Not Set
**Error:** `SECRET_KEY must be set`

**Solution:** Make sure `.env` file exists and has `SECRET_KEY` and `JWT_SECRET_KEY`:
```bash
python generate_secrets.py
# Copy output to .env file
```

### Frontend Issues

#### npm install Fails
**Error:** `npm ERR!`

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Port 5173 Already in Use
**Solution:** Vite will automatically use the next available port (5174, 5175, etc.)

#### Cannot Connect to Backend
**Error:** `Failed to fetch` or network errors

**Solution:**
1. Make sure backend is running on port 5001
2. Check `frontend/src/lib/api.ts` has correct API URL
3. Check CORS settings in backend `.env`:
   ```env
   CORS_ORIGINS=http://localhost:5173
   ```

### Database Issues

#### SQLite Database Not Created
**Solution:**
```bash
flask db upgrade
```

#### Questions Not Seeded
**Solution:**
```bash
python seed_questions.py
```

#### PostgreSQL Connection Failed
**Error:** `could not connect to server`

**Solution:**
1. Make sure PostgreSQL is running
2. Check `DATABASE_URL` in `.env` is correct
3. Verify username, password, and database name
4. Check PostgreSQL is listening on the correct port (default: 5432)

---

## Environment Variables Reference

### Backend (.env)

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `SECRET_KEY` | Flask secret key | ✅ Yes | - |
| `JWT_SECRET_KEY` | JWT token secret | ✅ Yes | - |
| `DATABASE_URL` | Database connection string | ❌ No | SQLite |
| `FLASK_ENV` | Flask environment | ❌ No | development |
| `CORS_ORIGINS` | Allowed CORS origins | ❌ No | localhost:5173 |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | ❌ No | - |
| `GOOGLE_CLIENT_SECRET` | Google OAuth secret | ❌ No | - |

### Frontend (.env)

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `VITE_API_BASE_URL` | Backend API URL | ❌ No | http://localhost:5001/api |

---

## Project Features

Once set up, you can use:

- ✅ **User Authentication** - Sign up, login, Google OAuth
- ✅ **Code Compiler** - Compile and run Java code
- ✅ **Code Generator** - AI-powered code generation
- ✅ **Code Explainer** - AI-powered code explanation
- ✅ **Assessment System** - 20 Java questions (MCQ, code completion, debugging)
- ✅ **Practice Arena** - Learning paths and coding challenges
- ✅ **Dashboard** - User statistics and progress
- ✅ **Analytics** - Track your coding activity

---

## Getting Help

If you encounter issues:

1. Check the [Troubleshooting](#troubleshooting) section above
2. Review error messages carefully
3. Check that all prerequisites are installed
4. Verify environment variables are set correctly
5. Make sure both backend and frontend servers are running

---

## Next Steps

After successful setup:

1. **Create an account** - Sign up at http://localhost:5173/signup
2. **Take an assessment** - Test your Java knowledge
3. **Try the compiler** - Write and run Java code
4. **Explore features** - Generator, Explainer, Practice Arena

---

## Development Tips

### Backend Development
- Backend auto-reloads when you save files (debug mode)
- Check terminal for error messages
- Database changes require migrations:
  ```bash
  flask db migrate -m "Description"
  flask db upgrade
  ```

### Frontend Development
- Frontend auto-reloads on file changes (Hot Module Replacement)
- Check browser console (F12) for errors
- API calls are logged in Network tab

---

## Production Deployment

This guide is for **development setup only**. For production:

1. Use a production WSGI server (Gunicorn, uWSGI)
2. Use PostgreSQL instead of SQLite
3. Set `FLASK_ENV=production`
4. Use environment variables for secrets (never commit .env)
5. Enable HTTPS
6. Configure proper CORS origins
7. Set up proper logging and monitoring

---

**Happy Coding! 🚀**
