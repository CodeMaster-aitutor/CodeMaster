# Assessment API Integration Guide

## Overview
The Assessment page has been integrated with the backend API. All assessment functionality now connects to the Flask backend.

## What Was Done

### 1. API Client (`src/lib/api.ts`)
Created a comprehensive API client utility that handles:
- Authentication (login, register, token management)
- Assessment endpoints (get questions, start, submit, results)
- Compiler, Generator, Explainer, Dashboard, and Analytics APIs

### 2. Assessment Page Updates (`src/pages/Assessment.tsx`)
- Removed hardcoded questions
- Added API integration for fetching questions from backend
- Integrated assessment start/submit API calls
- Added loading states and error handling
- Updated to use 20 questions from backend instead of 5 hardcoded

## API Endpoints Used

### Assessment Endpoints
1. **GET `/api/assessment/questions?level={level}`** - Fetch questions for a level
2. **POST `/api/assessment/start`** - Start a new assessment
3. **POST `/api/assessment/submit`** - Submit assessment answers
4. **GET `/api/assessment/results/{assessment_id}`** - Get detailed results

## How to Test

### Prerequisites
1. Backend server running on `http://localhost:5000`
2. Database initialized with questions (run `python seed_questions.py`)
3. Frontend running on `http://localhost:8080`
4. User must be logged in (authentication required)

### Testing Steps

#### 1. Start Backend Server
```bash
cd CodeMaster/backend
python run.py
```

#### 2. Seed Database (if not done)
```bash
cd CodeMaster/backend
python seed_questions.py
```

#### 3. Start Frontend
```bash
cd CodeMaster/frontend
npm run dev
```

#### 4. Test Assessment Flow

1. **Login/Signup**: Create an account or login
   - The API client automatically stores tokens in localStorage

2. **Navigate to Assessment**: Go to `/assessment` page

3. **Start Assessment**:
   - Select a level (beginner, intermediate, advanced)
   - Click "Start Assessment" button
   - Questions will be loaded from backend (20 questions)

4. **Answer Questions**:
   - Multiple-choice: Select radio button
   - Code-completion: Type in textarea
   - Debugging: Type answer in textarea
   - Navigate with Previous/Next buttons

5. **Submit Assessment**:
   - Click "Complete Assessment" on last question
   - Answers are submitted to backend
   - Score is calculated server-side
   - Results displayed with pass/fail status

## Environment Variables

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

If not set, defaults to `http://localhost:5000/api`

## Authentication

The API client automatically:
- Stores JWT tokens in localStorage after login
- Includes `Authorization: Bearer {token}` header in requests
- Handles token refresh (if implemented)

## Error Handling

The Assessment page includes:
- Loading states during API calls
- Error messages via toast notifications
- Fallback UI for failed requests

## Question Types Supported

1. **Multiple Choice**: Questions with options array
2. **Code Completion**: User completes code snippets
3. **Debugging**: User identifies errors in code

All question types are fetched from the backend database.

## Next Steps

1. Test with real backend server
2. Verify authentication flow
3. Test all question types
4. Check score calculation
5. Verify skill level progression (80%+ to advance)

## Troubleshooting

### API Errors
- Check backend server is running
- Verify CORS is configured correctly
- Check authentication token is valid
- Ensure database has questions seeded

### Frontend Errors
- Check browser console for errors
- Verify API_BASE_URL is correct
- Ensure user is logged in
- Check network tab for API call failures

### No Questions Loading
- Run `python seed_questions.py` in backend
- Check database has questions
- Verify API endpoint returns questions
- Check authentication token is sent
