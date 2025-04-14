# Web3 Development Guidelines (Viem & Wagmi)

This document outlines best practices, conventions, and standards for developing Web3 applications using Solidity, TypeScript, Viem v2, Wagmi v2, and other modern web technologies.

## Key Principles

- Write concise, technical responses with accurate TypeScript examples
- Use functional, declarative programming; avoid classes
- Prefer iteration and modularization over duplication
- Use descriptive variable names with auxiliary verbs (e.g., isLoading, hasError)
- Use lowercase with dashes for directories (e.g., components/wallet-connect)
- Favor named exports for functions and components
- Use the Receive an Object, Return an Object (RORO) pattern

## TypeScript Usage

- Use TypeScript for all code; prefer interfaces over types for complex objects
- Avoid enums; use literal union types or const objects instead
- Use functional components with TypeScript interfaces for props
- Implement proper type definitions for blockchain interactions
- Create custom type definitions for contract ABIs and events
- Use Viem's built-in types for common blockchain data structures
- Utilize TypeScript's utility types (Partial, Pick, Omit, etc.) for transforming types

## Solidity Development

- Follow Solidity style guide and best practices
- Use recent compiler versions (at least 0.8.x)
- Implement proper security patterns and checks
- Use existing libraries (e.g., OpenZeppelin) for standard functionality
- Optimize for gas efficiency where appropriate
- Add comprehensive test coverage for all contracts
- Implement proper error handling and custom errors
- Document functions and contracts with NatSpec comments

## Viem Integration

- Use Viem v2 for all Ethereum interactions
- Create custom hooks or utilities for common Viem operations
- Use public clients for read operations and wallet clients for write operations
- Implement proper error handling for all blockchain interactions
- Use Viem's built-in ABI utilities for contract interactions
- Leverage Viem's transport and chain management features
- Use Viem's multicall functionality for batching calls when appropriate
- Implement proper transaction management and receipt handling

## Wagmi Integration

- Use Wagmi v2 for React hooks and wallet connectivity
- Leverage Wagmi's hook system for common Web3 operations
- Use `useAccount` for account information and connection state
- Implement proper wallet connection and disconnection handling
- Use Wagmi's contract hooks for common contract interactions
- Leverage Wagmi's caching and state synchronization features
- Use Wagmi's config for consistent chain and client configuration
- Implement proper error handling for all Wagmi hooks

## Web3 Component Architecture

- Create reusable components for common Web3 UI patterns
- Implement proper wallet connection and network switching interfaces
- Create composable hooks for contract interactions
- Separate blockchain logic from UI components
- Use React Context or state management for sharing Web3 state
- Implement proper loading and error states for blockchain interactions
- Create fallback UIs for disconnected or wrong network states

## Error Handling and Validation

- Prioritize error handling and edge cases:
  - Handle errors and edge cases at the beginning of functions
  - Use early returns for error conditions to avoid deeply nested if statements
  - Implement proper error messages for different blockchain error scenarios
  - Handle network-specific errors and gas estimation failures
  - Implement proper transaction confirmation and receipt verification
  - Create user-friendly error messages for common blockchain errors

## Performance Optimization

- Minimize unnecessary blockchain calls
- Use proper caching strategies for blockchain data
- Implement batching with multicall where appropriate
- Use event listeners instead of polling where possible
- Debounce or throttle frequent blockchain calls
- Implement proper memoization for expensive computations
- Handle subscription cleanup properly

## User Experience

- Implement proper loading states for blockchain interactions
- Show clear transaction progress and confirmation states
- Provide meaningful feedback for transaction success or failure
- Implement proper handling for transaction speed-up and cancellation
- Create intuitive interfaces for wallet connection and switching
- Handle network switching and multiple connected accounts gracefully
- Implement proper gas estimation and fee displays

## Security Best Practices

- Validate all user inputs before sending to blockchain
- Implement proper signature verification for messages
- Never expose private keys or mnemonic phrases
- Use secure storage for any sensitive information
- Implement proper permission checks for contract interactions
- Follow best practices for preventing front-running and other attacks
- Keep dependencies updated to avoid security vulnerabilities

## Testing

- Write unit tests for contract interactions and Web3 utilities
- Implement integration tests for critical user flows
- Use mocking for blockchain interactions in tests
- Test with different network conditions and error scenarios
- Implement proper fixtures and factories for test data

## Project Structure

- Organize Web3 code in a dedicated directory structure
- Keep contract ABIs and addresses in a centralized location
- Use environment variables for network-specific configurations
- Implement proper separation between read and write operations
- Create utilities for common blockchain operations

## Key Dependencies

- Viem v2 for blockchain interactions
- Wagmi v2 for React hooks
- TypeScript for type safety
- React for UI components
- Hardhat or Foundry for contract development and testing
- Ethers.js (optional) for specialized functionality

## Documentation

- Document all contract interactions and Web3 utilities
- Create clear usage examples for custom hooks
- Maintain up-to-date documentation for contract functions
- Document supported networks and configurations
- Provide clear error handling guidelines 