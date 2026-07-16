# Task Manager

A fullstack task management app built with **React + Vite** (frontend) and **Express + Node.js + PostgreSQL** (backend).

---

## Features

- Add a task (title + optional description)
- Mark a task complete / incomplete
- Edit a task's title and description inline
- Delete a task
- Search tasks by name (case-insensitive)
- Filter tasks by **All / Active / Completed**
- Search and filter work together

---

## Tech Stack

| Layer    | Tech                        |
|----------|-----------------------------|
| Frontend | React 19, Vite              |
| Backend  | Express 4, Node.js          |
| Database | PostgreSQL 16               |
| DB lib   | `pg` (node-postgres)        |

---

## Prerequisites

- Node.js 18+
- PostgreSQL 14+ running locally (or update `.env` to point at a remote instance)

---

## Setup

### 1. Database

Create a PostgreSQL database and user:

```sql
CREATE USER taskuser WITH PASSWORD 'taskpass';
CREATE DATABASE taskdb OWNER taskuser;
GRANT ALL PRIVILEGES ON DATABASE taskdb TO taskuser;
```

> The backend runs the table migration automatically on startup — no manual SQL needed.

---

### 2. Backend

```bash
cd backend
npm install
```

Copy and edit the environment file if needed:

```bash
# backend/.env (already included — edit if your DB credentials differ)
PORT=4000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=taskdb
DB_USER=taskuser
DB_PASSWORD=taskpass
```

Start the server:

```bash
npm start          # production
npm run dev        # development (auto-restarts on file changes, Node 18+)
```

The API will be available at `http://localhost:4000`.

---

### 3. Frontend

```bash
cd frontend
npm install
```

Edit `frontend/.env` if your backend runs on a different port:

```bash
VITE_API_URL=http://localhost:4000/api
```

Start the dev server:

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## API Endpoints

| Method | Endpoint                  | Description                          |
|--------|---------------------------|--------------------------------------|
| GET    | `/api/tasks`              | List tasks (supports `?search=&status=`) |
| GET    | `/api/tasks/:id`          | Get a single task                    |
| POST   | `/api/tasks`              | Create a task                        |
| PUT    | `/api/tasks/:id`          | Update title / description / completed |
| PATCH  | `/api/tasks/:id/toggle`   | Flip completed state                 |
| DELETE | `/api/tasks/:id`          | Delete a task                        |
| GET    | `/api/health`             | Health check                         |

### Query parameters for `GET /api/tasks`

| Param    | Values                        | Description           |
|----------|-------------------------------|-----------------------|
| `search` | any string                    | Filter by title (ILIKE) |
| `status` | `all` \| `active` \| `completed` | Filter by completion status |

---

## Project Structure

```
task-manager/
├── backend/
│   ├── src/
│   │   ├── db.js          # PostgreSQL pool
│   │   ├── migrate.js     # Table creation on startup
│   │   ├── taskModel.js   # All SQL queries
│   │   ├── taskRoutes.js  # Express route handlers
│   │   ├── app.js         # Express app setup
│   │   └── server.js      # Entry point
│   ├── .env
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── TaskForm.jsx     # Add-task form
    │   │   ├── TaskList.jsx     # Renders the list
    │   │   ├── TaskItem.jsx     # Single task row (view + edit)
    │   │   ├── SearchBar.jsx    # Search input
    │   │   └── FilterBar.jsx    # All / Active / Completed
    │   ├── api.js           # All fetch calls (service layer)
    │   ├── App.jsx          # Root component and state
    │   ├── App.css          # Styles
    │   └── main.jsx         # React entry point
    ├── .env
    └── package.json
```
