import React, { useState, useEffect } from 'react';
import { Box, Text } from 'ink';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  char: string;
  color: string;
}

const COLORS = ['red', 'green', 'blue', 'yellow', 'magenta', 'cyan'];
const CHARS = ['●', '◆', '■', '▲', '★', '◉'];
const WIDTH = 60;
const HEIGHT = 20;

export const Visualizer: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [frame, setFrame] = useState(0);

  // Initialize particles
  useEffect(() => {
    const initialParticles: Particle[] = [];
    for (let i = 0; i < 20; i++) {
      initialParticles.push({
        x: Math.random() * WIDTH,
        y: Math.random() * HEIGHT,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        char: CHARS[Math.floor(Math.random() * CHARS.length)],
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      });
    }
    setParticles(initialParticles);
  }, []);

  // Animation loop
  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => f + 1);
      setParticles((prevParticles) =>
        prevParticles.map((particle) => {
          let { x, y, vx, vy } = particle;

          // Update position
          x += vx;
          y += vy;

          // Bounce off walls
          if (x <= 0 || x >= WIDTH - 1) {
            vx = -vx;
            x = Math.max(0, Math.min(WIDTH - 1, x));
          }
          if (y <= 0 || y >= HEIGHT - 1) {
            vy = -vy;
            y = Math.max(0, Math.min(HEIGHT - 1, y));
          }

          return { ...particle, x, y, vx, vy };
        })
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Render the visualization
  const renderFrame = () => {
    const grid: Array<Array<{ char: string; color: string } | null>> = Array(
      HEIGHT
    )
      .fill(null)
      .map(() => Array(WIDTH).fill(null));

    // Place particles on grid
    particles.forEach((particle) => {
      const px = Math.floor(particle.x);
      const py = Math.floor(particle.y);
      if (px >= 0 && px < WIDTH && py >= 0 && py < HEIGHT) {
        grid[py][px] = { char: particle.char, color: particle.color };
      }
    });

    // Add some wave effects
    const wave = Math.sin(frame * 0.1);
    const centerY = Math.floor(HEIGHT / 2);
    for (let x = 0; x < WIDTH; x++) {
      const y = Math.floor(centerY + wave * Math.sin(x * 0.3 + frame * 0.1) * 5);
      if (y >= 0 && y < HEIGHT && !grid[y][x]) {
        grid[y][x] = {
          char: '~',
          color: COLORS[Math.floor((x + frame) / 10) % COLORS.length],
        };
      }
    }

    return grid.map((row, y) => (
      <Text key={y}>
        {row.map((cell, x) => {
          if (cell) {
            return (
              <Text key={x} color={cell.color}>
                {cell.char}
              </Text>
            );
          }
          return <Text key={x}> </Text>;
        })}
      </Text>
    ));
  };

  return (
    <Box flexDirection="column" borderStyle="round" borderColor="cyan" padding={1}>
      <Box justifyContent="center" marginBottom={1}>
        <Text bold color="magenta">
          ♫ Fantastic Visualizer ♫
        </Text>
      </Box>
      {renderFrame()}
      <Box justifyContent="center" marginTop={1}>
        <Text dimColor>Type /help for commands</Text>
      </Box>
    </Box>
  );
};
