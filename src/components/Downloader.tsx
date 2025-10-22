import React, { useState, useEffect } from 'react';
import { Box, Text } from 'ink';
import Spinner from 'ink-spinner';
import YTDlpWrap from 'yt-dlp-wrap';
import path from 'path';
import { homedir } from 'os';

interface DownloaderProps {
  url: string;
  onComplete: () => void;
}

type DownloadStatus = 'initializing' | 'downloading' | 'completed' | 'error';

export const Downloader: React.FC<DownloaderProps> = ({ url, onComplete }) => {
  const [status, setStatus] = useState<DownloadStatus>('initializing');
  const [progress, setProgress] = useState<string>('0%');
  const [speed, setSpeed] = useState<string>('');
  const [eta, setEta] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [filename, setFilename] = useState<string>('');

  useEffect(() => {
    const downloadVideo = async () => {
      try {
        // Initialize yt-dlp wrapper
        const ytDlpWrap = new YTDlpWrap();

        // Download location - user's Downloads folder or home directory
        const downloadPath = path.join(homedir(), 'Downloads');

        setStatus('downloading');

        // Get video info first
        try {
          const info = await ytDlpWrap.getVideoInfo(url);
          if (info && typeof info === 'object' && 'title' in info) {
            setTitle(info.title as string);
          }
        } catch (e) {
          // If getting info fails, continue with download anyway
          console.error('Could not get video info:', e);
        }

        // Download the video
        const ytDlpEventEmitter = ytDlpWrap.exec([
          url,
          '-o',
          `${downloadPath}/%(title)s.%(ext)s`,
          '--newline',
          '--no-playlist',
        ]);

        ytDlpEventEmitter.on('progress', (progressData) => {
          const progressStr = progressData.toString();

          // Parse progress information
          // yt-dlp output format: [download]  45.2% of 123.45MiB at 1.23MiB/s ETA 00:12
          const percentMatch = progressStr.match(/(\d+\.?\d*)%/);
          const speedMatch = progressStr.match(/at\s+([\d.]+\w+\/s)/);
          const etaMatch = progressStr.match(/ETA\s+([\d:]+)/);
          const titleMatch = progressStr.match(/\[download\] Destination: (.+)/);

          if (percentMatch) setProgress(percentMatch[1] + '%');
          if (speedMatch) setSpeed(speedMatch[1]);
          if (etaMatch) setEta(etaMatch[1]);
          if (titleMatch) {
            const fullPath = titleMatch[1];
            setFilename(path.basename(fullPath));
          }
        });

        ytDlpEventEmitter.on('close', () => {
          setStatus('completed');
          setTimeout(() => {
            onComplete();
          }, 3000);
        });

        ytDlpEventEmitter.on('error', (error) => {
          setStatus('error');
          setError(error.message || 'Unknown error occurred');
        });
      } catch (err) {
        setStatus('error');
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Failed to download video');
        }
      }
    };

    downloadVideo();
  }, [url, onComplete]);

  return (
    <Box flexDirection="column" padding={1} borderStyle="round" borderColor="cyan">
      <Box justifyContent="center" marginBottom={1}>
        <Text bold color="cyan">
          YouTube Video Downloader
        </Text>
      </Box>

      <Box flexDirection="column" paddingX={2}>
        <Text>
          <Text color="gray">URL: </Text>
          <Text color="white">{url}</Text>
        </Text>

        {title && (
          <Box marginTop={1}>
            <Text>
              <Text color="gray">Title: </Text>
              <Text color="yellow">{title}</Text>
            </Text>
          </Box>
        )}

        {status === 'initializing' && (
          <Box marginTop={1}>
            <Text color="blue">
              <Spinner type="dots" />
              {' Initializing download...'}
            </Text>
          </Box>
        )}

        {status === 'downloading' && (
          <Box flexDirection="column" marginTop={1}>
            <Box>
              <Text color="green">
                <Spinner type="dots" />
                {' Downloading...'}
              </Text>
            </Box>
            <Box marginTop={1}>
              <Text>
                <Text color="gray">Progress: </Text>
                <Text color="green" bold>
                  {progress}
                </Text>
              </Text>
            </Box>
            {speed && (
              <Box>
                <Text>
                  <Text color="gray">Speed: </Text>
                  <Text color="cyan">{speed}</Text>
                </Text>
              </Box>
            )}
            {eta && (
              <Box>
                <Text>
                  <Text color="gray">ETA: </Text>
                  <Text color="magenta">{eta}</Text>
                </Text>
              </Box>
            )}
            {filename && (
              <Box marginTop={1}>
                <Text>
                  <Text color="gray">Saving to: </Text>
                  <Text color="yellow">~/Downloads/{filename}</Text>
                </Text>
              </Box>
            )}
          </Box>
        )}

        {status === 'completed' && (
          <Box flexDirection="column" marginTop={1}>
            <Text color="green" bold>
              ✓ Download completed successfully!
            </Text>
            {filename && (
              <Box marginTop={1}>
                <Text>
                  <Text color="gray">Saved to: </Text>
                  <Text color="yellow">~/Downloads/{filename}</Text>
                </Text>
              </Box>
            )}
            <Box marginTop={1}>
              <Text dimColor>Returning to visualizer...</Text>
            </Box>
          </Box>
        )}

        {status === 'error' && (
          <Box flexDirection="column" marginTop={1}>
            <Text color="red" bold>
              ✗ Error downloading video
            </Text>
            <Box marginTop={1}>
              <Text color="red">{error}</Text>
            </Box>
            <Box marginTop={1}>
              <Text dimColor>Press any key to return...</Text>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};
