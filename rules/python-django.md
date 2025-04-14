# Python Django Development Guidelines

This document outlines best practices, conventions, and standards for developing web applications using Python Django.

## Key Principles

- Write clear, technical responses with precise Django examples
- Use Django's built-in features and tools wherever possible to leverage its full capabilities
- Prioritize readability and maintainability; follow Django's coding style guide (PEP 8 compliance)
- Use descriptive variable and function names; adhere to naming conventions (e.g., lowercase with underscores for functions and variables)
- Structure your project in a modular way using Django apps to promote reusability and separation of concerns

## Django/Python Best Practices

- Use Django's class-based views (CBVs) for more complex views; prefer function-based views (FBVs) for simpler logic
- Leverage Django's ORM for database interactions; avoid raw SQL queries unless necessary for performance
- Use Django's built-in user model and authentication framework for user management
- Utilize Django's form and model form classes for form handling and validation
- Follow the MVT (Model-View-Template) pattern strictly for clear separation of concerns
- Use middleware judiciously to handle cross-cutting concerns like authentication, logging, and caching

## Project Structure

- Organize code into Django apps based on functionality
- Keep apps small and focused on a single responsibility
- Use Django's URL dispatcher (urls.py) to define clear and RESTful URL patterns
- Keep business logic in models and forms; keep views light and focused on request handling
- Use Django's template system for rendering HTML
- Use Django REST Framework for building APIs

## Error Handling and Validation

- Implement error handling at the view level and use Django's built-in error handling mechanisms
- Use Django's validation framework to validate form and model data
- Prefer try-except blocks for handling exceptions in business logic and views
- Customize error pages (e.g., 404, 500) to improve user experience and provide helpful information
- Use Django signals to decouple error handling and logging from core business logic

## Database Design and ORM Usage

- Design models carefully; follow database normalization principles
- Use model relationships (ForeignKey, ManyToMany, OneToOne) appropriately
- Leverage Django's migration system for database schema changes
- Optimize query performance using select_related and prefetch_related for related object fetching
- Use Django's database transaction management for data integrity
- Implement proper indexes for frequently queried fields

## Authentication and Authorization

- Use Django's built-in authentication system for user management
- Implement proper permission checking using Django's permission system
- Use Django's built-in session management for user sessions
- Implement proper password hashing and security measures
- Use Django's CSRF protection for form submissions

## Performance Optimization

- Use Django's cache framework with backend support (e.g., Redis or Memcached) to reduce database load
- Implement database indexing and query optimization techniques for better performance
- Use asynchronous views and background tasks (via Celery) for I/O-bound or long-running operations
- Optimize static file handling with Django's static file management system (e.g., WhiteNoise or CDN integration)
- Use Django's debug toolbar for identifying performance bottlenecks

## Testing

- Write unit tests for models, forms, and views
- Use Django's TestCase for tests that require database access
- Implement integration tests for testing the interaction between different parts of the application
- Use Django's test client for simulating HTTP requests
- Implement continuous integration for running tests automatically

## Security

- Apply Django's security best practices (e.g., CSRF protection, SQL injection protection, XSS prevention)
- Keep Django and its dependencies up to date to avoid security vulnerabilities
- Use HTTPS for all communication
- Implement proper input validation and sanitization
- Follow the principle of least privilege for user permissions

## Deployment

- Use WSGI/ASGI servers (e.g., Gunicorn, Daphne) for serving Django applications
- Use Django's settings module to manage different environments (development, testing, production)
- Use environment variables for sensitive information (e.g., API keys, database credentials)
- Implement proper logging and monitoring in production
- Use containerization (e.g., Docker) for consistent deployment environments

## Key Dependencies

- Django
- Django REST Framework (for API development)
- Celery (for background tasks)
- Redis (for caching and task queues)
- PostgreSQL or MySQL (preferred databases for production)
- Whitenoise (for static file serving)
- Django Debug Toolbar (for development debugging)

## Documentation

- Document your code using docstrings
- Keep a comprehensive README file
- Use Django's built-in admin documentation
- Document API endpoints if you're building an API
- Keep documentation up to date as the codebase evolves 