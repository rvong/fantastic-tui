import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import { Visualizer } from './components/Visualizer.js';
import { Help } from './components/Help.js';
import { Downloader } from './components/Downloader.js';

type View = 'visualizer' | 'help' | 'download' | 'download-prompt';

export const App: React.FC = () => {
  const [view, setView] = useState<View>('visualizer');
  const [input, setInput] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');

  useInput((inputChar: string, key: {
    upArrow: boolean;
    downArrow: boolean;
    leftArrow: boolean;
    rightArrow: boolean;
    pageDown: boolean;
    pageUp: boolean;
    return: boolean;
    escape: boolean;
    ctrl: boolean;
    shift: boolean;
    tab: boolean;
    backspace: boolean;
    delete: boolean;
    meta: boolean;
  }) => {
    if (key.escape || (key.ctrl && inputChar === 'c')) {
      process.exit(0);
    }

    // Handle help view
    if (view === 'help') {
      setView('visualizer');
      setInput('');
      return;
    }

    // Handle download view (any key returns to visualizer)
    if (view === 'download') {
      setView('visualizer');
      setInput('');
      setDownloadUrl('');
      return;
    }

    // Handle backspace
    if (key.backspace || key.delete) {
      setInput((prev) => prev.slice(0, -1));
      return;
    }

    // Handle enter
    if (key.return) {
      const trimmedInput = input.trim();
      const command = trimmedInput.toLowerCase();

      // Handle download prompt - user is entering URL
      if (view === 'download-prompt') {
        if (trimmedInput) {
          setDownloadUrl(trimmedInput);
          setView('download');
          setInput('');
        }
        return;
      }

      // Handle regular commands
      if (command === '/help' || command === 'help') {
        setView('help');
      } else if (command === '/quit' || command === 'quit') {
        process.exit(0);
      } else if (command === '/visualizer') {
        setView('visualizer');
      } else if (command === '/download') {
        setView('download-prompt');
      }

      setInput('');
      return;
    }

    // Add character to input
    if (inputChar && !key.ctrl && !key.meta) {
      setInput((prev) => prev + inputChar);
    }
  });

  return (
    <Box flexDirection="column">
      {view === 'visualizer' && <Visualizer />}
      {view === 'help' && <Help />}
      {view === 'download' && downloadUrl && (
        <Downloader
          url={downloadUrl}
          onComplete={() => {
            setView('visualizer');
            setDownloadUrl('');
          }}
        />
      )}
      {view === 'download-prompt' && (
        <Box flexDirection="column" padding={1} borderStyle="round" borderColor="cyan">
          <Box justifyContent="center" marginBottom={1}>
            <Text bold color="cyan">
              YouTube Video Downloader
            </Text>
          </Box>
          <Box paddingX={2}>
            <Text color="yellow">Enter the YouTube video URL:</Text>
          </Box>
          <Box paddingX={2} marginTop={1}>
            <Text color="gray">URL: </Text>
            <Text>{input}</Text>
            <Text color="gray">_</Text>
          </Box>
          <Box paddingX={2} marginTop={1}>
            <Text dimColor>Press Enter to start download, Esc to cancel</Text>
          </Box>
        </Box>
      )}

      {view === 'visualizer' && (
        <Box marginTop={1}>
          <Text color="gray">Command: </Text>
          <Text>{input}</Text>
          <Text color="gray">_</Text>
        </Box>
      )}
    </Box>
  );
};
