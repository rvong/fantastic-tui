import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import { Visualizer } from './components/Visualizer.js';
import { Help } from './components/Help.js';

type View = 'visualizer' | 'help';

export const App: React.FC = () => {
  const [view, setView] = useState<View>('visualizer');
  const [input, setInput] = useState('');

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

    // Handle backspace
    if (key.backspace || key.delete) {
      setInput((prev) => prev.slice(0, -1));
      return;
    }

    // Handle enter
    if (key.return) {
      const command = input.trim().toLowerCase();

      if (command === '/help' || command === 'help') {
        setView('help');
      } else if (command === '/quit' || command === 'quit') {
        process.exit(0);
      } else if (command === '/visualizer') {
        setView('visualizer');
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
