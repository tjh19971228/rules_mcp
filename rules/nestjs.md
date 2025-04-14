# NestJS Development Guidelines

## Specific to NestJS

### Basic Principles

- Use modular architecture
- Encapsulate the API in modules
  - One module per main domain/route
  - One controller for its route
  - And other controllers for secondary routes
  - A models folder with data types
    - DTOs validated with class-validator for inputs
    - Declare simple types for outputs
  - A services module with business logic and persistence
    - Entities with MikroORM for data persistence
    - One service per entity
  - A core module for nest artifacts
    - Global filters for exception handling
    - Global middlewares for request management
    - Guards for permission management
    - Interceptors for request management
  - A shared module for services shared between modules
    - Utilities
    - Shared business logic

### Testing

- Use the standard Jest framework for testing
- Write tests for each controller and service
- Write end to end tests for each api module
- Add a admin/test method to each controller as a smoke test

## TypeScript Implementation for NestJS

### Basic Principles

- Use English for all code and documentation
- Always declare the type of each variable and function (parameters and return value)
- Avoid using any
- Create necessary types
- Use JSDoc to document public classes and methods
- Don't leave blank lines within a function
- One export per file

### Nomenclature

- Use PascalCase for classes
- Use camelCase for variables, functions, and methods
- Use kebab-case for file and directory names
- Use UPPERCASE for environment variables
- Avoid magic numbers and define constants
- Start each function with a verb
- Use verbs for boolean variables. Example: isLoading, hasError, canDelete, etc.
- Use complete words instead of abbreviations and correct spelling
  - Except for standard abbreviations like API, URL, etc.
  - Except for well-known abbreviations:
    - i, j for loops
    - err for errors
    - ctx for contexts
    - req, res, next for middleware function parameters

## Code Structure

### Functions

- Write short functions with a single purpose. Less than 20 instructions
- Name functions with a verb and something else
  - If it returns a boolean, use isX or hasX, canX, etc.
  - If it doesn't return anything, use executeX or saveX, etc.
- Avoid nesting blocks by:
  - Early checks and returns
  - Extraction to utility functions
- Use higher-order functions (map, filter, reduce, etc.) to avoid function nesting
- Use arrow functions for simple functions (less than 3 instructions)
- Use named functions for non-simple functions
- Use default parameter values instead of checking for null or undefined
- Reduce function parameters using RO-RO
  - Use an object to pass multiple parameters
  - Use an object to return results
  - Declare necessary types for input arguments and output
- Use a single level of abstraction

### Data

- Don't abuse primitive types and encapsulate data in composite types
- Avoid data validations in functions and use classes with internal validation
- Prefer immutability for data
- Use readonly for data that doesn't change
- Use as const for literals that don't change

### Classes

- Follow SOLID principles
- Prefer composition over inheritance
- Declare interfaces to define contracts
- Write small classes with a single purpose
  - Less than 200 instructions
  - Less than 10 public methods
  - Less than 10 properties

### Exceptions

- Use exceptions to handle errors you don't expect
- If you catch an exception, it should be to:
  - Fix an expected problem
  - Add context
- Otherwise, use a global handler

## NestJS Best Practices

### Project Structure
- Follow NestJS modular architecture
- Use feature modules to organize related functionality
- Implement domain-driven design principles where appropriate
- Create dedicated DTOs for API request and response
- Use pipes for validation and transformation
- Implement proper error handling with filters
- Use guards for authentication and authorization
- Use interceptors for cross-cutting concerns

### Dependency Injection
- Follow the dependency inversion principle
- Use constructor injection for required dependencies
- Use property injection for optional dependencies
- Use providers for services and repositories
- Register providers at the appropriate module level

### Controllers
- Keep controllers focused on handling HTTP requests
- Use appropriate HTTP methods for actions
- Implement proper validation using class-validator
- Use DTOs for request and response
- Use proper status codes for responses
- Document API endpoints with OpenAPI/Swagger
- Implement proper error handling

### Services
- Keep business logic in services
- Make services reusable when possible
- Implement proper error handling
- Use repositories for data access
- Use transactions for operations that affect multiple entities
- Implement proper logging
- Follow single responsibility principle

### Database Access
- Use TypeORM or Mongoose as an ORM/ODM
- Create entities that reflect database structure
- Use repositories for database operations
- Implement database migrations
- Use query builders for complex queries
- Use transactions for operations that require atomicity
- Optimize database queries for performance

### Authentication and Authorization
- Implement JWT-based authentication
- Use Passport strategies for authentication
- Implement role-based access control
- Use guards for protecting routes
- Use metadata for defining permissions
- Implement proper password hashing
- Follow security best practices

### Testing
- Write unit tests for services
- Write integration tests for API endpoints
- Use TestingModule for creating test modules
- Use mocks for external dependencies
- Implement e2e tests for critical flows
- Follow testing best practices

### Performance
- Use caching for expensive operations
- Optimize database queries
- Implement proper pagination
- Use streaming for large responses
- Implement rate limiting for public APIs
- Monitor application performance
- Profile and optimize code when necessary

### Error Handling
- Use filters for handling exceptions
- Create custom exceptions for specific error cases
- Use proper HTTP status codes
- Include meaningful error messages
- Log errors properly
- Implement proper validation error handling
- Return consistent error responses

### Logging
- Use built-in Logger or external logging libraries
- Log important events and errors
- Use appropriate log levels
- Include contextual information in logs
- Configure log format and destinations
- Implement log rotation
- Consider centralized logging

### Configuration
- Use ConfigModule for configuration
- Use environment variables for configuration
- Validate configuration schema
- Use different configurations for different environments
- Use nested configuration when appropriate
- Keep sensitive information in environment variables
- Document configuration options

### Security
- Follow OWASP security guidelines
- Implement CORS protection
- Use Helmet for setting HTTP headers
- Implement rate limiting
- Use CSRF protection
- Implement proper input validation
- Keep dependencies up to date
- Follow secure coding practices 