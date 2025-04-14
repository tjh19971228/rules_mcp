# OnchainKit Development Guidelines

This document outlines best practices, conventions, and standards for developing onchain applications using OnchainKit SDK.

## General Principles

- Follow OnchainKit's component hierarchy and composition patterns
- Implement proper error handling and edge cases
- Configure proper API keys and chain settings
- Use descriptive variable names and proper TypeScript types

## Component Structure and Usage

### Identity Components

- Use Avatar, Name, Badge components for user identity
- Implement proper chain selection for ENS/Basename resolution
- Handle loading states and fallbacks appropriately
- Follow composable patterns with Identity provider

### Wallet Components

- Implement ConnectWallet with proper configuration
- Use WalletDropdown for additional wallet options
- Handle wallet connection states correctly
- Configure wallet providers and chains properly

### Transaction Components

- Use Transaction component for handling onchain transactions
- Implement proper error handling and status updates
- Configure gas estimation and sponsorship correctly
- Handle transaction lifecycle states appropriately

### Swap Components

- Implement token selection and amount inputs
- Handle quotes and price updates properly
- Configure slippage and other swap settings
- Manage swap transaction states correctly

### Frame Components

- Use FrameMetadata for proper frame configuration
- Handle frame messages and validation correctly
- Implement proper frame response handling
- Follow frame security best practices

## Best Practices

- Always wrap components with OnchainKitProvider
- Handle loading and error states appropriately
- Follow component composition patterns
- Implement proper TypeScript types
- Use proper error handling patterns
- Follow security best practices

## Error Handling

- Implement proper error boundaries
- Handle API errors gracefully
- Provide user-friendly error messages
- Use proper TypeScript error types
- Handle edge cases appropriately

## Security

- Follow blockchain security best practices
- Implement proper input validation
- Handle sensitive data securely
- Use proper authentication and authorization
- Follow smart contract interaction best practices

## Performance

- Optimize component rendering
- Handle chain switching efficiently
- Implement proper caching strategies
- Optimize API calls and data fetching
- Handle large datasets appropriately

## Accessibility

- Ensure components are accessible
- Implement proper ARIA attributes
- Handle keyboard navigation appropriately
- Follow color contrast guidelines
- Provide meaningful error messages

## Testing

- Write unit tests for components and utilities
- Implement proper mocking for blockchain interactions
- Test error handling and edge cases
- Test component composition patterns
- Implement proper test coverage

## Documentation

- Document component configurations
- Provide usage examples
- Document error handling patterns
- Document security considerations
- Keep documentation up-to-date with SDK changes 