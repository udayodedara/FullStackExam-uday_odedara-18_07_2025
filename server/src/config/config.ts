/* eslint-disable no-process-env */
export const config = {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  db: {
    mongoURI: process.env.MONGO_URI,
    postgres: {
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
      database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
};
