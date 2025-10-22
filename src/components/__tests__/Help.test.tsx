import React from 'react';
import { render } from 'ink-testing-library';
import { Help } from '../Help.js';

describe('Help Component', () => {
  it('should render help information', () => {
    const { lastFrame } = render(<Help />);
    const output = lastFrame();

    expect(output).toContain('Fantastic TUI - Help');
    expect(output).toContain('Available Commands');
    expect(output).toContain('/help');
    expect(output).toContain('/visualizer');
    expect(output).toContain('/quit');
  });

  it('should display command descriptions', () => {
    const { lastFrame } = render(<Help />);
    const output = lastFrame();

    expect(output).toContain('Display this help message');
    expect(output).toContain('Start the animated visualizer');
    expect(output).toContain('Exit the application');
  });

  it('should show about section', () => {
    const { lastFrame } = render(<Help />);
    const output = lastFrame();

    expect(output).toContain('About:');
    expect(output).toContain('terminal user interface');
  });
});
