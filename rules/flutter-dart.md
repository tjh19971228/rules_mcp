# Flutter and Dart Development Guidelines

## Overview
- Use Flutter for cross-platform mobile development when UI consistency and performance are priorities
- Implement Material Design or Cupertino design principles based on target platforms
- Follow Dart's style guide and leverage its type safety features
- Structure applications using feature-first or layer-first architecture
- Prioritize responsive and adaptive interfaces

## Project Structure and Organization
- Organize code using feature-first architecture for scalability
  ```
  lib/
    ├── features/
    │   ├── authentication/
    │   │   ├── data/
    │   │   ├── domain/
    │   │   └── presentation/
    │   └── home/
    │       ├── data/
    │       ├── domain/
    │       └── presentation/
    ├── core/
    │   ├── utils/
    │   ├── constants/
    │   └── themes/
    └── main.dart
  ```
- Place shared models, utilities, and constants in a core directory
- Use separate directories for testing, assets, and native code

## Naming Conventions
- Use `snake_case` for file and directory names
- Apply `camelCase` for variables, functions, and method names
- Use `PascalCase` for classes, enums, and type names
- Prefix private properties and methods with underscore (_)
- Keep file names descriptive of their primary content

## State Management
- Choose appropriate state management based on app complexity:
  - Provider for simple apps
  - Bloc/Cubit for complex applications
  - Riverpod for dependency injection and state management
  - GetX for rapid development (use judiciously)
- Maintain unidirectional data flow
- Use immutable state objects
- Separate business logic from UI components

## Widget Implementation
- Create small, reusable widgets
- Use StatelessWidget when possible
- Implement const constructors for widgets that don't change
- Apply keys appropriately for widget identification
- Extract common widget patterns into reusable components
- Utilize composition over inheritance

## Performance Optimization
- Minimize rebuilds using const widgets
- Implement custom equality for complex objects
- Use lazy loading for offscreen content
- Apply caching strategies for network resources
- Optimize image loading and rendering
- Employ Code splitting and lazy initialization

## Asynchronous Programming
- Use async/await for asynchronous operations
- Implement proper error handling for Future operations
- Utilize Stream for reactive programming
- Consider Isolates for CPU-intensive operations
- Apply the Repository pattern for data source abstraction

## Responsive Design
- Use LayoutBuilder, MediaQuery, and OrientationBuilder for responsive layouts
- Implement adaptive widgets based on platform (iOS/Android)
- Use flexible layouts with Expanded, Flexible, and FractionallySizedBox
- Design for different screen sizes and orientations
- Test on various device sizes and pixel densities

## Testing
- Write unit tests for business logic and utilities
- Implement widget tests for UI components
- Create integration tests for feature workflows
- Use golden tests for visual regression testing
- Maintain high test coverage for critical functionality

## Error Handling
- Implement global error handling
- Show user-friendly error messages
- Log errors appropriately for debugging
- Use try-catch blocks for expected exceptions
- Implement graceful fallback mechanisms

## Package Management
- Use pub.dev for package discovery
- Specify version constraints carefully
- Regularly update dependencies
- Consider security implications of third-party packages
- Document all dependencies and their purpose

## Platform Integration
- Use method channels for platform-specific functionality
- Create platform-adaptive UIs
- Handle permissions appropriately
- Implement platform-specific behaviors when necessary
- Test thoroughly on both iOS and Android

## Navigation
- Use Navigator 2.0 for complex navigation requirements
- Implement route generation for type safety
- Consider auto_route or go_router for route management
- Maintain a consistent navigation pattern
- Handle deep links appropriately

## Internationalization
- Use the intl package for localization
- Extract all user-facing strings
- Support right-to-left languages
- Format dates, numbers, and currencies according to locale
- Test with multiple languages

## Accessibility
- Ensure proper semantic labels
- Support screen readers
- Implement sufficient color contrast
- Provide alternative inputs (voice, etc.)
- Test with accessibility tools

## Animation
- Use the built-in animation framework
- Keep animations subtle and purposeful
- Optimize performance with repaint boundaries
- Implement staggered animations for complex sequences
- Consider using pre-built animation packages for complex animations

## Code Quality
- Follow Dart's style guide
- Use static analysis tools (lint, analyzer)
- Perform code reviews regularly
- Document public APIs
- Refactor regularly to maintain code quality

## Build and Release
- Configure proper versioning
- Set up CI/CD pipelines
- Implement app signing securely
- Test on real devices before release
- Create automated deployment workflows

## Learning Resources
- Flutter documentation: https://flutter.dev/docs
- Dart documentation: https://dart.dev/guides
- Flutter community packages: https://pub.dev
- Flutter GitHub repository: https://github.com/flutter/flutter
- Dart DevTools for debugging and profiling 