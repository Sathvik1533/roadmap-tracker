import { useState, useEffect, useMemo } from "react";
import { fetchAllData, upsertTask, upsertLog, upsertProject } from "./services/roadmap";

const WEEKS = [
  {
    week: 1,
    phase: "Core Web Fundamentals",
    title: "HTML + CSS Essentials + Tailwind",
    color: "#e67e22",
    topics: [
      "Semantic HTML5 & accessibility basics",
      "Flexbox + Grid — layout essentials only",
      "Tailwind CSS — utility-first workflow",
      "Responsive design with Tailwind breakpoints",
      "Git fundamentals — commit, branch, merge, PR flow",
    ],
    days: [
      {
        day: "Mon",
        focus: "HTML + Flexbox + Grid Crash",
        tasks: [
          "Build a page with semantic tags: header, main, nav, article, footer",
          "Flexbox: build a navbar + card row (use Flexbox Froggy for 30min warm-up)",
          "Grid: build a 2-column dashboard layout with grid-template-areas",
          "Validate with W3C validator — 0 errors",
        ],
        build: "Dashboard layout skeleton",
        points: { learn: 10, build: 15 },
      },
      {
        day: "Tue",
        focus: "Tailwind CSS Setup & Core",
        tasks: [
          "Install Tailwind via CLI, understand utility-first philosophy",
          "Rebuild yesterday's layout in Tailwind (flex, grid, gap, padding utilities)",
          "Learn responsive: sm:, md:, lg: breakpoints + mobile-first approach",
          "Dark mode with Tailwind's dark: variant",
        ],
        build: "Tailwind responsive dashboard",
        points: { learn: 10, build: 15 },
      },
      {
        day: "Wed",
        focus: "Tailwind Components & Patterns",
        tasks: [
          "Build 8 common UI components in Tailwind: button, card, badge, input, alert, avatar, dropdown, modal",
          "Use @apply for reusable component classes",
          "Tailwind group: and peer: for interactive states",
        ],
        build: "Component library in Tailwind",
        points: { learn: 10, build: 20 },
      },
      {
        day: "Thu",
        focus: "Responsive Landing Page",
        tasks: [
          "Build a complete SaaS landing page with Tailwind",
          "Hero section, features grid, pricing cards, footer",
          "Must look good on mobile, tablet, desktop — test in DevTools",
        ],
        build: "SaaS landing page",
        points: { learn: 5, build: 25 },
      },
      {
        day: "Fri",
        focus: "Git + GitHub Workflow",
        tasks: [
          "git init, add, commit, branch, merge, rebase basics",
          "Create a GitHub repo, push code, write a proper README",
          "Practice: feature branch → PR → merge flow",
          "Set up .gitignore, understand staging area",
        ],
        build: "GitHub repo with PR workflow",
        points: { learn: 15, build: 10 },
      },
      {
        day: "Sat",
        focus: "MINI PROJECT DAY",
        tasks: [
          "Build a personal portfolio site with Tailwind CSS",
          "Responsive, dark mode toggle, clean layout",
          "Deploy to Vercel or Netlify, share the link",
        ],
        build: "🚀 Portfolio Website v1",
        points: { learn: 5, build: 30 },
      },
      {
        day: "Sun",
        focus: "Review + Consolidate",
        tasks: [
          "Rebuild a component from memory without reference",
          "Write notes on Flexbox vs Grid decision criteria",
          "Fill daily tracker for the week",
        ],
        build: "Revision & self-assessment",
        points: { learn: 10, build: 5 },
      },
    ],
    moveOn:
      "You can take any Dribbble/Figma screenshot and build it with Tailwind. You know Flexbox vs Grid decisions. You can push code to GitHub with proper branching.",
    resources: [
      {
        name: "Tailwind CSS official docs + Playground",
        why: "Best resource. Interactive examples for every utility.",
        how: "Skim the docs for each utility class family. Build alongside — don't read passively.",
      },
      {
        name: "Kevin Powell — Flexbox/Grid essentials (pick 2-3 videos only)",
        why: "Understand layout concepts. Skip his advanced CSS — you won't need it.",
        how: "Watch the flex + grid videos at 1.5x. Then close YouTube and build.",
      },
    ],
    studyStructure: {
      block1: "1.5h — Concept learning (docs, 1 focused video max)",
      block2: "3h — Build the day's project from scratch",
      block3: "1.5h — Experiment with Tailwind variants, rebuild faster",
    },
  },
  {
    week: 2,
    phase: "Core Web Fundamentals",
    title: "JavaScript — Language Mastery",
    color: "#f1c40f",
    topics: [
      "Variables, types, coercion, equality",
      "Functions: declarations, expressions, arrows, closures",
      "Array methods: map, filter, reduce, find, some, every",
      "Objects: destructuring, spread, computed properties",
      "Promises, async/await, event loop",
      "DOM manipulation (before frameworks)",
      "ES2024+ features & error handling patterns",
    ],
    days: [
      {
        day: "Mon",
        focus: "JS Foundations Deep",
        tasks: [
          "Understand var/let/const, hoisting, TDZ",
          "Master type coercion — predict 20 tricky expressions",
          "Write 10 functions using closures (counter, memoize, once, debounce)",
        ],
        build: "Closure-based counter + memoize utility",
        points: { learn: 20, build: 10 },
      },
      {
        day: "Tue",
        focus: "Arrays & Objects",
        tasks: [
          "Implement your own map, filter, reduce from scratch",
          "Chain 5+ array methods to transform complex data (group, sort, flatten)",
          "Master destructuring + spread in nested objects and function params",
        ],
        build: "Data transformation pipeline",
        points: { learn: 15, build: 15 },
      },
      {
        day: "Wed",
        focus: "Async JavaScript",
        tasks: [
          "Understand the event loop — draw callstack, task queue, microtask queue",
          "Convert callback hell → Promises → async/await",
          "Build a sequential + parallel API fetcher with Promise.all, Promise.allSettled",
          "Implement proper error handling: try/catch, .catch, error boundaries pattern",
        ],
        build: "Multi-API data aggregator with error handling",
        points: { learn: 20, build: 10 },
      },
      {
        day: "Thu",
        focus: "DOM + Events",
        tasks: [
          "Build a todo app with vanilla JS (no framework, no libraries)",
          "Implement event delegation on a dynamic list",
          "Create a modal system with keyboard support (Esc, Tab trapping)",
        ],
        build: "Vanilla JS Todo App",
        points: { learn: 10, build: 20 },
      },
      {
        day: "Fri",
        focus: "Modern JS + Modules + Error Patterns",
        tasks: [
          "ES Modules: import/export, named vs default, dynamic import()",
          "Optional chaining, nullish coalescing, structuredClone",
          "Custom Error classes, error propagation patterns",
          "Build a modular utility library with proper error handling",
        ],
        build: "JS utility library (modular)",
        points: { learn: 15, build: 15 },
      },
      {
        day: "Sat",
        focus: "MINI PROJECT DAY",
        tasks: [
          "Build an interactive quiz app with timer, scoring, localStorage persistence",
          "Fetch questions from Open Trivia API with retry logic",
          "Proper error states, loading states, empty states",
        ],
        build: "🚀 Interactive Quiz App",
        points: { learn: 5, build: 30 },
      },
      {
        day: "Sun",
        focus: "Review + Consolidate",
        tasks: [
          "Solve 10 JS challenges on codewars (5kyu+)",
          "Explain closures, event loop, prototypes in your own words (record yourself)",
          "Update daily tracker",
        ],
        build: "Revision & self-assessment",
        points: { learn: 15, build: 5 },
      },
    ],
    moveOn:
      "You can explain closures, the event loop, and prototypal inheritance to someone else. You can transform any data structure with array methods without Googling. Error handling is second nature.",
    resources: [
      {
        name: "Akshay Saini — Namaste JavaScript",
        why: "Deepest JS fundamentals on YouTube. Covers engine internals.",
        how: "Watch, pause, explain to yourself. Then code examples WITHOUT looking.",
      },
      {
        name: "JavaScript.info (website)",
        why: "Best written JS reference. Use as lookup after video learning.",
        how: "Read the chapter matching today's topic. Do every exercise.",
      },
    ],
    studyStructure: {
      block1: "2h — Concept learning (video + docs)",
      block2: "2.5h — Coding challenges + day's build",
      block3: "1.5h — Solve problems on codewars/leetcode (JS focus)",
    },
  },
  {
    week: 3,
    phase: "Frontend Development",
    title: "React + TypeScript — Core Mastery",
    color: "#3498db",
    topics: [
      "TypeScript essentials: types, interfaces, generics, unions",
      "React with TypeScript: typed props, state, events, refs",
      "useState, useEffect, useRef, useCallback, useMemo",
      "Custom hooks (typed)",
      "Forms: controlled components, Zod validation",
      "React DevTools profiling",
    ],
    days: [
      {
        day: "Mon",
        focus: "TypeScript Crash Course",
        tasks: [
          "Types vs interfaces, when to use which (interfaces for objects, types for unions)",
          "Generics: write a generic useState-like function, generic API fetcher",
          "Utility types: Partial, Pick, Omit, Record — use each in a real example",
          "Set up a React + TypeScript project with Vite",
        ],
        build: "TypeScript playground with 15+ typed examples",
        points: { learn: 25, build: 5 },
      },
      {
        day: "Tue",
        focus: "React + TS Components",
        tasks: [
          "Build 5 typed components: Button<variant>, Card<T>, Badge, Input, Select",
          "Type props with interfaces, use discriminated unions for variants",
          "Type events: onChange, onClick, onSubmit with proper React event types",
          "Type children: ReactNode vs ReactElement vs string",
        ],
        build: "Typed component library (5 components)",
        points: { learn: 15, build: 15 },
      },
      {
        day: "Wed",
        focus: "Hooks Deep Dive (Typed)",
        tasks: [
          "useState with complex types, useRef<HTMLInputElement>",
          "useEffect: cleanup, dependency arrays, fetch with AbortController",
          "Build typed custom hooks: useFetch<T>, useDebounce<T>, useLocalStorage<T>",
        ],
        build: "Custom hooks library with full TypeScript",
        points: { learn: 15, build: 15 },
      },
      {
        day: "Thu",
        focus: "Forms + Validation",
        tasks: [
          "Build a multi-step registration form with TypeScript",
          "Zod schemas for validation, infer types from schemas",
          "Handle complex form state with useReducer (typed actions + state)",
          "Field-level errors, form-level errors, submit handling",
        ],
        build: "Multi-step typed form with Zod",
        points: { learn: 10, build: 20 },
      },
      {
        day: "Fri",
        focus: "State Management Patterns",
        tasks: [
          "useReducer with discriminated union actions (TypeScript shines here)",
          "Context API: typed contexts for theme + auth",
          "When to use Context vs prop drilling vs Zustand",
          "Build a complete auth context with login/logout/user state",
        ],
        build: "Typed auth + theme context system",
        points: { learn: 15, build: 15 },
      },
      {
        day: "Sat",
        focus: "MINI PROJECT DAY",
        tasks: [
          "Build a Kanban board in React + TypeScript",
          "Typed columns, cards, drag state. CRUD operations on cards",
          "Persist to localStorage with typed serialization",
        ],
        build: "🚀 TypeScript Kanban Board",
        points: { learn: 5, build: 30 },
      },
      {
        day: "Sun",
        focus: "Review + Consolidate",
        tasks: [
          "Rebuild the form from Thu WITHOUT reference — must typecheck cleanly",
          "Profile with React DevTools — fix unnecessary re-renders",
          "Update tracker",
        ],
        build: "Revision & optimization",
        points: { learn: 10, build: 10 },
      },
    ],
    moveOn:
      "You can build any UI in React+TS without type errors. Generics feel natural. You type props, hooks, events, and context without looking up syntax. Custom hooks are second nature.",
    resources: [
      {
        name: "React.dev official docs (new)",
        why: "The 2024+ docs are excellent with TypeScript examples built in.",
        how: "Read each concept, do EVERY interactive exercise. Add TS types yourself.",
      },
      {
        name: "Matt Pocock — Total TypeScript (YouTube + free content)",
        why: "Best TypeScript educator. Teaches the WHY behind types.",
        how: "Watch his 'TypeScript for React' series. Do his challenges.",
      },
    ],
    studyStructure: {
      block1: "1.5h — Read React.dev docs + TypeScript patterns",
      block2: "3h — Build the day's project (must compile with strict mode)",
      block3: "1.5h — Refactor JS → TS, experiment with advanced types",
    },
  },
  {
    week: 4,
    phase: "Frontend Development",
    title: "Next.js + TypeScript — Production Frontend",
    color: "#2c3e50",
    topics: [
      "App Router, file-based routing, layouts (all TypeScript)",
      "Server Components vs Client Components",
      "Data fetching: server actions, route handlers (typed)",
      "SSR, SSG, ISR — when to use which",
      "Tailwind + shadcn/ui for rapid UI",
      "Testing: Vitest + React Testing Library",
    ],
    days: [
      {
        day: "Mon",
        focus: "Next.js App Router + TS",
        tasks: [
          "Set up Next.js 15 with TypeScript strict mode + Tailwind + shadcn/ui",
          "Create typed layouts, nested routes, loading.tsx, error.tsx",
          "Understand server vs client component boundary — when/why 'use client'",
        ],
        build: "Multi-page app skeleton with typed layouts",
        points: { learn: 15, build: 10 },
      },
      {
        day: "Tue",
        focus: "Data Fetching + Server Actions",
        tasks: [
          "Fetch data in Server Components with typed responses",
          "Server actions: typed form mutations with Zod validation",
          "Route handlers (API routes) with typed request/response",
        ],
        build: "Blog with typed server-fetched posts + create action",
        points: { learn: 15, build: 15 },
      },
      {
        day: "Wed",
        focus: "SSR / SSG / Auth",
        tasks: [
          "Static generation for marketing pages, dynamic for user content",
          "NextAuth.js v5 setup with TypeScript",
          "Protected routes with middleware.ts, session typing",
          "Role-based access: admin vs user pages",
        ],
        build: "Auth system with protected typed routes",
        points: { learn: 15, build: 15 },
      },
      {
        day: "Thu",
        focus: "UI Patterns with shadcn/ui",
        tasks: [
          "Install 10+ shadcn components: Button, Dialog, Table, Form, Toast, etc.",
          "Build a data table with sorting, filtering, pagination",
          "Form with shadcn + react-hook-form + Zod (the standard stack)",
        ],
        build: "Dashboard with data table + forms",
        points: { learn: 10, build: 20 },
      },
      {
        day: "Fri",
        focus: "Testing + Quality",
        tasks: [
          "Set up Vitest + React Testing Library",
          "Write tests for 3 components: render, user interaction, async",
          "Test a custom hook with renderHook",
          "Lint: ESLint + Prettier + TypeScript strict",
        ],
        build: "Test suite for components + hooks",
        points: { learn: 15, build: 15 },
      },
      {
        day: "Sat",
        focus: "MAJOR PROJECT",
        tasks: [
          "Build: SaaS Dashboard App (frontend complete)",
          "Landing page + auth + dashboard + data tables + forms",
          "Full TypeScript, shadcn/ui, responsive, tested",
        ],
        build: "🚀 SaaS Dashboard Frontend",
        points: { learn: 5, build: 30 },
      },
      {
        day: "Sun",
        focus: "Review + Deploy",
        tasks: [
          "Deploy to Vercel with environment variables",
          "Run Lighthouse — fix performance/accessibility issues",
          "Write README with setup instructions",
        ],
        build: "Production deployment",
        points: { learn: 5, build: 15 },
      },
    ],
    moveOn:
      "You can explain server vs client components. Next.js app is deployed with auth, typed throughout, and passes tests. Comfortable with shadcn/ui + Tailwind.",
    resources: [
      {
        name: "Next.js official docs + learn course",
        why: "Vercel's own tutorial is the gold standard.",
        how: "Follow the interactive course, then build YOUR project alongside.",
      },
      {
        name: "Lee Robinson (Vercel VP) + Theo — YouTube",
        why: "Real-world Next.js patterns, latest App Router features.",
        how: "Watch after you've built something — validates your approach.",
      },
    ],
    studyStructure: {
      block1: "1.5h — Docs + concept learning",
      block2: "3.5h — Build and iterate",
      block3: "1h — Test, deploy, review",
    },
  },
  {
    week: 5,
    phase: "Backend Engineering",
    title: "Node.js + Express + TypeScript — API Mastery",
    color: "#27ae60",
    topics: [
      "Node.js runtime internals, event loop, streams",
      "Express with TypeScript: typed routes, middleware, request/response",
      "REST API design: resource naming, status codes, versioning",
      "Auth deep: JWT refresh tokens, OAuth 2.0, sessions vs tokens",
      "Input validation with Zod, request sanitization",
      "API testing with Supertest + Vitest",
    ],
    days: [
      {
        day: "Mon",
        focus: "Node.js + TypeScript Setup",
        tasks: [
          "Set up Node+Express+TypeScript project (tsx or ts-node + tsconfig strict)",
          "Type Express: Request, Response, NextFunction, custom typed middleware",
          "Project structure: routes/, controllers/, middleware/, services/, types/",
          "Environment config with typed env validation (Zod + dotenv)",
        ],
        build: "Production-ready Express+TS project skeleton",
        points: { learn: 15, build: 15 },
      },
      {
        day: "Tue",
        focus: "REST API Design + CRUD",
        tasks: [
          "Design RESTful endpoints: proper nouns, HTTP verbs, status codes",
          "Build full typed CRUD for users + posts resources",
          "Zod request validation middleware (validate body, params, query)",
          "Pagination: cursor-based + offset patterns, filtering, sorting",
        ],
        build: "Typed REST API with validation + pagination",
        points: { learn: 15, build: 15 },
      },
      {
        day: "Wed",
        focus: "Authentication System Deep",
        tasks: [
          "Build complete auth: register → login → access token → refresh token",
          "Password hashing (bcrypt/argon2), JWT signing with RS256 vs HS256 tradeoffs",
          "Refresh token rotation, token blacklisting strategy",
          "OAuth 2.0 flow: implement Google login (passport.js or manual)",
        ],
        build: "🚀 Production Auth System (JWT + OAuth + Refresh)",
        points: { learn: 15, build: 20 },
      },
      {
        day: "Thu",
        focus: "Middleware + Error Handling + Security",
        tasks: [
          "Global error handler with typed custom errors (AppError class hierarchy)",
          "Rate limiting per-route, CORS config, Helmet security headers",
          "Request logging with structured logs (pino or winston)",
          "API key authentication for service-to-service calls",
        ],
        build: "Secured API with comprehensive error handling",
        points: { learn: 15, build: 15 },
      },
      {
        day: "Fri",
        focus: "Testing + Documentation",
        tasks: [
          "Supertest + Vitest: test auth flows, CRUD, validation errors",
          "Test edge cases: expired tokens, invalid inputs, missing fields",
          "Swagger/OpenAPI auto-generated docs from Zod schemas",
          "Integration tests for the complete auth flow",
        ],
        build: "Tested + documented API (15+ tests)",
        points: { learn: 10, build: 20 },
      },
      {
        day: "Sat",
        focus: "MAJOR PROJECT",
        tasks: [
          "Build: Multi-tenant URL Shortener API",
          "Features: custom slugs, click analytics, user quotas, API keys",
          "Rate limiting per tier, URL expiration, redirect tracking",
        ],
        build: "🚀 Scalable URL Shortener API",
        points: { learn: 5, build: 30 },
      },
      {
        day: "Sun",
        focus: "Review + Harden",
        tasks: [
          "Security audit: test with bad inputs, injection attempts, XSS payloads",
          "Load test with autocannon — find bottlenecks",
          "Update tracker, document design decisions",
        ],
        build: "Hardened, load-tested API",
        points: { learn: 10, build: 10 },
      },
    ],
    moveOn:
      "You can design and build a typed REST API with auth, validation, testing, and docs. You understand refresh token rotation, OAuth, and can write integration tests.",
    resources: [
      {
        name: "The Odin Project — NodeJS path",
        why: "Project-based, teaches real backend patterns.",
        how: "Follow structure but build YOUR projects with TypeScript on top.",
      },
      {
        name: "Hussein Nasser — Backend Engineering YouTube",
        why: "Explains backend concepts deeply: HTTP, TCP, connection pooling.",
        how: "Watch conceptual videos for WHY. Then implement in your project.",
      },
    ],
    studyStructure: {
      block1: "1.5h — Backend concepts + API design patterns",
      block2: "3h — Build APIs with TypeScript, test with Postman",
      block3: "1.5h — Write tests + security hardening",
    },
  },
  {
    week: 6,
    phase: "Backend Engineering",
    title: "Databases + Queues + System Design Intro",
    color: "#8e44ad",
    topics: [
      "PostgreSQL: schema design, joins, indexes, transactions",
      "Prisma ORM with TypeScript",
      "MongoDB for flexible data + Mongoose",
      "Redis: caching, sessions, rate limiting, pub/sub",
      "Background jobs with BullMQ (Redis-backed queues)",
      "System Design foundations: thinking at scale",
    ],
    days: [
      {
        day: "Mon",
        focus: "PostgreSQL + Prisma",
        tasks: [
          "Design normalized schema: users, posts, comments, tags (ERD first on paper)",
          "Set up Prisma, define schema with relations, run migrations",
          "CRUD with Prisma Client (typed), nested writes, transactions",
          "Indexes: when to add, composite indexes, EXPLAIN ANALYZE",
        ],
        build: "Blog platform database with Prisma",
        points: { learn: 15, build: 15 },
      },
      {
        day: "Tue",
        focus: "Advanced PostgreSQL Patterns",
        tasks: [
          "Transactions for multi-step operations (transfer money, create order)",
          "Soft deletes, audit logs, created_at/updated_at patterns",
          "Full-text search in PostgreSQL (ts_vector)",
          "Database seeding script for development",
        ],
        build: "Transactional API with search + audit logs",
        points: { learn: 15, build: 15 },
      },
      {
        day: "Wed",
        focus: "MongoDB + SQL vs NoSQL Decisions",
        tasks: [
          "MongoDB: documents, embedded vs referenced, aggregation pipeline",
          "Mongoose with TypeScript: typed schemas, validation, middleware",
          "Build same feature in PostgreSQL and MongoDB — compare the experience",
          "Decision framework: SQL for relations, NoSQL for flexible/nested schema",
        ],
        build: "Dual-database comparison + decision doc",
        points: { learn: 20, build: 10 },
      },
      {
        day: "Thu",
        focus: "Redis + Caching + Queues",
        tasks: [
          "Redis fundamentals: strings, hashes, sets, sorted sets, TTL",
          "Cache API responses: cache-aside pattern, invalidation strategies",
          "Session storage in Redis (replace JWT for some flows)",
          "BullMQ: create a background job queue for email sending + retries",
        ],
        build: "API with Redis caching + email queue",
        points: { learn: 15, build: 15 },
      },
      {
        day: "Fri",
        focus: "System Design Thinking",
        tasks: [
          "Trace a request from browser to database and back — draw every hop",
          "Concepts: load balancing, horizontal scaling, database replication",
          "Design exercise: sketch architecture for Twitter's tweet system",
          "CAP theorem, eventual consistency, message queues — explain each simply",
        ],
        build: "3 system design sketches (Twitter, URL shortener, chat app)",
        points: { learn: 25, build: 5 },
      },
      {
        day: "Sat",
        focus: "MAJOR PROJECT",
        tasks: [
          "Build: E-Commerce Order API",
          "Products, cart, orders with PostgreSQL + Prisma + transactions",
          "Background: order confirmation email via BullMQ, inventory deduction",
          "Redis cache for product catalog, rate limiting per user",
        ],
        build: "🚀 E-Commerce Order Processing API",
        points: { learn: 5, build: 30 },
      },
      {
        day: "Sun",
        focus: "Review + Optimize",
        tasks: [
          "Optimize slow queries with EXPLAIN ANALYZE + indexes",
          "Write decision doc: PostgreSQL vs MongoDB vs Redis — when each",
          "Update tracker",
        ],
        build: "Database decision framework + optimized queries",
        points: { learn: 15, build: 5 },
      },
    ],
    moveOn:
      "You can design schemas, use transactions, implement caching with Redis, and set up background queues. You can sketch a system architecture and explain scaling concepts.",
    resources: [
      {
        name: "Hussein Nasser — Database Engineering YouTube",
        why: "Deep dives into indexes, B-trees, connection pooling, replication.",
        how: "Watch conceptual videos. These are 'think like an engineer' lessons.",
      },
      {
        name: "System Design Primer (GitHub)",
        why: "The reference for system design. Start now, continue forever.",
        how: "Read 1 topic per day. Sketch every diagram yourself on paper.",
      },
    ],
    studyStructure: {
      block1: "1.5h — Database concepts + system design reading",
      block2: "3h — Build APIs with database + cache + queues",
      block3: "1.5h — Optimization + system design sketches",
    },
  },
  {
    week: 7,
    phase: "Full Stack Integration",
    title: "Full Stack Build + DevOps Essentials",
    color: "#e74c3c",
    topics: [
      "Connecting Next.js frontend to Express backend (typed E2E)",
      "TanStack Query for server state management",
      "WebSockets for real-time features",
      "Docker basics: containerize your app",
      "CI/CD with GitHub Actions",
      "Environment management: dev, staging, production",
    ],
    days: [
      {
        day: "Mon",
        focus: "Full Stack Architecture",
        tasks: [
          "Design architecture for a project management tool",
          "Define typed API contract (shared types between frontend and backend)",
          "Set up monorepo or separate repos with shared types package",
          "Configure CORS, proxy, environment variables for local dev",
        ],
        build: "Architecture diagram + typed API contract",
        points: { learn: 15, build: 10 },
      },
      {
        day: "Tue",
        focus: "API Integration + TanStack Query",
        tasks: [
          "Connect Next.js to Express API with typed fetch wrapper",
          "TanStack Query: queries, mutations, optimistic updates, cache invalidation",
          "Handle all states: loading skeleton, error boundary, empty state",
          "Infinite scroll or paginated data loading",
        ],
        build: "Connected frontend with smart data fetching",
        points: { learn: 10, build: 20 },
      },
      {
        day: "Wed",
        focus: "Auth E2E + WebSockets",
        tasks: [
          "Complete auth flow: signup → login → JWT → protected pages",
          "Token refresh on 401, redirect to login on auth failure",
          "WebSocket with Socket.io: real-time notifications",
          "Online presence indicator (who's online)",
        ],
        build: "Auth flow + real-time notifications",
        points: { learn: 10, build: 20 },
      },
      {
        day: "Thu",
        focus: "Docker + Deployment",
        tasks: [
          "Write Dockerfile for backend (multi-stage build)",
          "docker-compose: backend + PostgreSQL + Redis",
          "Deploy backend to Railway/Render, frontend to Vercel",
          "Environment variables management across environments",
        ],
        build: "Dockerized + deployed full stack",
        points: { learn: 15, build: 15 },
      },
      {
        day: "Fri-Sat",
        focus: "MAJOR PROJECT BUILD",
        tasks: [
          "Build: Project Management Tool (like mini Linear)",
          "Features: projects, tasks with status columns, team members, real-time updates",
          "Backend: Express+TS+Prisma+PostgreSQL+Redis+BullMQ",
          "Frontend: Next.js+TS+TanStack Query+shadcn/ui",
          "Background: email notifications on task assignment",
        ],
        build: "🚀 Project Management App — Full Stack",
        points: { learn: 5, build: 40 },
      },
      {
        day: "Sun",
        focus: "CI/CD + Review",
        tasks: [
          "GitHub Actions: lint → test → build → deploy pipeline",
          "End-to-end testing of critical flows (auth, create task, assign)",
          "Write comprehensive README with architecture diagram",
        ],
        build: "CI/CD pipeline + production deployment",
        points: { learn: 10, build: 15 },
      },
    ],
    moveOn:
      "You have a deployed full-stack TypeScript app with auth, real-time, background jobs, CI/CD, and Docker. You can build any full-stack app from idea to production.",
    resources: [
      {
        name: "TanStack Query docs + Fireship Docker in 100 seconds",
        why: "TanStack Query is essential. Docker basics are enough for now.",
        how: "Read TanStack docs deeply. Watch Docker overview, then just DO it.",
      },
      {
        name: "GitHub Actions official docs",
        why: "CI/CD is a must-have skill. Start simple, grow complexity.",
        how: "Copy a starter workflow, understand each step, customize.",
      },
    ],
    studyStructure: {
      block1: "1h — Architecture planning + DevOps concepts",
      block2: "4h — Build, integrate, deploy",
      block3: "1.5h — Debug, test, CI/CD setup",
    },
  },
  {
    week: 8,
    phase: "Python + FastAPI",
    title: "Python Backend + Advanced Patterns",
    color: "#16a085",
    topics: [
      "Python for JS developers (fast track)",
      "FastAPI: modern Python web framework",
      "Pydantic validation, async Python",
      "Background tasks: Celery + Redis",
      "Streaming responses, WebSockets in FastAPI",
      "Clean architecture: repository + service patterns",
    ],
    days: [
      {
        day: "Mon",
        focus: "Python for JS Developers",
        tasks: [
          "Python syntax, data structures, list/dict comprehensions",
          "Functions, decorators, type hints, dataclasses",
          "Virtual environments, pip, project structure (src layout)",
          "Compare: JS object ↔ Python dict, Array ↔ List, Promise ↔ asyncio",
        ],
        build: "Data processing script with type hints",
        points: { learn: 20, build: 10 },
      },
      {
        day: "Tue",
        focus: "FastAPI Fundamentals",
        tasks: [
          "Set up FastAPI project with proper structure",
          "Path/query parameters, request bodies with Pydantic models",
          "Dependency injection for database, auth, common patterns",
          "Auto-generated docs (Swagger UI comes free with FastAPI)",
        ],
        build: "Typed REST API with FastAPI + Pydantic",
        points: { learn: 15, build: 15 },
      },
      {
        day: "Wed",
        focus: "FastAPI + Database + Auth",
        tasks: [
          "SQLAlchemy + PostgreSQL async integration",
          "Alembic migrations",
          "JWT auth in FastAPI with dependency injection",
          "Build same auth system as Express — compare approaches",
        ],
        build: "Authenticated FastAPI with PostgreSQL",
        points: { learn: 15, build: 15 },
      },
      {
        day: "Thu",
        focus: "Async + Background Jobs + Streaming",
        tasks: [
          "Async endpoints, background tasks with Celery + Redis",
          "Streaming responses with StreamingResponse (critical for AI apps)",
          "WebSocket endpoint in FastAPI",
          "File upload + async processing pipeline",
        ],
        build: "Streaming + background processing API",
        points: { learn: 15, build: 15 },
      },
      {
        day: "Fri",
        focus: "Backend Architecture Patterns",
        tasks: [
          "Repository pattern: separate data access from business logic",
          "Service layer pattern: where business logic lives",
          "Event-driven patterns: publish/subscribe for decoupled services",
          "Compare Express vs FastAPI: when to use which for what project",
        ],
        build: "Clean architecture FastAPI app",
        points: { learn: 20, build: 10 },
      },
      {
        day: "Sat",
        focus: "MAJOR PROJECT",
        tasks: [
          "Build: Document Processing Pipeline API",
          "Upload PDF → extract text → chunk → store in DB → summarize via AI",
          "Background processing with Celery, status polling endpoint",
          "Queue dashboard, retry logic, dead letter queue pattern",
        ],
        build: "🚀 Document Processing Pipeline",
        points: { learn: 5, build: 30 },
      },
      {
        day: "Sun",
        focus: "Review + Compare",
        tasks: [
          "Write decision doc: Express vs FastAPI — pros, cons, use cases",
          "Clean up code, add tests, document APIs",
          "Update tracker",
        ],
        build: "Backend framework comparison guide",
        points: { learn: 10, build: 10 },
      },
    ],
    moveOn:
      "You can build a FastAPI backend with auth, streaming, background jobs, and clean architecture. You choose between Node.js and Python with real reasoning.",
    resources: [
      {
        name: "FastAPI official tutorial",
        why: "Best-documented Python framework. Tutorial IS the course.",
        how: "Follow step-by-step. The docs are interactive — run every example.",
      },
      {
        name: "ArjanCodes — Python design patterns",
        why: "Teaches patterns (repository, service layer) that make you a real engineer.",
        how: "Watch after FastAPI basics. Apply patterns to your project.",
      },
    ],
    studyStructure: {
      block1: "1.5h — Python/FastAPI concepts + architecture patterns",
      block2: "3h — Build APIs + background processing",
      block3: "1.5h — Compare with Node.js, write architecture docs",
    },
  },
  {
    week: 9,
    phase: "GenAI Engineering",
    title: "LLM Fundamentals + Production AI APIs",
    color: "#9b59b6",
    topics: [
      "How LLMs work (transformers, tokens, context windows)",
      "Prompt engineering: system prompts, few-shot, chain-of-thought",
      "API integration: Anthropic Claude, OpenAI (Python SDKs)",
      "Structured outputs, function calling / tool use",
      "Production: latency, cost tracking, caching, fallbacks",
      "Error handling: timeouts, retries, rate limits, model routing",
    ],
    days: [
      {
        day: "Mon",
        focus: "LLM Mental Model",
        tasks: [
          "Understand transformers: attention mechanism, tokens, embeddings (concepts, not math)",
          "Parameters: context window, temperature, top-p — what each controls",
          "Compare: Claude Sonnet/Opus, GPT-4o, Llama 3, Gemini — strengths + costs",
          "Build a cost calculator: tokens × price for 1000 requests",
        ],
        build: "Model comparison doc + cost calculator",
        points: { learn: 25, build: 5 },
      },
      {
        day: "Tue",
        focus: "Prompt Engineering Mastery",
        tasks: [
          "System prompts: personas, constraints, output format control",
          "Few-shot: when it helps, how many examples, selection strategy",
          "Chain-of-thought: explicit reasoning, step-by-step, scratchpad pattern",
          "Prompt templates with variable injection, prompt versioning",
        ],
        build: "Prompt library with 10 production-grade prompts",
        points: { learn: 20, build: 10 },
      },
      {
        day: "Wed",
        focus: "API Integration + Production Patterns",
        tasks: [
          "Claude API + OpenAI API from Python: streaming and non-streaming",
          "Implement retry with exponential backoff for rate limits (tenacity library)",
          "Timeout handling: what to do when the model is slow",
          "Response caching: hash prompt → cache response in Redis for identical queries",
        ],
        build: "Production AI API wrapper with retries + cache",
        points: { learn: 15, build: 15 },
      },
      {
        day: "Thu",
        focus: "Structured Outputs + Tool Use",
        tasks: [
          "Function calling / tool use with Claude API — build 3 tools",
          "Force JSON output with schemas, validate with Pydantic",
          "Handle malformed responses: retry, fallback, graceful degradation",
          "Pipeline: user input → tool selection → execution → formatted response",
        ],
        build: "AI agent with 3 tools + structured output",
        points: { learn: 15, build: 15 },
      },
      {
        day: "Fri",
        focus: "Cost Optimization + Evaluation",
        tasks: [
          "Prompt optimization: shorter prompts, model selection by task complexity",
          "Model routing: simple tasks → small model, complex → large model",
          "Build evaluation harness: test prompts against expected outputs",
          "LLM-as-judge: use Claude to evaluate another model's output",
        ],
        build: "Cost-optimized AI pipeline with eval harness",
        points: { learn: 15, build: 15 },
      },
      {
        day: "Sat",
        focus: "MAJOR PROJECT",
        tasks: [
          "Build: AI Writing Assistant SaaS (backend)",
          "Modes: summarize, rewrite, translate, explain, code review",
          "Streaming UI, per-request cost tracking, usage dashboard",
          "Rate limiting per user, model fallback chain, response caching",
        ],
        build: "🚀 AI Writing Assistant (Production-Grade)",
        points: { learn: 5, build: 30 },
      },
      {
        day: "Sun",
        focus: "Review",
        tasks: [
          "Write your production AI API checklist (retry, cache, fallback, logging, cost)",
          "Stress test: what happens with 100 concurrent requests?",
          "Update tracker",
        ],
        build: "Production AI API checklist",
        points: { learn: 15, build: 5 },
      },
    ],
    moveOn:
      "You can build a production AI API with streaming, caching, retries, cost tracking, and model fallbacks. You know the difference between a demo and production AI system.",
    resources: [
      {
        name: "Anthropic's prompt engineering docs (docs.anthropic.com)",
        why: "Written by the Claude team. Industry-leading guide.",
        how: "Read every section. Try every technique with real API calls.",
      },
      {
        name: "Shreyansh — GenAI engineering videos",
        why: "Practical GenAI content, covers production patterns.",
        how: "Watch project-based videos. Pause and build your own version.",
      },
    ],
    studyStructure: {
      block1: "2h — LLM concepts + prompt engineering practice",
      block2: "3h — Build production AI APIs, test extensively",
      block3: "1h — Cost analysis, evaluation, optimization",
    },
  },
  {
    week: 10,
    phase: "GenAI Engineering",
    title: "RAG + Vector Databases + Production Search",
    color: "#c0392b",
    topics: [
      "Embeddings: generation, models, dimensionality",
      "Vector databases: ChromaDB, pgvector, Pinecone",
      "RAG architecture: chunking, retrieval, generation",
      "Hybrid search: vector + keyword + re-ranking",
      "Production RAG: latency, caching, monitoring, failures",
      "RAG evaluation: precision, faithfulness, hallucination detection",
    ],
    days: [
      {
        day: "Mon",
        focus: "Embeddings Deep Dive",
        tasks: [
          "Understand vector embeddings: what they capture, model comparison",
          "Generate embeddings with OpenAI, Cohere, open-source (sentence-transformers)",
          "Cosine similarity, dot product — implement from scratch, then use libraries",
          "Embedding dimensions, truncation, normalization — when they matter",
        ],
        build: "Semantic search over a text dataset",
        points: { learn: 20, build: 10 },
      },
      {
        day: "Tue",
        focus: "Vector Databases",
        tasks: [
          "Set up ChromaDB locally + pgvector in PostgreSQL (you already have PG!)",
          "Store and query embeddings, metadata filtering",
          "Compare: dedicated vector DB vs pgvector extension — tradeoffs",
          "Implement hybrid search: vector similarity + keyword filter",
        ],
        build: "Hybrid search engine",
        points: { learn: 15, build: 15 },
      },
      {
        day: "Wed",
        focus: "RAG Pipeline End-to-End",
        tasks: [
          "Document loading: PDF (PyPDF2), web pages (BeautifulSoup), markdown",
          "Chunking: fixed-size, recursive, semantic — implement all 3, compare",
          "Pipeline: load → chunk → embed → store → query → inject → generate",
          "Add source citations to generated responses",
        ],
        build: "Complete RAG pipeline with citations",
        points: { learn: 10, build: 20 },
      },
      {
        day: "Thu",
        focus: "Advanced RAG Patterns",
        tasks: [
          "Re-ranking: cross-encoder re-ranker after initial retrieval",
          "Multi-query retrieval: generate query variations for broader recall",
          "Contextual compression: extract only relevant parts from chunks",
          "Conversation-aware RAG: maintain chat context across queries",
        ],
        build: "Advanced RAG with re-ranking + multi-query",
        points: { learn: 15, build: 15 },
      },
      {
        day: "Fri",
        focus: "Production RAG + Evaluation",
        tasks: [
          "Cache frequent queries (embedding cache + response cache in Redis)",
          "Monitor: track retrieval quality, latency per stage, failure rate",
          "RAGAS framework: faithfulness, relevance, context precision metrics",
          "Build automated eval: test set → run pipeline → measure scores",
        ],
        build: "Monitored, cached, evaluated RAG system",
        points: { learn: 15, build: 15 },
      },
      {
        day: "Sat",
        focus: "MAJOR PROJECT",
        tasks: [
          "Build: Chat-with-Your-Documents Platform",
          "Upload PDFs → process → chat with streaming + source citations",
          "FastAPI backend + Next.js frontend + pgvector + Redis cache",
          "Production: rate limiting, cost tracking, eval dashboard",
        ],
        build: "🚀 Chat-with-Docs Platform (Full Stack)",
        points: { learn: 5, build: 35 },
      },
      {
        day: "Sun",
        focus: "Review + Optimize",
        tasks: [
          "A/B test chunking strategies — measure with RAGAS",
          "Optimize latency: identify slowest stage, fix it",
          "Update tracker",
        ],
        build: "Optimized production RAG",
        points: { learn: 10, build: 10 },
      },
    ],
    moveOn:
      "You can build production RAG with hybrid search, re-ranking, caching, and evaluation. You understand chunking tradeoffs and measure retrieval quality with real metrics.",
    resources: [
      {
        name: "LangChain RAG tutorials + Anthropic RAG cookbook",
        why: "Practical patterns. Build with AND without LangChain.",
        how: "Build one with LangChain, then rebuild core WITHOUT it. Both skills matter.",
      },
      {
        name: "Shreyansh — RAG tutorials",
        why: "Practical approach, covers production concerns.",
        how: "Code along, then build your own variation with your own documents.",
      },
    ],
    studyStructure: {
      block1: "2h — RAG concepts + architecture patterns",
      block2: "3h — Build pipelines, experiment with parameters",
      block3: "1h — Evaluate, optimize, measure improvements",
    },
  },
  {
    week: 11,
    phase: "AI Agents",
    title: "LangGraph, Agentic Systems + MCP",
    color: "#d35400",
    topics: [
      "LangChain: chains, tools, output parsers",
      "LangGraph: stateful agent graphs, conditional routing",
      "Tool creation: giving LLMs real-world abilities",
      "Memory systems: short-term, long-term, entity",
      "MCP (Model Context Protocol): standardized tool integration",
      "Multi-agent orchestration + human-in-the-loop",
    ],
    days: [
      {
        day: "Mon",
        focus: "LangChain + LangGraph Foundations",
        tasks: [
          "LCEL: chains, runnables, piping operators",
          "LangGraph: nodes, edges, conditional edges, state schema",
          "Build a simple graph: input → classify → route to specialist → output",
          "Understand: when to use chains vs graphs vs raw API calls",
        ],
        build: "Agent routing graph with 3 specialists",
        points: { learn: 15, build: 15 },
      },
      {
        day: "Tue",
        focus: "Tool Creation + MCP",
        tasks: [
          "Define custom tools: web search, database query, calculator, file ops",
          "MCP basics: what it is, why it matters, how tools are exposed as servers",
          "Build an MCP-compatible tool server (or consume existing one)",
          "Tool selection: let the LLM choose tools based on user query",
        ],
        build: "Agent with 5 custom tools + MCP integration",
        points: { learn: 15, build: 15 },
      },
      {
        day: "Wed",
        focus: "Memory Systems",
        tasks: [
          "Conversation memory: buffer, window, summary — implement all 3",
          "Entity memory: extract and track entities across conversation",
          "Long-term memory: store important facts in vector DB for retrieval",
          "Memory selection: when to use which type for which agent",
        ],
        build: "Agent with multi-layer memory system",
        points: { learn: 15, build: 15 },
      },
      {
        day: "Thu",
        focus: "Advanced Agent Patterns",
        tasks: [
          "ReAct: Reason → Act → Observe → Repeat",
          "Plan-and-execute: decompose task → plan steps → execute → verify",
          "Human-in-the-loop: pause agent for approval on sensitive actions",
          "Error recovery: what to do when a tool fails or agent loops",
        ],
        build: "Planning agent with human approval gates",
        points: { learn: 15, build: 15 },
      },
      {
        day: "Fri",
        focus: "Multi-Agent Orchestration",
        tasks: [
          "Build a team: researcher + writer + reviewer agents",
          "Orchestrator pattern: coordinator assigns tasks to specialists",
          "Shared state: how agents pass context to each other",
          "Observability: LangSmith for tracing agent reasoning chains",
        ],
        build: "Multi-agent research team with observability",
        points: { learn: 15, build: 15 },
      },
      {
        day: "Sat",
        focus: "MAJOR PROJECT",
        tasks: [
          "Build: AI Research Assistant Platform",
          "User gives topic → planner → researcher searches → writer drafts → reviewer critiques",
          "Full stack: FastAPI + Next.js + LangGraph + memory + tools",
          "Production: cost tracking, latency monitoring, human approval for publish",
        ],
        build: "🚀 Multi-Agent Research Platform",
        points: { learn: 5, build: 35 },
      },
      {
        day: "Sun",
        focus: "Review + Debug",
        tasks: [
          "Debug agent failures with LangSmith traces",
          "Add guardrails: output validation, loop detection, token budget limits",
          "Update tracker",
        ],
        build: "Hardened, observable agent system",
        points: { learn: 10, build: 10 },
      },
    ],
    moveOn:
      "You can build multi-agent systems with tools, memory, and human-in-the-loop. You debug with traces. You understand MCP and can create tool servers.",
    resources: [
      {
        name: "LangGraph official docs + DeepLearning.AI agent courses",
        why: "LangGraph is the 2025-2026 standard for agents. Andrew Ng's courses are gold.",
        how: "Conceptual guide → tutorials → build your own. In that order.",
      },
      {
        name: "AI Jason / Shreyansh — Agent building videos",
        why: "Practical builds with latest tools.",
        how: "Watch for architecture inspiration. Always build your own version after.",
      },
    ],
    studyStructure: {
      block1: "2h — Agent concepts + architecture design",
      block2: "3h — Build agents, test with edge cases",
      block3: "1h — Debug with LangSmith, add guardrails",
    },
  },
  {
    week: 12,
    phase: "Capstone + Career",
    title: "Capstone + System Design + Portfolio",
    color: "#1abc9c",
    topics: [
      "System design deep: design a complete AI SaaS",
      "Multi-agent orchestration at production scale",
      "Monitoring, logging, alerting for AI systems",
      "Portfolio curation + technical writing",
      "Architecture Decision Records (ADRs)",
      "Post-roadmap growth plan",
    ],
    days: [
      {
        day: "Mon",
        focus: "Capstone Architecture",
        tasks: [
          "Design: AI Customer Support Platform",
          "System design: draw complete architecture (frontend, backend, AI, DB, cache, queue)",
          "Write Architecture Decision Records: why each tech choice",
          "Define API contract, database schema, agent workflows",
        ],
        build: "Complete architecture doc with ADRs",
        points: { learn: 15, build: 15 },
      },
      {
        day: "Tue-Wed",
        focus: "Capstone Build Sprint",
        tasks: [
          "Backend: FastAPI + PostgreSQL + Redis + BullMQ + LangGraph agents",
          "AI: RAG knowledge base, routing agent, specialist agents (billing, tech, general)",
          "Features: conversation memory, escalation to human, satisfaction scoring",
          "Frontend: Next.js dashboard for agents, conversations, analytics",
        ],
        build: "🚀 AI Customer Support Platform (Capstone)",
        points: { learn: 5, build: 50 },
      },
      {
        day: "Thu",
        focus: "Production Hardening",
        tasks: [
          "Add monitoring: request logging, agent trace logging, error rate tracking",
          "Implement graceful degradation: what happens when AI is down?",
          "Load testing: handle concurrent conversations",
          "Docker compose for complete stack deployment",
        ],
        build: "Production-hardened capstone",
        points: { learn: 10, build: 20 },
      },
      {
        day: "Fri",
        focus: "System Design Practice",
        tasks: [
          "Design 1: How would you build Notion's AI features?",
          "Design 2: How would you build a real-time collaborative editor?",
          "Design 3: How would you scale your capstone to 10K concurrent users?",
          "Write each design with diagrams in 30 minutes (interview practice)",
        ],
        build: "3 system design write-ups",
        points: { learn: 25, build: 5 },
      },
      {
        day: "Sat",
        focus: "Portfolio + Demo",
        tasks: [
          "Curate GitHub: pin best 6 repos, write stellar READMEs",
          "Record a 3-minute demo video of capstone",
          "Update portfolio website with all projects + tech stack badges",
          "Write a blog post: 'What I learned building AI agents'",
        ],
        build: "Complete portfolio + demo reel",
        points: { learn: 5, build: 25 },
      },
      {
        day: "Sun",
        focus: "Growth Plan",
        tasks: [
          "Write 3-month post-roadmap plan: what to deepen, what to explore",
          "Identify next frontiers: Kubernetes, advanced system design, ML fundamentals",
          "Set weekly habit: 1 system design problem + 1 project iteration per week",
        ],
        build: "Continuing education roadmap",
        points: { learn: 10, build: 10 },
      },
    ],
    moveOn:
      "You have a deployed AI SaaS capstone, curated portfolio, system design skills, and a growth plan. You ARE a full-stack + GenAI engineer.",
    resources: [
      {
        name: "System Design Interview (Alex Xu) + Gaurav Sen YouTube",
        why: "System design separates juniors from seniors.",
        how: "1 problem per week ongoing. Draw, explain to camera. Make it a habit.",
      },
      {
        name: "Your own projects — they are the best resource now",
        why: "At this stage, building > consuming. Ship weekly.",
        how: "Pick a real problem. Build a solution. Deploy. Tell people about it.",
      },
    ],
    studyStructure: {
      block1: "1h — System design + architecture",
      block2: "4h — Build capstone + portfolio",
      block3: "1.5h — Documentation, reflection, growth planning",
    },
  },
];

