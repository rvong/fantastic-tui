import React from 'react';
import { render } from 'ink-testing-library';
import { App } from '../App.js';
import { Visualizer } from '../components/Visualizer.js';
import { Help } from '../components/Help.js';

describe('Integration Tests', () => {
  it('should render the app with all components working together', () => {
    const { lastFrame, unmount } = render(<App />);

    // Should start with visualizer
    expect(lastFrame()).toContain('Fantastic Visualizer');
    expect(lastFrame()).toContain('Command:');

    unmount();
  });

  it('should render visualizer component independently', () => {
    const { lastFrame, unmount } = render(<Visualizer />);

    expect(lastFrame()).toContain('Fantastic Visualizer');
    expect(lastFrame()).toContain('Type /help for commands');

    unmount();
  });

  it('should render help component independently', () => {
    const { lastFrame, unmount } = render(<Help />);

    expect(lastFrame()).toContain('Fantastic TUI - Help');
    expect(lastFrame()).toContain('Available Commands');
    expect(lastFrame()).toContain('/help');
    expect(lastFrame()).toContain('/visualizer');
    expect(lastFrame()).toContain('/quit');

    unmount();
  });

  it('should have proper component composition', () => {
    const { lastFrame, unmount } = render(<App />);
    const output = lastFrame();

    // Should have all the key elements
    expect(output).toContain('Fantastic Visualizer');
    expect(output).toContain('Command:');

    unmount();
  });
});
