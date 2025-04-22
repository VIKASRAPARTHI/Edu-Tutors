# Edu-Tutors: AI-Powered Educational Chat Application

**Edu-Tutors**, a dynamic, real-time chat application built with React.js that simulates AI-powered educational discussions. This application is designed as part of a **Coding Exercise** to showcase proficiency in modern web technologies and frameworks.

![Screenshot](https://github.com/VIKASRAPARTHI/Edu-Tutors/blob/main/src/assets/screenshot.png)

## Overview

Edu-Tutors leverages the power of modern frontend technologies to deliver a seamless, high-performance, and intuitive learning experience. Users can engage in real-time conversations mimicking AI tutoring sessions, making the platform ideal for educational support, doubt resolution, and knowledge sharing.

## Tech Stack

- **Frameworks**: [React.js](https://reactjs.org/)
- **Language**: [JavaScript](https://www.javascript.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) 
- **UI Libraries**: [TailwindCSS](https://tailwindcss.com/)
- **Version Control**: Git + GitHub

## Features

- Real-time AI-powered chat simulation
- Responsive UI with TailwindCSS
- Clean and scalable codebase with TypeScript
- State management using Zustand 
- Educational-focused conversation flows
- Optimized for performance and user experience

## Project Structure
```bash
Edu-Tutors/
│
├── public/                      # Static assets (images, icons, etc.)
│
├── src/                         # Source code directory
│   ├── assets/                  # Project images and icons
│
│   ├── components/              # Reusable UI components
│   │   ├── ChatComponent.jsx    # Main chat message UI
│   │   ├── Navbar.jsx           # Top navigation bar
│   │   ├── ProfileSettings.jsx  # User profile and settings panel
│   │   └── SideBar.jsx          # Sidebar for navigation or channels
│
│   ├── Pages/                   # Application screens or views
│   │   └── ChatScreen.jsx       # Main chat screen layout
│
│   ├── store/                   # Zustand/Redux state management
│   │   ├── chatStore.js         # Store for chat-related state
│   │   └── themeStore.js        # Store for theme (dark/light mode)
│
│   ├── utils/                   # Utility functions and API logic
│   │   └── apis.js              # API configuration and helpers
│
│   ├── App.jsx                  # Root React component
│   ├── App.css                  # Global styles
│   ├── index.css                # TailwindCSS base & custom styles
│   └── main.jsx                 # Entry point to the React app
│
├── index.html                   # HTML template for the app
├── .gitignore                   # Files and folders to ignore in Git
├── eslint.config.js             # ESLint configuration
```

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/VIKASRAPARTHI/Edu-Tutors.git
cd Edu-Tutors
```

### 2. Install Dependencies
```bash
npm install
  or
yarn install
```

### 3. Run the Development Server
```bash
npm run dev
  or
yarn dev
```

The application will be available at http://localhost:3000.

### Future Improvements
1. Backend WebSocket server integration
2. AI/LLM API integration for real conversations
3. User authentication and session tracking
4. Enhanced UI/UX with animations and transitions
5. Mobile-first improvements

### Contact
Made with ❤️ by Vikas Raparthi


