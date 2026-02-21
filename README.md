# Car Store Application

A full-stack web application built with the P.E.R.N. stack (PostgreSQL, Express, React, Node.js) for managing and displaying a car inventory.

## Overview

This project demonstrates a modern full-stack architecture with a React frontend and Node.js/Express backend, connected to a PostgreSQL database. The application fetches car data from an API and displays it in an interactive user interface.

## Tech Stack

**Frontend:**
- React with TypeScript
- Modern component-based architecture
- Type-safe prop handling with interfaces

**Backend:**
- Node.js runtime
- Express.js framework
- RESTful API design

**Database:**
- PostgreSQL
- Structured data models for car inventory

**Development Tools:**
- npm package manager
- WebStorm IDE support
- Git version control

## Project Structure

```
P.E.R.N/
├── 01_nodejs/               # Node.js basics
├── 02_expressjs/            # Express server setup
├── 03_postgresql/           # Database configuration and schema
├── 04_reactjs/              # React frontend application
│   └── pern/
│       ├── src/
│       │   ├── Components/
│       │   │   └── Car.tsx          # Car display component
│       │   ├── App.tsx              # Main application component
│       │   └── main.tsx
│       └── package.json
└── README.md
```

## Features

- Fetch car data from REST API endpoint
- Display cars in a responsive list format
- Type-safe React components with TypeScript
- Error handling for API requests
- Unique key management for list rendering
- PostgreSQL database integration with Drizzle ORM

## Getting Started

### Prerequisites

- Node.js installed
- npm package manager
- PostgreSQL database running

### Installation

Navigate to the React application directory:

```bash
cd 04_reactjs/pern
npm install
```

For backend setup, navigate to the Express directory:

```bash
cd 02_expressjs
npm install
```

And for database setup:

```bash
cd 03_postgresql
npm install
```

### Running the Application

**Frontend:**
```bash
cd 04_reactjs/pern
npm run dev
```

**Backend:**
```bash
cd 02_expressjs
npm start
```

**Database:**
```bash
cd 03_postgresql
npm start
```

## API Endpoints

**GET** `/api/v1/cars`
- Returns array of car objects
- Each car contains: `id`, `make`, `model`, `year`, `price`

## Data Model

Cars are represented with the following structure:

```typescript
interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
}
```

## Development

The project uses TypeScript for type safety and follows React best practices including:
- Functional components with hooks
- Proper prop typing with interfaces
- Effect hooks for data fetching
- Error handling in API calls
- Database schema management with Drizzle

## Database Schema

The project uses Drizzle ORM for database management with PostgreSQL. Schema definitions are located in `03_postgresql/schema.js`.

## License

MIT

