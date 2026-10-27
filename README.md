# CP Task Manager 🎯

> A full-stack MERN application designed for competitive programmers to systematically organize, track, and revise LeetCode and Codeforces problems in one unified workspace.

[![Technology - MERN Stack](https://img.shields.io/badge/Stack-MERN%20(React%20%7C%20Node%20%7C%20Express%20%7C%20MongoDB)-blue.svg)](#technology-stack)
[![Frontend - Vite + React](https://img.shields.io/badge/Frontend-React%2018%20%2B%20Vite-61dafb.svg)](#technology-stack)
[![Backend - Node + Express](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express.js-green.svg)](#technology-stack)
[![Database - MongoDB](https://img.shields.io/badge/Database-MongoDB%20%2B%20Mongoose-47A248.svg)](#technology-stack)
[![Project Status](https://img.shields.io/badge/Status-In%20Active%20Development-orange.svg)](#features)

---

## Table of Contents

- [Project Overview](#project-overview)
- [Problem Statement](#problem-statement)
- [Objectives](#objectives)
- [Features](#features)
  - [Implemented Features](#-implemented-features)
  - [Planned Features (Roadmap)](#-planned-features-roadmap)
- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [Project Folder Structure](#project-folder-structure)
- [Installation and Setup](#installation-and-setup)
  - [Prerequisites](#prerequisites)
  - [Step-by-Step Installation](#step-by-step-installation)
  - [Environment Variables](#environment-variables)
- [How to Run the Project](#how-to-run-the-project)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Future Enhancements](#future-enhancements)
- [Team Members & Responsibilities](#team-members--responsibilities)
- [Learning Outcomes](#learning-outcomes)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview

**CP Task Manager** is a web-based task tracking platform built specifically for students and competitive programmers. In competitive programming (CP) and technical interview preparation, consistency and revision are paramount. Students solve hundreds of algorithmic problems across different platforms like **LeetCode** and **Codeforces**.

However, maintaining a record of which problems were solved, which ones need revision, and what concepts tripped up the programmer is typically scattered across browser bookmarks, custom spreadsheets, or mental notes. **CP Task Manager** provides a centralized, distraction-free environment to log solved problems, categorize them by platform and difficulty, and schedule timely revisions so that key algorithmic insights are never forgotten.

---

## Problem Statement

Competitive programmers and computer science students frequently face the following challenges:

1. **Multi-Platform Fragmentation:** Programmers practice across multiple judges (LeetCode, Codeforces, CodeChef, AtCoder) without a single consolidated dashboard.
2. **Revision & Retention Bottleneck:** Solving a problem once does not guarantee mastery. Without structured revision tracking, programmers forget subtle algorithmic tricks and edge cases.
3. **Inconsistent Difficulty Metrics:** LeetCode categorizes problems into *Easy / Medium / Hard*, while Codeforces uses numerical difficulty ratings (*800 to 3500*). Tracking cross-platform progress manually is tedious.
4. **Disorganized Topic Tagging:** Standard platforms do not always allow custom notes, personal bookmarks, or reflection tags (e.g., *"Re-attempt without hints"*, *"Review binary lifting trick"*).

---

## Objectives

- **Centralize CP Practice Logs:** Provide a single hub to record problems solved on LeetCode and Codeforces.
- **Support Comprehensive CRUD Operations:** Enable users to create, read, update, and delete problem entries with relevant metadata (problem link, topic tags, difficulty, notes).
- **Facilitate Active Revision:** Help programmers mark problems that require re-solving after a set interval.
- **Implement Clean MERN Architecture:** Build a modular, decoupled full-stack application demonstrating industry-standard engineering practices suitable for academic evaluation.
- **Demonstrate Authentication & Security:** Secure user accounts with credential hashing and role/session isolation.

---

## Features

### ✅ Implemented Features

The core application foundation and authentication subsystems are currently built and functional:

- **User Authentication & Registration:**
  - Secure user registration and login flows.
  - Password security using cryptographic salt hashing via `bcrypt`.
- **Global User State Management:**
  - Client-side authentication context managed using React Context API (`UserContext`).
  - Persistent session awareness across component trees.
- **Interactive Authenticated Dashboard:**
  - Personalized welcome view for logged-in users with one-click logout handling.
- **Real-Time User Directory & Search:**
  - Live username filtering leveraging React's `useMemo` for optimized search performance.
- **Decoupled Backend API:**
  - Express.js server configured with CORS middleware and JSON parsing.
  - Vite development server configured with an integrated API proxy (`/api` &rarr; `http://localhost:5000`).

### 📋 Planned Features (Roadmap)

The following features represent the task-tracking core and are currently in the implementation pipeline:

| Feature | Description | Status |
| :--- | :--- | :--- |
| **Problem Task CRUD** | Create, view, update, and delete problem entries | ⏳ In Progress |
| **Platform Selection** | Dedicated categorization for LeetCode and Codeforces | ⏳ In Progress |
| **Difficulty Categorization** | Support for LC ratings (*Easy/Medium/Hard*) & CF ratings (*800–3500*) | ⏳ Planned |
| **Revision Tracker** | Flag problems for spaced revision (*Needs Review*, *Mastered*) | ⏳ Planned |
| **Search & Multi-Filters** | Filter problem records by platform, tag (DP, Graphs, Greedy), or status | ⏳ Planned |
| **Dashboard Statistics** | Visual charts showing total solved count and difficulty distribution | ⏳ Planned |

---

## Technology Stack

| Layer | Technology | Version | Purpose in Project |
| :--- | :--- | :--- | :--- |
| **Frontend Framework** | **React.js** | `^18.3.1` | Component-driven UI rendering with React Hooks (`useState`, `useEffect`, `useContext`, `useRef`, `useMemo`). |
| **Build Tool** | **Vite** | `^5.4.9` | Ultra-fast local development server and optimized frontend bundling. |
| **Frontend Styling** | **Vanilla CSS** | - | Responsive, custom styling without heavy framework dependencies (`App.css`). |
| **Backend Runtime** | **Node.js** | `ES Modules` | Asynchronous, event-driven server runtime. |
| **Backend Framework** | **Express.js** | `^4.21.0` | Routing engine for RESTful API endpoints and middleware handling. |
| **Database** | **MongoDB** | - | NoSQL document database for flexible schema management. |
| **Object Data Modeling** | **Mongoose** | `^8.7.0` | Schema validation, business logic hooks, and database queries. |
| **Security & Utilities** | **Bcrypt** & **CORS** | `bcrypt ^5.1.1` / `cors ^2.8.5` | Salt hashing for passwords and Cross-Origin Resource Sharing handling. |
| **Version Control** | **Git & GitHub** | - | Distributed version control and team collaboration. |

---

## System Architecture

CP Task Manager follows the standard **3-Tier MERN Architecture**:

```
+-------------------------------------------------------+
|                 Client Tier (Frontend)                 |
|            React 18 SPA (Vite Dev Server)             |
|    - App.jsx / Dashboard.jsx / LoginForm.jsx          |
|    - UserContext.jsx (Global State)                   |
+-------------------------------------------------------+
                           |
                     HTTP / JSON
             (Proxied via Vite: /api)
                           |
                           v
+-------------------------------------------------------+
|               Application Tier (Backend)               |
|            Node.js + Express.js Server                |
|    - CORS & JSON Body Parser Middleware               |
|    - Auth Routes (/api/auth)                          |
|    - Bcrypt Password Hashing                          |
+-------------------------------------------------------+
                           |
                    Mongoose Driver
                           |
                           v
+-------------------------------------------------------+
|                  Data Tier (Database)                 |
|                    MongoDB Database                   |
|    - Collections: users (planned: problems/tasks)     |
+-------------------------------------------------------+
```

1. **Presentation Layer (React + Vite):** Renders the user interface, maintains input state, and dispatches asynchronous `fetch` requests to API endpoints.
2. **Business Logic Layer (Express + Node.js):** Validates input, executes authentication logic, hashes credentials, and serves structured JSON responses.
3. **Database Layer (MongoDB + Mongoose):** Persists documents in collections with strict schema validation.

---

## Project Folder Structure

The project is organized into two primary workspaces (`client` and `server`):

```text
cp-task-manager/
├── client/                           # Frontend React Application
│   ├── index.html                    # Single-page HTML entry
│   ├── package.json                  # Frontend dependencies and scripts
│   ├── vite.config.js                # Vite build and proxy configuration
│   └── src/
│       ├── main.jsx                  # React DOM root entry
│       ├── App.jsx                   # Primary layout and context consumer
│       ├── App.css                   # Custom application stylesheets
│       ├── components/
│       │   ├── Dashboard.jsx         # Authenticated user view
│       │   ├── LoginForm.jsx         # Login & Register modal/form
│       │   ├── UserSearch.jsx        # Real-time search component
│       │   └── [TaskTracker.jsx]     # [Placeholder: Planned Problem Tracker component]
│       └── context/
│           └── UserContext.jsx       # Context API provider for auth state
│
├── server/                           # Backend Node.js / Express Application
│   ├── package.json                  # Backend dependencies and scripts
│   ├── server.js                     # Server entry, database connection, middleware
│   ├── models/
│   │   ├── User.js                   # Mongoose schema for user accounts
│   │   └── [Problem.js]              # [Placeholder: Planned Mongoose schema for tasks]
│   └── routes/
│       ├── auth.js                   # Authentication routes (/api/auth)
│       └── [problems.js]             # [Placeholder: Planned task CRUD routes]
│
├── docs/                             # Project documentation and assets
│   └── screenshots/                  # [Placeholder: Application screenshots]
│
└── README.md                         # Project documentation
```

> *Note: Bracketed items `[...]` denote planned modules currently scheduled for development.*

---

## Installation and Setup

### Prerequisites

Ensure you have the following installed on your local machine:
- [Node.js](https://nodejs.org/) (Version `18.x` or higher recommended)
- [npm](https://www.npmjs.com/) (bundled with Node.js)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) installed and running locally, or a [MongoDB Atlas](https://www.mongodb.com/atlas) connection URI
- [Git](https://git-scm.com/)

---

### Step-by-Step Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/[YOUR-ORGANIZATION-OR-USERNAME]/[YOUR-REPOSITORY-NAME].git
cd [YOUR-REPOSITORY-NAME]
```

#### 2. Backend Setup
Navigate into the `server` directory and install the necessary dependencies:
```bash
cd server
npm install
```

#### 3. Frontend Setup
Open a second terminal window, navigate into the `client` directory, and install the frontend dependencies:
```bash
cd client
npm install
```

---

### Environment Variables

Currently, the backend defaults to:
- **Port:** `5000`
- **MongoDB Connection:** `mongodb://127.0.0.1:27017/react-hooks-demo`

For production deployment or custom configuration, create a `.env` file in the `server/` root:

```env
# [PLACEHOLDER: Configure your local or cloud environment variables below]
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/cp_task_manager
# JWT_SECRET=[YOUR_OPTIONAL_JWT_SECRET_KEY_HERE]
```

> **Security Note:** Never commit `.env` files or real production credentials to version control. Ensure `.env` is listed inside your `.gitignore`.

---

## How to Run the Project

Both the backend and frontend must be running concurrently for full functionality.

### 1. Start MongoDB
Ensure your local MongoDB daemon is active:
```bash
# Windows (PowerShell/CMD - if configured as a service)
net start MongoDB

# Linux / macOS
sudo systemctl start mongod
```

### 2. Run the Backend Server
From the `server/` folder, run:
```bash
# Development mode with automatic restart on file change
npm run dev

# Or standard production start
npm start
```
*Expected Output:*
```
MongoDB connected
Server running on port 5000
```

### 3. Run the Frontend Client
In a separate terminal, from the `client/` folder, run:
```bash
npm run dev
```
*Expected Output:*
```
  VITE v5.4.9  ready in ... ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

Open your browser and navigate to `http://localhost:3000`.

### Additional Frontend Scripts
- **Production Build:** `npm run build` (generates static assets inside `client/dist/`)
- **Build Preview:** `npm run preview` (previews production build locally)

---

## API Endpoints

The backend exposes the following RESTful API endpoints under `/api/auth`:

| HTTP Method | Endpoint | Request Body | Description | Implemented Status |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | `{"username": "...", "password": "..."}` | Registers a new user account with hashed password. | ✅ Active |
| `POST` | `/api/auth/login` | `{"username": "...", "password": "..."}` | Validates credentials and logs in the user. | ✅ Active |
| `GET` | `/api/auth/users` | *None* | Retrieves a list of registered usernames. | ✅ Active |

### Sample API Requests & Responses

#### User Registration
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "coder123",
  "password": "securepassword"
}
```
*Response (201 Created):*
```json
{
  "message": "User registered successfully"
}
```

#### User Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "coder123",
  "password": "securepassword"
}
```
*Response (200 OK):*
```json
{
  "message": "Login successful",
  "user": {
    "username": "coder123"
  }
}
```

> *Note: Problem task endpoints (`GET /api/problems`, `POST /api/problems`, `PUT /api/problems/:id`, `DELETE /api/problems/:id`) are currently planned and will be documented here once implemented.*

---

## Screenshots

> *Add screenshots of the working user interface once frontend development milestones are completed.*

| View | Screenshot Placeholder |
| :--- | :--- |
| **Authentication Screen** *(Login / Registration)* | `![Authentication Screen](docs/screenshots/auth_page.png)`<br>*(Placeholder: Place screenshot here)* |
| **User Dashboard** | `![User Dashboard](docs/screenshots/dashboard.png)`<br>*(Placeholder: Place screenshot here)* |
| **Problem Task Manager** *(Planned)* | `![Problem Manager Screen](docs/screenshots/problem_tracker.png)`<br>*(Placeholder: Place screenshot here)* |
| **Search & Filtering** | `![Search and Filters](docs/screenshots/search_filter.png)`<br>*(Placeholder: Place screenshot here)* |

---

## Future Enhancements

The following roadmap items represent potential enhancements to be integrated after the core CRUD system is established:

1. **Platform API Integration:** Automatically fetch problem titles and user submission verdicts via the Codeforces Public API and LeetCode GraphQL endpoints.
2. **Spaced Repetition Scheduler:** Implement automated revision reminders (e.g., re-prompt problems after 3 days, 1 week, and 1 month).
3. **Data Visualization:** Integrate Chart.js or Recharts to visualize problem-solving volume over time and difficulty breakdown.
4. **Export & Import Features:** Allow users to export their problem list to CSV/JSON or import from existing spreadsheets.
5. **Dark Mode UI:** Add a persistent dark/light theme toggle tailored for late-night programming sessions.

---

## Team Members & Responsibilities

This project was developed for the **Web Programming** course by:

| Name | Role | Primary Responsibilities | GitHub Profile |
| :--- | :--- | :--- | :--- |
| **[Team Member 1 Name]** | *Frontend Lead* | React component design, state management (`UserContext`), Vite setup | `[@github-handle-1](https://github.com/[PLACEHOLDER-1])` |
| **[Team Member 2 Name]** | *Backend Lead* | Express API routes, authentication logic, bcrypt integration | `[@github-handle-2](https://github.com/[PLACEHOLDER-2])` |
| **[Team Member 3 Name]** | *Database & QA Lead* | Mongoose schemas, database connection, testing, documentation | `[@github-handle-3](https://github.com/[PLACEHOLDER-3])` |

---

## Learning Outcomes

Working on **CP Task Manager** provided practical engineering experience in several core competencies:

- **Full-Stack MERN Architecture:** Understanding how an asynchronous single-page React client communicates with an Express/Node API and MongoDB database.
- **RESTful API Engineering:** Designing semantic HTTP routes (`GET`, `POST`), standard status codes (`200`, `201`, `400`, `500`), and clean request/response lifecycles.
- **Database Modeling & Data Integrity:** Defining Mongoose schemas, handling unique constraints, and implementing Mongoose pre-save middleware for cryptographic hashing.
- **Modern React & Hooks:** Practical application of advanced hooks:
  - `useState` for local component state.
  - `useEffect` for data-fetching and lifecycle side effects.
  - `useContext` for app-wide session management without prop drilling.
  - `useRef` for direct DOM focus manipulation.
  - `useMemo` for computationally efficient client-side filtering.
- **Version Control & Collaboration:** Utilizing Git branching strategies, issue tracking, atomic commits, and team peer reviews on GitHub.

---

## Contributing

Teammates and contributors can contribute using the following workflow:

1. Fork the Project.
2. Create your Feature Branch:
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your Changes with descriptive commit messages:
   ```bash
   git commit -m "feat: add problem filter by difficulty"
   ```
4. Push to the Branch:
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request for review.

---

## License

*This project is submitted as part of the academic coursework for Web Programming.*

```text
[PLACEHOLDER: Select an appropriate license, e.g., MIT License or Academic Coursework License]
Distributed under the MIT License. See LICENSE for more information.
```
