# HalaPark - Production-Ready Next.js Application

A production-ready Next.js application built with JavaScript (JSX), Tailwind CSS, and the App Router architecture. This project follows best practices for scalability and maintainability.

## 🚀 Features

- **Next.js 16** with App Router architecture
- **JavaScript (JSX)** - No TypeScript
- **Tailwind CSS** for styling
- **Scalable folder structure** suitable for large applications
- **Reusable UI components** with Tailwind CSS
- **Path aliases** configured (@/ mapped to /src)
- **API service layer** for centralized HTTP requests
- **Custom hooks** and context providers
- **Utility functions** and constants

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.jsx          # Root layout with Navbar and Footer
│   ├── page.jsx            # Home page
│   └── globals.css         # Global styles with Tailwind imports
│
├── components/
│   ├── ui/                 # Reusable UI components (Button, Card, etc.)
│   ├── layout/             # Layout components (Navbar, Footer)
│   └── common/             # Common components (LoadingSpinner, etc.)
│
├── modules/
│   ├── home/               # Home module with HomePage component
│   └── auth/               # Auth module (ready for expansion)
│
├── services/
│   └── api.js              # Centralized API service
│
├── hooks/
│   └── useLocalStorage.js  # Custom React hooks
│
├── context/
│   └── AppContext.jsx      # React context providers
│
├── utils/
│   └── index.js            # Utility functions
│
├── lib/
│   └── index.js            # Library helpers
│
├── styles/
│   └── (additional styles)
│
└── constants/
    └── index.js            # Application constants
```

## 🛠️ Installation

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Steps

1. **Navigate to the project directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Tailwind CSS Configuration

Tailwind CSS is configured in `tailwind.config.js`. The configuration includes:

- Content paths for all JSX files
- Custom theme extensions
- Dark mode support

Global Tailwind styles are imported in `src/app/globals.css` using:

```css
@import "tailwindcss";
```

## 🔧 Path Aliases

Path aliases are configured in `jsconfig.json`:

- `@/` maps to `./src/`

Example usage:
```jsx
import { Button } from '@/components/ui';
import { HomePage } from '@/modules/home';
import { api } from '@/services/api';
```

## 📦 Key Components

### UI Components

- **Button** - Reusable button component with variants (primary, secondary, outline, danger)
- **Card** - Card component with title and footer support

### Layout Components

- **Navbar** - Navigation bar component
- **Footer** - Footer component

### Modules

- **Home Module** - Example home page module demonstrating the architecture

## 🔌 API Service

The API service (`src/services/api.js`) provides:

- Centralized HTTP request methods (GET, POST, PUT, PATCH, DELETE)
- Automatic authentication token handling
- Error handling
- Pre-configured API endpoints

Example usage:
```javascript
import { api } from '@/services/api';

// Get all users
const users = await api.users.getAll();

// Create a user
const newUser = await api.users.create({ name: 'John', email: 'john@example.com' });
```

## 🎯 Best Practices

1. **Component Organization**: Components are organized by type (ui, layout, common)
2. **Module-based Architecture**: Features are organized into modules
3. **Separation of Concerns**: Services, hooks, utils, and context are separated
4. **Reusable Components**: UI components are designed for reusability
5. **Path Aliases**: Use `@/` for cleaner imports
6. **Consistent Styling**: Tailwind CSS for all styling needs

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm run start
```

### Environment Variables

Create a `.env.local` file for environment-specific variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## 📚 Next Steps

1. Add more UI components in `src/components/ui/`
2. Expand modules in `src/modules/`
3. Add more custom hooks in `src/hooks/`
4. Configure additional context providers in `src/context/`
5. Add utility functions as needed in `src/utils/`

## 🤝 Contributing

This project follows a scalable architecture pattern. When adding new features:

1. Create components in appropriate directories
2. Use modules for feature-based organization
3. Follow the existing naming conventions
4. Use Tailwind CSS for styling
5. Maintain separation of concerns

## 📄 License

This project is open source and available under the MIT License.

---

Built with ❤️ using Next.js and Tailwind CSS
