# Vue + Vite Development Guidelines

This document outlines best practices, conventions, and standards for developing web applications using Vue.js, Vite, TypeScript, Pinia, VueUse, and other modern front-end technologies.

## Key Principles

- Write concise, maintainable, and technically accurate TypeScript code with relevant examples
- Use functional and declarative programming patterns; avoid classes
- Favor iteration and modularization to adhere to DRY principles and avoid code duplication
- Use descriptive variable names with auxiliary verbs (e.g., isLoading, hasError)
- Organize files systematically: each file should contain only related content
- Structure files: exported components, subcomponents, helpers, static content, and types

## Naming Conventions

- Use lowercase with dashes for directories (e.g., components/auth-wizard)
- Favor named exports for components and functions
- Use PascalCase for component names
- Use camelCase for variables, methods, and properties

## TypeScript Usage

- Use TypeScript for all code; prefer interfaces over types for their extendability and ability to merge
- Avoid enums; use maps instead for better type safety and flexibility
- Use functional components with TypeScript interfaces
- Define clear interfaces for component props, state, and structures
- Apply generics where type flexibility is needed
- Utilize TypeScript utility types (Partial, Pick, Omit) for cleaner code

## Vue.js Best Practices

- Always use the Vue Composition API with the script setup syntax
- Use defineProps, defineEmits, and defineExpose
- Organize imports logically: Vue imports first, then external libraries, then internal components
- Create reusable composables for shared logic
- Use provide/inject for dependency injection when needed
- Keep components focused on a single responsibility
- Use shallow ref when appropriate for better performance

## Vue Router Implementation

- Use named routes for navigation
- Implement lazy loading for route components
- Use nested routes for related views
- Implement proper route guards for authentication and authorization
- Use route meta fields for additional route information

## State Management with Pinia

- Use Pinia for global state management
- Organize stores by domain or feature
- Keep store actions small and focused
- Use getters for computed state
- Use composables to interact with stores
- Consider using local component state for isolated functionality

## Performance Optimization

- Leverage VueUse functions where applicable to enhance reactivity and performance
- Wrap asynchronous components in Suspense with a fallback UI
- Use dynamic loading for non-critical components
- Optimize images: use WebP format, include size data, implement lazy loading
- Implement an optimized chunking strategy during the Vite build process
- Use code splitting for better loading performance
- Only use global components when necessary
- Implement proper caching strategies

## UI and Styling

- Use Headless UI, Element Plus, or similar component libraries
- Implement responsive design with Tailwind CSS; use a mobile-first approach
- Use CSS modules or scoped CSS for component-specific styling
- Utilize CSS variables for theming

## Form Handling and Validation

- Use Vuelidate or similar libraries for form validation
- Implement proper error handling and display
- Use composition functions for form logic reuse
- Validate on both client and server sides

## Error Handling

- Implement proper error boundaries
- Use try-catch blocks for async operations
- Provide user-friendly error messages
- Log errors appropriately
- Handle network errors gracefully

## Testing

- Write unit tests for components, stores, and composables
- Use Vue Test Utils for component testing
- Implement end-to-end tests for critical user flows
- Use mocks for external dependencies
- Ensure proper test coverage

## Documentation

- Use JSDoc comments for components, functions, and types
- Document component props and events
- Keep README files up to date
- Use a style guide for consistent code formatting

## Vite Configuration

- Optimize build configuration for production
- Configure environment variables properly
- Use Vite plugins to extend functionality
- Configure aliases for cleaner imports
- Implement proper bundling strategies

## Project Structure

- Organize by feature or domain when possible
- Keep related files close to each other
- Use a modular approach for scalability
- Implement proper separation of concerns
- Follow a consistent directory structure

## Security Best Practices

- Sanitize user inputs
- Implement proper authentication and authorization
- Avoid exposing sensitive information
- Keep dependencies updated
- Follow OWASP security guidelines

## Internationalization (i18n)

- Use Vue I18n for translations
- Implement proper locale management
- Support RTL languages if needed
- Use number and date formatting utilities

## Accessibility (a11y)

- Use semantic HTML elements
- Implement proper ARIA attributes
- Ensure keyboard navigation
- Test with screen readers
- Follow WCAG guidelines

## Key Dependencies

- Vue.js 3+
- Vite
- TypeScript
- Pinia for state management
- VueUse for composition utilities
- Vue Router for routing
- Headless UI or Element Plus for components
- Tailwind CSS for styling
- Vuelidate for form validation
- Vitest for testing 