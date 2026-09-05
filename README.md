# SpendWise

SpendWise is a full-stack expense-tracking application built to help users monitor spending, manage categories, and review monthly financial activity. The project combines a Vite + React front end with an Express + MongoDB API for persistent expense and category data.

## What is included

- **Dashboard**: total balance, monthly spending, budget progress, and recent transactions.
- **Transactions**: browse expenses grouped by today, yesterday, this month, or older; filter by date.
- **Add expense**: enter an amount, choose a category, set a date, and add a note.
- **Categories**: review category budgets and manage category creation from the UI.
- **Analytics**: dedicated analytics section ready for chart-based insights.
- **Profile**: profile area accessible from the header and bottom navigation.
- **Responsive layout**: shared navigation, forms, cards, and Sass styling designed for smaller screens.
- **Backend API**: Express routes for expenses and categories connected to MongoDB.

## Tech stack

### Frontend

- React 19 and TypeScript
- Vite
- React Router
- Sass modules and shared Sass variables
- React Icons
- React Hook Form and TanStack Query
- Recharts for charting

### Backend

- Node.js
- Express
- MongoDB with Mongoose
- CORS and dotenv configuration

## Project structure

```text
SpendWise/
├── src/                 # React app source
│   ├── components/      # UI components
│   ├── pages/           # Route layouts and page shells
│   ├── styles/          # Sass styles
│   ├── App.tsx          # App routes
│   └── main.tsx         # Frontend bootstrap
├── server/              # Express + MongoDB backend
│   ├── models/          # Expense and Category schemas
│   ├── index.ts         # API server entry point
│   └── package.json     # Server dependencies and scripts
├── public/              # Static assets
├── package.json         # Frontend scripts and dependencies
├── vite.config.ts      # Vite configuration
├── README.md            # Project documentation
├── TESTING_GUIDE.md     # Testing guide
├── TESTING_CHEATSHEET.md # Quick testing reference
└── eslint.config.js    # ESLint configuration
```

## Getting started

### Prerequisites

- Node.js and npm
- MongoDB running locally or a MongoDB connection string

### 1) Install frontend dependencies

```bash
git clone <repository-url>
cd SpendWise
npm install
```

### 2) Install backend dependencies

```bash
cd server
npm install
```

### 3) Configure the server environment

Create a `.env` file inside the `server` folder with the following values:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/spendwise
```

If you use a different MongoDB host or database name, update the connection string accordingly.

### 4) Run the app

Start the backend in one terminal:

```bash
cd server
npm run dev
```

Start the frontend in another terminal:

```bash
cd SpendWise
npm run dev
```

The frontend will usually run on `http://localhost:5173`, and the API will run on `http://localhost:5000`.

## Available scripts

### Frontend

| Script            | Purpose                                  |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start the Vite development server        |
| `npm run build`   | Type-check and create a production build |
| `npm run lint`    | Run ESLint                               |
| `npm run preview` | Serve the production build locally       |
| `npm test`        | Run unit tests with Vitest               |
| `npm run test:ui` | Run tests with Vitest UI dashboard       |

### Backend

| Script        | Purpose                               |
| ------------- | ------------------------------------- |
| `npm run dev` | Start the Express API with hot reload |

## Backend API overview

The server exposes CRUD-style routes for expense and category management.

### Expense endpoints

- `GET /api/expenses` — fetch all expenses ordered by date descending
- `GET /api/transactions/last` — fetch the last 3 expenses
- `GET /api/expenses/total/month` — get total spending for the current month
- `GET /api/expenses/total/week` — get total spending for the current week
- `POST /api/expenses` — create a new expense
- `DELETE /api/expenses/:id` — delete an expense

### Category endpoints

- `GET /api/categories` — fetch all categories
- `GET /api/categories/:name/color` — get a category color by name
- `POST /api/categories` — create a new category
- `DELETE /api/categories/:id` — delete a category

## Main routes

| Route             | View          |
| ----------------- | ------------- |
| `/`               | Dashboard     |
| `/report`         | Report        |
| `/analytics`      | Analytics     |
| `/addExpense`     | Add expense   |
| `/transactions`   | Transactions  |
| `/listCategories` | Category list |
| `/addCategory`    | Add category  |
| `/profile`        | Profile       |

## Unit Testing

SpendWise uses **Vitest** and **React Testing Library** for unit testing.

### Test Setup

The project includes unit tests for components, hooks, and utilities:

- **Component tests** (`*.test.tsx`): verify rendering, props, and user interactions
- **Hook tests** (`*.test.tsx`): test custom React hooks
- **Utility tests** (`*.test.ts`): validate pure functions and data transformations

### Running Tests

```bash
# Run all tests
npm test

# Run tests in UI mode (interactive dashboard)
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

### Resources

- [TESTING_GUIDE.md](TESTING_GUIDE.md) - comprehensive testing examples and patterns
- [TESTING_CHEATSHEET.md](TESTING_CHEATSHEET.md) - quick reference for common test patterns

## Current status

The frontend is actively built around a responsive spending dashboard, while the server handles persisted expense and category records in MongoDB. Some screens still work with local sample data during UI development, but the backend is in place for real data storage and API-driven flows.

## Development notes

When adding a new view, register its route in `src/App.tsx`, reuse the shared layout components in `src/pages`, and keep page-specific styles near their owning component. Run `npm run lint` and `npm run build` before opening a pull request, and make sure the backend is running when testing API-connected features.
