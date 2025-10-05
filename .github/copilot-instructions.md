# Copilot Instructions

## Development Rules
**重要提醒**: 始终记住，我不需要你替我调试，只需要完成开发即可。专注于实现功能和编写代码，不要进行问题诊断或故障排除。

## Project Overview
This is a **SolidJS userscript** project built with Vite and `vite-plugin-monkey`. The application creates browser userscripts that inject SolidJS components into target websites (currently Google.com).

## Architecture & Key Patterns

### Userscript-Specific Patterns
- **Entry Point**: `src/index.tsx` creates a dynamic div container and appends it to `document.body` rather than using a pre-existing root element
- **Target Injection**: The userscript is configured in `vite.config.ts` to match specific URLs (`https://www.google.com/`)  
- **Dynamic DOM Creation**: Uses `document.createElement('div')` with flex styling for seamless integration with host pages

### SolidJS Conventions
- **JSX Config**: Uses `jsx: "preserve"` with `jsxImportSource: "solid-js"` in TypeScript config
- **Component Structure**: Standard SolidJS functional components with `Component` type imports
- **CSS Modules**: Styling uses `*.module.css` files (see `App.module.css`)

## Development Workflow

### Key Commands
```bash
bun dev          # Development with hot reload
bun build        # Production build to dist/
bun build:watch  # Watch mode for development
bun preview      # Preview production build
```

### Build System
- **Vite + Plugins**: Configured with `vite-plugin-solid` and `vite-plugin-monkey`
- **TypeScript**: Composite project setup with separate configs for app (`tsconfig.app.json`) and build tools (`tsconfig.node.json`)
- **Output**: Generates userscript-compatible JavaScript in `dist/` folder

## Project-Specific Conventions

### File Organization
- `src/index.tsx` - Userscript entry point with DOM injection logic
- `src/App.tsx` - Main SolidJS component  
- `src/*.module.css` - Component-scoped styling
- `vite.config.ts` - Userscript configuration (match patterns, metadata)

### Userscript Configuration
When modifying userscript behavior, update the `monkey()` plugin config in `vite.config.ts`:
- `match`: Array of URL patterns where script should run
- `namespace`: Unique identifier for the userscript
- `icon`: Userscript icon URL

## vite-plugin-monkey API Reference

### Core Plugin Options
```typescript
import monkey, { cdn } from 'vite-plugin-monkey';

monkey({
  entry: 'src/index.tsx',        // Entry point file
  userscript: { /* metadata */ }, // Userscript metadata
  build: { /* build options */ }, // Build configuration
  server: { /* dev options */ },  // Development server options
})
```

### Userscript Metadata Options
```typescript
userscript: {
  // Basic Information
  name: 'SolidJS Userscript' | { '': 'default', zh: '中文名' },
  namespace: 'solidjs-userscript',
  version: '1.0.0',           // Auto from package.json
  description: 'Description',  // Auto from package.json  
  author: 'Your Name',        // Auto from package.json
  
  // Execution Control
  match: ['https://www.google.com/*'],
  include: ['https://example.com/*'],
  exclude: ['https://example.com/exclude/*'],
  'run-at': 'document-end',   // document-start, document-idle
  'inject-into': 'page',      // content, auto (Violentmonkey)
  
  // Permissions & APIs
  grant: ['GM_setValue', 'GM_getValue', 'GM_xmlhttpRequest'] | 'none' | '*',
  
  // Resources & Dependencies
  icon: 'https://example.com/icon.png',
  require: ['https://cdn.jsdelivr.net/npm/vue@3/dist/vue.global.js'],
  resource: { 'my-css': 'https://example.com/style.css' },
  
  // Additional Metadata
  homepage: 'https://github.com/user/repo',
  supportURL: 'https://github.com/user/repo/issues',
  updateURL: 'https://example.com/script.meta.js',
  downloadURL: 'https://example.com/script.user.js',
}
```

### Build Configuration
```typescript
build: {
  fileName: 'my-script.user.js',     // Output filename
  metaFileName: true,                 // Generate .meta.js file
  autoGrant: true,                   // Auto-detect required grants
  
  // External Dependencies (CDN)
  externalGlobals: {
    'solid-js': cdn.jsdelivr('SolidJS', 'dist/solid.min.js'),
    'react': ['React', 'https://unpkg.com/react/umd/react.production.min.js'],
  },
  
  // External Resources
  externalResource: {
    'element-plus/dist/index.css': cdn.jsdelivr(),
  },
}
```

### Development Server Options
```typescript
server: {
  prefix: 'dev:',      // Prefix for dev userscript name
  mountGmApi: false,   // Mount GM APIs to window (not recommended)
  open: true,          // Auto-open in browser
}
```

### CDN Helpers
```typescript
import { cdn } from 'vite-plugin-monkey';

// Built-in CDN providers
cdn.jsdelivr('library', 'dist/lib.min.js')
cdn.unpkg('library', 'dist/lib.min.js') 
cdn.cdnjs('library', 'lib.min.js')

// Custom CDN function
const customCdn = (version, name) => `https://custom-cdn.com/${name}@${version}/dist/index.js`
```

### DOM Integration Strategy
The app uses a specific pattern for injecting into existing pages:
```tsx
render(() => <App />, (() => {
  const app = document.createElement('div');
  app.style.flex = '1';
  document.body.append(app);
  return app;
})());
```

### GM API Usage (Optional)
```typescript
// Import GM APIs (recommended)
import { GM_setValue, GM_getValue } from 'vite-plugin-monkey/dist/client';

// Or use global APIs (requires mountGmApi: true)
/// <reference types="vite-plugin-monkey/global" />
```

## Testing & Debugging
- **Development**: `bun dev` starts dev server with auto-reload
- **Production Build**: Install `dist/*.user.js` in userscript manager
- **Browser DevTools**: Debug injected components normally
- **Target Testing**: Test on URLs matching `vite.config.ts` patterns
- **Update Check**: Use generated `.meta.js` for efficient update checking

## Dependencies
- **Core**: SolidJS for reactive UI components
- **Build**: Vite with specialized plugins for userscript generation
- **Runtime**: No external runtime dependencies (self-contained userscript)