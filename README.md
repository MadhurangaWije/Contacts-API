# Contacts Management API

A modern REST API for managing contacts built with NestJS, PostgreSQL, and Docker.

## Author
Kanishka Wijesekara

## 🚀 Features

- CRUD operations for contacts management
- Data validation and sanitization
- Containerized application with Docker
- PostgreSQL database integration
- Swagger API documentation
- Postman collection included

## 🏗️ Architecture

The project follows a clean, modular architecture based on NestJS framework:


### Key Components:

- **Controllers**: Handle HTTP requests and define API endpoints
- **Services**: Contain business logic and database operations
- **DTOs**: Define data shapes for requests/responses
- **Entities**: Define database models
- **Modules**: Organize application components

## 💾 Database Schema

### Contact Entity

```sql
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  mobileNumber VARCHAR(20),
  homeNumber VARCHAR(20),
  address TEXT,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```


## 🔄 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /contacts | Get all contacts |
| GET | /contacts/:id | Get contact by ID |
| POST | /contacts | Create new contact |
| PATCH | /contacts/:id | Update contact |
| DELETE | /contacts/:id | Delete contact |

## 🐳 Docker Setup

The application is containerized using Docker Compose with two services:

1. **API Service**
2. **PostgreSQL Service**

## 🚀 Getting Started

1. Clone the repository
```bash
git clone <repository-url>
```

2. Start the containers
```bash
docker-compose up -d
```

3. The API will be available at `http://localhost:3000`


## 📚 API Documentation

- Swagger UI: `http://localhost:3000/api`
- Postman Collection: Available in `postman/contacts-api-collection.json`

## 🛠️ Technologies Used

- **Framework**: NestJS
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **API Documentation**: Swagger/OpenAPI
- **Containerization**: Docker & Docker Compose
- **Testing**: Jest
- **Validation**: class-validator & class-transformer

## 📝 Environment Variables

Create a `.env` file in the root directory:

```bash
env
Database
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=contacts_db
API
PORT=3000
NODE_ENV=development
```

## 🧪 Running Tests

```bash
Unit tests
npm run test
E2E tests
npm run test:e2e
Test coverage
npm run test:cov
```
## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.