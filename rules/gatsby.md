# Gatsby Development Guidelines

## Code Style and Structure
- Write concise, technical TypeScript code with accurate examples
- Use functional and declarative programming patterns; avoid classes
- Prefer iteration and modularization over code duplication
- Use descriptive variable names with auxiliary verbs (e.g., isLoaded, hasError)
- Structure files: exported page/component, GraphQL queries, helpers, static content, types

## Naming Conventions
- Favor named exports for components and utilities
- Prefix GraphQL query files with use (e.g., useSiteMetadata.ts)

## TypeScript Usage
- Use TypeScript for all code; prefer interfaces over types
- Avoid enums; use objects or maps instead
- Avoid using `any` or `unknown` unless absolutely necessary. Look for type definitions in the codebase instead
- Avoid type assertions with `as` or `!`

## Syntax and Formatting
- Use the "function" keyword for pure functions
- Avoid unnecessary curly braces in conditionals; use concise syntax for simple statements
- Use declarative JSX, keeping JSX minimal and readable

## UI and Styling
- Use Tailwind for utility-based styling
- Use a mobile-first approach

## Gatsby Best Practices
- Use Gatsby's useStaticQuery for querying GraphQL data at build time
- Use gatsby-node.js for programmatically creating pages based on static data
- Utilize Gatsby's Link component for internal navigation to ensure preloading of linked pages
- For pages that don't need to be created programmatically, create them in src/pages/
- Optimize images using Gatsby's image processing plugins (gatsby-plugin-image, gatsby-transformer-sharp)
- Follow Gatsby's documentation for best practices in data fetching, GraphQL queries, and optimizing the build process
- Use environment variables for sensitive data, loaded via gatsby-config.js
- Utilize gatsby-browser.js and gatsby-ssr.js for handling browser and SSR-specific APIs
- Use Gatsby's caching strategies (gatsby-plugin-offline, gatsby-plugin-cache)

## Performance Optimization
- Use Gatsby's built-in performance optimizations
- Implement proper code splitting
- Implement image optimization
- Use lazy loading for non-critical components
- Implement proper caching strategies
- Optimize the critical rendering path
- Minimize the use of client-side JavaScript
- Implement proper error handling and loading states

## GraphQL Best Practices
- Use fragments for reusable query parts
- Use aliases for clarity when querying similar data
- Keep queries co-located with the components that use them
- Use Gatsby's StaticQuery or useStaticQuery for components that need GraphQL data
- Avoid overfetching by requesting only the fields you need
- Use proper filtering and sorting in GraphQL queries
- Implement proper error handling for GraphQL queries

## Build Process
- Optimize the Gatsby build process
- Use proper environment variables for different environments
- Implement proper CI/CD pipelines
- Use Gatsby Cloud or other Gatsby-optimized hosting services
- Implement proper monitoring and analytics

## SEO and Accessibility
- Implement proper SEO best practices
- Use Gatsby's react-helmet-async for managing head tags
- Implement proper meta tags
- Implement proper schema.org markup
- Ensure accessibility compliance
- Implement proper keyboard navigation
- Use semantic HTML
- Provide proper alt text for images
- Implement proper ARIA labels

Refer to the Gatsby documentation for more details on each of these practices. 