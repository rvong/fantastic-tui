# Fantastic TUI

A beautiful terminal user interface application with animated visualizations inspired by classic Windows Media Player animations. Built with [Ink](https://github.com/vadimdemedes/ink) and React.

## Features

- **Animated Visualizer**: Watch mesmerizing particle animations and wave effects in your terminal
- **YouTube Video Downloader**: Download videos from YouTube with real-time progress tracking
  - Visual progress bar showing download percentage
  - Live download speed and ETA display
  - Automatic file saving to ~/Downloads folder
  - Powered by yt-dlp (automatically managed)
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
- `/download` - Download a YouTube video with visual progress tracking
- `/quit` - Exit the application
- `Ctrl+C` - Exit the application

### YouTube Video Downloader

The `/download` command provides a complete video downloading experience:

1. Type `/download` and press Enter
2. Paste the YouTube video URL when prompted
3. Press Enter to start the download
4. Watch the **visual progress bar** with:
   - **Percentage completed** (e.g., 45.2%)
   - **Download speed** (e.g., 2.5 MiB/s)
   - **Estimated time remaining** (ETA)
   - **File size** information
5. Videos are automatically saved to `~/Downloads/`

**Example:**
```
Progress: 67.3%
[████████████████████████████████░░░░░░░░░░░░░░░░░░]
Size: 125.4 MiB
Speed: 3.2 MiB/s
ETA: 00:13
```

**Note**: The app uses [yt-dlp-wrap](https://www.npmjs.com/package/yt-dlp-wrap), which automatically downloads and manages the yt-dlp binary on first use. No manual installation required!

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
│   │   │   ├── Visualizer.test.tsx
│   │   │   └── Downloader.test.tsx
│   │   ├── Help.tsx          # Help screen component
│   │   ├── Visualizer.tsx    # Animated visualization component
│   │   └── Downloader.tsx    # YouTube downloader with progress bar
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