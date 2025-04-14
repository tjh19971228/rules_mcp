# Laravel + Vue.js Development Guidelines

This document outlines best practices, conventions, and standards for developing web applications using Laravel and Vue.js.

## Key Principles

- Write concise, technical responses with accurate examples in PHP and Vue.js
- Follow Laravel and Vue.js best practices and conventions
- Use object-oriented programming with a focus on SOLID principles
- Favor iteration and modularization over duplication
- Use descriptive and meaningful names for variables, methods, and files
- Adhere to Laravel's directory structure conventions (e.g., app/Http/Controllers)
- Prioritize dependency injection and service containers

## PHP/Laravel Best Practices

- Leverage PHP 8.2+ features (e.g., readonly properties, match expressions)
- Apply strict typing: `declare(strict_types=1);`
- Follow PSR-12 coding standards for PHP
- Use Laravel's built-in features and helpers (e.g., `Str::` and `Arr::`)
- File structure: Stick to Laravel's MVC architecture and directory organization
- Implement error handling and logging:
  - Use Laravel's exception handling and logging tools
  - Create custom exceptions when necessary
  - Apply try-catch blocks for predictable errors
- Use Laravel's request validation and middleware effectively
- Implement Eloquent ORM for database modeling and queries
- Use migrations and seeders to manage database schema changes and test data

## Vue.js Implementation

- Utilize Vite for modern and fast development with hot module reloading
- Organize components under src/components and use lazy loading for routes
- Apply Vue Router for SPA navigation and dynamic routing
- Implement Pinia for state management in a modular way
- Use the Composition API and script setup for cleaner component logic
- Implement proper component hierarchy and communication patterns
- Use props for parent-child component communication
- Use emits for child-parent component communication
- Use provide/inject for deep component communication when needed
- Use watchers and computed properties effectively

## Project Structure

- Backend (Laravel):
  - Follow Laravel's conventional directory structure
  - Organize controllers, models, and services logically
  - Use API resources for transforming data for the frontend
  - Implement proper middleware for request processing

- Frontend (Vue.js):
  - Organize by feature or functionality
  - Keep components small and focused
  - Separate reusable components into a common directory
  - Use shared utilities and composables for common functionalities

## API Design and Implementation

- Design RESTful APIs following Laravel conventions
- Implement proper routing and controllers for API endpoints
- Use API resources for data transformation
- Implement proper authentication and authorization
- Use proper status codes and response formats
- Document APIs for easier frontend integration

## State Management

- Use Pinia for global state management
- Organize stores by domain or feature
- Implement proper actions and mutations
- Use getters for derived state
- Consider using local component state for isolated functionality

## Form Handling and Validation

- Validate on both client and server sides
- Use Vuelidate or similar libraries for client-side validation
- Implement proper error handling and display
- Use Form Request classes in Laravel for server-side validation
- Provide clear error messages for better user experience

## Authentication and Authorization

- Use Laravel Sanctum for API authentication
- Implement proper token management
- Use middleware for route protection in Laravel
- Implement navigation guards in Vue Router
- Handle authentication state in Pinia store

## UI and Styling

- Use TailwindCSS for styling and responsive design
- Consider component libraries like PrimeVue or Vuetify
- Implement proper responsive design
- Use CSS modules or scoped styles for component-specific styling
- Follow a consistent design system

## Testing

- Write unit tests for Laravel controllers, models, and services
- Test Vue components and stores
- Implement end-to-end testing for critical user flows
- Use Laravel's testing tools for API testing
- Use Vue Test Utils for component testing

## Performance Optimization

- Optimize API responses with proper resource transformations
- Implement caching for frequently accessed data
- Use lazy loading for routes and components
- Implement proper indexing for database tables
- Use code splitting for JavaScript bundles
- Optimize image loading and processing

## Security

- Implement proper CSRF protection
- Validate and sanitize all user inputs
- Use prepared statements for database queries
- Keep dependencies updated to avoid vulnerabilities
- Implement proper authentication and authorization
- Follow security best practices for both Laravel and Vue.js

## Key Dependencies

- Laravel (latest stable version)
- Vue.js 3+ with Composition API
- Vite for asset bundling
- Pinia for state management
- Vue Router for routing
- TailwindCSS for styling
- Axios for API requests
- Laravel Sanctum for authentication

## Development Workflow

- Use Git for version control
- Implement proper branching strategy
- Use environment-specific configurations
- Implement continuous integration and delivery
- Use Laravel Mix or Vite for asset compilation
- Follow semantic versioning for releases

## Additional Best Practices

- Use Laravel's event and listener system for decoupled code
- Implement proper logging and monitoring
- Use Laravel's localization features for multi-language support
- Implement proper error handling and logging
- Use Laravel's built-in features for common functionalities
- Keep frontend and backend code organized and maintainable 