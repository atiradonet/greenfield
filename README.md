# Housing Notes

A minimal "Resident Notes" board SaaS demo. Residents post short notes; the
backend keeps them in an in-memory cache and the frontend renders the current
list. No database.

## Structure

| Path | Description |
| --- | --- |
| `/backend` | Node.js + TypeScript Express API with an in-memory note cache |
| `/frontend` | React + TypeScript (Vite) single-page app |
| `/infra` | Terraform modules for Azure AKS |
| `/k8s` | Kubernetes manifests |
| `.github/workflows` | GitHub Actions CI |

## Getting started

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend (in a second terminal)
cd frontend
npm install
npm run dev
```

## Scripts

- `npm run build` — Build all packages
- `npm run typecheck` — TypeScript compiler check
- `npm run lint` — ESLint
- `npm run test` — Jest test suite
- `npm run dev` — Start in development mode

## Configuration

All configuration is read from environment variables. See
`backend/src/config.ts` for the available settings.
