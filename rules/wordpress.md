# WordPress Development Guidelines

This document outlines best practices, conventions, and standards for developing WordPress themes, plugins, and applications.

## Key Principles

- Write concise, technical responses with accurate PHP examples
- Follow WordPress coding standards and best practices
- Use object-oriented programming when appropriate, focusing on modularity
- Prefer iteration and modularization over duplication
- Use descriptive function, variable, and file names
- Use lowercase with hyphens for directories (e.g., wp-content/themes/my-theme)
- Favor hooks (actions and filters) for extending functionality

## PHP/WordPress Best Practices

- Use PHP 7.4+ features when appropriate (e.g., typed properties, arrow functions)
- Follow WordPress PHP Coding Standards
- Use strict typing when possible: `declare(strict_types=1);`
- Utilize WordPress core functions and APIs when available
- Follow WordPress theme and plugin directory structures and naming conventions
- Implement proper error handling and logging:
  - Use WordPress debug logging features
  - Create custom error handlers when necessary
  - Use try-catch blocks for expected exceptions
- Use WordPress's built-in functions for data validation and sanitization
- Implement proper nonce verification for form submissions
- Utilize WordPress's database abstraction layer (wpdb) for database interactions
- Use `prepare()` statements for secure database queries
- Implement proper database schema changes using `dbDelta()` function

## Theme Development

- Use the WordPress template hierarchy for template files
- Create child themes for customizations to preserve update compatibility
- Implement proper theme functions using functions.php
- Register and enqueue scripts and styles properly using `wp_enqueue_script()` and `wp_enqueue_style()`
- Use template tags and conditional tags appropriately
- Implement proper template parts for code reuse
- Add theme support for WordPress features (e.g., post thumbnails, custom logo, etc.)
- Make themes translation-ready using WordPress i18n functions

## Plugin Development

- Follow WordPress plugin architecture best practices
- Use proper plugin header for plugin information
- Register activation and deactivation hooks
- Implement uninstall.php for proper uninstallation
- Use namespaces to avoid function/class name collisions
- Implement proper settings API for plugin options
- Use capability checks for user permissions
- Follow WordPress plugin security best practices

## Custom Post Types and Taxonomies

- Register custom post types and taxonomies properly
- Implement appropriate labels and arguments
- Create custom meta boxes for additional data
- Use proper meta box callbacks and sanitization
- Implement custom columns for admin list tables
- Add sorting and filtering capabilities for admin columns
- Use proper rewrite rules for custom post types

## WordPress Hooks System

- Use WordPress hooks (actions and filters) instead of modifying core files
- Add and remove hooks with appropriate priority
- Create custom hooks for extensibility
- Use proper naming conventions for hook names
- Document hook usage and parameters

## Database Interaction

- Use WordPress's database abstraction layer (wpdb) for database interactions
- Implement proper database schema changes using the `dbDelta()` function
- Use prepared statements for secure database queries
- Implement proper data sanitization and validation
- Use WordPress transients API for caching database queries
- Implement proper database error handling
- Follow WordPress database table naming conventions

## Security Best Practices

- Validate and sanitize all user inputs
- Use nonces for form submissions
- Implement capability checks for user permissions
- Sanitize output with appropriate escaping functions
- Implement proper database security with prepared statements
- Use WordPress security functions for authentication and authorization
- Protect against common vulnerabilities (XSS, CSRF, SQL injection)

## Performance Optimization

- Use WordPress transients API for caching
- Implement proper script and style enqueuing
- Optimize database queries using appropriate caching
- Use object caching when available
- Implement proper AJAX handling for asynchronous data loading
- Optimize image loading and processing
- Implement proper cron jobs using wp_cron()

## Internationalization (i18n)

- Make themes and plugins translation-ready
- Use proper i18n functions (`__()`, `_e()`, `esc_html__()`, etc.)
- Implement proper text domains
- Load text domains properly
- Support RTL languages
- Use WordPress language files (.pot, .po, .mo)

## Testing and Debugging

- Use WordPress debug mode for development
- Implement proper error logging
- Use WordPress testing tools (WP_UnitTestCase)
- Test across different environments and versions
- Use debugging tools for troubleshooting
- Implement proper error reporting

## Key Dependencies

- WordPress (latest stable version)
- Composer for dependency management (when building advanced plugins or themes)
- PHP 7.4+ for modern features

## Key Conventions

1. Follow WordPress's plugin API for extending functionality
2. Use WordPress's template hierarchy for theme development
3. Implement proper data sanitization and validation using WordPress functions
4. Use WordPress's template tags and conditional tags in themes
5. Implement proper database queries using $wpdb or WP_Query
6. Use WordPress's authentication and authorization functions
7. Implement proper AJAX handling using admin-ajax.php or REST API
8. Use WordPress's hook system for modular and extensible code
9. Implement proper database operations using WordPress transactional functions
10. Use WordPress's WP_Cron API for scheduling tasks 