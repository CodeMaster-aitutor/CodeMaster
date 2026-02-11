# CodeMaster - AI-Powered Java Learning Platform

A comprehensive full-stack application for learning Java programming with AI-powered code generation, explanation, compilation, and assessment features.

## 🚀 Quick Start

**New to the project?** Start here: **[SETUP_GUIDE.md](./SETUP_GUIDE.md)**

The setup guide includes:
- Step-by-step installation instructions
- Environment configuration
- Database setup
- Running backend and frontend
- Troubleshooting guide

## 📋 Prerequisites

- Python 3.8+
- Node.js 16+
- Git

## 🏗️ Project Structure

```
CodeMaster/
├── backend/          # Flask REST API
├── frontend/         # React + TypeScript frontend
├── SETUP_GUIDE.md    # Complete setup instructions
└── README.md         # This file
```

## ⚡ Quick Commands

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements-windows.txt
python generate_secrets.py  # Generate keys
flask db init
flask db migrate -m "Initial migration"
flask db upgrade
python seed_questions.py
python run.py
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 🎯 Features

- ✅ User Authentication (Email/Password + Google OAuth)
- ✅ Java Code Compiler with Error Detection
- ✅ AI Code Generator
- ✅ AI Code Explainer
- ✅ Assessment System (20 Java Questions)
- ✅ Practice Arena with Learning Paths
- ✅ Dashboard & Analytics
- ✅ Progress Tracking

## 📚 Documentation

- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Complete setup guide for beginners
- **[backend/README.md](./backend/README.md)** - Backend API documentation
- **[frontend/README.md](./frontend/README.md)** - Frontend documentation
- **[backend/INSTALL.md](./backend/INSTALL.md)** - Backend installation details
- **[GOOGLE_OAUTH_SETUP.md](./GOOGLE_OAUTH_SETUP.md)** - Google OAuth configuration

## 🛠️ Tech Stack

### Backend
- Flask (Python)
- SQLAlchemy (ORM)
- Flask-JWT-Extended (Authentication)
- SQLite/PostgreSQL (Database)
- Ollama/Hugging Face (AI Services)

### Frontend
- React + TypeScript
- Vite
- Shadcn/ui
- Tailwind CSS
- React Router
- Tanstack Query

## 📝 License

This project is for educational purposes.

## 🤝 Contributing

This is a final-year project. For questions or issues, please refer to the setup guide or contact the development team.

---

**For detailed setup instructions, see [SETUP_GUIDE.md](./SETUP_GUIDE.md)**
