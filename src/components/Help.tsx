import React from 'react';
import { Box, Text } from 'ink';

export const Help: React.FC = () => {
  return (
    <Box flexDirection="column" padding={1}>
      <Text bold color="cyan">
        Fantastic TUI - Help
      </Text>
      <Text> </Text>
      <Text bold>Available Commands:</Text>
      <Box flexDirection="column" paddingLeft={2} marginTop={1}>
        <Text>
          <Text color="green">/help</Text> - Display this help message
        </Text>
        <Text>
          <Text color="green">/visualizer</Text> - Start the animated visualizer (default)
        </Text>
        <Text>
          <Text color="green">/download</Text> - Download a YouTube video with progress bar
        </Text>
        <Text>
          <Text color="green">/quit</Text> or <Text color="green">Ctrl+C</Text> - Exit the application
        </Text>
      </Box>
      <Text> </Text>
      <Text bold>About:</Text>
      <Box paddingLeft={2} marginTop={1}>
        <Text>
          This is a terminal user interface with animated visualizations
          inspired by classic Windows Media Player animations. It also
          includes a YouTube video downloader powered by yt-dlp.
        </Text>
      </Box>
      <Text> </Text>
      <Text bold>YouTube Downloader:</Text>
      <Box paddingLeft={2} marginTop={1}>
        <Text>
          Use <Text color="green">/download</Text> to download videos from YouTube.
          Videos will be saved to your Downloads folder. You&apos;ll be prompted
          to enter the video URL and see a visual progress bar with percentage,
          download speed, and estimated time remaining.
        </Text>
      </Box>
      <Text> </Text>
      <Text dimColor>Press any key to return to the visualizer...</Text>
    </Box>
  );
};
