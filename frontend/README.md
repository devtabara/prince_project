# Grace Fellowship Offering Management System

A responsive church finance dashboard built with React and Vite for recording weekly offerings, expenses, balances, and financial summaries.

## Features

- Pastor-only login experience
- Dashboard with summary cards and weekly metrics
- Offering and expense recording forms with validation
- Transaction search and filter controls
- Weekly summary and report sections
- Audit log and administrator settings
- Modern navy-and-gold church finance styling

## Prerequisites

- Node.js 18+
- npm

## Installation

1. Open the frontend folder:
   `cd frontend`
2. Install dependencies:
   `npm install`
3. Create a local environment file:
   `cp .env.example .env`
4. Update the default credentials in `.env` if needed.
5. Start the dev server:
   `npm run dev`

## Environment file

```env
VITE_ADMIN_EMAIL=pastor@church.local
VITE_ADMIN_PASSWORD=change-me
```

## Scripts

```bash
npm run dev
npm run build
npm run preview
```

## Notes

This project is a production-style frontend prototype with sample data stored in React state. It is designed to be connected to a secure backend API with Express and a relational database in a future implementation.
