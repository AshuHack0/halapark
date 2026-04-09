# Project Structure

This document outlines the complete folder structure of the HalaPark Next.js application.

## Complete Folder Structure

```
frontend/
├── public/                    # Static assets
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── layout.jsx        # Root layout with Navbar & Footer
│   │   ├── page.jsx          # Home page
│   │   ├── globals.css       # Global styles with Tailwind
│   │   └── favicon.ico
│   │
│   ├── components/            # React components
│   │   ├── ui/               # Reusable UI components
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   └── index.js
│   │   ├── layout/           # Layout components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── index.js
│   │   └── common/           # Common components
│   │       ├── LoadingSpinner.jsx
│   │       └── index.js
│   │
│   ├── modules/              # Feature modules
│   │   ├── home/
│   │   │   ├── HomePage.jsx
│   │   │   └── index.js
│   │   └── auth/
│   │       └── index.js
│   │
│   ├── services/             # API services
│   │   └── api.js
│   │
│   ├── hooks/                # Custom React hooks
│   │   └── useLocalStorage.js
│   │
│   ├── context/              # React Context providers
│   │   └── AppContext.jsx
│   │
│   ├── utils/                # Utility functions
│   │   └── index.js
│   │
│   ├── lib/                  # Library helpers
│   │   └── index.js
│   │
│   ├── styles/               # Additional styles
│   │   └── index.css
│   │
│   └── constants/            # Application constants
│       └── index.js
│
├── node_modules/             # Dependencies
├── .git/                     # Git repository
├── next.config.mjs          # Next.js configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── jsconfig.json            # JavaScript/Path alias configuration
├── package.json             # Project dependencies
├── postcss.config.mjs       # PostCSS configuration
├── eslint.config.mjs        # ESLint configuration
├── README.md                # Project documentation
└── PROJECT_STRUCTURE.md     # This file
```

## Key Files

### Configuration Files

- **next.config.mjs**: Next.js configuration
- **tailwind.config.js**: Tailwind CSS configuration with content paths
- **jsconfig.json**: Path alias configuration (`@/` → `./src/`)
- **postcss.config.mjs**: PostCSS configuration for Tailwind
- **package.json**: Project dependencies and scripts

### Core Application Files

- **src/app/layout.jsx**: Root layout component with Navbar and Footer
- **src/app/page.jsx**: Home page that uses the HomePage module
- **src/app/globals.css**: Global styles with Tailwind CSS imports

### Components

- **UI Components**: Reusable components like Button and Card
- **Layout Components**: Navbar and Footer for consistent layout
- **Common Components**: Shared components like LoadingSpinner

### Modules

- **Home Module**: Example feature module demonstrating the architecture
- **Auth Module**: Placeholder for authentication features

### Services

- **api.js**: Centralized API service with HTTP methods and endpoint helpers

### Utilities

- **hooks/**: Custom React hooks (e.g., useLocalStorage)
- **context/**: React Context providers (e.g., AppContext)
- **utils/**: Utility functions (date formatting, debounce, etc.)
- **lib/**: Library helpers (class names, validation, etc.)
- **constants/**: Application-wide constants

## Import Examples

```javascript
// Using path aliases
import { Button, Card } from '@/components/ui';
import { Navbar, Footer } from '@/components/layout';
import { HomePage } from '@/modules/home';
import { api } from '@/services/api';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useApp } from '@/context/AppContext';
import { formatDate, debounce } from '@/utils';
import { APP_NAME, ROUTES } from '@/constants';
```

## Best Practices

1. **Components**: Organize by type (ui, layout, common)
2. **Modules**: Feature-based organization for scalability
3. **Services**: Centralized API communication
4. **Hooks**: Reusable logic extraction
5. **Context**: Global state management
6. **Utils**: Pure utility functions
7. **Constants**: Centralized configuration values
