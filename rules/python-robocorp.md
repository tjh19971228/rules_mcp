# Python RoboCorp RPA Development Guidelines

This document outlines best practices, conventions, and standards for developing Robotic Process Automation (RPA) solutions using Python and RoboCorp.

## Key Principles

- Write concise, technical responses with accurate Python examples
- Use functional, declarative programming; avoid classes where possible
- Prefer iteration and modularization over code duplication
- Use descriptive variable names with auxiliary verbs (e.g., is_active, has_permission)
- Use lowercase with underscores for directories and files (e.g., tasks/data_processing.py)
- Favor named exports for utility functions and task definitions
- Use the Receive an Object, Return an Object (RORO) pattern

## Python/RoboCorp Best Practices

- Use `def` for pure functions and `async def` for asynchronous operations
- Use type hints for all function signatures. Prefer Pydantic models over raw dictionaries for input validation
- File structure: exported tasks, sub-tasks, utilities, static content, types (models, schemas)
- Avoid unnecessary curly braces in conditional statements
- For single-line statements in conditionals, omit curly braces
- Use concise, one-line syntax for simple conditional statements (e.g., `if condition: execute_task()`)

## Error Handling and Validation

- Prioritize error handling and edge cases:
  - Handle errors and edge cases at the beginning of functions
  - Use early returns for error conditions to avoid deeply nested `if` statements
  - Place the happy path last in the function for improved readability
  - Avoid unnecessary `else` statements; use the `if-return` pattern instead
  - Use guard clauses to handle preconditions and invalid states early
  - Implement proper error logging and user-friendly error messages
  - Use custom error types or error factories for consistent error handling

## RoboCorp Project Structure

- Organize tasks logically in `tasks.py` files
- Keep common utilities in a `libraries` directory
- Use `resources` directory for static files and configuration
- Implement proper logging and error handling
- Use RoboCorp's Work Items for data exchange between processes
- Follow RoboCorp's Control Room integration best practices

## Browser and UI Automation

- Use RPA.Browser.Selenium for browser automation
- Implement proper waiting strategies for dynamic elements
- Use XPath or CSS selectors for element identification
- Implement retry mechanisms for unstable UI elements
- Use screenshots for debugging and reporting
- Implement proper error handling for UI interaction failures

## Data Processing

- Use Pandas for data manipulation and processing
- Implement proper data validation and cleaning
- Use RPA.Excel.Files for Excel manipulation
- Use RPA.Tables for structured data manipulation
- Implement proper exception handling for data processing errors

## System Integration

- Use RPA.HTTP for API interaction
- Implement proper authentication and authorization
- Use RPA.Windows for Windows desktop automation
- Use RPA.Email for email automation
- Implement proper error handling for integration failures

## Performance Optimization

- Minimize blocking I/O operations; use asynchronous operations where appropriate
- Implement caching for static and frequently accessed data
- Use parallel execution for independent tasks
- Optimize resource usage to minimize execution time
- Use RoboCorp's Work Items for efficient data passing between tasks

## Testing and Debugging

- Write unit tests for critical functions
- Implement integration tests for end-to-end scenarios
- Use RoboCorp's debugging tools for troubleshooting
- Implement proper logging for debugging and auditing
- Use mock data for testing to ensure consistency

## Deployment and Maintenance

- Use RoboCorp's Cloud for deployment
- Implement proper error handling and recovery mechanisms
- Use environment variables for configuration
- Implement proper logging and monitoring
- Use RoboCorp's Control Room for process scheduling and management

## Key Dependencies

- RPA Framework
- RoboCorp Framework
- Pandas (for data processing)
- Pydantic (for data validation)
- Requests (for API interaction)
- Selenium (for browser automation)

## Security Considerations

- Handle sensitive data securely
- Use RoboCorp's Vault for secret management
- Implement proper authentication and authorization
- Follow the principle of least privilege
- Sanitize inputs to prevent injection attacks

## Documentation

- Document tasks and functions with docstrings
- Maintain a README file with setup and usage instructions
- Document dependencies and configuration requirements
- Keep documentation up-to-date with code changes
- Use inline comments for complex logic 