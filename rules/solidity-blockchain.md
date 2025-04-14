# Solidity and Blockchain Development Guidelines

## Key Principles
- Write concise, technical responses with accurate TypeScript examples
- Use functional, declarative programming. Avoid classes
- Prefer iteration and modularization over duplication
- Use descriptive variable names with auxiliary verbs (e.g., isLoading)
- Use lowercase with dashes for directories (e.g., components/auth-wizard)
- Favor named exports for components
- Use the Receive an Object, Return an Object (RORO) pattern

## JavaScript/TypeScript (for Web3 Frontend)
- Use "function" keyword for pure functions. Omit semicolons
- Use TypeScript for all code. Prefer interfaces over types. Avoid enums, use maps
- File structure: Exported component, subcomponents, helpers, static content, types
- Avoid unnecessary curly braces in conditional statements
- For single-line statements in conditionals, omit curly braces
- Use concise, one-line syntax for simple conditional statements (e.g., if (condition) doSomething())

## Error Handling and Validation
- Prioritize error handling and edge cases:
  - Handle errors and edge cases at the beginning of functions
  - Use early returns for error conditions to avoid deeply nested if statements
  - Place the happy path last in the function for improved readability
  - Avoid unnecessary else statements; use if-return pattern instead
  - Use guard clauses to handle preconditions and invalid states early
  - Implement proper error logging and user-friendly error messages
  - Consider using custom error types or error factories for consistent error handling

## React/Next.js (for Web3 Frontend)
- Use functional components and TypeScript interfaces
- Use declarative JSX
- Use function, not const, for components
- Use Shadcn UI, Radix, and Tailwind Aria for components and styling
- Implement responsive design with Tailwind CSS
- Use mobile-first approach for responsive design
- Place static content and interfaces at file end
- Use content variables for static content outside render functions
- Minimize 'use client', 'useEffect', and 'setState'. Favor RSC
- Use Zod for form validation
- Wrap client components in Suspense with fallback
- Use dynamic loading for non-critical components
- Optimize images: WebP format, size data, lazy loading
- Model expected errors as return values: Avoid using try/catch for expected errors in Server Actions. Use useActionState to manage these errors and return them to the client
- Use error boundaries for unexpected errors: Implement error boundaries using error.tsx and global-error.tsx files to handle unexpected errors and provide a fallback UI
- Use useActionState with react-hook-form for form validation
- Code in services/ dir always throw user-friendly errors that tanStackQuery can catch and show to the user

## Web3 Integration
- Use next-safe-action for all server actions:
  - Implement type-safe server actions with proper validation
  - Utilize the `action` function from next-safe-action for creating actions
  - Define input schemas using Zod for robust type checking and validation
  - Handle errors gracefully and return appropriate responses
  - Use import type { ActionResponse } from '@/types/actions'
  - Ensure all server actions return the ActionResponse type
  - Implement consistent error handling and success responses using ActionResponse

## Solidity Best Practices

### Security
- Always use the latest stable Solidity version
- Follow the Checks-Effects-Interactions pattern to prevent reentrancy
- Implement proper access controls for all sensitive functions
- Use SafeMath or Solidity 0.8.x built-in overflow/underflow protection
- Avoid using tx.origin for authentication
- Mark visibility explicitly for all functions and state variables
- Consider using OpenZeppelin contracts for standard functionality
- Implement proper input validation
- Use pull-over-push pattern for payments
- Avoid making external calls to untrusted contracts
- Use modifiers for access control and input validation
- Implement circuit breakers (emergency stop) for critical functions
- Avoid using block.timestamp for critical logic
- Be aware of frontrunning and implement protections when needed
- Properly test contract interactions with other contracts

### Gas Optimization
- Use uint256 instead of smaller integers unless packing structs
- Avoid unnecessary storage usage
- Use memory for function variables that don't need persistence
- Batch operations to reduce gas costs
- Minimize on-chain storage by using events for historical data
- Use mappings instead of arrays for O(1) access
- Avoid loops with unbounded length
- Use unchecked blocks for operations that cannot overflow/underflow
- Use calldata instead of memory for function parameters in external functions
- Mark view and pure functions correctly
- Pack structs to reduce storage costs

### Code Structure
- Keep contracts focused on a single responsibility
- Use inheritance to share code when appropriate
- Use interfaces to define contract interactions
- Use libraries for reusable code
- Document functions with NatSpec comments
- Use consistent naming conventions
- Organize code into logical sections (storage, events, modifiers, functions)
- Use events to log important state changes
- Define custom errors instead of revert strings
- Implement proper versioning for upgradeable contracts

### Testing and Deployment
- Write comprehensive unit tests covering all functionality
- Use proper test fixtures and setup
- Test edge cases and failure conditions
- Simulate attacks to verify security measures
- Deploy contracts to testnet before mainnet
- Verify contract source code on block explorers
- Use multisig wallets for critical operations
- Consider formal verification for high-value contracts
- Implement proper upgrade mechanisms if upgradability is needed

## Web3 Frontend Best Practices

### Wallet Integration
- Support multiple wallets through standard interfaces (EIP-1193)
- Provide clear error messages for wallet connection issues
- Handle chain switching appropriately
- Preserve wallet connection across sessions when appropriate
- Implement proper disconnection handling
- Display wallet address in a user-friendly format
- Show relevant wallet information (balance, network)

### Transaction Handling
- Provide clear transaction status updates
- Show estimated gas fees before transaction submission
- Handle transaction errors gracefully
- Implement transaction receipt monitoring
- Allow users to adjust gas settings when appropriate
- Show transaction history
- Provide links to block explorers for transactions
- Implement proper nonce management for sequential transactions

### Data Fetching and State Management
- Use React Query or SWR for data fetching and caching
- Implement proper loading and error states
- Support real-time updates through events when appropriate
- Normalize blockchain data for efficient storage and retrieval
- Cache appropriate data to reduce RPC calls
- Implement proper pagination for large datasets
- Use optimistic updates for better UX
- Handle network changes appropriately

### User Experience
- Explain complex blockchain concepts in simple terms
- Provide tooltips and help text for technical functions
- Implement proper form validation for transaction parameters
- Show confirmation dialogs for irreversible actions
- Provide feedback on long-running operations
- Design intuitive interfaces for complex operations
- Support both novice and advanced users
- Implement proper error recovery paths

## Key Web3 Conventions
1. Use viem/wagmi for Ethereum interactions
2. Use a consistent approach to handling transaction lifecycles
3. Implement proper error handling for blockchain operations
4. Use typed contracts generated from ABIs
5. Support multiple networks with proper detection and switching
6. Follow best practices for secure key and seed phrase handling
7. Implement proper testing for blockchain interactions 