<p align="center">
  <img src="https://img.shields.io/badge/SQL-Studio-blue?style=for-the-badge&logo=postgresql&logoColor=white" alt="SQL Studio" />
  <img src="https://img.shields.io/badge/CipherSchools-Assignment-orange?style=for-the-badge" alt="CipherSchools" />
</p>

<h1 align="center">🎓 CipherSchools SQL Studio</h1>

<p align="center">
  <b>An interactive SQL learning platform where students can practice SQL queries, get AI-powered hints, and track their progress through hands-on assignments.</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Express-5.2-000000?style=flat-square&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-17-4169E1?style=flat-square&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Gemini_AI-2.0_Flash-8E75B2?style=flat-square&logo=google&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-7.3-646CFF?style=flat-square&logo=vite&logoColor=white" />
</p>

---

## 📋 Table of Contents

- [About The Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Database Schema](#-database-schema)
- [API Endpoints](#-api-endpoints)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Database Setup](#database-setup)
  - [Running the App](#running-the-app)
- [Assignments](#-assignments)
- [Screenshots](#-screenshots)
- [Google OAuth Setup](#-google-oauth-setup)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🧐 About The Project

**CipherSchools SQL Studio** is a full-stack web application built as an interactive SQL learning environment. Students can browse SQL assignments of varying difficulty, write and execute real SQL queries against a live PostgreSQL database, view results in real-time, and receive AI-powered hints from **Google Gemini 2.0 Flash** when they get stuck.

The platform features a built-in **Monaco Editor** (the same editor that powers VS Code) for a professional SQL writing experience, complete with syntax highlighting, auto-completion, and error detection.

### 🎯 Key Highlights

- **Real SQL Execution** — Queries run against a live PostgreSQL database, not a simulator
- **AI-Powered Hints** — Google Gemini 2.0 Flash provides contextual, pedagogical hints without revealing answers
- **Professional Code Editor** — Monaco Editor with SQL syntax highlighting and intellisense
- **Dual Database Architecture** — MongoDB for application data, PostgreSQL for query execution
- **Authentication** — Email/password signup & login + Google OAuth 2.0 sign-in
- **Responsive Design** — Fully responsive from 320px mobile to 4K desktop

---

## ✨ Features

### 🔐 Authentication & Authorization
- **Email/Password** signup and login with bcrypt password hashing
- **Google OAuth 2.0** one-click sign-in
- **JWT-based** session management with secure token handling
- Protected routes and authenticated API endpoints

### 📝 SQL Assignments
- **10 curated assignments** ranging from Easy to Hard difficulty
- Each assignment includes a description, sample data preview, and expected SQL concepts
- Assignments stored in MongoDB with full CRUD support
- Difficulty badges (Easy 🟢, Medium 🟡, Hard 🔴)

### ⚡ Live SQL Execution
- Write SQL queries in the **Monaco Editor** (VS Code's editor)
- Execute queries against a **real PostgreSQL** database
- View results in a formatted, scrollable data table
- SQL injection protection via query validation middleware
- Error messages displayed inline for debugging

### 🤖 AI-Powered Hint System
- Powered by **Google Gemini 2.0 Flash** AI model
- Context-aware hints based on the assignment and your current query
- Pedagogical approach — guides you without revealing the answer
- Automatic **fallback to rule-based hints** if the API is unavailable
- Hint panel slides in from the side with smooth animations

### 🎨 UI/UX
- Clean, modern design with SCSS architecture
- Fully responsive layout (320px – 4K)
- Component-based SCSS with BEM naming convention
- Loading states, error boundaries, and graceful fallbacks
- Smooth transitions and hover interactions

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 19.2** | UI framework with hooks & context |
| **Vite 7.3** | Lightning-fast dev server & build tool |
| **React Router DOM 7** | Client-side routing |
| **Monaco Editor** | Professional SQL code editor |
| **SCSS (Sass)** | Modular, component-based styling |

### Backend
| Technology | Purpose |
|---|---|
| **Express 5.2** | REST API framework |
| **Mongoose 9.2** | MongoDB ODM for assignments & users |
| **pg (node-postgres)** | PostgreSQL client for query execution |
| **JSON Web Token** | JWT authentication |
| **bcryptjs** | Password hashing |
| **Google Auth Library** | Google OAuth 2.0 verification |
| **@google/generative-ai** | Gemini 2.0 Flash AI hints |
| **dotenv** | Environment variable management |
| **CORS** | Cross-origin resource sharing |

### Databases
| Database | Purpose |
|---|---|
| **MongoDB Atlas** | Stores assignments, user accounts |
| **PostgreSQL** | Executes student SQL queries against sample data |

---

## 📁 Project Structure

```
CipherSchools/
├── README.md
├── .gitignore
│
├── backend/                          # Express.js REST API
│   ├── config/
│   │   └── db.js                     # MongoDB & PostgreSQL connection
│   ├── controllers/
│   │   ├── assignmentController.js   # Assignment CRUD operations
│   │   ├── authController.js         # Signup, login, Google OAuth
│   │   ├── hintController.js         # AI hint generation
│   │   └── queryController.js        # SQL query execution
│   ├── middleware/
│   │   ├── auth.js                   # JWT authentication middleware
│   │   └── queryValidator.js         # SQL injection protection
│   ├── models/
│   │   ├── Assignment.js             # Mongoose assignment schema
│   │   └── User.js                   # Mongoose user schema
│   ├── routes/
│   │   ├── assignmentRoutes.js       # GET /api/assignments
│   │   ├── authRoutes.js             # POST /api/auth/*
│   │   ├── hintRoutes.js             # POST /api/hint
│   │   └── queryRoutes.js            # POST /api/execute
│   ├── seeds/
│   │   └── seed.js                   # Database seeder (MongoDB + PostgreSQL)
│   ├── services/
│   │   ├── hintService.js            # Gemini AI + fallback hint logic
│   │   └── queryService.js           # PostgreSQL query execution
│   ├── .env.example                  # Environment variable template
│   ├── .gitignore
│   ├── package.json
│   └── server.js                     # Express app entry point
│
└── frontend/                         # React + Vite SPA
    ├── public/
    │   └── vite.svg
    ├── src/
    │   ├── components/
    │   │   ├── AssignmentCard.jsx     # Assignment list card
    │   │   ├── ErrorBoundary.jsx      # Global error catch
    │   │   ├── Header.jsx            # Navigation header
    │   │   ├── HintPanel.jsx         # AI hint display panel
    │   │   ├── Loading.jsx           # Loading spinner
    │   │   ├── ResultsTable.jsx      # SQL query results table
    │   │   ├── SampleDataViewer.jsx  # Sample data schema + preview
    │   │   └── SqlEditor.jsx         # Monaco Editor wrapper
    │   ├── contexts/
    │   │   └── AuthContext.jsx        # Authentication state provider
    │   ├── pages/
    │   │   ├── AssignmentAttemptPage.jsx  # SQL editor + execution page
    │   │   ├── AssignmentListPage.jsx     # All assignments grid
    │   │   └── AuthPage.jsx               # Login/Signup page
    │   ├── services/
    │   │   └── api.js                # API client (fetch wrapper)
    │   ├── styles/
    │   │   ├── _layout.scss          # Global layout styles
    │   │   ├── _mixins.scss          # SCSS mixins & breakpoints
    │   │   ├── _variables.scss       # Design tokens & colors
    │   │   ├── main.scss             # Main SCSS entry point
    │   │   └── components/           # Component-specific styles
    │   │       ├── _assignment-card.scss
    │   │       ├── _assignment-list.scss
    │   │       ├── _attempt-page.scss
    │   │       ├── _auth.scss
    │   │       ├── _error-boundary.scss
    │   │       ├── _header.scss
    │   │       ├── _hint-panel.scss
    │   │       ├── _loading.scss
    │   │       ├── _results-table.scss
    │   │       └── _sample-data.scss
    │   ├── App.jsx                   # Root component with routing
    │   └── main.jsx                  # React DOM entry point
    ├── .env.example                  # Frontend env template
    ├── .gitignore
    ├── eslint.config.js
    ├── index.html
    ├── package.json
    └── vite.config.js
```

---

## 🗄 Database Schema

### MongoDB Collections

#### `assignments`
| Field | Type | Description |
|---|---|---|
| `_id` | ObjectId | Auto-generated ID |
| `title` | String | Assignment title |
| `description` | String | What the student needs to solve |
| `difficulty` | String | `Easy`, `Medium`, or `Hard` |
| `sampleData.tableName` | String | Reference table name |
| `sampleData.columns` | Array | Column definitions (`name`, `type`) |
| `sampleData.rows` | Array | Sample data rows |
| `expectedConcept` | String | SQL concepts tested |

#### `users`
| Field | Type | Description |
|---|---|---|
| `_id` | ObjectId | Auto-generated ID |
| `name` | String | User's display name |
| `email` | String | Unique email address |
| `password` | String | Bcrypt-hashed password (null for Google users) |
| `googleId` | String | Google OAuth ID (optional) |
| `createdAt` | Date | Account creation timestamp |

### PostgreSQL Tables

```sql
students (id, name, email, age)           -- 5 rows
courses  (id, name, instructor)           -- 3 rows
enrollments (id, student_id, course_id)   -- 7 rows
```

**Entity Relationship:**
```
students ──┐
           ├── enrollments (many-to-many junction)
courses  ──┘
```

---

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/api/auth/signup` | Register with email & password | ❌ |
| `POST` | `/api/auth/login` | Login with email & password | ❌ |
| `POST` | `/api/auth/google` | Login/register with Google OAuth | ❌ |
| `GET` | `/api/auth/me` | Get current user profile | ✅ JWT |

### Assignments
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/api/assignments` | List all assignments | ❌ |
| `GET` | `/api/assignments/:id` | Get assignment by ID | ❌ |

### SQL Execution
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/api/execute` | Execute a SQL query against PostgreSQL | ❌ |

### AI Hints
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/api/hint` | Get an AI-powered hint for an assignment | ❌ |

**Request body for `/api/hint`:**
```json
{
  "assignmentTitle": "Find All Students",
  "assignmentDescription": "Write a query to retrieve all students...",
  "userQuery": "SELECT name FROM"
}
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your system:

- **Node.js** (v18 or higher) — [Download](https://nodejs.org/)
- **PostgreSQL** (v14 or higher) — [Download](https://www.postgresql.org/download/)
- **MongoDB Atlas** account (free tier) — [Sign up](https://www.mongodb.com/cloud/atlas)
- **Git** — [Download](https://git-scm.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/adarshaldkar/CipherSchools.git
   cd CipherSchools
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Environment Variables

4. **Set up backend environment variables**
   ```bash
   cd ../backend
   cp .env.example .env
   ```

   Edit `backend/.env` and fill in your values:
   ```env
   PORT=5000

   # MongoDB Atlas connection string
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>

   # PostgreSQL (local)
   PG_HOST=localhost
   PG_PORT=5432
   PG_USER=postgres
   PG_PASSWORD=your_postgres_password
   PG_DATABASE=ciphersqlstudio

   # JWT secret (any random string)
   JWT_SECRET=my_super_secret_jwt_key_12345

   # Google OAuth (optional — for Google Sign-In)
   GOOGLE_CLIENT_ID=your_google_client_id

   # Gemini AI (for AI-powered hints)
   GEMINI_API_KEY=your_gemini_api_key
   ```

5. **Set up frontend environment variables**
   ```bash
   cd ../frontend
   cp .env.example .env
   ```

   Edit `frontend/.env`:
   ```env
   VITE_API_URL=http://localhost:5000
   VITE_GOOGLE_CLIENT_ID=your_google_client_id
   ```

### Database Setup

6. **Create PostgreSQL database**

   Open your PostgreSQL shell (psql) or pgAdmin and run:
   ```sql
   CREATE DATABASE ciphersqlstudio;
   ```

7. **Seed both databases** (MongoDB assignments + PostgreSQL tables)
   ```bash
   cd backend
   npm run seed
   ```

   Expected output:
   ```
   MongoDB connected for seeding
   Cleared existing assignments
   Inserted 10 assignments
   PostgreSQL tables seeded successfully
   Seeding complete!
   ```

> ⚠️ **MongoDB Atlas IP Whitelist:** Make sure your current IP address is whitelisted in MongoDB Atlas → **Network Access** → **Add IP Address** → **Allow Access from Anywhere** (`0.0.0.0/0`).

### Running the App

8. **Start the backend server**
   ```bash
   cd backend
   npm start
   ```
   Server runs on `http://localhost:5000`

9. **Start the frontend dev server** (in a new terminal)
   ```bash
   cd frontend
   npm run dev
   ```
   App opens on `http://localhost:5173`

10. **Open your browser** and navigate to `http://localhost:5173` 🎉

---

## 📚 Assignments

The platform comes with **10 pre-built SQL assignments** across three difficulty levels:

| # | Assignment | Difficulty | SQL Concepts |
|---|---|---|---|
| 1 | Find All Students | 🟢 Easy | `SELECT` |
| 2 | Find Students Enrolled in a Specific Course | 🟡 Medium | `JOIN`, `WHERE` |
| 3 | Count Students Per Course | 🟡 Medium | `JOIN`, `COUNT`, `GROUP BY` |
| 4 | Find Students Not Enrolled in Any Course | 🔴 Hard | `LEFT JOIN`, `IS NULL`, `NOT IN` |
| 5 | Find the Course with the Most Enrollments | 🔴 Hard | `JOIN`, `COUNT`, `GROUP BY`, `ORDER BY`, `LIMIT` |
| 6 | Find Students Older Than Average Age | 🟡 Medium | Subquery, `AVG`, `WHERE` |
| 7 | List All Students with Their Course Names | 🟢 Easy | Multi-table `JOIN` |
| 8 | Find Students Enrolled in More Than One Course | 🟡 Medium | `JOIN`, `GROUP BY`, `HAVING` |
| 9 | Find Courses with No Enrollments | 🟡 Medium | `LEFT JOIN`, `IS NULL` |
| 10 | Find the Youngest Student in Each Course | 🔴 Hard | `JOIN`, `MIN`, Subquery, `GROUP BY` |

### Sample Database Tables

**`students`** (5 rows)
| id | name | email | age |
|---|---|---|---|
| 1 | Alice Johnson | alice@example.com | 22 |
| 2 | Bob Smith | bob@example.com | 24 |
| 3 | Charlie Brown | charlie@example.com | 21 |
| 4 | Diana Ross | diana@example.com | 23 |
| 5 | Eve Davis | eve@example.com | 25 |

**`courses`** (3 rows)
| id | name | instructor |
|---|---|---|
| 1 | Database Systems | Dr. Smith |
| 2 | Web Development | Prof. Jones |
| 3 | Algorithms | Dr. Lee |

**`enrollments`** (7 rows)
| id | student_id | course_id |
|---|---|---|
| 1 | 1 | 1 |
| 2 | 1 | 2 |
| 3 | 2 | 1 |
| 4 | 3 | 3 |
| 5 | 4 | 2 |
| 6 | 5 | 1 |
| 7 | 5 | 3 |


## 🔑 Google OAuth Setup

To enable Google Sign-In (optional):

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth Client ID**
5. Select **Web Application**
6. Add authorized JavaScript origins:
   - `http://localhost:5173` (development)
7. Add authorized redirect URIs:
   - `http://localhost:5173` (development)
8. Copy the **Client ID** and paste it into:
   - `backend/.env` → `GOOGLE_CLIENT_ID`
   - `frontend/.env` → `VITE_GOOGLE_CLIENT_ID`

> 💡 **Note:** Email/password authentication works without Google OAuth setup.

---

## 🧪 Available Scripts

### Backend (`/backend`)
| Command | Description |
|---|---|
| `npm start` | Start the Express server |
| `npm run seed` | Seed MongoDB & PostgreSQL databases |

### Frontend (`/frontend`)
| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server (hot reload) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

---

## 📄 License

This project is licensed under the **ISC License**. See the `package.json` for details.

---

## 👤 Author

**Adarsh Aldkar**
- GitHub: [@adarshaldkar](https://github.com/adarshaldkar)

---

<p align="center">
  Made with ❤️ for <b>CipherSchools</b>
</p>
