# SpendWise

SpendWise is a focused expense-tracking interface for understanding daily spending at a glance. The current build is a Vite-powered React prototype with a dashboard, transaction flow, category budgets, and profile navigation.

## What is included

- **Dashboard**: total balance, monthly spending, budget progress, and recent transactions.
- **Transactions**: browse expenses grouped by today, yesterday, this month, or older; filter by date.
- **Add expense**: enter an amount, choose a category, set a date, and add a note.
- **Categories**: review category budgets and open the form for a new category.
- **Analytics**: dedicated route ready for the analytics view.
- **Profile**: profile area available from the header and bottom navigation.
- **Responsive layout**: shared header, navigation, forms, cards, and Sass styling for smaller screens.

## Tech stack

- React 19 and TypeScript
- Vite
- React Router
- Sass modules and shared Sass variables
- React Icons
- React Hook Form and TanStack Query dependencies for upcoming data flows

## Getting started

### Prerequisites

- Node.js and npm

### Install and run

```bash
git clone <repository-url>
cd SpendWise
npm install
npm run dev
```

Vite will print the local development URL in the terminal, normally `http://localhost:5173`.

## Available scripts

| Script            | Purpose                                  |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start the Vite development server        |
| `npm run build`   | Type-check and create a production build |
| `npm run lint`    | Run ESLint                               |
| `npm run preview` | Serve the production build locally       |

## Main routes

| Route             | View          |
| ----------------- | ------------- |
| `/`               | Dashboard     |
| `/analytics`      | Analytics     |
| `/addExpense`     | Add expense   |
| `/transactions`   | Transactions  |
| `/listCategories` | Category list |
| `/addCategory`    | Add category  |
| `/profile`        | Profile       |

## Project structure

```text
src/
├── components/       # Dashboard, expenses, categories, analytics, and navigation UI
├── pages/             # Shared page layouts and route shells
├── styles/            # Shared Sass variables, mixins, and component styles
├── App.tsx            # Application routes
└── main.tsx           # React entry point
```

## Current status

The front end currently uses local sample data so the screens can be explored without an API or database. Submitting the expense and category forms is wired to the UI, but persistence and backend validation are not implemented yet. The analytics route is present as a view placeholder and is ready for its chart content.

## Development notes

When adding a new view, register its route in `src/App.tsx`, reuse the shared layout components in `src/pages`, and keep page-specific styles near their owning component. Run `npm run lint` and `npm run build` before opening a pull request.
