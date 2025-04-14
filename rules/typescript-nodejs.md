# TypeScript and Node.js Development Guidelines

## TypeScript General Guidelines

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

### TypeScript Implementation
- Enable strict mode
- Define clear interfaces for component props, state, and Redux state structure
- Use type guards to handle potential undefined or null values safely
- Apply generics to functions, actions, and slices where type flexibility is needed
- Utilize TypeScript utility types (Partial, Pick, Omit) for cleaner and reusable code
- Prefer interface over type for defining object structures, especially when extending
- Use mapped types for creating variations of existing types dynamically

## Functions

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

## Data

- Don't abuse primitive types and encapsulate data in composite types
- Avoid data validations in functions and use classes with internal validation
- Prefer immutability for data
- Use readonly for data that doesn't change
- Use as const for literals that don't change

## Classes

- Follow SOLID principles
- Prefer composition over inheritance
- Declare interfaces to define contracts
- Write small classes with a single purpose
  - Less than 200 instructions
  - Less than 10 public methods
  - Less than 10 properties

## Exceptions

- Use exceptions to handle errors you don't expect
- If you catch an exception, it should be to:
  - Fix an expected problem
  - Add context
- Otherwise, use a global handler

## Testing

- Follow the Arrange-Act-Assert convention for tests
- Name test variables clearly
- Follow the convention: inputX, mockX, actualX, expectedX, etc.
- Write unit tests for each public function
- Use test doubles to simulate dependencies
  - Except for third-party dependencies that are not expensive to execute
- Write acceptance tests for each module
- Follow the Given-When-Then convention

## Error Handling and Validation
- Prioritize error handling and edge cases:
  - Handle errors at the beginning of functions
  - Use early returns for error conditions to avoid deeply nested if statements
  - Avoid unnecessary else statements; use if-return pattern instead
  - Use guard clauses to handle preconditions and invalid states early
  - Implement proper error logging and user-friendly error messages
  - Consider using custom error types or error factories for consistent error handling

## Node.js Best Practices

### Project Structure
- Use a modular architecture
- Organize code into domain-specific modules
- Create separate directories for controllers, services, models, and utilities
- Keep the entry point clean and focused on bootstrapping the application
- Follow a consistent pattern for file naming and directory structure

### Asynchronous Programming
- Use async/await for asynchronous operations
- Handle promise rejections properly
- Avoid callback hell by using promises or async/await
- Use Promise.all for parallel operations
- Use Promise.allSettled for operations that might fail independently

### Error Handling
- Use try/catch blocks for handling synchronous errors
- Use .catch() for handling promise rejections
- Create custom error classes
- Implement a global error handler
- Log errors properly with context information
- Return appropriate error responses

### Security
- Validate and sanitize user input
- Implement proper authentication and authorization
- Use HTTPS for all connections
- Set appropriate security headers
- Protect against common web vulnerabilities (XSS, CSRF, SQL Injection, etc.)
- Keep dependencies up to date
- Follow the principle of least privilege

### Performance
- Optimize database queries
- Implement caching where appropriate
- Use connection pooling
- Avoid blocking the event loop
- Implement proper pagination
- Use streams for handling large files
- Monitor and optimize CPU/memory usage

### Testing
- Write unit tests for business logic
- Write integration tests for API endpoints
- Use mocks and stubs for external dependencies
- Implement continuous integration
- Use code coverage tools to identify untested code

### Logging
- Implement structured logging
- Use appropriate log levels (debug, info, warn, error, etc.)
- Include contextual information in logs
- Configure log rotation
- Avoid logging sensitive information
- Use a logging library like Winston or Pino

### Deployment
- Implement environment-specific configurations
- Use environment variables for sensitive information
- Dockerize the application for consistent environments
- Implement a CI/CD pipeline
- Use a process manager like PM2 for production
- Implement health checks
- Set up monitoring and alerting

### Documentation
- Document the API using OpenAPI/Swagger
- Maintain a README with setup instructions
- Document environment variables
- Add helpful comments for complex logic
- Generate API documentation from code 