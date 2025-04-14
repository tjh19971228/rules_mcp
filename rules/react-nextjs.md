# React and Next.js Development Guidelines

## React Best Practices

### Component Architecture
- Use functional components with TypeScript interfaces
- Define components using the function keyword
- Extract reusable logic into custom hooks
- Implement proper component composition
- Use React.memo() strategically for performance
- Implement proper cleanup in useEffect hooks

### React Performance Optimization
- Use useCallback for memoizing callback functions
- Implement useMemo for expensive computations
- Avoid inline function definitions in JSX
- Implement code splitting using dynamic imports
- Implement proper key props in lists (avoid using index as key)

### React Coding Style
- Write concise, technical TypeScript code with accurate examples
- Use functional and declarative programming patterns; avoid classes
- Prefer iteration and modularization over code duplication
- Use descriptive variable names with auxiliary verbs (e.g., isLoading, hasError)
- Structure files: exported component, subcomponents, helpers, static content, types
- Use lowercase with dashes for directories (e.g., components/auth-wizard)
- Favor named exports for components
- For single-line statements in conditionals, omit curly braces
- Use concise, one-line syntax for simple conditional statements (e.g., if (condition) doSomething())
- Place static content and interfaces at file end

## Next.js Best Practices

### Core Concepts
- Utilize App Router for routing
- Implement proper metadata management
- Use proper caching strategies
- Implement proper error boundaries

### Components and Features
- Use Next.js built-in components:
  - Image component for optimized images
  - Link component for client-side navigation
  - Script component for external scripts
  - Head component for metadata
- Implement proper loading states
- Use proper data fetching methods

### Server Components
- Default to Server Components
- Use URL query parameters for data fetching and server state management
- Use 'use client' directive only when necessary:
  - Event listeners
  - Browser APIs
  - State management
  - Client-side-only libraries

### App Router Optimization
- Rely on Next.js App Router for state changes
- Prioritize Web Vitals (LCP, CLS, FID)
- Minimize 'use client' usage:
  - Prefer server components and Next.js SSR features
  - Use 'use client' only for Web API access in small components
  - Avoid using 'use client' for data fetching or state management

### Performance Optimization
- Minimize 'use client', 'useEffect', and 'setState'; favor React Server Components (RSC)
- Wrap client components in Suspense with fallback
- Use dynamic loading for non-critical components
- Optimize images: use WebP format, include size data, implement lazy loading

### Error Handling
- Model expected errors as return values: Avoid using try/catch for expected errors in Server Actions. Use useActionState to manage these errors and return them to the client
- Use error boundaries for unexpected errors: Implement error boundaries using error.tsx and global-error.tsx files to handle unexpected errors and provide a fallback UI
- Use useActionState with react-hook-form for form validation
- Code in services/ dir always throw user-friendly errors that tanStackQuery can catch and show to the user
- Use next-safe-action for all server actions:
  - Implement type-safe server actions with proper validation
  - Utilize the `action` function from next-safe-action for creating actions
  - Define input schemas using Zod for robust type checking and validation
  - Handle errors gracefully and return appropriate responses
  - Use import type { ActionResponse } from '@/types/actions'
  - Ensure all server actions return the ActionResponse type
  - Implement consistent error handling and success responses using ActionResponse

### Technical Preferences
- Always use kebab-case for component names (e.g. my-component.tsx)
- Favour using React Server Components and Next.js SSR features where possible
- Minimize the usage of client components ('use client') to small, isolated components
- Always add loading and error states to data fetching components
- Implement error handling and error logging
- Use semantic HTML elements where possible

### UI and Styling
- Use Shadcn UI, Radix, and Tailwind CSS for components and styling
- Implement responsive design with Tailwind CSS
- Use mobile-first approach for responsive design
- Use content variables for static content outside render functions
- Use Zod for form validation

### AI Integration (When Applicable)
- Use the Vercel AI SDK UI for implementing streaming chat UI
- Use the Vercel AI SDK Core to interact with language models
- Use the Vercel AI SDK RSC and Stream Helpers to stream and help with the generations
- Implement proper error handling for AI responses and model switching
- Implement fallback mechanisms for when an AI model is unavailable
- Handle rate limiting and quota exceeded scenarios gracefully
- Provide clear error messages to users when AI interactions fail
- Implement proper input sanitization for user messages before sending to AI models
- Use environment variables for storing API keys and sensitive information

## State Management

### Local State
- Use useState for component-level state
- Implement useReducer for complex state
- Use useContext for shared state
- Implement proper state initialization

### Global State
- Use Redux Toolkit for global state
- Use createSlice to define state, reducers, and actions together
- Avoid using createReducer and createAction unless necessary
- Normalize state structure to avoid deeply nested data
- Use selectors to encapsulate state access
- Avoid large, all-encompassing slices; separate concerns by feature
- Use modern state management solutions (e.g., Zustand, TanStack React Query) to handle global state and data fetching

## Data Fetching
- Use React Server Components for data fetching when possible
- Implement the preload pattern to prevent waterfalls
- Leverage modern data fetching libraries like TanStack React Query

## Component Structure
- Break down components into smaller parts with minimal props
- Suggest micro folder structure for components
- Use composition to build complex components
- Follow the order: component declaration, styled components (if any), TypeScript types

## Methodology
1. **System 2 Thinking**: Approach the problem with analytical rigor. Break down the requirements into smaller, manageable parts and thoroughly consider each step before implementation.
2. **Tree of Thoughts**: Evaluate multiple possible solutions and their consequences. Use a structured approach to explore different paths and select the optimal one.
3. **Iterative Refinement**: Before finalizing the code, consider improvements, edge cases, and optimizations. Iterate through potential enhancements to ensure the final solution is robust.

**Process**:
1. **Deep Dive Analysis**: Begin by conducting a thorough analysis of the task at hand, considering the technical requirements and constraints.
2. **Planning**: Develop a clear plan that outlines the architectural structure and flow of the solution, using <PLANNING> tags if necessary.
3. **Implementation**: Implement the solution step-by-step, ensuring that each part adheres to the specified best practices.
4. **Review and Optimize**: Perform a review of the code, looking for areas of potential optimization and improvement.
5. **Finalization**: Finalize the code by ensuring it meets all requirements, is secure, and is performant. 