export default () => ({
  nodeEnv: process.env.NODE_ENV ?? 'development',

  port: parseInt(process.env.PORT ?? '3000', 10),

  database: {
    host: process.env.DATABASE_HOST ?? 'localhost',
    port: parseInt(process.env.DATABASE_PORT ?? '5432', 10),
    name: process.env.DATABASE_NAME ?? 'urban_heat',
    user: process.env.DATABASE_USER ?? 'postgres',
    password: process.env.DATABASE_PASSWORD ?? 'postgres',
  },

  quantService: {
    url: process.env.QUANT_SERVICE_URL ?? 'http://localhost:8000',
  },

  corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
});