# 💰 Expense Tracker

A modern, full-stack expense management application built with React, Vite, Node.js, and Neon PostgreSQL. Track your spending, visualize expenses by category, and manage your finances with ease.

![Expense Tracker Dashboard](https://via.placeholder.com/1200x600/6C63FF/FFFFFF?text=Expense+Tracker+Dashboard)

## ✨ Features

### Core Functionality

- 📊 **Interactive Dashboard** - Real-time spending overview with key metrics
- 📝 **Expense Management** - Create, read, update, and delete expenses
- 🏷️ **Category System** - Custom categories with automatic expense organization
- 📈 **Visual Analytics** - Spending breakdown by category with beautiful charts
- 🔍 **Smart Filtering** - Filter expenses by category, date range, and search terms
- 💾 **Cloud Storage** - All data persisted in Neon PostgreSQL database
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile

### Technical Highlights

- ⚡ **Vite.js** - Lightning-fast development and build times
- 🎨 **Sass** - Modular, maintainable styles with variables and mixins
- 🗄️ **Prisma ORM** - Type-safe database operations with PostgreSQL
- 🔄 **Real-time Updates** - Auto-refreshing data with React Context
- 🛡️ **Input Validation** - Zod schema validation on backend
- 📦 **RESTful API** - Clean, well-structured API endpoints

## 🚀 Tech Stack

### Frontend

- **React 18** - UI Library
- **Vite** - Build Tool
- **Sass** - CSS Preprocessor
- **React Context** - State Management
- **date-fns** - Date Utilities
- **React Icons** - Icon Library

### Backend

- **Node.js** - Runtime Environment
- **Express** - Web Framework
- **Prisma** - ORM
- **PostgreSQL (Neon)** - Database
- **Zod** - Schema Validation
- **CORS** - Cross-Origin Resource Sharing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Git**
- **Neon PostgreSQL Account** (free tier available at [neon.tech](https://neon.tech))

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/expense-tracker.git
cd expense-tracker
```

### 2. Front

# Navigate to frontend directory (from root)

cd ../frontend

# Install dependencies

npm install

# Copy environment variables

cp .env.example .env

# Update .env with your backend API URL

# VITE_API_URL=http://localhost:5000/api

### 3. Backend

# Navigate to backend directory

cd backend

# Install dependencies

npm install

# Copy environment variables

cp .env.example .env

# Update .env with your Neon PostgreSQL database URL

# DATABASE_URL="postgresql://username:password@host/database?sslmode=require"

# Run Prisma migrations

npx prisma migrate dev --name init

# Generate Prisma client

npx prisma generate

# Seed default categories (optional)

npm run db:seed
