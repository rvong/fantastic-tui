describe('Downloader Component', () => {
  it('should be defined', async () => {
    const { Downloader } = await import('../Downloader.js');
    expect(Downloader).toBeDefined();
    expect(typeof Downloader).toBe('function');
  });

  it('should be a React component', async () => {
    const { Downloader } = await import('../Downloader.js');
    // Check that it's a function (React functional component)
    expect(Downloader).toBeInstanceOf(Function);
  });
});
