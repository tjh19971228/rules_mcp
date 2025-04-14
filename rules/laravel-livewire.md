# Laravel + Livewire Development Guidelines

This document outlines best practices, conventions, and standards for developing web applications using Laravel, Livewire, Alpine.js, TailwindCSS, and DaisyUI.

## Key Principles

- Write concise, technical responses with accurate PHP and Livewire examples
- Focus on component-based architecture using Livewire and Laravel's latest features
- Follow Laravel and Livewire best practices and conventions
- Use object-oriented programming with a focus on SOLID principles
- Prefer iteration and modularization over duplication
- Use descriptive variable, method, and component names
- Use lowercase with dashes for directories (e.g., app/Http/Livewire)
- Favor dependency injection and service containers

## PHP/Laravel Best Practices

- Use PHP 8.1+ features when appropriate (e.g., typed properties, match expressions)
- Follow PSR-12 coding standards
- Use strict typing: `declare(strict_types=1);`
- Utilize Laravel 11's built-in features and helpers when possible
- Implement proper error handling and logging:
  - Use Laravel's exception handling and logging features
  - Create custom exceptions when necessary
  - Use try-catch blocks for expected exceptions
- Use Laravel's validation features for form and request validation
- Implement middleware for request filtering and modification
- Utilize Laravel's Eloquent ORM for database interactions
- Use Laravel's query builder for complex database queries
- Implement proper database migrations and seeders

## Livewire Implementation

- Use Livewire for dynamic components and real-time user interactions
- Favor the use of Livewire's lifecycle hooks and properties
- Use the latest Livewire (3.5+) features for optimization and reactivity
- Implement Blade components with Livewire directives (e.g., wire:model)
- Handle state management and form handling using Livewire properties and actions
- Use wire:loading and wire:target to provide feedback and optimize user experience
- Apply Livewire's security measures for components

## Alpine.js Integration

- Use Alpine.js for lightweight JavaScript interactions
- Integrate Alpine.js with Livewire components for enhanced functionality
- Keep Alpine.js code minimal and focused on UI interactions
- Follow Alpine.js best practices for event handling and state management

## Tailwind CSS & daisyUI Styling

- Use Tailwind CSS for styling components, following a utility-first approach
- Leverage daisyUI's pre-built components for quick UI development
- Follow a consistent design language using Tailwind CSS classes and daisyUI themes
- Implement responsive design and dark mode using Tailwind and daisyUI utilities
- Optimize for accessibility (e.g., aria-attributes) when using components

## Project Structure

- Organize code into logical directories following Laravel's conventions
- Keep Livewire components in app/Http/Livewire directory
- Group related components into subdirectories
- Use resource views for Blade templates
- Keep assets organized in resources/js and resources/css

## Database Design and ORM Usage

- Design models carefully; follow database normalization principles
- Use model relationships (ForeignKey, ManyToMany, OneToOne) appropriately
- Leverage Laravel's migration system for database schema changes
- Optimize query performance using eager loading (with/load) for related objects
- Use database transactions for data integrity
- Implement proper indexes for frequently queried fields

## Authentication and Authorization

- Use Laravel's built-in authentication system
- Implement proper permission checking using Laravel's permission system
- Use Livewire for login and registration forms
- Implement proper CSRF protection for form submissions
- Use middleware for route protection

## Performance Optimization

- Use Laravel's cache framework with backend support (e.g., Redis or Memcached)
- Implement database indexing and query optimization techniques
- Use Laravel Telescope for debugging and performance monitoring
- Implement job queues for long-running tasks
- Optimize asset delivery using Laravel Mix or Vite

## Testing

- Write tests for Livewire components using Livewire testing utilities
- Test Laravel features using PHPUnit
- Use Laravel Dusk for browser testing
- Implement proper testing database configuration
- Use factories and seeders for test data

## Security

- Follow Laravel's security best practices
- Implement proper input validation and sanitization
- Use Laravel's security features (CSRF, XSS protection, etc.)
- Keep dependencies up to date
- Implement proper user authentication and authorization

## Key Dependencies

- Laravel 11 (latest stable version)
- Livewire 3.5+ for real-time, reactive components
- Alpine.js for lightweight JavaScript interactions
- Tailwind CSS for utility-first styling
- daisyUI for pre-built UI components and themes
- Composer for dependency management
- NPM/Yarn for frontend dependencies

## Additional Best Practices

- Use Laravel's event and listener system for decoupled code
- Implement Laravel's scheduled tasks for recurring operations
- Use Laravel's notification system for user notifications
- Implement proper logging and error monitoring
- Use Laravel's localization features for multi-language support
- Implement proper database backups and recovery procedures
- Use Laravel's built-in features for API development when needed 