# Environment Variables Setup Guide

## File Locations

### `.env.example` (Template File)
- **Location**: `CodeMaster/backend/env.example`
- **Purpose**: Template file showing all available environment variables
- **Action**: Copy this to create your `.env` file

### `.env` (Your Configuration File)
- **Location**: `CodeMaster/backend/.env` (same directory as `run.py`)
- **Purpose**: Your actual environment variables (NOT committed to git)
- **Action**: Copy from `env.example` and customize

## Directory Structure

```
CodeMaster/
└── backend/
    ├── .env              ← Your .env file goes here
    ├── env.example       ← Template file (already exists)
    ├── run.py           ← Flask entry point
    ├── app/
    │   ├── __init__.py
    │   ├── config.py    ← Reads .env from this directory
    │   └── ...
    ├── requirements.txt
    └── ...
```

## Setup Steps

### Step 1: Navigate to Backend Directory
```bash
cd CodeMaster\backend    # Windows
cd CodeMaster/backend    # Linux/macOS
```

### Step 2: Copy Template to .env
```bash
# Windows
copy env.example .env

# Linux/macOS
cp env.example .env
```

### Step 3: Edit .env File
Open `.env` in your editor and customize:
- Change `SECRET_KEY` to a random string
- Change `JWT_SECRET_KEY` to a random string
- Update `DATABASE_URL` if using PostgreSQL (or leave empty for SQLite)

### Step 4: Verify Location
Make sure `.env` is in the same directory as `run.py`:
```
CodeMaster/backend/.env  ✓ Correct
CodeMaster/.env          ✗ Wrong location
CodeMaster/backend/app/.env  ✗ Wrong location
```

## Important Notes

1. **`.env` is ignored by git** - It's in `.gitignore` for security
2. **`.env.example` is committed** - Safe to share, no secrets
3. **Config file reads from backend directory** - `app/config.py` looks for `.env` in the parent directory
4. **SQLite is default** - If `DATABASE_URL` is empty, SQLite will be used automatically

## Quick Start (SQLite - No Setup Needed)

For development, you can skip creating `.env` entirely if:
- You're okay with default SQLite database
- Using default configuration values

The app will use SQLite (`CodeMaster.db`) automatically if no `.env` file exists.
