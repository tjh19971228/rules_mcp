# Python FastAPI Development Guidelines

This document outlines best practices, conventions, and standards for developing APIs and web applications using Python FastAPI.

## Key Principles

- Write concise, technical responses with accurate Python examples
- Use functional, declarative programming; avoid classes where possible
- Prefer iteration and modularization over code duplication
- Use descriptive variable names with auxiliary verbs (e.g., is_active, has_permission)
- Use lowercase with underscores for directories and files (e.g., routers/user_routes.py)
- Favor named exports for routes and utility functions
- Use the Receive an Object, Return an Object (RORO) pattern

## Python/FastAPI Best Practices

- Use `def` for pure functions and `async def` for asynchronous operations
- Use type hints for all function signatures. Prefer Pydantic models over raw dictionaries for input validation
- File structure: exported router, sub-routes, utilities, static content, types (models, schemas)
- Avoid unnecessary curly braces in conditional statements
- For single-line statements in conditionals, omit curly braces
- Use concise, one-line syntax for simple conditional statements (e.g., `if condition: do_something()`)

## Error Handling and Validation

- Prioritize error handling and edge cases:
  - Handle errors and edge cases at the beginning of functions
  - Use early returns for error conditions to avoid deeply nested if statements
  - Place the happy path last in the function for improved readability
  - Avoid unnecessary else statements; use if-return pattern instead
  - Use guard clauses to handle preconditions and invalid states early
  - Implement proper error logging and user-friendly error messages
  - Use custom error types or error factories for consistent error handling

## Project Structure

- Organize APIs with FastAPI's Router for better code organization and maintainability
- Use dependency injection for shared resources and cross-cutting concerns
- Implement proper middleware for request/response processing
- Use the lifespan context manager for application startup and shutdown events
- Implement proper error handlers for different types of exceptions
- Use Pydantic for data validation, serialization, and documentation

## Database Interaction

- Use SQLAlchemy or Tortoise-ORM for database operations
- Implement database migrations using Alembic
- Prefer async database drivers for better performance
- Use connection pooling for database connections
- Implement proper database session management

## Authentication and Authorization

- Implement OAuth2 with Password flow, JWT, or other secure authentication methods
- Use FastAPI's security utilities for protecting routes that require authentication
- Implement proper role-based access control (RBAC) for authorization

## Performance Optimization

- Minimize blocking I/O operations; use asynchronous operations for all database calls and external API requests
- Implement caching for static and frequently accessed data
- Optimize data serialization and deserialization with Pydantic
- Use lazy loading techniques for large datasets and substantial API responses

## Testing

- Write unit tests using pytest
- Use FastAPI's TestClient for integration testing
- Implement test fixtures for database and application setup
- Use pytest-asyncio for testing asynchronous code

## API Documentation

- Use FastAPI's built-in Swagger UI and ReDoc for API documentation
- Ensure all endpoints are properly documented with request/response schemas
- Use proper tags and descriptions for organizing API documentation

## Microservices and Serverless

- Design services to be stateless; leverage external storage and caches for state persistence
- Implement API gateways and reverse proxies for handling traffic to microservices
- Use circuit breakers and retries for resilient service communication
- Optimize FastAPI apps for serverless environments by minimizing cold start times
- Use distributed tracing for monitoring microservices architectures

## Deployment

- Use Uvicorn or Hypercorn as ASGI server
- Implement proper logging and monitoring in production
- Use environment variables for sensitive information and configuration
- Consider containerization with Docker for consistent deployment environments

## Key Dependencies

- FastAPI
- Pydantic v2
- SQLAlchemy or Tortoise-ORM
- Alembic (for database migrations)
- Async database libraries (asyncpg, aiomysql)
- JWT libraries for authentication
- Pytest and pytest-asyncio for testing
- Uvicorn or Hypercorn for deployment

## Advanced Concepts

- Implement real-time capabilities with WebSockets
- Use background tasks for time-consuming operations
- Implement file uploads and downloads with proper streaming
- Use custom middleware for request/response processing
- Implement proper rate limiting and throttling 