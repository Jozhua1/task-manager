# Task Manager

A full-stack Task Management application built with **React + Vite**, **Express.js**, and **PostgreSQL**.

## Features

- Create, edit, and delete tasks
- Mark tasks as complete/incomplete
- Search tasks by title
- Filter tasks (All, Active, Completed)

---

## Tech Stack

- React + Vite
- Express.js
- Node.js
- PostgreSQL

---

# Screenshots

### Home Page

> *(Insert screenshot here)*

### Search & Filter

> *(Insert screenshot here)*

### Edit Task

> *(Insert screenshot here)*

---

# Setup

## 1. Clone the repository

```bash
git clone <your-repository-url>
cd task-manager
```

## 2. Create the PostgreSQL database

```sql
CREATE DATABASE taskdb;
```

Import the schema:

```bash
psql -U postgres -d taskdb -f database/schema.sql
```

## 3. Configure the backend

Create a `.env` file inside the `backend` folder.

```env
PORT=4000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=taskdb
DB_USER=your_username
DB_PASSWORD=your_password
```

Install dependencies and start the backend:

```bash
cd backend
npm install
npm start
```

## 4. Configure the frontend

Open a new terminal.

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:4000/api
```

Start the frontend:

```bash
npm run dev
```

Open:

```
http://localhost:5173
```

---

## Project Structure

```text
task-manager/
├── backend/
├── frontend/
├── database/
│   └── schema.sql
├── .gitignore
└── README.md
```

---

## Author

**Joshua Escalona**
