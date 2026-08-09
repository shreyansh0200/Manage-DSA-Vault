# Manage DSA Vault Frontend

## Overview

This is the React frontend for Manage DSA Vault.
It communicates with the backend API using the `REACT_APP_API_URL` environment variable.

## Install

```bash
cd frontend
npm install
```

## Run

```bash
npm start
```

## Used modules

- react
- react-dom
- react-router-dom
- react-scripts
- axios
- lucide-react
- react-markdown
- react-speech-recognition
- @monaco-editor/react
- web-vitals

## Build

```bash
npm run build
```

## Environment

Create a `.env` file in `frontend/` with:

```text
REACT_APP_API_URL=http://localhost:5000
```

## Structure

frontend/
  .env
  .gitignore
  package.json
  package-lock.json
  public/
    favicon.ico
    index.html
    logo192.png
    logo512.png
    manifest.json
    robots.txt
  README.md
  src/
    App.jsx
    components/
      CodeEditor.jsx
      Loader.jsx
      Navbar.jsx
      NotesEditor.jsx
      ProtectedRoute.jsx
      QuestionCard.jsx
      QuestionForm.jsx
      QuestionInfo.jsx
      Sidebar.jsx
      StatsCard.jsx
    context/
      AuthContext.jsx
    pages/
      Dashboard.jsx
      EditQuestion.jsx
      Login.jsx
      NotFound.jsx
      Profile.jsx
      Register.jsx
      UploadQuestion.jsx
      WorkSpace.jsx
    services/
      api.js
    styles/
      auth.css
      dashboard.css
      profile.css
      upload.css
      workspace.css
    index.css
    index.js
    main.jsx
