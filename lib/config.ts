export const config = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  },
  analysis: {
    maxPollingAttempts: 30,
    pollingIntervalMs: 2000,
    progressIntervalMs: 500,
  },
};