const STUCK_LOOP = [
  { step: "1. Isolate", desc: "What EXACTLY don't you understand? Write it in one sentence." },
  { step: "2. Simplify", desc: "Make the smallest possible version of the problem. Remove everything except the confusing part." },
  { step: "3. Rubber Duck", desc: "Explain the problem out loud. Pretend you're teaching someone. Where do you get stuck?" },
  { step: "4. Ask AI Smart", desc: "Ask Claude: 'Explain [concept] like I understand [related thing I DO know].' Then ask follow-ups." },
  { step: "5. Build Tiny", desc: "Build the smallest working version. A function. 10 lines. Get SOMETHING working." },
  { step: "6. Skip + Return", desc: "If stuck >45 mins, mark it, skip ahead. Come back tomorrow with fresh eyes." },
  { step: "7. Community", desc: "Post on Discord/Stack Overflow: what you tried, expected, what happened." },
];

const CLAUDE_CODE_GUIDE = [
  { when: "Architecture Design", do: "Ask Claude for architecture options with tradeoffs. Challenge every choice: 'why not X instead?'", dont: "Don't let AI design without you understanding WHY each decision was made." },
  { when: "Debugging", do: "Paste error + code + what you expected. Ask 'Why?' before 'Fix this.' Understand root cause.", dont: "Don't blindly apply fixes. Ask Claude to explain the fix step by step." },
  { when: "Boilerplate + Config", do: "Use AI for: TypeScript configs, Dockerfiles, CI/CD, Prisma schemas, test setup. Save hours.", dont: "Don't generate core business logic you haven't learned yet. That's WHERE the learning is." },
  { when: "Code Review", do: "Paste YOUR code: 'What's wrong? What patterns am I missing? How would a senior improve this?'", dont: "Don't skip writing code and just prompt-engineer entire features." },
  { when: "Learning Concepts", do: "Ask for analogies: 'Explain X like I know Y.' Then build WITHOUT AI to test understanding.", dont: "Don't use AI as a crutch during struggle phase. Struggle = learning." },
  { when: "System Design", do: "Describe requirements, ask for architecture options with tradeoffs. Pick and justify YOUR choice.", dont: "Don't accept first architecture. Always ask 'What are the alternatives?'" },
];

