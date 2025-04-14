# Vue and Nuxt.js Development Guidelines

## Vue 3 General Guidelines

### Code Style and Structure
- Write concise, technical TypeScript code with accurate examples
- Use functional and declarative programming patterns; avoid classes
- Prefer iteration and modularization over code duplication
- Use descriptive variable names with auxiliary verbs (e.g., isLoading, hasError)
- Structure files: exported component, subcomponents, helpers, static content, types
- Always use the Vue Composition API script setup style

### Naming Conventions
- Use lowercase with dashes for directories (e.g., components/auth-wizard)
- Use PascalCase for component names (e.g., AuthWizard.vue)
- Use camelCase for composables (e.g., useAuthState.ts)
- Favor named exports for functions

### TypeScript Usage
- Use TypeScript for all code; prefer interfaces over types for their extendability and ability to merge
- Avoid enums; use maps instead for better type safety and flexibility
- Use functional components with TypeScript interfaces
- Use Vue 3 with TypeScript, leveraging defineComponent and PropType

### Syntax and Formatting
- Use arrow functions for methods and computed properties
- Avoid unnecessary curly braces in conditionals; use concise syntax for simple statements
- Use template syntax for declarative rendering

### UI and Styling
- Use modern UI frameworks like Headless UI, Element Plus, and Tailwind for components and styling
- Implement responsive design with Tailwind CSS; use a mobile-first approach

### Performance Optimization
- Leverage VueUse functions where applicable to enhance reactivity and performance
- Wrap asynchronous components in Suspense with a fallback UI
- Use dynamic loading for non-critical components
- Optimize images: use WebP format, include size data, implement lazy loading
- Implement an optimized chunking strategy during the Vite build process, such as code splitting, to generate smaller bundle sizes

### Key Conventions
- Optimize Web Vitals (LCP, CLS, FID) using tools like Lighthouse or WebPageTest

## Vue 3 and Composition API Best Practices
- Use <script setup> syntax for concise component definitions
- Leverage ref, reactive, and computed for reactive state management
- Use provide/inject for dependency injection when appropriate
- Implement custom composables for reusable logic

## Nuxt 3 Specific Guidelines

### Code Style and Structure
- Write clean, maintainable, and technically accurate TypeScript code
- Prioritize functional and declarative programming patterns; avoid using classes
- Emphasize iteration and modularization to follow DRY principles and minimize code duplication
- Prefer Composition API <script setup> style
- Use Composables to encapsulate and share reusable client-side logic or state across multiple components in your Nuxt application

### Nuxt 3 Features and Auto-imports
- Nuxt 3 provides auto imports, so there's no need to manually import 'ref', 'useState', or 'useRouter'
- For color mode handling, use the built-in '@nuxtjs/color-mode' with the 'useColorMode()' function
- Take advantage of VueUse functions to enhance reactivity and performance (except for color mode management)
- Use the Server API (within the server/api directory) to handle server-side operations like database interactions, authentication, or processing sensitive data that must remain confidential
- Use useRuntimeConfig to access and manage runtime configuration variables that differ between environments and are needed both on the server and client sides
- For SEO use useHead and useSeoMeta
- For images use <NuxtImage> or <NuxtPicture> component and for Icons use Nuxt Icons module
- Use app.config.ts for app theme configuration

### Data Fetching
1. Use useFetch for standard data fetching in components that benefit from SSR, caching, and reactively updating based on URL changes
2. Use $fetch for client-side requests within event handlers or when SSR optimization is not needed
3. Use useAsyncData when implementing complex data fetching logic like combining multiple API calls or custom caching and error handling
4. Set server: false in useFetch or useAsyncData options to fetch data only on the client side, bypassing SSR
5. Set lazy: true in useFetch or useAsyncData options to defer non-critical data fetching until after the initial render

### Naming Conventions
- Utilize composables, naming them as use<MyComposable>
- Use **PascalCase** for component file names (e.g., components/MyComponent.vue)
- Favor named exports for functions to maintain consistency and readability

### TypeScript Usage
- Use TypeScript throughout; prefer interfaces over types for better extendability and merging
- Avoid enums, opting for maps for improved type safety and flexibility
- Use functional components with TypeScript interfaces

### UI and Styling
- Use Nuxt UI and Tailwind CSS for components and styling
- Implement responsive design with Tailwind CSS; use a mobile-first approach

### Nuxt-specific Guidelines
- Follow Nuxt 3 directory structure (e.g., pages/, components/, composables/)
- Use Nuxt's built-in features:
  - Auto-imports for components and composables
  - File-based routing in the pages/ directory
  - Server routes in the server/ directory
- Leverage Nuxt plugins for global functionality
- Use useFetch and useAsyncData for data fetching
- Implement SEO best practices using Nuxt's useHead and useSeoMeta

### Performance Optimization
- Leverage Nuxt's built-in performance optimizations
- Use Suspense for asynchronous components
- Implement lazy loading for routes and components
- Optimize images: use WebP format, include size data, implement lazy loading

### Key Conventions
- Use VueUse for common composables and utility functions
- Use Pinia for state management
- Optimize Web Vitals (LCP, CLS, FID)
- Utilize Nuxt's auto-imports feature for components and composables

## Vue with Vite Best Practices

### Code Style and Structure
- Write concise, maintainable, and technically accurate TypeScript code with relevant examples
- Use functional and declarative programming patterns; avoid classes
- Favor iteration and modularization to adhere to DRY principles and avoid code duplication
- Use descriptive variable names with auxiliary verbs (e.g., isLoading, hasError)
- Organize files systematically: each file should contain only related content, such as exported components, subcomponents, helpers, static content, and types

### Naming Conventions
- Use lowercase with dashes for directories (e.g., components/auth-wizard)
- Favor named exports for functions

### TypeScript Usage
- Use TypeScript for all code; prefer interfaces over types for their extendability and ability to merge
- Avoid enums; use maps instead for better type safety and flexibility
- Use functional components with TypeScript interfaces

### Syntax and Formatting
- Use the "function" keyword for pure functions to benefit from hoisting and clarity
- Always use the Vue Composition API script setup style

### UI and Styling
- Use Headless UI, Element Plus, and Tailwind for components and styling
- Implement responsive design with Tailwind CSS; use a mobile-first approach

### Performance Optimization
- Leverage VueUse functions where applicable to enhance reactivity and performance
- Wrap asynchronous components in Suspense with a fallback UI
- Use dynamic loading for non-critical components
- Optimize images: use WebP format, include size data, implement lazy loading
- Implement an optimized chunking strategy during the Vite build process, such as code splitting, to generate smaller bundle sizes

Follow the official Nuxt.js and Vue.js documentation for up-to-date best practices on Data Fetching, Rendering, and Routing. 