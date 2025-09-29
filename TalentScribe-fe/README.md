# TalentScribe Frontend
This is the frontend for TalentScribe, a platform for automated job search, resume upload, application tracking, and more.
## Features
- Upload and parse resumes (PDF/DOCX)
- Search for jobs using keywords and location
- Automate job applications
- Track application status and progress
- Real-time updates and notifications
## Tech Stack
- React (with TypeScript)
- Vite (for fast development/build)
- Socket.io (for real-time features)
- Axios (for API requests)
## Getting Started

### Prerequisites
- Node.js >= 18.x
- npm >= 9.x

### Installation
```bash
npm install
```

### Running the App
```bash
npm run dev
```
The app will start on `http://localhost:5173` by default.

### Build for Production
```bash
npm run build
```

## Environment Variables
Create a `.env` file in the root of the frontend directory if you need to override defaults. Example:
```
VITE_API_URL=http://localhost:3001
```

## Project Structure
- `src/` — Main source code
- `src/components/` — Reusable React components
- `src/pages/` — Page-level components/routes
- `src/api/` — API request logic
- `src/utils/` — Utility functions

## API Endpoints
The frontend communicates with the backend via REST APIs:
- `POST /api/resume/upload` — Upload and parse resume
- `GET /api/jobs/search` — Search for jobs
- `POST /api/applications/automate` — Automate job applications
- `GET /api/applications/status` — Get application status

## Contributing
Pull requests and issues are welcome! Please follow conventional commit messages and code style.

## License
MIT
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
