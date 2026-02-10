# React Redux TODO App

A modern, fully-featured TODO application built with React, Redux Toolkit, TypeScript, and Vite.

## Features

- ✅ **Add Todos** - Create new todos with title and optional description
- 📝 **Edit Todos** - Update todo details (disabled for completed items)
- ✓ **Mark Complete** - Toggle todo completion status with checkboxes
- 🗑️ **Delete Todos** - Remove todos from the list
- 🔍 **Filter Todos** - View all, active, or completed todos
- 🧹 **Clear Completed** - Bulk remove completed todos
- 📊 **Stats** - View active and completed todo counts
- 🎨 **Beautiful UI** - Modern gradient design with responsive layout
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile

## Tech Stack

- **React 18** - UI framework
- **Redux Toolkit** - State management
- **TypeScript** - Type safety
- **Vite** - Fast build tool and dev server
- **CSS3** - Styling with flexbox and gradients

## Project Structure

```
src/
├── components/
│   ├── TodoForm.tsx        # Form to add new todos
│   ├── TodoItem.tsx        # Individual todo item with edit/delete
│   ├── TodoList.tsx        # List of filtered todos
│   ├── TodoFilter.tsx      # Filter and stats controls
│   └── *.css              # Component styles
├── redux/
│   ├── store.ts           # Redux store configuration
│   ├── todoSlice.ts       # Todo reducers and actions
│   └── hooks.ts           # Custom Redux hooks
├── types/
│   └── todo.ts            # TypeScript type definitions
├── App.tsx                # Main app component
├── main.tsx               # React entry point
└── index.css              # Global styles
```

## Getting Started

### Prerequisites

- Node.js 20.19+ or 22.12+
- npm or yarn

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Redux State Structure

```typescript
{
  todos: {
    todos: [
      {
        id: string,
        title: string,
        description: string,
        completed: boolean,
        createdAt: string
      }
    ],
    filter: 'all' | 'active' | 'completed'
  }
}
```

## Available Actions

- `addTodo(payload)` - Add a new todo
- `updateTodo(payload)` - Update an existing todo
- `deleteTodo(id)` - Delete a todo by ID
- `toggleTodo(id)` - Toggle todo completion status
- `setFilter(filter)` - Set the current filter
- `clearCompleted()` - Remove all completed todos

## Styling

The app uses CSS modules and component-level styles:

- **Color Scheme**: Purple gradient background (#667eea to #764ba2)
- **Primary Button**: Blue (#007bff)
- **Success Button**: Green (#28a745)
- **Danger Button**: Red (#dc3545)
- **Responsive Breakpoints**: 600px for mobile optimization

## Contributing

Feel free to fork this project and create pull requests for improvements.

## License

MIT
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
"# VedKart" 
"# VedKart" 