const TECH_AWARENESS = [
  { source: "YouTube", what: "Fireship, Theo, ThePrimeagen, Shreyansh, AI Jason, Hussein Nasser", when: "15 min/day" },
  { source: "Twitter/X", what: "@AndrewYNg, @LangChainAI, @AnthropicAI, @OpenAI, @vercel", when: "10 min/night" },
  { source: "GitHub Trending", what: "Weekly: trending repos in TypeScript, Python, AI, agents", when: "Sunday 15 min" },
  { source: "Newsletters", what: "TLDR, Bytes.dev, The Batch (deeplearning.ai), AI Breakfast", when: "Morning coffee" },
  { source: "Hacker News", what: "Front page — top 5 stories", when: "Lunch 10 min" },
  { source: "Release Notes", what: "Next.js, React, LangChain, Anthropic, TypeScript blogs", when: "When notified" },
];

const MINDSET = [
  { title: "The 2-Day Rule", desc: "Never skip 2 days in a row. 1 day off is rest. 2 days is losing momentum. Even 30 minutes counts." },
  { title: "Ship > Perfect", desc: "A deployed ugly app teaches more than a perfect app that never ships." },
  { title: "Compare to Yesterday-You", desc: "Not Twitter influencers. Not seniors with 5 years. Only yourself last week." },
  { title: "Energy Management", desc: "Hard concepts in morning. Building in afternoon. Light review at night." },
  { title: "Social Proof Loop", desc: "Tweet/post what you build weekly. Accountability + connections + public journal." },
  { title: "The 70/30 Rule", desc: "70% building, 30% learning. More watching than building = tutorial hell." },
  { title: "Type Everything", desc: "From Week 3: EVERYTHING is TypeScript. No 'any'. Types = documentation = fewer bugs = hired." },
  { title: "Think in Systems", desc: "Don't just build features. Ask: how does this scale? What breaks? Where's the bottleneck?" },
];

