# Installation Guide

## Windows Installation (No Visual C++ Build Tools Required)

### Option 1: Use SQLite (Recommended for Development)

The backend is configured to use SQLite by default, which requires no compilation:

```bash
cd CodeMaster/backend
pip install -r requirements-windows.txt
# Or install without psycopg2-binary
pip install Flask Flask-SQLAlchemy Flask-Migrate Flask-CORS Flask-JWT-Extended python-dotenv marshmallow marshmallow-sqlalchemy bcrypt requests docker python-dateutil
```

### Option 2: Install PostgreSQL Driver with Pre-built Wheel

If you need PostgreSQL support, try installing from a pre-built wheel:

```bash
# Update pip first
python -m pip install --upgrade pip

# Try installing psycopg2-binary with only pre-built wheels
pip install psycopg2-binary --only-binary :all:

# If that fails, install Microsoft Visual C++ Build Tools from:
# https://visualstudio.microsoft.com/visual-cpp-build-tools/
# Then install: pip install psycopg2-binary
```

### Option 3: Install Visual C++ Build Tools (For PostgreSQL)

1. Download Microsoft C++ Build Tools from:
   https://visualstudio.microsoft.com/visual-cpp-build-tools/

2. Install with "Desktop development with C++" workload

3. Then install requirements:
   ```bash
   pip install -r requirements.txt
   ```

## Linux/macOS Installation

```bash
cd CodeMaster/backend
pip install -r requirements.txt
```

## Environment Setup

1. Copy `env.example` to `.env` in the **backend** directory:
   ```bash
   # Windows
   cd CodeMaster\backend
   copy env.example .env
   
   # Linux/macOS
   cd CodeMaster/backend
   cp env.example .env
   ```

   **Important**: The `.env` file must be in the `CodeMaster/backend/` directory (same location as `run.py` and `app/` folder)

2. Edit `.env` and configure your settings

3. For SQLite (development), no database setup needed - SQLite file will be created automatically

4. For PostgreSQL (production), update `DATABASE_URL` in `.env`:
   ```
   DATABASE_URL=postgresql://user:password@localhost:5432/CodeMaster
   ```

**File Locations**:
- `.env.example` (or `env.example`) is in: `CodeMaster/backend/env.example`
- `.env` file should be created in: `CodeMaster/backend/.env` (same directory as `run.py`)

## Run the Application

```bash
python run.py
```

The API will be available at `http://localhost:5000`

## Database Migrations

```bash
# Initialize migrations (first time only)
flask db init

# Create migration
flask db migrate -m "Initial migration"

# Apply migration
flask db upgrade
```
