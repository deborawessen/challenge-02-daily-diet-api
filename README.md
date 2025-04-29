# 🥗 Daily Diet API

This is an API developed during the Ignite Node.js track by Rocketseat, as part of Challenge 02.

The Daily Diet API allows users to register their daily meals, track their diet habits, and manage meals efficiently.

## 📋 Features

- Create a user
- Authenticate and identify user between requests
- Register a meal (name, description, date/time, and diet status)
- Edit a meal
- Delete a meal
- List all meals for a user
- View a single meal
- Retrieve user metrics:
  - Total number of meals
  - Number of meals within the diet
  - Number of meals outside the diet
  - Best sequence of meals within the diet

## 🔧 Technologies

- Node.js
- Fastify
- TypeScript
- Knex.js (SQL query builder)
- SQLite (database)
- Vitest (for testing)
- Zod (validation library)
- dotenv (environment variable management)

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [npm](https://www.npmjs.com/)
- [SQLite3](https://www.sqlite.org/index.html)

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/deborawessen/challenge-02-daily-diet-api.git
cd challenge-02-daily-diet-api
npm install
```

### Setup environment variables

Create a `.env` file based on the `.env.example` file:

```bash
cp .env.example .env
````
Made with 💜 by Debora Wessen
