export interface Config {
  port: number;
  authToken: string | undefined;
}

export const loadConfig = (): Config => {
  const port = Number.parseInt(process.env.PORT ?? '3000', 10);

  return {
    port: Number.isNaN(port) ? 3000 : port,
    authToken: process.env.AUTH_TOKEN,
  };
};
