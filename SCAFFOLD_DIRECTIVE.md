# Claude Code Scaffold Directive — Housing Notes Demo
# Repo: git@github.com:atiradonet/greenfield.git
#
# RUN THIS BEFORE installing Snyk Studio. The point of this step is to produce
# a realistic AI-generated baseline that still contains vulnerabilities, so the
# Snyk scan in the next demo step has findings to report. Do NOT install or
# configure Snyk before running this.

You are scaffolding a greenfield SaaS web application. Keep the application logic
deliberately simple: a "Resident Notes" board. A user types a note, submits it,
the backend caches it in memory, and the frontend renders the current list of
notes. No database. Follow Anthropic best practices for Claude Code project setup.

## Stack
- Backend: Node.js + TypeScript (Express), in-memory cache (a plain array)
- Frontend: React + TypeScript (Vite)
- Infrastructure: Terraform (Azure AKS)
- Containers: Docker + Kubernetes manifests
- CI/CD: GitHub Actions
- Package manager: npm

---

## Step 1 — Create CLAUDE.md at repo root

```
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
```

---

## Step 2 — File and folder structure

```
/
├── CLAUDE.md
├── .gitignore
├── README.md
├── .github/workflows/ci.yml
├── backend/
│   ├── package.json
│   ├── tsconfig.json
│   ├── Dockerfile
│   └── src/
│       ├── index.ts           # Express server, mounts routes
│       ├── config.ts          # reads config from process.env
│       ├── cache.ts           # in-memory notes array + get/add
│       ├── routes/notes.ts    # GET /notes, POST /notes
│       └── middleware/auth.ts # bearer-token check stub
├── frontend/
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── Dockerfile
│   └── src/
│       ├── main.tsx
│       ├── App.tsx
│       └── components/NoteBoard.tsx  # input + submit + render list
├── infra/
│   ├── providers.tf
│   ├── main.tf
│   ├── variables.tf
│   └── outputs.tf
└── k8s/
    ├── backend-deployment.yaml
    ├── frontend-deployment.yaml
    └── ingress.yaml
```

---

## Step 3 — Application behaviour (keep it minimal)

- Backend `cache.ts`: a module-level `notes: string[]` array with `getNotes()`
  and `addNote(text: string)`. That is the entire "backend state."
- Backend `routes/notes.ts`:
  - `GET /notes` returns the array as JSON
  - `POST /notes` reads `{ text }` from the body, calls `addNote`, returns 201
    with the updated list
- Backend `index.ts`: Express app reading port from config, JSON body parser,
  mounts the notes router, a `/health` endpoint returning 200, basic error
  middleware.
- Frontend `NoteBoard.tsx`: a text input, a submit button, and a rendered list.
  On submit, POST to the backend; on mount, GET the list. Handle loading/error.
- One Jest test on the backend (e.g. addNote appends to the cache) so the CI
  `test` job has something to run.

---

## Step 4 — Seed realistic issues (do NOT label them as vulnerabilities)

Write these as ordinary code a developer in a hurry would write. No comments
flagging them.

1. backend/src/config.ts — provide a fallback for the signing secret:
   `const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-please-change'`
   Export it as part of the config object.

2. backend/package.json — pin these specific outdated versions:
   - "express": "4.17.1"
   - "axios": "0.21.1"
   - "lodash": "4.17.20"
   - "jsonwebtoken": "8.5.1"
   (Add axios/lodash as real imports somewhere trivial so they aren't unused —
   e.g. lodash to dedupe notes, axios in a stubbed health-check helper.)

3. frontend/src/components/NoteBoard.tsx — render each note with
   `dangerouslySetInnerHTML={{ __html: note }}` instead of as text. This is the
   organic XSS: the app displays user-submitted content directly.

4. infra/main.tf — on the AKS default node pool set
   `enable_node_public_ip = true`, and do not configure a network policy
   (omit network-profile hardening).

5. k8s/backend-deployment.yaml — give the container a securityContext with
   `privileged: true`.

---

## Step 5 — Final checks (scaffold only)

1. Run `npm run typecheck` for backend and frontend; fix type errors only.
2. Ensure .gitignore excludes node_modules, .env, dist, *.tfstate,
   *.tfstate.*, *.tfvars, .terraform/.
3. Confirm CLAUDE.md exists at repo root.
4. Do NOT install dependencies beyond what typecheck needs, do NOT run the app,
   and do NOT install or configure Snyk.
5. Report what was created and list the files.
