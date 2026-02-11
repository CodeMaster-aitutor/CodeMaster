# CodeMaster - AI-Powered Code Development Platform

## Project Overview

CodeMaster is a comprehensive AI-powered development platform that helps developers write, understand, and improve their code with intelligent assistance.

## Features

- **Code Compiler**: Write, run, and test your code in multiple programming languages
- **Code Explainer**: Get AI-powered explanations for complex code snippets
- **Code Generator**: Generate code using AI based on your requirements
- **Practice Arena**: Improve your coding skills with interactive challenges
- **Assessment System**: Take level-based tests to advance your programming proficiency
- **Analytics Dashboard**: Track your coding progress and performance

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd CodeMaster-v1.2

# Step 3: Install dependencies
npm install

# Step 4: Start the development server
npm run dev
```

The application will be available at `http://localhost:8080`

## Technologies Used

This project is built with modern web technologies:

- **Vite** - Fast build tool and development server
- **TypeScript** - Type-safe JavaScript
- **React** - UI library for building user interfaces
- **shadcn/ui** - Modern UI component library
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Tanstack Query** - Data fetching and state management

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── layout/         # Layout components (Sidebar, Navigation)
│   └── ui/             # Base UI components
├── pages/              # Application pages
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── main.tsx           # Application entry point
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
