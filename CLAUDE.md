# Housing Notes — Claude Code Project Context

## Bash commands
- npm run build: Build all packages
- npm run typecheck: Run the TypeScript compiler check
- npm run lint: Run ESLint
- npm run test: Run the Jest test suite
- npm run dev: Start backend and frontend in development mode

## Project structure
- /backend  — Node.js + TypeScript Express API (in-memory note cache)
- /frontend — React + TypeScript Vite app
- /infra    — Terraform modules for Azure AKS
- /k8s      — Kubernetes manifests
- .github/workflows — GitHub Actions CI

## Code style
- Use ES modules (import/export), not CommonJS (require)
- Destructure imports where possible
- Explicit TypeScript return types on functions
- No use of the `any` type
- React components are functional (arrow functions)

## Workflow
- Run typecheck after a series of code changes
- Run lint before committing
- Branch naming: feature/, fix/, chore/
- Prefer rebase over merge

## IMPORTANT
- Never hardcode secrets, credentials, or API keys in source files
- Read all configuration from environment variables via process.env
- YOU MUST typecheck before considering any task complete
