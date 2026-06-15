const PORT = Number(process.env.PORT) || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-please-change';
const NODE_ENV = process.env.NODE_ENV || 'development';

export interface Config {
  port: number;
  jwtSecret: string;
  nodeEnv: string;
}

export const config: Config = {
  port: PORT,
  jwtSecret: JWT_SECRET,
  nodeEnv: NODE_ENV,
};
