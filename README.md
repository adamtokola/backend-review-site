# Backend Review Site

A backend API for a review site, built with Node.js, Express, Sequelize, and PostgreSQL.

## Features

- User authentication (register, login)
- CRUD operations for reviews, items, and comments
- Sequelize ORM for database management
- PostgreSQL as the database

---

## Prerequisites

- Node.js (v16 or later)
- PostgreSQL (v14 or later)
- Git

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/adamtokola/backend-review-site
cd backend-review-site
```

---

### Install Dependencies

```bash
npm install
```

---

### Environment Configuration

1. Create a `.env` file in the root directory.
2. Add the following environment variables:

    ```plaintext
    BASE_URL=http://localhost:3000
    JWT_SECRET=your_secret_key
    ```

---

## Database Setup

### Windows

1. Install PostgreSQL from [PostgreSQL Downloads](https://www.postgresql.org/download/).
2. Open `pgAdmin` or connect via CLI.
3. Create a database named `review_site_db`:

    ```sql
    CREATE DATABASE review_site_db;
    ```

4. Verify that the database is created:

    ```sql
    \l
    ```

5. Update `config/config.json` with your PostgreSQL credentials:

    ```json
    {
      "development": {
        "username": "your_postgres_user",
        "password": "your_postgres_password",
        "database": "review_site_db",
        "host": "127.0.0.1",
        "dialect": "postgres"
      }
    }
    ```

6. Run the migrations and seed the database:

    ```bash
    npx sequelize-cli db:migrate
    npx sequelize-cli db:seed:all
    ```

---

### Mac

1. Install PostgreSQL using Homebrew:

    ```bash
    brew install postgresql
    brew services start postgresql
    ```

2. Create a database:

    ```bash
    createdb review_site_db
    ```

3. Verify that the database is created:

    ```bash
    psql -U postgres -d review_site_db
    \l
    ```

4. Update `config/config.json` with your PostgreSQL credentials:

    ```json
    {
      "development": {
        "username": "your_postgres_user",
        "password": null,
        "database": "review_site_db",
        "host": "127.0.0.1",
        "dialect": "postgres"
      }
    }
    ```

5. Run the migrations and seed the database:

    ```bash
    npx sequelize-cli db:migrate
    npx sequelize-cli db:seed:all
    ```

---

## Running the Server

Start the server using `nodemon`:

```bash
nodemon app/app.js
```

The server will start at [http://localhost:3000](http://localhost:3000).

---

## API Endpoints

### Authentication

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login with email and password

### Items

- `GET /api/items`: List all items
- `GET /api/items/:itemId`: Get details of a specific item

### Reviews

- `GET /api/items/:itemId/reviews`: Get reviews for an item
- `POST /api/items/:itemId/reviews`: Add a review (authenticated)

### Comments

- `POST /api/items/:itemId/reviews/:reviewId/comments`: Add a comment (authenticated)

---

## Troubleshooting

### Common Issues

- **Database connection issues**:
  Ensure your PostgreSQL server is running and your credentials in `config/config.json` are correct.

- **Migrations not applied**:
  Run the following to reset and reapply migrations:
  ```bash
  npx sequelize-cli db:migrate:undo:all
  npx sequelize-cli db:migrate
  ```
