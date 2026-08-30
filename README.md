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
| `npm test`        | Run unit tests with Vitest               |
| `npm run test:ui` | Run tests with Vitest UI dashboard       |

## Unit Testing

SpendWise uses **Vitest** and **React Testing Library** for unit testing.

### Test Setup

The project includes comprehensive unit tests for components, hooks, and utilities:

- **Component tests** (`*.test.tsx`): Verify rendering, props, and user interactions
- **Hook tests** (`*.test.tsx`): Test custom React hooks
- **Utility tests** (`*.test.ts`): Validate pure functions and data transformations

### Running Tests

```bash
# Run all tests
npm test

# Run tests in UI mode (interactive dashboard)
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

### Testing Patterns

The project follows these key testing patterns:

1. **Component Rendering**: Verify components render without errors
2. **DOM Elements**: Check for expected elements and content
3. **User Interactions**: Test form submissions, clicks, and input changes
4. **Props Testing**: Verify components behave correctly with different props
5. **Mock Functions**: Ensure callbacks are called with correct arguments
6. **Async Operations**: Handle asynchronous flows and API calls
7. **Utility Functions**: Test pure functions and data transformations
8. **Conditional Rendering**: Test loading states and conditional UI

### Resources

For detailed testing examples and patterns, see:

- [TESTING_GUIDE.md](TESTING_GUIDE.md) - Comprehensive guide with examples for all testing patterns
- [TESTING_CHEATSHEET.md](TESTING_CHEATSHEET.md) - Quick reference for common test patterns

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
