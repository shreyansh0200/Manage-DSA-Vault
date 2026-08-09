# Manage DSA Vault Backend

## Overview

This backend powers the Manage DSA Vault application.
It is an Express.js API server that uses MongoDB for persistent storage.

## Install

```bash
cd backend
npm install
```

## Run

```bash
cd backend
npm run dev
```

Or to start normally:

```bash
npm start
```

## Used modules

- express
- mongoose
- bcryptjs
- cookie-parser
- cors
- dotenv
- jsonwebtoken
- nodemon (dev)

## Environment

Create a `.env` file in `backend/` with values for:

- `MONGODB_URL` - MongoDB connection string
- `PORT` - optional port number (default: `5000`)

## Structure

backend/
  .env
  .gitignore
  app.js
  config/
    database.js
  controllers/
    authController.js
    questionController.js
    registerController.js
  loader.js
  middleware/
    auth.js
  models/
    Question.js
    User.js
  package.json
  package-lock.json
  routes/
    authRoutes.js
    questionRoutes.js
  seed/
    question.js
  server.js
  utils/
    questionLimit.js
