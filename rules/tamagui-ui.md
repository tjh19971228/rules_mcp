# Tamagui Cross-Platform UI Development Guidelines

This document outlines best practices, conventions, and standards for developing cross-platform applications using Tamagui UI framework with React Native, Expo, and Next.js.

## Key Principles

- Write concise, technical TypeScript code with accurate examples
- Use functional, declarative programming; avoid classes
- Prefer iteration and modularization over code duplication
- Use descriptive variable names with auxiliary verbs (e.g., isLoading, hasError)
- Structure files: exported component, subcomponents, helpers, static content, types
- Use lowercase with dashes for directories (e.g., components/auth-wizard)
- Favor named exports for components

## TypeScript Usage

- Use TypeScript for all code; prefer interfaces over types
- Avoid enums; use maps instead
- Use functional components with TypeScript interfaces
- Use strict mode in TypeScript for better type safety
- Ensure proper typing for cross-platform components

## UI and Styling with Tamagui

- Use Tamagui for cross-platform UI components and styling
- Implement responsive design with a mobile-first approach
- Ensure styling consistency between web and native applications
- Utilize Tamagui's theming capabilities for consistent design across platforms
- Leverage Tamagui's built-in animation system for fluid UI transitions
- Use Tamagui's responsive hooks for adaptable layouts
- Utilize token-based theming for consistent design systems

## State Management and Data Fetching

- Use Zustand for state management
- Use TanStack React Query for data fetching, caching, and synchronization
- Minimize the use of `useEffect` and `setState`; favor derived state and memoization when possible
- Implement proper loading and error states for data fetching

## Error Handling and Validation

- Prioritize error handling and edge cases
- Handle errors and edge cases at the beginning of functions
- Use early returns for error conditions to avoid deep nesting
- Utilize guard clauses to handle preconditions and invalid states early
- Implement proper error logging and user-friendly error messages
- Use Zod for schema validation and type inference

## Performance Optimization

- Optimize for both web and mobile performance
- Use dynamic imports for code splitting in Next.js
- Implement lazy loading for non-critical components
- Optimize images: use appropriate formats, include size data, implement lazy loading
- Avoid unnecessary re-renders by memoizing components and using useMemo and useCallback hooks appropriately

## Monorepo Management with Turbo

- Follow best practices using Turbo for monorepo setups
- Ensure packages are properly isolated and dependencies are correctly managed
- Use shared configurations and scripts where appropriate
- Utilize the workspace structure as defined in the root `package.json`

## Cross-Platform Development with Solito

- Use Solito for navigation in both web and mobile applications
- Implement platform-specific code when necessary, using `.native.tsx` files for React Native-specific components
- Handle images using `SolitoImage` for better cross-platform compatibility

## Internationalization

- Use i18next and react-i18next for web applications
- Use expo-localization for React Native apps
- Ensure all user-facing text is internationalized and supports localization

## Safe Area Management

- Use SafeAreaProvider from react-native-safe-area-context to manage safe areas globally in your app
- Wrap top-level components with SafeAreaView to handle notches, status bars, and other screen insets on both iOS and Android
- Use SafeAreaScrollView for scrollable content to ensure it respects safe area boundaries
- Avoid hardcoding padding or margins for safe areas; rely on SafeAreaView and context hooks

## Testing and Quality Assurance

- Write unit and integration tests for critical components
- Use testing libraries compatible with React and React Native
- Ensure code coverage and quality metrics meet the project's requirements

## Project Structure and Environment

- Follow the established project structure with separate packages for `app`, `ui`, and `api`
- Use the `apps` directory for Next.js and Expo applications
- Utilize the `packages` directory for shared code and components
- Use `dotenv` for environment variable management
- Follow patterns for environment-specific configurations in `eas.json` and `next.config.js`

## Deployment and CI/CD

- Use Expo EAS Build and Updates for continuous deployment and Over-The-Air (OTA) updates for mobile
- Implement proper CI/CD pipelines using GitHub Actions or similar tools
- Follow Expo's best practices for app deployment and publishing
- Use Vercel or similar platforms for Next.js web deployment

## Key Dependencies

- Tamagui for cross-platform UI
- React Native and Expo for mobile development
- Next.js for web development
- Solito for cross-platform navigation
- Zustand for state management
- TanStack React Query for data fetching
- Zod for validation
- Turbo for monorepo management
- i18next for internationalization 