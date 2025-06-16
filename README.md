# Soma Pages - A Simple Blog and Portfolio Site

This is a simple blog and portfolio site built with Next.js, React, TypeScript, and Tailwind CSS, inspired by the chic and minimal design of `hand-dot.com`.

## Project Overview

The site features:
- A main page serving as an "About Me" section.
- A blog section with articles listed and individual article pages.
- Markdown-based content for articles.
- Responsive design for various screen sizes.

## Tech Stack

- Framework: Next.js (App Router)
- UI Library: React
- Language: TypeScript
- Styling: Tailwind CSS
- Markdown Processing: `gray-matter`, `remark`, `remark-html`
- Linting/Formatting: ESLint (Prettier can be added)

## Getting Started

### Prerequisites

- Node.js (version 18.x or later recommended)
- npm (or yarn/pnpm)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/somadevfat/somadev-pages.git
    cd somadev-pages
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

### Running the Development Environment

This project consists of a Next.js frontend and a Spring Boot backend.

#### Frontend (Next.js)

To start the frontend development server, run the following command in the project root directory:

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

#### Backend (Spring Boot)

The backend server runs in a Docker container. Make sure you have Docker and Docker Compose installed.

Before starting the server for the first time, you need to set up your environment variables.

1.  Copy the example environment file:
    ```bash
    cp env.example.txt .env
    ```

2.  Open the newly created `.env` file and replace the placeholder values (e.g., `your_secure_password_here`) with your actual secret values.

To start the backend server, run the following command in the project root directory:

```bash
docker-compose up -d --build
```

The backend API will be available at `http://localhost:8081`.

### Building for Production

To create an optimized production build for the frontend, run:
```bash
npm run build
```

### Starting the Production Server

To start the production server after building, run:
```bash
npm run start
```

## Project Structure

- `app/`: Contains all the routes, components, and logic for the application (App Router).
  - `app/blog/`: Blog-related pages.
  - `app/page.tsx`: The main homepage (About section).
  - `app/globals.css`: Global stylesheets.
  - `app/layout.tsx`: The root layout for the application.
- `components/`: Shared React components (e.g., `Header.tsx`, `Footer.tsx`, `Layout.tsx`).
- `content/articles/`: Markdown files for blog articles.
- `lib/`: Utility functions (e.g., `articles.ts` for fetching article data).
- `public/`: Static assets (images, fonts, etc.).
- `next.config.ts`: Next.js configuration file.
- `tailwind.config.js`: Tailwind CSS configuration file.
- `postcss.config.mjs`: PostCSS configuration file.

## Further Development (Planned Features from tasks.md)

- [ ] Styling refinement for a more "chic" feel based on `hand-dot.com`.
- [ ] More detailed responsive design adjustments.
- [ ] (Optional) Prettier setup for code formatting.
- [ ] (Optional) More sophisticated image handling/optimization if needed beyond `next/image` defaults.