const SCORE_LABELS = [
  { min: 0, label: "Getting Started", color: "#8b949e" },
  { min: 100, label: "Warming Up", color: "#f1c40f" },
  { min: 300, label: "Building Momentum", color: "#e67e22" },
  { min: 600, label: "On Fire", color: "#e74c3c" },
  { min: 1000, label: "Beast Mode", color: "#9b59b6" },
  { min: 1500, label: "Engineer Tier", color: "#3498db" },
  { min: 2200, label: "Ship Machine", color: "#1abc9c" },
  { min: 3000, label: "Full-Stack + AI Pro", color: "#2ecc71" },
];

function getScoreLabel(score) {
  let r = SCORE_LABELS[0];
  for (const s of SCORE_LABELS) if (score >= s.min) r = s;
  return r;
}

export default function App() {
  const [activeWeek, setActiveWeek] = useState(0);
  const [activeTab, setActiveTab] = useState("roadmap");
  const [completedTasks, setCompletedTasks] = useState({});
  const [dailyLogs, setDailyLogs] = useState({});
  const [projectStatus, setProjectStatus] = useState({});
  const [expandedDay, setExpandedDay] = useState(null);
  const [currentLogKey, setCurrentLogKey] = useState("");
  const [logForm, setLogForm] = useState({ learned: "", built: "", struggled: "", revise: "" });
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

  // Load all persisted data from Supabase on mount
  useEffect(() => {
    fetchAllData()
      .then(({ completedTasks, dailyLogs, projectStatus }) => {
        setCompletedTasks(completedTasks);
        setDailyLogs(dailyLogs);
        setProjectStatus(projectStatus);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoaded(true));
  }, []);

  // Optimistic toggle: update UI immediately, sync DB in background
  const toggleTask = (key) => {
    const newVal = !completedTasks[key];
    setCompletedTasks((prev) => ({ ...prev, [key]: newVal }));
    upsertTask(key, newVal).catch((err) => setError(err.message));
  };

  const getWeekProgress = (wi) => {
    let t = 0, d = 0;
    WEEKS[wi].days.forEach((day, di) => {
      day.tasks.forEach((_, ti) => {
        t++;
        if (completedTasks[`${wi}-${di}-${ti}`]) d++;
      });
    });
    return t > 0 ? Math.round((d / t) * 100) : 0;
  };

  const totalProgress = () => {
    let t = 0, d = 0;
    WEEKS.forEach((w, wi) => {
      w.days.forEach((day, di) => {
        day.tasks.forEach((_, ti) => {
          t++;
          if (completedTasks[`${wi}-${di}-${ti}`]) d++;
        });
      });
    });
    return t > 0 ? Math.round((d / t) * 100) : 0;
  };

  const { totalScore, scoreBreakdown } = useMemo(() => {
    let learn = 0, build = 0;
    WEEKS.forEach((w, wi) => {
      w.days.forEach((d, di) => {
        if (d.points && d.tasks.every((_, ti) => completedTasks[`${wi}-${di}-${ti}`])) {
          learn += d.points.learn || 0;
          build += d.points.build || 0;
        }
      });
    });
    return { totalScore: learn + build, scoreBreakdown: { learn, build } };
  }, [completedTasks]);

  const scoreLabel = getScoreLabel(totalScore);

  const saveLog = () => {
    if (!currentLogKey) return;
    const logData = { ...logForm, date: new Date().toISOString() };
    setDailyLogs((prev) => ({ ...prev, [currentLogKey]: logData }));
    upsertLog(currentLogKey, logData).catch((err) => setError(err.message));
    setLogForm({ learned: "", built: "", struggled: "", revise: "" });
    setCurrentLogKey("");
  };

  const cycleProject = (key) => {
    const states = ["not_started", "in_progress", "done"];
    const cur = projectStatus[key] || "not_started";
    const newStatus = states[(states.indexOf(cur) + 1) % 3];
    setProjectStatus((prev) => ({ ...prev, [key]: newStatus }));
    upsertProject(key, newStatus).catch((err) => setError(err.message));
  };

  const allProjects = WEEKS.flatMap((w, wi) =>
    w.days
      .filter((d) => d.build.startsWith("🚀"))
      .map((d) => ({
        name: d.build.replace("🚀 ", ""),
        week: wi + 1,
        key: `proj-${wi}-${d.day}`,
        phase: w.phase,
      }))
  );

  if (!loaded) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", fontFamily: "monospace", color: "#8b949e", background: "#0d1117", gap: 12 }}>
        <div style={{ width: 32, height: 32, border: "3px solid #21262d", borderTopColor: "#58a6ff", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
        <span>Loading roadmap...</span>
        {error && <span style={{ color: "#f85149", fontSize: 12, maxWidth: 400, textAlign: "center" }}>Error: {error}</span>}
      </div>
    );
  }

  const week = WEEKS[activeWeek];
  const progress = totalProgress();
  const tabs = [
    { id: "roadmap", label: "Roadmap" },
    { id: "score", label: `Score: ${totalScore}` },
    { id: "tracker", label: "Daily Log" },
    { id: "projects", label: "Projects" },
    { id: "tools", label: "AI Tools" },
    { id: "mindset", label: "Mindset" },
    { id: "stuck", label: "Stuck?" },
    { id: "awareness", label: "Stay Updated" },
  ];

  return (
    <div style={{ minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: "#e8e6e3", background: "#0d1117" }}>
      {/* Error banner */}
      {error && (
        <div style={{ background: "#f8514920", borderBottom: "1px solid #f8514940", padding: "8px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 12, color: "#f85149" }}>Sync error: {error}</span>
          <button onClick={() => setError(null)} style={{ background: "none", border: "none", color: "#8b949e", cursor: "pointer", fontSize: 16 }}>×</button>
        </div>
      )}

      <div style={{ background: "linear-gradient(135deg, #0d1117, #161b22, #0d1117)", borderBottom: "1px solid #21262d", padding: "20px 24px 16px" }}>
        <div style={{ maxWidth: 920, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: `linear-gradient(135deg, ${week.color}, ${week.color}88)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>⚡</div>
              <div>
                <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em" }}>Full-Stack + GenAI Engineer v2</h1>
                <p style={{ margin: 0, fontSize: 11, color: "#8b949e" }}>TypeScript · System Design · Production AI · 12 Weeks</p>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: scoreLabel.color }}>{totalScore}</div>
              <div style={{ fontSize: 10, color: scoreLabel.color, fontWeight: 600 }}>{scoreLabel.label}</div>
            </div>
          </div>

          <div style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#8b949e", marginBottom: 4 }}>
              <span>Overall Progress</span>
              <span style={{ color: week.color, fontWeight: 600 }}>{progress}%</span>
            </div>
            <div style={{ height: 6, background: "#21262d", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${progress}%`, background: `linear-gradient(90deg, ${week.color}, ${week.color}cc)`, borderRadius: 3, transition: "width 0.5s" }} />
            </div>
          </div>

          <div style={{ display: "flex", gap: 4, overflowX: "auto", paddingBottom: 2 }}>
            {tabs.map((t) => (
              <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
                padding: "6px 12px", borderRadius: 6, fontSize: 11, fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap",
                background: activeTab === t.id ? week.color + "22" : "transparent",
                color: activeTab === t.id ? week.color : "#8b949e",
                border: activeTab === t.id ? `1px solid ${week.color}44` : "1px solid transparent",
              }}>{t.label}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 920, margin: "0 auto", padding: "20px 24px" }}>
        {activeTab === "roadmap" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(64px, 1fr))", gap: 6, marginBottom: 24 }}>
              {WEEKS.map((w, i) => {
                const wp = getWeekProgress(i);
                return (
                  <button key={i} onClick={() => { setActiveWeek(i); setExpandedDay(null); }} style={{
                    padding: "8px 4px", border: `1px solid ${activeWeek === i ? w.color : "#21262d"}`, borderRadius: 8, cursor: "pointer",
                    background: activeWeek === i ? w.color + "15" : "#161b22", position: "relative", overflow: "hidden"
                  }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: activeWeek === i ? w.color : "#8b949e" }}>W{i + 1}</div>
                    <div style={{ fontSize: 9, color: "#8b949e", marginTop: 2 }}>{wp}%</div>
                    <div style={{ position: "absolute", bottom: 0, left: 0, height: 2, width: `${wp}%`, background: w.color }} />
                  </button>
                );
              })}
            </div>

            <div style={{ background: "#161b22", border: "1px solid #21262d", borderRadius: 12, overflow: "hidden" }}>
              <div style={{ padding: "20px 24px", borderBottom: "1px solid #21262d", background: `linear-gradient(135deg, ${week.color}08, transparent)` }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: week.color, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>{week.phase}</div>
                <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>Week {week.week}: {week.title}</h2>
                <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {week.topics.map((t, i) => <span key={i} style={{ padding: "3px 10px", borderRadius: 12, fontSize: 11, background: week.color + "18", color: week.color, border: `1px solid ${week.color}30` }}>{t}</span>)}
                </div>
              </div>

              <div style={{ padding: "16px 24px" }}>
                {week.days.map((day, di) => {
                  const allDone = day.tasks.every((_, ti) => completedTasks[`${activeWeek}-${di}-${ti}`]);
                  const pts = day.points ? day.points.learn + day.points.build : 0;
                  return (
                    <div key={di} style={{ marginBottom: 8 }}>
                      <button onClick={() => setExpandedDay(expandedDay === di ? null : di)} style={{
                        width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "12px 16px", background: expandedDay === di ? "#1c2128" : "transparent",
                        border: `1px solid ${expandedDay === di ? "#30363d" : "transparent"}`, borderRadius: 8, cursor: "pointer"
                      }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          {allDone && <span style={{ color: "#3fb950", fontSize: 14 }}>✓</span>}
                          <span style={{ fontSize: 12, fontWeight: 700, color: week.color, minWidth: 44, textAlign: "left" }}>{day.day}</span>
                          <span style={{ fontSize: 13, fontWeight: 500, color: "#e8e6e3" }}>{day.focus}</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          {allDone && <span style={{ fontSize: 10, color: "#3fb950", fontWeight: 600 }}>+{pts}pts</span>}
                          <span style={{ fontSize: 11, color: "#8b949e", maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{day.build}</span>
                          <span style={{ fontSize: 14, color: "#8b949e", transform: expandedDay === di ? "rotate(180deg)" : "", transition: "transform 0.2s" }}>▾</span>
                        </div>
                      </button>

                      {expandedDay === di && (
                        <div style={{ padding: "16px 16px 16px 28px", animation: "fadeIn 0.2s ease" }}>
                          {day.points && (
                            <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
                              <span style={{ padding: "3px 10px", borderRadius: 10, fontSize: 10, background: "#3498db18", color: "#3498db", border: "1px solid #3498db30", fontWeight: 600 }}>📚 Learn: {day.points.learn}pts</span>
                              <span style={{ padding: "3px 10px", borderRadius: 10, fontSize: 10, background: "#2ecc7118", color: "#2ecc71", border: "1px solid #2ecc7130", fontWeight: 600 }}>🔨 Build: {day.points.build}pts</span>
                              <span style={{ padding: "3px 10px", borderRadius: 10, fontSize: 10, background: "#f0883e18", color: "#f0883e", border: "1px solid #f0883e30", fontWeight: 600 }}>Total: {pts}pts</span>
                            </div>
                          )}
                          <div style={{ fontSize: 11, fontWeight: 600, color: "#8b949e", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>Tasks (complete ALL to earn points)</div>
                          {day.tasks.map((task, ti) => {
                            const k = `${activeWeek}-${di}-${ti}`;
                            const done = completedTasks[k];
                            return (
                              <label key={ti} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 0", cursor: "pointer", borderBottom: "1px solid #21262d" }}>
                                <input type="checkbox" checked={!!done} onChange={() => toggleTask(k)} style={{ marginTop: 2, accentColor: week.color }} />
                                <span style={{ fontSize: 13, color: done ? "#8b949e" : "#e8e6e3", textDecoration: done ? "line-through" : "none", lineHeight: 1.5 }}>{task}</span>
                              </label>
                            );
                          })}
                          <div style={{ padding: "10px 14px", background: week.color + "10", borderRadius: 8, border: `1px solid ${week.color}25`, marginTop: 12 }}>
                            <div style={{ fontSize: 11, fontWeight: 600, color: week.color, marginBottom: 4 }}>BUILD</div>
                            <div style={{ fontSize: 13, color: "#e8e6e3" }}>{day.build}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div style={{ padding: "16px 24px", borderTop: "1px solid #21262d", background: "#0d1117" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#f0883e", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>✓ Ready to Move On When:</div>
                <p style={{ margin: 0, fontSize: 13, color: "#e8e6e3", lineHeight: 1.6 }}>{week.moveOn}</p>
              </div>

              <div style={{ padding: "16px 24px", borderTop: "1px solid #21262d" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#8b949e", textTransform: "uppercase", marginBottom: 10 }}>Resources</div>
                {week.resources.map((r, i) => (
                  <div key={i} style={{ marginBottom: 12, padding: "12px 14px", background: "#0d1117", borderRadius: 8, border: "1px solid #21262d" }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: week.color }}>{r.name}</div>
                    <div style={{ fontSize: 12, color: "#8b949e", marginTop: 4 }}>Why: {r.why}</div>
                    <div style={{ fontSize: 12, color: "#c9d1d9", marginTop: 4 }}>How: {r.how}</div>
                  </div>
                ))}
              </div>

              <div style={{ padding: "16px 24px", borderTop: "1px solid #21262d" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#8b949e", textTransform: "uppercase", marginBottom: 10 }}>Daily 6-7h Structure</div>
                {Object.entries(week.studyStructure).map(([k, v]) => (
                  <div key={k} style={{ padding: "8px 12px", background: "#0d1117", borderRadius: 6, fontSize: 12, color: "#c9d1d9", borderLeft: `3px solid ${week.color}`, marginBottom: 6 }}>{v}</div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "score" && (
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>Scoring System</h2>
            <div style={{ background: "#161b22", border: `1px solid ${scoreLabel.color}44`, borderRadius: 12, padding: 24, marginBottom: 20, textAlign: "center" }}>
              <div style={{ fontSize: 48, fontWeight: 800, color: scoreLabel.color }}>{totalScore}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: scoreLabel.color, marginTop: 8 }}>{scoreLabel.label}</div>
              <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 16 }}>
                <div><div style={{ fontSize: 24, fontWeight: 700, color: "#3498db" }}>{scoreBreakdown.learn}</div><div style={{ fontSize: 11, color: "#8b949e" }}>📚 Learn</div></div>
                <div style={{ width: 1, background: "#21262d" }} />
                <div><div style={{ fontSize: 24, fontWeight: 700, color: "#2ecc71" }}>{scoreBreakdown.build}</div><div style={{ fontSize: 11, color: "#8b949e" }}>🔨 Build</div></div>
              </div>
              <div style={{ marginTop: 16, maxWidth: 300, margin: "16px auto 0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#8b949e", marginBottom: 4 }}><span>Learn</span><span>Build</span></div>
                <div style={{ height: 6, background: "#21262d", borderRadius: 3, overflow: "hidden", display: "flex" }}>
                  <div style={{ height: "100%", width: `${totalScore > 0 ? (scoreBreakdown.learn / totalScore) * 100 : 50}%`, background: "#3498db" }} />
                  <div style={{ height: "100%", flex: 1, background: "#2ecc71" }} />
                </div>
                <div style={{ fontSize: 10, color: "#8b949e", marginTop: 4 }}>Ideal: ~35% learn / ~65% build</div>
              </div>
            </div>

            <div style={{ background: "#161b22", border: "1px solid #21262d", borderRadius: 12, padding: 20, marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 14 }}>Level Progression</div>
              {SCORE_LABELS.map((sl, i) => {
                const next = SCORE_LABELS[i + 1];
                const cur = totalScore >= sl.min && (!next || totalScore < next.min);
                return (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 12px", borderRadius: 6, marginBottom: 4, background: cur ? sl.color + "15" : "transparent", border: cur ? `1px solid ${sl.color}30` : "1px solid transparent" }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: totalScore >= sl.min ? sl.color : "#21262d" }} />
                    <div style={{ fontSize: 12, fontWeight: cur ? 700 : 400, color: totalScore >= sl.min ? sl.color : "#8b949e", flex: 1 }}>{sl.label}</div>
                    <div style={{ fontSize: 11, color: "#8b949e" }}>{sl.min}+</div>
                  </div>
                );
              })}
            </div>

            <div style={{ background: "#161b22", border: "1px solid #21262d", borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 14 }}>Points by Week</div>
              {WEEKS.map((w, wi) => {
                let earned = 0, total = 0;
                w.days.forEach((d, di) => {
                  if (d.points) {
                    const p = d.points.learn + d.points.build;
                    total += p;
                    if (d.tasks.every((_, ti) => completedTasks[`${wi}-${di}-${ti}`])) earned += p;
                  }
                });
                return (
                  <div key={wi} style={{ display: "flex", alignItems: "center", gap: 12, padding: "6px 0", borderBottom: wi < 11 ? "1px solid #21262d" : "none" }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: w.color, minWidth: 30 }}>W{wi + 1}</span>
                    <div style={{ flex: 1, height: 6, background: "#21262d", borderRadius: 3, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: total > 0 ? `${(earned / total) * 100}%` : "0%", background: w.color, borderRadius: 3 }} />
                    </div>
                    <span style={{ fontSize: 11, color: "#8b949e", minWidth: 55, textAlign: "right" }}>{earned}/{total}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "tracker" && (
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Daily Learning Log</h2>
            <div style={{ background: "#161b22", border: "1px solid #21262d", borderRadius: 12, padding: 20 }}>
              <select
                value={currentLogKey}
                onChange={(e) => {
                  setCurrentLogKey(e.target.value);
                  const ex = dailyLogs[e.target.value];
                  setLogForm(ex || { learned: "", built: "", struggled: "", revise: "" });
                }}
                style={{ width: "100%", padding: "8px 12px", background: "#0d1117", border: "1px solid #30363d", borderRadius: 6, color: "#e8e6e3", fontSize: 13, marginBottom: 16 }}
              >
                <option value="">Choose a day...</option>
                {WEEKS.map((w, wi) =>
                  w.days.map((d, di) => (
                    <option key={`${wi}-${di}`} value={`${wi}-${di}`}>
                      W{wi + 1} {d.day} — {d.focus} {dailyLogs[`${wi}-${di}`] ? "✓" : ""}
                    </option>
                  ))
                )}
              </select>

              {currentLogKey && (
                <div>
                  {[
                    { key: "learned", label: "What I Learned" },
                    { key: "built", label: "What I Built" },
                    { key: "struggled", label: "Struggled With" },
                    { key: "revise", label: "Should Revise" },
                  ].map((f) => (
                    <div key={f.key} style={{ marginBottom: 14 }}>
                      <label style={{ fontSize: 12, fontWeight: 600, color: "#8b949e", display: "block", marginBottom: 4 }}>{f.label}</label>
                      <textarea
                        value={logForm[f.key]}
                        onChange={(e) => setLogForm({ ...logForm, [f.key]: e.target.value })}
                        rows={3}
                        style={{ width: "100%", padding: "8px 12px", background: "#0d1117", border: "1px solid #30363d", borderRadius: 6, color: "#e8e6e3", fontSize: 13, resize: "vertical", boxSizing: "border-box" }}
                      />
                    </div>
                  ))}
                  <button onClick={saveLog} style={{ padding: "10px 24px", background: week.color, border: "none", borderRadius: 8, color: "#fff", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
                    Save Log
                  </button>
                </div>
              )}
            </div>

            {Object.keys(dailyLogs).length > 0 && (
              <div style={{ marginTop: 20 }}>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: "#8b949e", marginBottom: 12 }}>Past Entries</h3>
                {Object.entries(dailyLogs)
                  .sort(([a], [b]) => b.localeCompare(a))
                  .map(([key, log]) => {
                    const [wi, di] = key.split("-").map(Number);
                    const w = WEEKS[wi];
                    const d = w?.days[di];
                    if (!d) return null;
                    return (
                      <div key={key} style={{ background: "#161b22", border: "1px solid #21262d", borderRadius: 8, padding: 14, marginBottom: 8 }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: w.color }}>W{wi + 1} {d.day} — {d.focus}</div>
                        {log.learned && <p style={{ fontSize: 12, color: "#c9d1d9", margin: "6px 0 0" }}>📚 {log.learned}</p>}
                        {log.built && <p style={{ fontSize: 12, color: "#c9d1d9", margin: "4px 0 0" }}>🔨 {log.built}</p>}
                        {log.struggled && <p style={{ fontSize: 12, color: "#f0883e", margin: "4px 0 0" }}>⚠️ {log.struggled}</p>}
                        {log.revise && <p style={{ fontSize: 12, color: "#58a6ff", margin: "4px 0 0" }}>🔄 {log.revise}</p>}
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        )}

        {activeTab === "projects" && (
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Project Tracker ({allProjects.length} projects)</h2>
            <div style={{ display: "flex", gap: 8, marginBottom: 16, fontSize: 12, flexWrap: "wrap" }}>
              {["not_started", "in_progress", "done"].map((s) => {
                const c = allProjects.filter((p) => (projectStatus[p.key] || "not_started") === s).length;
                const cols = { not_started: "#8b949e", in_progress: "#f0883e", done: "#3fb950" };
                const labs = { not_started: "Not Started", in_progress: "In Progress", done: "Done" };
                return (
                  <span key={s} style={{ padding: "4px 12px", borderRadius: 12, background: cols[s] + "20", color: cols[s], border: `1px solid ${cols[s]}40` }}>
                    {labs[s]}: {c}
                  </span>
                );
              })}
            </div>
            {allProjects.map((p) => {
              const s = projectStatus[p.key] || "not_started";
              const cols = { not_started: "#8b949e", in_progress: "#f0883e", done: "#3fb950" };
              const labs = { not_started: "Not Started", in_progress: "In Progress", done: "✓ Done" };
              return (
                <div key={p.key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: "#161b22", border: "1px solid #21262d", borderRadius: 8, marginBottom: 6, borderLeft: `3px solid ${cols[s]}` }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#e8e6e3" }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: "#8b949e" }}>Week {p.week} · {p.phase}</div>
                  </div>
                  <button onClick={() => cycleProject(p.key)} style={{ padding: "4px 14px", borderRadius: 12, border: `1px solid ${cols[s]}40`, background: cols[s] + "15", color: cols[s], fontSize: 11, fontWeight: 600, cursor: "pointer" }}>
                    {labs[s]}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === "tools" && (
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Claude Code & AI Tools</h2>
            <p style={{ fontSize: 13, color: "#8b949e", marginBottom: 20, lineHeight: 1.6 }}>AI = 3x faster, not 3x lazier. Latest Claude Code info: <span style={{ color: week.color }}>docs.claude.com</span></p>
            {CLAUDE_CODE_GUIDE.map((g, i) => (
              <div key={i} style={{ background: "#161b22", border: "1px solid #21262d", borderRadius: 10, padding: 16, marginBottom: 10 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: week.color, marginBottom: 8 }}>{g.when}</div>
                <div style={{ fontSize: 12, color: "#3fb950", marginBottom: 4 }}>✓ DO: {g.do}</div>
                <div style={{ fontSize: 12, color: "#f85149" }}>✗ DON'T: {g.dont}</div>
              </div>
            ))}
            <div style={{ marginTop: 20, padding: 16, background: "#161b22", border: "1px solid #21262d", borderRadius: 10 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#f0883e", marginBottom: 8 }}>AI Usage Phases</div>
              <p style={{ fontSize: 12, color: "#c9d1d9", lineHeight: 1.7, margin: 0 }}>
                W1–4: AI for explanations + config only. Build ALL logic yourself.<br />
                W5–8: AI for boilerplate, debugging, config. Core logic is yours. Ask for reviews.<br />
                W9–12: AI as collaborator. You architect, AI implements. You MUST review + critique output.
              </p>
            </div>
          </div>
        )}

        {activeTab === "mindset" && (
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Mindset & Consistency</h2>
            {MINDSET.map((m, i) => (
              <div key={i} style={{ background: "#161b22", border: "1px solid #21262d", borderRadius: 10, padding: 16, marginBottom: 10 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: week.color }}>{m.title}</div>
                <p style={{ fontSize: 13, color: "#c9d1d9", lineHeight: 1.6, margin: "6px 0 0" }}>{m.desc}</p>
              </div>
            ))}
            <div style={{ marginTop: 20, padding: 16, background: "#161b22", border: "1px solid #f0883e33", borderRadius: 10 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#f0883e", marginBottom: 8 }}>Burnout Prevention</div>
              <p style={{ fontSize: 12, color: "#c9d1d9", lineHeight: 1.7, margin: 0 }}>10-min break every 90 min. Sundays = light review only. 1 full rest day every 2 weeks. Dread opening laptop? Take the day off — signal, not weakness. Exercise 30 min daily. Sleep 7+ hours. Non-negotiable.</p>
            </div>
            <div style={{ marginTop: 16, padding: 16, background: "#161b22", border: "1px solid #21262d", borderRadius: 10 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#58a6ff", marginBottom: 8 }}>torchbearerr.com/ai-agents</div>
              <p style={{ fontSize: 12, color: "#c9d1d9", lineHeight: 1.7, margin: 0 }}>Use in Weeks 11–12 (Agentic AI phase). Supplementary reading alongside LangGraph docs. Rebuild their code from scratch. Best consumed AFTER Week 10 (RAG) for proper context.</p>
            </div>
          </div>
        )}

        {activeTab === "stuck" && (
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Stuck Loop Breaker</h2>
            <p style={{ fontSize: 13, color: "#8b949e", marginBottom: 20 }}>Follow IN ORDER when you hit a wall.</p>
            {STUCK_LOOP.map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 16, padding: 16, background: "#161b22", border: "1px solid #21262d", borderRadius: 10, marginBottom: 8 }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: week.color, minWidth: 32 }}>{i + 1}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#e8e6e3" }}>{s.step.split(". ")[1]}</div>
                  <p style={{ fontSize: 12, color: "#c9d1d9", lineHeight: 1.6, margin: "4px 0 0" }}>{s.desc}</p>
                </div>
              </div>
            ))}
            <div style={{ marginTop: 16, padding: 16, background: "#f0883e10", border: "1px solid #f0883e33", borderRadius: 10 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#f0883e" }}>Weekly Revision</div>
              <p style={{ fontSize: 12, color: "#c9d1d9", lineHeight: 1.7, margin: "6px 0 0" }}>Every Sunday: (1) Rebuild one thing without reference. (2) Explain 3 concepts out loud simply. (3) Re-attempt "struggled with" log entries. (4) Can't explain simply? Revisit Monday.</p>
            </div>
          </div>
        )}

        {activeTab === "awareness" && (
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Stay Updated</h2>
            <p style={{ fontSize: 13, color: "#8b949e", marginBottom: 20 }}>30 min/day. Signal, not noise.</p>
            {TECH_AWARENESS.map((t, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", background: "#161b22", border: "1px solid #21262d", borderRadius: 10, marginBottom: 8 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: week.color }}>{t.source}</div>
                  <div style={{ fontSize: 12, color: "#c9d1d9", marginTop: 4 }}>{t.what}</div>
                </div>
                <div style={{ fontSize: 11, color: "#8b949e", textAlign: "right", minWidth: 100 }}>{t.when}</div>
              </div>
            ))}
            <div style={{ marginTop: 16, padding: 16, background: "#161b22", border: "1px solid #21262d", borderRadius: 10 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#f0883e", marginBottom: 8 }}>Noise vs Signal</div>
              <p style={{ fontSize: 12, color: "#c9d1d9", lineHeight: 1.7, margin: 0 }}>
                SIGNAL: Framework releases, AI model launches, job market shifts, production patterns, TypeScript updates.<br /><br />
                NOISE: "X is dead" takes, dev drama, every new library, hype clickbait.<br /><br />
                RULE: 3+ sources over 2+ weeks = real. Everything else = noise.
              </p>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        * { box-sizing: border-box; }
        select option { background: #0d1117; color: #e8e6e3; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #30363d; border-radius: 3px; }
        textarea:focus, select:focus, input:focus { outline: none; border-color: ${week.color}; }
        button { font-family: inherit; }
      `}</style>
    </div>
  );
}
