# Vue2 Page Editor

A Vue 2 application that allows users to create, update, read, and delete (CRUD) web pages using a rich text editor. The pages include basic SEO elements and customizable slugs for URL access.

## Features

- Rich text editor using Tiptap
- Page management (CRUD operations)
- SEO-friendly with customizable meta tags
- URL slug support
- Responsive design using Bootstrap Vue
- Local storage using json-server

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- Vue CLI (v5.0.0 or later)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd vue2-editor-app
```

2. Install dependencies:
```bash
npm install
```

## Development

To start the development server:

```bash
npm run serve
```

This will start:
- The Vue development server at http://localhost:8080
- The json-server API at http://localhost:3000

## Building for Production

To build the application for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.
