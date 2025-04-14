# PHP Laravel Development Guidelines

This document outlines best practices, conventions, and standards for developing web applications using Laravel framework.

## Key Principles

- Write concise, technical responses with accurate PHP examples
- Follow Laravel best practices and conventions
- Use object-oriented programming with a focus on SOLID principles
- Favor iteration and modularization over duplication
- Use descriptive variable, method, and file names
- Follow Laravel's directory structure conventions
- Prioritize dependency injection and service containers

## PHP/Laravel Best Practices

- Leverage PHP 8.1+ features (e.g., readonly properties, match expressions, enums)
- Apply strict typing: `declare(strict_types=1);`
- Follow PSR-12 coding standards for PHP
- Use Laravel's built-in features and helpers (e.g., `Str::` and `Arr::`)
- File structure: Adhere to Laravel's MVC architecture and directory organization
- Implement error handling and logging:
  - Use Laravel's exception handling and logging tools
  - Create custom exceptions when necessary
  - Apply try-catch blocks for predictable errors
- Use Laravel's request validation and middleware effectively
- Implement Eloquent ORM for database modeling and queries
- Use migrations and seeders to manage database schema changes and test data

## Project Structure

- Organize code into logical directories following Laravel's conventions:
  - Controllers in app/Http/Controllers
  - Models in app/Models
  - Migrations in database/migrations
  - Views in resources/views
  - Routes in routes directory
  - Services in app/Services
  - Repositories in app/Repositories (if using repository pattern)
- Group related functionality into modules or domains when appropriate
- Keep controllers thin, moving business logic to services or dedicated classes
- Use proper namespacing to organize code

## Coding Style and Conventions

- Follow Laravel naming conventions:
  - Controllers: PascalCase, singular, suffixed with "Controller" (e.g., UserController)
  - Models: PascalCase, singular (e.g., User)
  - Migrations: snake_case, descriptive of action (e.g., create_users_table)
  - Database tables: snake_case, plural (e.g., users)
  - Routes: kebab-case for URLs, snake_case for route names
- Use meaningful variable and method names that describe their purpose
- Keep methods small and focused on a single responsibility
- Use type declarations for method parameters and return types
- Document complex methods with PHPDoc comments

## Database Design and ORM Usage

- Design models carefully; follow database normalization principles
- Use model relationships (hasMany, belongsTo, belongsToMany, etc.) appropriately
- Leverage Laravel's migration system for database schema changes
- Optimize query performance using eager loading (with) for related models
- Use database transactions for data integrity
- Implement proper indexes for frequently queried fields
- Use query scopes for commonly used query constraints
- Implement model factories for testing and seeding

## Eloquent ORM Best Practices

- Define proper relationships between models
- Use mass assignment protection with $fillable or $guarded
- Implement model accessors and mutators for data transformations
- Use model events for side effects (e.g., creating related records)
- Create reusable query scopes for common queries
- Use eager loading to avoid N+1 query problems
- Implement soft deletes for recoverable data
- Use proper model observers for complex event handling

## API Design and Implementation

- Design RESTful APIs following Laravel conventions
- Use Laravel API resources for data transformation
- Implement proper versioning strategy
- Use appropriate HTTP status codes and response formats
- Implement proper authentication and authorization
- Document APIs for easier frontend integration
- Use API resource collections for listing resources
- Implement pagination for large data sets

## Form Handling and Validation

- Use Form Request classes for complex validation rules
- Implement reusable validation rules when appropriate
- Provide clear validation error messages
- Use Laravel's validation features:
  - Built-in validation rules
  - Custom validation rules
  - After validation hooks
- Handle file uploads securely

## Authentication and Authorization

- Use Laravel Sanctum for API authentication
- Implement Laravel's built-in authentication system for web applications
- Use Gates and Policies for authorization
- Implement proper permission checking
- Use middleware for route protection
- Implement proper password policies
- Handle session management securely

## Error Handling and Logging

- Create custom exception handlers for domain-specific errors
- Use logging for important events and errors
- Implement proper error reporting
- Show user-friendly error messages
- Log detailed information for debugging
- Use proper exception types for different scenarios
- Implement proper monitoring for production environments

## Performance Optimization

- Use Laravel's cache system for expensive operations
- Implement query optimization:
  - Use proper indexes
  - Eager load related models
  - Use query builders for complex queries
- Optimize asset delivery using Laravel Mix or Vite
- Use queue system for long-running tasks
- Implement proper caching strategies:
  - Application cache
  - Database query cache
  - Route cache
  - Config cache
- Use lazy loading of services when appropriate
- Implement Redis or Memcached for high-performance caching

## Testing

- Write comprehensive tests:
  - Unit tests for individual components
  - Feature tests for API endpoints
  - Browser tests for frontend interactions
- Use PHPUnit for testing
- Implement proper testing database configuration
- Use factories and seeders for test data
- Test both happy paths and edge cases
- Implement continuous integration for automated testing

## Security Best Practices

- Follow OWASP security guidelines
- Implement proper input validation and sanitization
- Use CSRF protection for forms
- Implement proper authentication and authorization
- Keep dependencies up to date
- Use prepared statements for database queries
- Implement proper password hashing
- Use HTTPS for all production environments
- Implement proper session management
- Use Laravel's security features:
  - CSRF protection
  - XSS protection
  - SQL injection prevention
  - Rate limiting
  - Secure cookie handling

## Deployment and DevOps

- Implement proper deployment strategies
- Use environment-specific configurations
- Implement continuous integration and delivery
- Use proper monitoring and logging in production
- Implement database backup and recovery procedures
- Use deployment tools such as Laravel Forge, Envoyer, or GitHub Actions
- Implement proper server configuration and optimization

## Additional Best Practices

- Use Laravel's event and listener system for decoupled code
- Implement Laravel's scheduled tasks for recurring operations
- Use Laravel's notification system for user notifications
- Implement proper logging and error monitoring
- Use Laravel's localization features for multi-language support
- Implement proper database backups and recovery procedures
- Use Laravel's queue system for background processing
- Implement proper caching strategies for performance optimization
- Use Laravel's rate limiting for API protection
- Implement proper monitoring and alerting for production environments
- Keep up with Laravel's best practices and new features 