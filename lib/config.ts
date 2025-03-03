export const config = {
  api: {
    baseUrl:
      process.env.NEXT_PUBLIC_API_URL ||
      "http://34.134.106.60:8080/api/v1/api/v1",
  },
  analysis: {
    maxPollingAttempts: 30,
    pollingIntervalMs: 2000,
    progressIntervalMs: 500,
  },
};
