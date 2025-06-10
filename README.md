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

### Running the Development Server

To start the development server, run:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
The page auto-updates as you edit files.

### Building for Production

To create an optimized production build, run:
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
