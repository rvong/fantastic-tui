# Fantastic TUI

A beautiful terminal user interface application with animated visualizations inspired by classic Windows Media Player animations. Built with [Ink](https://github.com/vadimdemedes/ink) and React.

## Features

- **Animated Visualizer**: Watch mesmerizing particle animations and wave effects in your terminal
- **Interactive Commands**: Type commands to navigate and control the app
- **Help System**: Built-in help accessible via `/help` command
- **Modern Architecture**: Built with TypeScript, React, and modern best practices
- **Fully Tested**: Comprehensive unit and integration tests with Jest

## Installation

```bash
npm install
```

## Usage

### Development Mode

Run the app in development mode with hot reloading:

```bash
npm run dev
```

### Build and Run

Build the TypeScript code and run the compiled version:

```bash
npm run build
npm start
```

## Available Commands

Once the app is running, you can use these commands:

- `/help` - Display help information
- `/visualizer` - Return to the animated visualizer (default view)
- `/quit` - Exit the application
- `Ctrl+C` - Exit the application

## Scripts

- `npm run dev` - Run in development mode with tsx
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run the compiled application
- `npm test` - Run all tests
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Check code for linting errors
- `npm run lint:fix` - Fix linting errors automatically
- `npm run typecheck` - Run TypeScript type checking

## Project Structure

```
fantastic-tui/
├── src/
│   ├── components/
│   │   ├── __tests__/
│   │   │   ├── Help.test.tsx
│   │   │   └── Visualizer.test.tsx
│   │   ├── Help.tsx          # Help screen component
│   │   └── Visualizer.tsx    # Animated visualization component
│   ├── __tests__/
│   │   ├── App.test.tsx
│   │   └── integration.test.tsx
│   ├── App.tsx               # Main application component
│   └── index.tsx             # Entry point
├── dist/                     # Compiled output (generated)
├── package.json
├── tsconfig.json
├── jest.config.js
└── .eslintrc.json
```

## Development

### Adding New Features

The app uses a component-based architecture. To add new features:

1. Create new components in `src/components/`
2. Add corresponding tests in `src/components/__tests__/`
3. Update the `App.tsx` to integrate your component
4. Run tests to ensure everything works: `npm test`

### Code Quality

The project uses:

- **TypeScript** with strict mode enabled
- **ESLint** for code linting
- **Jest** for testing
- **Ink Testing Library** for component testing

Run the full quality check:

```bash
npm run typecheck
npm run lint
npm test
```

## License

MIT