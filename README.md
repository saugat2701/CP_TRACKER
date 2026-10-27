
<div align="center">

# CP Task Manager

### A focused workspace for competitive programming.

Organize your coding journey, manage your account, and keep your competitive programming practice structured in one place.

[View Repository](https://github.com/saugat2701/CP_TRACKER)

</div>

---

## Overview

**CP Task Manager** is a full-stack web application designed to support competitive programmers in organizing their practice workflow.

Built with the MERN stack, the platform provides user authentication, a personalized dashboard, and user discovery through username search. Its modular architecture establishes the foundation for a centralized problem-tracking experience.

## Features

- **User Authentication** — Register and sign in with password hashing using bcrypt.
- **Personalized Dashboard** — Access an authenticated user interface with logout functionality.
- **User Discovery** — Search and filter registered usernames.
- **Centralized Workspace** — A dedicated application structure for competitive programming workflows.
- **Modular Architecture** — Separate frontend and backend applications for maintainability and extensibility.

## Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | React 18, Vite |
| Styling | CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | bcrypt |
| Development | JavaScript, REST APIs, Git |

## Architecture

CP Task Manager follows a three-layer architecture that separates presentation, application logic, and data persistence.

```text
┌──────────────────────────────┐
│       React Frontend         │
│    UI · State Management     │
└──────────────┬───────────────┘
               │ HTTP / JSON
               ▼
┌──────────────────────────────┐
│      Node.js + Express       │
│    API · Authentication     │
└──────────────┬───────────────┘
               │ Mongoose
               ▼
┌──────────────────────────────┐
│          MongoDB             │
│       Persistent Data        │
└──────────────────────────────┘
```

### Project Structure

```text
CP_TRACKER/
├── client/       # React frontend
├── server/       # Express backend
├── package.json  # Root project configuration
└── README.md
```

## Development Status

The current application establishes the authentication and dashboard foundation. Advanced problem-management functionality, including problem CRUD operations, difficulty-based organization, revision tracking, and progress analytics, remains subject to implementation.

## Team

Developed collaboratively by the project team.

| Contributor | GitHub |
|---|---|
| Saugat | [@saugat2701](https://github.com/saugat2701) |
| Rohit | [@guptarohit07](https://github.com/guptarohit07) |
| Shubham | [@shubham201207](https://github.com/shubham201207) |
| Rithweek | [@Rithweek1](https://github.com/Rithweek1) |

---

<div align="center">

**CP Task Manager** · Built for a more structured competitive programming journey.

</div>
