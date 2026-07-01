# 🎯 Full-Stack Task Management Dashboard

A modern, responsive full-stack task manager featuring secure token-based user authentication, state persistence, and a centralized relational database architecture.

---

## 🚀 Features

* **Secure Registration & Login:** Password hashing using `bcryptjs` before committing data to the disk.
* **JWT Authentication:** Stateless user session management with signed JSON Web Tokens stored locally in the browser (`localStorage`).
* **Relational Database Storage:** Structured user account mapping built entirely on PostgreSQL.
* **Modern UI Architecture:** Responsive view handling compiled cleanly with React and Vite.

---

## 🛠️ Tech Stack

### Backend Architecture
* **Runtime Environment:** Node.js
* **Server Framework:** Express.js
* **Database Driver:** `pg` (PostgreSQL client pool)
* **Encryption Utilities:** `bcryptjs`, `jsonwebtoken` (JWT)

### Frontend Engine
* **UI Library:** React (Functional components & hooks)
* **Build Bundler:** Vite
* **Asynchronous Networking:** Fetch API

---

## 💻 Local Installation & Setup

### 1. Database Setup
Ensure you have **PostgreSQL** running locally, and initialize your data layout:
```sql
CREATE DATABASE task_manager;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);