import React from 'react';
import { render } from 'ink-testing-library';
import { App } from '../App.js';

describe('App Component', () => {
  it('should render the visualizer by default', () => {
    const { lastFrame, unmount } = render(<App />);
    const output = lastFrame();

    expect(output).toContain('Fantastic Visualizer');
    unmount();
  });

  it('should show command input area', () => {
    const { lastFrame, unmount } = render(<App />);
    const output = lastFrame();

    expect(output).toContain('Command:');
    unmount();
  });

  it('should render without crashing', () => {
    const { unmount } = render(<App />);
    expect(() => unmount()).not.toThrow();
  });
});
