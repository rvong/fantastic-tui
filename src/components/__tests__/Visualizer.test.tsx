import React from 'react';
import { render } from 'ink-testing-library';
import { Visualizer } from '../Visualizer.js';

describe('Visualizer Component', () => {
  it('should render the visualizer title', () => {
    const { lastFrame } = render(<Visualizer />);
    const output = lastFrame();

    expect(output).toContain('Fantastic Visualizer');
  });

  it('should display help hint', () => {
    const { lastFrame } = render(<Visualizer />);
    const output = lastFrame();

    expect(output).toContain('Type /help for commands');
  });

  it('should render without crashing', () => {
    const { unmount } = render(<Visualizer />);
    expect(() => unmount()).not.toThrow();
  });

  it('should render a bordered box', () => {
    const { lastFrame } = render(<Visualizer />);
    const output = lastFrame();

    // Check for box drawing characters (borders)
    expect(output).toMatch(/[┌┐└┘│─╭╮╰╯]/);
  });
});
